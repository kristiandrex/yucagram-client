import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import MessageProvider from "components/Messages/MessageProvider";

export default function LastMessage({ _id, onObserve }) {
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    onObserve(inView);
  }, [inView, onObserve]);

  return (
    <div className="last-message-observer" ref={ref}>
      <MessageProvider _id={_id} />
    </div>
  );
}

LastMessage.propTypes = {
  _id: PropTypes.string,
  onObserve: PropTypes.func
};
