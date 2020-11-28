import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";
import { setCurrent } from "actions/chats";
import LastMessage from "./LastMessage";
import Avatar from "components/Avatar";

const StyledChat = styled.div`
	cursor: pointer;
	display: grid;
	align-items: center;
	grid-template-areas:  "avatar username badge options" "avatar message badge options";
	grid-template-columns: 47px 1fr auto auto;
	grid-column-gap: .5rem;
	position: relative;

	.avatar {
	  grid-area: avatar;

		img {
			width: 47px;
			height: 47px;
			border-radius: 100%;
		}
	}

	.username {
        font-weight: bold;
		grid-area: username;
	}

	.last-message {
		grid-area: message;
	}

	.badge {
		grid-area: badge;
	}

	.dropdown {
		grid-area: options;
		cursor: pointer;
	}
`;

export default function Chat({ chat, index }) {
    const HIDE_BADGE = chat.unread === 0;

    const dispatch = useDispatch();

    const handleOpenChat = () => {
        dispatch(setCurrent(chat, index));
    };

    return (
        <StyledChat className='border-bottom p-2' onClick={handleOpenChat}>
            <Avatar user={chat.user} />
            <span className='username'>{chat.user.username}</span>
            <LastMessage />
            <Badge hidden={HIDE_BADGE} variant='primary'>{chat.unread}</Badge>
        </StyledChat>
    );
}

Chat.propTypes = {
    chat: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};