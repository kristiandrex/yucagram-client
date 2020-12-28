import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Messages from "components/Messages/Messages";
import Write from "components/Messages/WriteMessage";

const Styled = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  overflow: hidden;

  .messages {
    height: 100%;
    overflow-y: auto;
  }

  @media (min-width: 576px){
    .profile .material-icons {
      display: none;
    }
  }
`;

export default function CurrentChat({ chat }) {
  return (
    <Styled>
      <Messages chat={chat._id} />
      <Write />
    </Styled>
  );
}

CurrentChat.propTypes = {
  chat: PropTypes.object.isRequired
};