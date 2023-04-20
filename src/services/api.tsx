import axios from "axios";
import { Constants } from "../config/constants";

const { REACT_APP_BASE_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

const token = JSON.parse(localStorage.getItem(Constants.currentUser) || "");

api.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;

export default api;
