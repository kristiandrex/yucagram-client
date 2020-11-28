import ajax from "helpers/ajax";
import types from "types";

export function loadChats() {
    return async (dispatch) => {
        try {
            const response = await ajax.get("/api/auth/chats");
            dispatch({ type: types.LOAD_CHATS, payload: response.data });
        }

        catch (error) {
            console.error(error);
        }
    };
}

export function setCurrent(payload) {
    return {
        type: types.SET_CURRENT,
        payload
    };
}

export function createChat(user) {
    return function (dispatch) {
        console.log(user);
    };
}