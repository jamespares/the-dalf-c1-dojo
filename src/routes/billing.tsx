import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { subscriptions } from '../db/schema';
import { authMiddleware, getCurrentUser } from '../auth';
import { Layout } from '../components/Layout';
import { getPublishableKey, createCheckoutSession, retrieveCheckoutSession } from '../stripe';
import { getSubscriptionStatus, syncSubscriptionFromStripe } from '../subscription';
import { detectLang, getDict, type Lang, type Dict } from '../lib/i18n';

const billing = new Hono();

billing.get('/billing', authMiddleware(), async (c) => {
  const user = c.get('user');
  const lang = detectLang(c);
  const dict = getDict(lang);
  const db = getDb(c.env.DB);
  const status = await getSubscriptionStatus(db, user.id);

  if (!status.active) {
    const pk = getPublishableKey(c);
    return c.html(
      <Layout title={dict.billingTitle} user={user} lang={lang}>
        <h1>{dict.billingSubscription}</h1>
        <div class="card" style="max-width:500px;">
          <h2>{dict.billingPlanName}</h2>
          <p style="font-size:1.25rem; margin:0.5rem 0;">
            <strong>{dict.billingPrice}</strong>
          </p>
          <ul style="margin:1rem 0; padding-left:1.25rem;">
            <li>{dict.billingFeature1}</li>
            <li>{dict.billingFeature2}</li>
            <li>{dict.billingFeature3}</li>
            <li>{dict.billingFeature4}</li>
          </ul>
          <form action="/billing/checkout" method="POST">
            <button type="submit" class="btn btn-primary" style="width:100%;">
              {dict.billingSubscribe}
            </button>
          </form>
          <p style="color:var(--muted); font-size:0.85rem; margin-top:0.75rem;">
            {dict.billingSecure}
          </p>
        </div>
      </Layout>
    );
  }

  const periodEnd = status.periodEnd
    ? new Date(status.periodEnd).toLocaleDateString()
    : dict.dashDash;

  return c.html(
    <Layout title={dict.billingTitle} user={user} lang={lang}>
      <h1>{dict.billingSubscription}</h1>
      <div class="card" style="max-width:500px;">
        <h2>{dict.billingPlanName}</h2>
        <p style="font-size:1.25rem; margin:0.5rem 0;">
          <strong>{dict.billingPrice}</strong>
        </p>
        <div style="margin:1rem 0;">
          <p>
            <strong>{dict.billingStatus}</strong>{' '}
            <span class="score-badge score-pass">{dict.billingActive}</span>
          </p>
          <p>
            <strong>{dict.billingUsage}</strong>{' '}
            {status.used} / {status.limit} attempts used
          </p>
          <p>
            <strong>{dict.billingRemaining}</strong>{' '}
            {status.remaining} this period
          </p>
          <p>
            <strong>{dict.billingRenews}</strong> {periodEnd}
          </p>
        </div>
        <div class="progress-bar" style="background:#e5e7eb;border-radius:999px;height:8px;overflow:hidden;margin-bottom:1rem;">
          <div
            style={`background:var(--primary);height:100%;width:${(status.used / status.limit) * 100}%;transition:width 0.3s;`}
          />
        </div>
        {status.remaining === 0 && (
          <div class="alert alert-warning">
            {dict.billingLimitReached}{periodEnd}.
          </div>
        )}
        <p style="color:var(--muted); font-size:0.85rem;">
          {dict.billingManagePrefix}{' '}
          <a href="https://billing.stripe.com/p/login" target="_blank" rel="noopener noreferrer">
            {dict.billingStripePortal}
          </a>.
        </p>
      </div>
    </Layout>
  );
});

billing.post('/billing/checkout', authMiddleware(), async (c) => {
  const user = c.get('user');
  const lang = detectLang(c);
  const dict = getDict(lang);
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
  const lang = detectLang(c);
  const dict = getDict(lang);
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
    <Layout title={dict.billingWelcomeTitle} user={user} lang={lang}>
      <h1>{dict.billingSubActive}</h1>
      <div class="card" style="max-width:500px;">
        <div class="alert alert-success">{dict.billingSubActiveMsg}</div>
        <p>{dict.billingSubActiveDesc}</p>
        <p>
          <a href="/exams" class="btn btn-primary">{dict.billingGoToExams}</a>
        </p>
      </div>
    </Layout>
  );
});

billing.get('/billing/cancel', authMiddleware(), async (c) => {
  const user = c.get('user');
  const lang = detectLang(c);
  const dict = getDict(lang);
  return c.html(
    <Layout title={dict.billingCancelTitle} user={user} lang={lang}>
      <h1>{dict.billingCancelTitle}</h1>
      <div class="card" style="max-width:500px;">
        <p>{dict.billingCancelMsg}</p>
        <p>
          <a href="/billing" class="btn btn-primary">{dict.billingBackToBilling}</a>
        </p>
      </div>
    </Layout>
  );
});

export default billing;
