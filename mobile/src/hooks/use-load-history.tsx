import { useEffect, useState } from "react";
import axios from "axios";
import { type Message } from "ai/react";
import { CHAT_API_URL } from "@/config/chatBackend";

export function useLoadHistory(chatId: string) {
  const [refresh, setRefresh] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      if (!chatId) {
        setMessages([]);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${CHAT_API_URL}/messages/${chatId}`, {
          withCredentials: true,
        });
        setMessages(response.data.messages);
        setError(null);
      } catch (err) {
        setError("Failed to load message history");
        console.error("Error loading messages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [refresh, chatId]);

  const invalidate = () => {
    setRefresh((prev) => !prev);
  };

  return { messages, isLoading, error, invalidate };
}
