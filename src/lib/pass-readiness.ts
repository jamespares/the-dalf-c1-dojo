/** Pass readiness from recent completed section attempts (evidence-based, not a guarantee). */

export type SectionCode = 'CO' | 'CE' | 'PE' | 'PO';

export const SECTIONS: SectionCode[] = ['CO', 'CE', 'PE', 'PO'];
export const WINDOW_SIZE = 6;
export const PASS_THRESHOLD_SECTION = 5; // /25 eliminatory
export const PASS_THRESHOLD_TOTAL = 50; // /100

export interface AttemptScore {
  section: string;
  totalScore: number | null;
  status: string;
  startedAt?: Date | string | null;
}

export interface SectionStats {
  section: SectionCode;
  average: number | null;
  count: number;
  recentScores: number[];
}

export type Confidence = 'Low' | 'Medium' | 'High';

export interface PassReadiness {
  readinessPct: number;
  confidence: Confidence;
  avgTotal: number | null;
  sections: SectionStats[];
  minAttempts: number;
  attemptsNeeded: number;
  belowEliminatory: SectionCode[];
  explanation: string;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/** Take the last N completed scores per section (most recent first in input → keep newest). */
export function computePassReadiness(allAttempts: AttemptScore[]): PassReadiness {
  const completed = allAttempts
    .filter((a) => a.status === 'completed' && a.totalScore != null)
    .sort((a, b) => {
      const ta = a.startedAt ? new Date(a.startedAt).getTime() : 0;
      const tb = b.startedAt ? new Date(b.startedAt).getTime() : 0;
      return tb - ta; // newest first
    });

  const sections: SectionStats[] = SECTIONS.map((section) => {
    const scores = completed
      .filter((a) => a.section === section)
      .slice(0, WINDOW_SIZE)
      .map((a) => a.totalScore as number);
    const count = scores.length;
    const average = count > 0 ? scores.reduce((s, n) => s + n, 0) / count : null;
    return { section, average, count, recentScores: scores };
  });

  const minAttempts = Math.min(...sections.map((s) => s.count));
  const attemptsNeeded = Math.max(0, WINDOW_SIZE - minAttempts);

  const belowEliminatory = sections
    .filter((s) => s.average != null && s.average < PASS_THRESHOLD_SECTION)
    .map((s) => s.section);

  const withScores = sections.filter((s) => s.average != null);
  const avgTotal =
    withScores.length === SECTIONS.length
      ? withScores.reduce((sum, s) => sum + (s.average as number), 0)
      : withScores.length > 0
        ? // Partial: scale sum of available sections to /100 equivalent
          (withScores.reduce((sum, s) => sum + (s.average as number), 0) / withScores.length) * 4
        : null;

  let readinessPct = 0;
  if (avgTotal != null) {
    // 50/100 ≈ 100% readiness ceiling
    readinessPct = clamp((avgTotal / PASS_THRESHOLD_TOTAL) * 100, 0, 100);
  }

  if (belowEliminatory.length > 0) {
    readinessPct = Math.min(readinessPct, 15);
  }

  // Confidence from how many attempts we have in the weakest section
  let confidence: Confidence = 'Low';
  if (minAttempts >= WINDOW_SIZE) confidence = 'High';
  else if (minAttempts >= 3) confidence = 'Medium';

  // Soften readiness when confidence is low
  if (confidence === 'Low' && withScores.length < SECTIONS.length) {
    readinessPct = Math.round(readinessPct * 0.6);
  } else if (confidence === 'Medium') {
    readinessPct = Math.round(readinessPct * 0.85);
  } else {
    readinessPct = Math.round(readinessPct);
  }

  let explanation: string;
  if (withScores.length === 0) {
    explanation =
      'Complete practice attempts across listening, reading, writing, and oral to unlock your pass readiness rating.';
  } else if (belowEliminatory.length > 0) {
    explanation = `One or more sections average below the eliminatory floor of ${PASS_THRESHOLD_SECTION}/25 (${belowEliminatory.join(', ')}). Focus there before your readiness can rise.`;
  } else if (attemptsNeeded > 0) {
    explanation = `Based on your recent drills (last ${WINDOW_SIZE} per section). Complete ${attemptsNeeded} more attempt${attemptsNeeded === 1 ? '' : 's'} in your weakest section for High confidence.`;
  } else if (avgTotal != null && avgTotal >= PASS_THRESHOLD_TOTAL) {
    explanation = `Your recent averages total ${avgTotal.toFixed(1)}/100 — at or above the official ${PASS_THRESHOLD_TOTAL}/100 pass bar, with no eliminatory risk in the last ${WINDOW_SIZE} attempts per section.`;
  } else {
    explanation = `Your recent averages total ${avgTotal?.toFixed(1) ?? '—'}/100. Keep drilling until you sit comfortably above ${PASS_THRESHOLD_TOTAL}/100 with all sections above ${PASS_THRESHOLD_SECTION}/25.`;
  }

  return {
    readinessPct,
    confidence,
    avgTotal,
    sections,
    minAttempts,
    attemptsNeeded,
    belowEliminatory,
    explanation,
  };
}
