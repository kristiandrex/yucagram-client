import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import Message from "./Message";

const Styled = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export default function Messages({ chat }) {
  const messages = useSelector((state) => state.chats.byId[chat].messages);
  const ref = useRef(null);

  useEffect(() => {
    const clientHeight = ref.current.clientHeight;
    const scrollHeight = ref.current.scrollHeight;

    ref.current.scrollTo(0, scrollHeight - clientHeight);
  }, []);


  return (
    <Styled className="px-2" ref={ref}>
      {
        messages.map((_id) =>
          <Message key={_id} _id={_id} />
        )
      }
    </Styled>
  );
}

Messages.propTypes = {
  chat: PropTypes.string
};