import { ChatWrapper } from "@/components/ChatWrapper";
import { cookies } from "next/headers";

const Page = async () => {
  const chatId = "123";

  const initialMessages: any[] = [];

  return (
    <div className="h-[100dvh]]">
      <ChatWrapper chatId={chatId} initialMessages={initialMessages} />
    </div>
  );
};

export default Page;
