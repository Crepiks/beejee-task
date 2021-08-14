import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=sayazhan",
  timeout: 2000,
  headers: { "Content-Type": "multipart/form-data" },
});

export default instance;
