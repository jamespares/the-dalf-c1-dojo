import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { subscriptions } from '../db/schema';
import { authMiddleware, getCurrentUser } from '../auth';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import { getPublishableKey, createCheckoutSession, retrieveCheckoutSession } from '../stripe';
import { getSubscriptionStatus, syncSubscriptionFromStripe } from '../subscription';

const billing = new Hono<{ Bindings: CloudflareBindings }>();

billing.get('/billing', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);
  const status = await getSubscriptionStatus(db, user.id);

  if (!status.active) {
    const pk = getPublishableKey(c);
    return c.html(
      <Layout title="Billing">
        <Navbar user={user} />
        <h1>Subscription</h1>
        <div class="card" style="max-width:500px;">
          <h2>DALF Dojo Monthly</h2>
          <p style="font-size:1.25rem; margin:0.5rem 0;">
            <strong>£30 / month</strong>
          </p>
          <ul style="margin:1rem 0; padding-left:1.25rem;">
            <li>Unlimited access to all generated past papers</li>
            <li>30 exam section attempts per month</li>
            <li>AI marking against official rubric</li>
            <li>Error pattern tracking</li>
          </ul>
          <form action="/billing/checkout" method="post">
            <button type="submit" class="btn btn-primary" style="width:100%;">
              Subscribe Now
            </button>
          </form>
          <p style="color:var(--muted); font-size:0.85rem; margin-top:0.75rem;">
            Secure payment via Stripe. Cancel anytime.
          </p>
        </div>
      </Layout>
    );
  }

  const periodEnd = status.periodEnd
    ? new Date(status.periodEnd).toLocaleDateString()
    : '-';

  return c.html(
    <Layout title="Billing">
      <Navbar user={user} />
      <h1>Subscription</h1>
      <div class="card" style="max-width:500px;">
        <h2>DALF Dojo Monthly</h2>
        <p style="font-size:1.25rem; margin:0.5rem 0;">
          <strong>£30 / month</strong>
        </p>
        <div style="margin:1rem 0;">
          <p>
            <strong>Status:</strong>{' '}
            <span class="score-badge score-pass">Active</span>
          </p>
          <p>
            <strong>Usage:</strong>{' '}
            {status.used} / {status.limit} attempts used
          </p>
          <p>
            <strong>Remaining:</strong>{' '}
            {status.remaining} this period
          </p>
          <p>
            <strong>Renews:</strong> {periodEnd}
          </p>
        </div>
        <div class="progress-bar" style="background:#e5e7eb;border-radius:999px;height:8px;overflow:hidden;margin-bottom:1rem;">
          <div
            style={`background:var(--primary);height:100%;width:${(status.used / status.limit) * 100}%;transition:width 0.3s;`}
          />
        </div>
        {status.remaining === 0 && (
          <div class="alert alert-warning">
            You have reached your monthly limit. Your quota will reset on {periodEnd}.
          </div>
        )}
        <p style="color:var(--muted); font-size:0.85rem;">
          Manage or cancel your subscription in your {' '}
          <a href="https://billing.stripe.com/p/login" target="_blank" rel="noopener noreferrer">
            Stripe Customer Portal
          </a>.
        </p>
      </div>
    </Layout>
  );
});

billing.post('/billing/checkout', authMiddleware(), async (c) => {
  const user = c.get('user');
  const origin = new URL(c.req.url).origin;

  const session = await createCheckoutSession(c, {
    customerEmail: user.email,
    userId: user.id,
    successUrl: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${origin}/billing/cancel`,
  });

  return c.redirect(session.url!, 303);
});

billing.get('/billing/success', authMiddleware(), async (c) => {
  const user = c.get('user');
  const sessionId = c.req.query('session_id');

  if (sessionId) {
    try {
      const session = await retrieveCheckoutSession(c, sessionId);
      const stripeSub = session.subscription as any;
      if (stripeSub && stripeSub.id) {
        const db = getDb(c.env.DB);
        await syncSubscriptionFromStripe(db, stripeSub);
      }
    } catch (err) {
      console.error('Failed to sync subscription from success page:', err);
    }
  }

  return c.html(
    <Layout title="Welcome">
      <Navbar user={user} />
      <h1>Subscription Active</h1>
      <div class="card" style="max-width:500px;">
        <div class="alert alert-success">Your subscription is now active!</div>
        <p>You can now start practicing DALF C1 past papers.</p>
        <p>
          <a href="/exams" class="btn btn-primary">Go to Exams</a>
        </p>
      </div>
    </Layout>
  );
});

billing.get('/billing/cancel', authMiddleware(), async (c) => {
  const user = c.get('user');
  return c.html(
    <Layout title="Checkout Cancelled">
      <Navbar user={user} />
      <h1>Checkout Cancelled</h1>
      <div class="card" style="max-width:500px;">
        <p>You can subscribe anytime to unlock full access.</p>
        <p>
          <a href="/billing" class="btn btn-primary">Back to Billing</a>
        </p>
      </div>
    </Layout>
  );
});

export default billing;
