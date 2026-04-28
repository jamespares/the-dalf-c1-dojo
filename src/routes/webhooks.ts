import { Hono } from 'hono';
import { getDb } from '../db';
import { constructStripeEvent, getStripe } from '../stripe';
import { syncSubscriptionFromStripe } from '../subscription';
import type Stripe from 'stripe';

const webhooks = new Hono();

webhooks.post('/webhooks/stripe', async (c) => {
  const payload = await c.req.text();
  const signature = c.req.header('stripe-signature') || '';

  let event: Stripe.Event;
  try {
    event = constructStripeEvent(c, payload, signature);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return c.json({ error: 'Invalid signature' }, 400);
  }

  const db = getDb(c.env.DB);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.subscription) {
          const stripe = getStripe(c);
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          await syncSubscriptionFromStripe(db, sub);
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = (invoice as any).subscription;
        if (subId) {
          const stripe = getStripe(c);
          const sub = await stripe.subscriptions.retrieve(subId as string);
          await syncSubscriptionFromStripe(db, sub);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = (invoice as any).subscription;
        if (subId) {
          const stripe = getStripe(c);
          const sub = await stripe.subscriptions.retrieve(subId as string);
          await syncSubscriptionFromStripe(db, sub);
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await syncSubscriptionFromStripe(db, sub);
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${event.type}`);
    }

    return c.json({ received: true });
  } catch (err: any) {
    console.error('Webhook handler error:', err.message);
    return c.json({ error: 'Handler failed' }, 500);
  }
});

export default webhooks;
