import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addMessage } from "actions/messages";
import socket from "util/socket";

const StyledWriteBox = styled.div`
  .alert {
    border-radius: .25rem .25rem 0 0;
    border-bottom: none;
    position: relative;
    display: flex;
    justify-content: space-between;

    button {
      border: none;
      background: none;
      color: inherit;
    }
  }

  form {
    align-items: center;
    background-color: #f8f9fa;
    display: flex;
    height: 60px;
    z-index: 1;
    position: relative;
  }
`;

export default function WriteBox() {

  const fromId = useSelector((state) => state.auth.user._id);
  const currentChat = useSelector(({ chats }) => chats.byId[chats.current]);

  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const io = socket.get();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text.trim().length === 0) {
      return;
    }

    const message = {
      from: fromId,
      to: currentChat.to._id,
      text,
      date: new Date(),
    };

    io.emit("SEND_MESSAGE", message, (response) => {
      if (response.error) {
        setError(true);
        return;
      }

      dispatch(addMessage(response.data, currentChat));
    });

    setText("");
  };

  const handleChange = (event) => setText(event.target.value);
  const handleClose = () => setError(false);

  return (
    <StyledWriteBox className="shadow">
      {
        error && (
          <div className="alert alert-primary m-0" role="alert">
            <span>Hubo un error al enviar el mensaje, intenta de nuevo.</span>
            <button aria-label="Cerrar" onClick={handleClose}>
              <span className="material-icons">clear</span>
            </button>
          </div>
        )
      }
      <form className="p-2 border-top" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Escribe un mensaje"
          aria-label="Escribe un mensaje"
          value={text}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-outline-primary ml-2"
          aria-label="Enviar"
        >
          <span className="material-icons">send</span>
        </button>
      </form>
    </StyledWriteBox>
  );
}