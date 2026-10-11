-- Migration: single-flight marking lock + error_logs indexes
-- Adds marking_started_at so a 'marking' attempt can be reclaimed if the
-- worker running it dies mid-flight, and indexes for the hot lookup paths.

ALTER TABLE attempts ADD COLUMN marking_started_at INTEGER;

CREATE INDEX IF NOT EXISTS idx_error_logs_attempt ON error_logs(attempt_id);
CREATE INDEX IF NOT EXISTS idx_error_logs_user ON error_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user ON attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_answers_attempt ON answers(attempt_id);
