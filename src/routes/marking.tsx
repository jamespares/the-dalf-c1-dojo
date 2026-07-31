import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, exams, answers, errorLogs } from '../db/schema';
import { authMiddleware } from '../auth';
import { chatCompletion, transcribeAudio, extractJson } from '../ai';
import { getAudio } from '../storage';
import {
  MARKING_COMPREHENSION_PROMPT,
  MARKING_SYNTHESIS_PROMPT,
  MARKING_ESSAY_PROMPT,
  MARKING_SPEAKING_PROMPT,
} from '../ai-prompts';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';

const marking = new Hono<{ Bindings: CloudflareBindings }>();

function clamp(num: any, min: number, max: number): number {
  const n = typeof num === 'number' && Number.isFinite(num) ? num : 0;
  return Math.max(min, Math.min(max, n));
}

function clampSyntheseScores(s: any) {
  const length = clamp(s?.length, 0, 0.5);
  const objectivity = clamp(s?.objectivity, 0, 1.5);
  const taskCompletion = clamp(s?.taskCompletion, 0, 2.5);
  const coherence = clamp(s?.coherence, 0, 2.5);
  const lexique = clamp(s?.lexique, 0, 3);
  const morphosyntaxe = clamp(s?.morphosyntaxe, 0, 2.5);
  const total = length + objectivity + taskCompletion + coherence + lexique + morphosyntaxe;
  return { length, objectivity, taskCompletion, coherence, lexique, morphosyntaxe, total: Math.round(total * 10) / 10 };
}

function clampEssaiScores(s: any) {
  const taskCompletion = clamp(s?.taskCompletion, 0, 2.5);
  const coherence = clamp(s?.coherence, 0, 2.5);
  const sociolinguistic = clamp(s?.sociolinguistic, 0, 2.5);
  const lexique = clamp(s?.lexique, 0, 2.5);
  const morphosyntaxe = clamp(s?.morphosyntaxe, 0, 2.5);
  const total = taskCompletion + coherence + sociolinguistic + lexique + morphosyntaxe;
  return { taskCompletion, coherence, sociolinguistic, lexique, morphosyntaxe, total: Math.round(total * 10) / 10 };
}

function clampSpeakingScores(s: any) {
  const expose = clamp(s?.expose, 0, 5);
  const entretien = clamp(s?.entretien, 0, 5);
  const lexique = clamp(s?.lexique, 0, 5);
  const morphosyntaxe = clamp(s?.morphosyntaxe, 0, 5);
  const phonologie = clamp(s?.phonologie, 0, 5);
  const total = expose + entretien + lexique + morphosyntaxe + phonologie;
  return { expose, entretien, lexique, morphosyntaxe, phonologie, total: Math.round(total * 10) / 10 };
}

function normalizeErrorTags(tags: any) {
  const validTypes = new Set(['grammar', 'vocabulary', 'pronunciation', 'register', 'structure']);
  return (Array.isArray(tags) ? tags : [])
    .filter((t: any) => t && typeof t === 'object')
    .map((t: any) => ({
      type: validTypes.has(t.type) ? t.type : 'grammar',
      original: String(t.original ?? ''),
      correction: String(t.correction ?? ''),
      explanation: String(t.explanation ?? ''),
    }));
}

