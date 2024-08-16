import {DefenceDiceType, SurgeType} from "@legion-hq/types";

export type ChipSize = "small" | "medium";

export type StatType = "wounds" | "resilience" | "courage";

export interface ChipProps {
  size?: ChipSize;
}

interface SurgeProps extends ChipProps {
  type: "surge" | "surges";
  value: SurgeType[];
}

interface DefenseProps extends ChipProps {
  type: "defense";
  value: DefenceDiceType;
}

interface PointsProps extends ChipProps {
  type: "points";
  value: number;
}

interface SpeedProps extends ChipProps {
  type: "speed";
  value: number;
}

interface StatProps extends ChipProps {
  type: StatType;
  value: number;
}

export type CardChipProps =
  | SurgeProps
  | DefenseProps
  | PointsProps
  | SpeedProps
  | StatProps;
