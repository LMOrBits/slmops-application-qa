import { useCallback, memo } from "react";
import BotMessageButton from "@/components/messages/BotMessageButton";
import { Bot, Copy, ThumbsDown, ThumbsUp, Repeat } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@heroui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

import { type Message as TMessage } from "ai/react";
import { type ToolInvocation } from "ai";
import References, { type ReferencesProps } from "./References";
import { markdownComponents } from './markdownComponents';


interface MessageProps {
  message: TMessage;
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

// Main component using memo
export const BotMessage = memo(({ message, isLoading }: MessageProps) => {
  const handleCopy = useCallback(async () => {
    if (!message.content) return;
    try {
      await navigator.clipboard.writeText(message.content);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }, [message.content]);

  return (
    <div className="flex w-full gap-4">
      <div className="shrink-0 rounded-full flex justify-center items-start">
        <Bot className="size-9 rounded-full text-foreground/80 bg-muted/10 p-2" />
      </div>
      <div className="flex flex-col max-w-[80%] pt-2">
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full flex flex-row pt-1 gap-2 flex-wrap "
            >
              <Skeleton className="h-3  w-1/5 rounded-lg" />
              <Skeleton className="h-3 w-2/5 rounded-lg" />
              <Skeleton className="h-3 w-2/5 rounded-lg" />
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-1/5 rounded-lg" />
            </motion.div>
          ) : (
            <div className="flex flex-col">
              <ReactMarkdown
                className="prose-sm prose-neutral prose-a:text-accent-foreground/50 whitespace-pre-wrap"
                components={markdownComponents}
              >
                {`${message.content}`}
              </ReactMarkdown>
              <div className="text-xs text-foreground/50 bg-primary/10 rounded-md py-1 w-fit px-2">
                {JSON.stringify(message.data)}
              </div>
              {message.toolInvocations && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className=""
                >
                  {message.toolInvocations?.map((tool: ToolInvocation, index: number) =>
                    tool.state === "result" ? (
                      tool.args?.type === "references" && (
                        <div key={`references-${tool.toolCallId}-${index}`} className="flex flex-row flex-wrap gap-2 ">
                          {tool.result.map((reference: ReferencesProps, i: number) => (
                            <References key={`reference-${tool.toolCallId}-${i}`} reference={reference} />
                          ))}
                        </div>
                      )
                    ) : (
                      <span key={`tool-${tool.toolCallId}-${index}`}>
                        {JSON.stringify(tool)}
                      </span>
                    )
                  )}
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
        <MessageActions onCopy={handleCopy} />
      </div>
    </div>
  );
});

BotMessage.displayName = "BotMessage";
