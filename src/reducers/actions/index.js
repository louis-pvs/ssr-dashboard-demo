import * as TYPE from "./type";

const fetchUsers = function() {
  return function(dispatch, _, api) {
    return api.get("/users").then(res => {
      return dispatch({ type: TYPE.FETCH_USERS, payload: res.data });
    });
  };
};

const fetchAdmins = function() {
  return function(dispatch, _, api) {
    return api.get("/admins").then(res => {
      return dispatch({ type: TYPE.FETCH_ADMINS, payload: res.data });
    });
  };
};

const fetchCurrentUser = function() {
  return function(dispatch, _, api) {
    return api.get("/current_user").then(res => {
      return dispatch({ type: TYPE.FETCH_CURRENT_USER, payload: res.data });
    });
  };
};

export { fetchUsers, fetchCurrentUser, fetchAdmins };
