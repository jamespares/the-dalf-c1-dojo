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
    <p class="auth-signature">© {new Date().getFullYear()} Built by <a href="https://www.linkedin.com/in/james-p-ba7653207/" target="_blank" rel="noopener noreferrer">James Pares</a></p>
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
          <p>By signing in or creating an account, you agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>.</p>
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
          <p>By signing in or creating an account, you agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>.</p>
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
