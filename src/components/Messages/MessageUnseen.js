import { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { MessageCTX } from "./MessageProvider";
import Message from "./Message";
import { ChatCTX } from "components/Current/CurrentChat";
import socket from "util/socket";
import { readMessage } from "actions/messages";

export default function MessageUnseen() {
  const { ref, inView } = useInView({ threshold: 1 });
  const { message } = useContext(MessageCTX);
  const chatId = useContext(ChatCTX);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      const io = socket.get();

      io.emit("READ_MESSAGE", message._id, () => {
        dispatch(readMessage({ message, chatId }));
      });
    }
  }, [inView, message, chatId, dispatch]);

  return <Message ref={ref} />;
}
