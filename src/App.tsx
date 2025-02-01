import {Pages} from "./Pages";
import {ActionBar, NavigationDrawer} from "@legion-hq/components";
import {Footer, Header, Hero, Main} from "./components/PageLayout";
import {AppFooter} from "./components/AppFooter";

export function App() {
  return (
    <>
      <Hero />
      <Header>
        <ActionBar />
      </Header>
      <Main>
        <Pages />
        <NavigationDrawer />
      </Main>
      <Footer>
        <AppFooter />
      </Footer>
    </>
  );
}
