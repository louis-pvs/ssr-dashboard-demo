import axios from "axios";
import express from "express";
import Loadable from "react-loadable";
import React from "react";
import { getBundles } from "react-loadable/webpack";
import { matchRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { StaticRouter } from "react-router-dom";

import App from "../../client/App";
import createStores, { rootReducer } from "../../reducers";
import htmlRenderer from "../helpers/renderer";
import routes from "../../client/routes";

const stats = require("../../../build/react-loadable.json");

const sheet = new ServerStyleSheet();

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
      const loadComponentDatas = location => {
        const branch = matchRoutes(routes, location);
        const resolveLoadDataPromise = ({ route }) => {
          if (route.loadData) return route.loadData(stores);
        };
        const resolveInnerPromise = innerPromise => {
          if (!innerPromise) return;
          return new Promise(resolve => {
            innerPromise.then(resolve).catch(resolve);
          });
        };
        const promises = branch
          .map(resolveLoadDataPromise)
          .map(resolveInnerPromise);

        return Promise.all(promises);
      };

      /** return express response */
      const resolveResponse = () => {
        const context = { status: 200 };
        const modules = [];

        // creating react markup
        const reactMarkup = renderToString(
          <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <StyleSheetManager sheet={sheet.instance}>
              <Provider store={stores}>
                <StaticRouter context={context} location={req.url}>
                  {renderRoutes(routes)}
                </StaticRouter>
              </Provider>
            </StyleSheetManager>
          </Loadable.Capture>
        );

        const styles = sheet.getStyleTags();
        const bundles = getBundles(stats, modules);
        const content = htmlRenderer(reactMarkup, styles, bundles, stores);

        if (context.statusCode) res.status(context.statusCode);
        if (context.url) return res.redirect(context.url);

        return res.send(content);
      };

      return loadComponentDatas(req.url).then(resolveResponse);
    });
};
