import { Hono } from 'hono';
import { eq, desc, and } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, attempts } from '../db/schema';
import { authMiddleware } from '../auth';
import { Layout } from '../components/Layout';

const examRoutes = new Hono();

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

  return c.html(
    <Layout title="Exams" user={user}>
      <h1>Exams</h1>
      {allExams.length === 0 ? (
        <div class="card">
          <p>No exams available yet.</p>
          <a href="/admin/generate" class="btn btn-primary">Generate Exam</a>
        </div>
      ) : (
        allExams.map((exam) => (
          <div class="card">
            <h2>{exam.title}</h2>
            <p style="color:var(--muted);">Theme: {exam.theme}</p>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
              {['CO', 'CE', 'PE', 'PO'].map((section) => {
                const key = `${exam.id}-${section}`;
                const attempt = attemptMap.get(key);
                return (
                  <div style="border:1px solid var(--border);border-radius:var(--radius);padding:0.5rem 1rem;">
                    <strong>{section}</strong>
                    <br />
                    {attempt ? (
                      attempt.status === 'completed' ? (
                        <span class="score-badge score-pass">{attempt.totalScore?.toFixed(1) || '-'} / 25</span>
                      ) : (
                        <a href={`/exams/${exam.id}/${section.toLowerCase()}`} class="btn btn-secondary" style="font-size:0.85rem;">
                          Continue
                        </a>
                      )
                    ) : (
                      <form method="POST" action={`/exams/${exam.id}/start`} style="display:inline;">
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
    </Layout>
  );
});

examRoutes.post('/exams/:id/start', authMiddleware(), async (c) => {
  const user = c.get('user');
  const examId = Number(c.req.param('id'));
  const body = await c.req.parseBody<{ section: string }>();
  const section = body.section;

  const db = getDb(c.env.DB);

  // Check for existing attempt for this user+exam+section
  const [existing] = await db
    .select()
    .from(attempts)
    .where(and(eq(attempts.userId, user.id), eq(attempts.examId, examId), eq(attempts.section, section)))
    .limit(1);

  if (existing) {
    return c.redirect(`/exams/${examId}/${section.toLowerCase()}?attempt=${existing.id}`);
  }

  const [attempt] = await db
    .insert(attempts)
    .values({ userId: user.id, examId, section, status: 'in_progress' })
    .returning();

  return c.redirect(`/exams/${examId}/${section.toLowerCase()}?attempt=${attempt.id}`);
});

export default examRoutes;
