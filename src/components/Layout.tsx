import { jsx } from 'hono/jsx';
import { getDict, type Lang } from '../lib/i18n';

export function Layout(props: { children: any; title?: string; user?: { email: string } | null; lang?: Lang }) {
  const { children, title = 'DALF C1 Practice', user, lang = 'en' } = props;
  const dict = getDict(lang);
  const langs = [
    { code: 'en', label: dict.langEn },
    { code: 'fr', label: dict.langFr },
    { code: 'zh', label: dict.langZh },
  ];
  return (
    <html lang={lang}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        {/* Language toggle — fixed top-right */}
        <div id="lang-toggle" style="position:fixed; top:1rem; right:1rem; z-index:1000; display:flex; gap:0.25rem; background:rgba(255,255,255,0.9); backdrop-filter:blur(8px); padding:0.35rem 0.5rem; border-radius:999px; box-shadow:0 1px 8px rgba(0,0,0,0.06); border:1px solid var(--border);">
          {langs.map((l) => (
            <a
              key={l.code}
              href="#"
              data-lang={l.code}
              class="lang-btn"
              style={`font-size:0.8rem; font-weight:600; padding:0.25rem 0.6rem; border-radius:999px; text-decoration:none; transition:all 0.2s; ${lang === l.code ? 'background:var(--primary); color:#fff;' : 'color:var(--muted);'}`}
              onmouseenter={lang !== l.code ? `this.style.background='#dce6ff'; this.style.color='var(--primary)'` : undefined}
              onmouseleave={lang !== l.code ? `this.style.background='transparent'; this.style.color='var(--muted)'` : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var u = new URL(location.href);
            var activeLang = u.searchParams.get('lang') || 'en';
            document.querySelectorAll('.lang-btn').forEach(function(btn) {
              var btnLang = btn.getAttribute('data-lang');
              if (btnLang === activeLang) {
                btn.style.background = 'var(--primary)';
                btn.style.color = '#fff';
                btn.onmouseenter = null;
                btn.onmouseleave = null;
              } else {
                btn.style.background = 'transparent';
                btn.style.color = 'var(--muted)';
              }
              btn.addEventListener('click', function(e) {
                e.preventDefault();
                var u2 = new URL(location.href);
                u2.searchParams.set('lang', btnLang);
                location.href = u2.toString();
              });
            });
          })();
        `}} />

        <nav>
          <div class="container">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <a href="/dashboard" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;">
                <img src="/static/logo.png" alt="Logo" style="height:28px;width:auto;" />
                <span style="font-weight:600;color:var(--text);font-family:'Patrick Hand',cursive;font-size:1.1rem;">{dict.siteName}</span>
              </a>
              {user && (
                <>
                  <a href={`/exams?lang=${lang}`}>{dict.navExams}</a>
                  <a href={`/profile?lang=${lang}`}>{dict.navProfile}</a>
                  <a href={`/billing?lang=${lang}`}>{dict.navBilling}</a>
                </>
              )}
            </div>
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <a href="https://jamespares.me/terms/" target="_blank" rel="noopener noreferrer" style="font-size:0.8rem;color:var(--muted);">{dict.navTerms}</a>
              <a href="https://jamespares.me/privacy/" target="_blank" rel="noopener noreferrer" style="font-size:0.8rem;color:var(--muted);">{dict.navPrivacy}</a>
              {user ? (
                <>
                  <span style="color:var(--muted);margin-right:1rem;">{user.email}</span>
                  <a href="/logout">{dict.navLogout}</a>
                </>
              ) : (
                <>
                  <a href={`/login?lang=${lang}`}>{dict.navLogin}</a>
                  <a href={`/register?lang=${lang}`}>{dict.navRegister}</a>
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
