import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, attempts, answers } from '../db/schema';
import { authMiddleware } from '../auth';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';

const writing = new Hono<{ Bindings: CloudflareBindings }>();

writing.get('/exams/:id/writing', authMiddleware(), async (c) => {
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
      .values({ userId: user.id, examId, section: 'PE', status: 'in_progress' })
      .returning();
    attempt = newAttempt;
  }

  const existingAnswers = await db
    .select()
    .from(answers)
    .where(eq(answers.attemptId, attempt.id));

  const answerMap = new Map(existingAnswers.map((a) => [a.questionId, a.userAnswer]));

  return c.html(
    <Layout title={`Writing Production — DALF C1`}>
      <Navbar user={user} />
      <div class="container">
      <h1>Writing Production — {exam.title.replace(/^\[static:[^\]]+\]\s*/, '').replace(/^\[static\]\s*/, '')}</h1>
      <p style="color:var(--muted);margin-bottom:var(--space-6);">Recommended time: 2h30</p>

      <div class="card">
        <h2>Dossier</h2>
        {content.writing.dossier.map((doc: any, idx: number) => (
          <div class="dossier-doc">
            <h3>Document {idx + 1}: {doc.title}</h3>
            <div class="reading-passage">{doc.text}</div>
          </div>
        ))}
        <div style="margin-top:var(--space-5);padding:var(--space-5);background:var(--base-bg);border-radius:var(--radius-lg);border:1px solid var(--base-border);line-height:1.6;">
          <strong>Problématique:</strong> {content.writing.problematique}
        </div>
      </div>

      <form method="post" action={`/exams/${examId}/writing/save?attempt=${attempt.id}`}>
        <div class="card">
          <h2>Part 1 — Synthèse (220-240 words)</h2>
          <p style="color:var(--muted);">{content.writing.synthesisPrompt}</p>
          <textarea
            class="essay-area"
            name="q_synthese"
            id="synthese"
            oninput="document.getElementById('synCount').textContent = this.value.trim().split(/\\s+/).filter(Boolean).length + ' words'"
          >{answerMap.get('synthese') || ''}</textarea>
          <div class="word-count" id="synCount">
            {(answerMap.get('synthese') || '').trim().split(/\s+/).filter(Boolean).length} words
          </div>
        </div>

        <div class="card">
          <h2>Part 2 — Essai argumenté (250+ words)</h2>
          <p style="color:var(--muted);">{content.writing.essayPrompt}</p>
          <textarea
            class="essay-area"
            name="q_essai"
            id="essai"
            oninput="document.getElementById('essCount').textContent = this.value.trim().split(/\\s+/).filter(Boolean).length + ' words'"
          >{answerMap.get('essai') || ''}</textarea>
          <div class="word-count" id="essCount">
            {(answerMap.get('essai') || '').trim().split(/\s+/).filter(Boolean).length} words
          </div>
        </div>

        <button type="submit" class="btn btn-secondary">Save</button>
      </form>

      <form method="post" action={`/exams/${examId}/writing/submit?attempt=${attempt.id}`} class="exam-actions">
        <button type="submit" class="btn btn-success">Submit for Marking</button>
      </form>
      </div>
    </Layout>
  );
});

writing.post('/exams/:id/writing/save', authMiddleware(), async (c) => {
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));
  const body = await c.req.parseBody();

  const db = getDb(c.env.DB);
  const fields = [
    { id: 'synthese', val: body.q_synthese as string },
    { id: 'essai', val: body.q_essai as string },
  ];

  for (const f of fields) {
    if (f.val) {
      const [existing] = await db
        .select()
        .from(answers)
        .where(and(eq(answers.attemptId, attemptId), eq(answers.questionId, f.id)));

      if (existing) {
        await db.update(answers).set({ userAnswer: f.val }).where(eq(answers.id, existing.id));
      } else {
        await db.insert(answers).values({ attemptId, questionId: f.id, userAnswer: f.val });
      }
    }
  }

  return c.redirect(`/exams/${examId}/writing?attempt=${attemptId}`);
});

writing.post('/exams/:id/writing/submit', authMiddleware(), async (c) => {
  const attemptId = Number(c.req.query('attempt'));
  const db = getDb(c.env.DB);
  await db
    .update(attempts)
    .set({ status: 'pending_marking', submittedAt: new Date() })
    .where(eq(attempts.id, attemptId));
  return c.redirect(`/marking/${attemptId}`);
});

export default writing;
