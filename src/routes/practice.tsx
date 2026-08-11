import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { getDb } from '../db';
import { practiceProgress } from '../db/schema';
import { authMiddleware } from '../auth';
import { DashboardLayout } from '../components/DashboardLayout';
import {
  BookOpen,
  Headphones,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  GraduationCap,
} from '../components/Icons';
import {
  CEFR_STORIES,
  getStoryByLevel,
  getNextLevel,
  type CEFRLevel,
} from '../data/cefr-stories';

const practiceRoutes = new Hono<{ Bindings: CloudflareBindings }>();

const LEVEL_ORDER: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function levelBadgeClass(level: CEFRLevel): string {
  switch (level) {
    case 'A1':
      return 'level-badge level-a1';
    case 'A2':
      return 'level-badge level-a2';
    case 'B1':
      return 'level-badge level-b1';
    case 'B2':
      return 'level-badge level-b2';
    case 'C1':
      return 'level-badge level-c1';
    case 'C2':
      return 'level-badge level-c2';
    default:
      return 'level-badge';
  }
}

practiceRoutes.get('/practice', authMiddleware(), async (c) => {
  const user = c.get('user');
  const db = getDb(c.env.DB);

  const progressRows = await db
    .select()
    .from(practiceProgress)
    .where(eq(practiceProgress.userId, user.id));

  const mastered = new Set(progressRows.filter((r) => r.mastered).map((r) => r.level));

  const nextLevel = LEVEL_ORDER.find((lvl) => !mastered.has(lvl)) ?? null;
  const allMastered = mastered.size === LEVEL_ORDER.length;

  return c.html(
    <DashboardLayout title="Practice Levels" active="practice" user={user}>
      <div style="margin-bottom:var(--space-6);">
        <h2 style="margin:0 0 var(--space-3);">Practice Levels (Niveaux CECR)</h2>
        <p style="margin:0;color:var(--muted);max-width:720px;line-height:1.55;">
          Read, listen and learn each story. As soon as you master a story, you master the
          associated CEFR level. We recommend starting your practice tests after you have
          mastered each story.
        </p>
      </div>

      {allMastered && (
        <div class="card" style="border-left:4px solid var(--success);margin-bottom:var(--space-6);">
          <div style="display:flex;align-items:center;gap:var(--space-3);">
            <GraduationCap size={24} style={{ color: 'var(--success)' }} />
            <div>
              <strong style="font-size:1.1rem;">Félicitations !</strong>
              <p style="margin:0;color:var(--muted);">
                You have mastered all CEFR levels. You are ready for full DALF C1 practice papers.
              </p>
            </div>
          </div>
        </div>
      )}

      {!allMastered && nextLevel && (
        <div class="card" style="border-left:4px solid var(--accent);margin-bottom:var(--space-6);">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-4);flex-wrap:wrap;">
            <div>
              <p style="margin:0 0 var(--space-2);color:var(--muted);font-size:0.9rem;">Recommended next level</p>
              <h3 style="margin:0 0 var(--space-2);display:flex;align-items:center;gap:var(--space-3);">
                <span class={levelBadgeClass(nextLevel)}>{nextLevel}</span>
                {getStoryByLevel(nextLevel)?.englishTitle}
              </h3>
              <p style="margin:0;color:var(--muted);">
                {getStoryByLevel(nextLevel)?.estimatedTime} · {getStoryByLevel(nextLevel)?.vocab.length} vocab items
              </p>
            </div>
            <a href={`/practice/${nextLevel}`} class="btn btn-primary" style="align-self:center;">
              Start <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}

      <div style="display:grid;gap:var(--space-4);grid-template-columns:repeat(auto-fill,minmax(260px,1fr));">
        {CEFR_STORIES.map((story, idx) => {
          const isMastered = mastered.has(story.level);
          const previousMastered = idx === 0 || mastered.has(LEVEL_ORDER[idx - 1]);
          const unlocked = previousMastered || isMastered;
          return (
            <div class={`card ${unlocked ? 'card-hover' : ''}`} style={unlocked ? '' : 'opacity:0.65;'}>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-3);">
                <span class={levelBadgeClass(story.level)}>{story.level}</span>
                {isMastered ? (
                  <span class="score-badge score-pass" style="font-size:0.75rem;">
                    <CheckCircle size={12} /> Mastered
                  </span>
                ) : unlocked ? (
                  <span class="status-badge status-warning" style="font-size:0.75rem;">In progress</span>
                ) : (
                  <span class="status-badge" style="font-size:0.75rem;">Locked</span>
                )}
              </div>
              <h3 style="margin:0 0 var(--space-2);font-size:1.1rem;">{story.englishTitle}</h3>
              <p style="margin:0 0 var(--space-3);color:var(--muted);font-size:0.9rem;line-height:1.5;">
                {story.title}
              </p>
              <p style="margin:0 0 var(--space-4);color:var(--muted);font-size:0.85rem;">
                {story.estimatedTime} · {story.vocab.length} vocabulary items
              </p>
              {unlocked ? (
                <a href={`/practice/${story.level}`} class="btn btn-primary" style="width:100%;justify-content:center;">
                  {isMastered ? 'Review' : 'Practice'} <ArrowRight size={16} />
                </a>
              ) : (
                <button disabled class="btn btn-secondary" style="width:100%;opacity:0.6;cursor:not-allowed;">
                  Complete {LEVEL_ORDER[idx - 1]} first
                </button>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
});

practiceRoutes.get('/practice/:level', authMiddleware(), async (c) => {
  const user = c.get('user');
  const rawLevel = c.req.param('level') ?? '';
  const story = getStoryByLevel(rawLevel);

  if (!story) return c.notFound();

  const db = getDb(c.env.DB);
  const [progress] = await db
    .select()
    .from(practiceProgress)
    .where(and(eq(practiceProgress.userId, user.id), eq(practiceProgress.level, story.level)))
    .limit(1);

  const isMastered = progress?.mastered ?? false;
  const nextLevel = getNextLevel(story.level);

  return c.html(
    <DashboardLayout title={`Practice ${story.level}`} active="practice" user={user}>
      <a href="/practice" class="btn btn-outline btn-sm" style="margin-bottom:var(--space-4);">
        <ChevronLeft size={16} /> Back to levels
      </a>

      <div class="card" style="margin-bottom:var(--space-6);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:var(--space-4);flex-wrap:wrap;margin-bottom:var(--space-4);">
          <div>
            <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-2);">
              <span class={levelBadgeClass(story.level)}>{story.level}</span>
              {isMastered && (
                <span class="score-badge score-pass" style="font-size:0.75rem;">
                  <CheckCircle size={12} /> Mastered
                </span>
              )}
            </div>
            <h2 style="margin:0;">{story.title}</h2>
            <p style="margin:var(--space-2) 0 0;color:var(--muted);">{story.englishTitle}</p>
          </div>
          <div style="display:flex;align-items:center;gap:var(--space-2);color:var(--muted);font-size:0.9rem;">
            <Sparkles size={16} />
            {story.vocab.length} words · {story.estimatedTime}
          </div>
        </div>

        <div class="practice-instructions">
          <BookOpen size={18} />
          <div>
            <strong>Read, listen and learn this story.</strong>
            <p style="margin:0;color:var(--muted);font-size:0.9rem;">
              As soon as you master this story, you master the {story.level} level. We recommend
              starting your practice tests after you have mastered each story.
            </p>
          </div>
        </div>

        <div style="margin:var(--space-5) 0;">
          <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3);">
            <Headphones size={20} style={{ color: 'var(--accent)' }} />
            <strong>Listen</strong>
          </div>
          <audio controls src={story.audioPath} style="width:100%;max-width:640px;">
            Your browser does not support the audio element.
          </audio>
        </div>

        <div style="margin:var(--space-5) 0;">
          <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3);">
            <BookOpen size={20} style={{ color: 'var(--accent)' }} />
            <strong>Read</strong>
          </div>
          <div class="reading-passage" style="background:var(--accent-bg-light);padding:var(--space-5);border-radius:var(--radius-lg);white-space:pre-wrap;">
            {story.story}
          </div>
        </div>

        <div style="margin:var(--space-5) 0;">
          <h3 style="margin-bottom:var(--space-3);">English summary</h3>
          <p style="color:var(--muted);line-height:1.6;">{story.englishSummary}</p>
        </div>

        <details style="margin:var(--space-5) 0;">
          <summary style="cursor:pointer;font-weight:600;font-size:1.05rem;">
            Vocabulary ({story.vocab.length} items)
          </summary>
          <div class="vocab-grid" style="margin-top:var(--space-4);">
            {story.vocab.map((item) => (
              <div class="vocab-card">
                <div class="vocab-french">{item.french}</div>
                <div class="vocab-english">{item.english}</div>
                {item.example && <div class="vocab-example">{item.example}</div>}
              </div>
            ))}
          </div>
        </details>

        <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;align-items:center;margin-top:var(--space-6);padding-top:var(--space-5);border-top:1px solid var(--base-border);">
          <form method="post" action={`/practice/${story.level}/master`} style="margin:0;">
            <input type="hidden" name="mastered" value={isMastered ? 'false' : 'true'} />
            <button type="submit" class={isMastered ? 'btn btn-outline' : 'btn btn-primary'}>
              {isMastered ? (
                <>
                  <CheckCircle size={16} /> Mark as not yet mastered
                </>
              ) : (
                <>
                  <CheckCircle size={16} /> I have mastered this story
                </>
              )}
            </button>
          </form>

          {isMastered && nextLevel && (
            <a href={`/practice/${nextLevel}`} class="btn btn-primary">
              Next level: {nextLevel} <ArrowRight size={16} />
            </a>
          )}

          {isMastered && !nextLevel && (
            <a href="/exams" class="btn btn-primary">
              Start DALF C1 papers <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
});

practiceRoutes.post('/practice/:level/master', authMiddleware(), async (c) => {
  const user = c.get('user');
  const rawLevel = c.req.param('level') ?? '';
  const story = getStoryByLevel(rawLevel);
  if (!story) return c.notFound();

  const body = await c.req.parseBody<{ mastered?: string }>();
  const wantMastered = body.mastered === 'true';

  const db = getDb(c.env.DB);
  const [existing] = await db
    .select()
    .from(practiceProgress)
    .where(and(eq(practiceProgress.userId, user.id), eq(practiceProgress.level, story.level)))
    .limit(1);

  if (existing) {
    await db
      .update(practiceProgress)
      .set({
        mastered: wantMastered,
        masteredAt: wantMastered ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(practiceProgress.id, existing.id));
  } else {
    await db.insert(practiceProgress).values({
      userId: user.id,
      level: story.level,
      mastered: wantMastered,
      masteredAt: wantMastered ? new Date() : null,
    });
  }

  return c.redirect(`/practice/${story.level}`);
});

export default practiceRoutes;
