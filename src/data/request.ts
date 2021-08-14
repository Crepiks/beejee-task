import axios from "axios";
import config from "../config";

const instance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { "Content-Type": "multipart/form-data" },
});

export default instance;
