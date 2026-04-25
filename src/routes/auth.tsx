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
  return c.html(
    <Layout title="Register">
      <div class="card" style="max-width:400px;margin:2rem auto;">
        <h1>Register</h1>
        <form method="POST" action="/register">
          <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required minlength="6" />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <p style="margin-top:1rem;">
          Already have an account? <a href="/login">Login</a>
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
  return c.redirect('/dashboard');
});

auth.get('/logout', async (c) => {
  await logout(c);
  return c.redirect('/login');
});

export default auth;
