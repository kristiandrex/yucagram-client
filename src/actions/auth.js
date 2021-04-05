import request from "util/request";
import types from "types";

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
  return setUser(payload.user);
}

function signinToken() {
  return async function (dispatch) {
    try {
      const response = await request({ method: "get", url: "/auth" });
      dispatch(setUser(response.data));
    } catch (error) {
      dispatch(signout());
      console.error(error);
    }
  };
}

export function signin(payload) {
  localStorage.setItem("token", payload.token);
  return setUser(payload.user);
}

function setUser(user) {
  return { type: types.SET_USER, payload: user };
}

export function signout() {
  localStorage.removeItem("token");
  return { type: types.SIGNOUT };
}

export function changeAvatar(payload) {
  return { type: types.SET_AVATAR, payload };
}
