import styled from "styled-components";
import PropTypes from "prop-types";
import MessageStatus from "components/Messages/MessageStatus";
import { useSelector } from "react-redux";
import Timestamp from "components/Timestamp";

const Styled = styled.div`
  font-size: 0.85rem;
  display: flex;
  justify-content: space-between;

  .content {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .details {
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: 0.5rem;
  }

  .details .state {
    font-size: 0.85rem;
  }
`;

export default function PreviewMessage({ chat }) {
  const message = useSelector((state) => {
    const len = chat.messages.length;

    if (len === 0) {
      return null;
    }

    const _id = chat.messages[len - 1];
    return state.messages.byId[_id];
  });

  if (!message) {
    return null;
  }

  const isNotOwn = message.from === chat.from;

  return (
    <Styled>
      <div className="content">{message.text}</div>
      <div className="details">
        {isNotOwn && <MessageStatus seen={message.seen} />}
        <Timestamp date={message.date} />
      </div>
    </Styled>
  );
}

PreviewMessage.propTypes = {
  chat: PropTypes.object.isRequired
};
