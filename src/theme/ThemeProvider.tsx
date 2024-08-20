import React from "react";
import {CssBaseline} from "@mui/material";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import themes from "@legion-hq/constants/themes";
import {useAppContext} from "@legion-hq/context/app/useAppContext";
import {createPalette} from "./createPalette";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({children}: Props) {
  const {settings} = useAppContext();

  let theme = responsiveFontSizes(
    createTheme({
      palette: themes.palettes[settings.themeMode],
    }),
  );

  theme = createTheme(theme, {
    ...createPalette(theme),
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
