import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { estimateCaloriesFromImage } from "@/lib/gemini";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { base64Image, mimeType } = body;
    
    if (!base64Image || !mimeType) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    // Call Gemini Vision API
    const aiResponse = await estimateCaloriesFromImage(base64Image, mimeType, apiKey);
    
    const textReply = aiResponse.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textReply) {
      return NextResponse.json({ error: "Gagal menganalisis gambar" }, { status: 500 });
    }

    try {
      // Parse JSON from textReply, sometimes AI wraps it in markdown blocks like ```json ... ```
      const cleanedText = textReply.replace(/```json/g, "").replace(/```/g, "").trim();
      const nutritionData = JSON.parse(cleanedText);
      return NextResponse.json(nutritionData);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", textReply);
      return NextResponse.json({ error: "Format respons tidak valid" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Scan API Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
