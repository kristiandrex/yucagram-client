import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import MessageOut from "./MessageOut";
import MessageIn from "./MessageIn";
import { SocketContext } from "components/Socket";
import { messageSeen } from "actions/messages";

const Styled = styled.div`
    height: 100%;
    overflow-y: scroll;
`;

export default function Messages({ messages }) {
    const user = useSelector((state) => state.auth.user._id);
    const current = useSelector((state) => state.chats.current);

    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    const onView = (message) => {
        socket.emit("MESSAGE_SEEN", message._id);
        dispatch(messageSeen(message, current));
    };

    return (
        <Styled className="px-2">
            {
                messages.map((message) =>
                    user === message.from
                        ? <MessageOut key={message._id} message={message} />
                        : <MessageIn key={message._id} message={message} onView={onView} />
                )
            }
        </Styled>
    );
}

Messages.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
};