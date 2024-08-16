import React from "react";
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider, responsiveFontSizes} from "@mui/material/styles";
import themes from "@legion-hq/constants/themes";

type Props = {
  children: React.ReactNode;
  themeColor: unknown;
};

function ThemeWrapper({children, themeColor}: Props) {
  const theme = responsiveFontSizes(
    createTheme({
      typography: {useNextVariants: true},
      palette: themes.palettes[themeColor],
    }),
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default ThemeWrapper;
