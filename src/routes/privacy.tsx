import { Hono } from 'hono';
import { jsx } from 'hono/jsx';
import { Layout } from '../components/Layout';

const privacy = new Hono<{ Bindings: CloudflareBindings }>();

privacy.get('/privacy', (c) => {
  return c.html(
    <Layout title="Privacy Policy — The DALF Dojo">
      <main style="max-width: 720px; margin: 0 auto; padding: 3rem 1.5rem; font-family: 'Inter', sans-serif; line-height: 1.7; color: var(--base-text);">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Privacy Policy</h1>
        <p style="color: var(--base-text-muted);">Last updated: {new Date().getFullYear()}</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">What we collect</h2>
        <p>The only personal information we collect is your email address (and an optional name if you choose to provide one when signing up).</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">What we do not collect</h2>
        <p>We do not collect payment details, use third-party analytics, or run advertising trackers.</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">Cookies</h2>
        <p>We use a session cookie to keep you logged in. No optional or marketing cookies are used.</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">How your data is stored</h2>
        <p>Your account data and exam attempts are stored in Cloudflare D1 (SQLite) and optional speaking recordings are stored in Cloudflare R2.</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">Your exam content</h2>
        <p>Answers and recordings you submit are kept only so we can mark them and show them back to you as part of your practice history.</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">Account deletion</h2>
        <p>You can request deletion of your account and data by emailing <a href="mailto:support@thedalfdojo.com">support@thedalfdojo.com</a>.</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">Contact</h2>
        <p>Questions? Email <a href="mailto:support@thedalfdojo.com">support@thedalfdojo.com</a>.</p>

        <p style="margin-top: 2rem;"><a href="/" style="color: var(--accent);">← Back to home</a></p>
      </main>
    </Layout>
  );
});

export default privacy;
