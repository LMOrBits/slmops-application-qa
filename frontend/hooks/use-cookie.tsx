import axios from "axios";
import { useEffect } from "react";
import { CHAT_API_URL } from "@/config/chatBackend";
interface Response {
  message: string;
  cookie: string;
  user_id: string | undefined;
}
export const useCookie = () => {
  useEffect(() => {
    if (document.cookie.includes("session_id")) {
      return;
    }
    const fetchCookie = async () => {
      const response = await axios.get<Response>(`${CHAT_API_URL}/cookie`);
    };
    fetchCookie();
  }, []);
};
