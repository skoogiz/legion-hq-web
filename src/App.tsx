import * as React from "react";
import Pages from "./Pages";
import DataContext from "@legion-hq/context/DataContext";
import ThemeWrapper from "@legion-hq/utility/ThemeWrapper";
import ActionBar from "@legion-hq/common/ActionBar";
import NavigationDrawer from "@legion-hq/common/NavigationDrawer";

export function App() {
  const {userSettings} = React.useContext(DataContext);
  // if (userSettings.discordWidget) {
  //   const discordCrate = window.crate;
  //   const { discordWidget } = userSettings;
  //   if (discordWidget === 'hidden') discordCrate.hide();
  //   else discordCrate.show();
  // }
  return (
    <ThemeWrapper themeColor={userSettings.themeColor}>
      <ActionBar />
      <NavigationDrawer />
      <Pages />
    </ThemeWrapper>
  );
}
