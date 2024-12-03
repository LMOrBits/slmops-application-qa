import { CHAT_API_URL } from "@/config/chatBackend";
import axios from "axios";

export const chatApi = axios.create({
  baseURL: `${CHAT_API_URL}`,
  withCredentials: true,
});

export const createChat = async (title: string) => {
  const response = await chatApi.post<{ chatId: string }>("/chat", {
    title: title,
  });
  return response.data;
};
