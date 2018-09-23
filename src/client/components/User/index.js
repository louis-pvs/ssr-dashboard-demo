import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../reducers/actions";
import UserList from "./UserList";

class UserModule extends React.PureComponent {
  state = { users: [] };
  componentDidMount = () => {
    this.props.fetchUsers();
  };

  static getDerivedStateFromProps(props, state) {
    const newState = { ...state, users: props.users };
    // console.log(props, newState);
    return newState;
  }
  render() {
    return (
      <div>
        <h2>User Modulessss</h2>
        <UserList users={this.state.users} />
      </div>
    );
  }
}

const mapStateToProps = ({ userStore }) => {
  return { users: userStore.users };
};

export const loadUserData = stores => {
  return stores.dispatch(actions.fetchUsers());
};

export default connect(
  mapStateToProps,
  actions
)(UserModule);
