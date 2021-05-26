import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import Lateral from "components/Lateral/Lateral";
import ChatLayout from "components/ChatLayout";
import socket from "util/socket";
import { addIncomingMessage, readIncomingMessage } from "actions/messages";
import bell from "assets/bell.mp3";

const audio = new Audio(bell);

const StyledHome = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  .no-outline {
    outline: none;
  }

  .dropdown-toggle {
    outline: none;
    box-shadow: none;
    color: #212529;

    &::after {
      display: none;
    }
  }
`;

export default function Home() {
  const title = useSelector((state) => {
    const { totalUnread } = state.messages;
    return totalUnread > 0 ? `Yucagram (${totalUnread})` : "Yucagram";
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const io = socket.get();

    io.on("SEND_MESSAGE", (payload) => {
      dispatch(addIncomingMessage(payload));
      audio.play();
    });

    io.on("READ_MESSAGE", (payload) => {
      dispatch(readIncomingMessage(payload));
    });

    return () => socket.disconnect();
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <StyledHome className="row no-gutters">
        <Lateral />
        <ChatLayout />
      </StyledHome>
    </>
  );
}
