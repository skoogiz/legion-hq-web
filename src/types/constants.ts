import {RankType} from "./units";

export type FactionType = "rebels" | "empire" | "republic" | "separatists" | "fringe";

export interface FactionInfo {
  name: string;
  singular: string;
  longName: string;
  forceAffinity?: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  icon: {
    dark: string;
    light: string;
  };
}

export type LegionMode =
  | "500-point mode"
  | "standard mode"
  | "grand army mode"
  | "storm tide: infantry"
  | "storm tide: armored"
  | "storm tide: special forces";

type Quantity = [min: number, max: number];

export type UnitRestrictions = Record<RankType, Quantity> & {
  // commander: Quantity;
  // operative: Quantity;
  // corps: Quantity;
  // special: Quantity;
  // support: Quantity;
  // heavy: Quantity;
  commOp?: number;
};

export interface LegionModeInfo {
  name: string;
  maxPoints: number;
  unitCounts: UnitRestrictions;
}

export const BLACK_DICE = "black";
export const WHITE_DICE = "white";
export const RED_DICE = "red";

export type AttackDiceType = typeof BLACK_DICE | typeof WHITE_DICE | typeof RED_DICE;

export type DefenceDiceType = typeof WHITE_DICE | typeof RED_DICE;

export type SurgeType = "hit" | "crit" | "block";
