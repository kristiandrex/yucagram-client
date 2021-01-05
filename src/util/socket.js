import { SERVER_URL } from "config";
import io from "socket.io-client";

let instance;

function get() {
  const token = localStorage.getItem("token");

  if (!instance && token) {
    instance = io(SERVER_URL, { query: { token } });
  }

  return instance;
}

function disconnect() {
  instance.disconnect();
  instance = null;
  return;
}

const socket = {
  get,
  disconnect
};

export default socket;