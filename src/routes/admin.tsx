import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { exams } from '../db/schema';
import { adminMiddleware } from '../auth';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import {
  findReusableExam,
  generateExamContent,
  storeExam,
  generateAndStoreAudio,
} from '../exam-generation';

const admin = new Hono<{ Bindings: CloudflareBindings }>();

const THEMES = [
  'Environment and sustainable development',
  'Urbanism and city transformation',
  'Culture and arts',
  'Social issues',
  'Science and technology',
  'Economics and society',
  'Family and education',
  'Work and wellbeing',
  'Digital society',
  'Consumption and ethics',
];

const themeLabels: Record<string, string> = {
  'Environment and sustainable development': 'Environment & Sustainable Development',
  'Urbanism and city transformation': 'Urbanism & City Transformation',
  'Culture and arts': 'Culture & Arts',
  'Social issues': 'Social Issues',
  'Science and technology': 'Science & Technology',
  'Economics and society': 'Economics & Society',
  'Family and education': 'Family & Education',
  'Work and wellbeing': 'Work & Wellbeing',
  'Digital society': 'Digital Society',
  'Consumption and ethics': 'Consumption & Ethics',
};

admin.get('/admin/generate', adminMiddleware(), (c) => {
  const user = c.get('user');
  return c.html(
    <Layout title="Generate Exam">
      <Navbar user={user} />
      <h1>Generate New Exam</h1>
      <div class="card" style="max-width:500px;">
        <form method="post" action="/admin/generate">
          <div class="form-group">
            <label>Theme</label>
            <select name="theme" required>
              <option value="">Select a theme...</option>
              {THEMES.map((t) => (
                <option value={t}>{themeLabels[t]}</option>
              ))}
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Generate Exam</button>
        </form>
        <p style="color:var(--muted);margin-top:1rem;">
          This may take 30-60 seconds as AI generates all 4 sections plus audio.
        </p>
      </div>
    </Layout>
  );
});

admin.post('/admin/generate', adminMiddleware(), async (c) => {
  const user = c.get('user');
  const body = await c.req.parseBody<{ theme: string }>();
  const theme = body.theme;
  const db = getDb(c.env.DB);

  // Check for reusable exam before burning tokens
  const reusable = await findReusableExam(db, user.id, theme);
  if (reusable) {
    return c.redirect('/exams?cached=1');
  }

  try {
    const content = await generateExamContent(c, theme);
    const exam = await storeExam(db, theme, content);
    const audioKeys = await generateAndStoreAudio(c, exam.id, content);

    await db
      .update(exams)
      .set({ audioKeys: audioKeys as any })
      .where(eq(exams.id, exam.id));

    return c.redirect('/exams');
  } catch (err: any) {
    console.error('Exam generation failed:', err);
    return c.html(
      <Layout title="Error">
        <Navbar user={c.get('user')} />
        <div class="card">
          <div class="alert alert-danger">Failed to generate exam: {err.message}</div>
          <a href="/admin/generate" class="btn btn-secondary">Try again</a>
        </div>
      </Layout>,
      500
    );
  }
});

export default admin;
