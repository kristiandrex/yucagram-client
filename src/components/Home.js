import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Lateral from "./Lateral/Lateral";
import Current from "./Current/Current";
import { SocketContext } from "components/Socket";
import { messageIn } from "actions/messages";

const StyledHome = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;

    .no-outline {
        outline: none;
    }

    .dropdown-toggle {
        outline: none;
        box-shadow: none;
        color: #212529;

        &::after {
            display: none;
        }
    }
`;

export default function Home() {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("SEND_MESSAGE", (message) => {
            dispatch(messageIn(message));
        });
    }, [socket, dispatch]);

    return (
        <StyledHome className="row no-gutters">
            <Lateral />
            <Current />
        </StyledHome>
    );
}