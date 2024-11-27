"use client";

import { ChatWrapper } from "@/components/ChatWrapper";
import { useParams } from "next/navigation";

interface RouterQuery {
  chatid?: string;
}

export default function ChatPage() {
  const { chatid } = useParams();
  const initialMessages: any[] = [];

  return (
    <div className="h-[100dvh]]">
      <ChatWrapper
        chatId={chatid as string}
        initialMessages={initialMessages}
      />
    </div>
  );
}
