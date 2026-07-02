import { jwtVerify, SignJWT } from "jose";

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }
  return new TextEncoder().encode(secret);
};

export async function signToken(payload: { userId: string; email: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecretKey());
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, getJwtSecretKey());
    return verified.payload as { userId: string; email: string };
  } catch (err) {
    return null;
  }
}

// Simple edge-compatible password hashing using Web Crypto API (SHA-256)
// For a production app, consider using Scrypt or PBKDF2 if edge limits allow, or a service like Auth0/Clerk.
export async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}
