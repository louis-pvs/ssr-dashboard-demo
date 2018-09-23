import React, { Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "evergreen-ui";

const mapStateToProps = ({ authStore }) => {
  return { authenticated: authStore.authenticated };
};

const StyledNav = styled.nav`
  padding: 16px;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledListItem = styled.li`
  display: inline-block;
`;

const StyledLink = styled(Link)`
  margin-right: 16px;
`;

const AuthButton = connect(mapStateToProps)(function AuthenticateButton({
  authenticated
}) {
  if (authenticated)
    return (
      <a href="/api/logout">
        <Button>Log Out</Button>
      </a>
    );
  return (
    <a href="/api/auth/google">
      <Button>Log In</Button>
    </a>
  );
});

const Header = ({ authenticated }) => {
  return (
    <StyledNav>
      <StyledList>
        <StyledListItem>
          <StyledLink to="/">
            <Button>Home</Button>
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="/users">
            <Button>User List</Button>
          </StyledLink>
        </StyledListItem>
        {authenticated && (
          <Fragment>
            <StyledListItem>
              <StyledLink to="/admins">
                <Button>Admin List</Button>
              </StyledLink>
            </StyledListItem>
          </Fragment>
        )}
        <StyledListItem>
          <AuthButton />
        </StyledListItem>
      </StyledList>
    </StyledNav>
  );
};

export default connect(mapStateToProps)(Header);
