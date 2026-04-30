import { Hono } from 'hono';
import { deleteCookie } from 'hono/cookie';
import { detectLang, getDict, type Dict } from '../lib/i18n';

const auth = new Hono<{ Bindings: CloudflareBindings }>();

const AuthLayout = ({ children, title, lang, dict }: { children: any; title: string; lang: string; dict: Dict }) => (
  <html lang={lang}>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} - DALF C1 Practice</title>
      <link rel="icon" type="image/png" href="/logo.png" />
      <link rel="stylesheet" href="/static/style.css" />
      <link rel="stylesheet" href="/static/landing.css" />
    </head>
    <body>
      <div id="lang-toggle" class="lang-toggle" style="position:fixed; top:1rem; right:1rem; z-index:1000; box-shadow:0 1px 8px rgba(0,0,0,0.06);">
        {[
          { code: 'en', label: dict.langEn },
          { code: 'fr', label: dict.langFr },
          { code: 'zh', label: dict.langZh },
        ].map((l) => (
          <a key={l.code} href="#" data-lang={l.code} class={`lang-btn ${lang === l.code ? 'active' : ''}`}>
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
            if (btnLang === activeLang) btn.classList.add('active');
            else btn.classList.remove('active');
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
        {children}
      </div>
    </body>
  </html>
);

const BuiltByFooter = ({ dict }: { dict: Dict }) => (
  <div class="mt-10 text-center relative z-10">
    <h3 class="font-heading text-lg font-bold mb-5">{dict.authBuiltBy}</h3>
    <div class="flex justify-center gap-6 mb-4">
      <a href="https://www.linkedin.com/in/james-p-ba7653207/" target="_blank" class="text-muted hover:text-accent transition-colors" aria-label="LinkedIn">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="https://x.com/jamespareslfg" target="_blank" class="text-muted hover:text-accent transition-colors" aria-label="X (Twitter)">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href="https://github.com/jamespares" target="_blank" class="text-muted hover:text-accent transition-colors" aria-label="GitHub">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </a>
    </div>
    <a href="https://jamespares.me" target="_blank" class="text-sm text-muted font-medium hover:text-accent transition-colors">{dict.authPortfolio}</a>
  </div>
);

auth.get('/login', (c) => {
  const lang = detectLang(c);
  const dict = getDict(lang);
  return c.html(
    <AuthLayout title="Login" lang={lang} dict={dict}>
      <div class="auth-card">
        <a href="/" class="flex items-center gap-2 text-accent font-semibold text-sm mb-8 hover:opacity-80 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {dict.authBackToHome}
        </a>
        <h1 class="auth-title">{dict.authWelcomeBack}</h1>
        <p class="text-secondary text-lg mb-8">{dict.authSignInSubtitle}</p>

        <form id="login-form" class="flex flex-col gap-4">
          <div>
            <label class="form-label">{dict.authEmail}</label>
            <input type="email" id="email" class="auth-input" placeholder={dict.authEmailPlaceholder} required />
          </div>
          <div>
            <div class="flex justify-between items-baseline mb-2 px-2">
              <label class="form-label m-0">{dict.authPassword}</label>
              <a href="#" class="text-sm text-accent hover:opacity-80">{dict.authForgotPassword}</a>
            </div>
            <input type="password" id="password" class="auth-input" placeholder={dict.authPasswordPlaceholder} required />
          </div>
          <div id="error-box" class="hidden alert alert-danger"></div>
          <button type="submit" id="submit-btn" class="auth-btn">{dict.authSignIn}</button>
        </form>

        <div class="text-center text-sm text-muted mt-8 pt-6 border-t border-base-border">
          {dict.authTermsAgreement} <a href="https://jamespares.me/terms/" target="_blank" class="font-semibold">{dict.authTermsLink}</a> {dict.authAnd} <a href="https://jamespares.me/privacy/" target="_blank" class="font-semibold">{dict.authPrivacyLink}</a>.<br/><br/>
          {dict.authNoAccount} <a href="/register" class="font-semibold">{dict.authSignUp}</a>
        </div>
      </div>
      <BuiltByFooter dict={dict} />

      <script type="module" dangerouslySetInnerHTML={{ __html: `
        import { createAuthClient } from "https://esm.sh/better-auth@latest/client";
        const client = createAuthClient({ baseURL: window.location.origin });

        const form = document.getElementById('login-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const submitBtn = document.getElementById('submit-btn');
        const errorBox = document.getElementById('error-box');

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          errorBox.classList.add('hidden');
          submitBtn.disabled = true;
          submitBtn.textContent = 'Signing in...';

          const { data, error } = await client.signIn.email({
            email: emailInput.value,
            password: passwordInput.value,
          });

          if (error) {
            errorBox.textContent = error.message || 'Invalid credentials';
            errorBox.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = '${dict.authSignIn}';
          } else {
            window.location.href = '/dashboard';
          }
        });
      `}} />
    </AuthLayout>
  );
});

auth.get('/register', (c) => {
  const lang = detectLang(c);
  const dict = getDict(lang);
  return c.html(
    <AuthLayout title="Register" lang={lang} dict={dict}>
      <div class="auth-card">
        <a href="/" class="flex items-center gap-2 text-accent font-semibold text-sm mb-8 hover:opacity-80 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {dict.authBackToHome}
        </a>
        <h1 class="auth-title">{dict.authCreateAccount}</h1>
        <p class="text-secondary text-lg mb-8">{dict.authRegisterSubtitle}</p>

        <form id="register-form" class="flex flex-col gap-4">
          <div>
            <label class="form-label">{dict.authEmail}</label>
            <input type="email" id="email" class="auth-input" placeholder={dict.authEmailPlaceholder} required />
          </div>
          <div>
            <label class="form-label">{dict.authPassword}</label>
            <input type="password" id="password" class="auth-input" placeholder={dict.authPasswordPlaceholder} required minlength={6} />
          </div>
          <div id="error-box" class="hidden alert alert-danger"></div>
          <button type="submit" id="submit-btn" class="auth-btn">{dict.authSignUpBtn}</button>
        </form>

        <div class="text-center text-sm text-muted mt-8 pt-6 border-t border-base-border">
          {dict.authTermsAgreement} <a href="https://jamespares.me/terms/" target="_blank" class="font-semibold">{dict.authTermsLink}</a> {dict.authAnd} <a href="https://jamespares.me/privacy/" target="_blank" class="font-semibold">{dict.authPrivacyLink}</a>.<br/><br/>
          {dict.authHasAccount} <a href="/login" class="font-semibold">{dict.authLogIn}</a>
        </div>
      </div>
      <BuiltByFooter dict={dict} />

      <script type="module" dangerouslySetInnerHTML={{ __html: `
        import { createAuthClient } from "https://esm.sh/better-auth@latest/client";
        const client = createAuthClient({ baseURL: window.location.origin });

        const form = document.getElementById('register-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const submitBtn = document.getElementById('submit-btn');
        const errorBox = document.getElementById('error-box');

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          errorBox.classList.add('hidden');
          submitBtn.disabled = true;
          submitBtn.textContent = 'Creating account...';

          const { data, error } = await client.signUp.email({
            email: emailInput.value,
            password: passwordInput.value,
          });

          if (error) {
            errorBox.textContent = error.message || 'Failed to create account';
            errorBox.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = '${dict.authSignUpBtn}';
          } else {
            window.location.href = '/dashboard';
          }
        });
      `}} />
    </AuthLayout>
  );
});

auth.get('/logout', async (c) => {
  // Clear cookies and redirect
  deleteCookie(c, 'better-auth.session_token');
  deleteCookie(c, 'session');
  return c.redirect('/login');
});

export default auth;
