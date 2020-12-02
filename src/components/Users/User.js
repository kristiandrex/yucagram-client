import React, { memo } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "components/Avatar";
import { setCurrent } from "actions/chats";

function User({ user }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setCurrent(user));
    };

    return (
        <div
            key={user._id}
            className="border-bottom p-2 d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
        >
            <Avatar user={user} />
            <span className="ml-2 font-weight-bold">{user.username}</span>
        </div>
    );
}

User.propTypes = {
    user: PropTypes.object.isRequired
};

export default memo(User);