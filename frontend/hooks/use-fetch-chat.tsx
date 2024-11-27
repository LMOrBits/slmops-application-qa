"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface ChatItem {
  title: string;
  url: string;
}

export const useFetchChats = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`/api/chats`, {
          withCredentials: true,
        });
        const data = response.data;

        const formattedChats = data.map((chat: any) => ({
          title: chat.title,
          url: `/chat/${chat.id}`,
        }));
        setChats(formattedChats);
      } catch (err) {
        setError("Error fetching chats");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [refresh]);

  const invalidate = () => {
    // setLoading(true);
    setRefresh((prev) => !prev);
  };

  return { chats, loading, error, invalidate };
};

export default useFetchChats;
