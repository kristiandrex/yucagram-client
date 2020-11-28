import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "components/Avatar";

const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.5rem;
    align-items: center;
    color: #fff;

    .btn-options {
        cursor: pointer;
        outline: none;
    }
`;

export default function ProfileCard({ children, user }) {
    return (
        <StyledDiv className='p-2 bg-primary profile-card'>
            <Avatar user={user} />
            <span className='font-weight-bold'>{user.username}</span>
            {children}
        </StyledDiv>
    );
}

ProfileCard.propTypes = {
    children: PropTypes.element,
    user: PropTypes.object.isRequired
};