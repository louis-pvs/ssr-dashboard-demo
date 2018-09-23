import React, { Fragment } from "react";
import { injectGlobal } from "styled-components";
import { renderRoutes } from "react-router-config";
import routes from "./routes";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,900|Roboto');
  html {
    font-size: 16px;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
  }
  h1 {
    font-family: Roboto Condensed;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover, &:focus, &:visited {
      color: inherit;
    }
  }
`;

const App = () => <Fragment>{renderRoutes(routes)}</Fragment>;

export default App;
