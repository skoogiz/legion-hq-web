import * as React from "react";
import {Route, Routes} from "react-router-dom";
import {createListTemplate} from "@legion-hq/constants/listTemplate";
import {type ListTemplate} from "@legion-hq/types";
import {LoadingWidget} from "./components";

const Home = React.lazy(() => import("@legion-hq/pages/Home"));
const News = React.lazy(() => import("@legion-hq/pages/News"));
const Cards = React.lazy(() => import("@legion-hq/pages/Cards"));
const Roller = React.lazy(() => import("@legion-hq/pages/Roller"));
const Privacy = React.lazy(() => import("@legion-hq/pages/Privacy"));
const List = React.lazy(() => import("@legion-hq/pages/List"));
const Settings = React.lazy(() => import("@legion-hq/pages/Settings"));
const Info = React.lazy(() => import("@legion-hq/pages/Info"));

const initLists = (): Record<string, ListTemplate> => ({
  rebels: createListTemplate({faction: "rebels"}),
  empire: createListTemplate({faction: "empire"}),
  republic: createListTemplate({faction: "republic"}),
  separatists: createListTemplate({faction: "separatists"}),
  fringe: createListTemplate({faction: "fringe", battleForce: "Shadow Collective"}),
});

export function Pages() {
  const [storedLists, setStoredLists] = React.useState(initLists());

  const updateStoredList = (newList: ListTemplate) => {
    setStoredLists({...storedLists, [newList.faction]: newList});
  };

  return (
    <React.Suspense fallback={<LoadingWidget />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="list/*">
          <Route
            path=":slug"
            element={
              <List storedLists={storedLists} updateStoredList={updateStoredList} />
            }
          />
          <Route
            path=":slug/:listHash"
            element={
              <List storedLists={storedLists} updateStoredList={updateStoredList} />
            }
          />
        </Route>
        <Route path="/roller" element={<Roller />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/info" element={<Info />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </React.Suspense>
  );
}
