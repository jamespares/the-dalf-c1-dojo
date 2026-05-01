import { Context, Hono } from 'hono';
import { getCookie, deleteCookie } from 'hono/cookie';
import { SignJWT, jwtVerify } from 'jose';
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { getDb } from './db';
import { users, sessions } from './db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

const SESSION_COOKIE = 'session';
const BETTER_AUTH_COOKIE = 'better-auth.session_token';

// Unified user type used across the app
export type AppUser = {
  id: number;
  email: string;
  passwordHash: string;
  createdAt: Date | null;
};

export function createAuth(env: { DB: D1Database; BETTER_AUTH_SECRET: string; BETTER_AUTH_URL: string }) {
  return betterAuth({
    database: drizzleAdapter(getDb(env.DB), { provider: 'sqlite' }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
  });
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getCurrentUser(c: Context): Promise<AppUser | null> {
  const db = getDb(c.env.DB);

  // Try Better Auth session first
  try {
    const auth = createAuth(c.env);
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (session?.user) {
      // Find existing legacy user by email
      const [legacyUser] = await db.select().from(users).where(eq(users.email, session.user.email));
      if (legacyUser) return legacyUser;

      // Create legacy user entry for this Better Auth user
      const [newUser] = await db.insert(users).values({
        email: session.user.email,
        passwordHash: '',
      }).returning();
      return newUser;
    }
  } catch {
    // Fall through to legacy
  }

  // Legacy JWT fallback
  const token = getCookie(c, SESSION_COOKIE);
  if (!token) return null;

  try {
    const secretEnv = (c.env as any).SESSION_SECRET;
    if (!secretEnv) return null;
    const secret = new TextEncoder().encode(secretEnv);
    const { payload } = await jwtVerify(token, secret, { clockTolerance: 60 });
    const userId = payload.userId as number;
    if (!userId) return null;

    const [session] = await db.select().from(sessions).where(eq(sessions.token, token));
    if (!session) return null;

    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user || null;
  } catch {
    return null;
  }
}

export async function logout(c: Context) {
  // Clear Better Auth session
  deleteCookie(c, BETTER_AUTH_COOKIE);

  // Clear legacy session
  const token = getCookie(c, SESSION_COOKIE);
  if (token) {
    const db = getDb(c.env.DB);
    await db.delete(sessions).where(eq(sessions.token, token));
  }
  deleteCookie(c, SESSION_COOKIE);
}

export function authMiddleware() {
  return async (c: Context, next: () => Promise<void>) => {
    const user = await getCurrentUser(c);
    if (!user) {
      return c.redirect('/login');
    }
    c.set('user', user);
    await next();
  };
}

export function isAdmin(user: { email: string }, env: unknown): boolean {
  const adminEmails = (((env as any)?.ADMIN_EMAILS) || '').split(',').map((e: string) => e.trim()).filter(Boolean);
  return adminEmails.includes(user.email);
}

export function adminMiddleware() {
  return async (c: Context, next: () => Promise<void>) => {
    const user = await getCurrentUser(c);
    if (!user) return c.redirect('/login');

    if (!isAdmin(user, c.env)) {
      return c.text('Forbidden', 403);
    }

    c.set('user', user);
    await next();
  };
}

// Types
declare module 'hono' {
  interface ContextVariableMap {
    user: AppUser;
  }
}
