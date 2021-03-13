import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import Lateral from "./Lateral/Lateral";
import Current from "./Current/Current";
import socket from "util/socket";
import { messageIn, readMessage } from "actions/messages";
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
  const totalUnread = useSelector((state) => state.messages.totalUnread);
  const dispatch = useDispatch();

  const title = totalUnread === 0
    ? "Yucagram"
    : `Yucagram (${totalUnread})`;

  useEffect(() => {
    const io = socket.get();

    io.on("SEND_MESSAGE", (payload) => {
      dispatch(messageIn(payload));
      audio.play();
    });

    io.on("READ_MESSAGE", (payload) => {
      dispatch(readMessage(payload));
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
        <Current />
      </StyledHome>
    </>
  );
}