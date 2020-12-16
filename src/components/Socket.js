import React, { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import socket from "util/socket";

export const SocketContext = createContext(null);

export default function Socket({ children }) {
  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket.get()}>
      {children}
    </SocketContext.Provider>
  );
}

Socket.propTypes = {
  children: PropTypes.element.isRequired
};