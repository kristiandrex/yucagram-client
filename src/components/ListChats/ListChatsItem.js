import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import PreviewMessage from "./PreviewMessage";
import Avatar from "components/Avatar";
import { setCurrent } from "actions/chats";

const Styled = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: var(--hover-background);
  }

  &.current {
    background-color: var(--current-background);
  }

  .preview {
    overflow: hidden;
  }

  .username {
    font-weight: bold;
  }
`;

function ListChatsItem({ _id }) {
  const isCurrent = useSelector((state) => state.chats.current === _id);
  const chat = useSelector((state) => state.chats.byId[_id]);

  const className = isCurrent
    ? "border-bottom p-2 current"
    : "border-bottom p-2";

  const dispatch = useDispatch();
  const onClick = () => dispatch(setCurrent(_id));

  return (
    <Styled id={_id} className={className} onClick={onClick}>
      <Avatar user={chat.to} />
      <div className="preview">
        <span className="username">{chat.to.username}</span>
        <PreviewMessage chat={chat} />
      </div>
      {chat.unread > 0 && (
        <span className="badge badge-primary">{chat.unread}</span>
      )}
    </Styled>
  );
}

ListChatsItem.propTypes = {
  _id: PropTypes.string.isRequired,
  index: PropTypes.number
};

function areEquals(a, b) {
  return a._id === b._id && a.index === b.index;
}

export default memo(ListChatsItem, areEquals);
