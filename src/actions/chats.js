import { normalize, schema } from "normalizr";
import request from "util/request";
import types from "types";

export function loadChats(chats) {
  const totalUnread = chats.reduce(
    (previus, current) => previus + current.unread
  );

  const idAttribute = "_id";
  const messageSchema = new schema.Entity("messages", {}, { idAttribute });
  const chatSchema = new schema.Entity(
    "chats",
    { messages: [messageSchema] },
    { idAttribute }
  );
  const { entities } = normalize(chats, [chatSchema]);

  return {
    type: types.LOAD_CHATS,
    payload: {
      chats: entities.chats,
      messages: entities.messages,
      totalUnread
    }
  };
}

export function setCurrent(payload) {
  return { type: types.SET_CURRENT, payload };
}

export function createChat(user) {
  return function (dispatch) {
    request
      .post("/auth/chats", { user })
      .then((response) => {
        dispatch({ type: types.CREATE_CHAT, payload: response.data });
      })
      .catch((error) => console.error(error));
  };
}

export function addChat(user) {
  return function (dispatch) {
    request
      .get(`/auth/chats/${user}`)
      .then((response) => {
        dispatch({ type: types.ADD_CHAT, payload: response.data });
      })
      .catch((error) => console.error(error));
  };
}

export function closeCurrent() {
  return { type: types.CLOSE_CURRENT };
}
