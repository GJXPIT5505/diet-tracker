import { drizzle } from 'drizzle-orm/d1';

// Since we are running on Cloudflare edge (Next-on-Pages), 
// we access the D1 binding from process.env (mocked locally, injected on CF).
// But for Next.js App Router API Routes, we often use getRequestContext() from @cloudflare/next-on-pages

export const getDb = (env: CloudflareEnv) => {
  return drizzle(env.DB);
};

// If using server actions where env is tricky, we can sometimes use global binding
// For this MVP, we will rely on getDb(process.env as unknown as CloudflareEnv) 
// or the context passed in API routes.

export const db = drizzle(process.env.DB as any);
