import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "components/Avatar";
import { setCurrent } from "actions/chats";

const StyledUser = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--hover-background);
  }
`;

function ListUsersItem({ user }) {
  const isCurrent = useSelector((state) => state.chats.current === user._id);

  const dispatch = useDispatch();
  const handleClick = () => dispatch(setCurrent(user));

  return (
    <StyledUser
      key={user._id}
      className={isCurrent ? "border-bottom p-2 current" : "border-bottom p-2"}
      onClick={handleClick}
      tabIndex="0"
    >
      <Avatar user={user} />
      <span className="ml-2 font-weight-bold">{user.username}</span>
    </StyledUser>
  );
}

ListUsersItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default memo(ListUsersItem);
