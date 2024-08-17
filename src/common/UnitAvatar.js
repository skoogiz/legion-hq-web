import React from "react";
import {CardIcon, IconBadge} from "@legion-hq/components";
import {useCards} from "@legion-hq/data-access/hooks/useCards";

function UnitCardAvatar({id, count = 1, handleClick}) {
  const {cards} = useCards();
  const card = cards[id];
  if (card.cardType === "counterpart") {
    return (
      <CardIcon
        size="medium"
        cardType={card.cardType}
        cardName={card.cardName}
        imageName={card.imageName}
        handleClick={handleClick}
      />
    );
  }
  return (
    <IconBadge
      count={count}
      rank={card.rank}
      avatar={
        <CardIcon
          cardName={card.cardName}
          cardType={card.cardType}
          imageName={card.imageName}
          handleClick={handleClick}
        />
      }
    />
  );
}

export default UnitCardAvatar;
