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

export interface LegionModeInfo {
  name: string;
  maxPoints: number;
  unitCounts: {
    commander: Quantity;
    operative: Quantity;
    corps: Quantity;
    special: Quantity;
    support: Quantity;
    heavy: Quantity;
  };
}
