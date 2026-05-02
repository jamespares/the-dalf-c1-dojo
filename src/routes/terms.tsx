import { Hono } from 'hono';

const terms = new Hono<{ Bindings: CloudflareBindings }>();

terms.get('/terms', (c) => {
  return c.redirect('https://jamespares.me/terms/');
});

export default terms;
