import { Hono } from 'hono';
import { eq, sql } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, users, attempts, errorLogs } from '../db/schema';
import { adminMiddleware } from '../auth';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import {
  findReusableExam,
  generateExamContent,
  storeExam,
  generateAndStoreAudio,
} from '../exam-generation';

const admin = new Hono<{ Bindings: CloudflareBindings }>();

const THEMES = [
  'Environment and sustainable development',
  'Urbanism and city transformation',
  'Culture and arts',
  'Social issues',
  'Science and technology',
  'Economics and society',
  'Family and education',
  'Work and wellbeing',
  'Digital society',
  'Consumption and ethics',
];

const themeLabels: Record<string, string> = {
  'Environment and sustainable development': 'Environment & Sustainable Development',
  'Urbanism and city transformation': 'Urbanism & City Transformation',
  'Culture and arts': 'Culture & Arts',
  'Social issues': 'Social Issues',
  'Science and technology': 'Science & Technology',
  'Economics and society': 'Economics & Society',
  'Family and education': 'Family & Education',
  'Work and wellbeing': 'Work & Wellbeing',
  'Digital society': 'Digital Society',
  'Consumption and ethics': 'Consumption & Ethics',
};

admin.get('/admin/generate', adminMiddleware(), (c) => {
  const user = c.get('user');
  return c.html(
    <Layout title="Generate Exam">
      <Navbar user={user} />
      <h1>Generate New Exam</h1>
      <div class="card" style="max-width:500px;">
        <form method="post" action="/admin/generate">
          <div class="form-group">
            <label>Theme</label>
            <select name="theme" required>
              <option value="">Select a theme...</option>
              {THEMES.map((t) => (
                <option value={t}>{themeLabels[t]}</option>
              ))}
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Generate Exam</button>
        </form>
        <p style="color:var(--muted);margin-top:1rem;">
          This may take 30-60 seconds as AI generates all 4 sections plus audio.
        </p>
      </div>
    </Layout>
  );
});

admin.post('/admin/generate', adminMiddleware(), async (c) => {
  const user = c.get('user');
  const body = await c.req.parseBody<{ theme: string }>();
  const theme = body.theme;
  const db = getDb(c.env.DB);

  // Check for reusable exam before burning tokens
  const reusable = await findReusableExam(db, user.id, theme);
  if (reusable) {
    return c.redirect('/exams?cached=1');
  }

  try {
    const content = await generateExamContent(c, theme);
    const exam = await storeExam(db, theme, content);
    const audioKeys = await generateAndStoreAudio(c, exam.id, content);

    await db
      .update(exams)
      .set({ audioKeys: audioKeys as any })
      .where(eq(exams.id, exam.id));

    return c.redirect('/exams');
  } catch (err: any) {
    console.error('Exam generation failed:', err);
    return c.html(
      <Layout title="Error">
        <Navbar user={c.get('user')} />
        <div class="card">
          <div class="alert alert-danger">Failed to generate exam: {err.message}</div>
          <a href="/admin/generate" class="btn btn-secondary">Try again</a>
        </div>
      </Layout>,
      500
    );
  }
});

// ---------------------------------------------------------------------------
// User data repair — fixes damage from the pre-2026-10 marking bug where every
// reload of /marking/:id spawned a duplicate run that re-inserted error logs.
// ---------------------------------------------------------------------------

async function getUserErrorReport(db: any, userId: number) {
  const attemptRows = await db
    .select({
      id: attempts.id,
      section: attempts.section,
      status: attempts.status,
      totalScore: attempts.totalScore,
      startedAt: attempts.startedAt,
    })
    .from(attempts)
    .where(eq(attempts.userId, userId));

  const errorRows = await db
    .select({
      attemptId: errorLogs.attemptId,
      count: sql<number>`count(*)`,
    })
    .from(errorLogs)
    .where(eq(errorLogs.userId, userId))
    .groupBy(errorLogs.attemptId);

  const errByAttempt = new Map(errorRows.map((r: any) => [r.attemptId, r.count]));
  return attemptRows.map((a: any) => ({ ...a, errorCount: errByAttempt.get(a.id) ?? 0 }));
}

