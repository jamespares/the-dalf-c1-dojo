import { Context } from 'hono';
import { z } from 'zod';

export const MARKING_MODEL = '@cf/moonshotai/kimi-k2.6';
export const WHISPER_MODEL = '@cf/openai/whisper-large-v3-turbo';

export interface AiBindings {
  AI: Ai;
  AI_GATEWAY_URL?: string;
  CF_AIG_TOKEN?: string;
  OPENAI_API_KEY?: string;
  CF_GATEWAY_TOKEN?: string;
  INSIGHTS_MODEL?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Run a chat completion via Cloudflare Workers AI (Kimi K2.6 by default). */
export async function chatCompletion(
  c: Context,
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  opts?: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
    jsonMode?: boolean;
    timeoutMs?: number;
  }
) {
  const model = opts?.model || MARKING_MODEL;
  const ai = c.env.AI as Ai | undefined;
  if (!ai) {
    throw new Error('Workers AI binding (env.AI) is not configured');
  }

  const input: Record<string, unknown> = {
    messages,
    temperature: opts?.temperature ?? 0.7,
    max_tokens: opts?.max_tokens ?? 2048,
  };
  if (opts?.jsonMode) {
    input.response_format = { type: 'json_object' };
  }

  // Disable thinking mode for faster, cheaper structured marking
  input.chat_template_kwargs = { thinking: false };

  const result = (await ai.run(model as any, input as any)) as any;

  // Workers AI return shapes vary by model / gateway
  if (typeof result === 'string') return result;
  if (result?.response) return String(result.response);
  if (result?.choices?.[0]?.message?.content) {
    return String(result.choices[0].message.content);
  }
  if (result?.result?.response) return String(result.result.response);
  throw new Error('Unexpected Workers AI response shape: ' + JSON.stringify(result).slice(0, 200));
}

export function splitTextForTTS(text: string, maxChars = 3500): string[] {
  const chunks: string[] = [];
  const paragraphs = text.split(/\n\n+/);
  let current = '';

  for (const para of paragraphs) {
    if ((current + '\n\n' + para).length > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = para;
    } else {
      current = current ? current + '\n\n' + para : para;
    }
  }

  if (current.trim().length > 0) {
    chunks.push(current.trim());
  }

  const result: string[] = [];
  for (const chunk of chunks) {
    if (chunk.length <= maxChars) {
      result.push(chunk);
      continue;
    }
    const sentences = chunk.split(/(?<=[.!?…])\s+/);
    let sentenceBuf = '';
    for (const sentence of sentences) {
      if ((sentenceBuf + ' ' + sentence).length > maxChars && sentenceBuf.length > 0) {
        result.push(sentenceBuf.trim());
        sentenceBuf = sentence;
      } else {
        sentenceBuf = sentenceBuf ? sentenceBuf + ' ' + sentence : sentence;
      }
    }
    if (sentenceBuf.trim().length > 0) {
      result.push(sentenceBuf.trim());
    }
  }

  return result;
}

/** Optional TTS via AI Gateway (admin authoring only). Returns empty if no key. */
export async function generateTTS(
  c: Context,
  text: string,
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'alloy',
  opts?: { timeoutMs?: number }
): Promise<ArrayBuffer> {
  const gatewayUrl = c.env.AI_GATEWAY_URL || 'https://api.openai.com/v1';
  const token = c.env.CF_AIG_TOKEN || c.env.OPENAI_API_KEY;
  if (!token) {
    throw new Error('TTS requires CF_AIG_TOKEN or OPENAI_API_KEY (admin authoring only)');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), opts?.timeoutMs ?? 30000);

  try {
    const res = await fetch(`${gatewayUrl}/audio/speech`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ model: 'tts-1', input: text, voice }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`TTS failed: ${res.status} ${err}`);
    }
    return res.arrayBuffer();
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Transcribe audio via Workers AI Whisper (French). */
export async function transcribeAudio(
  c: Context,
  audioBuffer: ArrayBuffer,
  _filename: string,
  _contentType: string = 'audio/mpeg',
  _opts?: { timeoutMs?: number }
): Promise<string> {
  const ai = c.env.AI as Ai | undefined;
  if (!ai) {
    throw new Error('Workers AI binding (env.AI) is not configured');
  }

  const bytes = new Uint8Array(audioBuffer);
  // Base64-encode for Workers AI Whisper input
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  const audioBase64 = btoa(binary);

  const result = (await ai.run(WHISPER_MODEL as any, {
    audio: audioBase64,
    task: 'transcribe',
    language: 'fr',
  } as any)) as any;

  if (typeof result === 'string') return result;
  if (result?.text) return String(result.text);
  if (result?.result?.text) return String(result.result.text);
  if (result?.transcription) return String(result.transcription);
  throw new Error('Unexpected Whisper response: ' + JSON.stringify(result).slice(0, 200));
}

