import * as TYPE from "../actions/type";

const INITIAL_STATE = {
  authenticated: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE.FETCH_CURRENT_USER:
      return { ...state, authenticated: !!action.payload };

    default:
      return state;
  }
};
