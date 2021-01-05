import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import MessageProvider from "components/Messages/MessageProvider";

export default function LastMessage({ _id }) {
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {

  }, [inView]);

  return (
    <div className="last-message-observer" ref={ref}>
      <MessageProvider _id={_id} />
    </div>
  );
}

LastMessage.propTypes = {
  _id: PropTypes.string
};