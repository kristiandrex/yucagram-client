import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { addMessage } from "actions/messages";
import { SocketContext } from "components/Socket";

const StyledWriteMessage = styled.form`
    background-color: #f8f9fa;
    height: 60px;
    display: flex;
    align-items: center;
`;

export default function WriteMessage() {
    const selector = ({ chats }) => {
        const current = chats.current;
        return chats.collection[current].to._id;
    };

    const userTo = useSelector(selector);
    const userFrom = useSelector((state) => state.auth.user._id);
    const current = useSelector((state) => state.chats.current);

    const [text, setText] = useState("");

    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (text.trim().length === 0) {
            return;
        }

        const payload = {
            from: userFrom,
            to: userTo,
            text: text,
            date: new Date(),
        };

        socket.emit("SEND_MESSAGE", payload, (message) => {
            dispatch(addMessage(message, current));
        });

        setText("");
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <StyledWriteMessage className="p-2 border-top" onSubmit={handleSubmit}>
            <input
                type="text"
                className="form-control"
                placeholder="Escribe un mensaje"
                value={text}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-outline-primary ml-2">
                <span className="material-icons">send</span>
            </button>
        </StyledWriteMessage>
    );
}