import * as React from "react";
import {Avatar, Icon} from "@mui/material";
import {themes, factions} from "@legion-hq/constants";
import {useSettings} from "@legion-hq/hooks/app/useSettings";

type Props = {
  faction: string;
  isAvatar?: boolean;
  style?: React.CSSProperties;
};

export function FactionIcon({faction, isAvatar = false, style}: Props) {
  const {themeMode} = useSettings();
  if (faction in factions) {
    const paletteType = themes.palettes[themeMode].mode;
    if (isAvatar) {
      return (
        <Avatar alt={faction} src={factions[faction].icon[paletteType]} style={style} />
      );
    } else {
      return (
        <Icon color="error">
          <img
            alt={faction}
            src={factions[faction].icon[paletteType]}
            style={style ? style : {marginBottom: 5}}
          />
        </Icon>
      );
    }
  } else return <div />;
}
