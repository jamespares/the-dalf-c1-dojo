import { jsx } from 'hono/jsx';

export function Layout(props: { children: any; title?: string }) {
  const { children, title = 'DALF C1 Practice' } = props;
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('scroll', () => {
            const header = document.querySelector('.site-header');
            if (header) {
              if (window.scrollY > 50) header.classList.add('nav-scrolled');
              else header.classList.remove('nav-scrolled');
            }
          });
        `}} />
        {children}
      </body>
    </html>
  );
}
