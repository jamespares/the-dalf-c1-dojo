import { jsx } from 'hono/jsx';

interface NavbarProps {
  user?: { email: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header class="site-header">
      <a href="/dashboard" class="brand">
        <img src="/static/logo.png" alt="The DALF Dojo" />
        <span class="logo-name">The DALF Dojo</span>
      </a>
      <nav class="site-nav">
        {user ? (
          <>
            <span class="user-pill">{user.email}</span>
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
