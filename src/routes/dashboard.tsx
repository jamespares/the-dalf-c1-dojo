import { Hono } from 'hono';
import { eq, desc, count } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, exams, errorLogs } from '../db/schema';
import { authMiddleware, getCurrentUser } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';
import { formatStatus, formatSection, formatErrorType } from '../lib/formatters';

const dashboard = new Hono<{ Bindings: CloudflareBindings }>();

dashboard.get('/', async (c) => {
  const user = await getCurrentUser(c);
  if (!user) return c.redirect('/login');
  return c.redirect('/dashboard');
});

dashboard.get('/dashboard', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);

  // Recent attempts (last 10)
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

  // All attempts for accurate averages
  const allAttempts = await db
    .select()
    .from(attempts)
    .where(eq(attempts.userId, user.id));

  const sectionCounts = { CO: 0, CE: 0, PE: 0, PO: 0 };
  const sectionTotals = { CO: 0, CE: 0, PE: 0, PO: 0 };

  for (const a of allAttempts) {
    if (a.totalScore != null) {
      sectionCounts[a.section as keyof typeof sectionCounts]++;
      sectionTotals[a.section as keyof typeof sectionTotals] += a.totalScore;
    }
  }

  // Focus area from error logs
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

  // Determine focus area with tie handling
  let focusArea: string | null = null;
  let focusAreaCount = 0;
  let focusAreaPct = 0;
  if (topError) {
    const tied = sortedErrors.filter((e) => e.count === topError.count);
    focusAreaCount = topError.count;
    focusAreaPct = totalErrors > 0 ? Math.round((topError.count / totalErrors) * 100) : 0;
    if (tied.length > 1) {
      focusArea = tied.map((e) => formatErrorType(e.type)).join(' & ');
    } else {
      focusArea = formatErrorType(topError.type);
    }
  }

  return c.html(
    <DashboardLayout title="Home" active="home" user={user}>
      <div class="card">
        <h2>Recent Attempts</h2>
        {recentAttempts.length === 0 ? (
          <p>No attempts yet. <a href="/exams">Start an exam</a>.</p>
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
                if (row.attempt.status === 'in_progress') {
                  actionLink = `/exams/${row.exam?.id}/start?section=${row.attempt.section}`;
                  actionLabel = 'Continue';
                } else if (row.attempt.status === 'completed') {
                  actionLink = `/review/${row.attempt.id}`;
                  actionLabel = 'View';
                } else if (row.attempt.status === 'marking_failed') {
                  actionLink = `/marking/${row.attempt.id}`;
                  actionLabel = 'Retry';
                }
                return (
                  <tr>
                    <td>{row.exam?.title || 'Unknown'}</td>
                    <td>{formatSection(row.attempt.section)}</td>
                    <td>
                      {row.attempt.totalScore != null ? (
                        <span class={`score-badge ${row.attempt.totalScore >= 5 ? 'score-pass' : 'score-fail'}`}>
                          {row.attempt.totalScore.toFixed(1)} / 25
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      <span class={`status-badge status-${status.variant}`}>{status.label}</span>
                    </td>
                    <td>{row.attempt.startedAt ? new Date(row.attempt.startedAt).toLocaleDateString() : '-'}</td>
                    <td>
                      {actionLink ? (
                        <a href={actionLink} class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.85rem;">
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
          <h2>Average Scores</h2>
          {Object.entries(sectionCounts).map(([section, count]) => {
            const avg = count > 0 ? (sectionTotals[section as keyof typeof sectionTotals] / count).toFixed(1) : null;
            return (
              <p>
                <strong>{formatSection(section)}:</strong>{' '}
                {avg ? `${avg} / 25` : 'No attempts'}
                <span style="color: var(--muted); font-size: 0.85rem;"> ({count} attempt{count === 1 ? '' : 's'})</span>
              </p>
            );
          })}
        </div>
        <div class="card">
          <h2>Focus Area</h2>
          {focusArea ? (
            <>
              <p style="font-size: 1.25rem; font-weight: 600; margin: 0;">{focusArea}</p>
              <p style="color: var(--muted); margin-bottom: 0;">
                {focusAreaCount} errors logged ({focusAreaPct}% of total) — prioritise this area.
              </p>
            </>
          ) : (
            <p style="color: var(--muted); margin-bottom: 0;">Complete exams to see your weakest areas.</p>
          )}
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h2>Quick Actions</h2>
          <p><a href="/exams" class="btn btn-primary">Browse Exams</a></p>
          <p><a href="/exams/generate" class="btn btn-outline">Generate New Exam</a></p>
        </div>
        <div class="card">
          <h2>Deep Insights</h2>
          <p style="color: var(--muted); margin-bottom: var(--space-4);">
            Get AI-powered analysis of your progress, trends, and personalised study recommendations.
          </p>
          <p><a href="/insights" class="btn btn-primary">View Insights</a></p>
        </div>
      </div>
    </DashboardLayout>
  );
});

export default dashboard;
