import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import { getLastIndex, scrollToEnd } from "util/helpers";

export default function Messages() {
  const chat = useSelector((state) => state.chats.byId[state.chats.current]);
  const [lastInView, setLastInView] = useState(true);
  const scrollRef = useRef(null);

  const { messages } = chat;

  useEffect(() => {
    scrollToEnd(scrollRef.current);
  }, [chat]);

  useEffect(() => {
    if (lastInView) {
      scrollToEnd(scrollRef.current);
    }
  }, [messages, lastInView]);

  const lastIndex = getLastIndex(messages);

  return (
    <div
      className="px-2 pt-2"
      style={{ overflowY: "auto", height: "100%" }}
      ref={scrollRef}
    >
      {messages.map((_id, index) => (
        <Message
          key={_id}
          _id={_id}
          isLast={index === lastIndex}
          onLastView={setLastInView}
        />
      ))}
    </div>
  );
}
