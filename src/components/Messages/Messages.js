import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Message from "./Message";

export default function Messages({ chat }) {
  const messages = useSelector((state) => state.chats.byId[chat].messages);
  const ref = useRef(null);

  useEffect(() => {
    const clientHeight = ref.current.clientHeight;
    const scrollHeight = ref.current.scrollHeight;

    ref.current.scrollTo(0, scrollHeight - clientHeight);
  }, [chat]);


  return (
    <div className="px-2 messages" ref={ref}>
      {
        messages.map((_id) =>
          <Message key={_id} _id={_id} />
        )
      }
    </div>
  );
}

Messages.propTypes = {
  chat: PropTypes.string
};