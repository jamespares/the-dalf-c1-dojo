import { Hono } from 'hono';
import { eq, count, sql } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, errorLogs } from '../db/schema';
import { authMiddleware } from '../auth';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';

const profile = new Hono<{ Bindings: CloudflareBindings }>();

profile.get('/profile', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);

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

  return c.html(
    <Layout title="Profile">
      <Navbar user={user} />
      <h1>Your Profile</h1>

      <div class="grid-2">
        <div class="card">
          <h2>Error Breakdown</h2>
          {errorStats.length === 0 ? (
            <p>No errors logged yet. Complete some exam sections to build your profile.</p>
          ) : (
            <ul>
              {errorStats.map((s) => (
                <li>
                  <strong>{s.type}:</strong> {s.count}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div class="card">
          <h2>Focus Areas</h2>
          {errorStats.length === 0 ? (
            <p>Complete exams to see your weakest areas.</p>
          ) : (
            <p>
              Your most frequent error type is <strong>{errorStats.sort((a, b) => b.count - a.count)[0]?.type}</strong>.
              Focus your study there.
            </p>
          )}
        </div>
      </div>

      <div class="card">
        <h2>Recent Errors</h2>
        {recentErrors.length === 0 ? (
          <p>No errors yet.</p>
        ) : (
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
        )}
      </div>
    </Layout>
  );
});

export default profile;
