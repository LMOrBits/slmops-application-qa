import { openai, createOpenAI } from "@ai-sdk/openai";
import { NextRequest } from "next/server";
import { streamText } from "ai";
import { cookies } from "next/headers";
import { CHAT_API_URL } from "@/config/chatBackend";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const POST = async (req: NextRequest) => {
  const cookieStore = cookies();
  const session_id = cookieStore.get("sessionId");
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];
  const customEndpoint = createOpenAI({
    baseURL: CHAT_API_URL,
    headers: {
      Cookie: `session_id=${session_id?.value}`,
    },
    compatibility: "compatible",
  });
  const result = streamText({
    model: customEndpoint("gpt-4o-mini"),
    messages: [lastMessage],
  });

  return result.toDataStreamResponse();
};
