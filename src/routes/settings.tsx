import { Hono } from 'hono';
import { authMiddleware } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';
import { User, LogOut, CheckCircle } from '../components/Icons';

const settings = new Hono<{ Bindings: CloudflareBindings }>();

settings.get('/settings', authMiddleware(), async (c) => {
  const user = c.get('user');

  return c.html(
    <DashboardLayout title="Settings" active="settings" user={user}>
      <div class="grid-2">
        <div class="card">
          <h2 style="margin-top:0; display: flex; align-items: center; gap: 0.5rem;">
            <User size={20} style={{ color: 'var(--accent)' }} />
            Account
          </h2>
          <div class="form-group">
            <label>Email</label>
            <input type="text" value={user.email} disabled style="background:var(--base-bg);cursor:not-allowed;" />
          </div>
          <p style="color:var(--muted);font-size:0.85rem;margin-bottom:0;">
            Your account details are managed through authentication.
          </p>
        </div>

        <div class="card">
          <h2 style="margin-top:0; display: flex; align-items: center; gap: 0.5rem;">
            <CheckCircle size={20} style={{ color: 'var(--accent)' }} />
            Access
          </h2>
          <p>
            <strong>Plan:</strong>{' '}
            <span class="score-badge score-pass">Free</span>
          </p>
          <p style="color:var(--muted);margin-bottom:0;">
            Full access to all practice papers, AI marking, and pass readiness tracking — no subscription required.
          </p>
        </div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Danger Zone</h2>
        <p style="color:var(--muted);margin-bottom:var(--space-4);">
          Signing out will end your current session.
        </p>
        <button id="sign-out-settings" class="btn btn-danger"><LogOut size={18} /> Sign Out</button>
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
