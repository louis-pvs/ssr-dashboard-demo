import axios from "axios";
import express from "express";
import Loadable from "react-loadable";
import React from "react";
import { getBundles } from "react-loadable/webpack";
import { matchRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { StaticRouter } from "react-router-dom";

import App from "../../client/App";
import createStores, { rootReducer } from "../../reducers";
import htmlRenderer from "../helpers/renderer";
import routes from "../../client/routes";

const stats = require("../../../build/react-loadable.json");

const sheet = new ServerStyleSheet();
const context = {};
const modules = [];

export default app => {
  app
    .disable("x-powered-by")
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get("/*", (req, res) => {
      //create axios instance to pass to redux-thunk
      const serverAxiosInstance = axios.create({
        baseURL: "http://react-ssr-api.herokuapp.com",
        headers: { cookie: req.get("cookie") || "" }
      });

      // using prebuild createStore function to generate redux stores
      const stores = createStores({}, serverAxiosInstance);

      /**
       * resolving all the initial api call before rendering React app before sending back to user
       * @return {function} promises - promises from action creator
       */

      const componentsLoadData = matchRoutes(routes, req.path).map(
        ({ route }) => {
          if (!route.loadData) return null;
          return route.loadData(stores);
        }
      );

      /** return express response */
      const resolveResponse = () => {
        if (context.url) {
          return res.redirect(context.url);
        } else {
          // creating react markup
          let bundles = getBundles(stats, modules);
          const reactMarkup = renderToString(
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
              <StyleSheetManager sheet={sheet.instance}>
                <Provider store={stores}>
                  <StaticRouter context={context} location={req.url}>
                    <App />
                  </StaticRouter>
                </Provider>
              </StyleSheetManager>
            </Loadable.Capture>
          );
          return res
            .status(200)
            .send(htmlRenderer(reactMarkup, bundles, stores));
        }
      };

      return Promise.all(componentsLoadData).then(resolveResponse);
    });
};
