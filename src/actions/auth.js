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
      const response = await request.get("/auth");
      dispatch(setUser(response.data));
    }

    catch (error) {
      dispatch(signout());
      console.log(error);
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

export function changeAvatar(data) {
  return async function (dispatch) {
    try {
      const response = await request.post("/auth/upload/avatar", data);

      dispatch({
        type: types.SET_AVATAR,
        payload: response.data
      });
    }

    catch (error) {
      console.error(error);
    }
  };
}