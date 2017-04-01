import match from "./matchReducer.js";
import socket from "./socketReducer.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  match,
  socket
});

export default rootReducer;
