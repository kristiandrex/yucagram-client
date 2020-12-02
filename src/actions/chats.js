import request from "helpers/request";
import types from "types";

export function loadChats() {
    return async (dispatch) => {
        try {
            const response = await request.get("/auth/chats");

            dispatch({
                type: types.LOAD_CHATS,
                payload: response.data
            });
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
    return async function (dispatch) {
        try {
            const response = await request.post("/auth/chats", { user });

            dispatch({
                type: types.CREATE_CHAT,
                payload: response.data
            });
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

            dispatch({
                type: types.ADD_CHAT,
                payload: response.data
            });
        }

        catch (error) {
            console.log(error);
        }
    };
}