import React from "react";
import { useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import styled from "styled-components";

import Chat from "./Chat";

const StyledEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default function Chats() {
  const chats = useSelector((state) => state.chats.allIds);

  if (chats.length === 0) {
    return (
      <StyledEmpty>
        <span>No hay chats</span>
      </StyledEmpty>
    );
  }

  return (
    <TransitionGroup>
      {
        chats.map((id) =>
          <Chat key={id} id={id}/>
        )
      }
    </TransitionGroup>
  );
}