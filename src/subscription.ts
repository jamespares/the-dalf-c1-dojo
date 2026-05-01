import { eq, and, gte, lte, sql, count } from 'drizzle-orm';
import { getDb } from './db';
import { subscriptions, usageEvents } from './db/schema';
import type { Context } from 'hono';
import type Stripe from 'stripe';

const MONTHLY_ATTEMPT_LIMIT = 30;
const MONTHLY_GENERATION_LIMIT = 30;

export async function getActiveSubscription(db: ReturnType<typeof getDb>, userId: number) {
  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, 'active')))
    .limit(1);
  return sub || null;
}

export async function getSubscriptionByStripeId(
  db: ReturnType<typeof getDb>,
  stripeSubscriptionId: string
) {
  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId))
    .limit(1);
  return sub || null;
}

export async function getUsageCount(
  db: ReturnType<typeof getDb>,
  userId: number,
  periodStart: Date,
  periodEnd: Date
): Promise<number> {
  const [result] = await db
    .select({ count: count(usageEvents.id) })
    .from(usageEvents)
    .where(
      and(
        eq(usageEvents.userId, userId),
        eq(usageEvents.eventType, 'attempt_start'),
        gte(usageEvents.createdAt, periodStart),
        lte(usageEvents.createdAt, periodEnd)
      )
    );
  return result?.count ?? 0;
}

export async function getGenerationUsageCount(
  db: ReturnType<typeof getDb>,
  userId: number,
  periodStart: Date,
  periodEnd: Date
): Promise<number> {
  const [result] = await db
    .select({ count: count(usageEvents.id) })
    .from(usageEvents)
    .where(
      and(
        eq(usageEvents.userId, userId),
        eq(usageEvents.eventType, 'exam_generation'),
        gte(usageEvents.createdAt, periodStart),
        lte(usageEvents.createdAt, periodEnd)
      )
    );
  return result?.count ?? 0;
}

export async function canGenerateExam(
  c: Context,
  userId: number
): Promise<{ allowed: boolean; reason?: 'no_subscription' | 'limit_reached'; remaining?: number }> {
  const db = getDb(c.env.DB);
  const sub = await getActiveSubscription(db, userId);

  if (!sub) {
    return { allowed: false, reason: 'no_subscription' };
  }

  const now = new Date();
  if (now > sub.currentPeriodEnd) {
    return { allowed: false, reason: 'no_subscription' };
  }

  const used = await getGenerationUsageCount(db, userId, sub.currentPeriodStart, sub.currentPeriodEnd);
  const remaining = MONTHLY_GENERATION_LIMIT - used;

  if (remaining <= 0) {
    return { allowed: false, reason: 'limit_reached' };
  }

  return { allowed: true, remaining };
}

export async function getGenerationStatus(db: ReturnType<typeof getDb>, userId: number) {
  const sub = await getActiveSubscription(db, userId);
  if (!sub) {
    return { active: false, used: 0, limit: MONTHLY_GENERATION_LIMIT, remaining: 0, periodEnd: null };
  }

  const used = await getGenerationUsageCount(db, userId, sub.currentPeriodStart, sub.currentPeriodEnd);
  const remaining = Math.max(0, MONTHLY_GENERATION_LIMIT - used);

  return {
    active: true,
    used,
    limit: MONTHLY_GENERATION_LIMIT,
    remaining,
    periodEnd: sub.currentPeriodEnd,
  };
}

export async function canStartAttempt(
  c: Context,
  userId: number
): Promise<{ allowed: boolean; reason?: 'no_subscription' | 'limit_reached'; remaining?: number }> {
  const db = getDb(c.env.DB);
  const sub = await getActiveSubscription(db, userId);

  if (!sub) {
    return { allowed: false, reason: 'no_subscription' };
  }

  const now = new Date();
  if (now > sub.currentPeriodEnd) {
    return { allowed: false, reason: 'no_subscription' };
  }

  const used = await getUsageCount(db, userId, sub.currentPeriodStart, sub.currentPeriodEnd);
  const remaining = MONTHLY_ATTEMPT_LIMIT - used;

  if (remaining <= 0) {
    return { allowed: false, reason: 'limit_reached' };
  }

  return { allowed: true, remaining };
}

export async function recordUsageEvent(
  db: ReturnType<typeof getDb>,
  userId: number,
  eventType: string,
  metadata?: Record<string, unknown>
) {
  await db.insert(usageEvents).values({
    userId,
    eventType,
    metadata: metadata ?? {},
  });
}

export async function syncSubscriptionFromStripe(
  db: ReturnType<typeof getDb>,
  stripeSub: Stripe.Subscription
) {
  const userId = Number(stripeSub.metadata?.userId);
  if (!userId || isNaN(userId)) {
    throw new Error('No userId in subscription metadata');
  }

  const existing = await getSubscriptionByStripeId(db, stripeSub.id);

  const values = {
    userId,
    stripeCustomerId: stripeSub.customer as string,
    stripeSubscriptionId: stripeSub.id,
    stripePriceId:
      ((stripeSub as any).items.data[0]?.price.id as string) ?? '',
    status: stripeSub.status as string,
    currentPeriodStart: new Date((stripeSub as any).current_period_start * 1000),
    currentPeriodEnd: new Date((stripeSub as any).current_period_end * 1000),
    updatedAt: new Date(),
  };

  if (existing) {
    await db
      .update(subscriptions)
      .set(values)
      .where(eq(subscriptions.id, existing.id));
  } else {
    await db.insert(subscriptions).values(values);
  }
}

export async function getSubscriptionStatus(db: ReturnType<typeof getDb>, userId: number) {
  const sub = await getActiveSubscription(db, userId);
  if (!sub) {
    return { active: false, used: 0, limit: MONTHLY_ATTEMPT_LIMIT, remaining: 0, periodEnd: null };
  }

  const used = await getUsageCount(db, userId, sub.currentPeriodStart, sub.currentPeriodEnd);
  const remaining = Math.max(0, MONTHLY_ATTEMPT_LIMIT - used);

  return {
    active: true,
    used,
    limit: MONTHLY_ATTEMPT_LIMIT,
    remaining,
    periodEnd: sub.currentPeriodEnd,
  };
}
