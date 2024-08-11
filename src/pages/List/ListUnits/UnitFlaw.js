import React, {useContext} from "react";
import {Chip} from "@material-ui/core";
import ListContext from "@legion-hq/context/ListContext";
import CardIcon from "@legion-hq/common/CardIcon";
import cards from "@legion-hq/constants/cards";

function UnitFlaw({flawId}) {
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
