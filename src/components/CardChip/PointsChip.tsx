import React from "react";
import {Chip, Typography} from "@mui/material";
import {ChipProps} from "./CardChip.types";

interface Props extends ChipProps {
  points: number;
}

export function PointsChip({size, points}: Props) {
  const label = `${points} ${points === 1 ? "point" : "points"}`;
  return (
    <Chip
      size={size}
      label={<Typography variant="body2">{label}</Typography>}
      style={{marginBottom: 4, marginRight: 4}}
    />
  );
}
