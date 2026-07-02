import { NextRequest, NextResponse } from "next/server";
import { signToken, verifyToken, verifyPassword, hashPassword } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  
  if (action === "login") {
    try {
      const { email, password } = await req.json();
      
      const userResult = await db.select().from(users).where(eq(users.email, email)).limit(1);
      const user = userResult[0];
      
      if (!user) {
        return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
      }
      
      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
      }
      
      const token = await signToken({ userId: user.id, email: user.email });
      
      const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
      response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 // 7 days
      });
      
      return response;
    } catch (e) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
  if (action === "register") {
    try {
      const { email, password, name } = await req.json();
      
      const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (existing.length > 0) {
        return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
      }
      
      const passwordHash = await hashPassword(password);
      const id = crypto.randomUUID();
      
      await db.insert(users).values({
        id,
        email,
        passwordHash,
        name
      });
      
      const token = await signToken({ userId: id, email });
      const response = NextResponse.json({ success: true, user: { id, name, email } });
      response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60
      });
      
      return response;
    } catch (e) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
  if (action === "logout") {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("auth_token");
    return response;
  }
  
  return NextResponse.json({ error: "Not Found" }, { status: 404 });
}
