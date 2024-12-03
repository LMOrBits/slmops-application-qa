import { ChatWrapper } from "@/components/ChatWrapper";
import { AnimatePresence, motion } from "framer-motion";
export default function ChatPage({ id }: { id: string | undefined }) {
  return (
    <AnimatePresence>
      <motion.div
        className="h-[100dvh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ChatWrapper chatId={id as string} />
      </motion.div>
    </AnimatePresence>
  );
}
