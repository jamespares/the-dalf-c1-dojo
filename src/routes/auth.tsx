import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { users } from '../db/schema';
import { hashPassword, verifyPassword, createSession, logout } from '../auth';
import { Layout } from '../components/Layout';

const auth = new Hono();

auth.get('/login', (c) => {
  return c.html(
    <Layout title="Login">
      <div class="card" style="max-width:400px;margin:2rem auto;">
        <h1>Login</h1>
        <form method="POST" action="/login">
          <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <p style="margin-top:1rem;">
          No account? <a href="/register">Register</a>
        </p>
      </div>
    </Layout>
  );
});

auth.post('/login', async (c) => {
  const body = await c.req.parseBody<{ email: string; password: string }>();
  const db = getDb(c.env.DB);
  const [user] = await db.select().from(users).where(eq(users.email, body.email));
  if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
    return c.html(
      <Layout title="Login">
        <div class="card" style="max-width:400px;margin:2rem auto;">
          <div class="alert alert-danger">Invalid email or password.</div>
          <a href="/login" class="btn btn-secondary">Try again</a>
        </div>
      </Layout>,
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
    <Layout title="Register">
      <div class="card" style="max-width:400px;margin:2rem auto;">
        <h1>Create your account</h1>
        {theme && (
          <p style="margin-bottom:1rem;padding:0.75rem 1rem;background:#dce6ff;border-radius:8px;font-size:0.9rem;color:#002395;">
            🎯 {themeLabel}
          </p>
        )}
        <form method="POST" action={`/register${theme ? `?theme=${encodeURIComponent(theme)}` : ''}`}>
          {theme && <input type="hidden" name="theme" value={theme} />}
          <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required minlength="6" />
          </div>
          <button type="submit" class="btn btn-primary">Register &amp; Start Practising</button>
        </form>
        <p style="margin-top:1rem;">
          Already have an account? <a href={`/login${theme ? `?theme=${encodeURIComponent(theme)}` : ''}`}>Login</a>
        </p>
      </div>
    </Layout>
  );
});

auth.post('/register', async (c) => {
  const body = await c.req.parseBody<{ email: string; password: string }>();
  const db = getDb(c.env.DB);

  const [existing] = await db.select().from(users).where(eq(users.email, body.email));
  if (existing) {
    return c.html(
      <Layout title="Register">
        <div class="card" style="max-width:400px;margin:2rem auto;">
          <div class="alert alert-danger">Email already registered.</div>
          <a href="/register" class="btn btn-secondary">Try again</a>
        </div>
      </Layout>,
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
