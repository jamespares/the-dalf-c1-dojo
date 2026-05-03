import { Hono } from 'hono';
import { eq, desc, and } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, attempts } from '../db/schema';
import { authMiddleware, isAdmin } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';
import {
  canStartAttempt,
  canGenerateExam,
  getGenerationStatus,
  recordUsageEvent,
} from '../subscription';
import {
  findReusableExam,
  generateExamContent,
  storeExam,
  generateAndStoreAudio,
} from '../exam-generation';

const examRoutes = new Hono<{ Bindings: CloudflareBindings }>();

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

function sectionRoute(section: string): string {
  switch (section) {
    case 'CO':
      return 'listening';
    case 'CE':
      return 'reading';
    case 'PE':
      return 'writing';
    case 'PO':
      return 'speaking';
    default:
      return section.toLowerCase();
  }
}

examRoutes.get('/exams', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);

  const allExams = await db
    .select()
    .from(exams)
    .where(eq(exams.status, 'active'))
    .orderBy(desc(exams.createdAt));

  const userAttempts = await db
    .select()
    .from(attempts)
    .where(eq(attempts.userId, user.id));

  const attemptMap = new Map<string, typeof attempts.$inferSelect>();
  for (const a of userAttempts) {
    attemptMap.set(`${a.examId}-${a.section}`, a);
  }

  const sectionLabels: Record<string, string> = {
    CO: 'CO',
    CE: 'CE',
    PE: 'PE',
    PO: 'PO',
  };

  const genStatus = isAdmin(user, c.env)
    ? { active: true, used: 0, limit: 30, remaining: 30 }
    : await getGenerationStatus(db, user.id);

  return c.html(
    <DashboardLayout title="Exams" active="exams" user={user}>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-6);">
        <h2 style="margin:0;">Your Exams</h2>
        <div style="display:flex;gap:0.75rem;align-items:center;">
          {genStatus.active && (
            <span style="font-size:0.85rem;color:var(--muted);">
              {genStatus.remaining} / {genStatus.limit} papers left this month
            </span>
          )}
          <a href="/exams/generate" class="btn btn-primary">
            Generate Exam
          </a>
          {isAdmin(user, c.env) && (
            <a href="/admin/generate" class="btn btn-secondary">
              Admin Generate
            </a>
          )}
        </div>
      </div>
      {allExams.length === 0 ? (
        <div class="card">
          <p>No exams available yet.</p>
          <p>
            <a href="/exams/generate" class="btn btn-primary">Generate Your First Exam</a>
          </p>
        </div>
      ) : (
        allExams.map((exam) => (
          <div class="card">
            <h3 style="margin-top:0;">{exam.title}</h3>
            <p style="color:var(--muted);">Theme: {exam.theme}</p>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
              {['CO', 'CE', 'PE', 'PO'].map((section) => {
                const key = `${exam.id}-${section}`;
                const attempt = attemptMap.get(key);
                return (
                  <div style="border:1px solid var(--border);border-radius:var(--radius);padding:0.5rem 1rem;background:white;">
                    <strong>{sectionLabels[section]}</strong>
                    <br />
                    {attempt ? (
                      attempt.status === 'completed' ? (
                        <span class="score-badge score-pass">
                          {attempt.totalScore?.toFixed(1) || '-'} / 25
                        </span>
                      ) : (
                        <a
                          href={`/exams/${exam.id}/${sectionRoute(section)}`}
                          class="btn btn-secondary"
                          style="font-size:0.85rem;"
                        >
                          Continue
                        </a>
                      )
                    ) : (
                      <form
                        method="post"
                        action={`/exams/${exam.id}/start`}
                        style="display:inline;"
                      >
                        <input type="hidden" name="section" value={section} />
                        <button type="submit" class="btn btn-primary" style="font-size:0.85rem;">
                          Start
                        </button>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </DashboardLayout>
  );
});

examRoutes.get('/exams/generate', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);

  const genStatus = isAdmin(user, c.env)
    ? { active: true, used: 0, limit: 30, remaining: 30 }
    : await getGenerationStatus(db, user.id);

  if (!genStatus.active) {
    return c.redirect('/billing');
  }

  return c.html(
    <DashboardLayout title="Generate Exam" active="exams" user={user}>
      <div class="card" style="max-width:500px;">
        <h2 style="margin-top:0;">Generate New Exam</h2>
        <p style="color:var(--muted);margin-bottom:1rem;">
          You have <strong>{genStatus.remaining}</strong> exam generations remaining this month.
        </p>
        <form method="post" action="/exams/generate">
          <div class="form-group">
            <label>Theme</label>
            <select name="theme" required>
              <option value="">Select a theme...</option>
              {THEMES.map((t) => (
                <option value={t}>{themeLabels[t]}</option>
              ))}
            </select>
          </div>
          <button type="submit" class="btn btn-primary" disabled={genStatus.remaining <= 0}>
            Generate Exam
          </button>
        </form>
        <p style="color:var(--muted);margin-top:1rem;font-size:0.85rem;">
          If an exam for your chosen topic already exists and you haven't completed it yet, you'll be directed to that paper instead of generating a new one.
        </p>
      </div>
    </DashboardLayout>
  );
});

examRoutes.post('/exams/generate', authMiddleware(), async (c) => {
  const user = c.get('user');
  const body = await c.req.parseBody<{ theme: string }>();
  const theme = body.theme;

  if (!theme) {
    return c.redirect('/exams/generate');
  }

  const db = getDb(c.env.DB);

  if (!isAdmin(user, c.env)) {
    const check = await canGenerateExam(c, user.id);
    if (!check.allowed) {
      if (check.reason === 'limit_reached') {
        return c.redirect('/billing?limit=1');
      }
      return c.redirect('/billing');
    }
  }

  const reusable = await findReusableExam(db, user.id, theme);
  if (reusable) {
    return c.redirect(`/exams?reused=1&examId=${reusable.id}`);
  }

  try {
    const content = await generateExamContent(c, theme);
    const exam = await storeExam(db, theme, content);
    const audioKeys = await generateAndStoreAudio(c, exam.id, content);

    await db
      .update(exams)
      .set({ audioKeys: audioKeys as any })
      .where(eq(exams.id, exam.id));

    if (!isAdmin(user, c.env)) {
      await recordUsageEvent(db, user.id, 'exam_generation', { examId: exam.id, theme });
    }

    return c.redirect('/exams');
  } catch (err: any) {
    console.error('Exam generation failed:', err);
    return c.html(
      <DashboardLayout title="Error" active="exams" user={user}>
        <div class="card">
          <div class="alert alert-danger">Failed to generate exam: {err.message}</div>
          <a href="/exams/generate" class="btn btn-secondary">Try again</a>
        </div>
      </DashboardLayout>,
      500
    );
  }
});

examRoutes.post('/exams/:id/start', authMiddleware(), async (c) => {
  const user = c.get('user');
  const examId = Number(c.req.param('id'));
  const body = await c.req.parseBody<{ section: string }>();
  const section = body.section;

  const db = getDb(c.env.DB);

  if (!isAdmin(user, c.env)) {
    const check = await canStartAttempt(c, user.id);
    if (!check.allowed) {
      if (check.reason === 'limit_reached') {
        return c.redirect('/billing?limit=1');
      }
      return c.redirect('/billing');
    }
  }

  const [existing] = await db
    .select()
    .from(attempts)
    .where(
      and(
        eq(attempts.userId, user.id),
        eq(attempts.examId, examId),
        eq(attempts.section, section)
      )
    )
    .limit(1);

  if (existing) {
    return c.redirect(`/exams/${examId}/${sectionRoute(section)}?attempt=${existing.id}`);
  }

  if (!isAdmin(user, c.env)) {
    await recordUsageEvent(db, user.id, 'attempt_start', { examId, section });
  }

  const [attempt] = await db
    .insert(attempts)
    .values({ userId: user.id, examId, section, status: 'in_progress' })
    .returning();

  return c.redirect(`/exams/${examId}/${sectionRoute(section)}?attempt=${attempt.id}`);
});

export default examRoutes;
