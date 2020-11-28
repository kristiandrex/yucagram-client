import { sendMessage } from "actions/messages";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const StyledWriteMessage = styled.form`
    background-color: #f8f9fa;
    height: 60px;
    display: flex;
    align-items: center;
`;

export default function MessageBox() {
    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (value.trim().length === 0) {
            return;
        }

        dispatch(sendMessage(value));

        setValue("");
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <StyledWriteMessage className='p-2 border-top' onSubmit={handleSubmit}>
            <input
                type='text'
                className='form-control'
                placeholder='Escribe un mensaje'
                value={value}
                onChange={handleChange}
            />
            <button type='submit' className='btn btn-outline-primary ml-2'>
                <span className='material-icons'>send</span>
            </button>
        </StyledWriteMessage>
    );
}