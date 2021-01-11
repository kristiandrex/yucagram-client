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
        filterChats.push(chat._id);
        filterUsers.push(chat.to.username);
      }
    }

    try {
      const response = await request.post("/auth/search", { value, ignore: filterUsers });
      dispatch(setResults(filterChats, response.data));
    }

    catch (error) {
      console.error(error);
      dispatch(clearResults());
    }
  };
}

function setResults(chats, users) {
  return {
    type: types.SET_RESULTS,
    payload: {
      chats,
      users,
    }
  };
}

export function clearResults() {
  return { type: types.CLEAR_RESULTS };
}

export function setSearching() {
  return { type: types.SET_SEARCHING };
}