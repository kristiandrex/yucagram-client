import getDateTime from "util/getDatetime";
import PropTypes from "prop-types";

function Timestamp({ date }) {
  const { datetime, timestamp } = getDateTime(date);

  return (
    <time dateTime={datetime} className="ml-2 mr-1">
      {timestamp}
    </time>
  );
}

Timestamp.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
};

export default Timestamp;
