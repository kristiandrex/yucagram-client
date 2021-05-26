import request from "util/request";
import { normalizeChatAndMessages } from "util/normalize";
import types from "types";

export function loadChats(rawChats) {
  const totalUnread = rawChats.reduce((a, b) => a + b.unread, 0);
  const { chats, messages } = normalizeChatAndMessages(rawChats);

  return {
    type: types.LOAD_CHATS,
    payload: {
      chats,
      messages,
      totalUnread
    }
  };
}

export function setCurrent(payload) {
  return { type: types.SET_CURRENT, payload };
}

export function createChat(user) {
  return function (dispatch) {
    request({ method: "post", url: "/auth/chats", data: { user } })
      .then((response) => {
        dispatch({
          type: types.CREATE_CHAT,
          payload: response.data
        });
      })
      .catch((error) => console.error(error));
  };
}

export function addChat(user) {
  return function (dispatch) {
    request({ method: "get", url: `/auth/chats/${user}` })
      .then((response) => {
        dispatch({
          type: types.ADD_CHAT,
          payload: response.data
        });
      })
      .catch((error) => console.error(error));
  };
}

export function closeCurrent() {
  return { type: types.CLOSE_CURRENT };
}
