import * as React from "react";
import {Pages} from "./Pages";
import DataContext from "@legion-hq/context/DataContext";
import ActionBar from "@legion-hq/common/ActionBar";
import {NavigationDrawer} from "@legion-hq/common/NavigationDrawer";
import {createTheme, ThemeProvider, responsiveFontSizes} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import themes from "@legion-hq/constants/themes";
// import cards from "@legion-hq/constants/cards";
// import urls from "@legion-hq/constants/urls";
// import _ from "lodash";

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

  // const data = Object.values(cards).filter(({cardType, imageName}) =>
  //   Boolean(cardType && imageName),
  // );

  // var grouped = _.mapValues(_.groupBy(data, "cardType"), (clist) =>
  //   clist.map(({cardType, imageName}) => `${urls.cdn}/${cardType}Cards/${imageName}`),
  // );

  // console.log(grouped);

  // const imgUrls = Object.values(cards)
  //   .filter(({cardType, imageName}) => Boolean(cardType && imageName))
  //   .map(({cardType, imageName}) => `${urls.cdn}/${cardType}Cards/${imageName}`);

  // console.log({imgUrls});

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
