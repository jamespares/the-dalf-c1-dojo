import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { exams } from '../db/schema';
import { adminMiddleware } from '../auth';
import { chatCompletion, generateTTS, splitTextForTTS } from '../ai';
import { uploadAudio, audioKey } from '../storage';
import {
  LISTENING_SYSTEM_PROMPT,
  READING_SYSTEM_PROMPT,
  WRITING_SYSTEM_PROMPT,
  SPEAKING_SYSTEM_PROMPT,
} from '../ai-prompts';
import { Layout } from '../components/Layout';
import type { ExamGeneratedContent } from '../types';
import { detectLang, getDict, type Lang, type Dict } from '../lib/i18n';

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
  const lang = detectLang(c);
  const dict = getDict(lang);
  const themeLabels: Record<string, string> = {
    'Environment and sustainable development': dict.landingTopicEnv,
    'Urbanism and city transformation': dict.landingTopicUrban,
    'Culture and arts': dict.landingTopicCulture,
    'Social issues': dict.landingTopicSocial,
    'Science and technology': dict.landingTopicScience,
    'Economics and society': dict.landingTopicEcon,
    'Family and education': dict.landingTopicFamily,
    'Work and wellbeing': dict.landingTopicWork,
    'Digital society': dict.landingTopicDigital,
    'Consumption and ethics': dict.landingTopicConsume,
  };
  return c.html(
    <Layout title={dict.adminTitle} user={user} lang={lang}>
      <h1>{dict.adminGenerateNew}</h1>
      <div class="card" style="max-width:500px;">
        <form method="POST" action="/admin/generate">
          <div class="form-group">
            <label>{dict.adminTheme}</label>
            <select name="theme" required>
              <option value="">{dict.adminThemePlaceholder}</option>
              {THEMES.map((t) => (
                <option value={t}>{themeLabels[t]}</option>
              ))}
            </select>
          </div>
          <button type="submit" class="btn btn-primary">{dict.adminGenerateBtn}</button>
        </form>
        <p style="color:var(--muted);margin-top:1rem;">
          {dict.adminGenerateNote}
        </p>
      </div>
    </Layout>
  );
});

admin.post('/admin/generate', adminMiddleware(), async (c) => {
  const lang = detectLang(c);
  const dict = getDict(lang);
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
    const audioKeys: Record<string, string | string[]> = {};

    // Long document audio (chunked if needed)
    const longChunks = splitTextForTTS(content.listening.longDocument.transcript);
    const longBuffers = await Promise.all(
      longChunks.map((chunk) => generateTTS(c, chunk, 'alloy'))
    );
    const longKeys = await Promise.all(
      longBuffers.map((buf, i) =>
        uploadAudio(c, audioKey(exam.id, 'listening', `long-${i + 1}.mp3`), buf)
      )
    );
    audioKeys.listeningLong = longKeys.length === 1 ? longKeys[0] : longKeys;

    // Short documents audio (chunked if needed)
    const shortTexts = content.listening.shortDocuments.map((d: any) => d.transcript).join('\n\n---\n\n');
    const shortChunks = splitTextForTTS(shortTexts);
    const shortBuffers = await Promise.all(
      shortChunks.map((chunk) => generateTTS(c, chunk, 'alloy'))
    );
    const shortKeys = await Promise.all(
      shortBuffers.map((buf, i) =>
        uploadAudio(c, audioKey(exam.id, 'listening', `short-${i + 1}.mp3`), buf)
      )
    );
    audioKeys.listeningShort = shortKeys.length === 1 ? shortKeys[0] : shortKeys;

    await db
      .update(exams)
      .set({ audioKeys: audioKeys as any })
      .where(eq(exams.id, exam.id));

    return c.redirect('/exams');
  } catch (err: any) {
    console.error('Exam generation failed:', err);
    return c.html(
      <Layout title={dict.adminErrorTitle} user={c.get('user')} lang={lang}>
        <div class="card">
          <div class="alert alert-danger">{dict.adminErrorPrefix}{err.message}</div>
          <a href="/admin/generate" class="btn btn-secondary">{dict.adminTryAgain}</a>
        </div>
      </Layout>,
      500
    );
  }
});

export default admin;
