import { Hono } from 'hono';
import { eq, desc, and } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, attempts } from '../db/schema';
import { authMiddleware, isAdmin } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';
import { Headphones, BookOpen, PenTool, Mic, ArrowRight } from '../components/Icons';
import { ensureStaticPapers, displayExamTitle } from '../data/seed-papers';
import { computePassReadiness } from '../lib/pass-readiness';

const examRoutes = new Hono<{ Bindings: CloudflareBindings }>();

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

  await ensureStaticPapers(db);

  const allExams = await db
    .select()
    .from(exams)
    .where(eq(exams.status, 'active'))
    .orderBy(desc(exams.createdAt));

  // Prefer static curated papers; hide legacy AI-generated unless admin
  const visibleExams = isAdmin(user, c.env)
    ? allExams
    : allExams.filter((e) => e.title.startsWith('[static]'));

  const userAttempts = await db
    .select()
    .from(attempts)
    .where(eq(attempts.userId, user.id))
    .orderBy(desc(attempts.startedAt));

  const attemptMap = new Map<string, typeof attempts.$inferSelect>();
  for (const a of userAttempts) {
    // Prefer most recent attempt per exam+section (already ordered desc)
    const key = `${a.examId}-${a.section}`;
    if (!attemptMap.has(key)) attemptMap.set(key, a);
  }

  const readiness = computePassReadiness(userAttempts);

  const sectionConfig: Record<string, { label: string; icon: any; name: string }> = {
    CO: { label: 'CO', icon: Headphones, name: 'Listening' },
    CE: { label: 'CE', icon: BookOpen, name: 'Reading' },
    PE: { label: 'PE', icon: PenTool, name: 'Writing' },
    PO: { label: 'PO', icon: Mic, name: 'Oral practice' },
  };

  return c.html(
    <DashboardLayout title="Exams" active="exams" user={user}>
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap;margin-bottom:var(--space-6);">
        <div>
          <h2 style="margin:0 0 0.35rem;">Practice Papers</h2>
          <p style="margin:0;color:var(--muted);font-size:0.95rem;">
            Free curated DALF C1 mocks — listening, reading, writing, plus optional oral practice.
          </p>
        </div>
        {readiness.confidence === 'High' && readiness.readinessPct >= 80 && (
          <span class="score-badge score-pass" style="align-self:center;">
            Pass readiness {readiness.readinessPct}%
          </span>
        )}
        {isAdmin(user, c.env) && (
          <a href="/admin/generate" class="btn btn-secondary">Admin Generate</a>
        )}
      </div>

      {visibleExams.length === 0 ? (
        <div class="card">
          <p>No practice papers available yet. Please refresh the page.</p>
        </div>
      ) : (
        visibleExams.map((exam) => (
          <div class="card">
            <h3 style="margin-top:0;">{displayExamTitle(exam.title)}</h3>
            <p style="color:var(--muted);margin-bottom:var(--space-4);">Theme: {exam.theme}</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.75rem;">
              {['CO', 'CE', 'PE', 'PO'].map((section) => {
                const key = `${exam.id}-${section}`;
                const attempt = attemptMap.get(key);
                const cfg = sectionConfig[section];
                const SectionIcon = cfg.icon;
                return (
                  <div style="border:1px solid var(--base-border);border-radius:var(--radius-lg);padding:0.85rem 1rem;background:white;display:flex;flex-direction:column;gap:0.5rem;">
                    <div style="display:flex;align-items:center;gap:0.5rem;">
                      <SectionIcon size={18} style={{ color: 'var(--accent)' }} />
                      <strong>{cfg.label}</strong>
                      <span style="color:var(--muted);font-size:0.8rem;">{cfg.name}</span>
                    </div>
                    {section === 'PO' && (
                      <span style="font-size:0.75rem;color:var(--muted);">Self-study rehearsal — not a live examiner</span>
                    )}
                    {attempt ? (
                      attempt.status === 'completed' ? (
                        <span class={`score-badge ${((attempt.totalScore ?? 0) >= 5) ? 'score-pass' : 'score-fail'}`}>
                          {attempt.totalScore?.toFixed(1) || '-'} / 25
                        </span>
                      ) : (
                        <a
                          href={`/exams/${exam.id}/${sectionRoute(section)}?attempt=${attempt.id}`}
                          class="btn btn-secondary"
                          style="font-size:0.85rem;align-self:flex-start;"
                        >
                          Continue <ArrowRight size={14} />
                        </a>
                      )
                    ) : (
                      <form method="post" action={`/exams/${exam.id}/start`} style="margin:0;">
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

examRoutes.post('/exams/:id/start', authMiddleware(), async (c) => {
  const user = c.get('user');
  const examId = Number(c.req.param('id'));
  const body = await c.req.parseBody<{ section: string }>();
  const section = body.section;

  const db = getDb(c.env.DB);

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

  const [attempt] = await db
    .insert(attempts)
    .values({ userId: user.id, examId, section, status: 'in_progress' })
    .returning();

  return c.redirect(`/exams/${examId}/${sectionRoute(section)}?attempt=${attempt.id}`);
});

export default examRoutes;
