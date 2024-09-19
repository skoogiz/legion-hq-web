import React from "react";
import {CssBaseline} from "@mui/material";
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {useAppContext} from "@legion-hq/context/app/useAppContext";
import {createTheme} from "./createTheme";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({children}: Props) {
  const {settings} = useAppContext();

  const theme = createTheme(settings);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
