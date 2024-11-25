"use client";

import { Message, useChat } from "ai/react";
import { Messages } from "./messages/Messages";
import { ChatInput } from "./ChatInput";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    setInput,
    isLoading,
    stop,
  } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
  });

  return (
    <div className="dark relative h-[100vh] min-h-[100dvh] flex flex-col justify-between gap-4 md:gap-7">
      <div className="flex-1   justify-between flex flex-col">
        <Messages messages={messages} isLoading={isLoading} />
      </div>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
        stop={stop}
        isLoading={isLoading}
      />
    </div>
  );
};
