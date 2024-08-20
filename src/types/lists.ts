import {RankType} from "./units";

export type UnitCount = Record<RankType, number>;

export interface ListTemplate {
  version: number;
  title: string;
  game: string;
  mode: string;
  faction: string;
  notes: string;
  pointTotal: number;
  killPoints: number;
  competitive: boolean;
  battleForce: string;
  killedUnits: Array<unknown>;
  units: Array<unknown>;
  commandCards: Array<unknown>;
  objectiveCards: Array<unknown>;
  conditionCards: Array<unknown>;
  deploymentCards: Array<unknown>;
  uniques: Array<unknown>;
  commanders: Array<unknown>;
  unitObjectStrings: Array<unknown>;
  unitCounts: UnitCount;
}
