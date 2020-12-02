import types from "types";

function pushMessage(state, payload) {
    const iterator = (chat, index) => {
        if (index === payload.index) {
            const unread = payload.message.from === chat.from ? chat.unread : chat.unread + 1;

            return {
                ...chat,
                unread,
                messages: [...chat.messages, payload.message],
            };
        }

        return chat;
    };

    return state.collection.map(iterator);
}

function updateMessage(collection, payload) {
    const iteratorM = (message) => {
        if (message._id === payload.message._id) {
            return { ...message, seen: true };
        }

        return message;
    };

    const iteratorC = (chat, index) => {
        if (payload.chat === index) {
            const unread = payload.message.from === chat.from ? chat.unread : chat.unread - 1;

            return {
                ...chat,
                unread,
                messages: chat.messages.map(iteratorM)
            };
        }

        return chat;
    };

    return collection.map(iteratorC);
}

const initialState = {
    collection: [],
    current: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_CHATS: {
            return {
                ...state,
                collection: action.payload
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
            return {
                ...state,
                current: 0,
                collection: [action.payload, ...state.collection]
            };
        }

        case types.ADD_CHAT: {
            return {
                ...state,
                collection: [action.payload, ...state.collection]
            };
        }

        case types.DELETE_CHAT: {
            const collection = [...state.collection];
            const deleted = collection.splice(action.payload, 1)[0];

            if (deleted._id === state.current?._id) {
                return { current: null, collection };
            }

            return { ...state, collection };
        }

        case types.ADD_MESSAGE: {
            return {
                ...state,
                collection: pushMessage(state, action.payload)
            };
        }

        case types.MESSAGE_SEEN: {
            return {
                ...state,
                collection: updateMessage(state.collection, action.payload)
            };
        }

        default:
            return state;
    }
}