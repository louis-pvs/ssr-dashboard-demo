import React from "react";
import styled from "styled-components";
import { Heading, Paragraph } from "evergreen-ui";

const StyledHomeContainer = styled.div`
  text-align: center;
`;

const Home = () => (
  <StyledHomeContainer>
    <Heading size={900}>Welcome To SSR Demo</Heading>
    <Paragraph>A repo demostrate server side rendering</Paragraph>
  </StyledHomeContainer>
);

export default Home;
