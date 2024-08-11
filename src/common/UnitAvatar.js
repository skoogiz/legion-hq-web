import React from "react";
import IconBadge from "@legion-hq/common/IconBadge";
import CardIcon from "@legion-hq/common/CardIcon";
import cards from "@legion-hq/constants/cards";

function UnitCardAvatar({id, count = 1, handleClick}) {
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
