import axios from "axios";
import BrowserRouter from "react-router-dom/BrowserRouter";
import React from "react";
import Loadable from "react-loadable";
import ReactDOM from "react-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import createStores from "./reducers";
import routes from "./client/routes";

const clientAxiosInstance = axios.create({
  baseURL: "/api"
});
let stores = createStores(window.INITIAL_STATE, clientAxiosInstance);

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <Provider store={stores}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});

if (module.hot) {
  // Enable Webpack hot module replacement for reducersss
  module.hot.accept();
}
