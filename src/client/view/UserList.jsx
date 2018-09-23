import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { OrderedList, ListItem } from "evergreen-ui";

const StyledList = styled(OrderedList)``;

const UserListItem = function({ name }) {
  return <ListItem>{name}</ListItem>;
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
