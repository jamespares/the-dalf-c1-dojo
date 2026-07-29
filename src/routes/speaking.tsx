import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, attempts, answers } from '../db/schema';
import { authMiddleware } from '../auth';
import { uploadAudio, userAudioKey } from '../storage';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import { CirclePlay, SquareStop, Mic } from '../components/Icons';

const speaking = new Hono<{ Bindings: CloudflareBindings }>();

speaking.get('/exams/:id/speaking', authMiddleware(), async (c) => {
  const user = c.get('user');
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));

  const db = getDb(c.env.DB);
  const [exam] = await db.select().from(exams).where(eq(exams.id, examId));
  if (!exam) return c.notFound();

  const content = exam.generatedContent as any;
  const examinerQuestions: string[] = content.speaking?.examinerQuestions || [];

  let attempt = attemptId
    ? (await db.select().from(attempts).where(eq(attempts.id, attemptId)))[0]
    : undefined;

  if (!attempt || attempt.userId !== user.id) {
    const [newAttempt] = await db
      .insert(attempts)
      .values({ userId: user.id, examId, section: 'PO', status: 'in_progress' })
      .returning();
    attempt = newAttempt;
  }

  const existingAnswers = await db
    .select()
    .from(answers)
    .where(eq(answers.attemptId, attempt.id));

  const answerByQ = new Map(existingAnswers.map((a) => [a.questionId, a]));
  const exposeAnswer = answerByQ.get('speaking');
  const hasExpose = !!exposeAnswer?.audioKey;
  const qRecorded = examinerQuestions.filter((_, i) => answerByQ.get(`speaking-q${i}`)?.audioKey).length;
  const canSubmit = hasExpose && (examinerQuestions.length === 0 || qRecorded === examinerQuestions.length);

  return c.html(
    <Layout title={`Oral Practice — DALF C1`}>
      <Navbar user={user} />
      <div class="container">
        <h1 style="display:flex;align-items:center;gap:0.5rem;">
          <Mic size={28} style={{ color: 'var(--accent)' }} />
          Oral Practice — {exam.title.replace(/^\[static\]\s*/, '')}
        </h1>
        <p style="color:var(--muted);">
          Self-study rehearsal: prepare an exposé, then record spoken answers to on-screen examiner questions.
          This is <strong>not</strong> a live examiner session.
        </p>

        <div class="card">
          <h2>Dossier</h2>
          {content.speaking.dossier.map((doc: any, idx: number) => (
            <div style="margin-bottom:1.5rem;">
              <h3>Document {idx + 1}: {doc.title}</h3>
              <div style="white-space:pre-wrap;font-size:1rem;line-height:1.6;">{doc.text}</div>
            </div>
          ))}
          <div style="margin-top:1rem;padding:1rem;background:#f1f3f5;border-radius:var(--radius-lg);">
            <strong>Instructions:</strong>
            <div style="white-space:pre-wrap;">{content.speaking.instructions}</div>
          </div>
        </div>

        <div class="card">
          <h2>1. Record your exposé</h2>
          <p>Record your 8–10 minute exposé. You can stop and re-record if needed.</p>

          <div id="recorder-expose" style="text-align:center;padding:1.5rem;" data-question-id="speaking" data-upload-url={`/exams/${examId}/speaking/upload?attempt=${attempt.id}&qid=speaking`}>
            <button type="button" class="btn btn-danger recording-btn record-toggle" style="display:inline-flex;align-items:center;gap:0.5rem;">
              <span class="icon-start"><CirclePlay size={20} /></span>
              <span class="icon-stop" style="display:none;"><SquareStop size={20} /></span>
              <span class="record-label">Start Recording</span>
            </button>
            <div class="record-status" style="margin-top:1rem;color:var(--muted);"></div>
            <div class="record-timer timer" style="margin-top:0.5rem;">00:00</div>
            <div class="record-error hidden alert alert-danger" style="margin-top:1rem;"></div>
          </div>

          {hasExpose && (
            <div class="recording-playback">
              <p style="margin:0 0 var(--space-3);font-weight:500;">Saved exposé</p>
              <audio controls src={`/exams/${examId}/audio/${encodeURIComponent(exposeAnswer!.audioKey!)}`} />
            </div>
          )}
        </div>

        {examinerQuestions.length > 0 && (
          <div class="card">
            <h2>2. Examiner questions</h2>
            <p style="color:var(--muted);">
              Record a spoken answer to each question ({qRecorded}/{examinerQuestions.length} recorded).
            </p>
            {examinerQuestions.map((q, i) => {
              const qid = `speaking-q${i}`;
              const ans = answerByQ.get(qid);
              return (
                <div style="border-top:1px solid var(--base-border);padding-top:1.25rem;margin-top:1.25rem;">
                  <h3 style="margin-top:0;">Question {i + 1}</h3>
                  <p style="font-size:1.05rem;">{q}</p>
                  <div
                    class="recorder-block"
                    style="text-align:center;padding:1rem;"
                    data-question-id={qid}
                    data-upload-url={`/exams/${examId}/speaking/upload?attempt=${attempt.id}&qid=${qid}`}
                  >
                    <button type="button" class="btn btn-danger recording-btn record-toggle" style="display:inline-flex;align-items:center;gap:0.5rem;">
                      <span class="icon-start"><CirclePlay size={18} /></span>
                      <span class="icon-stop" style="display:none;"><SquareStop size={18} /></span>
                      <span class="record-label">{ans?.audioKey ? 'Re-record' : 'Record answer'}</span>
                    </button>
                    <div class="record-status" style="margin-top:0.75rem;color:var(--muted);"></div>
                    <div class="record-timer timer" style="margin-top:0.35rem;">00:00</div>
                    <div class="record-error hidden alert alert-danger" style="margin-top:0.75rem;"></div>
                  </div>
                  {ans?.audioKey && (
                    <audio controls src={`/exams/${examId}/audio/${encodeURIComponent(ans.audioKey)}`} style="margin-top:0.5rem;" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <form method="post" action={`/exams/${examId}/speaking/submit?attempt=${attempt.id}`}>
          <button type="submit" class="btn btn-success" disabled={!canSubmit}>
            Submit for Marking
          </button>
          {!canSubmit && (
            <p style="color:var(--muted);font-size:0.85rem;margin-top:0.5rem;">
              Record your exposé{examinerQuestions.length ? ' and all examiner answers' : ''} before submitting.
            </p>
          )}
        </form>

        <script dangerouslySetInnerHTML={{
          __html: `
            function fmt(s) {
              const m = Math.floor(s / 60).toString().padStart(2, '0');
              const sec = (s % 60).toString().padStart(2, '0');
              return m + ':' + sec;
            }

            function setupRecorder(root) {
              const btn = root.querySelector('.record-toggle');
              const status = root.querySelector('.record-status');
              const timer = root.querySelector('.record-timer');
              const errorBox = root.querySelector('.record-error');
              const uploadUrl = root.dataset.uploadUrl;
              let mediaRecorder, chunks = [], timerInterval, seconds = 0;

              function showError(msg) {
                errorBox.textContent = msg;
                errorBox.classList.remove('hidden');
              }
              function clearError() {
                errorBox.classList.add('hidden');
                errorBox.textContent = '';
              }

              btn.addEventListener('click', async () => {
                clearError();
                if (!mediaRecorder || mediaRecorder.state === 'inactive') {
                  try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaRecorder = new MediaRecorder(stream);
                    chunks = [];
                    seconds = 0;
                    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
                    mediaRecorder.onstop = async () => {
                      clearInterval(timerInterval);
                      stream.getTracks().forEach(t => t.stop());
                      const blob = new Blob(chunks, { type: 'audio/webm' });
                      const formData = new FormData();
                      formData.append('audio', new File([blob], 'recording.webm', { type: 'audio/webm' }));
                      status.textContent = 'Uploading...';
                      btn.disabled = true;
                      try {
                        const res = await fetch(uploadUrl, { method: 'POST', body: formData });
                        if (!res.ok) throw new Error('Upload failed: ' + res.status);
                        status.textContent = 'Uploaded!';
                        location.reload();
                      } catch (err) {
                        showError(err.message || 'Upload failed.');
                        status.textContent = '';
                        btn.disabled = false;
                        root.querySelector('.icon-start').style.display = 'inline-flex';
                        root.querySelector('.icon-stop').style.display = 'none';
                        root.querySelector('.record-label').textContent = 'Start Recording';
                      }
                    };
                    mediaRecorder.start();
                    root.querySelector('.icon-start').style.display = 'none';
                    root.querySelector('.icon-stop').style.display = 'inline-flex';
                    root.querySelector('.record-label').textContent = 'Stop Recording';
                    status.textContent = 'Recording...';
                    timerInterval = setInterval(() => { seconds++; timer.textContent = fmt(seconds); }, 1000);
                  } catch (err) {
                    showError('Microphone access denied. Please allow microphone permissions.');
                  }
                } else {
                  mediaRecorder.stop();
                  root.querySelector('.icon-start').style.display = 'inline-flex';
                  root.querySelector('.icon-stop').style.display = 'none';
                  root.querySelector('.record-label').textContent = 'Start Recording';
                  status.textContent = 'Processing...';
                }
              });
            }

            document.querySelectorAll('#recorder-expose, .recorder-block').forEach(setupRecorder);
          `,
        }} />
      </div>
    </Layout>
  );
});

speaking.post('/exams/:id/speaking/upload', authMiddleware(), async (c) => {
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));
  const qid = (c.req.query('qid') || 'speaking').toString();
  const user = c.get('user');

  const db = getDb(c.env.DB);
  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId));
  if (!attempt || attempt.userId !== user.id) {
    return c.text('Forbidden', 403);
  }

  // Only allow known speaking question ids
  if (qid !== 'speaking' && !/^speaking-q\d+$/.test(qid)) {
    return c.text('Invalid question id', 400);
  }

  const body = await c.req.parseBody({ all: true });
  const file = body.audio as File;
  if (!file) return c.text('No audio file', 400);

  const buffer = await file.arrayBuffer();
  const key = userAudioKey(user.id, attemptId, `${qid}.webm`);
  await uploadAudio(c, key, buffer, 'audio/webm');

  const [existing] = await db
    .select()
    .from(answers)
    .where(and(eq(answers.attemptId, attemptId), eq(answers.questionId, qid)));

  if (existing) {
    await db.update(answers).set({ audioKey: key }).where(eq(answers.id, existing.id));
  } else {
    await db.insert(answers).values({ attemptId, questionId: qid, audioKey: key });
  }

  return c.text('OK');
});

speaking.post('/exams/:id/speaking/submit', authMiddleware(), async (c) => {
  const attemptId = Number(c.req.query('attempt'));
  const user = c.get('user');
  const db = getDb(c.env.DB);

  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId));
  if (!attempt || attempt.userId !== user.id) {
    return c.text('Forbidden', 403);
  }

  await db
    .update(attempts)
    .set({ status: 'pending_marking', submittedAt: new Date() })
    .where(eq(attempts.id, attemptId));
  return c.redirect(`/marking/${attemptId}`);
});

export default speaking;
