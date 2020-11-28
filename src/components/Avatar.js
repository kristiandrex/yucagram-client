import React from "react";
import PropTypes from "prop-types";

export default function Avatar({ user }) {
    return (
        <div className='rounded-circle border'>
            <img
                src={user.avatar}
                alt={`Foto de ${user.username}`}
                height='47px'
                width='47px'
                className='rounded-circle'
            />
        </div>
    );
}

Avatar.propTypes = {
    user: PropTypes.object.isRequired
};