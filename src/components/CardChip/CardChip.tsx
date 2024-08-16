import React from "react";
import {SpeedChip} from "./SpeedChip";
import {SurgeChips} from "./SurgeChips";
import {DefenseChip} from "./DefenseChip";
import {PointsChip} from "./PointsChip";
import {StatChip} from "./StatChip";
import type {CardChipProps} from "./CardChip.types";
import {DefenceDiceType} from "@legion-hq/types";

export function CardChip({size = "small", type, value}: CardChipProps) {
  switch (type) {
    case "speed":
      return <SpeedChip size={size} speed={value} />;
    case "surge":
    case "surges":
      return <SurgeChips size={size} surges={value} />;
    case "defense":
      return <DefenseChip size={size} color={value as DefenceDiceType} />;
    case "points":
      return <PointsChip size={size} points={value} />;
    case "wounds":
    case "resilience":
    case "courage":
      return <StatChip size={size} type={type} value={value} />;
  }
  return null;
}
