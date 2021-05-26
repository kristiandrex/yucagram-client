import types from "types";
import socket from "util/socket";
import { addChat } from "./chats";

export function addIncomingMessage(payload) {
  return (dispatch, getState) => {
    const { message, chatId } = payload;
    const chat = getState().chats.byId[chatId];

    if (!chat) {
      return dispatch(addChat(message.from));
    }

    dispatch(addMessage(message, chat));
  };
}

export function addOutgoingMessage(message, chat) {
  return (dispatch) => {
    const io = socket.get();

    io.emit("SEND_MESSAGE", message, (response) => {
      dispatch(addMessage(response, chat));
    });
  };
}

function addMessage(message, chat) {
  return {
    type: types.ADD_MESSAGE,
    payload: { message, chat }
  };
}

export function readIncomingMessage(payload) {
  return (dispatch, getState) => {
    const chat = getState().chats.byId[payload.chat];
    payload.chat = chat;

    dispatch(readMessage(payload));
  };
}

export function readOutgoingMessage(payload) {
  return (dispatch) => {
    const message = payload.message._id;
    const io = socket.get();

    io.emit("READ_MESSAGE", message, () => {
      dispatch(readMessage(payload));
    });
  };
}

function readMessage(payload) {
  return {
    type: types.READ_MESSAGE,
    payload
  };
}
