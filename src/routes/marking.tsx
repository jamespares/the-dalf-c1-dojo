import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { getDb } from '../db';
import { attempts, exams, answers, errorLogs } from '../db/schema';
import { authMiddleware } from '../auth';
import { chatCompletion, transcribeAudio } from '../ai';
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

      for (const ans of userAnswers) {
        const q = allQuestions.find((qq: any) => qq.id === ans.questionId);
        const ak = answerKeyMap.get(ans.questionId);
        if (!q || !ak) continue;

        const sourceText =
          attempt.section === 'CO'
            ? content.listening.longDocument.transcript
            : content.reading.text;

        const resultJson = await chatCompletion(
          c,
          [
            { role: 'system', content: MARKING_COMPREHENSION_PROMPT },
            {
              role: 'user',
              content: `SOURCE TEXT:\n${sourceText}\n\nQUESTION: ${q.text}\nCORRECT ANSWER: ${ak.correctAnswer}\nACCEPTABLE ANSWERS: ${(ak.acceptableAnswers || []).join(', ')}\nMAX POINTS: ${ak.points}\n\nSTUDENT ANSWER:\n${ans.userAnswer || ''}`,
            },
          ],
          { temperature: 0.3, max_tokens: 800, jsonMode: true }
        );

        const result = JSON.parse(resultJson);
        totalScore += result.score;

        await db
          .update(answers)
          .set({ aiScore: result.score, aiFeedback: result.feedback })
          .where(eq(answers.id, ans.id));

        if (result.errorTags?.length) {
          for (const tag of result.errorTags) {
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
        { temperature: 0.3, max_tokens: 1500, jsonMode: true }
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
        { temperature: 0.3, max_tokens: 1500, jsonMode: true }
      );

      const synResult = JSON.parse(synResultJson);
      const essResult = JSON.parse(essResultJson);

      scores = { synthese: synResult.scores, essai: essResult.scores };
      totalScore = synResult.scores.total + essResult.scores.total;
      feedback = { synthese: synResult.feedback, essai: essResult.feedback };

      for (const tag of [...(synResult.errorTags || []), ...(essResult.errorTags || [])]) {
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
      if (synAns) await db.update(answers).set({ aiScore: synResult.scores.total, aiFeedback: synResult.feedback }).where(eq(answers.id, synAns.id));
      if (essAns) await db.update(answers).set({ aiScore: essResult.scores.total, aiFeedback: essResult.feedback }).where(eq(answers.id, essAns.id));
    } else if (attempt.section === 'PO') {
      const speakingAns = userAnswers.find((a) => a.questionId === 'speaking');
      if (speakingAns?.audioKey) {
        const obj = await getAudio(c, speakingAns.audioKey);
        if (obj) {
          const buffer = await obj.arrayBuffer();
          const transcription = await transcribeAudio(c, buffer, 'speaking.webm', 'audio/webm');

          const resultJson = await chatCompletion(
            c,
            [
              { role: 'system', content: MARKING_SPEAKING_PROMPT },
              {
                role: 'user',
                content: `DOSSIER:\n${content.speaking.dossier.map((d: any) => d.text).join('\n\n')}\n\nSTUDENT TRANSCRIPTION:\n${transcription}`,
              },
            ],
            { temperature: 0.3, max_tokens: 1500, jsonMode: true }
          );

          const result = JSON.parse(resultJson);
          scores = result.scores;
          totalScore = result.scores.total;
          feedback = { general: result.feedback, transcription };

          for (const tag of result.errorTags || []) {
            await db.insert(errorLogs).values({
              userId,
              attemptId,
              errorType: tag.type,
              originalText: tag.original,
              correction: tag.correction,
              explanation: tag.explanation,
            });
          }

          await db
            .update(answers)
            .set({ aiScore: result.scores.total, aiFeedback: result.feedback })
            .where(eq(answers.id, speakingAns.id));
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
