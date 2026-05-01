import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, exams, answers } from '../db/schema';
import { authMiddleware } from '../auth';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';

const review = new Hono<{ Bindings: CloudflareBindings }>();

review.get('/review/:attemptId', authMiddleware(), async (c) => {
  const user = c.get('user');
  const attemptId = Number(c.req.param('attemptId'));

  const db = getDb(c.env.DB);
  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId));
  if (!attempt || attempt.userId !== user.id) return c.notFound();

  const [exam] = await db.select().from(exams).where(eq(exams.id, attempt.examId));
  if (!exam) return c.notFound();

  const content = exam.generatedContent as any;
  const userAnswers = await db
    .select()
    .from(answers)
    .where(eq(answers.attemptId, attemptId));

  const answerMap = new Map(userAnswers.map((a) => [a.questionId, a]));
  const scores = (attempt.scores as any) || {};

  return c.html(
    <Layout title="Review — ">
      <Navbar user={user} />
      <h1>Review — {exam.title} ({attempt.section})</h1>

      <div class="card">
        <h2>Score</h2>
        {attempt.totalScore != null ? (
          <div>
            <span class={`score-badge ${attempt.totalScore >= 5 ? 'score-pass' : 'score-fail'}`} style="font-size:1.5rem;">
              {attempt.totalScore.toFixed(1)} / 25
            </span>
            <p style="margin-top:0.5rem;">
              {attempt.totalScore >= 5 ? '✅ Section passed' : '❌ Section failed (minimum 5/25 required)'}
            </p>
          </div>
        ) : (
          <p>Not marked yet.</p>
        )}

        {Object.keys(scores).length > 0 && (
          <div style="margin-top:1rem;">
            <h3>Breakdown</h3>
            <pre style="background:#f8f9fa;padding:1rem;border-radius:var(--radius);overflow-x:auto;">
              {JSON.stringify(scores, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {attempt.section === 'CO' && (
        <div class="card">
          <h2>Listening Answers</h2>
          {content.listening.longDocument.questions.map((q: any) => {
            const ans = answerMap.get(q.id);
            return (
              <div style="margin-bottom:1rem;padding:1rem;background:#f8f9fa;border-radius:var(--radius);">
                <p><strong>{q.id}</strong> {q.text}</p>
                <p><strong>Your answer:</strong> {ans?.userAnswer || '—'}</p>
                <p><strong>Score:</strong> {ans?.aiScore != null ? `${ans.aiScore} pt(s)` : '—'}</p>
                {ans?.aiFeedback && <p><strong>Feedback:</strong> {ans.aiFeedback}</p>}
              </div>
            );
          })}
          {content.listening.shortDocuments.map((doc: any, idx: number) => (
            <div>
              <h3>Short Document {idx + 1}</h3>
              {doc.questions.map((q: any) => {
                const ans = answerMap.get(q.id);
                return (
                  <div style="margin-bottom:1rem;padding:1rem;background:#f8f9fa;border-radius:var(--radius);">
                    <p><strong>{q.id}</strong> {q.text}</p>
                    <p><strong>Your answer:</strong> {ans?.userAnswer || '—'}</p>
                    <p><strong>Score:</strong> {ans?.aiScore != null ? `${ans.aiScore} pt(s)` : '—'}</p>
                    {ans?.aiFeedback && <p><strong>Feedback:</strong> {ans.aiFeedback}</p>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {attempt.section === 'CE' && (
        <div class="card">
          <h2>Reading Answers</h2>
          {content.reading.questions.map((q: any) => {
            const ans = answerMap.get(q.id);
            return (
              <div style="margin-bottom:1rem;padding:1rem;background:#f8f9fa;border-radius:var(--radius);">
                <p><strong>{q.id}</strong> {q.text}</p>
                <p><strong>Your answer:</strong> {ans?.userAnswer || '—'}</p>
                <p><strong>Score:</strong> {ans?.aiScore != null ? `${ans.aiScore} pt(s)` : '—'}</p>
                {ans?.aiFeedback && <p><strong>Feedback:</strong> {ans.aiFeedback}</p>}
              </div>
            );
          })}
        </div>
      )}

      {attempt.section === 'PE' && (
        <div class="card">
          <h2>Writing Feedback</h2>
          <div style="margin-bottom:1.5rem;">
            <h3>Synthèse</h3>
            <p><strong>Your text:</strong></p>
            <div style="white-space:pre-wrap;background:#fff;padding:1rem;border:1px solid var(--border);border-radius:var(--radius);">
              {answerMap.get('synthese')?.userAnswer || '—'}
            </div>
            {answerMap.get('synthese')?.aiFeedback && (
              <div style="margin-top:0.5rem;padding:1rem;background:#e7f3ff;border-radius:var(--radius);">
                <strong>AI Feedback:</strong>
                <div style="white-space:pre-wrap;">{answerMap.get('synthese')?.aiFeedback}</div>
              </div>
            )}
          </div>
          <div>
            <h3>Essai argumenté</h3>
            <p><strong>Your text:</strong></p>
            <div style="white-space:pre-wrap;background:#fff;padding:1rem;border:1px solid var(--border);border-radius:var(--radius);">
              {answerMap.get('essai')?.userAnswer || '—'}
            </div>
            {answerMap.get('essai')?.aiFeedback && (
              <div style="margin-top:0.5rem;padding:1rem;background:#e7f3ff;border-radius:var(--radius);">
                <strong>AI Feedback:</strong>
                <div style="white-space:pre-wrap;">{answerMap.get('essai')?.aiFeedback}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {attempt.section === 'PO' && (
        <div class="card">
          <h2>Speaking Feedback</h2>
          {answerMap.get('speaking')?.audioKey && (
            <p>Recording submitted.</p>
          )}
          {answerMap.get('speaking')?.aiFeedback && (
            <div style="padding:1rem;background:#e7f3ff;border-radius:var(--radius);">
              <strong>AI Feedback:</strong>
              <div style="white-space:pre-wrap;">{answerMap.get('speaking')?.aiFeedback}</div>
            </div>
          )}
          {(attempt.aiFeedback as any)?.transcription && (
            <div style="margin-top:1rem;">
              <h3>Transcription</h3>
              <div style="white-space:pre-wrap;background:#fff;padding:1rem;border:1px solid var(--border);border-radius:var(--radius);">
                {(attempt.aiFeedback as any).transcription}
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
});

export default review;
