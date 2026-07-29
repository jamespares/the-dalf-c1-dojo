import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { exams } from '../db/schema';
import { STATIC_PAPERS } from './static-papers';

const STATIC_MARKER = '[static]';

/** Ensure curated free papers exist in D1. Idempotent. */
export async function ensureStaticPapers(db: ReturnType<typeof getDb>): Promise<void> {
  for (const paper of STATIC_PAPERS) {
    const title = `${STATIC_MARKER} ${paper.title}`;
    const existing = await db.select().from(exams).where(eq(exams.title, title)).limit(1);
    if (existing.length > 0) continue;

    await db.insert(exams).values({
      title,
      theme: paper.theme,
      generatedContent: paper.content as any,
      audioKeys: paper.audioKeys as any,
      status: 'active',
    });
  }
}

export function displayExamTitle(title: string): string {
  return title.replace(/^\[static\]\s*/, '');
}
