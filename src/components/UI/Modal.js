import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledModal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  .modal-body {
    background-color: #fff;
    max-height: 500px;
    max-width: 500px;
    min-height: 175px;
  }
`;

const root = document.getElementById("root");

function Modal({ children, show }) {
  if (!show) {
    return null;
  }

  return createPortal(<StyledModal>{children}</StyledModal>, root);
}

Modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool
};

export default Modal;
