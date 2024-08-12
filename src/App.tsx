import * as React from "react";
import Pages from "./Pages";
import DataContext from "@legion-hq/context/DataContext";
import ActionBar from "@legion-hq/common/ActionBar";
import {NavigationDrawer} from "@legion-hq/common/NavigationDrawer";
import {createTheme, ThemeProvider, responsiveFontSizes} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import themes from "@legion-hq/constants/themes";

export function App() {
  const {userSettings} = React.useContext(DataContext);

  const theme = responsiveFontSizes(
    createTheme({
      typography: {
        // useNextVariants: true
      },
      palette: themes.palettes[userSettings.themeColor],
    }),
  );

  // if (userSettings.discordWidget) {
  //   const discordCrate = window.crate;
  //   const { discordWidget } = userSettings;
  //   if (discordWidget === 'hidden') discordCrate.hide();
  //   else discordCrate.show();
  // }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ActionBar />
      <NavigationDrawer />
      <Pages />
      {/*
       */}
    </ThemeProvider>
  );
}

/*     <ThemeWrapper themeColor={userSettings.themeColor}> */
