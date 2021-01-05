import React, {
  useState,
  useContext,
  useEffect,
  useLayoutEffect
} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import MessageProvider from "./MessageProvider";
import { mapReverse } from "util/array";
import { ChatCTX } from "components/Current/CurrentChat";
import LastMessage from "./LastMessage";
import useScrollDown from "hooks/useScrollDown";
import LazyMessages from "./LazyMessages";

const Styled = styled.div`
  overflow-y: auto;
  height: 100%;

  .message-row {
    display: flex;
    padding-bottom: 8px;
  }

  .message-row.own {
    justify-content: flex-end;
  }

  .message {
    background: #e2e3e5;
    max-width: 75%;
  }

  .message .content {
    max-width: 100%;
    overflow: hidden;
  }

  .details {
    text-align: right;
  }

  .details .date,
  .details .state {
    display: inline-block;
    font-size: .85rem;
  }

  .message-row.own .message {
    background-color: #cce5ff;
  }
`;

export default function Messages() {
  const [loaded, setLoaded] = useState(false);
  const [scrollRef, scrollDown] = useScrollDown();
  const chat = useContext(ChatCTX);

  const messages = useSelector(
    (state) => state.chats.byId[chat].messages,
    (A, B) => A.length === B.length
  );

  useLayoutEffect(() => {
    setLoaded(true);
  }, [messages.length]);

  useEffect(() => {
    scrollDown();
  }, [chat, scrollDown]);

  const ListMessages = mapReverse(messages, (_id, index) => {
    if (index === messages.length - 1) {
      return <LastMessage _id={_id} key={_id} />;
    }

    return <MessageProvider _id={_id} key={_id} />;
  });

  return (
    <Styled className="px-2 pt-2" ref={scrollRef}>
      {loaded && <LazyMessages />}
      {ListMessages}
    </Styled>
  );
}

Messages.propTypes = {
  chat: PropTypes.string
};