import * as TYPE from "../actions/type";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE.FETCH_USERS:
      return { ...state, users: action.payload };
    case TYPE.FETCH_ADMINS:
      return { ...state, admins: action.payload };
    default:
      return state;
  }
};
