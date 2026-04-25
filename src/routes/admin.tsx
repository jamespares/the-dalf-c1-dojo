import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { exams } from '../db/schema';
import { adminMiddleware } from '../auth';
import { chatCompletion, generateTTS } from '../ai';
import { uploadAudio, audioKey } from '../storage';
import {
  LISTENING_SYSTEM_PROMPT,
  READING_SYSTEM_PROMPT,
  WRITING_SYSTEM_PROMPT,
  SPEAKING_SYSTEM_PROMPT,
} from '../ai-prompts';
import { Layout } from '../components/Layout';
import type { ExamGeneratedContent } from '../types';

const admin = new Hono();

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

admin.get('/admin/generate', adminMiddleware(), (c) => {
  const user = c.get('user');
  return c.html(
    <Layout title="Generate Exam" user={user}>
      <h1>Generate New Exam</h1>
      <div class="card" style="max-width:500px;">
        <form method="POST" action="/admin/generate">
          <div class="form-group">
            <label>Theme</label>
            <select name="theme" required>
              <option value="">Select a theme...</option>
              {THEMES.map((t) => (
                <option value={t}>{t}</option>
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
  const body = await c.req.parseBody<{ theme: string }>();
  const theme = body.theme;
  const db = getDb(c.env.DB);

  try {
    // Generate all 4 sections in parallel
    const [listeningJson, readingJson, writingJson, speakingJson] = await Promise.all([
      chatCompletion(c, [
        { role: 'system', content: LISTENING_SYSTEM_PROMPT },
        { role: 'user', content: `Generate a DALF C1 listening exam on the theme: ${theme}. Output valid JSON only.` },
      ], { temperature: 0.7, max_tokens: 4000, jsonMode: true }),
      chatCompletion(c, [
        { role: 'system', content: READING_SYSTEM_PROMPT },
        { role: 'user', content: `Generate a DALF C1 reading exam on the theme: ${theme}. Output valid JSON only.` },
      ], { temperature: 0.7, max_tokens: 6000, jsonMode: true }),
      chatCompletion(c, [
        { role: 'system', content: WRITING_SYSTEM_PROMPT },
        { role: 'user', content: `Generate a DALF C1 writing exam on the theme: ${theme}. Output valid JSON only.` },
      ], { temperature: 0.7, max_tokens: 4000, jsonMode: true }),
      chatCompletion(c, [
        { role: 'system', content: SPEAKING_SYSTEM_PROMPT },
        { role: 'user', content: `Generate a DALF C1 speaking exam on the theme: ${theme}. Output valid JSON only.` },
      ], { temperature: 0.7, max_tokens: 4000, jsonMode: true }),
    ]);

    const content: ExamGeneratedContent = {
      listening: JSON.parse(listeningJson),
      reading: JSON.parse(readingJson),
      writing: JSON.parse(writingJson),
      speaking: JSON.parse(speakingJson),
    };

    // Store exam in DB first to get ID
    const [exam] = await db
      .insert(exams)
      .values({
        title: `DALF C1 — ${theme}`,
        theme,
        generatedContent: content as any,
        status: 'active',
      })
      .returning();

    // Generate TTS audio for listening
    const audioKeys: Record<string, string> = {};
    try {
      const longAudio = await generateTTS(c, content.listening.longDocument.transcript, 'alloy');
      audioKeys.listeningLong = await uploadAudio(
        c,
        audioKey(exam.id, 'listening', 'long.mp3'),
        longAudio
      );
    } catch (e) {
      console.error('Failed to generate long audio:', e);
    }

    try {
      const shortTexts = content.listening.shortDocuments.map((d: any) => d.transcript).join('\n\n---\n\n');
      const shortAudio = await generateTTS(c, shortTexts, 'alloy');
      audioKeys.listeningShort = await uploadAudio(
        c,
        audioKey(exam.id, 'listening', 'short.mp3'),
        shortAudio
      );
    } catch (e) {
      console.error('Failed to generate short audio:', e);
    }

    await db
      .update(exams)
      .set({ audioKeys: audioKeys as any })
      .where(eq(exams.id, exam.id));

    return c.redirect('/exams');
  } catch (err: any) {
    console.error('Exam generation failed:', err);
    return c.html(
      <Layout title="Error" user={c.get('user')}>
        <div class="card">
          <div class="alert alert-danger">Failed to generate exam: {err.message}</div>
          <a href="/admin/generate" class="btn btn-secondary">Try again</a>
        </div>
      </Layout>,
      500
    );
  }
});

export default admin;
