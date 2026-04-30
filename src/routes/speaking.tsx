import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { getDb } from '../db';
import { exams, attempts, answers } from '../db/schema';
import { authMiddleware } from '../auth';
import { uploadAudio, userAudioKey } from '../storage';
import { Layout } from '../components/Layout';
import { detectLang, getDict, type Lang, type Dict } from '../lib/i18n';

const speaking = new Hono<{ Bindings: CloudflareBindings }>();

speaking.get('/exams/:id/speaking', authMiddleware(), async (c) => {
  const user = c.get('user');
  const lang = detectLang(c);
  const dict = getDict(lang);
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
    <Layout title={`${dict.speakingTitle}DALF C1`} user={user} lang={lang}>
      <h1>{dict.speakingTitle}{exam.title}</h1>
      <p style="color:var(--muted);">{dict.speakingTime}</p>

      <div class="card">
        <h2>{dict.speakingDossier}</h2>
        {content.speaking.dossier.map((doc: any, idx: number) => (
          <div style="margin-bottom:1.5rem;">
            <h3>{dict.speakingDocument}{idx + 1}: {doc.title}</h3>
            <div style="white-space:pre-wrap;font-size:1rem;line-height:1.6;">{doc.text}</div>
          </div>
        ))}
        <div style="margin-top:1rem;padding:1rem;background:#f1f3f5;border-radius:var(--radius);">
          <strong>{dict.speakingInstructions}</strong>
          <div style="white-space:pre-wrap;">{content.speaking.instructions}</div>
        </div>
      </div>

      <div class="card">
        <h2>{dict.speakingRecording}</h2>
        <p>{dict.speakingRecordDesc}</p>

        <div id="recorder" style="text-align:center;padding:2rem;">
          <button id="recordBtn" class="btn btn-danger recording-btn">{dict.speakingStartRecording}</button>
          <div id="recordStatus" style="margin-top:1rem;color:var(--muted);"></div>
          <div id="recordTimer" class="timer" style="margin-top:0.5rem;">{dict.speakingTimerInit}</div>
        </div>

        {hasRecording && (
          <div class="alert alert-success">{dict.speakingSaved}</div>
        )}
      </div>

      <form id="uploadForm" method="post" action={`/exams/${examId}/speaking/upload?attempt=${attempt.id}`} enctype="multipart/form-data" style="display:none;">
        <input type="file" name="audio" id="audioInput" accept="audio/*" />
      </form>

      <form method="post" action={`/exams/${examId}/speaking/submit?attempt=${attempt.id}`}>
        <button type="submit" class="btn btn-success">{dict.speakingSubmit}</button>
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
                status.textContent = "${dict.speakingUploading}";
                await fetch(uploadForm.action, { method: 'POST', body: formData });
                status.textContent = "${dict.speakingUploaded}";
                location.reload();
              };

              mediaRecorder.start();
              btn.textContent = "${dict.speakingStop}";
              status.textContent = "${dict.speakingRecordingStatus}";
              timerInterval = setInterval(() => {
                seconds++;
                timer.textContent = fmt(seconds);
              }, 1000);
            } else {
              mediaRecorder.stop();
              btn.textContent = "${dict.speakingStartRecording}";
              status.textContent = "${dict.speakingProcessing}";
            }
          });
        `,
      }} />
    </Layout>
  );
});

speaking.post('/exams/:id/speaking/upload', authMiddleware(), async (c) => {
  const lang = detectLang(c);
  const dict = getDict(lang);
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
  const lang = detectLang(c);
  const dict = getDict(lang);
  const attemptId = Number(c.req.query('attempt'));
  const db = getDb(c.env.DB);
  await db
    .update(attempts)
    .set({ status: 'pending_marking', submittedAt: new Date() })
    .where(eq(attempts.id, attemptId));
  return c.redirect(`/marking/${attemptId}`);
});

export default speaking;
