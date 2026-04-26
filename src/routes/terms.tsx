import { Hono } from 'hono';
import { Layout } from '../components/Layout';

const terms = new Hono();

terms.get('/terms', (c) => {
  return c.html(
    <Layout title="Terms of Service">
      <div class="card" style="max-width:800px; margin:2rem auto; padding: 2.5rem; text-align: left;">
        <h1 style="font-family: 'Patrick Hand', cursive; color: var(--primary); margin-bottom: 0.5rem;">Terms of Service</h1>
        <p style="color: var(--muted); font-size: 0.9rem; margin-bottom: 2rem;">Last Updated: April 2026</p>

        <h3 style="font-family: 'Patrick Hand', cursive; margin-top: 1.5rem;">1. Acceptance of Terms</h3>
        <p>By accessing and using The DALF Dojo ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. The Service is operated by James Pares, based in the United Kingdom.</p>

        <h3 style="font-family: 'Patrick Hand', cursive; margin-top: 1.5rem;">2. Educational Purpose and AI Disclaimer</h3>
        <p>The Service provides AI-generated exam materials and AI-driven automated marking designed to assist with preparation for the DALF C1 examination. <strong>The Service is an independent educational tool and is not affiliated with, endorsed by, or connected to France Éducation International or the French Ministry of Education.</strong></p>
        <p>While our AI models strive to simulate the official marking grids, the grades and feedback provided are indicative only. We make no guarantees or warranties regarding your actual performance or outcome in the official DALF C1 examination.</p>

        <h3 style="font-family: 'Patrick Hand', cursive; margin-top: 1.5rem;">3. User Accounts</h3>
        <p>You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>

        <h3 style="font-family: 'Patrick Hand', cursive; margin-top: 1.5rem;">4. Intellectual Property</h3>
        <p>All content, features, and functionality of the Service (including but not limited to AI-generated prompts, audio, code, and design) are owned by James Pares and are protected by international copyright, trademark, and other intellectual property laws. You may use the Service for personal, non-commercial educational purposes only.</p>

        <h3 style="font-family: 'Patrick Hand', cursive; margin-top: 1.5rem;">5. Limitation of Liability</h3>
        <p>To the maximum extent permitted by UK law, James Pares shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Service; or (b) any reliance placed on the AI-generated marking and feedback.</p>

        <h3 style="font-family: 'Patrick Hand', cursive; margin-top: 1.5rem;">6. Modifications</h3>
        <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.</p>

        <h3 style="font-family: 'Patrick Hand', cursive; margin-top: 1.5rem;">7. Governing Law</h3>
        <p>These Terms shall be governed and construed in accordance with the laws of England and Wales. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>

        <div style="margin-top: 3rem;">
          <a href="/" class="btn btn-primary" style="text-decoration: none;">&larr; Back to Home</a>
        </div>
      </div>
    </Layout>
  );
});

export default terms;
