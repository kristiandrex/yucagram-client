import { normalize, schema } from "normalizr";
import request from "util/request";
import types from "types";

export function loadChats(chats) {
  const message = new schema.Entity("messages", {}, { idAttribute: "_id" });
  const chat = new schema.Entity("chats", { messages: [message] }, { idAttribute: "_id" });
  const { entities } = normalize(chats, [chat]);
  
  return { type: types.LOAD_CHATS, payload: entities };
}

export function setCurrent(payload) {
  return { type: types.SET_CURRENT, payload };
}

export function createChat(user) {
  return async function (dispatch) {
    try {
      const response = await request.post("/auth/chats", { user });
      dispatch({ type: types.CREATE_CHAT, payload: response.data });
    }

    catch (error) {
      console.log(error);
    }
  };
}

export function addChat(user) {
  return async function (dispatch) {
    try {
      const response = await request.get(`/auth/chats/${user}`);
      dispatch({ type: types.ADD_CHAT, payload: response.data });
    }

    catch (error) {
      console.log(error);
    }
  };
}

export function closeCurrent() {
  return { type: types.CLOSE_CURRENT };
}