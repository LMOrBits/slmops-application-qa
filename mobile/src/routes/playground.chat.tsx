import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import ChatPage from "@/app/chats/page";

export const Route = createFileRoute("/playground/chat")({
  component: ChatComponent,
  validateSearch: z.object({
    id: z.string().optional(),
  }),
});

function ChatComponent() {
  const { id } = useSearch({ from: "/playground/chat" });
  return <ChatPage id={id} />;
}
