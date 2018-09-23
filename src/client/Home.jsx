import React from "react";
import { Button } from "evergreen-ui";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import logo from "./react.svg";

const homeLogoSpon = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledHomeContainer = styled.div`
  text-align: center;
`;

const StyledHomeLogo = styled.img`
  animation: ${homeLogoSpon} infinite 20s linear;
  height: 80px;
`;

const StyledHomeHeader = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const StyledHomeIntro = styled.p`
  font-size: large;
`;

const StyledHomeResourcesList = styled.ul`
  list-style: none;
`;

const StyledHomeResourcesListItem = styled.li`
  display: inline-block;
  padding: 1rem;
`;

class Home extends React.Component {
  onClick = () => {
    console.log("clicking from client");
  };
  render() {
    return (
      <StyledHomeContainer>
        <StyledHomeHeader>
          <StyledHomeLogo src={logo} alt="logo" />
          <h2>Welcome to Razzle</h2>
        </StyledHomeHeader>
        <Button onClick={this.onClick}>
          I am using{" "}
          <span role="img" aria-label="emoji">
            🌲
          </span>{" "}
          Evergreen!
        </Button>
        <StyledHomeIntro>
          To get started, edit <code>src/App.js</code> or{" "}
          <code>src/Home.js</code> and save to reload.
        </StyledHomeIntro>
        <StyledHomeResourcesList>
          <StyledHomeResourcesListItem>
            <Link to="/users">
              Say{" "}
              <span role="img" aria-label="emoji">
                👋
              </span>{" "}
              to users
            </Link>
          </StyledHomeResourcesListItem>
          <StyledHomeResourcesListItem>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </StyledHomeResourcesListItem>
          <StyledHomeResourcesListItem>
            <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
          </StyledHomeResourcesListItem>
          <StyledHomeResourcesListItem>
            <a href="https://palmer.chat">Community Slack</a>
          </StyledHomeResourcesListItem>
        </StyledHomeResourcesList>
      </StyledHomeContainer>
    );
  }
}

export default Home;
