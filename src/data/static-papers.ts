import type { ExamGeneratedContent } from '../types';
import { CURATED_PAPERS } from './papers';
import type { StaticPaper } from './papers/types';

export type { StaticPaper, ExamGeneratedContent };
export { CURATED_PAPERS };
export { audio } from './papers/audio';

/** Transcripts used by scripts/generate-paper-audio.py via paper-transcripts.json */
export function getPaperAudioTranscripts(): {
  slug: string;
  long: string;
  shorts: string[];
}[] {
  return STATIC_PAPERS.map((p) => ({
    slug: p.slug,
    long: p.content.listening.longDocument.transcript,
    shorts: p.content.listening.shortDocuments.map((d) => d.transcript),
  }));
}

export function staticPaperTitle(paper: StaticPaper): string {
  return `[static:${paper.slug}] ${paper.title}`;
}

/** Curated free mock papers (CO / CE / PE / PO). Seeded into D1 on first visit. */
export const STATIC_PAPERS: StaticPaper[] = CURATED_PAPERS;
