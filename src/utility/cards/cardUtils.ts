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
  if (cardType === "battle") {
    return title || cardName;
  }
  if (cardName) {
    const name = title ? `${cardName}: ${title}` : displayName || cardName;
    return isUnique ? `• ${name}` : name;
  }
  return "";
};

export const getModalTitle = ({
  cardType,
  cardSubtype,
  title,
  displayName,
  cardName,
  isUnique,
}: LegionCard): {title: string; subtitle?: string} => {
  if (cardType === "command") {
    switch (cardSubtype) {
      case "1":
      case "2":
      case "3":
      case "4":
        return {
          title: `${displayName || cardName} (${new Array(+cardSubtype + 1).join("•")})`,
        };
      default:
    }
  }
  if (cardType === "battle") {
    return {title: title || cardName};
  }
  if (cardName) {
    return {
      title: isUnique ? `• ${cardName}` : cardName,
      subtitle: title,
    };
  }
  return {title: ""};
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
