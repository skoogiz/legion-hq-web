import React from "react";
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider, responsiveFontSizes} from "@mui/material/styles";
import themes from "@legion-hq/constants/themes";
import {useAppContext} from "@legion-hq/context/app/useAppContext";

type Props = {
  children: React.ReactNode;
};

export function ThemeWrapper({children}: Props) {
  const {settings} = useAppContext();

  const theme = responsiveFontSizes(
    createTheme({
      typography: {
        // useNextVariants: true
      },
      palette: themes.palettes[settings.themeMode],
    }),
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
