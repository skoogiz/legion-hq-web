import React from "react";
import {Chip} from "@mui/material";
import {type LegionCard} from "@legion-hq/types";

type Props = {
  card: LegionCard;
  handleClick: (event: React.SyntheticEvent) => void;
  chipSize?: "medium" | "small";
  handleDelete?: (event: React.SyntheticEvent) => void;
};

export function ChipCard({card, handleClick, chipSize, handleDelete}: Props) {
  const {cardName, displayName} = card;
  let pips = "";
  if (card.cardSubtype === "1") pips = "•";
  else if (card.cardSubtype === "2") pips = "••";
  else if (card.cardSubtype === "3") pips = "•••";
  let label = displayName ? displayName : cardName;
  if (pips) label = `${pips} ${label}`;
  return (
    <Chip
      clickable
      size={chipSize}
      label={label ?? ""}
      onClick={handleClick}
      onDelete={handleDelete}
      style={{marginBottom: 4, marginLeft: 4}}
    />
  );
}
