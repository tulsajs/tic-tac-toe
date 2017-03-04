import { createStore, compose } from "redux";
import rootReducer from "../reducers";
import { persistState } from "redux-devtools";

export default initialState => {
  let getDebugSessionKey = function() {
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return matches && matches.length ? matches[1] : null;
  };

  let enhancer = compose(
    window.devToolsExtension
      ? window.devToolsExtension()
      : require("./devTools").default.instrument(),
    persistState(getDebugSessionKey())
  );
  return createStore(rootReducer, initialState, enhancer);
};
