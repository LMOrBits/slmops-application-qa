import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { CHAT_API_URL } from "@/config/chatBackend";
import { cookies } from "next/headers";

interface Response {
  message: string;
  cookie: string;
  user_id: string | undefined;
}

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const session_id = cookieStore.get("session_id");
  console.log("session_id", session_id);

  try {
    const response = await axios.get<Response>(`${CHAT_API_URL}/cookie`, {
      withCredentials: true,
      headers: {
        Cookie: `session_id=${session_id?.value}`,
      },
    });

    const cookie = String(response.data.cookie);
    console.log("cookie----", cookie);
    if (cookie) {
      const res = NextResponse.json(
        { message: "Cookie set successfully" },
        { status: 200 }
      );
      res.cookies.set("session_id", cookie);
      return res;
    } else {
      return NextResponse.json(
        { error: "Failed to retrieve cookie from third-party service" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching cookie:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the cookie" },
      { status: 500 }
    );
  }
}
