import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, attempts, answers } from '../db/schema';
import { authMiddleware } from '../auth';
import { getAudio } from '../storage';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';

const listening = new Hono<{ Bindings: CloudflareBindings }>();

listening.get('/exams/:id/listening', authMiddleware(), async (c) => {
  const user = c.get('user');
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));

  const db = getDb(c.env.DB);
  const [exam] = await db.select().from(exams).where(eq(exams.id, examId));
  if (!exam) return c.notFound();

  const content = exam.generatedContent as any;
  const audioKeys = (exam.audioKeys as any) || {};

  // Get or create attempt
  let attempt = attemptId
    ? (await db.select().from(attempts).where(eq(attempts.id, attemptId)))[0]
    : undefined;

  if (!attempt || attempt.userId !== user.id) {
    const [newAttempt] = await db
      .insert(attempts)
      .values({ userId: user.id, examId, section: 'CO', status: 'in_progress' })
      .returning();
    attempt = newAttempt;
  }

  // Load existing answers
  const existingAnswers = await db
    .select()
    .from(answers)
    .where(eq(answers.attemptId, attempt.id));

  const answerMap = new Map(existingAnswers.map((a) => [a.questionId, a.userAnswer]));

  function toAudioUrls(keys: string | string[] | undefined): { url: string; label: string }[] {
    if (!keys) return [];
    const arr = Array.isArray(keys) ? keys : [keys];
    return arr.map((k, i) => ({
      url: `/exams/${examId}/audio/${encodeURIComponent(k)}`,
      label: arr.length > 1 ? `Part ${i + 1}` : '',
    }));
  }

  const longAudioUrls = toAudioUrls(audioKeys.listeningLong);
  const shortAudioUrls = toAudioUrls(audioKeys.listeningShort);

  return c.html(
    <Layout title={`Listening Comprehension — DALF C1`}>
      <Navbar user={user} />
      <h1>Listening Comprehension — {exam.title}</h1>
      <p style="color:var(--muted);">Recommended time: ~40 minutes. Long document played twice. Short documents played once.</p>

      <form method="post" action={`/exams/${examId}/listening/save?attempt=${attempt.id}`}>
        <div class="card">
          <h2>Exercise 1 — Long Document</h2>
          {longAudioUrls.map((a) => (
            <div style="margin-bottom:0.5rem;">
              {a.label && <span style="color:var(--muted);font-size:0.85rem;">{a.label}</span>}
              <audio controls preload="none" data-max-plays={a.label ? undefined : '2'}>
                <source src={a.url} type="audio/mpeg" />
              </audio>
            </div>
          ))}
          {content.listening.longDocument.questions.map((q: any) => (
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
        </div>

        <div class="card">
          <h2>Exercise 2 — Short Documents</h2>
          <p style="color:var(--muted);">Each document is played once only.</p>
          {shortAudioUrls.map((a) => (
            <div style="margin-bottom:0.5rem;">
              {a.label && <span style="color:var(--muted);font-size:0.85rem;">{a.label}</span>}
              <audio controls preload="none">
                <source src={a.url} type="audio/mpeg" />
              </audio>
            </div>
          ))}
          {content.listening.shortDocuments.map((doc: any, idx: number) => (
            <div style="margin-bottom:1.5rem;">
              <h3>Document {idx + 1}</h3>
              {doc.questions.map((q: any) => (
                <div class="form-group" style="margin-top:1rem;">
                  <label>
                    <strong>{q.id}</strong> ({q.points} pt{q.points > 1 ? 's' : ''}) {q.text}
                  </label>
                  {q.type === 'mcq' && q.options ? (
                    q.options.map((opt: string, optIdx: number) => (
                      <label class="mcq-option">
                        <input
                          type="radio"
                          name={`q_${q.id}`}
                          value={String.fromCharCode(65 + optIdx)}
                          checked={answerMap.get(q.id) === String.fromCharCode(65 + optIdx)}
                        />
                        {opt}
                      </label>
                    ))
                  ) : (
                    <textarea name={`q_${q.id}`}>{answerMap.get(q.id) || ''}</textarea>
                  )}
                </div>
              ))}
            </div>
          ))}
          <button type="submit" class="btn btn-secondary">Save Answers</button>
        </div>
      </form>

      <form method="post" action={`/exams/${examId}/listening/submit?attempt=${attempt.id}`}>
        <button type="submit" class="btn btn-success">Submit for Marking</button>
      </form>
    </Layout>
  );
});

listening.post('/exams/:id/listening/save', authMiddleware(), async (c) => {
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));
  const body = await c.req.parseBody();

  const db = getDb(c.env.DB);
  const [exam] = await db.select().from(exams).where(eq(exams.id, examId));
  if (!exam) return c.notFound();

  const content = exam.generatedContent as any;
  const allQuestions = [
    ...content.listening.longDocument.questions,
    ...content.listening.shortDocuments.flatMap((d: any) => d.questions),
  ];

  for (const q of allQuestions) {
    const val = body[`q_${q.id}`] as string;
    if (val) {
      const [existing] = await db
        .select()
        .from(answers)
        .where(and(eq(answers.attemptId, attemptId), eq(answers.questionId, q.id)));

      if (existing) {
        await db
          .update(answers)
          .set({ userAnswer: val })
          .where(eq(answers.id, existing.id));
      } else {
        await db.insert(answers).values({ attemptId, questionId: q.id, userAnswer: val });
      }
    }
  }

  return c.redirect(`/exams/${examId}/listening?attempt=${attemptId}`);
});

listening.post('/exams/:id/listening/submit', authMiddleware(), async (c) => {
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));

  const db = getDb(c.env.DB);
  await db
    .update(attempts)
    .set({ status: 'pending_marking', submittedAt: new Date() })
    .where(eq(attempts.id, attemptId));

  return c.redirect(`/marking/${attemptId}`);
});

// Audio proxy
listening.get('/exams/:id/audio/:key', authMiddleware(), async (c) => {
  const key = decodeURIComponent(c.req.param('key') || '');
  const obj = await getAudio(c, key);
  if (!obj) return c.notFound();
  c.header('Content-Type', obj.httpMetadata?.contentType || 'audio/mpeg');
  return c.body(await obj.arrayBuffer());
});

export default listening;
