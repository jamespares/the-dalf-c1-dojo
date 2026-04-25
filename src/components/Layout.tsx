import { jsx } from 'hono/jsx';

export function Layout(props: { children: any; title?: string; user?: { email: string } | null }) {
  const { children, title = 'DALF C1 Practice', user } = props;
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <nav>
          <div class="container">
            <div>
              <a href="/dashboard">DALF C1</a>
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
