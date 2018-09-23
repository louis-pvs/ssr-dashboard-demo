import React from "react";
import { connect } from "react-redux";
import { Heading } from "evergreen-ui";

import * as actions from "../../../reducers/actions";
import UserList from "../../view/UserList";

class AdminModule extends React.PureComponent {
  state = { users: [] };
  componentDidMount = () => {
    this.props.fetchAdmins();
  };

  static getDerivedStateFromProps(props, state) {
    const newState = { ...state, users: props.users };
    return newState;
  }
  render() {
    return (
      <div>
        <Heading size={900}>Admin List</Heading>
        <UserList users={this.state.users} />
      </div>
    );
  }
}

const mapStateToProps = ({ userStore }) => {
  return { users: userStore.admins };
};

export const loadAdminData = stores => {
  return stores.dispatch(actions.fetchAdmins());
};

export default connect(
  mapStateToProps,
  actions
)(AdminModule);
