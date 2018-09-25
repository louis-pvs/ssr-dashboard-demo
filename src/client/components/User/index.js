import React from "react";
import { connect } from "react-redux";
import { Heading } from "evergreen-ui";
import { Helmet } from "react-helmet";
import * as actions from "../../../reducers/actions";
import UserList from "../../view/UserList";

class UserModule extends React.PureComponent {
  state = { users: [] };
  componentDidMount = () => {
    this.props.fetchUsers();
  };

  static getDerivedStateFromProps(props, state) {
    const newState = { ...state, users: props.users };
    return newState;
  }
  wearHelmet() {
    return (
      <Helmet
        encodeSpecialCharacters
        titleTemplate={this.props.staticContext.siteName}
      >
        <title>Users List</title>
        <meta property="og:title" content="User List" />
      </Helmet>
    );
  }
  render() {
    return (
      <div>
        {this.wearHelmet()}
        <Heading size={900}>User List</Heading>
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
