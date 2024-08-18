import * as React from "react";
import {Pages} from "./Pages";
import ActionBar from "@legion-hq/common/ActionBar";
import {NavigationDrawer} from "@legion-hq/components";
import {ThemeWrapper} from "./utility/ThemeWrapper";

export function App() {
  return (
    <ThemeWrapper>
      <ActionBar />
      <NavigationDrawer />
      <Pages />
    </ThemeWrapper>
  );
}
