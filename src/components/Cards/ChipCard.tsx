import React from "react";
import {Chip} from "@mui/material";
import {type LegionCard} from "@legion-hq/types";
import {CardUtils} from "@legion-hq/utility/cards";
import {ThemeUtils} from "@legion-hq/theme";

type Props = {
  card: LegionCard;
  handleClick: (event: React.SyntheticEvent) => void;
  chipSize?: "medium" | "small";
  handleDelete?: (event: React.SyntheticEvent) => void;
};

export function ChipCard({card, handleClick, chipSize, handleDelete}: Props) {
  return (
    <Chip
      clickable
      size={chipSize}
      label={CardUtils.getDisplayName(card)}
      onClick={handleClick}
      onDelete={handleDelete}
      style={{marginBottom: 4, marginLeft: 4}}
      color={ThemeUtils.colorName(card.faction)}
    />
  );
}
