import React, {useContext} from "react";
import {Chip} from "@mui/material";
import ListContext from "@legion-hq/context/ListContext";
import {CardIcon} from "@legion-hq/components";
import {useCards} from "@legion-hq/data-access/hooks/useCards";

function UnitFlaw({flawId}) {
  const {cards} = useCards();
  const {handleCardZoom} = useContext(ListContext);
  const flawCard = cards[flawId];
  const chipStyle = {marginRight: 4, marginBottom: 4, backgroundColor: "#512818"};
  return (
    <div>
      <Chip
        label={`${flawCard.displayName ? flawCard.displayName : flawCard.cardName}`}
        avatar={
          <CardIcon
            size="small"
            cardType="command"
            card={cards[flawId]}
            imageName={flawCard.imageName}
            handleClick={() => handleCardZoom(flawId)}
          />
        }
        style={chipStyle}
      />
    </div>
  );
}

export default UnitFlaw;
