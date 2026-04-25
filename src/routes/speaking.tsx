import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, attempts, answers } from '../db/schema';
import { authMiddleware } from '../auth';
import { uploadAudio, userAudioKey } from '../storage';
import { Layout } from '../components/Layout';

const speaking = new Hono();

speaking.get('/exams/:id/speaking', authMiddleware(), async (c) => {
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
      .values({ userId: user.id, examId, section: 'PO', status: 'in_progress' })
      .returning();
    attempt = newAttempt;
  }

  const existingAnswers = await db
    .select()
    .from(answers)
    .where(eq(answers.attemptId, attempt.id));

  const hasRecording = existingAnswers.some((a) => a.audioKey);

  return c.html(
    <Layout title="Speaking — DALF C1" user={user}>
      <h1>Oral Production — {exam.title}</h1>
      <p style="color:var(--muted);">Preparation: 1 hour. Exposé: 10 minutes. Discussion: 20 minutes.</p>

      <div class="card">
        <h2>Dossier</h2>
        {content.speaking.dossier.map((doc: any, idx: number) => (
          <div style="margin-bottom:1.5rem;">
            <h3>Document {idx + 1}: {doc.title}</h3>
            <div style="white-space:pre-wrap;font-size:1rem;line-height:1.6;">{doc.text}</div>
          </div>
        ))}
        <div style="margin-top:1rem;padding:1rem;background:#f1f3f5;border-radius:var(--radius);">
          <strong>Instructions:</strong>
          <div style="white-space:pre-wrap;">{content.speaking.instructions}</div>
        </div>
      </div>

      <div class="card">
        <h2>Recording</h2>
        <p>Record your 10-minute exposé below. You can stop and re-record if needed.</p>

        <div id="recorder" style="text-align:center;padding:2rem;">
          <button id="recordBtn" class="btn btn-danger recording-btn">🔴 Start Recording</button>
          <div id="recordStatus" style="margin-top:1rem;color:var(--muted);"></div>
          <div id="recordTimer" class="timer" style="margin-top:0.5rem;">00:00</div>
        </div>

        {hasRecording && (
          <div class="alert alert-success">Recording saved. You can submit when ready.</div>
        )}
      </div>

      <form id="uploadForm" method="POST" action={`/exams/${examId}/speaking/upload?attempt=${attempt.id}`} enctype="multipart/form-data" style="display:none;">
        <input type="file" name="audio" id="audioInput" accept="audio/*" />
      </form>

      <form method="POST" action={`/exams/${examId}/speaking/submit?attempt=${attempt.id}`}>
        <button type="submit" class="btn btn-success">Submit for Marking</button>
      </form>

      <script dangerouslySetInnerHTML={{
        __html: `
          let mediaRecorder;
          let chunks = [];
          let timerInterval;
          let seconds = 0;

          const btn = document.getElementById('recordBtn');
          const status = document.getElementById('recordStatus');
          const timer = document.getElementById('recordTimer');
          const audioInput = document.getElementById('audioInput');
          const uploadForm = document.getElementById('uploadForm');

          function fmt(s) {
            const m = Math.floor(s / 60).toString().padStart(2, '0');
            const sec = (s % 60).toString().padStart(2, '0');
            return m + ':' + sec;
          }

          btn.addEventListener('click', async () => {
            if (!mediaRecorder || mediaRecorder.state === 'inactive') {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              mediaRecorder = new MediaRecorder(stream);
              chunks = [];
              seconds = 0;

              mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
              };

              mediaRecorder.onstop = async () => {
                clearInterval(timerInterval);
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
                const dt = new DataTransfer();
                dt.items.add(file);
                audioInput.files = dt.files;

                const formData = new FormData(uploadForm);
                status.textContent = 'Uploading...';
                await fetch(uploadForm.action, { method: 'POST', body: formData });
                status.textContent = 'Uploaded successfully!';
                location.reload();
              };

              mediaRecorder.start();
              btn.textContent = '⏹ Stop Recording';
              status.textContent = 'Recording...';
              timerInterval = setInterval(() => {
                seconds++;
                timer.textContent = fmt(seconds);
              }, 1000);
            } else {
              mediaRecorder.stop();
              btn.textContent = '🔴 Start Recording';
              status.textContent = 'Processing...';
            }
          });
        `,
      }} />
    </Layout>
  );
});

speaking.post('/exams/:id/speaking/upload', authMiddleware(), async (c) => {
  const examId = Number(c.req.param('id'));
  const attemptId = Number(c.req.query('attempt'));
  const user = c.get('user');

  const body = await c.req.parseBody({ all: true });
  const file = body.audio as File;
  if (!file) return c.text('No audio file', 400);

  const buffer = await file.arrayBuffer();
  const key = userAudioKey(user.id, attemptId, `speaking.webm`);
  await uploadAudio(c, key, buffer, 'audio/webm');

  const db = getDb(c.env.DB);
  const [existing] = await db
    .select()
    .from(answers)
    .where(and(eq(answers.attemptId, attemptId), eq(answers.questionId, 'speaking')));

  if (existing) {
    await db.update(answers).set({ audioKey: key }).where(eq(answers.id, existing.id));
  } else {
    await db.insert(answers).values({ attemptId, questionId: 'speaking', audioKey: key });
  }

  return c.text('OK');
});

speaking.post('/exams/:id/speaking/submit', authMiddleware(), async (c) => {
  const attemptId = Number(c.req.query('attempt'));
  const db = getDb(c.env.DB);
  await db
    .update(attempts)
    .set({ status: 'pending_marking', submittedAt: new Date() })
    .where(eq(attempts.id, attemptId));
  return c.redirect(`/marking/${attemptId}`);
});

export default speaking;
