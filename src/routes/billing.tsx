import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { subscriptions } from '../db/schema';
import { authMiddleware, getCurrentUser } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';
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
      <DashboardLayout title="Billing" active="settings" user={user}>
        <div class="card" style="max-width:520px;">
          <h2 style="margin-top:0;">DALF Dojo Monthly</h2>
          <p style="font-size:1.25rem; margin:0.5rem 0;">
            <strong>£30 / month</strong>
          </p>
          <ul style="margin:1rem 0; padding-left:1.25rem; color: var(--base-text-secondary);">
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
          <p style="color:var(--muted); font-size:0.85rem; margin-top:0.75rem; margin-bottom:0;">
            Secure payment via Stripe. Cancel anytime.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const periodEnd = status.periodEnd
    ? new Date(status.periodEnd).toLocaleDateString()
    : '-';

  return c.html(
    <DashboardLayout title="Billing" active="settings" user={user}>
      <div class="card" style="max-width:520px;">
        <h2 style="margin-top:0;">DALF Dojo Monthly</h2>
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
        <div style="background:#e5e7eb;border-radius:999px;height:8px;overflow:hidden;margin-bottom:1rem;">
          <div
            style={`background:var(--accent);height:100%;width:${(status.used / status.limit) * 100}%;transition:width 0.3s;`}
          />
        </div>
        {status.remaining === 0 && (
          <div class="alert alert-warning">
            You have reached your monthly limit. Your quota will reset on {periodEnd}.
          </div>
        )}
        <p style="color:var(--muted); font-size:0.85rem; margin-bottom:0;">
          Manage or cancel your subscription in your{' '}
          <a href="https://billing.stripe.com/p/login" target="_blank" rel="noopener noreferrer">
            Stripe Customer Portal
          </a>.
        </p>
      </div>
    </DashboardLayout>
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
    <DashboardLayout title="Welcome" active="settings" user={user}>
      <div class="card" style="max-width:520px;">
        <div class="alert alert-success">Your subscription is now active!</div>
        <p>You can now start practicing DALF C1 past papers.</p>
        <p style="margin-bottom:0;">
          <a href="/exams" class="btn btn-primary">Go to Exams</a>
        </p>
      </div>
    </DashboardLayout>
  );
});

billing.get('/billing/cancel', authMiddleware(), async (c) => {
  const user = c.get('user');
  return c.html(
    <DashboardLayout title="Checkout Cancelled" active="settings" user={user}>
      <div class="card" style="max-width:520px;">
        <p>You can subscribe anytime to unlock full access.</p>
        <p style="margin-bottom:0;">
          <a href="/billing" class="btn btn-primary">Back to Billing</a>
        </p>
      </div>
    </DashboardLayout>
  );
});

export default billing;
