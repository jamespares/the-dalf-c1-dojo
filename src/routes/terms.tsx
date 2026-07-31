import { Hono } from 'hono';
import { jsx } from 'hono/jsx';
import { Layout } from '../components/Layout';

const terms = new Hono<{ Bindings: CloudflareBindings }>();

terms.get('/terms', (c) => {
  return c.html(
    <Layout title="Terms of Service — The DALF Dojo">
      <main style="max-width: 720px; margin: 0 auto; padding: 3rem 1.5rem; font-family: 'Inter', sans-serif; line-height: 1.7; color: var(--base-text);">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Terms of Service</h1>
        <p style="color: var(--base-text-muted);">Last updated: {new Date().getFullYear()}</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">Free service</h2>
        <p>The DALF Dojo is completely free to use. We do not charge fees, process payments, or offer subscriptions.</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">Your account</h2>
        <p>Creating an account requires an email address. You are responsible for keeping your password secure.</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">Your content</h2>
        <p>Exam answers and optional speaking recordings you submit are stored only so the app can mark them, show you feedback, and track your progress over time.</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">No guarantee</h2>
        <p>This tool is for self-study practice only. AI marking and pass-readiness scores are helpful estimates, not a guarantee that you will pass the real DALF C1 exam.</p>

        <h2 style="font-size: 1.25rem; margin-top: 2rem;">Contact</h2>
        <p>Questions? Email <a href="mailto:support@thedalfdojo.com">support@thedalfdojo.com</a>.</p>

        <p style="margin-top: 2rem;"><a href="/" style="color: var(--accent);">← Back to home</a></p>
      </main>
    </Layout>
  );
});

export default terms;
