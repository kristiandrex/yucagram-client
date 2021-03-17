import React, { useRef } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import AvatarViewer from "./AvatarViewer";
import PropTypes from "prop-types";

const StyledProfile = styled.div`
  .transition-enter {
    left: -100%;
  }

  .transition-enter-active {
    left: 0;
    transition: all 0.3s ease;
  }

  .transition-exit {
    left: 0;
  }

  .transition-exit-active {
    left: -100%;
    transition: all 0.3s ease;
  }

  .wrapper {
    background: #fff;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 1;

    .header span {
      line-height: 47px;
      vertical-align: middle;
    }

    .material-icons {
      cursor: pointer;
      margin-right: 0.5rem;
    }
  }
`;

export default function SideProfile({ show, onClose }) {
  const ref = useRef(null);

  return (
    <StyledProfile>
      <CSSTransition
        classNames="transition"
        unmountOnExit
        timeout={300}
        in={show}
        nodeRef={ref}
      >
        <div className="wrapper" ref={ref}>
          <div className="header p-2 bg-primary text-white">
            <span
              className="material-icons"
              onClick={onClose}
              role="button"
              tabIndex="0"
            >
              arrow_back
            </span>
            <span className="font-weight-bold">Perfil</span>
          </div>
          <div className="p-4 d-flex justify-content-center">
            <AvatarViewer />
          </div>
        </div>
      </CSSTransition>
    </StyledProfile>
  );
}

SideProfile.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
