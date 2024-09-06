import {LegionCard} from "@legion-hq/types";

export const getDisplayName = ({
  cardType,
  cardSubtype,
  title,
  displayName,
  cardName,
  isUnique,
}: LegionCard) => {
  if (cardType === "command") {
    switch (cardSubtype) {
      case "1":
      case "2":
      case "3":
      case "4":
        return `${new Array(+cardSubtype + 1).join("•")} ${displayName || cardName}`;
      default:
    }
  }
  if (cardName) {
    const name = title ? `${cardName}: ${title}` : displayName || cardName;
    return isUnique ? `• ${name}` : name;
  }
  return "";
};

export const getPips = ({cardType, cardSubtype}: LegionCard) => {
  if (cardType === "command") {
    switch (cardSubtype) {
      case "1":
      case "2":
      case "3":
      case "4":
        return `${new Array(+cardSubtype + 1).join("•")}`;
      default:
    }
  }
  return undefined;
};
