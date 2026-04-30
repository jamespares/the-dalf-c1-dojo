-- Better Auth tables
-- Note: Existing users table is kept for backward compatibility during migration

CREATE TABLE IF NOT EXISTS "ba_user" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text,
  "email" text NOT NULL UNIQUE,
  "email_verified" integer NOT NULL DEFAULT false,
  "image" text,
  "created_at" integer NOT NULL DEFAULT (unixepoch()),
  "updated_at" integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS "ba_session" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "ba_user"("id"),
  "token" text NOT NULL UNIQUE,
  "expires_at" integer NOT NULL,
  "created_at" integer NOT NULL DEFAULT (unixepoch()),
  "updated_at" integer NOT NULL DEFAULT (unixepoch()),
  "ip_address" text,
  "user_agent" text
);

CREATE TABLE IF NOT EXISTS "ba_account" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "ba_user"("id"),
  "account_id" text NOT NULL,
  "provider_id" text NOT NULL,
  "access_token" text,
  "refresh_token" text,
  "access_token_expires_at" integer,
  "refresh_token_expires_at" integer,
  "scope" text,
  "id_token" text,
  "password" text,
  "created_at" integer NOT NULL DEFAULT (unixepoch()),
  "updated_at" integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS "ba_verification" (
  "id" text PRIMARY KEY NOT NULL,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expires_at" integer NOT NULL,
  "created_at" integer NOT NULL DEFAULT (unixepoch()),
  "updated_at" integer NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS "ba_session_user_id_idx" ON "ba_session" ("user_id");
CREATE INDEX IF NOT EXISTS "ba_account_user_id_idx" ON "ba_account" ("user_id");
CREATE INDEX IF NOT EXISTS "ba_verification_identifier_idx" ON "ba_verification" ("identifier");
