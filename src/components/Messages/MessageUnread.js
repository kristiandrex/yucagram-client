import React, { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import MessageBubble from "./MessageBubble";
import { readMessage } from "actions/messages";
import { SocketContext } from "components/Socket";

export default function MessageUnseen({ message }) {
  const { ref, inView } = useInView({ threshold: 1 });
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (inView) {
      socket.emit("READ_MESSAGE", message._id, (chat) => {
        dispatch(readMessage({ message, chat }));
      });
    }
  }, [inView, message, dispatch, socket]);

  return <MessageBubble message={message} ref={ref} />;
}

MessageUnseen.propTypes = {
  message: PropTypes.object.isRequired
};
