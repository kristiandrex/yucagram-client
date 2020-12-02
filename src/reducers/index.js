import { combineReducers } from "redux";

import auth from "./auth";
import chats from "./chats";
import results from "./results";

export default combineReducers({
    chats,
    results,
    auth
});