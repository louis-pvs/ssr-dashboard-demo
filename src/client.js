import BrowserRouter from "react-router-dom/BrowserRouter";
import React from "react";
import Loadable from "react-loadable";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./client/App";
import createStores from "./reducers";
import axios from "axios";

const clientAxiosInstance = axios.create({
  baseURL: "/api"
});
let stores = createStores(window.INITIAL_STATE, clientAxiosInstance);

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <Provider store={stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});

if (module.hot) {
  // Enable Webpack hot module replacement for reducersss
  module.hot.accept();
}
