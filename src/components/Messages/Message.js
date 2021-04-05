import { forwardRef, useContext } from "react";
import MessageState from "./MessageState";
import { MessageCTX } from "./MessageProvider";

const Message = forwardRef((_, ref) => {
  const { isOut, message } = useContext(MessageCTX);
  const date = new Date(message.date);

  return (
    <div className={isOut ? "message-row own" : "message-row"} ref={ref}>
      <div className="message shadow-sm p-2 rounded">
        <div className="content">{message.text}</div>
        <div className="details">
          <div className="date ml-2 mr-1">
            {date.getHours()}:{date.getMinutes()}
          </div>
          {isOut && <MessageState seen={message.seen} />}
        </div>
      </div>
    </div>
  );
});

Message.displayName = "Message";

export default Message;
