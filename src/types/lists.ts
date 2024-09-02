import {FactionType, LegionMode} from "./constants";
import {RankType} from "./units";

export type UnitCount = Record<RankType, number>;

export type ListIssue = {
  level: number;
  text: string;
};

export interface Counterpart {
  count: number;
  counterpartId: string;
  totalUnitCost: number;
  upgradesEquipped: Array<string | null>;
  loadoutUpgrades: Array<string | null>;
  additionalUpgradeSlots: Array<string | null>;
}

export interface ListUnit {
  unitId: string;
  count: number;
  hasUniques: boolean;
  totalUnitCost: number;
  unitObjectString: string;
  upgradesEquipped: Array<string | null>;
  loadoutUpgrades: Array<string | null>;
  additionalUpgradeSlots: Array<string | null>;
  validationIssues?: Array<ListIssue>;

  flawId?: string;
  counterpart?: Counterpart;
  /**
   * Upgrade modifiers.
   *
   * Record format:
   *  - key: string <CARD_ID>
   *  - value: number <POINT_DELTA>
   */
  upgradeInteractions?: Record<string, number>;
}

export interface ListTemplate {
  listId?: string;
  version: number;
  title: string;
  game: string;
  mode: LegionMode;
  faction: FactionType;
  notes: string;
  pointTotal: number;
  killPoints: number;
  competitive: boolean;
  battleForce: string;
  killedUnits: Array<unknown>;
  units: Array<ListUnit>;
  unitObjectStrings: Array<string>;
  commandCards: Array<string>;
  objectiveCards: Array<string>;
  conditionCards: Array<string>;
  deploymentCards: Array<string>;
  /**
   * List of cardIds of unique personas.
   */
  uniques: Array<string>;
  commanders: Array<string>;
  unitCounts: UnitCount;
  contingencies?: Array<string>;

  isUsingOldPoints?: boolean;
  hasFieldCommander?: boolean;

  /**
   * Rank modifiers.
   *
   * Record format:
   *  - key: string <CARD_ID>
   *  - value: number <BOUNDRY_DELTA>
   */
  rankInteractions?: Record<string, number>;
}
