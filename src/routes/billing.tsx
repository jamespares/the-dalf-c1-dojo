import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { subscriptions } from '../db/schema';
import { authMiddleware, getCurrentUser } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';
import { CreditCard, Check, ArrowRight, RefreshCw } from '../components/Icons';
import { getPublishableKey, createCheckoutSession, retrieveCheckoutSession, getStripe } from '../stripe';
import { getSubscriptionStatus, syncSubscriptionFromStripe } from '../subscription';
import type Stripe from 'stripe';

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
          <h2 style="margin-top:0; display: flex; align-items: center; gap: 0.5rem;">
            <CreditCard size={20} style={{ color: 'var(--accent)' }} />
            DALF Dojo Monthly
          </h2>
          <p style="font-size:1.25rem; margin:0.5rem 0;">
            <strong>£30 / month</strong>
          </p>
          <ul style="margin:1rem 0; padding-left:0; list-style: none; color: var(--base-text-secondary);">
            <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;"><Check size={18} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} /> Unlimited access to all generated past papers</li>
            <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;"><Check size={18} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} /> 30 exam section attempts per month</li>
            <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;"><Check size={18} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} /> AI marking against official rubric</li>
            <li style="display: flex; align-items: flex-start; gap: 0.5rem;"><Check size={18} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} /> Error pattern tracking</li>
          </ul>
          <form action="/billing/checkout" method="post">
            <button type="submit" class="btn btn-primary" style="width:100%;">
              <CreditCard size={18} /> Subscribe Now
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
            {status.cancelAtPeriodEnd ? (
              <span class="score-badge score-fail">Active (cancels on {periodEnd})</span>
            ) : (
              <span class="score-badge score-pass">Active</span>
            )}
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
  let syncError: string | null = null;

  if (sessionId) {
    try {
      const session = await retrieveCheckoutSession(c, sessionId);
      const stripe = getStripe(c);
      let subscription: Stripe.Subscription | null = null;

      if (typeof session.subscription === 'string') {
        subscription = await stripe.subscriptions.retrieve(session.subscription);
      } else if (session.subscription && typeof session.subscription === 'object') {
        subscription = session.subscription as Stripe.Subscription;
      }

      if (subscription) {
        const db = getDb(c.env.DB);
        await syncSubscriptionFromStripe(db, subscription);
      }
    } catch (err: any) {
      console.error('Failed to sync subscription from success page:', err);
      syncError = err?.message || 'Unknown error';
    }
  }

  return c.html(
    <DashboardLayout title="Welcome" active="settings" user={user}>
      <div class="card" style="max-width:520px;">
        {syncError ? (
          <>
            <div class="alert alert-warning">
              <strong>Payment received!</strong> We're finalising your subscription sync.
              Please wait a moment and then refresh this page.
            </div>
            <p style="color:var(--muted);font-size:0.85rem;">
              If this persists, contact support with session ID: <code>{sessionId}</code>
            </p>
            <p style="margin-bottom:0;">
              <a href="/billing" class="btn btn-primary"><RefreshCw size={18} /> Refresh Status</a>
            </p>
          </>
        ) : (
          <>
            <div class="alert alert-success">Your subscription is now active!</div>
            <p>You can now start practicing DALF C1 past papers.</p>
            <p style="margin-bottom:0;">
              <a href="/exams" class="btn btn-primary"><ArrowRight size={18} /> Go to Exams</a>
            </p>
          </>
        )}
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
