import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MessageState from "components/Messages/MessageState";

const Styled = styled.div`
    font-size: .85rem;    
    display: flex;
    justify-content: space-between;
    gap: .5rem;

    .content {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .state {
        font-size: .85rem;
    }
`;

export default function LastMessage({ message, isOut }) {
    if (!message) {
        return null;
    }

    const time = new Date(message.date);

    return (
        <Styled>
            <div className="content">
                {message.text}
            </div>
            {isOut && <MessageState seen={message.seen} />}
            <span className="date">
                {time.getHours()}:{time.getMinutes()}
            </span>
        </Styled>
    );
}

LastMessage.propTypes = {
    message: PropTypes.object.isRequired,
    isOut: PropTypes.bool.isRequired
};