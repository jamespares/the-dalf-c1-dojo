import { Hono } from 'hono';
import { eq, and, inArray } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, exams, answers, errorLogs } from '../db/schema';
import { authMiddleware } from '../auth';
import { chatCompletion, transcribeAudio, extractJson } from '../ai';
import { getAudio } from '../storage';
import {
  MARKING_COMPREHENSION_BATCH_PROMPT,
  MARKING_SYNTHESIS_PROMPT,
  MARKING_ESSAY_PROMPT,
  MARKING_SPEAKING_PROMPT,
} from '../ai-prompts';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';

const marking = new Hono<{ Bindings: CloudflareBindings }>();

// A 'marking' attempt older than this is considered abandoned (its worker died
// mid-flight) and may be reclaimed and re-run.
const STALE_MARKING_MS = 10 * 60 * 1000;

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
  const seen = new Set<string>();
  return (Array.isArray(tags) ? tags : [])
    .filter((t: any) => t && typeof t === 'object')
    .map((t: any) => ({
      type: validTypes.has(t.type) ? t.type : 'grammar',
      original: String(t.original ?? ''),
      correction: String(t.correction ?? ''),
      explanation: String(t.explanation ?? ''),
    }))
    .filter((t) => {
      const key = `${t.type}|${t.original}|${t.correction}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

type ComprehensionItem = {
  questionId: string;
  questionText: string;
  maxPoints: number;
  correctAnswer: string;
  acceptableAnswers: string[];
  studentAnswer: string;
  sourceLabel: string;
  answerRowId: number;
};

/**
 * Mark a listening (CO) or reading (CE) attempt with ONE batched AI call.
 * The old implementation made one sequential AI call per question (10-13 calls,
 * several minutes wall-clock), which routinely outlived the worker and left
 * attempts stuck in pending_marking. One call finishes in well under a minute.
 */
async function markComprehension(
  c: any,
  db: any,
  attempt: any,
  content: any,
  userAnswers: any[]
): Promise<{ totalScore: number; scores: Record<string, any>; writes: any[] }> {
  const isListening = attempt.section === 'CO';

  const docs: { label: string; text: string; questions: any[]; answerKey: any[] }[] = isListening
    ? [
        {
          label: 'LONG DOCUMENT',
          text: content.listening.longDocument.transcript,
          questions: content.listening.longDocument.questions,
          answerKey: content.listening.longDocument.answerKey,
        },
        ...content.listening.shortDocuments.map((d: any, i: number) => ({
          label: `SHORT DOCUMENT ${i + 1}`,
          text: d.transcript,
          questions: d.questions,
          answerKey: d.answerKey,
        })),
      ]
    : [
        {
          label: 'TEXT',
          text: content.reading.text,
          questions: content.reading.questions,
          answerKey: content.reading.answerKey,
        },
      ];

  const allQuestions = docs.flatMap((d) => d.questions);
  const maxScore = allQuestions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);

  const answerByQ = new Map(userAnswers.map((a: any) => [a.questionId, a]));
  const items: ComprehensionItem[] = [];
  const usedSources = new Map<string, string>();

  for (const doc of docs) {
    const akMap = new Map((doc.answerKey || []).map((ak: any) => [ak.questionId, ak]));
    for (const q of doc.questions) {
      const ak = akMap.get(q.id);
      const ans = answerByQ.get(q.id);
      if (!ak || !ans) continue; // unanswered questions simply score 0
      usedSources.set(doc.label, doc.text);
      items.push({
        questionId: q.id,
        questionText: q.text,
        maxPoints: ak.points ?? q.points ?? 0,
        correctAnswer: String(ak.correctAnswer ?? ''),
        acceptableAnswers: Array.isArray(ak.acceptableAnswers) ? ak.acceptableAnswers : [],
        studentAnswer: ans.userAnswer || '',
        sourceLabel: doc.label,
        answerRowId: ans.id,
      });
    }
  }

  let resultsByQ = new Map<string, any>();
  if (items.length > 0) {
    const sourcesBlock = [...usedSources.entries()]
      .map(([label, text]) => `=== ${label} ===\n${text}`)
      .join('\n\n');
    const questionsBlock = items
      .map(
        (it) =>
          `QUESTION ID: ${it.questionId} | SOURCE: ${it.sourceLabel} | MAX POINTS: ${it.maxPoints}\n` +
          `QUESTION: ${it.questionText}\n` +
          `CORRECT ANSWER: ${it.correctAnswer}\n` +
          `ACCEPTABLE ANSWERS: ${it.acceptableAnswers.join(', ')}\n` +
          `STUDENT ANSWER: ${it.studentAnswer}`
      )
      .join('\n\n');

    const raw = await chatCompletion(
      c,
      [
        { role: 'system', content: MARKING_COMPREHENSION_BATCH_PROMPT },
        { role: 'user', content: `SOURCE TEXTS:\n${sourcesBlock}\n\nQUESTIONS AND STUDENT ANSWERS:\n${questionsBlock}` },
      ],
      { temperature: 0.3, max_tokens: 6144, jsonMode: true, timeoutMs: 90000 }
    );

    const parsed = JSON.parse(extractJson(raw));
    const results = Array.isArray(parsed?.results) ? parsed.results : [];
    resultsByQ = new Map(results.filter((r: any) => r && r.questionId != null).map((r: any) => [String(r.questionId), r]));
  }

  const writes: any[] = [];
  let totalScore = 0;

  for (const it of items) {
    const r = resultsByQ.get(it.questionId);
    const score = clamp(r?.score, 0, it.maxPoints);
    const feedbackText = typeof r?.feedback === 'string' ? r.feedback : '';
    totalScore += score;

    writes.push(
      db.update(answers).set({ aiScore: score, aiFeedback: feedbackText }).where(eq(answers.id, it.answerRowId))
    );

    for (const tag of normalizeErrorTags(r?.errorTags)) {
      writes.push(
        db.insert(errorLogs).values({
          userId: attempt.userId,
          attemptId: attempt.id,
          errorType: tag.type,
          originalText: tag.original,
          correction: tag.correction,
          explanation: tag.explanation,
        })
      );
    }
  }

  const scaled = maxScore > 0 ? (totalScore / maxScore) * 25 : 0;
  return { totalScore: scaled, scores: { raw: totalScore, max: maxScore, scaled }, writes };
}

async function runMarking(c: any, attemptId: number, userId: number) {
  const db = getDb(c.env.DB);

  // Single-flight claim: only one run may transition pending_marking -> marking.
  // Page reloads (the marking page polls every few seconds) can no longer spawn
  // duplicate runs that each append another copy of the error logs.
  const claimed = await db
    .update(attempts)
    .set({ status: 'marking', markingStartedAt: new Date() })
    .where(and(eq(attempts.id, attemptId), eq(attempts.status, 'pending_marking')))
    .returning();

  if (claimed.length === 0) return; // already claimed, completed, or gone
  const attempt = claimed[0];
  if (attempt.userId !== userId) return;

  const fail = async (message: string) => {
    await db
      .update(attempts)
      .set({ status: 'marking_failed', aiFeedback: { error: message } as any })
      .where(eq(attempts.id, attemptId));
  };

  try {
    const [exam] = await db.select().from(exams).where(eq(exams.id, attempt.examId));
    if (!exam) {
      await fail('Exam not found for this attempt');
      return;
    }

    // Idempotency: drop error logs written by earlier partial/duplicate runs of
    // this attempt before writing the fresh set below.
    await db.delete(errorLogs).where(eq(errorLogs.attemptId, attemptId));

    const content = exam.generatedContent as any;
    const userAnswers = await db.select().from(answers).where(eq(answers.attemptId, attemptId));

    let totalScore = 0;
    let scores: Record<string, any> = {};
    let feedback: Record<string, string> = {};
    const writes: any[] = [];

    if (attempt.section === 'CO' || attempt.section === 'CE') {
      const result = await markComprehension(c, db, attempt, content, userAnswers);
      totalScore = result.totalScore;
      scores = result.scores;
      writes.push(...result.writes);
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
        writes.push(
          db.insert(errorLogs).values({
            userId,
            attemptId,
            errorType: tag.type,
            originalText: tag.original,
            correction: tag.correction,
            explanation: tag.explanation,
          })
        );
      }

      const synAns = userAnswers.find((a) => a.questionId === 'synthese');
      const essAns = userAnswers.find((a) => a.questionId === 'essai');
      if (synAns) writes.push(db.update(answers).set({ aiScore: synScores.total, aiFeedback: feedback.synthese }).where(eq(answers.id, synAns.id)));
      if (essAns) writes.push(db.update(answers).set({ aiScore: essScores.total, aiFeedback: feedback.essai }).where(eq(answers.id, essAns.id)));
    } else if (attempt.section === 'PO') {
      const speakingAnswers = userAnswers.filter((a) => a.audioKey && a.questionId.startsWith('speaking'));

      // Transcribe in parallel and persist each transcript immediately, so a
      // crashed or timed-out run keeps its progress and retries stay cheap.
      const transcribed = await Promise.all(
        speakingAnswers.map(async (speakingAns) => {
          if (speakingAns.userAnswer) {
            return { ans: speakingAns, transcription: speakingAns.userAnswer }; // already transcribed
          }
          const obj = await getAudio(c, speakingAns.audioKey!);
          if (!obj) return { ans: speakingAns, transcription: '' };
          const buffer = await obj.arrayBuffer();
          const transcription = await transcribeAudio(c, buffer, `${speakingAns.questionId}.webm`, 'audio/webm', {
            timeoutMs: 45000,
          });
          await db.update(answers).set({ userAnswer: transcription }).where(eq(answers.id, speakingAns.id));
          return { ans: speakingAns, transcription };
        })
      );

      const transcripts: string[] = [];
      for (const { ans, transcription } of transcribed) {
        if (!transcription) continue;
        const label =
          ans.questionId === 'speaking'
            ? 'EXPOSÉ'
            : `QUESTION ${ans.questionId.replace('speaking-q', '')}`;
        transcripts.push(`[${label}]\n${transcription}`);
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
          writes.push(
            db.insert(errorLogs).values({
              userId,
              attemptId,
              errorType: tag.type,
              originalText: tag.original,
              correction: tag.correction,
              explanation: tag.explanation,
            })
          );
        }

        const exposeAns = speakingAnswers.find((a) => a.questionId === 'speaking');
        if (exposeAns) {
          writes.push(
            db.update(answers).set({ aiScore: speakingScores.total, aiFeedback: feedback.general }).where(eq(answers.id, exposeAns.id))
          );
        }
      }
    } else {
      await fail(`Unknown section: ${attempt.section}`);
      return;
    }

    // Final attempt update is part of the same atomic batch as the answer/error
    // writes, so an attempt can never be half-written.
    writes.push(
      db
        .update(attempts)
        .set({
          status: 'completed',
          totalScore: Math.round(totalScore * 10) / 10,
          scores: scores as any,
          aiFeedback: feedback as any,
        })
        .where(eq(attempts.id, attemptId))
    );

    if (writes.length > 0) {
      await db.batch(writes as [any, ...any[]]);
    }
  } catch (err: any) {
    console.error('Background marking failed:', err);
    try {
      await fail(err?.message || 'Unknown marking error');
    } catch (failErr: any) {
      console.error('Failed to record marking failure:', failErr);
    }
  }
}

function MarkingSpinner({ attemptId }: { attemptId: number }) {
  return (
    <div class="card" style="max-width:480px;margin:var(--space-12) auto;text-align:center;">
      <div class="marking-spinner"></div>
      <h1 style="font-family:var(--font-fun);font-size:1.5rem;margin-bottom:var(--space-3);">Marking your answers…</h1>
      <p style="color:var(--base-text-secondary);margin:0;">
        This usually takes under a minute. The page refreshes itself — no need to reload.
      </p>
      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(() => window.location.reload(), 5000);`,
        }}
      />
    </div>
  );
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
    const errMsg = (attempt.aiFeedback as any)?.error;
    return c.html(
      <Layout title="Marking Failed">
        <Navbar user={user} />
        <div class="container">
          <div class="card" style="max-width:520px;margin:var(--space-12) auto;">
            <div class="alert alert-danger">
              Marking failed{errMsg ? `: ${errMsg}` : ''}. Your answers are saved — retrying is safe and won't duplicate anything.
            </div>
            <form method="post" action={`/marking/${attemptId}/retry`} style="display:inline;">
              <button type="submit" class="btn btn-primary">Retry marking</button>
            </form>{' '}
            <a href={`/exams/${attempt.examId}/${attempt.section.toLowerCase()}?attempt=${attemptId}`} class="btn btn-secondary">
              Back to exam
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  // Reclaim abandoned marking runs (worker killed mid-flight left status stuck).
  if (attempt.status === 'marking') {
    const started = attempt.markingStartedAt ? new Date(attempt.markingStartedAt).getTime() : 0;
    if (!started || Date.now() - started > STALE_MARKING_MS) {
      await db
        .update(attempts)
        .set({ status: 'pending_marking' })
        .where(and(eq(attempts.id, attemptId), eq(attempts.status, 'marking')));
      attempt.status = 'pending_marking';
    }
  }

  if (attempt.status === 'pending_marking') {
    // Kick off background marking. runMarking claims the attempt atomically, so
    // concurrent reloads can't start duplicate runs.
    c.executionCtx.waitUntil(runMarking(c, attemptId, user.id));
  } else if (attempt.status !== 'marking') {
    return c.redirect(`/exams/${attempt.examId}/${attempt.section.toLowerCase()}?attempt=${attemptId}`);
  }

  return c.html(
    <Layout title="Marking…">
      <Navbar user={user} />
      <div class="container">
        <MarkingSpinner attemptId={attemptId} />
      </div>
    </Layout>
  );
});

marking.post('/marking/:attemptId/retry', authMiddleware(), async (c) => {
  const user = c.get('user');
  const attemptId = Number(c.req.param('attemptId'));
  const db = getDb(c.env.DB);

  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId));
  if (!attempt || attempt.userId !== user.id) return c.notFound();

  // Retry is allowed from a failed run, or a stale in-progress run.
  const retryable =
    attempt.status === 'marking_failed' ||
    (attempt.status === 'marking' &&
      (!attempt.markingStartedAt || Date.now() - new Date(attempt.markingStartedAt).getTime() > STALE_MARKING_MS));

  if (retryable) {
    await db
      .update(attempts)
      .set({ status: 'pending_marking' })
      .where(
        and(
          eq(attempts.id, attemptId),
          inArray(attempts.status, ['marking_failed', 'marking'])
        )
      );
  }

  return c.redirect(`/marking/${attemptId}`);
});

export default marking;
