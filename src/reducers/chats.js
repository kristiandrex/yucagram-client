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
      const byId = action.payload.chats || {};
      const allIds = Object.keys(byId);

      return {
        ...state,
        byId,
        allIds
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

    case types.ADD_MESSAGE: {
      const { message, chat } = action.payload;
      const { _id } = chat;

      //The message is outgoing or incoming
      const unread = message.from === chat.from ? chat.unread : chat.unread + 1;

      const newAllIds = state.allIds.filter((id) => id !== _id);
      newAllIds.unshift(_id);

      return {
        ...state,
        allIds: newAllIds,
        byId: {
          ...state.byId,
          [_id]: {
            ...chat,
            messages: chat.messages.concat(message._id),
            unread
          }
        }
      };
    }

    case types.READ_MESSAGE: {
      const { message, chat } = action.payload;

      const unread = message.from === chat.from ? chat.unread : chat.unread - 1;

      return {
        ...state,
        byId: {
          ...state.byId,
          [chat._id]: {
            ...chat,
            unread
          }
        }
      };
    }

    default: {
      return state;
    }
  }
}
