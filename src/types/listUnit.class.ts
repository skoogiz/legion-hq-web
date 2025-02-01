import {fill} from "lodash";
import {Counterpart, ListUnit} from "./lists";

export class UnitImpl implements ListUnit {
  private unit: ListUnit;

  constructor(unit: ListUnit) {
    this.unit = unit;
  }

  /**
   * Implementations of template fields
   */
  get unitId() {
    return this.unit.unitId;
  }
  get count() {
    return this.unit.count;
  }
  get hasUniques() {
    return this.unit.hasUniques;
  }
  get totalUnitCost() {
    return this.unit.totalUnitCost;
  }
  get unitObjectString() {
    return this.unit.unitObjectString;
  }
  get upgradesEquipped() {
    return this.unit.upgradesEquipped;
  }
  get loadoutUpgrades() {
    return this.unit.loadoutUpgrades;
  }
  get additionalUpgradeSlots() {
    return this.unit.additionalUpgradeSlots;
  }
  get validationIssues() {
    return this.unit.validationIssues;
  }
  get flawId() {
    return this.unit.flawId;
  }
  get counterpart() {
    return this.unit.counterpart;
  }
  get upgradeInteractions() {
    return this.unit.upgradeInteractions ?? {};
  }

  getPointDelta(upgradeId: string): number {
    return this.upgradeInteractions[upgradeId] ?? 0;
  }

  addUpgradeInteraction(upgradeId: string, value: number) {
    const interactions = this.upgradeInteractions;
    this.unit.upgradeInteractions = {
      ...interactions,
      [upgradeId]: value,
    };
  }

  clear() {
    this.unit.upgradeInteractions = {};
  }

  calculateTotalUnitCost(cardCosts: Record<string, number>) {
    const {unitId, upgradesEquipped, count, counterpart} = this;

    let pointTotal = cardCosts[unitId] ?? 0;

    upgradesEquipped.forEach((upgradeId) => {
      if (upgradeId) {
        pointTotal += (cardCosts[upgradeId] ?? 0) + this.getPointDelta(upgradeId);
      }
    });

    pointTotal *= count;

    if (counterpart) {
      pointTotal += cardCosts[counterpart.counterpartId];
      counterpart.upgradesEquipped.forEach((upgradeId) => {
        if (upgradeId) {
          pointTotal += (cardCosts[upgradeId] ?? 0) + this.getPointDelta(upgradeId);
        }
      });
    }

    this.unit.totalUnitCost = pointTotal;
  }

  get hasLoudout(): boolean {
    return this.loadoutUpgrades && this.loadoutUpgrades.length > 0;
  }

  addCounterpart(counterpart: Counterpart) {
    this.data.counterpart = {
      ...counterpart,
      loadoutUpgrades: this.hasLoudout
        ? fill(Array(counterpart.upgradesEquipped?.length ?? 0), null)
        : [],
    };
  }

  removeCounterpart() {
    delete this.data.counterpart;
  }

  /**
   * @returns list of all card ids used by this unit.
   */
  get cardIds(): string[] {
    return [
      this.unitId,
      ...this.upgradesEquipped,
      ...this.loadoutUpgrades,
      this.flawId,
      this.counterpart?.counterpartId,
      ...(this.counterpart?.upgradesEquipped ?? []),
      ...(this.counterpart?.loadoutUpgrades ?? []),
    ].filter((upgrade) => Boolean(upgrade)) as string[];
  }

  get upgradeModifiers() {
    return this.upgradeInteractions;
  }

  get data() {
    return this.unit;
  }

  static of(unit: ListUnit) {
    return new UnitImpl(unit);
  }
}
