import React from "react";
import {IconButton} from "@mui/material";
import {FactionType} from "@legion-hq/types";
import {FactionIcon} from "@legion-hq/components";

type Props = {
  faction: FactionType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function FactionButton({faction, onClick}: Props) {
  return (
    <IconButton size="medium" onClick={onClick}>
      <FactionIcon faction={faction} />
    </IconButton>
  );
}
