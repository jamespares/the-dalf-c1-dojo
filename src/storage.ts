import { Context } from 'hono';

export async function uploadAudio(
  c: Context,
  key: string,
  data: ArrayBuffer,
  contentType = 'audio/mpeg'
) {
  const bucket = c.env.AUDIO_BUCKET as R2Bucket;
  await bucket.put(key, data, { httpMetadata: { contentType } });
  return key;
}

export async function getAudio(c: Context, key: string): Promise<R2ObjectBody | null> {
  const bucket = c.env.AUDIO_BUCKET as R2Bucket;
  return bucket.get(key);
}

export function audioKey(examId: number, section: string, name: string): string {
  return `exams/${examId}/${section}/${name}`;
}

export function userAudioKey(userId: number, attemptId: number, name: string): string {
  return `users/${userId}/attempts/${attemptId}/${name}`;
}
