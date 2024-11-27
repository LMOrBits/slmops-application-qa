import axios from "axios";
import { CHAT_API_URL } from "@/config/chatBackend";

const axiosInstance = axios.create({
  baseURL: CHAT_API_URL, // Replace with the actual base URL
  withCredentials: true, // Ensures cookies are sent with requests
});

// Add a request interceptor to include the cookie
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the cookie value from the document
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_id"))
      ?.split("=")[1];

    if (cookieValue) {
      // Attach the cookie to the request headers
      config.headers["Cookie"] = `session_id=${cookieValue}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
