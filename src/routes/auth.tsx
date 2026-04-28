import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { users } from '../db/schema';
import { hashPassword, verifyPassword, createSession, logout } from '../auth';
import { Layout } from '../components/Layout';
import { detectLang, getDict, type Lang, type Dict } from '../lib/i18n';

const auth = new Hono();

const AuthLayout = ({ children, title, lang, dict }: { children: any; title: string; lang: string; dict: Dict }) => (
  <html lang={lang}>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} - DALF C1 Practice</title>
      <link rel="icon" type="image/png" href="/logo.png" />
      <link rel="stylesheet" href="/static/style.css" />
      <link rel="stylesheet" href="/static/landing.css" />
      <style>
        {`
          .auth-wrapper {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            background: #f9fafb;
            padding: 2rem;
            overflow: hidden;
          }
          .auth-card {
            background: white;
            border-radius: 20px;
            padding: 3rem;
            width: 100%;
            max-width: 440px;
            box-shadow: 0 10px 40px rgba(0, 35, 149, 0.08), 0 1px 3px rgba(0,0,0,0.05);
            position: relative;
            z-index: 10;
          }
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--fr-blue);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            margin-bottom: 2rem;
          }
          .back-link:hover { opacity: 0.8; }
          .auth-title {
            font-family: 'Patrick Hand', cursive;
            font-size: 2.8rem;
            color: var(--text);
            margin-bottom: 0.5rem;
            line-height: 1.1;
          }
          .auth-subtitle {
            color: var(--text-muted);
            margin-bottom: 2rem;
            font-size: 1.1rem;
          }
          .auth-input {
            width: 100%;
            padding: 0.85rem 1.25rem;
            border: 1.5px solid var(--border);
            border-radius: var(--radius-pill);
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.2s;
            margin-bottom: 1.25rem;
            background: white;
          }
          .auth-input:focus {
            outline: none;
            border-color: var(--fr-blue);
            box-shadow: 0 0 0 4px rgba(0, 35, 149, 0.1);
          }
          .auth-label-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.5rem;
            padding: 0 0.5rem;
          }
          .auth-label {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--text);
          }
          .auth-forgot {
            font-size: 0.85rem;
            color: var(--fr-blue);
            text-decoration: none;
          }
          .auth-btn {
            width: 100%;
            background: var(--fr-blue);
            color: white;
            border: none;
            border-radius: var(--radius-pill);
            padding: 0.9rem;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 0.5rem;
          }
          .auth-btn:hover {
            background: #001a75;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 35, 149, 0.25);
          }
          .auth-footer-text {
            text-align: center;
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 2.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border);
            line-height: 1.6;
          }
          .auth-footer-text a {
            color: var(--fr-blue);
            text-decoration: none;
            font-weight: 600;
          }
          .built-by {
            margin-top: 2.5rem;
            text-align: center;
            position: relative;
            z-index: 10;
          }
          .built-by h3 {
            font-family: 'Quicksand', sans-serif;
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1.25rem;
          }
          .social-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 1rem;
          }
          .social-links a {
            color: var(--text-muted);
            transition: color 0.2s;
          }
          .social-links a:hover {
            color: var(--fr-blue);
          }
          .social-links svg {
            width: 28px;
            height: 28px;
            fill: currentColor;
          }
          .portfolio-link {
            font-size: 0.95rem;
            color: var(--text-muted);
            text-decoration: none;
            font-weight: 500;
          }
          .portfolio-link:hover {
            color: var(--fr-blue);
          }
          .auth-alert {
            padding: 0.85rem 1.25rem;
            border-radius: var(--radius-pill);
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
            text-align: center;
          }
          .auth-alert-danger { background: #ffe0e3; color: #ED2939; border: 1px solid #ED2939; }
        `}
      </style>
    </head>
    <body>
      {/* Language toggle — fixed top-right */}
      <div id="lang-toggle" style="position:fixed; top:1rem; right:1rem; z-index:1000; display:flex; gap:0.25rem; background:rgba(255,255,255,0.9); backdrop-filter:blur(8px); padding:0.35rem 0.5rem; border-radius:999px; box-shadow:0 1px 8px rgba(0,0,0,0.06); border:1px solid var(--border);">
        {[
          { code: 'en', label: dict.langEn },
          { code: 'fr', label: dict.langFr },
          { code: 'zh', label: dict.langZh },
        ].map((l) => (
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

      <div class="auth-wrapper">
        <div class="hero-waves">
          <div class="wave wave-1" style="background: var(--fr-blue-tint);"></div>
          <div class="wave wave-2" style="background: var(--fr-red-tint);"></div>
        </div>
        {children}
      </div>
    </body>
  </html>
);

const BuiltByFooter = ({ dict }: { dict: Dict }) => (
  <div class="built-by">
    <h3>{dict.authBuiltBy}</h3>
    <div class="social-links">
      <a href="https://www.linkedin.com/in/james-p-ba7653207/" target="_blank" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a href="https://x.com/jamespareslfg" target="_blank" aria-label="X (Twitter)">
        <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href="https://github.com/jamespares" target="_blank" aria-label="GitHub">
        <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
    </div>
    <a href="https://jamespares.me" target="_blank" class="portfolio-link">{dict.authPortfolio}</a>
  </div>
);

auth.get('/login', (c) => {
  const lang = detectLang(c);
  const dict = getDict(lang);
  return c.html(
    <AuthLayout title="Login" lang={lang} dict={dict}>
      <div class="auth-card">
        <a href="/" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {dict.authBackToHome}
        </a>
        <h1 class="auth-title">{dict.authWelcomeBack}</h1>
        <p class="auth-subtitle">{dict.authSignInSubtitle}</p>
        <form method="POST" action="/login">
          <div class="auth-label-row">
            <label class="auth-label">{dict.authEmail}</label>
          </div>
          <input type="email" name="email" class="auth-input" placeholder={dict.authEmailPlaceholder} required />
          
          <div class="auth-label-row">
            <label class="auth-label">{dict.authPassword}</label>
            <a href="#" class="auth-forgot">{dict.authForgotPassword}</a>
          </div>
          <input type="password" name="password" class="auth-input" placeholder={dict.authPasswordPlaceholder} required />
          
          <button type="submit" class="auth-btn">{dict.authSignIn}</button>
        </form>
        
        <div class="auth-footer-text">
          {dict.authTermsAgreement} <a href="https://jamespares.me/terms/" target="_blank" rel="noopener noreferrer">{dict.authTermsLink}</a> {dict.authAnd} <a href="https://jamespares.me/privacy/" target="_blank" rel="noopener noreferrer">{dict.authPrivacyLink}</a>.<br/><br/>
          {dict.authNoAccount} <a href="/register">{dict.authSignUp}</a>
        </div>
      </div>
      <BuiltByFooter dict={dict} />
    </AuthLayout>
  );
});

auth.post('/login', async (c) => {
  const body = await c.req.parseBody<{ email: string; password: string }>();
  const db = getDb(c.env.DB);
  const [user] = await db.select().from(users).where(eq(users.email, body.email));
  const lang = detectLang(c);
  const dict = getDict(lang);
  if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
    return c.html(
      <AuthLayout title="Login" lang={lang} dict={dict}>
        <div class="auth-card">
          <a href="/" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {dict.authBackToHome}
          </a>
          <h1 class="auth-title">{dict.authWelcomeBack}</h1>
          <p class="auth-subtitle">{dict.authSignInSubtitle}</p>
          <div class="auth-alert auth-alert-danger">{dict.authInvalidCredentials}</div>
          <form method="POST" action="/login">
            <div class="auth-label-row"><label class="auth-label">{dict.authEmail}</label></div>
            <input type="email" name="email" class="auth-input" value={body.email} required />
            <div class="auth-label-row">
              <label class="auth-label">{dict.authPassword}</label>
              <a href="#" class="auth-forgot">{dict.authForgotPassword}</a>
            </div>
            <input type="password" name="password" class="auth-input" required />
            <button type="submit" class="auth-btn">{dict.authSignIn}</button>
          </form>
          <div class="auth-footer-text">
            {dict.authTermsAgreement} <a href="/terms">{dict.authTermsLink}</a>.<br/><br/>
            {dict.authNoAccount} <a href="/register">{dict.authSignUp}</a>
          </div>
        </div>
        <BuiltByFooter dict={dict} />
      </AuthLayout>,
      401
    );
  }
  await createSession(c, user.id);
  return c.redirect('/dashboard');
});

auth.get('/register', (c) => {
  const lang = detectLang(c);
  const dict = getDict(lang);
  const theme = c.req.query('theme') || '';
  return c.html(
    <AuthLayout title="Register" lang={lang} dict={dict}>
      <div class="auth-card">
        <a href="/" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {dict.authBackToHome}
        </a>
        <h1 class="auth-title">{dict.authCreateAccount}</h1>
        <p class="auth-subtitle">{dict.authRegisterSubtitle}</p>
        
        {theme && (
          <p style="margin-bottom:1.5rem;padding:0.85rem;background:var(--fr-blue-tint);border-radius:12px;font-size:0.95rem;color:var(--fr-blue);font-weight:500;">
            🎯 {dict.authSelectedTopic} &ldquo;{theme}&rdquo;
          </p>
        )}
        
        <form method="POST" action={`/register${theme ? `?theme=${encodeURIComponent(theme)}` : ''}`}>
          {theme && <input type="hidden" name="theme" value={theme} />}
          <div class="auth-label-row"><label class="auth-label">{dict.authEmail}</label></div>
          <input type="email" name="email" class="auth-input" placeholder={dict.authEmailPlaceholder} required />
          
          <div class="auth-label-row"><label class="auth-label">{dict.authPassword}</label></div>
          <input type="password" name="password" class="auth-input" placeholder={dict.authPasswordPlaceholder} required minlength="6" />
          
          <button type="submit" class="auth-btn">{dict.authSignUpBtn}</button>
        </form>
        
        <div class="auth-footer-text">
          {dict.authTermsAgreement} <a href="https://jamespares.me/terms/" target="_blank" rel="noopener noreferrer">{dict.authTermsLink}</a> {dict.authAnd} <a href="https://jamespares.me/privacy/" target="_blank" rel="noopener noreferrer">{dict.authPrivacyLink}</a>.<br/><br/>
          {dict.authHasAccount} <a href={`/login${theme ? `?theme=${encodeURIComponent(theme)}` : ''}`}>{dict.authLogIn}</a>
        </div>
      </div>
      <BuiltByFooter dict={dict} />
    </AuthLayout>
  );
});

auth.post('/register', async (c) => {
  const body = await c.req.parseBody<{ email: string; password: string }>();
  const db = getDb(c.env.DB);
  const lang = detectLang(c);
  const dict = getDict(lang);

  const [existing] = await db.select().from(users).where(eq(users.email, body.email));
  if (existing) {
    return c.html(
      <AuthLayout title="Register" lang={lang} dict={dict}>
        <div class="auth-card">
          <a href="/" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {dict.authBackToHome}
          </a>
          <h1 class="auth-title">{dict.authCreateAccount}</h1>
          <p class="auth-subtitle">{dict.authRegisterSubtitle}</p>
          <div class="auth-alert auth-alert-danger">{dict.authEmailTaken}</div>
          <div style="text-align:center; margin-top: 1rem;">
            <a href={`/login?email=${encodeURIComponent(body.email)}`} class="auth-btn" style="display:inline-block; text-decoration:none;">{dict.authLogInInstead}</a>
          </div>
        </div>
        <BuiltByFooter dict={dict} />
      </AuthLayout>,
      400
    );
  }

  const passwordHash = await hashPassword(body.password);
  const [user] = await db
    .insert(users)
    .values({ email: body.email, passwordHash })
    .returning();

  await createSession(c, user.id);
  const theme = c.req.query('theme') || '';
  return c.redirect(theme ? `/exams?theme=${encodeURIComponent(theme)}` : '/dashboard');
});

auth.get('/logout', async (c) => {
  await logout(c);
  return c.redirect('/login');
});

export default auth;
