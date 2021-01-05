import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Chat from "components/Chats/Chat";
import Loading from "components/UI/Loading";
import { loadChats } from "actions/chats";
import request from "util/request";

const StyledEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default function Chats() {
  const chats = useSelector((state) => state.chats.allIds);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    request.get("/auth/chats")
      .then((response) => {
        dispatch(loadChats(response.data));
        setIsLoading(false);
      })
      .catch((error) => console.error(error));

  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (chats.length === 0) {
    return (
      <StyledEmpty>
        <span>No hay chats</span>
      </StyledEmpty>
    );
  }

  return (
    <div>
      {
        chats.map((_id) =>
          <Chat key={_id} _id={_id} />
        )
      }
    </div>
  );
}