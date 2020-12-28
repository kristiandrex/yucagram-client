import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import MyProfile from "components/Profile/MyProfile";
import Search from "components/Lateral/Search";
import Chats from "components/Chats/Chats";
import Users from "components/Users/Users";
import { loadChats } from "actions/chats";

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
  const isSearching = useSelector((state) => state.search.isSearching);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChats());
  }, [dispatch]);

  return (
    <LateralStyled className="col-lg-3 col-sm-4 col-12 border-right">
      <MyProfile />
      <Search />
      {isSearching && <Users />}
      <Chats />
    </LateralStyled>
  );
}