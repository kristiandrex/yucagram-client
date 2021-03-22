import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "hooks/useDebounce";
import { search, clearResults, setSearching } from "actions/search";

export default function Search() {
  const searching = useSelector((state) => state.search.searching);
  const [value, setValue] = useState("");
  const debounce = useDebounce(value);
  const dispatch = useDispatch();

  const handleClear = useCallback(() => {
    setValue("");
    dispatch(clearResults());
  }, [dispatch]);

  const handleSearch = useCallback(
    (event) => {
      const newValue = event.target.value;

      if (newValue.trim().length === 0) {
        return handleClear();
      }

      dispatch(setSearching());
      setValue(newValue);
    },
    [dispatch, handleClear]
  );

  useEffect(() => {
    if (debounce !== "") {
      dispatch(search(debounce));
    }
  }, [debounce, dispatch]);

  return (
    <div className="border-bottom p-2 d-flex align-items-center" role="search">
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
          tabIndex="0"
          role="button"
          aria-label="Cerrar la búsqueda"
        >
          clear
        </span>
      )}
    </div>
  );
}
