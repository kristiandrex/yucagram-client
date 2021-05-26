import PropTypes from "prop-types";

export default function MessageStatus({ seen }) {
  return (
    <span className="state material-icons">{seen ? "done_all" : "done"}</span>
  );
}

MessageStatus.propTypes = {
  seen: PropTypes.bool.isRequired
};
