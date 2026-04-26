import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { users } from '../db/schema';
import { hashPassword, verifyPassword, createSession, logout } from '../auth';
import { Layout } from '../components/Layout';

const auth = new Hono();

const AuthLayout = ({ children, title }: { children: any; title: string }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} - DALF C1 Practice</title>
      <link rel="icon" type="image/png" href="/logo.png" />
      <link rel="stylesheet" href="/static/style.css" />
      <link rel="stylesheet" href="/static/landing.css" />
      <style>
        {`
          .auth-wrapper {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            background: #f9fafb;
            padding: 2rem;
            overflow: hidden;
          }
          .auth-card {
            background: white;
            border-radius: 20px;
            padding: 3rem;
            width: 100%;
            max-width: 440px;
            box-shadow: 0 10px 40px rgba(0, 35, 149, 0.08), 0 1px 3px rgba(0,0,0,0.05);
            position: relative;
            z-index: 10;
          }
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--fr-blue);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            margin-bottom: 2rem;
          }
          .back-link:hover { opacity: 0.8; }
          .auth-title {
            font-family: 'Patrick Hand', cursive;
            font-size: 2.8rem;
            color: var(--text);
            margin-bottom: 0.5rem;
            line-height: 1.1;
          }
          .auth-subtitle {
            color: var(--text-muted);
            margin-bottom: 2rem;
            font-size: 1.1rem;
          }
          .auth-input {
            width: 100%;
            padding: 0.85rem 1.25rem;
            border: 1.5px solid var(--border);
            border-radius: var(--radius-pill);
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.2s;
            margin-bottom: 1.25rem;
            background: white;
          }
          .auth-input:focus {
            outline: none;
            border-color: var(--fr-blue);
            box-shadow: 0 0 0 4px rgba(0, 35, 149, 0.1);
          }
          .auth-label-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.5rem;
            padding: 0 0.5rem;
          }
          .auth-label {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--text);
          }
          .auth-forgot {
            font-size: 0.85rem;
            color: var(--fr-blue);
            text-decoration: none;
          }
          .auth-btn {
            width: 100%;
            background: var(--fr-blue);
            color: white;
            border: none;
            border-radius: var(--radius-pill);
            padding: 0.9rem;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 0.5rem;
          }
          .auth-btn:hover {
            background: #001a75;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 35, 149, 0.25);
          }
          .auth-footer-text {
            text-align: center;
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 2.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border);
            line-height: 1.6;
          }
          .auth-footer-text a {
            color: var(--fr-blue);
            text-decoration: none;
            font-weight: 600;
          }
          .built-by {
            margin-top: 2.5rem;
            text-align: center;
            position: relative;
            z-index: 10;
          }
          .built-by h3 {
            font-family: 'Quicksand', sans-serif;
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1.25rem;
          }
          .social-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 1rem;
          }
          .social-links a {
            color: var(--text-muted);
            transition: color 0.2s;
          }
          .social-links a:hover {
            color: var(--fr-blue);
          }
          .social-links svg {
            width: 28px;
            height: 28px;
            fill: currentColor;
          }
          .portfolio-link {
            font-size: 0.95rem;
            color: var(--text-muted);
            text-decoration: none;
            font-weight: 500;
          }
          .portfolio-link:hover {
            color: var(--fr-blue);
          }
          .auth-alert {
            padding: 0.85rem 1.25rem;
            border-radius: var(--radius-pill);
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
            text-align: center;
          }
          .auth-alert-danger { background: #ffe0e3; color: #ED2939; border: 1px solid #ED2939; }
        `}
      </style>
    </head>
    <body>
      <div class="auth-wrapper">
        <div class="hero-waves">
          <div class="wave wave-1" style="background: var(--fr-blue-tint);"></div>
          <div class="wave wave-2" style="background: var(--fr-red-tint);"></div>
        </div>
        {children}
      </div>
    </body>
  </html>
);

const BuiltByFooter = () => (
  <div class="built-by">
    <h3>Built by James Pares</h3>
    <div class="social-links">
      <a href="https://linkedin.com/in/jamespares" target="_blank" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a href="https://x.com/jamespares" target="_blank" aria-label="X (Twitter)">
        <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href="https://github.com/jamespares" target="_blank" aria-label="GitHub">
        <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
    </div>
    <a href="https://jamespares.me" target="_blank" class="portfolio-link">jamespares.me</a>
  </div>
);

