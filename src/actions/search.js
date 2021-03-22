import types from "types";
import request from "util/request";

export function search(value) {
  return (dispatch, getState) => {
    const user = getState().auth.user.username;
    const allChats = getState().chats.byId;
    const filterChats = [];
    const filterUsers = [user];

    for (const key in allChats) {
      const chat = allChats[key];
      const username = chat.to.username;

      if (username.includes(value)) {
        filterChats.push(key);
        filterUsers.push(username);
      }
    }

    dispatch(setChatsResults(filterChats));

    request
      .post("/auth/search", {
        value,
        ignore: filterUsers
      })
      .then((response) => dispatch(setUsersResults(response.data)))
      .catch((error) => console.error(error));
  };
}

function setChatsResults(chats) {
  return { type: types.SET_CHATS_RESULTS, payload: chats };
}

function setUsersResults(users) {
  return { type: types.SET_USERS_RESULTS, payload: users };
}

export function clearResults() {
  return { type: types.CLEAR_RESULTS };
}

export function setSearching(loading) {
  return { type: types.SET_SEARCHING, payload: loading };
}
