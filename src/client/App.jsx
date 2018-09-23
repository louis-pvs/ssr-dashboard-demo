import React, { Fragment } from "react";
import styled, { injectGlobal } from "styled-components";
import { renderRoutes } from "react-router-config";

import * as actions from "../reducers/actions";
import Header from "./view/Header";

const StyledAppContainer = styled.div`
  padding: 16px;
`;

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

const App = ({ route }) => (
  <Fragment>
    <Header />
    <StyledAppContainer>{renderRoutes(route.routes)}</StyledAppContainer>
  </Fragment>
);

export const loadCurrentUser = ({ dispatch }) => {
  return dispatch(actions.fetchCurrentUser());
};

export default App;