auth.get('/login', (c) => {
  return c.html(
    <AuthLayout title="Login">
      <div class="auth-card">
        <a href="/" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to home
        </a>
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-subtitle">Sign in to your account</p>
        <form method="POST" action="/login">
          <div class="auth-label-row">
            <label class="auth-label">Email</label>
          </div>
          <input type="email" name="email" class="auth-input" placeholder="you@example.com" required />
          
          <div class="auth-label-row">
            <label class="auth-label">Password</label>
            <a href="#" class="auth-forgot">Forgot password?</a>
          </div>
          <input type="password" name="password" class="auth-input" placeholder="••••••••" required />
          
          <button type="submit" class="auth-btn">Sign In</button>
        </form>
        
        <div class="auth-footer-text">
          By signing in or creating an account, you agree to the <a href="/terms">Terms of Service</a>.<br/><br/>
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </div>
      <BuiltByFooter />
    </AuthLayout>
  );
});

auth.post('/login', async (c) => {
  const body = await c.req.parseBody<{ email: string; password: string }>();
  const db = getDb(c.env.DB);
  const [user] = await db.select().from(users).where(eq(users.email, body.email));
  if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
    return c.html(
      <AuthLayout title="Login">
        <div class="auth-card">
          <a href="/" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to home
          </a>
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to your account</p>
          <div class="auth-alert auth-alert-danger">Invalid email or password.</div>
          <form method="POST" action="/login">
            <div class="auth-label-row"><label class="auth-label">Email</label></div>
            <input type="email" name="email" class="auth-input" value={body.email} required />
            <div class="auth-label-row">
              <label class="auth-label">Password</label>
              <a href="#" class="auth-forgot">Forgot password?</a>
            </div>
            <input type="password" name="password" class="auth-input" required />
            <button type="submit" class="auth-btn">Sign In</button>
          </form>
          <div class="auth-footer-text">
            By signing in or creating an account, you agree to the <a href="/terms">Terms of Service</a>.<br/><br/>
            Don't have an account? <a href="/register">Sign up</a>
          </div>
        </div>
        <BuiltByFooter />
      </AuthLayout>,
      401
    );
  }
  await createSession(c, user.id);
  return c.redirect('/dashboard');
});

auth.get('/register', (c) => {
  const theme = c.req.query('theme') || '';
  const themeLabel = theme ? `Your selected topic: "${theme}"` : '';
  return c.html(
    <AuthLayout title="Register">
      <div class="auth-card">
        <a href="/" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to home
        </a>
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Start practicing for your DALF C1</p>
        
        {theme && (
          <p style="margin-bottom:1.5rem;padding:0.85rem;background:var(--fr-blue-tint);border-radius:12px;font-size:0.95rem;color:var(--fr-blue);font-weight:500;">
            🎯 {themeLabel}
          </p>
        )}
        
        <form method="POST" action={`/register${theme ? `?theme=${encodeURIComponent(theme)}` : ''}`}>
          {theme && <input type="hidden" name="theme" value={theme} />}
          <div class="auth-label-row"><label class="auth-label">Email</label></div>
          <input type="email" name="email" class="auth-input" placeholder="you@example.com" required />
          
          <div class="auth-label-row"><label class="auth-label">Password</label></div>
          <input type="password" name="password" class="auth-input" placeholder="••••••••" required minlength="6" />
          
          <button type="submit" class="auth-btn">Sign Up</button>
        </form>
        
        <div class="auth-footer-text">
          By signing up, you agree to the <a href="/terms">Terms of Service</a>.<br/><br/>
          Already have an account? <a href={`/login${theme ? `?theme=${encodeURIComponent(theme)}` : ''}`}>Log in</a>
        </div>
      </div>
      <BuiltByFooter />
    </AuthLayout>
  );
});

auth.post('/register', async (c) => {
  const body = await c.req.parseBody<{ email: string; password: string }>();
  const db = getDb(c.env.DB);

  const [existing] = await db.select().from(users).where(eq(users.email, body.email));
  if (existing) {
    return c.html(
      <AuthLayout title="Register">
        <div class="auth-card">
          <a href="/" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to home
          </a>
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Start practicing for your DALF C1</p>
          <div class="auth-alert auth-alert-danger">Email already registered.</div>
          <div style="text-align:center; margin-top: 1rem;">
            <a href={`/login?email=${encodeURIComponent(body.email)}`} class="auth-btn" style="display:inline-block; text-decoration:none;">Log in instead</a>
          </div>
        </div>
        <BuiltByFooter />
      </AuthLayout>,
      400
    );
  }

  const passwordHash = await hashPassword(body.password);
  const [user] = await db
    .insert(users)
    .values({ email: body.email, passwordHash })
    .returning();

  await createSession(c, user.id);
  const theme = c.req.query('theme') || '';
  return c.redirect(theme ? `/exams?theme=${encodeURIComponent(theme)}` : '/dashboard');
});

auth.get('/logout', async (c) => {
  await logout(c);
  return c.redirect('/login');
});

export default auth;
