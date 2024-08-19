import React from "react";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {ImageCard} from "./ImageCard";
import {TextCard} from "./TextCard";
import {ChipCard} from "./ChipCard";
import {useSettings} from "@legion-hq/hooks/app/useSettings";

type Props = {
  id: string;
  isBasic?: boolean;
  isSelected?: boolean;
  size?: "medium" | "small";
  handleClick?: (event: React.SyntheticEvent) => void;
  handleCardZoom: (event: React.SyntheticEvent) => void;
  handleDelete: (event: React.SyntheticEvent) => void;
};

export function LegionCard({
  id,
  isBasic = false,
  isSelected = false,
  size = "medium",
  handleClick,
  handleCardZoom,
  handleDelete,
}: Props) {
  const {cardStyle, includeCustomCards} = useSettings();
  const {cards} = useCards();
  const card = cards[id];

  if (!card || (card.metaData?.isCustomCard && includeCustomCards === "no")) return null;

  if (isBasic) {
    return (
      <ChipCard
        chipSize={size}
        card={card}
        handleClick={handleCardZoom}
        handleDelete={handleDelete}
      />
    );
  } else if (cardStyle === "images") {
    return (
      <ImageCard
        isSelected={isSelected}
        card={card}
        handleClick={isSelected ? undefined : handleClick}
        handleCardZoom={handleCardZoom}
      />
    );
  } else if (cardStyle === "text") {
    return (
      <TextCard
        // isSelected={isSelected}
        card={card}
        handleClick={isSelected ? undefined : handleClick}
        handleCardZoom={handleCardZoom}
      />
    );
  } else {
    return null;
  }
}
