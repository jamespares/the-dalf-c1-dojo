import { Hono } from 'hono';
import { logout } from '../auth';

const auth = new Hono<{ Bindings: CloudflareBindings }>();

const AuthLayout = ({ children, title }: { children: any; title: string }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} - DALF C1 Practice</title>
      <link rel="icon" type="image/png" href="/logo.png" />
      <link rel="stylesheet" href="/static/style.css" />
    </head>
    <body>
      <div class="auth-wrapper">
        {children}
      </div>
    </body>
  </html>
);

const BuiltByFooter = () => (
  <div class="auth-below">
    <div class="auth-socials">
      <a href="https://www.linkedin.com/in/james-p-ba7653207/" target="_blank" aria-label="LinkedIn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="https://x.com/jamespareslfg" target="_blank" aria-label="X (Twitter)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href="https://github.com/jamespares" target="_blank" aria-label="GitHub">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </a>
    </div>
    <p class="auth-signature">© 2026 Built by <a href="https://jamespares.me" target="_blank" rel="noopener noreferrer">James Pares</a></p>
  </div>
);

auth.get('/login', (c) => {
  return c.html(
    <AuthLayout title="Login">
      <div class="auth-card">
        <a href="/" class="auth-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to home
        </a>
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-subtitle">Sign in to your account</p>

        <form id="login-form" class="auth-form">
          <div class="auth-field">
            <label class="auth-label">Email</label>
            <input type="email" id="email" class="auth-input" placeholder="you@example.com" required />
          </div>
          <div class="auth-field">
            <div class="auth-label-row">
              <label class="auth-label">Password</label>
              <a href="/forgot-password" class="auth-forgot">Forgot password?</a>
            </div>
            <input type="password" id="password" class="auth-input" placeholder="••••••••" required />
          </div>
          <div id="error-box" class="hidden alert alert-danger"></div>
          <button type="submit" id="submit-btn" class="auth-btn">Sign In</button>
        </form>

        <hr class="auth-divider" />

        <div class="auth-agreement">
          <p>By signing in or creating an account, you agree to the <a href="https://jamespares.me/terms/" target="_blank">Terms of Service</a> and <a href="https://jamespares.me/privacy/" target="_blank">Privacy Policy</a>.</p>
          <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>
      <BuiltByFooter />

      <script type="module" dangerouslySetInnerHTML={{ __html: `
        import { createAuthClient } from "https://esm.sh/better-auth@1.6.9/client";
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
            submitBtn.textContent = 'Sign In';
          } else {
            window.location.href = '/dashboard';
          }
        });
      `}} />
    </AuthLayout>
  );
});

auth.get('/forgot-password', (c) => {
  return c.html(
    <AuthLayout title="Forgot Password">
      <div class="auth-card">
        <a href="/login" class="auth-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to login
        </a>
        <h1 class="auth-title">Reset Password</h1>
        <p class="auth-subtitle">Enter your email and we'll send you a reset link</p>

        <form id="forgot-form" class="auth-form">
          <div class="auth-field">
            <label class="auth-label">Email</label>
            <input type="email" id="email" class="auth-input" placeholder="you@example.com" required />
          </div>
          <div id="error-box" class="hidden alert alert-danger"></div>
          <div id="success-box" class="hidden alert alert-success"></div>
          <button type="submit" id="submit-btn" class="auth-btn">Send Reset Link</button>
        </form>

        <hr class="auth-divider" />

        <div class="auth-agreement">
          <p>Remember your password? <a href="/login">Log in</a></p>
        </div>
      </div>
      <BuiltByFooter />

      <script type="module" dangerouslySetInnerHTML={{ __html: `
        import { createAuthClient } from "https://esm.sh/better-auth@1.6.9/client";
        const client = createAuthClient({ baseURL: window.location.origin });

        const form = document.getElementById('forgot-form');
        const emailInput = document.getElementById('email');
        const submitBtn = document.getElementById('submit-btn');
        const errorBox = document.getElementById('error-box');
        const successBox = document.getElementById('success-box');

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          errorBox.classList.add('hidden');
          successBox.classList.add('hidden');
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';

          const { data, error } = await client.forgetPassword({
            email: emailInput.value,
            redirectTo: '/reset-password',
          });

          if (error) {
            errorBox.textContent = error.message || 'Something went wrong. Please try again.';
            errorBox.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Reset Link';
          } else {
            successBox.textContent = 'If an account exists for that email, you will receive a reset link shortly.';
            successBox.classList.remove('hidden');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sent';
          }
        });
      `}} />
    </AuthLayout>
  );
});

