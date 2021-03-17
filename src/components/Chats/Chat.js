import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import Preview from "./Preview";
import Avatar from "components/Avatar";
import { setCurrent } from "actions/chats";

const Styled = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;

  .preview {
    overflow: hidden;
  }

  .username {
    font-weight: bold;
  }
`;

function Chat({ _id }) {
  const chat = useSelector((state) => state.chats.byId[_id]);
  const dispatch = useDispatch();
  const onClick = () => dispatch(setCurrent(_id));

  return (
    <Styled className="border-bottom p-2" onClick={onClick}>
      <Avatar user={chat.to} />
      <div className="preview">
        <span className="username">{chat.to.username}</span>
        <Preview chat={chat} />
      </div>
      {chat.unread > 0 && (
        <span className="badge badge-primary">{chat.unread}</span>
      )}
    </Styled>
  );
}

Chat.propTypes = {
  _id: PropTypes.string.isRequired,
  index: PropTypes.number
};

function areEquals(prev, next) {
  return prev._id === next._id && prev.index === next.index;
}

export default memo(Chat, areEquals);
