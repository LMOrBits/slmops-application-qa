"use client";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export const useSessionId = () => {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const updateSessionId = () => {
      const cookies = document.cookie.split(";");
      const sessionIdCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("session_id=")
      );
      if (sessionIdCookie) {
        const sessionId = sessionIdCookie.trim().split("=")[1];
        setSessionId(decodeURIComponent(sessionId));
      } else {
        setSessionId("");
      }
    };

    // Initial check
    updateSessionId();

    // Add event listener for cookie changes
    window.addEventListener("storage", (e) => {
      if (e.key === "cookie") {
        updateSessionId();
      }
    });

    return () => {
      window.removeEventListener("storage", updateSessionId);
    };
  }, []);

  const axiosClient = axios.create({
    withCredentials: true,
    headers: {
      Cookie: `session_id=${sessionId}`,
    },
  });

  return { axiosClient, sessionId };
};
