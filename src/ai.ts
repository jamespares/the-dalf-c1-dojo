import { Context } from 'hono';

export interface AiBindings {
  AI_GATEWAY_URL: string;
  OPENAI_API_KEY: string;
  CF_GATEWAY_TOKEN?: string;
}

export async function chatCompletion(
  c: Context,
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  opts?: { model?: string; temperature?: number; max_tokens?: number; jsonMode?: boolean }
) {
  const gatewayUrl = c.env.AI_GATEWAY_URL || 'https://api.openai.com/v1';
  const apiKey = c.env.OPENAI_API_KEY;
  const model = opts?.model || 'openai/gpt-4o';

  const body: Record<string, unknown> = {
    model,
    messages,
    temperature: opts?.temperature ?? 0.7,
  };
  if (opts?.max_tokens) body.max_tokens = opts.max_tokens;
  if (opts?.jsonMode) body.response_format = { type: 'json_object' };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };
  if (c.env.CF_GATEWAY_TOKEN) {
    headers['cf-aig-authorization'] = `Bearer ${c.env.CF_GATEWAY_TOKEN}`;
  }

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

export async function generateTTS(
  c: Context,
  text: string,
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'alloy'
): Promise<ArrayBuffer> {
  const gatewayUrl = c.env.AI_GATEWAY_URL || 'https://api.openai.com/v1';
  const apiKey = c.env.OPENAI_API_KEY;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };
  if (c.env.CF_GATEWAY_TOKEN) {
    headers['cf-aig-authorization'] = `Bearer ${c.env.CF_GATEWAY_TOKEN}`;
  }

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
  const apiKey = c.env.OPENAI_API_KEY;

  const form = new FormData();
  form.append('file', new File([audioBuffer], filename, { type: contentType }));
  form.append('model', 'whisper-1');
  form.append('language', 'fr');

  const headers: Record<string, string> = { Authorization: `Bearer ${apiKey}` };
  if (c.env.CF_GATEWAY_TOKEN) {
    headers['cf-aig-authorization'] = `Bearer ${c.env.CF_GATEWAY_TOKEN}`;
  }

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
