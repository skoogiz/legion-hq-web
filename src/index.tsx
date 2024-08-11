import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {DataProvider} from "@legion-hq/context/DataContext";
import {App} from "./App";
import {Auth0Provider} from "@auth0/auth0-react";
import auth from "@legion-hq/constants/auth";

const {domain, clientID} = auth.v1;
const {returnTo} = auth.prod;

ReactDOM.render(
  <Router>
    <Auth0Provider domain={domain} clientId={clientID} redirectUri={returnTo}>
      <DataProvider>
        <App />
      </DataProvider>
    </Auth0Provider>
  </Router>,
  document.getElementById("root"),
);
