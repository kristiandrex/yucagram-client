import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CurrentUser from "./CurrentUser";
import CurrentChat from "./CurrentChat";
import pattern from "assets/pattern.svg";

const Styled = styled.div`
    background-image: url(${pattern});
`;

export default function Current() {
    const current = useSelector((state) => state.chats.current);
    const IS_USER = current?.role === "USER";

    return (
        <Styled className='col-12 col-lg-9 col-sm-8'>
            {
                current !== null
                    ? IS_USER ? <CurrentUser user={current} /> : <CurrentChat />
                    : null
            }
        </Styled>
    );
}