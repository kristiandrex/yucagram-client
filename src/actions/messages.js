import types from "types";
import { addChat } from "./chats";

/**
 * 
 * @param {*} payload 
 */
export function messageIn(payload) {
  return function (dispatch, getState) {
    const chat = getState().chats.byId[payload.chat];

    if (!chat) {
      return dispatch(addChat(payload.message.from));
    }

    return dispatch(addMessage(payload.message, chat._id));
  };
}

/**
 * 
 * @param {*} message 
 * @param {*} chat  _id
 */
export function addMessage(message, chat) {
  return {
    type: types.ADD_MESSAGE,
    payload: {
      message,
      chat
    }
  };
}

/**
 * 
 * @param {*} payload 
 */
export function readMessage(payload) {
  return {
    type: types.READ_MESSAGE,
    payload
  };
}