import React, { useState, Suspense, lazy } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import LoadingWidget from '@legion-hq/common/LoadingWidget';
import listTemplate from '@legion-hq/constants/listTemplate';

const Home = lazy(() => import('@legion-hq/pages/Home'));
const News = lazy(() => import('@legion-hq/pages/News'));
const Cards = lazy(() => import('@legion-hq/pages/Cards'));
const Roller = lazy(() => import('@legion-hq/pages/Roller'));
const Privacy = lazy(() => import('@legion-hq/pages/Privacy'));
const List = lazy(() => import('@legion-hq/pages/List'));
const Settings = lazy(() => import('@legion-hq/pages/Settings'));
const Info = lazy(() => import('@legion-hq/pages/Info'));

function Pages() {
  const initialLists = {
    rebels: { ...listTemplate, faction: 'rebels' },
    empire: { ...listTemplate, faction: 'empire' },
    republic: { ...listTemplate, faction: 'republic' },
    separatists: { ...listTemplate, faction: 'separatists' },
    fringe: { ...listTemplate, faction: 'fringe', battleForce: 'Shadow Collective' }
  };
  const [storedLists, setStoredLists] = useState(() => initialLists);
  const updateStoredList = (newList) => {
    const faction = newList.faction;
    storedLists[faction] = newList;
    setStoredLists({ ...storedLists });
  }
  return (
    <Suspense fallback={<LoadingWidget />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="list/*">
          <Route path=":slug" element={<List
            storedLists={storedLists}
            updateStoredList={updateStoredList}
          />} />
          <Route path=":slug/:listHash" element={<List
            storedLists={storedLists}
            updateStoredList={updateStoredList}
          />} />
        </Route>
        <Route path="/roller" element={<Roller />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/info" element={<Info />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Suspense>
  );
};

export default Pages;
