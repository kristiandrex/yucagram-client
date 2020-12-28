import types from "types";
import request from "util/request";

export function search(value) {
  return async (dispatch, getState) => {
    const user = getState().auth.user.username;
    const allChats = getState().chats.byId;
    const filterChats = [];
    const filterUsers = [user];

    for (const key in allChats) {
      const chat = allChats[key];

      if (chat.to.username.includes(value)) {
        filterChats.push(chat);
        filterUsers.push(chat.to.username);
      }
    }

    try {
      const response = await request.post("/auth/search", { value, ignore: filterUsers });
      dispatch(setSearch(filterChats, response.data));
    }

    catch (error) {
      console.log(error);
      dispatch(clearSearch());
    }
  };
}

function setSearch(chats, users) {
  return {
    type: types.SEARCH,
    payload: {
      chats,
      users,
      isSearching: true
    }
  };
}

export function clearSearch() {
  return { type: types.CLEAR_SEARCH };
}