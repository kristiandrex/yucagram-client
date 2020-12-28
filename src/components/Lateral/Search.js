import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useDebounce from "hooks/useDebounce";
import { search, clearSearch } from "actions/search";

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
`;

export default function Search() {
  const [isSearching, setIsSearching] = useState(false);
  const [value, setValue] = useState("");
  const debounce = useDebounce(value);

  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const newValue = event.target.value;

    if (newValue.trim().length === 0) {
      return handleClear();
    }

    setIsSearching(true);
    setValue(newValue);
  };

  const handleClear = () => {
    setValue("");
    setIsSearching(false);
    dispatch(clearSearch());
  };

  useEffect(() => {
    if (debounce.length > 0) {
      dispatch(search(debounce));
    }
  }, [debounce, dispatch]);

  return (
    <StyledSearch className="p-2 border-bottom">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar"
        onChange={handleSearch}
        value={value}
      />
      {isSearching && <i className="text-primary ml-2 material-icons cursor" onClick={handleClear}>clear</i>}
    </StyledSearch>
  );
}