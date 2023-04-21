import axios from "axios";
import { Constants } from "../config/constants";

const { REACT_APP_BASE_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

api.interceptors.request.use(function (config) {
  var token: any;
  const cuurrentUser = localStorage.getItem(Constants.currentUser);
  if (cuurrentUser) {
    token = JSON.parse(localStorage.getItem(Constants.currentUser) || "");
  }
  config.headers.Authorization = token ? `Bearer ${token.access_token}` : "";
  return config;
});

export default api;
