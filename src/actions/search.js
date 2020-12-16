import types from "types";
import request from "util/request";

export function search(value) {
  return async (dispatch, getState) => {        
    const {
      auth: { user },
      chats: { collection }
    } = getState();

    const chats = collection.filter(chat => chat.to.username.includes(value));
    const ignore = chats.map(chat => chat.to.username).concat(user.username);

    try {
      const response = await request.post("/auth/search", { value, ignore });
      dispatch(setSearch(chats, response.data));
    }

    catch (error) {
      dispatch(clearSearch());
      console.error(error);
    }
  };
}

function setSearch(chats, users) {
  return {
    type: types.SEARCH,
    payload: {
      chats,
      users
    }
  };
}

export function clearSearch() {
  return { type: types.CLEAR_SEARCH };
}