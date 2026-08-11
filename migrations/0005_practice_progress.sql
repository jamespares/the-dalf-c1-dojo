-- Migration: practice_progress
-- Tracks which CEFR story levels a user has mastered.

CREATE TABLE IF NOT EXISTS practice_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  level TEXT NOT NULL,
  mastered INTEGER NOT NULL DEFAULT 0,
  mastered_at INTEGER,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_practice_progress_user_level ON practice_progress(user_id, level);
CREATE INDEX IF NOT EXISTS idx_practice_progress_user ON practice_progress(user_id);
