import { useCallback, memo } from "react";
import { CodeBlock } from "@/components/messages/Codeblock";
import BotMessageButton from "@/components/messages/BotMessageButton";
import { Bot, Copy, ThumbsDown, ThumbsUp, Repeat } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@nextui-org/skeleton";
import { motion, AnimatePresence } from "framer-motion";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
  isLoading: boolean;
}
// Separate the buttons into their own component
const MessageActions = memo(({ onCopy }: { onCopy: () => void }) => {
  return (
    <div className="flex flex-row gap-1 self-start ml-2">
      <BotMessageButton
        startContent={<Copy className="size-3 text-foreground/50" />}
        onClick={onCopy}
      />
      <BotMessageButton
        startContent={<ThumbsDown className="size-3 text-foreground/50" />}
        onClick={() => {}}
      />
      <BotMessageButton
        startContent={<ThumbsUp className="size-3 text-foreground/50" />}
        onClick={() => {}}
      />
      <BotMessageButton
        startContent={<Repeat className="size-3 text-foreground/50" />}
        onClick={() => {}}
      />
    </div>
  );
});

// Memoize the markdown components configuration
const markdownComponents = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const isInline = !match;

    if (isInline) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    const codeContent = String(children).replace(/\n$/, "");
    const key = `code-${Buffer.from(codeContent).toString("base64")}`;

    return (
      <CodeBlock
        key={key}
        language={(match && match[1]) || ""}
        value={codeContent}
        {...props}
      />
    );
  },
};

// Main component using memo
export const BotMessage = memo(({ content, isLoading }: MessageProps) => {
  const handleCopy = useCallback(async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }, [content]);

  return (
    <div className="flex w-full gap-4">
      <div className="shrink-0 rounded-full flex justify-center items-start">
        <Bot className="size-9 rounded-full text-foreground/80 bg-muted/10 p-2" />
      </div>
      <div className="flex flex-col max-w-[80%] pt-2">
        <AnimatePresence>
          {isLoading && !content?.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full flex flex-col pt-1 gap-2 "
            >
              <Skeleton className="h-3  w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </motion.div>
          ) : (
            <ReactMarkdown
              className="prose-sm prose-neutral prose-a:text-accent-foreground/50 whitespace-pre-wrap"
              components={markdownComponents}
            >
              {content}
            </ReactMarkdown>
          )}
        </AnimatePresence>
        <MessageActions onCopy={handleCopy} />
      </div>
    </div>
  );
});

BotMessage.displayName = "BotMessage";
