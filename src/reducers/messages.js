import types from "types";

const initialState = {
  allIds: [],
  byId: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNOUT: {
      return initialState;
    }

    case types.LOAD_CHATS: {
      const messages = action.payload.messages || {};

      return {
        byId: messages,
        allIds: Object.keys(messages)
      };
    }

    case types.ADD_MESSAGE: {
      const { message } = action.payload;
      const { _id } = message;

      return {
        ...state,
        allIds: [...state.allIds, _id],
        byId: {
          ...state.byId,
          [_id]: message
        }
      };
    }

    case types.READ_MESSAGE: {
      const { message } = action.payload;
      const { _id } = message;

      return {
        ...state,
        byId: {
          ...state.byId,
          [_id]: {
            ...state.byId[_id],
            seen: true
          }
        }
      };
    }

    default:
      return state;
  }
}