async function runMarking(c: any, attemptId: number, userId: number) {
  const db = getDb(c.env.DB);
  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId));
  if (!attempt || attempt.userId !== userId) return;
  if (attempt.status !== 'pending_marking') return;

  const [exam] = await db.select().from(exams).where(eq(exams.id, attempt.examId));
  if (!exam) return;

  const content = exam.generatedContent as any;
  const userAnswers = await db.select().from(answers).where(eq(answers.attemptId, attemptId));

  try {
    let totalScore = 0;
    let scores: Record<string, any> = {};
    let feedback: Record<string, string> = {};

    if (attempt.section === 'CO' || attempt.section === 'CE') {
      const sectionKey = attempt.section === 'CO' ? 'listening' : 'reading';
      const isListening = attempt.section === 'CO';
      const allQuestions = isListening
        ? [
            ...content.listening.longDocument.questions,
            ...content.listening.shortDocuments.flatMap((d: any) => d.questions),
          ]
        : [...content.reading.questions];
      const answerKeyMap = new Map(
        (isListening
          ? [
              ...content.listening.longDocument.answerKey,
              ...content.listening.shortDocuments.flatMap((d: any) => d.answerKey),
            ]
          : [...content.reading.answerKey]
        ).map((ak: any) => [ak.questionId, ak])
      );

      const sourceTextMap = isListening
        ? new Map<string, string>([
            ...content.listening.longDocument.questions.map((q: any) => [
              q.id,
              content.listening.longDocument.transcript,
            ]),
            ...content.listening.shortDocuments.flatMap((d: any) =>
              d.questions.map((q: any) => [q.id, d.transcript])
            ),
          ])
        : new Map<string, string>(
            content.reading.questions.map((q: any) => [q.id, content.reading.text])
          );

      for (const ans of userAnswers) {
        const q = allQuestions.find((qq: any) => qq.id === ans.questionId);
        const ak = answerKeyMap.get(ans.questionId);
        if (!q || !ak) continue;

        const sourceText = sourceTextMap.get(ans.questionId) ?? '';

        const resultJson = await chatCompletion(
          c,
          [
            { role: 'system', content: MARKING_COMPREHENSION_PROMPT },
            {
              role: 'user',
              content: `SOURCE TEXT:\n${sourceText}\n\nQUESTION: ${q.text}\nCORRECT ANSWER: ${ak.correctAnswer}\nACCEPTABLE ANSWERS: ${(ak.acceptableAnswers || []).join(', ')}\nMAX POINTS: ${ak.points}\n\nSTUDENT ANSWER:\n${ans.userAnswer || ''}`,
            },
          ],
          { temperature: 0.3, max_tokens: 800, jsonMode: true, timeoutMs: 30000 }
        );

        const rawResult = JSON.parse(extractJson(resultJson));
        const score = clamp(rawResult.score, 0, ak.points);
        const feedbackText = typeof rawResult.feedback === 'string' ? rawResult.feedback : '';
        totalScore += score;

        await db
          .update(answers)
          .set({ aiScore: score, aiFeedback: feedbackText })
          .where(eq(answers.id, ans.id));

        for (const tag of normalizeErrorTags(rawResult.errorTags)) {
          await db.insert(errorLogs).values({
            userId,
            attemptId,
            errorType: tag.type,
            originalText: tag.original,
            correction: tag.correction,
            explanation: tag.explanation,
          });
        }
      }

      const maxScore = allQuestions.reduce((sum: number, q: any) => sum + q.points, 0);
      scores = { raw: totalScore, max: maxScore, scaled: (totalScore / maxScore) * 25 };
      totalScore = scores.scaled;
    } else if (attempt.section === 'PE') {
      const synthese = userAnswers.find((a) => a.questionId === 'synthese')?.userAnswer || '';
      const essai = userAnswers.find((a) => a.questionId === 'essai')?.userAnswer || '';
      const dossier = content.writing.dossier.map((d: any) => d.text).join('\n\n');

      const synResultJson = await chatCompletion(
        c,
        [
          { role: 'system', content: MARKING_SYNTHESIS_PROMPT },
          { role: 'user', content: `DOSSIER:\n${dossier}\n\nSTUDENT SYNTHESIS:\n${synthese}` },
        ],
        { temperature: 0.3, max_tokens: 1500, jsonMode: true, timeoutMs: 45000 }
      );

      const essResultJson = await chatCompletion(
        c,
        [
          { role: 'system', content: MARKING_ESSAY_PROMPT },
          {
            role: 'user',
            content: `PROBLÉMATIQUE: ${content.writing.problematique}\n\nDOSSIER:\n${dossier}\n\nSTUDENT ESSAY:\n${essai}`,
          },
        ],
        { temperature: 0.3, max_tokens: 1500, jsonMode: true, timeoutMs: 45000 }
      );

      const synRaw = JSON.parse(extractJson(synResultJson));
      const essRaw = JSON.parse(extractJson(essResultJson));

      const synScores = clampSyntheseScores(synRaw.scores);
      const essScores = clampEssaiScores(essRaw.scores);

      scores = { synthese: synScores, essai: essScores };
      totalScore = synScores.total + essScores.total;
      feedback = {
        synthese: typeof synRaw.feedback === 'string' ? synRaw.feedback : '',
        essai: typeof essRaw.feedback === 'string' ? essRaw.feedback : '',
      };

      for (const tag of normalizeErrorTags([
        ...(Array.isArray(synRaw.errorTags) ? synRaw.errorTags : []),
        ...(Array.isArray(essRaw.errorTags) ? essRaw.errorTags : []),
      ])) {
        await db.insert(errorLogs).values({
          userId,
          attemptId,
          errorType: tag.type,
          originalText: tag.original,
          correction: tag.correction,
          explanation: tag.explanation,
        });
      }

      const synAns = userAnswers.find((a) => a.questionId === 'synthese');
      const essAns = userAnswers.find((a) => a.questionId === 'essai');
      if (synAns) await db.update(answers).set({ aiScore: synScores.total, aiFeedback: feedback.synthese }).where(eq(answers.id, synAns.id));
      if (essAns) await db.update(answers).set({ aiScore: essScores.total, aiFeedback: feedback.essai }).where(eq(answers.id, essAns.id));
    } else if (attempt.section === 'PO') {
      const speakingAnswers = userAnswers.filter((a) => a.audioKey && a.questionId.startsWith('speaking'));
      const transcripts: string[] = [];

      for (const speakingAns of speakingAnswers) {
        const obj = await getAudio(c, speakingAns.audioKey!);
        if (!obj) continue;
        const buffer = await obj.arrayBuffer();
        const transcription = await transcribeAudio(c, buffer, `${speakingAns.questionId}.webm`, 'audio/webm', {
          timeoutMs: 45000,
        });
        const label =
          speakingAns.questionId === 'speaking'
            ? 'EXPOSÉ'
            : `QUESTION ${speakingAns.questionId.replace('speaking-q', '')}`;
        transcripts.push(`[${label}]\n${transcription}`);
        await db
          .update(answers)
          .set({ userAnswer: transcription })
          .where(eq(answers.id, speakingAns.id));
      }

      if (transcripts.length > 0) {
        const examinerQs = (content.speaking?.examinerQuestions || [])
          .map((q: string, i: number) => `${i}. ${q}`)
          .join('\n');

        const resultJson = await chatCompletion(
          c,
          [
            { role: 'system', content: MARKING_SPEAKING_PROMPT },
            {
              role: 'user',
              content: `DOSSIER:\n${content.speaking.dossier.map((d: any) => d.text).join('\n\n')}\n\nEXAMINER QUESTIONS:\n${examinerQs || '(none)'}\n\nSTUDENT TRANSCRIPTIONS:\n${transcripts.join('\n\n')}`,
            },
          ],
          { temperature: 0.3, max_tokens: 1500, jsonMode: true, timeoutMs: 45000 }
        );

        const rawResult = JSON.parse(extractJson(resultJson));
        const speakingScores = clampSpeakingScores(rawResult.scores);

        scores = speakingScores;
        totalScore = speakingScores.total;
        feedback = {
          general: typeof rawResult.feedback === 'string' ? rawResult.feedback : '',
          transcription: transcripts.join('\n\n'),
        };

        for (const tag of normalizeErrorTags(rawResult.errorTags)) {
          await db.insert(errorLogs).values({
            userId,
            attemptId,
            errorType: tag.type,
            originalText: tag.original,
            correction: tag.correction,
            explanation: tag.explanation,
          });
        }

        const exposeAns = speakingAnswers.find((a) => a.questionId === 'speaking');
        if (exposeAns) {
          await db
            .update(answers)
            .set({ aiScore: speakingScores.total, aiFeedback: feedback.general })
            .where(eq(answers.id, exposeAns.id));
        }
      }
    }

    await db
      .update(attempts)
      .set({
        status: 'completed',
        totalScore: Math.round(totalScore * 10) / 10,
        scores: scores as any,
        aiFeedback: feedback as any,
      })
      .where(eq(attempts.id, attemptId));
  } catch (err: any) {
    console.error('Background marking failed:', err);
    await db
      .update(attempts)
      .set({ status: 'marking_failed', aiFeedback: { error: err.message } as any })
      .where(eq(attempts.id, attemptId));
  }
}

