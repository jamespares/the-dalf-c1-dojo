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
      <h1>Reading Comprehension — {exam.title}</h1>
      <p style="color:var(--muted);">Recommended time: 50 minutes</p>

      <div class="card">
        <h2>Text</h2>
        <div style="white-space:pre-wrap;font-size:1.05rem;line-height:1.7;">{content.reading.text}</div>
      </div>

      <div class="card">
        <h2>Questions</h2>
        <form method="post" action={`/exams/${examId}/reading/save?attempt=${attempt.id}`}>
          {content.reading.questions.map((q: any) => (
            <div class="form-group" style="margin-top:1rem;border-top:1px solid var(--border);padding-top:1rem;">
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
          <button type="submit" class="btn btn-secondary">Save Answers</button>
        </form>
      </div>

      <form method="post" action={`/exams/${examId}/reading/submit?attempt=${attempt.id}`}>
        <button type="submit" class="btn btn-success">Submit for Marking</button>
      </form>
    </Layout>
  );
});

reading.post('/exams/:id/reading/save', authMiddleware(), async (c) => {
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));
  const body = await c.req.parseBody();

  const db = getDb(c.env.DB);
  const [exam] = await db.select().from(exams).where(eq(exams.id, examId));
  if (!exam) return c.notFound();

  const content = exam.generatedContent as any;

  for (const q of content.reading.questions) {
    const val = body[`q_${q.id}`] as string;
    if (val) {
      const [existing] = await db
        .select()
        .from(answers)
        .where(and(eq(answers.attemptId, attemptId), eq(answers.questionId, q.id)));

      if (existing) {
        await db.update(answers).set({ userAnswer: val }).where(eq(answers.id, existing.id));
      } else {
        await db.insert(answers).values({ attemptId, questionId: q.id, userAnswer: val });
      }
    }
  }

  return c.redirect(`/exams/${examId}/reading?attempt=${attemptId}`);
});

reading.post('/exams/:id/reading/submit', authMiddleware(), async (c) => {
  const attemptId = Number(c.req.query('attempt'));
  const db = getDb(c.env.DB);
  await db
    .update(attempts)
    .set({ status: 'pending_marking', submittedAt: new Date() })
    .where(eq(attempts.id, attemptId));
  return c.redirect(`/marking/${attemptId}`);
});

export default reading;
