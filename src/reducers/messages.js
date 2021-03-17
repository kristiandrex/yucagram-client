import types from "types";

const initialState = {
  byId: {},
  totalUnread: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case types.SIGNOUT: {
    return initialState;
  }

  case types.LOAD_CHATS: {
    const { messages, totalUnread } = action.payload;
    const byId = messages || {};

    return {
      byId,
      totalUnread
    };
  }

  case types.ADD_MESSAGE: {
    const { message, chat } = action.payload;
    const { _id } = message;

    const totalUnread =
        message.from === chat.from ? state.totalUnread : state.totalUnread + 1;

    return {
      totalUnread,
      byId: {
        ...state.byId,
        [_id]: message
      }
    };
  }

  case types.READ_MESSAGE: {
    const { message, chat } = action.payload;
    const { _id } = message;

    const totalUnread =
        message.from === chat.from ? state.totalUnread : state.totalUnread - 1;

    return {
      totalUnread,
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
