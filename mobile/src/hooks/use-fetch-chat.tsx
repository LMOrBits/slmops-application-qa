import { useState, useEffect } from "react";
import axios from "axios";
import { CHAT_API_URL } from "@/config/chatBackend";

interface ChatItem {
  title: string;
  id: string;
}
interface ChatResponse {
  chats: ChatItem[];
}

export const useFetchChats = (id: string) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log("chats", chats);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get<ChatResponse>(`${CHAT_API_URL}/chat`, {
          withCredentials: true,
        });
        const data = response.data;

        setChats(data.chats);
      } catch (err) {
        setError("Error fetching chats");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [refresh, id]);

  const invalidate = () => {
    // setLoading(true);
    setRefresh((prev) => !prev);
  };

  return { chats, loading, error, invalidate };
};

export default useFetchChats;
