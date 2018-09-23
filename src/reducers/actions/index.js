import * as TYPE from "./type";

const fetchUsers = function() {
  return function(dispatch, _, api) {
    return api.get("/users").then(users => {
      return dispatch({ type: TYPE.FETCH_USERS, payload: users.data });
    });
  };
};

export { fetchUsers };
