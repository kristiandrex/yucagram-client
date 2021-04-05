import axios from "axios";
import { SERVER_URL } from "config";

axios.defaults.baseURL = SERVER_URL;

function request(options) {
  if (!options.headers) {
    options.headers = {};
  }

  if (!options.headers.authorization) {
    const token = window.localStorage.getItem("token");
    options.headers.authorization = `Bearer ${token}`;
  }

  return axios.request(options);
}

export default request;
