import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Heading, Paragraph, Button } from "evergreen-ui";

const StyledContainer = styled.div`
  text-align: center;

  & > * {
    margin-bottom: 16px;
  }
`;

const NotFound = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return (
    <StyledContainer>
      <Heading size={900}>Not found</Heading>
      <Paragraph>Page you visit unavailable</Paragraph>
      <Paragraph>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </Paragraph>
    </StyledContainer>
  );
};

export default NotFound;
