import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Chat from "./Chat";

const StyledEmpty = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;


export default function Chats({ searching }) {
    const chats = useSelector((state) => searching ? state.results.chats : state.chats.collection);

    if (!searching && chats.length === 0) {
        return (
            <StyledEmpty>
                <span>No hay chats</span>
            </StyledEmpty>
        );
    }

    return (
        <Fragment>
            {
                chats.map((chat, index) =>
                    <Chat
                        key={chat._id}
                        chat={chat}
                        index={index}
                    />
                )
            }
        </Fragment>
    );
}