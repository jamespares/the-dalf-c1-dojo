import { Context } from 'hono';

export interface AiBindings {
  AI_GATEWAY_URL: string;
  /** Cloudflare unified billing token (preferred). Sent via `Authorization`. */
  CF_AIG_TOKEN?: string;
  /** Your own OpenAI API key (pass-through mode). */
  OPENAI_API_KEY?: string;
  /** Optional AI Gateway access-control token. Sent via `cf-aig-authorization`. */
  CF_GATEWAY_TOKEN?: string;
}

function resolveAuthHeaders(c: Context): Record<string, string> {
  const token = c.env.CF_AIG_TOKEN || c.env.OPENAI_API_KEY;
  if (!token) {
    throw new Error(
      'No AI token configured. Set CF_AIG_TOKEN (Cloudflare unified billing) or OPENAI_API_KEY (pass-through).'
    );
  }
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  if (c.env.CF_GATEWAY_TOKEN) {
    headers['cf-aig-authorization'] = `Bearer ${c.env.CF_GATEWAY_TOKEN}`;
  }
  return headers;
}

export async function chatCompletion(
  c: Context,
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  opts?: { model?: string; temperature?: number; max_tokens?: number; jsonMode?: boolean }
) {
  const gatewayUrl = c.env.AI_GATEWAY_URL || 'https://api.openai.com/v1';
  const model = opts?.model || 'gpt-4o';

  const body: Record<string, unknown> = {
    model,
    messages,
    temperature: opts?.temperature ?? 0.7,
  };
  if (opts?.max_tokens) body.max_tokens = opts.max_tokens;
  if (opts?.jsonMode) body.response_format = { type: 'json_object' };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...resolveAuthHeaders(c),
  };

  const res = await fetch(`${gatewayUrl}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI request failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    choices: Array<{ message: { content: string } }>;
  };
  return data.choices[0]?.message?.content ?? '';
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

  // If any chunk is still too long, split by sentences
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

export async function generateTTS(
  c: Context,
  text: string,
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'alloy'
): Promise<ArrayBuffer> {
  const gatewayUrl = c.env.AI_GATEWAY_URL || 'https://api.openai.com/v1';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...resolveAuthHeaders(c),
  };

  const res = await fetch(`${gatewayUrl}/audio/speech`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ model: 'tts-1', input: text, voice }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`TTS failed: ${res.status} ${err}`);
  }

  return res.arrayBuffer();
}

export async function transcribeAudio(
  c: Context,
  audioBuffer: ArrayBuffer,
  filename: string,
  contentType: string = 'audio/mpeg'
): Promise<string> {
  const gatewayUrl = c.env.AI_GATEWAY_URL || 'https://api.openai.com/v1';

  const form = new FormData();
  form.append('file', new File([audioBuffer], filename, { type: contentType }));
  form.append('model', 'whisper-1');
  form.append('language', 'fr');

  const headers = resolveAuthHeaders(c);

  const res = await fetch(`${gatewayUrl}/audio/transcriptions`, {
    method: 'POST',
    headers,
    body: form,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Transcription failed: ${res.status} ${err}`);
  }

  const data = (await res.json()) as { text: string };
  return data.text;
}

export interface AiInsights {
  summary: string;
  focusAreas: string[];
  trends: { section: string; direction: 'improving' | 'declining' | 'stable'; comment: string }[];
  recommendations: string[];
  strengths: string[];
}

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
  const response = (await c.env.AI.run('@cf/moonshotai/kimi-k2.6', {
    messages: [
      { role: 'system', content: INSIGHTS_SYSTEM_PROMPT },
      { role: 'user', content: JSON.stringify(payload) },
    ],
    chat_template_kwargs: { thinking: true },
  })) as { response?: string; reasoning?: string };

  const raw = response.response ?? '';

  // Extract JSON from possible markdown code blocks
  const jsonMatch = raw.match(/```json\s*([\s\S]*?)```/) || raw.match(/```\s*([\s\S]*?)```/);
  const jsonString = jsonMatch ? jsonMatch[1].trim() : raw.trim();

  try {
    const parsed = JSON.parse(jsonString) as AiInsights;
    // Basic validation
    if (!parsed.summary || !Array.isArray(parsed.focusAreas) || !Array.isArray(parsed.recommendations)) {
      throw new Error('Invalid insights structure');
    }
    return parsed;
  } catch {
    throw new Error('Failed to parse AI insights response');
  }
}
