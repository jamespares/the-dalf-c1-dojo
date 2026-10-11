-- Repair script for users hit by the duplicated-marking bug (Oct 2026).
-- Each refresh of /marking/:id used to spawn a duplicate marking run, and every
-- run re-inserted its error logs — inflating dashboard error counts.
--
-- Usage (replace the email first):
--   npx wrangler d1 execute dalf-c1-db --remote --file=scripts/repair-user-errors.sql
--
-- The in-app equivalent lives at /admin/user-data (admin only) and is the
-- preferred path — it shows a before/after report. This file is the raw-SQL
-- fallback. Apply migration 0006 before running step 4.

-- 0. Look up the user id:
-- SELECT id, email FROM users WHERE lower(email) = lower('USER_EMAIL_HERE');

-- 1. Drop error logs from attempts that never completed marking (partial runs):
DELETE FROM error_logs
WHERE user_id = (SELECT id FROM users WHERE lower(email) = lower('USER_EMAIL_HERE'))
  AND attempt_id IN (
    SELECT id FROM attempts
    WHERE user_id = (SELECT id FROM users WHERE lower(email) = lower('USER_EMAIL_HERE'))
      AND status != 'completed'
  );

-- 2. Dedupe exact duplicate error logs within completed attempts
--    (keeps the earliest row of each identical group):
DELETE FROM error_logs
WHERE user_id = (SELECT id FROM users WHERE lower(email) = lower('USER_EMAIL_HERE'))
  AND id NOT IN (
    SELECT MIN(id) FROM error_logs
    WHERE user_id = (SELECT id FROM users WHERE lower(email) = lower('USER_EMAIL_HERE'))
    GROUP BY attempt_id, error_type, original_text, correction, explanation
  );

-- 3. Unstick attempts abandoned mid-marking (older than 10 minutes).
--    NB: drizzle 'timestamp' columns store unix seconds, not ms.
UPDATE attempts
SET status = 'pending_marking'
WHERE user_id = (SELECT id FROM users WHERE lower(email) = lower('USER_EMAIL_HERE'))
  AND status = 'marking'
  AND (marking_started_at IS NULL OR marking_started_at < unixepoch() - 600);

-- 4. Verify:
-- SELECT attempt_id, error_type, COUNT(*) FROM error_logs
-- WHERE user_id = (SELECT id FROM users WHERE lower(email) = lower('USER_EMAIL_HERE'))
-- GROUP BY attempt_id, error_type;
