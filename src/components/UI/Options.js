import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";

export default function Options({ children, onClick }) {

  const handleClick = (event) => {
    event.stopPropagation();

    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <Dropdown onClick={handleClick}>
      <Dropdown.Toggle variant="ligth">
        <span className="material-icons">more_vert</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  );
}

Options.propTypes = {
  onClick: PropTypes.func, 
  children: PropTypes.element
};