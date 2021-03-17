import React, { useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Loading from "components/UI/Loading";
import Chat from "components/Chats/Chat";
import User from "components/Users/User";

const StyledResults = styled.div`
  .results {
    background-color: #fff;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .results-enter {
    left: -100%;
  }

  .results-enter-active {
    left: 0%;
    transition: all 0.3s;
  }

  .results-exit {
    left: 0%;
  }

  .results-exit-active {
    left: -100%;
    transition: all 0.3s;
  }

  .section-title {
    font-weight: bold;
    text-align: center;
  }
`;

export default function SearchResults() {
  const searching = useSelector((state) => state.search.searching);
  const loading = useSelector((state) => state.search.loading);
  const users = useSelector((state) => state.search.users);
  const chats = useSelector((state) => state.search.chats);
  const nodeRef = useRef(null);

  const ListChats = chats.map((chat) => <Chat key={chat} _id={chat} />);
  const ListUsers = users.map((user) => <User key={user._id} user={user} />);

  // eslint-disable-next-line react/prop-types
  const Title = ({ title }) => {
    return <div className="p-2 border-bottom section-title">{title}</div>;
  };

  return (
    <StyledResults>
      <CSSTransition
        classNames="results"
        timeout={300}
        in={searching}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div className="results" ref={nodeRef}>
          {loading ? (
            <Loading />
          ) : (
            <Fragment>
              {chats.length > 0 && <Title title={"Chats"} />}
              {ListChats}
              {users.length > 0 && <Title title={"Usuarios"} />}
              {ListUsers}
            </Fragment>
          )}
        </div>
      </CSSTransition>
    </StyledResults>
  );
}
