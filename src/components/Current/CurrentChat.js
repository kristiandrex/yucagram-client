import { createContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Messages from "components/Messages/Messages";
import WriteBox from "components/Current/WriteBox";

const Styled = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  overflow: hidden;

  @media (min-width: 576px) {
    .profile .material-icons {
      display: none;
    }
  }
`;

export const ChatCTX = createContext();

export default function CurrentChat({ chat }) {
  return (
    <ChatCTX.Provider value={chat._id}>
      <Styled>
        <Messages />
        <WriteBox />
      </Styled>
    </ChatCTX.Provider>
  );
}

CurrentChat.propTypes = {
  chat: PropTypes.object.isRequired
};
