import types from "types";
import ajax from "helpers/ajax";

export function search(value) {
    return async (dispatch, getState) => {
        const { auth: { user }, chats: { collection } } = getState();

        const chats = collection.filter(chat => chat.user.username.includes(value));
        const ignore = chats.map(chat => chat.user.username).concat(user.username);

        try {
            const response = await ajax.post("/api/auth/search", { value, ignore });
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