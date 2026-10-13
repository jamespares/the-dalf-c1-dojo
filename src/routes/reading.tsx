import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, attempts, answers } from '../db/schema';
import { authMiddleware } from '../auth';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';

const reading = new Hono<{ Bindings: CloudflareBindings }>();

reading.get('/exams/:id/reading', authMiddleware(), async (c) => {
  const user = c.get('user');
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));

  const db = getDb(c.env.DB);
  const [exam] = await db.select().from(exams).where(eq(exams.id, examId));
  if (!exam) return c.notFound();

  const content = exam.generatedContent as any;

  let attempt = attemptId
    ? (await db.select().from(attempts).where(eq(attempts.id, attemptId)))[0]
    : undefined;

  if (!attempt || attempt.userId !== user.id) {
    const [newAttempt] = await db
      .insert(attempts)
      .values({ userId: user.id, examId, section: 'CE', status: 'in_progress' })
      .returning();
    attempt = newAttempt;
  }

  const existingAnswers = await db
    .select()
    .from(answers)
    .where(eq(answers.attemptId, attempt.id));

  const answerMap = new Map(existingAnswers.map((a) => [a.questionId, a.userAnswer]));

  return c.html(
    <Layout title={`Reading Comprehension — DALF C1`}>
      <Navbar user={user} />
      <div class="container">
      <h1>Reading Comprehension — {exam.title.replace(/^\[static:[^\]]+\]\s*/, '').replace(/^\[static\]\s*/, '')}</h1>
      <p style="color:var(--muted);margin-bottom:var(--space-6);">Recommended time: 50 minutes</p>

      {c.req.query('error') === 'empty' && (
        <div class="alert alert-danger">
          No answers were found for this attempt. Please answer at least one question before submitting for marking.
        </div>
      )}

      <div class="card">
        <h2>Text</h2>
        <div class="reading-passage">{content.reading.text}</div>
      </div>

      <div class="card">
        <h2>Questions</h2>
        <form method="post" action={`/exams/${examId}/reading/save?attempt=${attempt.id}`}>
          {content.reading.questions.map((q: any) => (
            <div class="form-group" style="margin-top:var(--space-5);border-top:1px solid var(--base-border);padding-top:var(--space-5);">
              <label>
                <strong>{q.id}</strong> ({q.points} pt{q.points > 1 ? 's' : ''}) {q.text}
              </label>
              {q.type === 'mcq' && q.options ? (
                q.options.map((opt: string, idx: number) => (
                  <label class="mcq-option">
                    <input
                      type="radio"
                      name={`q_${q.id}`}
                      value={String.fromCharCode(65 + idx)}
                      checked={answerMap.get(q.id) === String.fromCharCode(65 + idx)}
                    />
                    {opt}
                  </label>
                ))
              ) : q.type === 'tf' ? (
                <select name={`q_${q.id}`}>
                  <option value="">Select...</option>
                  <option value="Vrai" selected={answerMap.get(q.id) === 'Vrai'}>Vrai</option>
                  <option value="Faux" selected={answerMap.get(q.id) === 'Faux'}>Faux</option>
                  <option value="Non mentionné" selected={answerMap.get(q.id) === 'Non mentionné'}>Non mentionné</option>
                </select>
              ) : (
                <textarea name={`q_${q.id}`}>{answerMap.get(q.id) || ''}</textarea>
              )}
            </div>
          ))}
          <div class="exam-actions" style="display:flex;gap:var(--space-4);justify-content:flex-end;flex-wrap:wrap;">
            <button type="submit" class="btn btn-secondary">Save Answers</button>
            <button
              type="submit"
              class="btn btn-success"
              formaction={`/exams/${examId}/reading/submit?attempt=${attempt.id}`}
            >
              Submit for Marking
            </button>
          </div>
        </form>
      </div>
      </div>
    </Layout>
  );
});

async function saveReadingAnswers(
  db: ReturnType<typeof getDb>,
  content: any,
  attemptId: number,
  body: Record<string, unknown>
): Promise<void> {
  for (const q of content.reading.questions as any[]) {
    const val = body[`q_${q.id}`];
    if (typeof val === 'string' && val.trim()) {
      const [existing] = await db
        .select()
        .from(answers)
        .where(and(eq(answers.attemptId, attemptId), eq(answers.questionId, q.id)));

      if (existing) {
        // Clear any prior mark when the answer text changes, so a resubmit
        // re-marks it instead of resuming with a stale score.
        await db.update(answers).set({ userAnswer: val, aiScore: null, aiFeedback: null }).where(eq(answers.id, existing.id));
      } else {
        await db.insert(answers).values({ attemptId, questionId: q.id, userAnswer: val });
      }
    }
  }
}

async function countSavedAnswers(db: ReturnType<typeof getDb>, attemptId: number): Promise<number> {
  const saved = await db.select().from(answers).where(eq(answers.attemptId, attemptId));
  return saved.filter((a) => a.userAnswer && a.userAnswer.trim()).length;
}

reading.post('/exams/:id/reading/save', authMiddleware(), async (c) => {
  const user = c.get('user');
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));

  const db = getDb(c.env.DB);
  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId));
  if (!attempt || attempt.userId !== user.id) return c.notFound();

  const [exam] = await db.select().from(exams).where(eq(exams.id, examId));
  if (!exam) return c.notFound();

  const body = await c.req.parseBody();
  await saveReadingAnswers(db, exam.generatedContent, attemptId, body);

  return c.redirect(`/exams/${examId}/reading?attempt=${attemptId}`);
});

reading.post('/exams/:id/reading/submit', authMiddleware(), async (c) => {
  const user = c.get('user');
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));

  const db = getDb(c.env.DB);
  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId));
  if (!attempt || attempt.userId !== user.id) return c.notFound();

  const [exam] = await db.select().from(exams).where(eq(exams.id, examId));
  if (!exam) return c.notFound();

  // The submit button posts the full answer form (formaction), so persist
  // everything first — answers entered since the last manual save must not be lost.
  const body = await c.req.parseBody();
  await saveReadingAnswers(db, exam.generatedContent, attemptId, body);

  if ((await countSavedAnswers(db, attemptId)) === 0) {
    return c.redirect(`/exams/${examId}/reading?attempt=${attemptId}&error=empty`);
  }

  await db
    .update(attempts)
    .set({ status: 'pending_marking', submittedAt: new Date() })
    .where(eq(attempts.id, attemptId));
  return c.redirect(`/marking/${attemptId}`);
});

export default reading;
