import {FactionType} from "@legion-hq/types";
import {PaletteColor, Theme} from "@mui/material";

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

export const getFactionColor = ({
  faction,
  theme,
}: {
  faction: FactionType;
  theme: Theme;
}): PaletteColor => {
  const color = colorName(faction);
  return color ? theme.palette[color] : theme.palette.primary;
};
