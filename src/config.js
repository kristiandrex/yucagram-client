//prettier-ignore
export const SERVER_URL = process.env.NODE_ENV === "production"
  ? "https://yucagram-server.herokuapp.com"
  : "http://localhost:5000";
