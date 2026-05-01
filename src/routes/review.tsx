import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, exams, answers } from '../db/schema';
import { authMiddleware } from '../auth';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';

const review = new Hono<{ Bindings: CloudflareBindings }>();

function ScoreBreakdown({ scores, totalScore, section }: { scores: any; totalScore: number | null; section: string }) {
  if (!scores || Object.keys(scores).length === 0) return null;

  if (section === 'CO' || section === 'CE') {
    return (
      <div class="score-breakdown">
        <div class="score-row">
          <span>Raw score</span>
          <span>{scores.raw != null ? `${scores.raw} / ${scores.max}` : '—'}</span>
        </div>
        <div class="score-row score-row-total">
          <span>Scaled score</span>
          <span>{totalScore != null ? `${totalScore.toFixed(1)} / 25` : '—'}</span>
        </div>
      </div>
    );
  }

  if (section === 'PE') {
    const syn = scores.synthese;
    const ess = scores.essai;
    return (
      <div class="score-breakdown">
        {syn && (
          <div class="score-row">
            <span>Synthèse</span>
            <span>{syn.total != null ? `${syn.total} / 12.5` : '—'}</span>
          </div>
        )}
        {ess && (
          <div class="score-row">
            <span>Essai argumenté</span>
            <span>{ess.total != null ? `${ess.total} / 12.5` : '—'}</span>
          </div>
        )}
        <div class="score-row score-row-total">
          <span>Total</span>
          <span>{totalScore != null ? `${totalScore.toFixed(1)} / 25` : '—'}</span>
        </div>
      </div>
    );
  }

  if (section === 'PO') {
    return (
      <div class="score-breakdown">
        <div class="score-row score-row-total">
          <span>Total</span>
          <span>{scores.total != null ? `${scores.total} / 25` : '—'}</span>
        </div>
      </div>
    );
  }

  return null;
}

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

  const sectionNames: Record<string, string> = {
    CO: 'Listening Comprehension',
    CE: 'Reading Comprehension',
    PE: 'Writing Production',
    PO: 'Oral Production',
  };

  return c.html(
    <Layout title={`Review — ${exam.title}`}>
      <Navbar user={user} />
      <div class="container">
        <h1>Review — {exam.title}</h1>
        <p style="color:var(--muted);">{sectionNames[attempt.section] || attempt.section}</p>

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
              <ScoreBreakdown scores={scores} totalScore={attempt.totalScore} section={attempt.section} />
            </div>
          ) : (
            <p>Not marked yet.</p>
          )}
        </div>

        {attempt.section === 'CO' && (
          <div class="card">
            <h2>Listening Answers</h2>
            {content.listening.longDocument.questions.map((q: any) => {
              const ans = answerMap.get(q.id);
              return (
                <div style="margin-bottom:1rem;padding:1rem;background:#f8f9fa;border-radius:var(--radius-lg);">
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
                    <div style="margin-bottom:1rem;padding:1rem;background:#f8f9fa;border-radius:var(--radius-lg);">
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
                <div style="margin-bottom:1rem;padding:1rem;background:#f8f9fa;border-radius:var(--radius-lg);">
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
              <div style="white-space:pre-wrap;background:#fff;padding:1rem;border:1px solid var(--base-border);border-radius:var(--radius-lg);">
                {answerMap.get('synthese')?.userAnswer || '—'}
              </div>
              {answerMap.get('synthese')?.aiFeedback && (
                <div style="margin-top:0.5rem;padding:1rem;background:#e7f3ff;border-radius:var(--radius-lg);">
                  <strong>AI Feedback:</strong>
                  <div style="white-space:pre-wrap;">{answerMap.get('synthese')?.aiFeedback}</div>
                </div>
              )}
            </div>
            <div>
              <h3>Essai argumenté</h3>
              <p><strong>Your text:</strong></p>
              <div style="white-space:pre-wrap;background:#fff;padding:1rem;border:1px solid var(--base-border);border-radius:var(--radius-lg);">
                {answerMap.get('essai')?.userAnswer || '—'}
              </div>
              {answerMap.get('essai')?.aiFeedback && (
                <div style="margin-top:0.5rem;padding:1rem;background:#e7f3ff;border-radius:var(--radius-lg);">
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
            {(() => {
              const speakingAns = answerMap.get('speaking');
              if (!speakingAns?.audioKey) return null;
              return (
                <div class="recording-playback">
                  <p style="margin:0 0 var(--space-3);font-weight:500;">Your recording</p>
                  <audio controls src={`/exams/${exam.id}/audio/${encodeURIComponent(speakingAns.audioKey)}`} />
                </div>
              );
            })()}
            {answerMap.get('speaking')?.aiFeedback && (
              <div style="padding:1rem;background:#e7f3ff;border-radius:var(--radius-lg);margin-top:var(--space-4);">
                <strong>AI Feedback:</strong>
                <div style="white-space:pre-wrap;">{answerMap.get('speaking')?.aiFeedback}</div>
              </div>
            )}
            {(attempt.aiFeedback as any)?.transcription && (
              <div style="margin-top:1rem;">
                <h3>Transcription</h3>
                <div style="white-space:pre-wrap;background:#fff;padding:1rem;border:1px solid var(--base-border);border-radius:var(--radius-lg);">
                  {(attempt.aiFeedback as any).transcription}
                </div>
              </div>
            )}
          </div>
        )}

        <div class="card" style="display:flex;gap:var(--space-4);flex-wrap:wrap;">
          <a href="/exams" class="btn btn-primary">Back to Exams</a>
          <a href="/dashboard" class="btn btn-secondary">Dashboard</a>
        </div>
      </div>
    </Layout>
  );
});

export default review;
