import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "components/Avatar";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;

  .username {
    font-weight: bold;
  }

  .options {
    margin-left: auto;
  }
`;

export default function ProfileCard({ user, children }) {
  return (
    <StyledDiv className="p-2 bg-primary">
      <Avatar user={user} />
      <span className="username">{user.username}</span>
      <div className="options">{children}</div>
    </StyledDiv>
  );
}

ProfileCard.propTypes = {
  children: PropTypes.element,
  user: PropTypes.object.isRequired
};
