import React from "react";
import PropTypes from "prop-types";

export default function MessageState({ seen }) {
  return (
    <span className="state material-icons">
      {seen ? "done_all" : "done"}
    </span>
  );
}

MessageState.propTypes = {
  seen: PropTypes.bool.isRequired
};