import React, { useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import LastMessage from "./LastMessage";
import Avatar from "components/Avatar";
import { SocketContext } from "components/Socket";
import { setCurrent } from "actions/chats";
import { messageSeen } from "actions/messages";

const StyledChat = styled.div`
	cursor: pointer;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: .5rem;

    .preview {
        overflow: hidden;
    }

    .username {
        font-weight: bold;
    }
`;

export default function Chat({ chat, index }) {
    const length = chat.messages.length - 1;
    const last = length >= 0 ? chat.messages[length] : null;

    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const onClick = () => dispatch(setCurrent(index));

    const callback = useCallback((message) => {
        if (message.from === chat.from) {
            dispatch(messageSeen(message, index));
        }
    }, [chat.from, index, dispatch]);

    useEffect(() => {
        socket.on("MESSAGE_SEEN", callback);
    }, [socket, callback]);

    return (
        <StyledChat className="border-bottom p-2" onClick={onClick}>
            <Avatar user={chat.to} />
            <div className="preview">
                <span className="username">{chat.to.username}</span>
                <LastMessage message={last} isOut={last.from === chat.from} />
            </div>
            <span className="badge badge-primary" hidden={!chat.unread}>{chat.unread}</span>
        </StyledChat>
    );
}

Chat.propTypes = {
    chat: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};