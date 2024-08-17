import React from "react";
import {Typography, TypographyOwnProps} from "@mui/material";
import {useCards} from "@legion-hq/data-access/hooks/useCards";

type Props = Pick<TypographyOwnProps, "variant"> & {
  id: string;
};

export function CardName({id, variant = "body1"}: Props) {
  const {cards} = useCards();
  const card = cards[id];
  return (
    <Typography variant={variant}>
      {card.displayName ? card.displayName : card.cardName}
    </Typography>
  );
}
