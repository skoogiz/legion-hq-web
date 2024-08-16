import React, {useContext} from "react";
import DataContext from "@legion-hq/context/DataContext";
import cards from "@legion-hq/constants/cards";
import ImageCard from "./ImageCard";
import {TextCard} from "./TextCard";
import {ChipCard} from "./ChipCard";

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
  const {userSettings} = useContext(DataContext);
  const card = cards[id];
  if (isBasic) {
    return (
      <ChipCard
        chipSize={size}
        card={card}
        handleClick={handleCardZoom}
        handleDelete={handleDelete}
      />
    );
  } else if (userSettings.cardStyle === "images") {
    return (
      <ImageCard
        isSelected={isSelected}
        card={card}
        handleClick={isSelected ? undefined : handleClick}
        handleCardZoom={handleCardZoom}
      />
    );
  } else if (userSettings.cardStyle === "text") {
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
