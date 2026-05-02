import { Context } from 'hono';
import { deleteCookie } from 'hono/cookie';
import { eq } from 'drizzle-orm';
import { getDb } from './db';
import { users, baUser, baSession, baAccount, baVerification } from './db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

const BETTER_AUTH_COOKIE = 'better-auth.session_token';

// Unified user type used across the app
export type AppUser = {
  id: number;
  email: string;
  passwordHash: string;
  createdAt: Date | null;
};

export function createAuth(env: { DB: D1Database; BETTER_AUTH_SECRET: string; BETTER_AUTH_URL: string; SEND_EMAIL?: SendEmail }) {
  return betterAuth({
    database: drizzleAdapter(getDb(env.DB), {
      provider: 'sqlite',
      schema: {
        user: baUser,
        session: baSession,
        account: baAccount,
        verification: baVerification,
      },
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      minPasswordLength: 6,
      sendResetPassword: async ({ user, url }) => {
        if (!env.SEND_EMAIL) {
          console.warn('SEND_EMAIL binding is missing. Cannot send reset password email.');
          return;
        }

        let EmailMessage: any;
        try {
          const mod = await import('cloudflare:email');
          EmailMessage = mod.EmailMessage;
        } catch {
          console.warn('cloudflare:email module not available. Cannot send reset password email.');
          return;
        }

        const boundary = 'boundary-' + crypto.randomUUID();
        const mimeMessage = [
          `To: ${user.email}`,
          `From: noreply@thedalfdojo.com`,
          `Subject: Reset your password`,
          `MIME-Version: 1.0`,
          `Content-Type: multipart/alternative; boundary="${boundary}"`,
          ``,
          `--${boundary}`,
          `Content-Type: text/plain; charset="utf-8"`,
          ``,
          `Click the following link to reset your password: ${url}`,
          ``,
          `--${boundary}`,
          `Content-Type: text/html; charset="utf-8"`,
          ``,
          `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
          ``,
          `--${boundary}--`,
        ].join('\r\n');

        const msg = new EmailMessage(
          'noreply@thedalfdojo.com',
          user.email,
          mimeMessage
        );

        try {
          await env.SEND_EMAIL.send(msg);
        } catch (e: any) {
          console.error('Failed to send reset password email:', e?.message);
        }
      },
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    advanced: {
      ipAddress: {
        ipAddressHeaders: ['cf-connecting-ip', 'x-forwarded-for', 'x-real-ip'],
      },
    },
  });
}

export async function getCurrentUser(c: Context): Promise<AppUser | null> {
  const db = getDb(c.env.DB);

  try {
    const auth = createAuth(c.env);
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session?.user?.email) return null;

    // Find bridge user by email
    const [legacyUser] = await db.select().from(users).where(eq(users.email, session.user.email));
    if (legacyUser) return legacyUser;

    // Auto-create bridge user for new Better Auth accounts
    const [newUser] = await db.insert(users).values({
      email: session.user.email,
      passwordHash: '',
    }).returning();
    return newUser;
  } catch (err: any) {
    console.error('[getCurrentUser] error:', err?.message || err);
    return null;
  }
}

export async function logout(c: Context) {
  try {
    const auth = createAuth(c.env);
    await auth.api.signOut({ headers: c.req.raw.headers });
  } catch (err: any) {
    console.error('[logout] signOut error:', err?.message || err);
  }
  deleteCookie(c, BETTER_AUTH_COOKIE);
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
