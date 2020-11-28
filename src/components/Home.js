import React from "react";
import styled from "styled-components";
import Lateral from "./Lateral/Lateral";
import Current from "./Current/Current";

const StyledHome = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;

    .no-outline {
        outline: none;
    }

    .dropdown-toggle {
        outline: none;
        box-shadow: none;
        color: #212529;

        &::after {
            display: none;
        }
    }
`;

export default function Home() {

    return (
        <StyledHome className='row no-gutters'>
            <Lateral />
            <Current />
        </StyledHome>
    );
}