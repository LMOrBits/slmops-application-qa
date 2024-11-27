import { NextResponse, NextRequest } from "next/server";
import { CHAT_API_URL } from "@/config/chatBackend";
import { cookies } from "next/headers";
import axios from "axios";
interface Chat {
  chat_id: string;
  title: string;
}
interface ChatResponse {
  chats: Chat[];
}

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const session_id = cookieStore.get("sessionId");
  const data = await fetch(`${CHAT_API_URL}/chat`, {
    credentials: "include",
    headers: {
      Cookie: `session_id=${session_id?.value}`,
    },
  });
  const { chats } = await data.json();
  console.log(chats);
  return NextResponse.json(chats);
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const session_id = cookieStore.get("sessionId");
  const chats = await fetch(`${CHAT_API_URL}/chat`, {
    method: "POST",
    headers: {
      Cookie: `session_id=${session_id?.value}`,
    },
  });
  return NextResponse.json(chats);
}
