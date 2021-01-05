import types from "types";

const initialState = {
  allIds: [],
  byId: {},
  current: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNOUT: {
      return initialState;
    }

    case types.LOAD_CHATS: {
      const chats = action.payload.chats;

      return {
        ...state,
        byId: chats,
        allIds: Object.keys(chats)
      };
    }

    case types.SET_CURRENT: {
      return { ...state, current: action.payload };
    }

    case types.CLOSE_CURRENT: {
      return { ...state, current: null };
    }

    case types.CREATE_CHAT: {
      const _id = action.payload._id;

      return {
        ...state,
        current: _id,
        allIds: [_id, ...state.allIds],
        byId: {
          ...state.byId,
          [_id]: action.payload
        }
      };
    }

    case types.ADD_CHAT: {
      const _id = action.payload._id;

      return {
        ...state,
        allIds: [_id, ...state.allIds],
        byId: {
          ...state.byId,
          [_id]: action.payload
        }
      };
    }

    //TODO: Fix delete
    case types.DELETE_CHAT: {
      const allIds = state.allIds.filter(id => id !== action.payload);
      const { _, ...byId } = state.byId;

      if (action.payload === state.current) {
        return {
          current: null,
          allIds,
          byId
        };
      }

      return {
        ...state,
        allIds,
        byId
      };
    }

    case types.ADD_MESSAGE: {
      const { message, chat: _id } = action.payload;
      const chat = state.byId[_id];

      const unread = message.from === chat.from
        ? chat.unread
        : chat.unread + 1;

      return {
        ...state,
        byId: {
          ...state.byId,
          [_id]: {
            ...chat,
            messages: [message._id, ...chat.messages],
            unread
          }
        }
      };
    }

    case types.READ_MESSAGE: {
      const { message, chat: _id } = action.payload;
      const chat = state.byId[_id];

      const unread = message.from === chat.from
        ? chat.unread
        : chat.unread - 1;

      return {
        ...state,
        byId: {
          ...state.byId,
          [_id]: {
            ...chat,
            unread
          }
        }
      };
    }

    case types.LAZY_MESSAGES: {
      const _id = action.payload.chat;
      const messages = Object.keys(action.payload.messages);
      const chat = state.byId[_id];

      return {
        ...state,
        byId: {
          ...state.byId,
          [_id]: {
            ...chat,
            messages: chat.messages.concat(messages),
          }
        }
      };
    }

    default: {
      return state;
    }
  }
}