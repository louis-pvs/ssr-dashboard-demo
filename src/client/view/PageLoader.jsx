import React from "react";
import styled from "styled-components";
import { Heading, Button, Paragraph } from "evergreen-ui";

const StyledLoadContainer = styled.div`
  text-align: center;
`;

const Loader = props => {
  if (props.error) {
    return (
      <StyledLoadContainer>
        <Heading>Error! </Heading>
        <Paragraph>
          <Button onClick={props.retry}>Retry</Button>
        </Paragraph>
      </StyledLoadContainer>
    );
  } else if (props.timedOut) {
    return (
      <StyledLoadContainer>
        <Heading>Timeout! </Heading>
        <Paragraph>
          Taking a long time... <Button onClick={props.retry}>Retry</Button>
        </Paragraph>
      </StyledLoadContainer>
    );
  } else if (props.pastDelay) {
    return (
      <StyledLoadContainer>
        <Paragraph>Loading...</Paragraph>
      </StyledLoadContainer>
    );
  } else {
    return null;
  }
};

export default Loader;
