import React from "react";
import {Typography} from "@mui/material";
import cards from "@legion-hq/constants/cards";

function CardName({id, variant = "body1"}) {
  const card = cards[id];
  return (
    <Typography variant={variant}>
      {card.displayName ? card.displayName : card.cardName}
    </Typography>
  );
}

export default CardName;
