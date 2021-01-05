import types from "types";

const initialState = {
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
        byId: messages
      };
    }

    case types.ADD_MESSAGE: {
      const { message } = action.payload;
      const { _id } = message;

      return {
        byId: {
          ...state.byId,
          [_id]: message
        }
      };
    }

    case types.READ_MESSAGE: {
      const _id = action.payload.message._id;

      return {
        byId: {
          ...state.byId,
          [_id]: {
            ...state.byId[_id],
            seen: true
          }
        }
      };
    }

    case types.LAZY_MESSAGES: {
      const messages = action.payload.messages;

      return {
        byId: {
          ...state.byId,
          ...messages
        }
      };
    }

    default:
      return state;
  }
}