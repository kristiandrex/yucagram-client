import ajax from "helpers/ajax";
import types from "../types";

export function verifyAuth() {
    const token = localStorage.getItem("token");

    return (dispatch) => {
        if (token === null) {
            return dispatch(signout());
        }

        dispatch(signinToken());
    };
}

export function signup(payload) {
    localStorage.setItem("token", payload.token);
    return setUser(payload);
}

function signinToken() {
    return async (dispatch) => {
        try {
            const response = await ajax.get("/api/auth");
            const token = localStorage.getItem("token");

            dispatch(setUser({ user: response.data, token }));
        }

        catch (error) {
            console.log(error);
        }
    };
}

export function signin(payload) {
    localStorage.setItem("token", payload.token);
    return setUser(payload);
}

function setUser(payload) {
    return { type: types.SET_USER, payload };
}

export function signout() {
    localStorage.removeItem("token");
    return { type: types.SIGNOUT };
}

export async function changeAvatar(data) {
    try {
        const response = await ajax.post("/api/auth/upload/avatar", data);

        return {
            type: types.SET_AVATAR,
            payload: response.data
        };
    }

    catch (error) {
        console.error(error);
    }
}