import { jsx } from 'hono/jsx';

interface DashboardLayoutProps {
  children: any;
  title?: string;
  active: 'home' | 'exams' | 'insights' | 'settings';
  user?: { email: string } | null;
}

const navItems = [
  { key: 'home', label: 'Home', href: '/dashboard', icon: '🏠' },
  { key: 'exams', label: 'Exams', href: '/exams', icon: '📝' },
  { key: 'insights', label: 'Insights', href: '/insights', icon: '📊' },
  { key: 'settings', label: 'Settings', href: '/settings', icon: '⚙️' },
];

export function DashboardLayout({ children, title = 'Dashboard', active, user }: DashboardLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} — The DALF Dojo</title>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <div class="dashboard-shell">
          {/* Sidebar */}
          <aside class="dashboard-sidebar" id="sidebar">
            <div class="sidebar-brand">
              <a href="/dashboard" class="sidebar-logo-link">
                <img src="/static/logo.png" alt="The DALF Dojo" class="sidebar-logo-img" />
                <span class="sidebar-logo-text">The DALF Dojo</span>
              </a>
            </div>
            <nav class="sidebar-nav">
              {navItems.map((item) => (
                <a
                  href={item.href}
                  class={`sidebar-link ${active === item.key ? 'active' : ''}`}
                >
                  <span class="sidebar-icon">{item.icon}</span>
                  <span class="sidebar-label">{item.label}</span>
                </a>
              ))}
            </nav>
            <div class="sidebar-footer">
              <button id="sign-out" class="btn btn-secondary btn-sm" style="width:100%;">Sign out</button>
              <script type="module" dangerouslySetInnerHTML={{
                __html: `
                import { createAuthClient } from "https://esm.sh/better-auth@latest/client";
                const client = createAuthClient({ baseURL: window.location.origin });
                document.getElementById('sign-out').addEventListener('click', async () => {
                  await client.signOut();
                  window.location.href = '/';
                });
              `}} />
            </div>
          </aside>

          {/* Mobile sidebar toggle */}
          <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Main content */}
          <main class="dashboard-main">
            <div class="dashboard-header">
              <div class="dashboard-header-left">
                <h1 class="dashboard-page-title">{title}</h1>
              </div>
              <div class="dashboard-header-right">
                {user && (
                  <span class="user-pill">{user.email}</span>
                )}
              </div>
            </div>
            <div class="container-dashboard">
              {children}
            </div>
          </main>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          const toggle = document.getElementById('sidebarToggle');
          const sidebar = document.getElementById('sidebar');
          toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
          });
          // Close sidebar when clicking a link on mobile
          document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', () => {
              if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
              }
            });
          });
        `}} />
      </body>
    </html>
  );
}
