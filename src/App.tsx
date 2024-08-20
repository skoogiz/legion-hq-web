import {Pages} from "./Pages";
import ActionBar from "@legion-hq/common/ActionBar";
import {NavigationDrawer} from "@legion-hq/components";

export function App() {
  return (
    <>
      <ActionBar />
      <NavigationDrawer />
      <Pages />
    </>
  );
}
