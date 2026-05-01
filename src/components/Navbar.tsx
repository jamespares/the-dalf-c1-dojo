import { jsx } from 'hono/jsx';

interface NavbarProps {
  user?: { email: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header class="site-header">
      <a href="/dashboard" class="brand">
        <img src="/static/logo.png" alt="The DALF Dojo" />
      </a>
      <nav class="site-nav">
        {user ? (
          <>
            <a href="/exams" class="text-sm font-semibold transition-colors" style="color:var(--base-text);" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--base-text)'">
              Exams
            </a>
            <a href="/profile" class="text-sm font-semibold transition-colors" style="color:var(--base-text);" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--base-text)'">
              Profile
            </a>
            <a href="/billing" class="text-sm font-semibold transition-colors" style="color:var(--base-text);" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--base-text)'">
              Billing
            </a>
            <button id="sign-out" class="btn btn-secondary btn-sm">Sign out</button>
            <script type="module" dangerouslySetInnerHTML={{
              __html: `
              import { createAuthClient } from "https://esm.sh/better-auth@latest/client";
              const client = createAuthClient({ baseURL: window.location.origin });
              document.getElementById('sign-out').addEventListener('click', async () => {
                await client.signOut();
                window.location.href = '/';
              });
            `}} />
          </>
        ) : (
          <a href="/login" class="btn btn-primary">Sign in</a>
        )}
      </nav>
    </header>
  );
}