marking.get('/marking/:attemptId', authMiddleware(), async (c) => {
  const user = c.get('user');
  const attemptId = Number(c.req.param('attemptId'));

  const db = getDb(c.env.DB);
  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId));
  if (!attempt || attempt.userId !== user.id) return c.notFound();

  if (attempt.status === 'completed') {
    return c.redirect(`/review/${attemptId}`);
  }

  if (attempt.status === 'marking_failed') {
    return c.html(
      <Layout title="Marking Failed">
        <Navbar user={user} />
        <div class="container">
          <div class="card">
            <div class="alert alert-danger">Marking failed. Please try submitting again.</div>
            <a href={`/exams/${attempt.examId}/${attempt.section.toLowerCase()}?attempt=${attemptId}`} class="btn btn-secondary">
              Back to exam
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  if (attempt.status !== 'pending_marking') {
    return c.redirect(`/exams/${attempt.examId}/${attempt.section.toLowerCase()}?attempt=${attemptId}`);
  }

  // Kick off background marking
  c.executionCtx.waitUntil(runMarking(c, attemptId, user.id));

  // Return loading page immediately
  return c.html(
    <Layout title="Marking…">
      <Navbar user={user} />
      <div class="container">
        <div class="card" style="max-width:480px;margin:var(--space-12) auto;text-align:center;">
          <div class="marking-spinner"></div>
          <h1 style="font-family:var(--font-fun);font-size:1.5rem;margin-bottom:var(--space-3);">Marking your answers…</h1>
          <p style="color:var(--base-text-secondary);margin:0;">This may take 30–60 seconds. Please don't close this page.</p>
          <script dangerouslySetInnerHTML={{ __html: `
            setTimeout(() => window.location.reload(), 4000);
          `}} />
        </div>
      </div>
    </Layout>
  );
});

export default marking;
