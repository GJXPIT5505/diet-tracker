import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { chatWithDietitian } from "@/lib/gemini";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const aiResponse = await chatWithDietitian(messages, apiKey);
    
    const textReply = aiResponse.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak dapat menjawab saat ini.";

    return NextResponse.json({ reply: textReply });
  } catch (error: any) {
    console.error("Chat API Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
