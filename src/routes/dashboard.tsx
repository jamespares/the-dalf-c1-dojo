import { Hono } from 'hono';
import { eq, desc, count } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, exams, errorLogs } from '../db/schema';
import { authMiddleware, getCurrentUser } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';
import {
  FileText,
  BarChart3,
  ArrowRight,
  CheckCircle,
  XCircle,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Target,
  HelpCircle,
  ListOrdered,
} from '../components/Icons';
import { formatStatus, formatSection, formatErrorType } from '../lib/formatters';
import { computePassReadiness, type SectionCode } from '../lib/pass-readiness';
import { ensureStaticPapers } from '../data/seed-papers';

const dashboard = new Hono<{ Bindings: CloudflareBindings }>();

const SECTION_ICONS: Record<SectionCode, any> = {
  CO: Headphones,
  CE: BookOpen,
  PE: PenTool,
  PO: Mic,
};

dashboard.get('/', async (c) => {
  const user = await getCurrentUser(c);
  if (!user) return c.redirect('/login');
  return c.redirect('/dashboard');
});

dashboard.get('/dashboard', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);

  await ensureStaticPapers(db);

  const recentAttempts = await db
    .select({
      attempt: attempts,
      exam: { id: exams.id, title: exams.title, theme: exams.theme },
    })
    .from(attempts)
    .leftJoin(exams, eq(attempts.examId, exams.id))
    .where(eq(attempts.userId, user.id))
    .orderBy(desc(attempts.startedAt))
    .limit(10);

  const allAttempts = await db.select().from(attempts).where(eq(attempts.userId, user.id));
  const readiness = computePassReadiness(allAttempts);

  const errorStats = await db
    .select({
      type: errorLogs.errorType,
      count: count(errorLogs.id),
    })
    .from(errorLogs)
    .where(eq(errorLogs.userId, user.id))
    .groupBy(errorLogs.errorType);

  const sortedErrors = errorStats.sort((a, b) => b.count - a.count);
  const topError = sortedErrors[0];
  const totalErrors = sortedErrors.reduce((sum, e) => sum + e.count, 0);

  let focusArea: string | null = null;
  let focusAreaCount = 0;
  let focusAreaPct = 0;
  if (topError) {
    const tied = sortedErrors.filter((e) => e.count === topError.count);
    focusAreaCount = topError.count;
    focusAreaPct = totalErrors > 0 ? Math.round((topError.count / totalErrors) * 100) : 0;
    focusArea =
      tied.length > 1
        ? tied.map((e) => formatErrorType(e.type)).join(' & ')
        : formatErrorType(topError.type);
  }

  return c.html(
    <DashboardLayout title="Home" active="home" user={user}>
      {/* Pass readiness hero */}
      <div class="card" style="border-left:4px solid var(--accent);">
        <div style="display:flex;flex-wrap:wrap;gap:1.5rem;align-items:flex-start;justify-content:space-between;">
          <div style="flex:1;min-width:220px;">
            <h2 style="margin:0 0 0.5rem;display:flex;align-items:center;gap:0.5rem;">
              <Target size={22} style={{ color: 'var(--accent)' }} />
              Pass readiness
            </h2>
            <p style="color:var(--muted);margin:0 0 0.75rem;font-size:0.95rem;">
              Likelihood of passing based on your recent drills (last 6 attempts per section) — not a guarantee.
            </p>
            <p style="margin:0;font-size:0.95rem;">{readiness.explanation}</p>
          </div>
          <div style="text-align:center;min-width:140px;">
            <div style="font-size:2.75rem;font-weight:700;line-height:1;color:var(--accent);font-family:var(--font-heading);">
              {readiness.readinessPct}%
            </div>
            <div style="margin-top:0.5rem;">
              <span
                class={
                  readiness.confidence === 'High'
                    ? 'score-badge score-pass'
                    : readiness.confidence === 'Medium'
                      ? 'status-badge status-warning'
                      : 'status-badge'
                }
                style="font-size:0.85rem;"
              >
                {readiness.confidence} confidence
              </span>
            </div>
            {readiness.avgTotal != null && (
              <p style="margin:0.5rem 0 0;color:var(--muted);font-size:0.85rem;">
                Avg total {readiness.avgTotal.toFixed(1)} / 100
              </p>
            )}
          </div>
        </div>
      </div>

      {/* How to use */}
      <div class="card">
        <h2 style="margin-top:0;display:flex;align-items:center;gap:0.5rem;">
          <HelpCircle size={22} style={{ color: 'var(--accent)' }} />
          How to use this tool
        </h2>
        <p style="color:var(--muted);margin-top:0;">
          Free DALF C1 past-paper drilling for listening (CO), reading (CE), and writing (PE), plus optional oral practice (PO) with AI marking — not a live examiner session.
        </p>
        <div style="display:grid;gap:0.75rem;margin:1rem 0;">
          <div style="display:flex;gap:0.75rem;align-items:flex-start;">
            <ListOrdered size={18} style={{ color: 'var(--accent)', flexShrink: '0', marginTop: '2px' }} />
            <div>
              <strong>Scoring:</strong> each section /25. Official pass needs ≥50/100 overall and ≥5/25 per section (eliminatory).
            </div>
          </div>
          <ol style="margin:0;padding-left:1.25rem;line-height:1.7;">
            <li>Pick a paper and drill one section under timed conditions.</li>
            <li>Review AI feedback and error tags after each attempt.</li>
            <li>Re-drill weak sections until averages sit comfortably above the pass bar.</li>
            <li>Watch Pass readiness climb as your last 6 attempts per section improve.</li>
          </ol>
          <p style="margin:0;color:var(--muted);font-size:0.9rem;">
            Oral tip: record your exposé and answers to on-screen examiner questions as self-study rehearsal — not the real entretien.
          </p>
        </div>
        <a href="/exams" class="btn btn-primary">
          Start practicing <ArrowRight size={16} />
        </a>
      </div>

      {/* Section averages */}
      <div class="card">
        <h2 style="margin-top:0;">Section averages</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.75rem;">
          {readiness.sections.map((s) => {
            const Icon = SECTION_ICONS[s.section];
            const avg = s.average != null ? s.average.toFixed(1) : null;
            const pass = s.average != null && s.average >= 5;
            return (
              <div style="border:1px solid var(--base-border);border-radius:var(--radius-lg);padding:1rem;background:white;">
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
                  <Icon size={18} style={{ color: 'var(--accent)' }} />
                  <strong>{formatSection(s.section)}</strong>
                </div>
                {avg ? (
                  <span class={`score-badge ${pass ? 'score-pass' : 'score-fail'}`}>{avg} / 25</span>
                ) : (
                  <span style="color:var(--muted);">No attempts</span>
                )}
                <p style="margin:0.5rem 0 0;color:var(--muted);font-size:0.8rem;">
                  {s.count} recent attempt{s.count === 1 ? '' : 's'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent attempts */}
      <div class="card">
        <h2 style="margin-top:0;">Recent attempts</h2>
        {recentAttempts.length === 0 ? (
          <p>
            No attempts yet. <a href="/exams">Start a practice paper</a>.
          </p>
        ) : (
          <table class="table">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Section</th>
                <th>Score</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentAttempts.map((row) => {
                const status = formatStatus(row.attempt.status);
                let actionLink: string | null = null;
                let actionLabel = '';
                const sectionPath =
                  row.attempt.section === 'CO'
                    ? 'listening'
                    : row.attempt.section === 'CE'
                      ? 'reading'
                      : row.attempt.section === 'PE'
                        ? 'writing'
                        : 'speaking';
                if (row.attempt.status === 'in_progress') {
                  actionLink = `/exams/${row.exam?.id}/${sectionPath}?attempt=${row.attempt.id}`;
                  actionLabel = 'Continue';
                } else if (row.attempt.status === 'completed') {
                  actionLink = `/review/${row.attempt.id}`;
                  actionLabel = 'View';
                } else if (row.attempt.status === 'marking_failed' || row.attempt.status === 'pending_marking') {
                  actionLink = `/marking/${row.attempt.id}`;
                  actionLabel = row.attempt.status === 'pending_marking' ? 'Check' : 'Retry';
                }
                return (
                  <tr>
                    <td>{(row.exam?.title || 'Unknown').replace(/^\[static\]\s*/, '')}</td>
                    <td>{formatSection(row.attempt.section)}</td>
                    <td>
                      {row.attempt.totalScore != null ? (
                        <span
                          class={`score-badge ${row.attempt.totalScore >= 5 ? 'score-pass' : 'score-fail'}`}
                        >
                          {row.attempt.totalScore >= 5 ? (
                            <CheckCircle size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                          ) : (
                            <XCircle size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                          )}
                          {row.attempt.totalScore.toFixed(1)} / 25
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      <span class={`status-badge status-${status.variant}`}>{status.label}</span>
                    </td>
                    <td>
                      {row.attempt.startedAt
                        ? new Date(row.attempt.startedAt).toLocaleDateString()
                        : '-'}
                    </td>
                    <td>
                      {actionLink ? (
                        <a
                          href={actionLink}
                          class="btn btn-outline"
                          style="padding:0.35rem 0.75rem;font-size:0.85rem;"
                        >
                          {actionLabel}
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div class="grid-2">
        <div class="card">
          <h2 style="margin-top:0;">Focus area</h2>
          {focusArea ? (
            <>
              <p style="font-size:1.25rem;font-weight:600;margin:0;">{focusArea}</p>
              <p style="color:var(--muted);margin-bottom:0;">
                {focusAreaCount} errors logged ({focusAreaPct}% of total) — prioritise this area.
              </p>
            </>
          ) : (
            <p style="color:var(--muted);margin-bottom:0;">Complete exams to see your weakest areas.</p>
          )}
        </div>
        <div class="card">
          <h2 style="margin-top:0;">Continue</h2>
          <p style="color:var(--muted);margin-bottom:var(--space-4);">
            Drill curated papers and build an evidence-based readiness rating.
          </p>
          <p>
            <a href="/exams" class="btn btn-primary">
              <FileText size={18} /> Browse papers
            </a>
          </p>
          <p>
            <a href="/insights" class="btn btn-outline">
              <BarChart3 size={18} /> View insights
            </a>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
});

export default dashboard;
