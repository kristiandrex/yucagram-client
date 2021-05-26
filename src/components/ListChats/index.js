import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ListChatsItem from "components/ListChats/ListChatsItem";
import Loading from "components/UI/Loading";
import { loadChats } from "actions/chats";
import request from "util/request";

const StyledChats = styled.div`
  height: 100%;

  .empty-chats {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;

export default function ListChats() {
  const chats = useSelector((state) => state.chats.allIds);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    request({ method: "get", url: "/auth/chats" })
      .then((response) => {
        dispatch(loadChats(response.data));
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const ListChats = chats.map((_id) => <ListChatsItem key={_id} _id={_id} />);

  return (
    <StyledChats>
      {chats.length === 0 ? (
        <div className="empty-chats">
          <span>No hay chats</span>
        </div>
      ) : (
        ListChats
      )}
    </StyledChats>
  );
}
