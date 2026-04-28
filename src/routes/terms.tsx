import { Hono } from 'hono';

const terms = new Hono();

terms.get('/terms', (c) => {
  return c.redirect('https://jamespares.me/terms/');
});

export default terms;
