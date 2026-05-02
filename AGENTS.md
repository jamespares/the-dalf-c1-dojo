# AGENTS.md — The DALF Dojo

> This file is written for AI coding agents. It describes the project architecture, conventions, and workflows. The reader is assumed to know nothing about the project.

---

## Project Overview

**The DALF Dojo** is a web application that helps users prepare for the DALF C1 French language exam. It uses AI (OpenAI GPT-4o) to generate complete mock exams on demand, marks user answers against official DALF rubrics, stores attempts over time, and accumulates personalised feedback (grammar, vocabulary, register, structure, pronunciation) to help users iteratively improve.

The application code lives at the repository root. The repository also contains:

- `requirements.md` — original product brief
- `dalfc1-information-bank.md` — a 2,000+ line reference document with official DALF C1 exam specs, past paper catalogues, transcripts, marking rubrics, and AI system instructions

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Cloudflare Workers (Wrangler) |
| **Framework** | [Hono](https://hono.dev/) — lightweight web framework with built-in JSX support |
| **Database** | Cloudflare D1 (SQLite) via [Drizzle ORM](https://orm.drizzle.team/) |
| **Object Storage** | Cloudflare R2 — stores AI-generated audio files (TTS) and user speaking recordings |
| **AI / LLM** | OpenAI GPT-4o, TTS-1, Whisper-1 — routed through Cloudflare AI Gateway for unified billing |
| **Auth** | Custom session-based auth (bcryptjs + jose JWT) with cookie sessions |
| **Payments** | Stripe Checkout + subscriptions |
| **Language** | TypeScript (ES modules) |
| **Frontend** | Server-side rendered JSX (`hono/jsx`) — no client-side framework. Static CSS files served from `public/static/` |

---

## Directory Structure

```
```
├── package.json              # npm scripts, dependencies
├── tsconfig.json             # ESNext, Bundler resolution, hono/jsx
├── wrangler.jsonc            # Cloudflare Worker config (bindings, vars, assets)
├── drizzle.config.ts         # Drizzle Kit config for D1 HTTP driver
├── .dev.vars                 # Local dev secrets (ignored by git)
├── .gitignore
├── public/                   # Static assets served by Workers (CSS, logo, screenshots)
│   └── static/
│       ├── style.css
│       ├── landing.css
│       └── logo.png
├── migrations/               # Hand-written SQL migration files applied to D1
│   ├── 0001_init_schema.sql
│   ├── 0002_subscriptions.sql
│   └── 0003_better_auth.sql
├── drizzle/                  # Drizzle Kit output directory (migrations generated here)
└── src/
    ├── index.ts              # App entry — mounts all Hono sub-routers
    ├── types.ts              # Shared TypeScript interfaces for exam content & marking
    ├── auth.ts               # Password hashing, JWT sessions, auth & admin middleware
    ├── ai.ts                 # Chat completion, TTS, audio transcription helpers
    ├── ai-prompts.ts         # System prompts for generating each exam section via AI
    ├── storage.ts            # R2 bucket upload/download helpers for audio
    ├── stripe.ts             # Stripe Checkout session creation helpers
    ├── subscription.ts       # Subscription gating, usage tracking, Stripe sync
    ├── db/
    │   ├── index.ts          # Drizzle D1 connection factory
    │   └── schema.ts         # Table definitions (Drizzle SQLite schema)
    ├── components/
    │   └── Layout.tsx        # Shared page layout (nav, language toggle, responsive grid)
    └── routes/               # Hono sub-routers — one file per domain
        ├── landing.tsx       # Marketing landing page (EN/FR/ZH)
        ├── auth.tsx          # Login / register / logout
        ├── dashboard.tsx     # User dashboard with recent attempts & averages
        ├── exams.tsx         # Exam listing, section selection, attempt start
        ├── admin.tsx         # Admin-only AI exam generation UI
        ├── listening.tsx     # Comprehension de l'oral exam page
        ├── reading.tsx       # Comprehension des ecrits exam page
        ├── writing.tsx       # Production ecrite exam page
        ├── speaking.tsx      # Production orale exam page (audio recording via MediaRecorder)
        ├── marking.tsx       # AI marking & feedback display
        ├── review.tsx        # Review past attempts with error tracking
        ├── profile.tsx       # User profile
        ├── terms.tsx         # Terms & privacy policy
        ├── billing.tsx       # Subscription billing page
        └── webhooks.ts       # Stripe webhook handler
```

---

## Build, Dev & Deploy Commands

All commands are run from the repository root:

```bash
# Install dependencies
npm install

# Local development (uses Wrangler dev server with local D1/R2 emulation)
npm run dev

# Deploy to Cloudflare Workers (production)
npm run deploy

# Regenerate TypeScript types from wrangler.jsonc bindings
npm run cf-typegen
```

**Drizzle Kit (database migrations)** is not wired into `package.json` scripts. Run it manually when schema changes:

```bash
# Generate migration SQL from schema.ts
npx drizzle-kit generate

# Apply migrations to the remote D1 database
npx wrangler d1 migrations apply dalf-c1-db
```

---

## Database Schema (D1 SQLite)

Defined in `src/db/schema.ts` using Drizzle ORM SQLite core.

| Table | Purpose |
|-------|---------|
| `users` | Email + bcrypt password hash |
| `sessions` | JWT token, user link, expiry |
| `exams` | AI-generated content (JSON), theme, audio keys (JSON), status |
| `attempts` | User exam attempt: section (CO/CE/PE/PO), scores (JSON), total score, AI feedback (JSON), status |
| `answers` | Per-question answer: text or audio key, AI score, AI feedback |
| `error_logs` | Tagged errors per user: grammar / vocabulary / pronunciation / register / structure |
| `subscriptions` | Stripe subscription sync: status, period dates, stripe IDs |
| `usage_events` | Quota tracking events (e.g. `attempt_start`) |

Key field conventions:
- JSON columns use `text('col', { mode: 'json' })` with `$defaultFn(() => ({}))`
- Timestamps use `integer('col', { mode: 'timestamp' })`
- Foreign keys are plain integers (no explicit Drizzle relations defined)

---

## Auth & Authorization

### Session Auth
- Passwords hashed with bcrypt (10 rounds).
- Sessions are JWT tokens signed with `SESSION_SECRET` (HS256), stored in an HTTP-only `session` cookie (`Secure`, `SameSite=Strict`, 7 days).
- `getCurrentUser(c)` verifies the JWT, then validates the token exists in the `sessions` table.
- `authMiddleware()` redirects unauthenticated users to `/login` and sets `c.set('user', user)`.

### Admin Check
- Admin status is email-based. `ADMIN_EMAILS` is a comma-separated env var.
- `isAdmin(user, env)` checks inclusion.
- `adminMiddleware()` requires auth + admin email match; returns 403 otherwise.

### Context Types
The auth module augments Hono's `ContextVariableMap` so `c.get('user')` is typed as the Drizzle `users` select type.

---

## AI Integration

All AI calls go through `src/ai.ts`:

- **`chatCompletion(c, messages, opts)`** — calls GPT-4o via the Cloudflare AI Gateway (or direct OpenAI API). Supports `jsonMode` for structured output.
- **`generateTTS(c, text, voice)`** — converts text to MP3 using OpenAI TTS-1, returns `ArrayBuffer`.
- **`splitTextForTTS(text)`** — splits long transcripts into chunks under 3,500 chars for TTS.
- **`transcribeAudio(c, buffer, filename)`** — sends MP3 to Whisper-1 with `language: 'fr'`.

### AI Gateway Configuration
- `AI_GATEWAY_URL` is defined in `wrangler.jsonc` vars.
- Auth token priority: `CF_AIG_TOKEN` (Cloudflare unified billing) → `OPENAI_API_KEY` (pass-through).
- Optional `CF_GATEWAY_TOKEN` can be set for gateway access control.

### Exam Generation (`src/ai-prompts.ts`)
Each DALF section has a detailed system prompt that instructs GPT-4o to generate exam content in strict JSON schema:
- **Listening** — long document transcript (~6–8 min) + short documents, with MCQ/TF/open questions
- **Reading** — 1,500–2,000 word text with comprehension questions
- **Writing** — dossier of 2–3 documents + problematique, prompts for synthèse and essai argumenté
- **Speaking** — dossier + instructions for 10-minute exposé + examiner discussion questions

---

## Subscription & Billing

- Users must have an active Stripe subscription to start exam attempts.
- **Quota:** 30 attempts per billing period (`MONTHLY_ATTEMPT_LIMIT` in `src/subscription.ts`).
- Admins bypass both subscription and quota checks.
- Stripe Checkout creates a subscription; webhooks (`/webhooks`) sync status to D1.
- If the limit is reached, the user is redirected to `/billing?limit=1`.

---

## Code Style & Conventions

### General
- **ES modules** only (`"type": "module"` in `package.json`).
- **Strict TypeScript** (`"strict": true`).
- **JSX pragma:** `jsx: "react-jsx"` with `jsxImportSource: "hono/jsx"`.
- No trailing semicolons enforced; follow existing file style.

### Routes
- Each route file exports a `new Hono()` sub-router.
- Routes are mounted in `src/index.ts` with `app.route('/', routeName)`.
- Pages return `c.html(<Layout …>)` for consistent markup.
- Form submissions use standard POST + `c.req.parseBody()`.

### Database Access
- Always use `getDb(c.env.DB)` to obtain a Drizzle client bound to the D1 database.
- Queries use Drizzle's SQL builder (`eq`, `and`, `desc`, etc.).

### Environment Variables & Secrets
- **Public vars** (safe to commit): defined in `wrangler.jsonc` under `vars`.
- **Secrets** (never commit): stored in `.dev.vars` for local dev, and uploaded via `wrangler secret put <NAME>` for production.
- Required secrets for full functionality:
  - `SESSION_SECRET`
  - `CF_AIG_TOKEN` or `OPENAI_API_KEY`
  - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_ID`
  - `ADMIN_EMAILS`

---

## Testing

**There are currently no automated tests in this project.**

If adding tests, the stack would most naturally use:
- `vitest` for unit tests (aligned with the Vite/Wrangler ecosystem)
- `miniflare` or `wrangler unstable_dev` for integration tests against D1/R2 bindings

When making changes, test manually via `npm run dev` and verify:
1. Auth flows (register, login, logout)
2. Admin exam generation (`/admin/generate`)
3. Attempt start / submission per section
4. AI marking output displays correctly
5. Stripe checkout and webhook sync
6. Audio playback and recording

---

## Deployment Architecture

- **Worker:** Single Cloudflare Worker (`src/index.ts`) handles all HTTP requests.
- **D1 Database:** `dalf-c1-db` — SQLite edge database.
- **R2 Bucket:** `dalf-c1-audio` — stores generated TTS audio and user speaking recordings.
- **Static Assets:** `public/` directory served via the Workers `ASSETS` binding.
- **AI Gateway:** `gateway.ai.cloudflare.com` endpoint configured in `wrangler.jsonc`.
- **Stripe:** Webhook endpoint is `/webhooks` (must be configured in Stripe Dashboard).
- **Email:** `send_email` binding configured in `wrangler.jsonc`. All emails send from `hey@jamespares.me`.

---

## Security Considerations

1. **SESSION_SECRET** must be strong and rotated if compromised. The app throws at runtime if it is missing.
2. **Stripe webhook signature** is verified with `STRIPE_WEBHOOK_SECRET`.
3. **Passwords** are hashed with bcrypt before storage.
4. **Cookies** are `httpOnly`, `Secure`, and `SameSite=Strict`.
5. **Admin routes** are protected by email allow-list — not role-based.
6. **AI tokens** are never exposed to the client; all AI calls happen server-side in the Worker.
7. **No CSRF tokens** are currently implemented. All state-changing routes use POST, but adding CSRF protection should be considered if expanding form surfaces.

---

## Key External References

- `dalfc1-information-bank.md` at repository root contains:
  - Official DALF C1 exam specifications and timing
  - Complete past paper transcripts (listening)
  - Marking rubrics and grading criteria
  - AI system instructions and theme taxonomy

This document is the authoritative reference when modifying exam generation prompts, scoring logic, or UI copy related to DALF C1 rules.
