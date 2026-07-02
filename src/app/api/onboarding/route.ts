import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { age, weight, height, activity, goal, target } = body;

    await db.update(users)
      .set({
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
        activityLevel: activity,
        goal: goal,
        targetCalories: Math.round(target)
      })
      .where(eq(users.id, payload.userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Onboarding Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
