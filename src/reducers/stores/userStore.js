import * as TYPE from "../actions/type";

const INITIAL_STATE = {
  something: "tesasa"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE.FETCH_USERS:
      return { ...state, users: action.payload };

    default:
      return state;
  }
};
