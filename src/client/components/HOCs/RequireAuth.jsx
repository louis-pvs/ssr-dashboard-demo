import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default ChildComponent => {
  class RequireAuth extends PureComponent {
    render() {
      if (this.props.authenticated) return <ChildComponent {...this.props} />;
      this.props.staticContext.statusCode = 401;
      return <Redirect to="/" />;
    }
  }
  function mapStateToProps({ authStore }) {
    return {
      authenticated: authStore.authenticated
    };
  }
  RequireAuth.defaultProps = {
    staticContext: {}
  };
  return connect(mapStateToProps)(RequireAuth);
};
