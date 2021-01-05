import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Lateral from "./Lateral/Lateral";
import Current from "./Current/Current";
import socket from "util/socket";
import { messageIn, readMessage } from "actions/messages";

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
  const dispatch = useDispatch();

  useEffect(() => {
    const io = socket.get();

    io.on("SEND_MESSAGE", (payload) => {
      dispatch(messageIn(payload));
    });

    io.on("READ_MESSAGE", (payload) => {
      dispatch(readMessage(payload));
    });

    return () => socket.disconnect();
  }, [dispatch]);

  return (
    <StyledHome className="row no-gutters">
      <Lateral />
      <Current />
    </StyledHome>
  );
}