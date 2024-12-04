import { useChat } from "ai/react";
import { Messages } from "./messages/Messages";
import { ChatInput } from "./ChatInput";
import { CHAT_API_URL } from "@/config/chatBackend";
import { useLoadHistory } from "@/hooks/use-load-history";
import { createChat } from "@/lib/chatserver/connections";

import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Spinner } from "@nextui-org/spinner";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export const ChatWrapper = ({ chatId }: { chatId: string }) => {
  const navigate = useNavigate();
  const { messages: initialMessages, isLoading: isLoadingHistory } =
    useLoadHistory(chatId);

  const {
    messages,
    handleInputChange,
    handleSubmit: handleChatSubmit,
    input,
    setInput,
    isLoading,
    stop,
  } = useChat({
    api: `${CHAT_API_URL}/message/completions/${chatId}`,
    body: {},
    initialMessages,
    credentials: "include",
  });

  // Handle new chat creation
  const handleSubmit = async () => {
    if (!chatId) {
      try {
        const { chatId: newChatId } = await createChat(input);
        navigate({
          to: "/playground/chat",
          search: { id: newChatId },
        });
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    } else {
      handleChatSubmit();
    }
  };

  // Handle initial system message
  useEffect(() => {
    if (chatId && initialMessages?.length === 1) {
      handleChatSubmit(undefined, { allowEmptySubmit: true });
    }
  }, [initialMessages]);

  return (
    <div className="dark relative pt-[60px] h-[100dvh] overflow-y-auto flex flex-col justify-between gap-4 md:gap-7">
      <AnimatePresence>
        {isLoadingHistory ? (
          <motion.div
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Spinner size="lg" />
          </motion.div>
        ) : (
          <motion.div
            className="flex-1 justify-between flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Messages messages={messages} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
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
