import {Interactions} from "@legion-hq/constants/cardInteractions";
import {ListTemplate} from "./lists";
import {UnitImpl} from "./listUnit.class";
import {BattleType} from "./cards";

interface ListData extends ListTemplate {
  units: UnitImpl[];
}

type CostSupplier = (
  cardIds: string[],
  useOriginalCosts?: boolean,
) => Record<string, number>;

export class List implements ListTemplate {
  private data: ListData;

  constructor(template: ListTemplate) {
    this.data = {...template, units: template.units.map(UnitImpl.of)};
  }

  /**
   * Implementations of template fields
   */
  get listId() {
    return this.data.listId;
  }
  get version() {
    return this.data.version;
  }
  get title() {
    return this.data.title;
  }
  get game() {
    return this.data.game;
  }
  get mode() {
    return this.data.mode;
  }
  get faction() {
    return this.data.faction;
  }
  get notes() {
    return this.data.notes;
  }
  get pointTotal() {
    return this.data.pointTotal;
  }
  get killPoints() {
    return this.data.killPoints;
  }
  get competitive() {
    return this.data.competitive;
  }
  get battleForce() {
    return this.data.battleForce;
  }
  get killedUnits() {
    return this.data.killedUnits;
  }
  get units() {
    return this.data.units;
  }
  get unitObjectStrings() {
    return this.data.unitObjectStrings;
  }
  get commandCards() {
    return this.data.commandCards;
  }

  // Battle cards
  get objectiveCards() {
    return this.data.objectiveCards;
  }
  get conditionCards() {
    return this.data.conditionCards;
  }
  get deploymentCards() {
    return this.data.deploymentCards;
  }
  getBattleCardsByType = (type: BattleType) => {
    switch (type) {
      case "condition":
        return this.conditionCards;
      case "deployment":
        return this.deploymentCards;
      case "objective":
        return this.objectiveCards;
      default:
        return [];
    }
  };

  // List of cardIds of unique personas.
  get uniques() {
    return this.data.uniques;
  }
  get commanders() {
    return this.data.commanders;
  }
  get unitCounts() {
    return this.data.unitCounts;
  }
  get contingencies() {
    return this.data.contingencies;
  }
  get isUsingOldPoints() {
    return this.data.isUsingOldPoints ?? false;
  }
  get rankInteractions() {
    return this.data.rankInteractions ?? {};
  }
  get listTemplate(): ListTemplate {
    return {
      ...this.data,
      units: this.units.map((unit) => unit.data),
    };
  }

  getRankDelta(upgradeId: string): number {
    return this.rankInteractions[upgradeId] ?? 0;
  }

  private addRankInteractions(upgradeId: string, value: number) {
    const interactions = this.rankInteractions;
    this.data.rankInteractions = {
      ...interactions,
      [upgradeId]: value,
    };
  }

  clear() {
    this.data.rankInteractions = {};
    this.data.units.forEach((unit) => unit.clear());
  }

  toggleUseOriginalCosts(costSupplier: CostSupplier) {
    this.data.isUsingOldPoints = !this.isUsingOldPoints;
    this.calculatePoints(costSupplier);
  }

  /**
   * Utility functions
   */
  get activations(): number {
    const numActivations = this.data.units.reduce((num, unit) => {
      num += unit.count;
      return num;
    }, 0);
    return numActivations;
  }

  calculatePoints(costSupplier: CostSupplier) {
    let newPointTotal = 0;
    this.units.forEach((unit) => {
      unit.calculateTotalUnitCost(costSupplier(unit.cardIds, this.isUsingOldPoints));
      newPointTotal += unit.totalUnitCost;
    });
    this.data.pointTotal = newPointTotal;
  }

  addModifiers({entourages, upgradePoints}: Interactions) {
    this.clear();
    this.units.forEach((unit) => {
      if (unit.unitId in entourages) {
        const {isConditionMet, boundaryDelta} = entourages[unit.unitId];
        if (isConditionMet({list: this.data, unit})) {
          this.addRankInteractions(unit.unitId, boundaryDelta);
        }
      }

      unit.cardIds.forEach((cardId) => {
        if (cardId in upgradePoints) {
          const {isConditionMet, pointDelta} = upgradePoints[cardId];
          if (isConditionMet({list: this.data, unit})) {
            unit.addUpgradeInteraction(cardId, pointDelta);
          }
        }
      });
    });
  }

  static of(data: ListTemplate) {
    return new List(data);
  }
}
