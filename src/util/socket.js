import { SERVER_URL } from "config";
import { io } from "socket.io-client";

let instance;

function get() {
  const token = localStorage.getItem("token");

  if (!instance && token) {
    instance = io(SERVER_URL, {
      auth: {
        token: `Bearer ${token}`
      }
    });
  }

  return instance;
}

function disconnect() {
  instance.disconnect();
  instance = null;
}

const socket = {
  get,
  disconnect
};

export default socket;
