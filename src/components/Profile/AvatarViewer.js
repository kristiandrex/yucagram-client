import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "components/UI/Modal";
import ModalCrop from "./ModalCrop";
import request from "util/request";
import { changeAvatar } from "actions/auth";

const StyledAvatarChooser = styled.div`
  width: 125px;
  height: 125px;
  position: relative;
  display: block;

  img {
    border-radius: 100%;
  }

  input#avatar {
    display: none;
  }

  label {
    cursor: pointer;
    margin: 0;
    border: 3px solid #fff;
    position: absolute;
    bottom: 0px;
    right: 0px;
    color: #fff;
    border-radius: 100%;
  }
`;

const INITAL_ERROR = { show: false, message: "" };
const ALLOWED_EXTENSIONS = /(\.jpg|\.jpeg|\.png)$/i;
const MIN_SIZE = 150;

const ERROR_MESSAGES = {
  size: "La imagen debe tener un alto y ancho de al menos 150 píxeles.",
  extension: "El archivo debe ser una imagen."
};

export default function AvatarViewer() {
  const { avatar, username } = useSelector((state) => state.auth.user);
  const [error, setError] = useState(INITAL_ERROR);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = () => {
    const file = fileRef.current.files[0];

    if (!ALLOWED_EXTENSIONS.test(file.name)) {
      return setError({ show: true, message: ERROR_MESSAGES.extension });
    }

    const image = new Image();
    const url = URL.createObjectURL(file);
    image.src = url;

    image.onload = function () {
      const { naturalHeight, naturalWidth } = this;

      if (naturalHeight < MIN_SIZE || naturalWidth < MIN_SIZE) {
        return setError({ show: true, message: ERROR_MESSAGES.size });
      }

      setUrl(url);
      setShow(true);
    };
  };

  const handleSave = async (croppedArea) => {
    try {
      const formData = new FormData();
      formData.append("avatar", fileRef.current.files[0]);
      formData.append("area", JSON.stringify(croppedArea));

      const response = await request.post("/auth/upload/avatar", formData);
      dispatch(changeAvatar(response.data));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    fileRef.current.value = null;
    setShow(false);
    setUrl("");
    URL.revokeObjectURL(url);
  };

  return (
    <StyledAvatarChooser className="mb-4">
      <Modal show={error.show} >
        <div className="bg-light p-3 shadow-sm rounded">
          <p>{error.message}</p>
          <button
            className="btn btn-primary"
            aria-label="Cerrar alerta"
            onClick={() => setError(INITAL_ERROR)}
          >
            Cerrar
          </button>
        </div>
      </Modal>
      <Modal show={show}>
        <ModalCrop
          src={url}
          onClose={handleClose}
          onSave={handleSave}
        />
      </Modal>
      <img
        src={avatar}
        alt={username}
        className="border"
        width="125px"
        height="125px"
      />
      <div>
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          ref={fileRef}
        />
        <label htmlFor="avatar" className="material-icons bg-primary p-2">
          edit
        </label>
      </div>
    </StyledAvatarChooser>
  );
}