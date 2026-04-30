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
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var u = new URL(location.href);
            var activeLang = u.searchParams.get('lang') || 'en';
            document.querySelectorAll('.lang-btn').forEach(function(btn) {
              var btnLang = btn.getAttribute('data-lang');
              if (btnLang === activeLang) {
                btn.classList.add('active');
              } else {
                btn.classList.remove('active');
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
            <div class="flex items-center gap-3">
              <a href="/dashboard" class="flex items-center gap-2 no-underline">
                <img src="/static/logo.png" alt="Logo" class="h-7 w-auto" />
                <span class="font-semibold text-base" style="color: var(--base-text); font-family: var(--font-accent);">{dict.siteName}</span>
              </a>
              {user && (
                <>
                  <a href={'/exams?lang=' + lang}>{dict.navExams}</a>
                  <a href={'/profile?lang=' + lang}>{dict.navProfile}</a>
                  <a href={'/billing?lang=' + lang}>{dict.navBilling}</a>
                </>
              )}
            </div>
            <div class="flex items-center gap-5">
              <div class="lang-toggle">
                {langs.map((l) => (
                  <a key={l.code} href="#" data-lang={l.code} class={`lang-btn ${lang === l.code ? 'active' : ''}`}>
                    {l.label}
                  </a>
                ))}
              </div>
              <a href="https://jamespares.me/terms/" target="_blank" rel="noopener noreferrer" class="text-xs text-muted">{dict.navTerms}</a>
              <a href="https://jamespares.me/privacy/" target="_blank" rel="noopener noreferrer" class="text-xs text-muted">{dict.navPrivacy}</a>
              {user ? (
                <>
                  <span class="text-sm text-muted">{user.email}</span>
                  <a href="/logout">{dict.navLogout}</a>
                </>
              ) : (
                <>
                  <a href={'/login?lang=' + lang}>{dict.navLogin}</a>
                  <a href={'/register?lang=' + lang}>{dict.navRegister}</a>
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
