import types from "types";
import { addChat } from "./chats";

export function messageIn(payload) {
  return (dispatch, getState) => {
    const { message, chatId } = payload;
    const chat = getState().chats.byId[chatId];

    if (!chat) {
      return dispatch(addChat(message.from));
    }

    dispatch(addMessage(message, chat));
  };
}

export function addMessage(message, chat) {
  return {
    type: types.ADD_MESSAGE,
    payload: { message, chat }
  };
}

export function readMessage(payload) {
  return (dispatch, getState) => {
    const { chatId, message } = payload;
    const chat = getState().chats.byId[chatId];

    dispatch({
      type: types.READ_MESSAGE,
      payload: { message, chat }
    });
  };
}