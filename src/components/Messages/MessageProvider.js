import React, { memo, createContext } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Message from "./Message";
import MessageUnseen from "./MessageUnseen";

export const MessageCTX = createContext();

function MessageProvider({ _id }) {
  const user = useSelector((state) => state.auth.user._id);
  const message = useSelector((state) => state.messages.byId[_id]);
  const isOut = user === message?.from;

  if (!message) {
    return <div>no message</div>;
  }

  return (
    <MessageCTX.Provider value={{ isOut, message }}>
      {!isOut && !message.seen ? <MessageUnseen /> : <Message />}
    </MessageCTX.Provider>
  );
}

MessageProvider.propTypes = {
  _id: PropTypes.string,
  chat: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  return prevProps._id === nextProps._id;
}

export default memo(MessageProvider, areEqual);