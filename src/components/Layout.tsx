import { jsx } from 'hono/jsx';

export function Layout(props: { children: any; title?: string; user?: { email: string } | null }) {
  const { children, title = 'DALF C1 Practice', user } = props;
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <nav>
          <div class="container">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <a href="/dashboard" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;">
                <img src="/static/logo.png" alt="Logo" style="height:28px;width:auto;" />
                <span style="font-weight:600;color:var(--text);">DALF C1</span>
              </a>
              {user && (
                <>
                  <a href="/exams">Exams</a>
                  <a href="/profile">Profile</a>
                </>
              )}
            </div>
            <div>
              {user ? (
                <>
                  <span style="color:var(--muted);margin-right:1rem;">{user.email}</span>
                  <a href="/logout">Logout</a>
                </>
              ) : (
                <>
                  <a href="/login">Login</a>
                  <a href="/register">Register</a>
                </>
              )}
            </div>
          </div>
        </nav>
        <main class="container">{children}</main>
      </body>
    </html>
  );
}
