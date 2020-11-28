import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useDebounce from "hooks/useDebounce";
import { search, clearSearch } from "actions/search";

const StyledSearch = styled.div`
    display: flex;
    align-items: center;

    .i-close {
        cursor: pointer;
    }
`;

export default function Search({ setSearching, searching }) {
    const [value, setValue] = useState("");
    const debounce = useDebounce(value);

    const dispatch = useDispatch();

    const handleSearch = (event) => {
        const newValue = event.target.value;

        if (newValue.trim().length === 0) {
            return handleClear();
        }

        setValue(newValue);
        setSearching(true);
    };

    const handleClear = () => {
        setSearching(false);
        setValue("");

        dispatch(clearSearch());
    };

    useEffect(() => {
        if (debounce.length > 0) {
            dispatch(search(debounce));
        }
    }, [debounce, dispatch]);

    return (
        <StyledSearch className='p-2 border-bottom'>
            <input
                type='text'
                className='form-control'
                placeholder='Buscar'
                onChange={handleSearch}
                value={value}
            />
            {searching && <i className='text-primary ml-2 material-icons i-close' onClick={handleClear}>clear</i>}
        </StyledSearch>
    );
}