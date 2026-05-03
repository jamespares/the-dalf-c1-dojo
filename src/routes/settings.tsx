import { Hono } from 'hono';
import { getDb } from '../db';
import { authMiddleware } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';
import { getSubscriptionStatus } from '../subscription';

const settings = new Hono<{ Bindings: CloudflareBindings }>();

settings.get('/settings', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);

  const status = await getSubscriptionStatus(db, user.id);

  return c.html(
    <DashboardLayout title="Settings" active="settings" user={user}>
      <div class="grid-2">
        <div class="card">
          <h2 style="margin-top:0;">Account</h2>
          <div class="form-group">
            <label>Email</label>
            <input type="text" value={user.email} disabled style="background:var(--base-bg);cursor:not-allowed;" />
          </div>
          <p style="color:var(--muted);font-size:0.85rem;margin-bottom:0;">
            Your account details are managed through authentication.
          </p>
        </div>

        <div class="card">
          <h2 style="margin-top:0;">Subscription</h2>
          {status.active ? (
            <>
              <p>
                <strong>Plan:</strong>{' '}
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
              <p style="margin-bottom:0;">
                <a href="/billing" class="btn btn-outline">Manage Billing</a>
              </p>
            </>
          ) : (
            <>
              <p>No active subscription.</p>
              <p style="margin-bottom:0;">
                <a href="/billing" class="btn btn-primary">Subscribe Now</a>
              </p>
            </>
          )}
        </div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Danger Zone</h2>
        <p style="color:var(--muted);margin-bottom:var(--space-4);">
          Signing out will end your current session.
        </p>
        <button id="sign-out-settings" class="btn btn-danger">Sign Out</button>
        <script type="module" dangerouslySetInnerHTML={{
          __html: `
          import { createAuthClient } from "https://esm.sh/better-auth@latest/client";
          const client = createAuthClient({ baseURL: window.location.origin });
          document.getElementById('sign-out-settings').addEventListener('click', async () => {
            await client.signOut();
            window.location.href = '/';
          });
        `}} />
      </div>
    </DashboardLayout>
  );
});

export default settings;
