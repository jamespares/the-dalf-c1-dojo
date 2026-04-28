import { Context, Hono } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { SignJWT, jwtVerify } from 'jose';
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { getDb } from './db';
import { users, sessions } from './db/schema';

const SESSION_COOKIE = 'session';
const SESSION_DAYS = 7;

function getSecret(c: Context) {
  const secret = c.env.SESSION_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error(
      'SESSION_SECRET is not set. For local dev, add it to .dev.vars. For production, run: wrangler secret put SESSION_SECRET'
    );
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(c: Context, userId: number): Promise<string> {
  const secret = getSecret(c);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresAt)
    .sign(secret);

  const db = getDb(c.env.DB);
  await db.insert(sessions).values({ userId, token, expiresAt });

  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
    path: '/',
  });

  return token;
}

export async function getCurrentUser(c: Context) {
  const token = getCookie(c, SESSION_COOKIE);
  if (!token) return null;

  try {
    const secret = getSecret(c);
    const { payload } = await jwtVerify(token, secret, { clockTolerance: 60 });
    const userId = payload.userId as number;
    if (!userId) return null;

    const db = getDb(c.env.DB);
    const [session] = await db.select().from(sessions).where(eq(sessions.token, token));
    if (!session) return null;

    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user || null;
  } catch {
    return null;
  }
}

export async function logout(c: Context) {
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
    user: typeof users.$inferSelect;
    lang: 'en' | 'fr' | 'zh';
  }
}
