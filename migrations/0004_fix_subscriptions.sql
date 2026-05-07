-- Fix subscriptions table: remove UNIQUE from user_id (prevents resubscription),
-- add cancel_at_period_end for churn visibility

CREATE TABLE subscriptions_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  stripe_price_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start INTEGER NOT NULL,
  current_period_end INTEGER NOT NULL,
  cancel_at_period_end INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch() * 1000),
  updated_at INTEGER DEFAULT (unixepoch() * 1000)
);

INSERT INTO subscriptions_new (
  id, user_id, stripe_customer_id, stripe_subscription_id, stripe_price_id,
  status, current_period_start, current_period_end, created_at, updated_at
)
SELECT
  id, user_id, stripe_customer_id, stripe_subscription_id, stripe_price_id,
  status, current_period_start, current_period_end, created_at, updated_at
FROM subscriptions;

DROP TABLE subscriptions;

ALTER TABLE subscriptions_new RENAME TO subscriptions;

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
