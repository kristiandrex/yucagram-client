import { memo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
import MessageStatus from "./MessageStatus";
import Timestamp from "components/Timestamp";
import { readOutgoingMessage } from "actions/messages";

const StyledMessage = styled.div`
  display: flex;
  padding-bottom: 8px;
  ${({ isOwn }) => isOwn && "justify-content: flex-end;"}

  .message {
    background: ${({ isOwn }) => (isOwn ? "#cce5ff" : "#e2e3e5")};
    max-width: 75%;
  }

  .message .content {
    max-width: 100%;
    overflow: hidden;
  }

  .details {
    text-align: right;
  }

  .details time,
  .details .state {
    display: inline-block;
    font-size: 0.85rem;
  }
`;

function Message({ _id, isLast, onLastView }) {
  const message = useSelector((state) => state.messages.byId[_id]);
  const chat = useSelector((state) => state.chats.byId[state.chats.current]);
  const isOwn = useSelector((state) => state.auth.user._id === message.from);

  const isReadable = !isOwn && !message.seen;

  const { inView, ref } = useInView({
    threshold: 0,
    skip: !isLast && !isReadable
  });

  const dispatch = useDispatch();

  useEffect(() => {
    onLastView(inView && isLast);
  }, [isLast, inView, onLastView]);

  useEffect(() => {
    if (isReadable && inView) {
      dispatch(readOutgoingMessage({ message, chat }));
    }
  }, [isReadable, inView, message, chat, dispatch]);

  return (
    <StyledMessage id={message._id} isOwn={isOwn} ref={ref}>
      <div className="message shadow-sm p-2 rounded">
        <div className="content">{message.text}</div>
        <div className="details">
          <Timestamp date={message.date} />
          {isOwn && <MessageStatus seen={message.seen} />}
        </div>
      </div>
    </StyledMessage>
  );
}

Message.propTypes = {
  _id: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  onLastView: PropTypes.func
};

export default memo(Message);
