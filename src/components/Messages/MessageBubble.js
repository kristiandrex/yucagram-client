import React, { memo, useMemo, forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MessageState from "./MessageState";

const Styled = styled.div`
  display: flex;
  padding-bottom: 8px;

  &:first-child{
    padding-top: 8px;
  }

  .message {
    background: #e2e3e5;
    max-width: 75%;
  }

  .message .content {
    max-width: 100%;
    overflow: hidden;
  }

  &.own {
    justify-content: flex-end;
  }

  &.own .message {
    background-color: #cce5ff;
  }
  
  .details {
    text-align: right;
  }

  .details .date,
  .details .state {
    display: inline-block;
    font-size: .85rem;
  }
`;

const MessageBubble = forwardRef(({ message, own }, ref) => {
  const date = useMemo(() => new Date(message.date), [message.date]);

  return (
    <Styled className={own && "own"} ref={ref}>
      <div className="message shadow-sm p-2 rounded">
        <div className="content">
          {message.text}
        </div>
        <div className="details">
          <div className="date ml-2 mr-1">{date.getHours()}:{date.getMinutes()}</div>
          {own && <MessageState seen={message.seen} />}
        </div>
      </div>
    </Styled>
  );
});

MessageBubble.propTypes = {
  own: PropTypes.bool,
  message: PropTypes.object,
};

function areEqual(prevProps, nextProps) {
  if (prevProps.message._id !== nextProps.message._id) {
    return false;
  }

  if (prevProps.message.seen !== nextProps.message.seen) {
    return false;
  }

  if (prevProps.own !== nextProps.own) {
    return false;
  }

  return true;
}

export default memo(MessageBubble, areEqual);