import React, { useEffect, memo } from "react";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import Message from "./Message";

function MessageIn({ message, onView }) {
    if (!message.seen) {
        return <MessageUnseen message={message} onView={onView} />;
    }

    return <Message message={message} />;
}

function MessageUnseen({ message, onView }) {
    const { ref, inView } = useInView({ threshold: 1 });

    useEffect(() => {
        if (inView)
            onView(message);
    }, [inView, message, onView]);

    return <Message message={message} ref={ref} />;
}

function areEqual({ message: prev }, { message: next }) {
    return prev._id === next._id && prev.seen === next.seen;
}

MessageIn.propTypes = {
    message: PropTypes.object.isRequired,
    onView: PropTypes.func.isRequired
};

MessageUnseen.propTypes = {
    message: PropTypes.object.isRequired,
    onView: PropTypes.func.isRequired
};

export default memo(MessageIn, areEqual);