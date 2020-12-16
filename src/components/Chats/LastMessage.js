import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MessageState from "components/Messages/MessageState";
import { useSelector } from "react-redux";

const Styled = styled.div`
  font-size: .85rem;    
  display: flex;
  justify-content: space-between;

  .content {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .details {
    font-size: .85rem;
    display: flex;
    align-items: center;
    gap: .5rem;
    margin-left: .5rem;
  }

  .details .state {
    font-size: .85rem;
  }
`;

export default function LastMessage({ chat }) {
  const selector = (state) => {
    const index = chat.messages.length - 1;

    if (index < 0) {
      return null;
    }

    const id = chat.messages[index];
    return state.messages.byId[id];
  };

  const message = useSelector(selector);

  if (!message) {
    return null;
  }

  const time = new Date(message.date);
  const isOut = message.from === chat.from;

  return (
    <Styled>
      <div className="content">
        {message.text}
      </div>
      <div className="details">
        {isOut && <MessageState seen={message.seen} />}
        <span className="date">
          {time.getHours()}:{time.getMinutes()}
        </span>
      </div>
    </Styled>
  );
}

LastMessage.propTypes = {
  chat: PropTypes.object.isRequired
};