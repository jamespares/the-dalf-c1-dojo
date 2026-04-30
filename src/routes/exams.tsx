import { Hono } from 'hono';
import { eq, desc, and } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, attempts } from '../db/schema';
import { authMiddleware, isAdmin } from '../auth';
import { Layout } from '../components/Layout';
import { canStartAttempt, recordUsageEvent } from '../subscription';
import { detectLang, getDict, type Lang, type Dict } from '../lib/i18n';

const examRoutes = new Hono<{ Bindings: CloudflareBindings }>();

function sectionRoute(section: string): string {
  switch (section) {
    case 'CO': return 'listening';
    case 'CE': return 'reading';
    case 'PE': return 'writing';
    case 'PO': return 'speaking';
    default: return section.toLowerCase();
  }
}

examRoutes.get('/exams', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);
  const lang = detectLang(c);
  const dict = getDict(lang);

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
    CO: dict.examsSectionCO,
    CE: dict.examsSectionCE,
    PE: dict.examsSectionPE,
    PO: dict.examsSectionPO,
  };

  return c.html(
    <Layout title={dict.examsTitle} user={user} lang={lang}>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <h1>{dict.examsTitle}</h1>
        {isAdmin(user, c.env) && (
          <a href="/admin/generate" class="btn btn-primary">{dict.examsGenerate}</a>
        )}
      </div>
      {allExams.length === 0 ? (
        <div class="card">
          <p>{dict.examsNoExams}</p>
        </div>
      ) : (
        allExams.map((exam) => (
          <div class="card">
            <h2>{exam.title}</h2>
            <p style="color:var(--muted);">{dict.examsTheme} {exam.theme}</p>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
              {['CO', 'CE', 'PE', 'PO'].map((section) => {
                const key = `${exam.id}-${section}`;
                const attempt = attemptMap.get(key);
                return (
                  <div style="border:1px solid var(--border);border-radius:var(--radius);padding:0.5rem 1rem;">
                    <strong>{sectionLabels[section]}</strong>
                    <br />
                    {attempt ? (
                      attempt.status === 'completed' ? (
                        <span class="score-badge score-pass">{attempt.totalScore?.toFixed(1) || dict.dashDash}{dict.dashScoreSuffix}</span>
                      ) : (
                        <a href={`/exams/${exam.id}/${sectionRoute(section)}`} class="btn btn-secondary" style="font-size:0.85rem;">
                          {dict.examsContinue}
                        </a>
                      )
                    ) : (
                      <form method="post" action={`/exams/${exam.id}/start`} style="display:inline;">
                        <input type="hidden" name="section" value={section} />
                        <button type="submit" class="btn btn-primary" style="font-size:0.85rem;">
                          {dict.examsStart}
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
  const lang = detectLang(c);
  const dict = getDict(lang);
  const examId = Number(c.req.param('id'));
  const body = await c.req.parseBody<{ section: string }>();
  const section = body.section;

  const db = getDb(c.env.DB);

  // Admins bypass subscription check
  if (!isAdmin(user, c.env)) {
    const check = await canStartAttempt(c, user.id);
    if (!check.allowed) {
      if (check.reason === 'limit_reached') {
        return c.redirect('/billing?limit=1');
      }
      return c.redirect('/billing');
    }
  }

  // Check for existing attempt for this user+exam+section
  const [existing] = await db
    .select()
    .from(attempts)
    .where(and(eq(attempts.userId, user.id), eq(attempts.examId, examId), eq(attempts.section, section)))
    .limit(1);

  if (existing) {
    return c.redirect(`/exams/${examId}/${sectionRoute(section)}?attempt=${existing.id}`);
  }

  // Record usage before creating attempt
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
