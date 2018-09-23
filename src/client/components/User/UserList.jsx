import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserListItem = function({ name }) {
  return <li>{name}</li>;
};
const UserList = ({ users }) => {
  return (
    <StyledList>
      {users.map(user => (
        <UserListItem key={user.id} name={user.name} />
      ))}
    </StyledList>
  );
};

UserListItem.propTypes = {
  name: PropTypes.string
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number
    })
  )
};

UserList.defaultProps = {
  users: []
};

export default UserList;
