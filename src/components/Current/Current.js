import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import User from "./CurrentUser";
import Chat from "./CurrentChat";
import pattern from "assets/pattern.svg";
import Avatar from "components/Avatar";
import { closeCurrent } from "actions/chats";

const Styled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  background-image: url(${pattern});

  .profile {
    color: #fff;
    font-weight: bold;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  @media (max-width: 576px) {
    position: absolute;
    transition: all 0.3s ease;
    right: ${({ active }) => (active ? "0" : "-100%")};

    .header .material-icons {
      display: block;
    }
  }
`;

export default function Current() {
  const current = useSelector((state) => {
    const value = state.chats.current;

    if (typeof value === "object") {
      return value;
    }

    return state.chats.byId[value];
  });

  const user = useMemo(() => {
    if (current?.role === "USER") {
      return current;
    }

    return current?.to;
  }, [current]);

  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeCurrent());

  if (!current) {
    return <Styled className="col-12 col-lg-9 col-sm-8" />;
  }

  return (
    <Styled className="col-12 col-lg-9 col-sm-8" active>
      <div className="bg-primary p-2 profile">
        <span
          className="material-icons cursor"
          onClick={handleClose}
          role="button"
          tabIndex="0"
          aria-label="Salir del chat"
        >
          arrow_back
        </span>
        <Avatar user={user} />
        <span className="username">{user.username}</span>
      </div>
      {current.role === "CHAT" ? (
        <Chat chat={current} />
      ) : (
        <User user={current} />
      )}
    </Styled>
  );
}
