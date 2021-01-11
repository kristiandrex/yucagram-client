import types from "types";

const initialState = {
  chats: [],
  users: [],
  searching: false,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_RESULTS: {
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    }

    case types.CLEAR_RESULTS: {
      return initialState;
    }

    case types.SET_SEARCHING: {
      return {
        ...state,
        searching: true,
        loading: true
      };
    }

    default:
      return state;
  }
}