import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import MyProfile from "components/Profile/MyProfile";
import Search from "./Search";
import Users from "components/Users/Users";
import Chats from "components/Chats/Chats";
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
    const [searching, setSearching] = useState(false);

    const handleSearching = (value) => {
        setSearching(value);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadChats());
    }, [dispatch]);

    return (
        <LateralStyled className='col-lg-3 col-sm-4 col-12 border-right'>
            <MyProfile />
            <Search setSearching={handleSearching} searching={searching} />
            <Users />
            <Chats searching={searching} />
        </LateralStyled>
    );
}