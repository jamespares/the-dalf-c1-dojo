import { Hono } from 'hono';
import { eq, desc } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, exams } from '../db/schema';
import { authMiddleware, getCurrentUser } from '../auth';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';

const dashboard = new Hono<{ Bindings: CloudflareBindings }>();

dashboard.get('/', async (c) => {
  const user = await getCurrentUser(c);
  if (!user) return c.redirect('/login');
  return c.redirect('/dashboard');
});

dashboard.get('/dashboard', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);

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

  const sectionCounts = { CO: 0, CE: 0, PE: 0, PO: 0 };
  const sectionTotals = { CO: 0, CE: 0, PE: 0, PO: 0 };

  for (const row of recentAttempts) {
    if (row.attempt.totalScore != null) {
      sectionCounts[row.attempt.section as keyof typeof sectionCounts]++;
      sectionTotals[row.attempt.section as keyof typeof sectionTotals] += row.attempt.totalScore;
    }
  }

  return c.html(
    <Layout title="Dashboard">
      <Navbar user={user} />
      <h1>Dashboard</h1>
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
              </tr>
            </thead>
            <tbody>
              {recentAttempts.map((row) => (
                <tr>
                  <td>{row.exam?.title || 'Unknown'}</td>
                  <td>{row.attempt.section}</td>
                  <td>
                    {row.attempt.totalScore != null ? (
                      <span class={`score-badge ${row.attempt.totalScore >= 5 ? 'score-pass' : 'score-fail'}`}>
                        {row.attempt.totalScore.toFixed(1)} / 25
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{row.attempt.status}</td>
                  <td>{row.attempt.startedAt ? new Date(row.attempt.startedAt).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div class="grid-2">
        <div class="card">
          <h2>Average Scores</h2>
          {Object.entries(sectionCounts).map(([section, count]) => (
            <p>
              <strong>{section}:</strong>{' '}
              {count > 0 ? `${(sectionTotals[section as keyof typeof sectionTotals] / count).toFixed(1)} / 25` : 'No attempts'}
            </p>
          ))}
        </div>
        <div class="card">
          <h2>Quick Links</h2>
          <p><a href="/exams" class="btn btn-primary">Browse Exams</a></p>
          <p><a href="/profile" class="btn btn-secondary">View Profile</a></p>
        </div>
      </div>
    </Layout>
  );
});

export default dashboard;
