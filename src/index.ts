import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import auth from './routes/auth.tsx';
import dashboard from './routes/dashboard.tsx';
import exams from './routes/exams.tsx';
import admin from './routes/admin.tsx';
import listening from './routes/listening.tsx';
import reading from './routes/reading.tsx';
import writing from './routes/writing.tsx';
import speaking from './routes/speaking.tsx';
import marking from './routes/marking.tsx';
import review from './routes/review.tsx';
import profile from './routes/profile.tsx';

const app = new Hono();

// Static assets
app.get('/static/*', serveStatic({ root: './' }));

// Routes
app.route('/', auth);
app.route('/', dashboard);
app.route('/', exams);
app.route('/', admin);
app.route('/', listening);
app.route('/', reading);
app.route('/', writing);
app.route('/', speaking);
app.route('/', marking);
app.route('/', review);
app.route('/', profile);

export default app;
