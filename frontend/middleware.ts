import { NextRequest, NextResponse } from "next/server";
import { CHAT_API_URL } from "@/config/chatBackend";
import axios from "axios";
interface Response {
  message: string;
  cookie: string;
  user_id: string | undefined;
}
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const cookie = req.cookies.get("sessionId");

  if (!cookie) {
    const response = await axios.get<Response>(`${CHAT_API_URL}/cookie`, {
      withCredentials: true,
    });
    const backendCookie = String(response.data.cookie);
    res.cookies.set("sessionId", backendCookie);
  }

  return res;
}
