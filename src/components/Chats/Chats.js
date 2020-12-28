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
  const chats = useSelector((state) => {
    if (state.search.isSeaching) {
      return state.search.chats;
    }

    return state.chats.allIds;
  });

  const isSearching = useSelector((state) => state.search.isSearching);

  if (chats.length === 0) {
    return (
      <StyledEmpty>
        <span>No hay chats</span>
      </StyledEmpty>
    );
  }

  return (
    <div>
      {isSearching && <div className="p-2 font-weight-bold text-center border-bottom">Chats</div>}
      {chats.map((_id) => (
        <Chat key={_id} _id={_id} />
      ))}
    </div>
  );
}