import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useDebounce from "hooks/useDebounce";
import { search, clearResults, setSearching } from "actions/search";

const StyledSearch = styled.div`
  align-items: center;  
  display: flex;
`;

export default function Search() {
  const searching = useSelector((state) => state.search.searching);
  const [value, setValue] = useState("");
  const debounce = useDebounce(value);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const newValue = event.target.value;

    if (newValue.trim().length === 0) {
      return handleClear();
    }

    dispatch(setSearching());
    setValue(newValue);
  };

  const handleClear = () => {
    setValue("");
    dispatch(clearResults());
  };

  useEffect(() => {
    if (debounce.length > 0) {
      dispatch(search(debounce));
    }
  }, [debounce, dispatch]);

  return (
    <StyledSearch className="border-bottom p-2">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar"
        aria-label="Buscar"
        onChange={handleSearch}
        value={value}
      />
      {searching && (
        <span
          className="text-primary ml-2 material-icons cursor"
          onClick={handleClear}
        >
          clear
        </span>
      )}
    </StyledSearch>
  );
}