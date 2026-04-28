import { Hono } from 'hono';
import { eq, count, sql } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, errorLogs } from '../db/schema';
import { authMiddleware } from '../auth';
import { Layout } from '../components/Layout';
import { detectLang, getDict, type Lang, type Dict } from '../lib/i18n';

const profile = new Hono();

profile.get('/profile', authMiddleware(), async (c) => {
  const user = c.get('user');
  const lang = detectLang(c);
  const dict = getDict(lang);
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
    <Layout title={dict.profileTitle} user={user} lang={lang}>
      <h1>{dict.profileYourProfile}</h1>

      <div class="grid-2">
        <div class="card">
          <h2>{dict.profileErrorBreakdown}</h2>
          {errorStats.length === 0 ? (
            <p>{dict.profileNoErrors}</p>
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
          <h2>{dict.profileFocusAreas}</h2>
          {errorStats.length === 0 ? (
            <p>{dict.profileNoFocus}</p>
          ) : (
            <p>
              {dict.profileMostFrequent}<strong>{errorStats.sort((a, b) => b.count - a.count)[0]?.type}</strong>.
              {dict.profileFocusStudy}
            </p>
          )}
        </div>
      </div>

      <div class="card">
        <h2>{dict.profileRecentErrors}</h2>
        {recentErrors.length === 0 ? (
          <p>{dict.profileNoErrorsYet}</p>
        ) : (
          <table class="table">
            <thead>
              <tr>
                <th>{dict.profileType}</th>
                <th>{dict.profileOriginal}</th>
                <th>{dict.profileCorrection}</th>
                <th>{dict.profileExplanation}</th>
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
