import { BotMessage } from "@/components/messages/BotMessage";
import { UserMessage } from "@/components/messages/UserMessage";
import { type Message as TMessage } from "ai/react";
interface MessageProps {
  message: TMessage;
  isUserMessage: boolean;
  isLoading: boolean;
}

export const Message = ({
  message,
  isUserMessage,
  isLoading,
}: MessageProps) => {
  return (
    <div className="lg:p-6 sm:p-4 xs:px-3 py-4 ">
      <div className="max-w-3xl mx-auto flex items-end">
        {isUserMessage ? (
          <UserMessage message={message} isUserMessage={true} />
        ) : (
          <BotMessage
            message={message}
            isUserMessage={false}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
