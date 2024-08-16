import React from "react";
import {Chip} from "@mui/material";

type Props = {
  killPoints: number;
};

export function KillPointsField({killPoints}: Props) {
  return <Chip label={`Points Defeated: ${killPoints}`} />;
}
