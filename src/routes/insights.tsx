import { Hono } from 'hono';
import { eq, count, sql } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, errorLogs } from '../db/schema';
import { authMiddleware } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';

const insights = new Hono<{ Bindings: CloudflareBindings }>();

insights.get('/insights', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);

  // Error stats
  const errorStats = await db
    .select({
      type: errorLogs.errorType,
      count: count(errorLogs.id),
    })
    .from(errorLogs)
    .where(eq(errorLogs.userId, user.id))
    .groupBy(errorLogs.errorType);

  const recentErrors = await db
    .select()
    .from(errorLogs)
    .where(eq(errorLogs.userId, user.id))
    .orderBy(sql`${errorLogs.createdAt} DESC`)
    .limit(20);

  // Attempt stats for performance overview
  const userAttempts = await db
    .select()
    .from(attempts)
    .where(eq(attempts.userId, user.id));

  const sectionCounts = { CO: 0, CE: 0, PE: 0, PO: 0 };
  const sectionTotals = { CO: 0, CE: 0, PE: 0, PO: 0 };
  let completedCount = 0;

  for (const a of userAttempts) {
    if (a.totalScore != null) {
      sectionCounts[a.section as keyof typeof sectionCounts]++;
      sectionTotals[a.section as keyof typeof sectionTotals] += a.totalScore;
      completedCount++;
    }
  }

  const topError = errorStats.sort((a, b) => b.count - a.count)[0];

  return c.html(
    <DashboardLayout title="Insights" active="insights" user={user}>
      {/* Performance overview cards */}
      <div class="grid-2">
        <div class="card">
          <h2 style="margin-top:0;">Completed Attempts</h2>
          <p style="font-size:2rem;font-weight:700;color:var(--accent);margin:0;">{completedCount}</p>
          <p style="color:var(--muted);margin-bottom:0;">across all sections</p>
        </div>
        <div class="card">
          <h2 style="margin-top:0;">Focus Area</h2>
          {topError ? (
            <>
              <p style="font-size:1.25rem;font-weight:600;margin:0;">{topError.type}</p>
              <p style="color:var(--muted);margin-bottom:0;">{topError.count} errors logged — prioritise this area.</p>
            </>
          ) : (
            <p style="color:var(--muted);margin-bottom:0;">Complete exams to see your weakest areas.</p>
          )}
        </div>
      </div>

      {/* Section averages */}
      <div class="card">
        <h2 style="margin-top:0;">Average Scores by Section</h2>
        <div class="grid-2" style="margin-bottom:0;">
          {Object.entries(sectionCounts).map(([section, count]) => {
            const avg = count > 0 ? (sectionTotals[section as keyof typeof sectionTotals] / count).toFixed(1) : null;
            return (
              <div style="padding:var(--space-4);background:var(--dashboard-bg);border-radius:var(--radius-md);">
                <p style="font-size:0.85rem;color:var(--muted);margin:0 0 var(--space-1);">{section}</p>
                <p style="font-size:1.5rem;font-weight:700;margin:0;">
                  {avg ? `${avg} / 25` : '—'}
                </p>
                <p style="font-size:0.8rem;color:var(--muted);margin:var(--space-1) 0 0;">
                  {count > 0 ? `${count} attempt${count === 1 ? '' : 's'}` : 'No attempts'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Error breakdown */}
      <div class="grid-2">
        <div class="card">
          <h2 style="margin-top:0;">Error Breakdown</h2>
          {errorStats.length === 0 ? (
            <p style="color:var(--muted);">No errors logged yet. Complete some exam sections to build your profile.</p>
          ) : (
            <ul style="margin:0;padding-left:1.25rem;">
              {errorStats.map((s) => (
                <li style="margin-bottom:var(--space-2);">
                  <strong>{s.type}:</strong> {s.count}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div class="card">
          <h2 style="margin-top:0;">What to Work On</h2>
          {errorStats.length === 0 ? (
            <p style="color:var(--muted);">Complete exams to see personalised recommendations.</p>
          ) : (
            <p>
              Your most frequent error type is <strong>{topError?.type}</strong>.
              Focus your study there.
            </p>
          )}
        </div>
      </div>

      {/* Recent errors table */}
      <div class="card">
        <h2 style="margin-top:0;">Recent Errors</h2>
        {recentErrors.length === 0 ? (
          <p style="color:var(--muted);">No errors yet.</p>
        ) : (
          <div style="overflow-x:auto;">
            <table class="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Original</th>
                  <th>Correction</th>
                  <th>Explanation</th>
                </tr>
              </thead>
              <tbody>
                {recentErrors.map((err) => (
                  <tr>
                    <td>{err.errorType}</td>
                    <td>{err.originalText}</td>
                    <td>{err.correction}</td>
                    <td>{err.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
});

export default insights;
