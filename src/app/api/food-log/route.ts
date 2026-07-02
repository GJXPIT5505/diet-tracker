import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { db } from "@/db";
import { foodLogs } from "@/db/schema";
import { eq, desc, gte, lte, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get today's logs
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const logs = await db.select()
      .from(foodLogs)
      .where(
        and(
          eq(foodLogs.userId, payload.userId),
          gte(foodLogs.loggedAt, today),
          lte(foodLogs.loggedAt, tomorrow)
        )
      )
      .orderBy(desc(foodLogs.loggedAt));

    return NextResponse.json({ logs });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, calories, protein, carbs, fat, imageUrl } = body;

    const newId = crypto.randomUUID();

    await db.insert(foodLogs).values({
      id: newId,
      userId: payload.userId,
      name,
      calories: parseInt(calories),
      protein: parseFloat(protein || 0),
      carbs: parseFloat(carbs || 0),
      fat: parseFloat(fat || 0),
      imageUrl: imageUrl || null
    });

    return NextResponse.json({ success: true, id: newId });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
