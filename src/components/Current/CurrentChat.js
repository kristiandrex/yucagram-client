import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Messages from "components/Messages/Messages";
import ProfileCard from "components/Profile/ProfileCard";
import WriteMessage from "components/Messages/WriteMessage";

const Styled = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export default function CurrentChat({ chat }) {
  return (
    <Styled>
      <ProfileCard user={chat.to} />
      <Messages chat={chat._id} />
      <WriteMessage />
    </Styled>
  );
}

CurrentChat.propTypes = {
  chat: PropTypes.object.isRequired
};