import { combineReducers } from "redux";

import auth from "./auth";
import chats from "./chats";
import messages from "./messages";
import results from "./results";

export default combineReducers({
  chats,
  messages,
  results,
  auth
});