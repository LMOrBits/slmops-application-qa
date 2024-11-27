import { type Message as TMessage } from "ai/react";
import { Message } from "./Message";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MessagesProps {
  messages: TMessage[];
  isLoading: boolean;
}
declare global {
  interface Window {
    MyNamespace: any;
  }
}
export const Messages = ({ messages, isLoading }: MessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        const container = messagesEndRef.current;

        // Use smooth scrolling on mobile for better visual feedback
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    // Add resize listener to handle orientation changes
    const handleResize = () => {
      scrollToBottom();
    };

    window.addEventListener("resize", handleResize);
    scrollToBottom();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [messages]);

  return (
    <div
      ref={messagesEndRef}
      className={cn(
        "flex flex-1 flex-col overflow-y-auto pb-[40vh] ",
        "2xl:px-[10vw] xl:px-[10vw] lg:px-[10vw] md:px-[20px] px-[12px]",
        "max-h-[calc(100dvh)] min-h-[calc(50dvh-3rem)]",
        "md:px-auto xs:m-0"
        // {
        //   "max-h-[calc(100dvh-8rem)] min-h-[calc(50dvh-8rem)]":
        //     (window.visualViewport?.height ?? window.innerHeight) <
        //     window.innerHeight,
        //   "max-h-[calc(100dvh-3.5rem-2rem)] min-h-[calc(50dvh-3.5rem-2rem)]":
        //     (window.visualViewport?.height ?? window.innerHeight) >=
        //     window.innerHeight,
        // }
      )}
    >
      {messages.length || isLoading ? (
        <>
          {messages.map((message, i) => (
            <Message
              key={i}
              content={message.content}
              isLoading={false}
              isUserMessage={message.role === "user"}
            />
          ))}
          {messages[messages.length - 1]?.role === "user" && isLoading && (
            <Message
              key={messages.length}
              content=""
              isLoading={true}
              isUserMessage={false}
            />
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="size-8 text-blue-500" />
          <h3 className="font-semibold text-xl">You&apos;re all set!</h3>
          <p>Ask your first question to get started.</p>
        </div>
      )}
    </div>
  );
};
