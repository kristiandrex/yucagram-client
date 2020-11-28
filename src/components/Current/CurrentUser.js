import * as React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import ProfileCard from "components/Profile/ProfileCard";
import { createChat } from "actions/chats";

const Styled = styled.div`
    height: 100%;

    .wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export default function CurrentUser({ user }) {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(createChat(user));
    };

    return (
        <Styled>
            <ProfileCard user={user} />
            <div className='wrapper'>
                <div className='card'>
                    <div className='card-body'>
                        <button className='btn btn-primary' onClick={handleOnClick}>Agregar chat</button>
                    </div>
                </div>
            </div>
        </Styled>
    );
}
