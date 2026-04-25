import { Hono } from 'hono';
import { jsx } from 'hono/jsx';

const landing = new Hono();

landing.get('/', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The DALF Dojo — AI-Powered French Exam Preparation</title>
        <meta name="description" content="Practice for the DALF C1 French exam with AI-generated listening, reading, writing, and speaking exercises. Authentic exam format, instant feedback." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/static/landing.css" />
      </head>
      <body class="landing-page">

        {/* === NAVIGATION === */}
        <nav class="landing-nav">
          <div class="nav-inner">
            <a href="/" class="nav-logo">
              {/* Fleur-de-lis style icon */}
              <span class="logo-badge">
                <span class="logo-fr">🥋</span>
              </span>
              <span class="logo-name">
                <span class="logo-the">The</span>
                <span class="logo-dojo">DALF Dojo</span>
              </span>
            </a>

            <div class="nav-actions">
              <div class="lang-toggle">
                <span>EN</span>
                <span class="active">FR</span>
                <span>中文</span>
              </div>
              <a href="/login" class="nav-cta-pill">Sign In</a>
            </div>
          </div>
        </nav>

        {/* === HERO SECTION === */}
        <section class="hero-section" id="hero">
          <div class="hero-waves">
            <div class="wave wave-1"></div>
            <div class="wave wave-2"></div>
          </div>

          <div class="hero-content">
            {/* French tricolor accent */}
            <div class="hero-tricolor-accent">
              <span class="tca-blue"></span>
              <span class="tca-white"></span>
              <span class="tca-red"></span>
            </div>

            <h1 class="hero-title">
              DALF C1 practice,<br />
              generated <span class="highlight">instantly.</span>
            </h1>

            <p class="hero-subtitle">
              Enter any topic. Get a complete DALF C1 exam set — listening, reading,
              writing, and speaking — all aligned to the official exam format.
            </p>

            <div class="hero-form-card">
              <form action="/generate" method="GET">
                <label class="form-label">What do you want to practice?</label>
                <div class="form-input-row">
                  <input
                    type="text"
                    name="topic"
                    id="topic-input"
                    placeholder="e.g., L'intelligence artificielle, Le changement climatique..."
                    required
                  />
                  <button type="submit" class="form-submit-btn">Générer →</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* === TRICOLOR DIVIDER === */}
        <div class="tricolor-bar">
          <div class="bar-blue"></div>
          <div class="bar-white"></div>
          <div class="bar-red"></div>
        </div>

        {/* === HOW IT WORKS === */}
        <section class="how-section" id="how">
          <div class="section-inner">
            <p class="section-eyebrow">Comment ça marche</p>
            <h2 class="section-title">Three steps to your exam</h2>

            <div class="steps-grid">
              <div class="step-card reveal">
                <div class="step-number step-blue">1</div>
                <h3>Choose your topic</h3>
                <p>Enter any subject — from AI to climate change to geopolitics. The platform adapts to your interests.</p>
              </div>
              <div class="step-card reveal">
                <div class="step-number step-dark">2</div>
                <h3>Generate your dossier</h3>
                <p>Our AI builds a complete DALF C1 exam package with authentic formatting, audio scripts, and marking criteria.</p>
              </div>
              <div class="step-card reveal">
                <div class="step-number step-red">3</div>
                <h3>Practice &amp; get feedback</h3>
                <p>Complete each section at your own pace. Submit for AI marking with detailed corrections in French.</p>
              </div>
            </div>
          </div>
        </section>

        {/* === DEMO SECTION === */}
        <section class="demo-section" id="demo">
          <div class="section-inner">
            <p class="section-eyebrow">Aperçu</p>
            <h2 class="section-title">Real output, real exam quality</h2>

            <div class="demo-grid">
              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-listening.png" alt="Listening Comprehension Exercise" class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-blue">🎧 Compréhension Orale</span>
                  <h3>Listening Comprehension</h3>
                  <p>Audio documents with MCQ, true/false, and open-ended questions — matching the real DALF C1 format exactly.</p>
                </div>
              </div>

              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-writing.png" alt="Written Production Exercise" class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-red">✍️ Production Écrite</span>
                  <h3>Written Production</h3>
                  <p>Synthèse (220-240 words) and essai argumenté (250+ words) with real-time word counting and save functionality.</p>
                </div>
              </div>

              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-speaking.png" alt="Oral Production Exercise" class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-blue">🎤 Production Orale</span>
                  <h3>Oral Production</h3>
                  <p>Record your 10-minute exposé with built-in timer. Full instructions matching the official exam format.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === TRICOLOR DIVIDER === */}
        <div class="tricolor-bar">
          <div class="bar-blue"></div>
          <div class="bar-white"></div>
          <div class="bar-red"></div>
        </div>

        {/* === FEATURES === */}
        <section class="features-section" id="features">
          <div class="section-inner">
            <p class="section-eyebrow">Ce qui est inclus</p>
            <h2 class="section-title">Everything you need to pass</h2>

            <div class="features-grid">
              <div class="feature-card reveal">
                <div class="feature-icon icon-blue">🎧</div>
                <div class="feature-text">
                  <h3>Compréhension Orale</h3>
                  <p>Two listening exercises with AI-generated audio — long and short documents with varied question types.</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-red">📖</div>
                <div class="feature-text">
                  <h3>Compréhension Écrite</h3>
                  <p>Authentic reading passages with comprehension questions testing analysis, inference, and vocabulary.</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-blue">✍️</div>
                <div class="feature-text">
                  <h3>Production Écrite</h3>
                  <p>Synthèse and essai argumenté with word counting, auto-save, and AI-powered marking with detailed feedback.</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-red">🎤</div>
                <div class="feature-text">
                  <h3>Production Orale</h3>
                  <p>Built-in recording with timer. Practice your exposé and get feedback on structure and argumentation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === CTA === */}
        <section class="cta-section">
          <div class="cta-content">
            <div class="cta-flag">
              <span></span><span></span><span></span>
            </div>
            <h2 class="cta-title">Ready when you are.</h2>
            <p class="cta-text">
              No subscriptions. No credits. Enter a topic and get a complete DALF C1 exam package in seconds.
            </p>
            <a href="/register" class="cta-btn">Start Practicing Now →</a>
          </div>
        </section>

        {/* === TRICOLOR FOOTER BAR === */}
        <div class="tricolor-bar tricolor-footer-bar">
          <div class="bar-blue"></div>
          <div class="bar-white"></div>
          <div class="bar-red"></div>
        </div>

        {/* === FOOTER === */}
        <footer class="landing-footer">
          <div class="footer-inner">
            <div class="footer-brand">
              <span class="footer-logo-icon">🥋</span>
              <div>
                <div class="footer-site-name">The DALF Dojo</div>
                <div class="footer-site-url">thedalfdojo.com</div>
              </div>
            </div>

            <div class="footer-tagline">
              Built by <strong>James Pares</strong> — helping you conquer the DALF C1.
            </div>

            <div class="footer-socials">
              {/* X / Twitter */}
              <a href="https://x.com/jamespareslfg" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Follow on X">
                <svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>@jamespareslfg</span>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/james-p-ba7653207/" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              {/* GitHub */}
              <a href="https://github.com/jamespares" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <span>jamespares</span>
              </a>
            </div>
          </div>
        </footer>

        {/* === SCROLL REVEAL JS === */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('DOMContentLoaded', function() {
            var reveals = document.querySelectorAll('.reveal');
            var observer = new IntersectionObserver(function(entries) {
              entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            }, { threshold: 0.12 });
            reveals.forEach(function(el) { observer.observe(el); });
          });
        `}} />
      </body>
    </html>
  );
});

export default landing;
