import axios from "axios";
import { SERVER_URL } from "config";

function get(url) {
  const token = localStorage.getItem("token");
  return axios.get(`${SERVER_URL}${url}`, { headers: { authorization: token } });
}

function post(url, data) {
  const token = localStorage.getItem("token");
  return axios.post(`${SERVER_URL}${url}`, data, { headers: { authorization: token } });
}

function del(url) {
  const token = localStorage.getItem("token");
  return axios.delete(`${SERVER_URL}${url}`, { headers: { authorization: token } });
}

const request = {
  post,
  get,
  delete: del
};

export default request;