admin.get('/admin/user-data', adminMiddleware(), async (c) => {
  const user = c.get('user');
  const email = (c.req.query('email') || '').trim();
  const db = getDb(c.env.DB);

  let report: any[] | null = null;
  let target: any = null;
  if (email) {
    [target] = await db
      .select()
      .from(users)
      .where(sql`lower(${users.email}) = lower(${email})`)
      .limit(1);
    if (target) report = await getUserErrorReport(db, target.id);
  }

  return c.html(
    <Layout title="User Data Repair">
      <Navbar user={user} />
      <div class="container">
        <h1>User Data Repair</h1>
        <div class="card" style="max-width:640px;">
          <form method="get" action="/admin/user-data">
            <div class="form-group">
              <label>User email</label>
              <input type="email" name="email" value={email} required style="width:100%;padding:0.5rem;" />
            </div>
            <button type="submit" class="btn btn-primary">Inspect</button>
          </form>
        </div>

        {email && !target && (
          <div class="card"><div class="alert alert-danger">No user found for {email}.</div></div>
        )}

        {target && report && (
          <div class="card">
            <h2 style="margin-top:0;">{target.email} (user #{target.id})</h2>
            <p>Total error logs: <strong>{report.reduce((s, r) => s + r.errorCount, 0)}</strong></p>
            <div class="table-wrap">
              <table class="table">
                <thead>
                  <tr><th>Attempt</th><th>Section</th><th>Status</th><th>Score</th><th>Error logs</th></tr>
                </thead>
                <tbody>
                  {report.map((r) => (
                    <tr>
                      <td>#{r.id}</td>
                      <td>{r.section}</td>
                      <td>{r.status}</td>
                      <td>{r.totalScore != null ? r.totalScore : '—'}</td>
                      <td>{r.errorCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <form method="post" action="/admin/repair-user" style="margin-top:var(--space-4);">
              <input type="hidden" name="email" value={email} />
              <button type="submit" class="btn btn-danger">
                Repair: dedupe error logs, drop partial-run logs, unstick stale marking
              </button>
            </form>
            <p style="color:var(--muted);font-size:0.85rem;margin-top:var(--space-3);">
              Repair keeps exactly one copy of each distinct error per completed attempt, deletes
              error logs from attempts that never completed marking, and resets attempts stuck in
              "marking" for over 10 minutes back to pending so they can be re-marked. Scores and
              answers are not touched.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
});

admin.post('/admin/repair-user', adminMiddleware(), async (c) => {
  const user = c.get('user');
  const body = await c.req.parseBody();
  const email = String(body.email || '').trim();
  const db = getDb(c.env.DB);

  const [target] = await db
    .select()
    .from(users)
    .where(sql`lower(${users.email}) = lower(${email})`)
    .limit(1);
  if (!target) {
    return c.html(
      <Layout title="Repair">
        <Navbar user={user} />
        <div class="container"><div class="card"><div class="alert alert-danger">No user found for {email}.</div></div></div>
      </Layout>,
      404
    );
  }

  const uid = target.id;
  const before = await getUserErrorReport(db, uid);
  const beforeTotal = before.reduce((s: number, r: { errorCount: number }) => s + r.errorCount, 0);

  // 1. Drop error logs from attempts that never completed marking (partial runs).
  await db.run(sql`
    DELETE FROM error_logs
    WHERE user_id = ${uid}
      AND attempt_id IN (SELECT id FROM attempts WHERE user_id = ${uid} AND status != 'completed')
  `);

  // 2. Dedupe exact duplicate error logs within each completed attempt
  //    (keep the earliest row of each identical group).
  await db.run(sql`
    DELETE FROM error_logs
    WHERE user_id = ${uid}
      AND id NOT IN (
        SELECT MIN(id) FROM error_logs
        WHERE user_id = ${uid}
        GROUP BY attempt_id, error_type, original_text, correction, explanation
      )
  `);

  // 3. Unstick attempts abandoned mid-marking (older than 10 minutes, or no timestamp).
  //    NB: drizzle 'timestamp' columns store unix seconds.
  const staleBefore = Math.floor(Date.now() / 1000) - 10 * 60;
  const unstuck = await db
    .update(attempts)
    .set({ status: 'pending_marking' })
    .where(
      sql`${attempts.userId} = ${uid}
        AND ${attempts.status} = 'marking'
        AND (${attempts.markingStartedAt} IS NULL OR ${attempts.markingStartedAt} < ${staleBefore})`
    )
    .returning({ id: attempts.id });

  const after = await getUserErrorReport(db, uid);
  const afterTotal = after.reduce((s: number, r: { errorCount: number }) => s + r.errorCount, 0);

  return c.html(
    <Layout title="Repair Complete">
      <Navbar user={user} />
      <div class="container">
        <div class="card" style="max-width:640px;">
          <h1 style="margin-top:0;">Repair complete</h1>
          <p><strong>{target.email}</strong></p>
          <ul>
            <li>Error logs: <strong>{beforeTotal}</strong> → <strong>{afterTotal}</strong> ({beforeTotal - afterTotal} removed)</li>
            <li>Attempts unstuck from "marking": <strong>{unstuck.length}</strong></li>
          </ul>
          <p style="color:var(--muted);">
            Attempts still in "pending_marking" or "marking_failed" can be re-marked by the student
            from their dashboard (Check / Retry). Marking is now single-flight and idempotent, so
            re-marking replaces error logs instead of stacking them.
          </p>
          <a href={`/admin/user-data?email=${encodeURIComponent(email)}`} class="btn btn-secondary">Back to report</a>
        </div>
      </div>
    </Layout>
  );
});

export default admin;
