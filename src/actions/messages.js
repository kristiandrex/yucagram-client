import { normalize, schema } from "normalizr";
import types from "types";
import { addChat } from "./chats";

export function messageIn(payload) {
  return function (dispatch, getState) {
    const { message, chat: _id } = payload;
    const chat = getState().chats.byId[_id];

    if (!chat) {
      return dispatch(addChat(message.from));
    }

    return dispatch(addMessage(message, _id));
  };
}

export function addMessage(message, chat) {
  return { type: types.ADD_MESSAGE, payload: { message, chat } };
}

export function readMessage(payload) {
  return { type: types.READ_MESSAGE, payload };
}

export function lazyMessages(messages, chat) {
  const message = new schema.Entity("messages", {}, { idAttribute: "_id" });
  const { entities } = normalize(messages, [message]);
  const normalizedMessages = entities.messages || {};

  return {
    type: types.LAZY_MESSAGES, payload: {
      messages: normalizedMessages,
      chat
    }
  };
}