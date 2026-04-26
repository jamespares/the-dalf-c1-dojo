import { Hono } from 'hono';
import landing from './routes/landing';
import auth from './routes/auth';
import dashboard from './routes/dashboard';
import exams from './routes/exams';
import admin from './routes/admin';
import listening from './routes/listening';
import reading from './routes/reading';
import writing from './routes/writing';
import speaking from './routes/speaking';
import marking from './routes/marking';
import review from './routes/review';
import profile from './routes/profile';
import terms from './routes/terms';

const app = new Hono();

// Landing page (must be before auth to handle '/' first)
app.route('/', landing);

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
app.route('/', terms);

export default app;
