import { Hono } from 'hono';
import { eq, count, sql } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, errorLogs } from '../db/schema';
import { authMiddleware } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';
import { formatErrorType, formatSection } from '../lib/formatters';
import { generateAiInsights, type AiInsightsPayload } from '../ai';

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

  const sortedErrors = errorStats.sort((a, b) => b.count - a.count);
  const topError = sortedErrors[0];
  const totalErrors = sortedErrors.reduce((sum, e) => sum + e.count, 0);

  // Build payload for AI insights
  const aiPayload: AiInsightsPayload = {
    completedAttempts: completedCount,
    sectionAverages: Object.entries(sectionCounts).map(([section, count]) => ({
      section: formatSection(section),
      average: count > 0 ? sectionTotals[section as keyof typeof sectionTotals] / count : null,
      count,
    })),
    errorBreakdown: sortedErrors.map((e) => ({ type: formatErrorType(e.type), count: e.count })),
    recentAttempts: userAttempts.slice(0, 20).map((a) => ({
      section: formatSection(a.section),
      score: a.totalScore,
      status: a.status,
      date: a.startedAt ? a.startedAt.toISOString() : '',
    })),
  };

  // Fetch AI insights with fallback
  let aiInsights: {
    summary: string;
    focusAreas: string[];
    trends: { section: string; direction: string; comment: string }[];
    recommendations: string[];
    strengths: string[];
  } | null = null;
  let aiError = false;

  try {
    aiInsights = await generateAiInsights(c, aiPayload);
  } catch {
    aiError = true;
  }

  return c.html(
    <DashboardLayout title="Insights" active="insights" user={user}>
      {/* AI Insights card */}
      <div class="card" style="border-left: 4px solid var(--accent);">
        <h2 style="margin-top: 0;">AI-Powered Insights</h2>
        {aiInsights ? (
          <div class="animate-fade-in">
            <p style="font-size: 1.05rem; line-height: 1.6; margin-bottom: var(--space-6);">
              {aiInsights.summary}
            </p>

            <div class="grid-2" style="margin-bottom: var(--space-6);">
              <div>
                <h3 style="font-size: 1rem; color: var(--base-text-secondary); margin-bottom: var(--space-2);">Strengths</h3>
                <ul style="margin: 0; padding-left: 1.25rem; color: var(--success);">
                  {aiInsights.strengths.map((s) => (
                    <li style="margin-bottom: var(--space-1);">{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style="font-size: 1rem; color: var(--base-text-secondary); margin-bottom: var(--space-2);">Focus Areas</h3>
                <ul style="margin: 0; padding-left: 1.25rem; color: var(--error);">
                  {aiInsights.focusAreas.map((f) => (
                    <li style="margin-bottom: var(--space-1);">{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style="margin-bottom: var(--space-6);">
              <h3 style="font-size: 1rem; color: var(--base-text-secondary); margin-bottom: var(--space-2);">Trends</h3>
              <div class="grid-2">
                {aiInsights.trends.map((t) => (
                  <div
                    style="padding: var(--space-3); background: var(--dashboard-bg); border-radius: var(--radius-md);"
                  >
                    <p style="margin: 0; font-weight: 600;">
                      {t.section}{' '}
                      <span
                        style={
                          t.direction === 'improving'
                            ? 'color: var(--success);'
                            : t.direction === 'declining'
                              ? 'color: var(--error);'
                              : 'color: var(--warning);'
                        }
                      >
                        {t.direction === 'improving' ? '↑' : t.direction === 'declining' ? '↓' : '→'} {t.direction}
                      </span>
                    </p>
                    <p style="margin: var(--space-1) 0 0; font-size: 0.9rem; color: var(--muted);">{t.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style="font-size: 1rem; color: var(--base-text-secondary); margin-bottom: var(--space-2);">Recommendations</h3>
              <ol style="margin: 0; padding-left: 1.25rem;">
                {aiInsights.recommendations.map((r) => (
                  <li style="margin-bottom: var(--space-2);">{r}</li>
                ))}
              </ol>
            </div>
          </div>
        ) : aiError ? (
          <div class="alert alert-warning">
            <p style="margin: 0;">
              AI insights are temporarily unavailable. Showing your local analytics below.
            </p>
          </div>
        ) : (
          <p style="color: var(--muted); margin-bottom: 0;">
            Complete some exam sections to generate personalised AI insights.
          </p>
        )}
      </div>

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
              <p style="font-size:1.25rem;font-weight:600;margin:0;">{formatErrorType(topError.type)}</p>
              <p style="color:var(--muted);margin-bottom:0;">
                {topError.count} errors logged ({totalErrors > 0 ? Math.round((topError.count / totalErrors) * 100) : 0}% of total) — prioritise this area.
              </p>
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
                <p style="font-size:0.85rem;color:var(--muted);margin:0 0 var(--space-1);">{formatSection(section)}</p>
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
            <div style="display: flex; flex-direction: column; gap: var(--space-3);">
              {sortedErrors.map((s) => {
                const pct = totalErrors > 0 ? Math.round((s.count / totalErrors) * 100) : 0;
                return (
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-1);">
                      <span style="font-weight: 500;">{formatErrorType(s.type)}</span>
                      <span style="font-size: 0.85rem; color: var(--muted);">{s.count} ({pct}%)</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: var(--base-border); border-radius: var(--radius-full); overflow: hidden;">
                      <div
                        style={`width: ${pct}%; height: 100%; background: var(--accent); border-radius: var(--radius-full); transition: width 0.4s ease;`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div class="card">
          <h2 style="margin-top:0;">What to Work On</h2>
          {errorStats.length === 0 ? (
            <p style="color:var(--muted);">Complete exams to see personalised recommendations.</p>
          ) : (
            <p>
              Your most frequent error type is <strong>{formatErrorType(topError?.type || '')}</strong>.
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
                    <td>{formatErrorType(err.errorType)}</td>
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