/** Extract JSON from a string that may be wrapped in markdown code blocks. */
export function extractJson(text: string): string {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)```/) || text.match(/```\s*([\s\S]*?)```/);
  return jsonMatch ? jsonMatch[1].trim() : text.trim();
}

export interface AiInsights {
  summary: string;
  focusAreas: string[];
  trends: { section: string; direction: 'improving' | 'declining' | 'stable'; comment: string }[];
  recommendations: string[];
  strengths: string[];
}

const AiInsightsSchema = z.object({
  summary: z.string().min(1),
  focusAreas: z.array(z.string()).min(1),
  trends: z.array(
    z.object({
      section: z.string(),
      direction: z.enum(['improving', 'declining', 'stable']),
      comment: z.string(),
    })
  ),
  recommendations: z.array(z.string()).min(1),
  strengths: z.array(z.string()).min(1),
});

export interface AiInsightsPayload {
  completedAttempts: number;
  sectionAverages: { section: string; average: number | null; count: number }[];
  errorBreakdown: { type: string; count: number }[];
  recentAttempts: { section: string; score: number | null; status: string; date: string }[];
}

const INSIGHTS_SYSTEM_PROMPT = `You are an expert DALF C1 French exam tutor and data analyst. You have been given a student's exam performance data. Your job is to analyse their progress and provide a concise, encouraging, and actionable summary.

You MUST respond with ONLY a valid JSON object. Do not include markdown formatting, explanations, or any text outside the JSON. The JSON must match this exact schema:

{
  "summary": "1-2 sentence overall narrative about the student's progress",
  "focusAreas": ["Area 1", "Area 2"],
  "trends": [
    { "section": "Listening", "direction": "improving", "comment": "Brief comment" }
  ],
  "recommendations": ["Specific actionable recommendation 1", "Recommendation 2", "Recommendation 3"],
  "strengths": ["What the student is doing well 1", "Strength 2"]
}

Rules:
- summary: Be encouraging but honest. Mention overall trajectory.
- focusAreas: Ranked list of 1-3 weakest areas based on error frequency and low scores. Use capitalised names like "Grammar", "Vocabulary", "Structure", "Register", "Pronunciation".
- trends: One entry per section the student has attempted. Direction must be exactly "improving", "declining", or "stable".
- recommendations: 3 specific, actionable next steps tailored to their weakest areas.
- strengths: 1-2 things they are doing well to keep them motivated.
- All text should be in English.`;

export async function generateAiInsights(
  c: Context,
  payload: AiInsightsPayload
): Promise<AiInsights> {
  const raw = await chatCompletion(
    c,
    [
      { role: 'system', content: INSIGHTS_SYSTEM_PROMPT },
      { role: 'user', content: JSON.stringify(payload) },
    ],
    { jsonMode: true, timeoutMs: 30000, temperature: 0.3 }
  );

  const jsonString = extractJson(raw);

  try {
    const parsed = JSON.parse(jsonString);
    const validated = AiInsightsSchema.parse(parsed);
    return validated;
  } catch {
    throw new Error('Failed to parse AI insights response');
  }
}

// Keep sleep export unused-safe for retries if needed later
void sleep;