auth.get('/reset-password', (c) => {
  const token = c.req.query('token') || '';

  return c.html(
    <AuthLayout title="Reset Password">
      <div class="auth-card">
        <a href="/login" class="auth-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to login
        </a>
        <h1 class="auth-title">New Password</h1>
        <p class="auth-subtitle">Choose a new password for your account</p>

        <form id="reset-form" class="auth-form">
          <div class="auth-field">
            <label class="auth-label">New Password</label>
            <input type="password" id="password" class="auth-input" placeholder="••••••••" required minlength={6} />
          </div>
          <div class="auth-field">
            <label class="auth-label">Confirm Password</label>
            <input type="password" id="confirm-password" class="auth-input" placeholder="••••••••" required minlength={6} />
          </div>
          <div id="error-box" class="hidden alert alert-danger"></div>
          <div id="success-box" class="hidden alert alert-success"></div>
          <button type="submit" id="submit-btn" class="auth-btn">Update Password</button>
        </form>

        <hr class="auth-divider" />

        <div class="auth-agreement">
          <p>Remember your password? <a href="/login">Log in</a></p>
        </div>
      </div>
      <BuiltByFooter />

      <script type="module" dangerouslySetInnerHTML={{ __html: `
        import { createAuthClient } from "https://esm.sh/better-auth@1.6.9/client";
        const client = createAuthClient({ baseURL: window.location.origin });

        const form = document.getElementById('reset-form');
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirm-password');
        const submitBtn = document.getElementById('submit-btn');
        const errorBox = document.getElementById('error-box');
        const successBox = document.getElementById('success-box');
        const token = new URLSearchParams(window.location.search).get('token');

        if (!token) {
          errorBox.textContent = 'Invalid or missing reset token. Please request a new reset link.';
          errorBox.classList.remove('hidden');
          submitBtn.disabled = true;
        }

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          errorBox.classList.add('hidden');
          successBox.classList.add('hidden');

          if (passwordInput.value !== confirmInput.value) {
            errorBox.textContent = 'Passwords do not match.';
            errorBox.classList.remove('hidden');
            return;
          }

          submitBtn.disabled = true;
          submitBtn.textContent = 'Updating...';

          const { data, error } = await client.resetPassword({
            newPassword: passwordInput.value,
            token: token,
          });

          if (error) {
            errorBox.textContent = error.message || 'Failed to reset password. The link may have expired.';
            errorBox.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Update Password';
          } else {
            successBox.textContent = 'Password updated successfully. Redirecting to login...';
            successBox.classList.remove('hidden');
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          }
        });
      `}} />
    </AuthLayout>
  );
});

auth.get('/register', (c) => {
  return c.html(
    <AuthLayout title="Register">
      <div class="auth-card">
        <a href="/" class="auth-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to home
        </a>
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Start practicing for your DALF C1</p>

        <form id="register-form" class="auth-form">
          <div class="auth-field">
            <label class="auth-label">Name</label>
            <input type="text" id="name" class="auth-input" placeholder="Your name" required />
          </div>
          <div class="auth-field">
            <label class="auth-label">Email</label>
            <input type="email" id="email" class="auth-input" placeholder="you@example.com" required />
          </div>
          <div class="auth-field">
            <label class="auth-label">Password</label>
            <input type="password" id="password" class="auth-input" placeholder="••••••••" required minlength={6} />
          </div>
          <div id="error-box" class="hidden alert alert-danger"></div>
          <button type="submit" id="submit-btn" class="auth-btn">Sign Up</button>
        </form>

        <hr class="auth-divider" />

        <div class="auth-agreement">
          <p>By signing in or creating an account, you agree to the <a href="https://jamespares.me/terms/" target="_blank">Terms of Service</a> and <a href="https://jamespares.me/privacy/" target="_blank">Privacy Policy</a>.</p>
          <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
      </div>
      <BuiltByFooter />

      <script type="module" dangerouslySetInnerHTML={{ __html: `
        import { createAuthClient } from "https://esm.sh/better-auth@1.6.9/client";
        const client = createAuthClient({ baseURL: window.location.origin });

        const form = document.getElementById('register-form');
        const nameInput = document.getElementById('name');
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
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
          });

          if (error) {
            errorBox.textContent = error.message || 'Failed to create account';
            errorBox.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign Up';
          } else {
            window.location.href = '/dashboard';
          }
        });
      `}} />
    </AuthLayout>
  );
});

auth.get('/logout', async (c) => {
  await logout(c);
  return c.redirect('/login');
});

export default auth;
