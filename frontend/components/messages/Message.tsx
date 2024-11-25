import { BotMessage } from "@/components/messages/BotMessage";
import { UserMessage } from "@/components/messages/UserMessage";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
  isLoading: boolean;
}

export const Message = ({
  content,
  isUserMessage,
  isLoading,
}: MessageProps) => {
  return (
    <div className="lg:p-6 sm:p-4 xs:px-3 py-4 ">
      <div className="max-w-3xl mx-auto flex items-start">
        {isUserMessage ? (
          <UserMessage content={content} isUserMessage={true} />
        ) : (
          <BotMessage
            content={content}
            isUserMessage={false}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
