import React from "react";
import PropTypes from "prop-types";

export default function Avatar({ user }) {
    const size = 45;

    return (
        <div className="rounded-circle border d-inline-block avatar">
            <img
                src={user.avatar}
                alt={`Foto de ${user.username}`}
                height={size}
                width={size}
            />
        </div>
    );
}

Avatar.propTypes = {
    user: PropTypes.object.isRequired
};