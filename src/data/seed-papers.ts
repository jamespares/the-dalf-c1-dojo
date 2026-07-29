import { eq, like, or } from 'drizzle-orm';
import { getDb } from '../db';
import { exams } from '../db/schema';
import { STATIC_PAPERS, staticPaperTitle, type StaticPaper } from './static-papers';

/** Ensure curated free papers exist in D1 and keep audio/content in sync. */
export async function ensureStaticPapers(db: ReturnType<typeof getDb>): Promise<void> {
  for (const paper of STATIC_PAPERS) {
    await upsertStaticPaper(db, paper);
  }
}

async function upsertStaticPaper(
  db: ReturnType<typeof getDb>,
  paper: StaticPaper
): Promise<void> {
  const title = staticPaperTitle(paper);
  // Match new slug title or legacy "[static] {title}" rows
  const existing = await db
    .select()
    .from(exams)
    .where(
      or(
        eq(exams.title, title),
        eq(exams.title, `[static] ${paper.title}`),
        like(exams.title, `[static:${paper.slug}]%`)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(exams)
      .set({
        title,
        theme: paper.theme,
        generatedContent: paper.content as any,
        audioKeys: paper.audioKeys as any,
        status: 'active',
      })
      .where(eq(exams.id, existing[0].id));
    return;
  }

  await db.insert(exams).values({
    title,
    theme: paper.theme,
    generatedContent: paper.content as any,
    audioKeys: paper.audioKeys as any,
    status: 'active',
  });
}

export function displayExamTitle(title: string): string {
  return title
    .replace(/^\[static:[^\]]+\]\s*/, '')
    .replace(/^\[static\]\s*/, '');
}

export function isStaticExamTitle(title: string): boolean {
  return title.startsWith('[static]') || title.startsWith('[static:');
}
