import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Bridge users table — maps Better Auth users to app integer IDs
export const users = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull().default(''),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Better Auth tables — defined here so the Drizzle adapter can map models to SQL tables
// Actual DDL lives in migrations/0003_better_auth.sql

export const baUser = sqliteTable('ba_user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const baSession = sqliteTable('ba_session', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => baUser.id),
  token: text('token').notNull().unique(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
});

export const baAccount = sqliteTable('ba_account', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => baUser.id),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope: text('scope'),
  idToken: text('id_token'),
  password: text('password'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const baVerification = sqliteTable('ba_verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const exams = sqliteTable('exams', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  theme: text('theme').notNull(),
  generatedContent: text('generated_content', { mode: 'json' }).notNull(),
  audioKeys: text('audio_keys', { mode: 'json' }).$defaultFn(() => ({})).notNull(),
  status: text('status').$defaultFn(() => 'active').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const attempts = sqliteTable('attempts', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(),
  examId: integer('exam_id').notNull(),
  section: text('section').notNull(), // CO | CE | PE | PO
  startedAt: integer('started_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }),
  scores: text('scores', { mode: 'json' }).$defaultFn(() => ({})).notNull(),
  totalScore: real('total_score'),
  aiFeedback: text('ai_feedback', { mode: 'json' }).$defaultFn(() => ({})).notNull(),
  status: text('status').$defaultFn(() => 'in_progress').notNull(), // in_progress | completed | pending_marking
});

export const answers = sqliteTable('answers', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  attemptId: integer('attempt_id').notNull(),
  questionId: text('question_id').notNull(),
  userAnswer: text('user_answer'),
  audioKey: text('audio_key'),
  aiScore: real('ai_score'),
  aiFeedback: text('ai_feedback'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const errorLogs = sqliteTable('error_logs', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(),
  attemptId: integer('attempt_id'),
  errorType: text('error_type').notNull(), // grammar | vocabulary | pronunciation | register | structure
  originalText: text('original_text').notNull(),
  correction: text('correction').notNull(),
  explanation: text('explanation').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const subscriptions = sqliteTable('subscriptions', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
  stripePriceId: text('stripe_price_id').notNull(),
  status: text('status').notNull(), // active | canceled | past_due | unpaid
  currentPeriodStart: integer('current_period_start', { mode: 'timestamp' }).notNull(),
  currentPeriodEnd: integer('current_period_end', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const usageEvents = sqliteTable('usage_events', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(),
  eventType: text('event_type').notNull(),
  metadata: text('metadata', { mode: 'json' }).$defaultFn(() => ({})),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
