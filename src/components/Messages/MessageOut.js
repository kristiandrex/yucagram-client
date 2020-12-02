import React, { memo } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import MessageState from "./MessageState";

function MessageOut({ message }) {
    return (
        <Message message={message} own>
            <MessageState seen={message.seen} />
        </Message>
    );
}

MessageOut.propTypes = {
    message: PropTypes.object.isRequired
};

function areEqual({ message: prev }, { message: next }) {
    return prev._id === next._id && prev.seen === next.seen;
}

export default memo(MessageOut, areEqual);