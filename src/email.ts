interface CloudflareEmailRecipient {
  address: string;
  name?: string;
}

interface CloudflareEmailPayload {
  to: string | string[];
  from: string | CloudflareEmailRecipient;
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  reply_to?: string;
  headers?: Record<string, string>;
}

interface SendEmailOpts {
  to: string | string[];
  from?: string | CloudflareEmailRecipient;
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  headers?: Record<string, string>;
}

function parseFrom(
  from: string | CloudflareEmailRecipient | undefined,
  defaultFrom: string
): string | CloudflareEmailRecipient {
  const raw = from || defaultFrom;
  if (typeof raw === 'object') return raw;

  const match = raw.match(/^(.+?)\s*<(.+?)>$/);
  if (match) {
    return { name: match[1].trim(), address: match[2].trim() };
  }
  return raw;
}

function toArray<T>(val: T | T[] | undefined): T[] | undefined {
  if (val === undefined) return undefined;
  return Array.isArray(val) ? val : [val];
}

export async function sendEmailViaCloudflare(
  env: { CF_ACCOUNT_ID?: string; CF_EMAIL_API_TOKEN?: string; DEFAULT_FROM_EMAIL?: string },
  opts: SendEmailOpts
): Promise<boolean> {
  const accountId = env.CF_ACCOUNT_ID;
  const token = env.CF_EMAIL_API_TOKEN;
  const defaultFrom = env.DEFAULT_FROM_EMAIL || 'noreply@thedalfdojo.com';

  if (!accountId) {
    console.error('[sendEmailViaCloudflare] CF_ACCOUNT_ID is not set');
    return false;
  }
  if (!token) {
    console.error('[sendEmailViaCloudflare] CF_EMAIL_API_TOKEN is not set');
    return false;
  }

  const payload: CloudflareEmailPayload = {
    to: opts.to,
    from: parseFrom(opts.from, defaultFrom),
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    cc: toArray(opts.cc),
    bcc: toArray(opts.bcc),
    reply_to: opts.replyTo,
    headers: opts.headers,
  };

  // Require at least one of html or text
  if (!payload.html && !payload.text) {
    console.error('[sendEmailViaCloudflare] Either html or text body is required');
    return false;
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const body = await res.text();
      console.error(
        `[sendEmailViaCloudflare] HTTP ${res.status} from Cloudflare Email API:`,
        body
      );
      return false;
    }

    const json = (await res.json()) as {
      success?: boolean;
      result?: {
        delivered?: string[];
        queued?: string[];
        permanent_bounces?: string[];
      };
      errors?: { message: string }[];
    };

    if (json.success === false) {
      console.error(
        `[sendEmailViaCloudflare] Cloudflare API reported failure:`,
        JSON.stringify(json.errors)
      );
      return false;
    }

    const bounces = json.result?.permanent_bounces ?? [];
    if (bounces.length > 0) {
      console.warn(
        `[sendEmailViaCloudflare] Email accepted but permanent bounces detected:`,
        bounces
      );
      return false;
    }

    console.log(
      `[sendEmailViaCloudflare] Email queued successfully. Delivered:`,
      json.result?.delivered,
      'Queued:',
      json.result?.queued
    );
    return true;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.error('[sendEmailViaCloudflare] Request timed out after 15s');
    } else {
      console.error('[sendEmailViaCloudflare] Fetch error:', err?.message || err);
    }
    return false;
  }
}
