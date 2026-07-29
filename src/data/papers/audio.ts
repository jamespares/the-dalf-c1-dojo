import type { AudioKeys } from '../../types';

/** Canonical R2/public paths for curated paper TTS assets. */
export function audio(slug: string): AudioKeys {
  return {
    listeningLong: `/papers/${slug}/audio/long.mp3`,
    listeningShort: [
      `/papers/${slug}/audio/short-1.mp3`,
      `/papers/${slug}/audio/short-2.mp3`,
    ],
  };
}
