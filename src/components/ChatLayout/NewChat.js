import styled from "styled-components";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { createChat } from "actions/chats";

const StyledNewChat = styled.div`
  height: 100%;

  .wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function NewChat({ user }) {
  const dispatch = useDispatch();
  const handleAdd = () => dispatch(createChat(user));

  return (
    <StyledNewChat>
      <div className="wrapper">
        <div className="card">
          <div className="card-body">
            <button className="btn btn-primary" onClick={handleAdd}>
              Agregar chat
            </button>
          </div>
        </div>
      </div>
    </StyledNewChat>
  );
}

NewChat.propTypes = {
  user: PropTypes.object.isRequired
};
