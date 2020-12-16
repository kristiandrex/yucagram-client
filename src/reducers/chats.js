import types from "types";

const initialState = {
  allIds: [],
  byId: {},
  current: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CHATS: {
      const chats = action.payload.chats;

      return {
        ...state,
        byId: chats,
        allIds: Object.keys(chats)
      };
    }

    case types.SIGNOUT: {
      return initialState;
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
      const unread = message.from === chat.from ? chat.unread : chat.unread + 1;

      return {
        ...state,
        byId: {
          ...state.byId,
          [_id]: {
            ...chat,
            messages: [...chat.messages, message._id],
            unread
          }
        }
      };
    }

    case types.READ_MESSAGE: {
      const { message, chat: _id } = action.payload;
      const chat = state.byId[_id];
      const unread = message.from === chat.from ? chat.unread : chat.unread - 1;

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

    default:
      return state;
  }
}