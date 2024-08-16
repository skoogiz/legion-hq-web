import React from "react";
import {IconButton} from "@mui/material";
import {FactionIcon} from "@legion-hq/common/FactionIcon";
import {FactionType} from "@legion-hq/types";

type Props = {
  faction: FactionType;
  onClick: (event: React.SyntheticEvent) => void;
};

export function FactionButton({faction, onClick}: Props) {
  return (
    <IconButton size="medium" onClick={onClick}>
      <FactionIcon faction={faction} />
    </IconButton>
  );
}
