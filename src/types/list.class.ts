import {ListTemplate} from "./lists";

export class List implements ListTemplate {
  private list: ListTemplate;

  constructor(template: ListTemplate) {
    this.list = template;
  }

  /**
   * Implementations of template fields
   */
  get listId() {
    return this.list.listId;
  }
  get version() {
    return this.list.version;
  }
  get title() {
    return this.list.title;
  }
  get game() {
    return this.list.game;
  }
  get mode() {
    return this.list.mode;
  }
  get faction() {
    return this.list.faction;
  }
  get notes() {
    return this.list.notes;
  }
  get pointTotal() {
    return this.list.pointTotal;
  }
  get killPoints() {
    return this.list.killPoints;
  }
  get competitive() {
    return this.list.competitive;
  }
  get battleForce() {
    return this.list.battleForce;
  }
  get killedUnits() {
    return this.list.killedUnits;
  }
  get units() {
    return this.list.units;
  }
  get unitObjectStrings() {
    return this.list.unitObjectStrings;
  }
  get commandCards() {
    return this.list.commandCards;
  }
  get objectiveCards() {
    return this.list.objectiveCards;
  }
  get conditionCards() {
    return this.list.conditionCards;
  }
  get deploymentCards() {
    return this.list.deploymentCards;
  }
  // List of cardIds of unique personas.
  get uniques() {
    return this.list.uniques;
  }
  get commanders() {
    return this.list.commanders;
  }
  get unitCounts() {
    return this.list.unitCounts;
  }
  get contingencies() {
    return this.list.contingencies;
  }

  /**
   * Utility functions
   */
  get activations(): number {
    const numActivations = this.list.units.reduce((num, unit) => {
      num += unit.count;
      return num;
    }, 0);
    console.log("ACTIVATIONS", numActivations);
    return numActivations;
  }
}
