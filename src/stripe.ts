import { Context } from 'hono';
import Stripe from 'stripe';

export function getStripe(c: Context): Stripe {
  const key = c.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(key, {
    httpClient: Stripe.createFetchHttpClient(),
  } as any);
}

export function getPublishableKey(c: Context): string {
  const key = c.env.STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error('STRIPE_PUBLISHABLE_KEY is not set');
  }
  return key;
}

export function getPriceId(c: Context): string {
  const id = c.env.STRIPE_PRICE_ID;
  if (!id) {
    throw new Error('STRIPE_PRICE_ID is not set');
  }
  return id;
}

export async function createCheckoutSession(
  c: Context,
  opts: {
    customerEmail: string;
    userId: number;
    successUrl: string;
    cancelUrl: string;
  }
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe(c);
  const priceId = getPriceId(c);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: opts.customerEmail,
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    metadata: {
      userId: String(opts.userId),
    },
    subscription_data: {
      metadata: {
        userId: String(opts.userId),
      },
    },
  });

  return session;
}

export async function retrieveCheckoutSession(
  c: Context,
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe(c);
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['subscription'],
  });
}

export function constructStripeEvent(
  c: Context,
  payload: string,
  signature: string
): Stripe.Event {
  const stripe = getStripe(c);
  const secret = c.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set');
  }
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
