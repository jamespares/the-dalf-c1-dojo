import { eq, and } from 'drizzle-orm';
import { getDb } from './db';
import { exams, attempts } from './db/schema';
import { chatCompletion, generateTTS, splitTextForTTS } from './ai';
import { uploadAudio, audioKey } from './storage';
import {
  LISTENING_SYSTEM_PROMPT,
  READING_SYSTEM_PROMPT,
  WRITING_SYSTEM_PROMPT,
  SPEAKING_SYSTEM_PROMPT,
} from './ai-prompts';
import type { Context } from 'hono';
import type { ExamGeneratedContent } from './types';

export async function findReusableExam(
  db: ReturnType<typeof getDb>,
  userId: number,
  theme: string
) {
  const themeExams = await db
    .select()
    .from(exams)
    .where(and(eq(exams.theme, theme), eq(exams.status, 'active')));

  for (const exam of themeExams) {
    const userAttempts = await db
      .select()
      .from(attempts)
      .where(
        and(
          eq(attempts.userId, userId),
          eq(attempts.examId, exam.id),
          eq(attempts.status, 'completed')
        )
      );

    const completedSections = new Set(userAttempts.map((a) => a.section));
    if (completedSections.size < 4) {
      return exam;
    }
  }

  return null;
}

export async function generateExamContent(
  c: Context,
  theme: string
): Promise<ExamGeneratedContent> {
  const [listeningJson, readingJson, writingJson, speakingJson] =
    await Promise.all([
      chatCompletion(
        c,
        [
          { role: 'system', content: LISTENING_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Generate a DALF C1 listening exam on the theme: ${theme}. Output valid JSON only.`,
          },
        ],
        { temperature: 0.7, max_tokens: 4000, jsonMode: true }
      ),
      chatCompletion(
        c,
        [
          { role: 'system', content: READING_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Generate a DALF C1 reading exam on the theme: ${theme}. Output valid JSON only.`,
          },
        ],
        { temperature: 0.7, max_tokens: 6000, jsonMode: true }
      ),
      chatCompletion(
        c,
        [
          { role: 'system', content: WRITING_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Generate a DALF C1 writing exam on the theme: ${theme}. Output valid JSON only.`,
          },
        ],
        { temperature: 0.7, max_tokens: 4000, jsonMode: true }
      ),
      chatCompletion(
        c,
        [
          { role: 'system', content: SPEAKING_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Generate a DALF C1 speaking exam on the theme: ${theme}. Output valid JSON only.`,
          },
        ],
        { temperature: 0.7, max_tokens: 4000, jsonMode: true }
      ),
    ]);

  return {
    listening: JSON.parse(listeningJson),
    reading: JSON.parse(readingJson),
    writing: JSON.parse(writingJson),
    speaking: JSON.parse(speakingJson),
  };
}

export async function storeExam(
  db: ReturnType<typeof getDb>,
  theme: string,
  content: ExamGeneratedContent
) {
  const [exam] = await db
    .insert(exams)
    .values({
      title: `DALF C1 — ${theme}`,
      theme,
      generatedContent: content as any,
      status: 'active',
    })
    .returning();

  return exam;
}

export async function generateAndStoreAudio(
  c: Context,
  examId: number,
  content: ExamGeneratedContent
): Promise<Record<string, string | string[]>> {
  const audioKeys: Record<string, string | string[]> = {};

  const longChunks = splitTextForTTS(content.listening.longDocument.transcript);
  const longBuffers = await Promise.all(
    longChunks.map((chunk) => generateTTS(c, chunk, 'alloy'))
  );
  const longKeys = await Promise.all(
    longBuffers.map((buf, i) =>
      uploadAudio(c, audioKey(examId, 'listening', `long-${i + 1}.mp3`), buf)
    )
  );
  audioKeys.listeningLong = longKeys.length === 1 ? longKeys[0] : longKeys;

  const shortTexts = content.listening.shortDocuments
    .map((d: any) => d.transcript)
    .join('\n\n---\n\n');
  const shortChunks = splitTextForTTS(shortTexts);
  const shortBuffers = await Promise.all(
    shortChunks.map((chunk) => generateTTS(c, chunk, 'alloy'))
  );
  const shortKeys = await Promise.all(
    shortBuffers.map((buf, i) =>
      uploadAudio(c, audioKey(examId, 'listening', `short-${i + 1}.mp3`), buf)
    )
  );
  audioKeys.listeningShort = shortKeys.length === 1 ? shortKeys[0] : shortKeys;

  return audioKeys;
}
