import React from "react";
import styled from "styled-components";

import MyProfile from "components/Profile/MyProfile";
import Search from "components/Lateral/Search";
import Chats from "components/Chats/Chats";

const LateralStyled = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    border: none !important;
    overflow-x: hidden;
  }
`;

export default function Lateral() {
  return (
    <LateralStyled className="col-lg-3 col-sm-4 col-12 border-right">
      <MyProfile />
      <Search />
      <Chats />
    </LateralStyled>
  );
}