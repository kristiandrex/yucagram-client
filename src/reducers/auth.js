import types from "types";

const initialState = {
  user: null,
  loading: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case types.SET_USER: {
    return {
      loading: false,
      user: action.payload
    };
  }

  case types.SIGNOUT: {
    return {
      user: null,
      loading: false
    };
  }

  case types.SET_AVATAR: {
    return {
      ...state,
      user: {
        ...state.user,
        avatar: action.payload
      }
    };
  }

  default: {
    return state;
  }
  }
}
