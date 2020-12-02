import types from "types";
import { addChat } from "./chats";

export function messageIn(message) {
    return function (dispatch, getState) {
        const index = getState().chats.collection.findIndex(chat => chat.to._id === message.from);

        if (index === -1) {
            return dispatch(addChat(message.from));
        }

        return dispatch(addMessage(message, index));
    };
}

export function addMessage(message, index) {
    return {
        type: types.ADD_MESSAGE,
        payload: {
            message,
            index
        }
    };
}

export function messageSeen(message, chat) {
    return {
        type: types.MESSAGE_SEEN,
        payload: { message, chat }
    };
}