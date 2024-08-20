export const colorName = (faction?: string) => {
  switch (faction) {
    case "rebels":
    case "empire":
    case "republic":
    case "separatists":
      return faction;
    case "fringe":
      return "mercenaries";
    default:
      return undefined;
  }
};
