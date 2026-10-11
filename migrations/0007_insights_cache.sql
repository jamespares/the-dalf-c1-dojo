-- Migration: cache AI insights per user
-- The /insights page used to block ~7s on a live AI call on every load.
-- We cache the payload and only regenerate when it is older than 24h or the
-- user's completed-attempt count has changed.

CREATE TABLE IF NOT EXISTS insights_cache (
  user_id INTEGER PRIMARY KEY,
  payload TEXT NOT NULL,
  attempts_count INTEGER NOT NULL DEFAULT 0,
  generated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
