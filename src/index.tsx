import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import {DataProvider} from "@legion-hq/context/DataContext";
import {App} from "./App";
import {Auth0Provider} from "@auth0/auth0-react";
import auth from "@legion-hq/constants/auth";
import {AppContextProvider} from "./context/app/AppContext";

const {domain, clientID} = auth.v1;
const {returnTo} = auth.prod;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Auth0Provider domain={domain} clientId={clientID} redirectUri={returnTo}>
        <AppContextProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </AppContextProvider>
      </Auth0Provider>
    </Router>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
