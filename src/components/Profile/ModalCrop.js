import React, { useState, } from "react";
import EasyCrop from "react-easy-crop";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledModalCrop = styled.div`
  height: 500px;
  width: 500px;
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;

  .wrap {
    position: relative;
    overflow: hidden;
  }

  .zoom-slider {
    margin: auto;
    display: block;    
  }
`;

function ModalCrop({ src, onClose, onSave }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState(null);
  const [zoom, setZoom] = useState(1);

  const handleZoom = (event) => setZoom(event.target.value);
  const handleComplete = (percent, pixels) => setCroppedArea(pixels);
  const handleSave = () => onSave(croppedArea);

  return (
    <StyledModalCrop className="bg-light rounded shadow p-3">
      <div className="wrap">
        <EasyCrop
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          onZoomChange={setZoom}
          onCropChange={setCrop}
          onCropComplete={handleComplete}
        />
      </div>
      <div className="controls mt-3">
        <input
          className="zoom-slider"
          type="range"
          min="1"
          max="5"
          value={zoom}
          onChange={handleZoom}
          arial-label="Hacer zoom en la imagen"
        />
        <div className="mt-3" style={{ textAlign: "center" }}>
          <button className="btn btn-outline-secondary mr-3" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </StyledModalCrop>
  );
}

ModalCrop.propTypes = {
  src: PropTypes.string,
  onClose: PropTypes.func,
  onSave: PropTypes.func
};

export default ModalCrop;