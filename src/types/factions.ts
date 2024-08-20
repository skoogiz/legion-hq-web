import {FactionType, UnitRestrictions} from "./constants";
import {RankType} from "./units";

type BattleForce = Record<RankType, string[]> & {
  name: string;
  faction: FactionType;
  countsMercsForMin?: boolean;
  allowedUniqueUpgrades: string[];
  rules?: {noFieldComm?: boolean; countMercs?: boolean};
  ruleUrl: string;
  ["standard mode"]: UnitRestrictions;
  ["500-point mode"]: UnitRestrictions;
};

export type BattleForces = Record<string, BattleForce>;
