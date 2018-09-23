import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userStore from "./stores/userStore";

const rootReducer = combineReducers({
  userStore
});

/**
 *
 * @param {Object} INITIAL_STATE - initial state from server
 * @param {Function} axiosIntance - axios library or custom axios instance
 * @return {Object} redux store
 */
const createStores = (INITIAL_STATE = {}, axiosInstance = require("axios")) => {
  const store = createStore(
    rootReducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(store.replaceReducer(rootReducer));
  }

  return store;
};

export { rootReducer };
export default createStores;
