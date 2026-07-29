import { Hono } from 'hono';
import landing from './routes/landing';
import auth from './routes/auth';
import dashboard from './routes/dashboard';
import exams from './routes/exams';
import admin from './routes/admin';
import listening from './routes/listening';
import reading from './routes/reading';
import writing from './routes/writing';
import speaking from './routes/speaking';
import marking from './routes/marking';
import review from './routes/review';
import insights from './routes/insights';
import settings from './routes/settings';
import terms from './routes/terms';
import { createAuth, adminMiddleware } from './auth';
import { getDb } from './db';
import { sendEmailViaCloudflare } from './email';

const app = new Hono<{ Bindings: CloudflareBindings }>();

// Better Auth API routes — handle all sub-paths
app.all('/api/auth/*', async (c) => {
  try {
    const auth = createAuth(c.env);
    return auth.handler(c.req.raw);
  } catch (err: any) {
    console.error('[auth handler] error:', err?.message || err, 'path:', c.req.path);
    return c.json({ error: 'Auth service error' }, 500);
  }
});

// Admin-only test endpoint for email delivery
app.post('/api/debug/send-test-email', adminMiddleware(), async (c) => {
  const body = await c.req.parseBody();
  const email = body.email as string;

  // Try Cloudflare Email Service first
  const cfSuccess = await sendEmailViaCloudflare(c.env, {
    to: email,
    subject: 'Test email from DALF Dojo (Cloudflare Email Service)',
    text: 'This is a test email to verify the Cloudflare Email Service integration is working.',
    html: '<p>This is a test email to verify the <strong>Cloudflare Email Service</strong> integration is working.</p>',
  });

  if (cfSuccess) {
    return c.json({
      success: true,
      message: `Test email queued via Cloudflare Email Service for delivery to ${email}`,
      provider: 'cloudflare_email_service',
    });
  }

  // Fallback to legacy SEND_EMAIL binding
  if (!c.env.SEND_EMAIL) {
    return c.json({ error: 'Cloudflare Email Service failed and SEND_EMAIL binding is not available' }, 500);
  }

  try {
    const result = await c.env.SEND_EMAIL.send({
      from: { name: 'The DALF Dojo', email: 'noreply@thedalfdojo.com' },
      to: email,
      subject: 'Test email from DALF Dojo',
      text: 'This is a test email to verify the SEND_EMAIL binding is working.',
      html: '<p>This is a test email to verify the <code>SEND_EMAIL</code> binding is working.</p>',
    });
    return c.json({
      success: true,
      message: `Test email accepted by Cloudflare for delivery to ${email}`,
      messageId: result.messageId,
      provider: 'send_email_binding',
    });
  } catch (e: any) {
    console.error('[debug/send-test-email] failed:', e?.message || e);
    return c.json({ error: e?.message || 'Failed to send test email' }, 500);
  }
});

// Redirect old /profile to /settings
app.get('/profile', (c) => c.redirect('/settings', 301));

// Landing page (must be before auth to handle '/' first)
app.route('/', landing);

// Routes
app.route('/', auth);
app.route('/', dashboard);
app.route('/', exams);
app.route('/', admin);
app.route('/', listening);
app.route('/', reading);
app.route('/', writing);
app.route('/', speaking);
app.route('/', marking);
app.route('/', review);
app.route('/', insights);
app.route('/', settings);
app.route('/', terms);

export default app;
