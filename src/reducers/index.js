import { combineReducers } from "redux";
import auth from "./auth";
import chats from "./chats";
import messages from "./messages";
import search from "./search";

export default combineReducers({
  chats,
  messages,
  search,
  auth
});