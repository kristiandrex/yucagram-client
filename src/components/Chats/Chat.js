import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import LastMessage from "./LastMessage";
import Avatar from "components/Avatar";
import { setCurrent } from "actions/chats";

const Styled = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: .5rem;

  .preview {
    overflow: hidden;
  }

  .username {
    font-weight: bold;
  }
`;

export default function Chat({ id }) {
  const chat = useSelector((state) => state.chats.byId[id]);

  const dispatch = useDispatch();
  const onClick = () => dispatch(setCurrent(id));

  return (
    <Styled className="border-bottom p-2" onClick={onClick}>
      <Avatar user={chat.to} />
      <div className="preview">
        <span className="username">{chat.to.username}</span>
        <LastMessage chat={chat} />
      </div>
      <span className="badge badge-primary" hidden={chat.unread === 0}>{chat.unread}</span>
    </Styled>
  );
}

Chat.propTypes = {
  id: PropTypes.string.isRequired
};