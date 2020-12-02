import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CurrentUser from "./CurrentUser";
import CurrentChat from "./CurrentChat";
import pattern from "assets/pattern.svg";

const Styled = styled.div`
    background-image: url(${pattern});
    height: 100%;
`;

export default function Current() {
    const selector = useCallback(({ chats }) => {
        const current = chats.current;

        if (typeof current === "number") {
            return chats.collection[current];
        }

        return current;
    }, []);

    const current = useSelector(selector);
    const isUser = current?.role === "USER";

    return (
        <Styled className="col-12 col-lg-9 col-sm-8">
            {
                !current
                    ? null
                    : isUser
                        ? <CurrentUser user={current} />
                        : <CurrentChat chat={current} />
            }
        </Styled>
    );
}