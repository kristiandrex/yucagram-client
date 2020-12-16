import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";
import MessageUnread from "./MessageUnread";

function Message({ _id }) {
  const message = useSelector((state) => state.messages.byId[_id]);
  const user = useSelector((state) => state.auth.user._id);
  const own = user === message.from;

  if (!own && !message.seen) {
    return <MessageUnread message={message} />;
  }

  return <MessageBubble message={message} own={own} />;
}

Message.propTypes = {
  _id: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  return prevProps._id === nextProps._id;
}

export default memo(Message, areEqual);