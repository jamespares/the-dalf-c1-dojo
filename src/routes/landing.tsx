import { Hono } from 'hono';
import { jsx } from 'hono/jsx';

const landing = new Hono();

landing.get('/', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The DALF Dojo — DALF C1 Past Papers, Marking & Error Tracking</title>
        <meta name="description" content="Generate DALF C1 past papers on any topic, get marked against the official DALF mark scheme, and track your error patterns over time. Free AI-powered French exam prep." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="stylesheet" href="/static/landing.css?v=3" />
      </head>
      <body class="landing-page">

        {/* === NAVIGATION === */}
        <nav class="landing-nav">
          <div class="nav-inner">
            <a href="/" class="nav-logo">
              <img src="/static/logo.png" alt="The DALF Dojo Logo" class="logo-img" />
              <span class="logo-name">
                <span class="logo-the">The</span>
                <span class="logo-dojo">DALF Dojo</span>
              </span>
            </a>

            <div class="nav-actions">
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
              The fastest way to master<br />
              the <span class="highlight">DALF C1</span>
            </h1>

            <p class="hero-subtitle">
              Generate full-length past papers across all 4 sections. Get marked against the official
              France Education International rubric. Track your error patterns over time.
            </p>

            <div class="hero-form-card">
              <form action="/register" method="GET">
                <label class="form-label">Choose your exam topic</label>
                <div class="form-input-row">
                  <select name="theme" id="topic-select" required>
                    <option value="" disabled selected>Select a topic...</option>
                    <option value="Environment and sustainable development">Environment &amp; Sustainable Development</option>
                    <option value="Urbanism and city transformation">Urbanism &amp; City Transformation</option>
                    <option value="Culture and arts">Culture &amp; Arts</option>
                    <option value="Social issues">Social Issues</option>
                    <option value="Science and technology">Science &amp; Technology</option>
                    <option value="Economics and society">Economics &amp; Society</option>
                    <option value="Family and education">Family &amp; Education</option>
                    <option value="Work and wellbeing">Work &amp; Wellbeing</option>
                    <option value="Digital society">Digital Society</option>
                    <option value="Consumption and ethics">Consumption &amp; Ethics</option>
                  </select>
                  <button type="submit" class="form-submit-btn">Get Started →</button>
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

        {/* === STATS BAR === */}
        <section class="stats-bar">
          <div class="section-inner">
            <div class="stats-grid">
              <div class="stat-item reveal">
                <span class="stat-number">4</span>
                <span class="stat-label">Exam sections covered</span>
                <span class="stat-detail">CO · CE · PE · PO</span>
              </div>
              <div class="stat-item reveal">
                <span class="stat-number">/100</span>
                <span class="stat-label">Scored to official scale</span>
                <span class="stat-detail">25 pts per section</span>
              </div>
              <div class="stat-item reveal">
                <span class="stat-number">10</span>
                <span class="stat-label">DALF exam topics</span>
                <span class="stat-detail">Post-2020 unified format</span>
              </div>
              <div class="stat-item reveal">
                <span class="stat-number">5h30</span>
                <span class="stat-label">Real exam length simulated</span>
                <span class="stat-detail">4h collective + 1h30 oral</span>
              </div>
            </div>
          </div>
        </section>

        {/* === HOW IT WORKS === */}
        <section class="how-section" id="how">
          <div class="section-inner">
            <p class="section-eyebrow">Comment ça marche</p>
            <h2 class="section-title">From topic to marked paper in minutes</h2>

            <div class="steps-grid">
              <div class="step-card reveal">
                <div class="step-number step-blue">1</div>
                <h3>Generate a full past paper</h3>
                <p>Select any of 10 DALF themes and instantly receive a complete exam — two listening documents (long interview + short radio extracts), a 1,500–2,000 word reading passage, a synthèse &amp; essai writing dossier, and oral production materials — all calibrated to CEFR C1.</p>
              </div>
              <div class="step-card reveal">
                <div class="step-number step-dark">2</div>
                <h3>Get marked by the official rubric</h3>
                <p>Every response is evaluated using France Education International's actual grading grids: coherence, lexical range, morphosyntax, register, and argumentation — the same 12 criteria real DALF examiners use. Scores follow the /25-per-section scale with the 5/25 eliminatory threshold.</p>
              </div>
              <div class="step-card reveal">
                <div class="step-number step-red">3</div>
                <h3>Track errors across attempts</h3>
                <p>The platform logs every submission and identifies recurring weaknesses — grammar patterns, vocabulary gaps, argumentation structure, sociolinguistic register — building a profile that shows exactly where you fall on the Below C1 → C1 → C1+ performance scale.</p>
              </div>
            </div>
          </div>
        </section>

        {/* === DEMO SECTION === */}
        <section class="demo-section" id="demo">
          <div class="section-inner">
            <p class="section-eyebrow">Aperçu</p>
            <h2 class="section-title">Past papers that mirror the real DALF C1</h2>

            <div class="demo-grid">
              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-listening.png" alt="Listening Comprehension Exercise" class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-blue">🎧 Compréhension Orale</span>
                  <h3>Listening Comprehension</h3>
                  <p>Two AI-generated audio documents per paper — a ~6-minute long interview heard twice and short radio extracts heard once — with MCQ, true/false, and open-ended questions worth up to 25 points.</p>
                </div>
              </div>

              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-writing.png" alt="Written Production Exercise" class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-red">✍️ Production Écrite</span>
                  <h3>Written Production</h3>
                  <p>Synthèse (220–240 words, 12.5 pts) and essai argumenté (250+ words, 12.5 pts). Marked on 6 criteria: length compliance, objectivity, task realisation, coherence, lexique, and morphosyntaxe.</p>
                </div>
              </div>

              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-speaking.png" alt="Oral Production Exercise" class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-blue">🎤 Production Orale</span>
                  <h3>Oral Production</h3>
                  <p>Record your 10-minute exposé and 20-minute discussion simulation. AI feedback maps to the 5-criterion oral grid: task (exposé), task (entretien), lexique, morphosyntaxe, and phonological mastery.</p>
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
            <h2 class="section-title">Built around the official France Education International framework</h2>

            <div class="features-grid">
              <div class="feature-card reveal">
                <div class="feature-icon icon-blue">🎧</div>
                <div class="feature-text">
                  <h3>Compréhension Orale · /25</h3>
                  <p>Two AI-generated audio documents per exam — a ~6-min interview (heard twice, ~18 pts) and short radio extracts (heard once, ~7 pts). Question types: MCQ, true/false with justification, and open-ended — matching the official exam protocol.</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-red">📖</div>
                <div class="feature-text">
                  <h3>Compréhension Écrite · /25</h3>
                  <p>1,500–2,000 word texte d'idées at C1 register. Questions test global thesis identification, implicit meaning, argumentative structure analysis, and precise reformulation — raw score /50, converted to /25.</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-blue">✍️</div>
                <div class="feature-text">
                  <h3>Production Écrite · /25</h3>
                  <p>Synthèse (12.5 pts) graded on 6 criteria: length, objectivity, task, coherence, lexique, morphosyntaxe. Essai argumenté (12.5 pts) graded on 5 criteria including sociolinguistic register adaptation. Performance mapped to Below C1 / C1 / C1+ descriptors.</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-red">🎤</div>
                <div class="feature-text">
                  <h3>Production Orale · /25</h3>
                  <p>10-min exposé (5 pts) + 20-min entretien (5 pts) + language assessment (15 pts across lexique, morphosyntaxe, phonology). Feedback identifies halo effects, register shifts, and argument-example balance.</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-blue">📊</div>
                <div class="feature-text">
                  <h3>Error Pattern Tracking</h3>
                  <p>Every submission is logged and scored on the 3-tier performance scale (Below C1 → C1 → C1+). The platform tracks recurring weaknesses across all 12 marking criteria — grammar patterns, vocabulary gaps, coherence breaks, register errors — building a detailed learner profile.</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-red">🏛️</div>
                <div class="feature-text">
                  <h3>Post-2020 Unified Format</h3>
                  <p>All papers follow the current DALF C1 structure — no domain specialisation (Lettres/Sciences split removed March 2020). Themes are universally accessible. Pass threshold: 50/100 with a minimum 5/25 per section (eliminatory).</p>
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
            <h2 class="cta-title">Start your first paper now.</h2>
            <p class="cta-text">
              Free to use. Generate a complete DALF C1 past paper across all 4 sections, submit your answers, and get criterion-level feedback against the official France Education International rubric.
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
              <img src="/static/logo.png" alt="The DALF Dojo Logo" class="footer-logo-img" />
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
