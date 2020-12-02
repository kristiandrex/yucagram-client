import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Styled = styled.div`
    display: flex;
    padding-bottom: 8px;

    &:first-child{
        padding-top: 8px;
    }

    &.own {
        justify-content: flex-end;
        
        .message {
            background-color: #cce5ff;
        }
    }

    .message {
        background: #e2e3e5;
        max-width: 75%;
    }

    .details {
        text-align: right;

        .date,
        .state {
            display: inline-block;
            font-size: .85rem;
        }
    }
`;

const Message = forwardRef(({ own, message, children }, ref) => {
    const date = new Date(message.date);

    return (
        <Styled className={own ? "message-row own" : "message-row"} ref={ref}>
            <div className="message shadow-sm p-2 rounded">
                <div className="content">
                    {message.text}
                </div>
                <div className="details">
                    <div className="date ml-2 mr-1">{date.getHours()}:{date.getMinutes()}</div>
                    {children}
                </div>
            </div>
        </Styled>
    );
});

Message.propTypes= { 
    own: PropTypes.bool.isRequired,
    message: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
};

export default Message;