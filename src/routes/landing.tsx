import { Hono } from 'hono';
import { jsx } from 'hono/jsx';

const landing = new Hono<{ Bindings: CloudflareBindings }>();

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
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="stylesheet" href="/static/landing.css?v=7" />
      </head>
      <body class="landing-page">

        {/* === NAVIGATION === */}
        <nav class="landing-nav" id="landingNav">
          <div class="nav-inner">
            <a href="/" class="nav-logo">
              <img src="/static/logo.png" alt="The DALF Dojo Logo" class="logo-img" />
              <span class="logo-name">The DALF Dojo</span>
            </a>

            <div class="nav-actions">
              <a href="/login" class="nav-link">Sign In</a>
              <a href="/register" class="nav-cta-pill">Get Started →</a>
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
              The fastest way to master the<br />
              <span class="highlight">DALF C1</span>
            </h1>

            <p class="hero-subtitle">
              Generate full-length past papers across all four sections. Get marked against the official France Education International rubric. Find your weakspots and fix them before the exam.
            </p>

            <div class="hero-form-card">
              <form action="/register" method="get">
                <label class="form-label">Choose your exam topic</label>
                <div class="form-input-row">
                  <select name="theme" id="topic-select" required>
                    <option value="" disabled selected>Select a topic...</option>
                    <option value="Environment and sustainable development">Environment & Sustainable Development</option>
                    <option value="Urbanism and city transformation">Urbanism & City Transformation</option>
                    <option value="Culture and arts">Culture & Arts</option>
                    <option value="Social issues">Social Issues</option>
                    <option value="Science and technology">Science & Technology</option>
                    <option value="Economics and society">Economics & Society</option>
                    <option value="Family and education">Family & Education</option>
                    <option value="Work and wellbeing">Work & Wellbeing</option>
                    <option value="Digital society">Digital Society</option>
                    <option value="Consumption and ethics">Consumption & Ethics</option>
                  </select>
                  <button type="submit" class="form-submit-btn">Start Practicing →</button>
                </div>
                <p class="form-microcopy">⚡ Full access after subscribing. £30/month — unlimited past papers, 30 marked attempts.</p>
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

        {/* === CREDIBILITY === */}
        <section class="credibility-section">
          <div class="section-inner">
            <div class="credibility-row reveal">
              <img src="/dalf-logo.png" alt="France Éducation International — DALF Official Logo" class="dalf-logo" />
              <p class="credibility-text">Aligned with the official France Éducation International DALF C1 framework</p>
            </div>
          </div>
        </section>

        {/* === SOCIAL PROOF === */}
        <section class="social-proof-section">
          <div class="section-inner">
            <div class="social-proof-content reveal">
              <p class="social-proof-headline">Join students preparing for the DALF C1</p>
              <div class="social-proof-avatars">
                <span class="avatar">🇫🇷</span>
                <span class="avatar">🇨🇦</span>
                <span class="avatar">🇧🇪</span>
                <span class="avatar">🇨🇭</span>
                <span class="avatar">🇬🇧</span>
                <span class="avatar">🇺🇸</span>
                <span class="avatar">🇩🇪</span>
                <span class="avatar">+</span>
              </div>
              <p class="social-proof-sub">From Paris to Montréal to Geneva — practice with past papers that mirror the real exam.</p>
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
                <p>Select any of 10 DALF themes and instantly receive a complete exam — two listening documents (long interview + short radio extracts), a 1,500–2,000 word reading passage, a synthèse & essai writing dossier, and oral production materials — all calibrated to CEFR C1.</p>
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
                <div style="background:#f9fafb; padding:1.25rem; border-bottom:1px solid var(--border); overflow:hidden; position:relative; height: 210px;">
                  <h4 style="font-family:'Patrick Hand',cursive; font-size:1.15rem; margin-bottom:0.25rem; color:var(--text); line-height: 1.2; font-weight: 600;">Reading Comprehension — DALF C1 — Culture and arts</h4>
                  <p style="color:var(--text-muted); font-size:0.7rem; margin-bottom:0.85rem;">Recommended time: 50 minutes</p>
                  <div style="background:white; border:1px solid var(--border); border-radius:8px; padding:1rem; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                    <h5 style="font-weight:700; margin-bottom:0.5rem; font-size: 0.85rem; color: var(--text);">Text</h5>
                    <p style="font-size:0.65rem; line-height:1.6; color:var(--text); margin-bottom:0.5rem; text-align: justify;">
                      Dans une époque où la mondialisation semble homogénéiser les cultures, la question de l'identité culturelle devient cruciale. Les expressions artistiques, qu'elles soient traditionnelles ou contemporaines, constituent des vecteurs puissants pour la préservation et la promotion de cette identité. Dans ce contexte, il est pertinent d'examiner le rôle des artistes en tant que gardiens de la culture et comment leurs œuvres peuvent à la fois refléter et influencer la société.
                    </p>
                    <p style="font-size:0.65rem; line-height:1.6; color:var(--text); text-align: justify;">
                      Prenons par exemple le mouvement impressionniste du XIXe siècle. À une époque où l'art académique dominait, les impressionnistes ont osé rompre avec les conventions esthétiques établies...
                    </p>
                  </div>
                  <div style="position:absolute; bottom:0; left:0; right:0; height:50px; background:linear-gradient(to bottom, rgba(249,250,251,0), #f9fafb); border-bottom: 1px solid var(--border);"></div>
                </div>
                <div class="demo-card-body">
                  <span class="demo-card-label label-red">📖 Compréhension Écrite</span>
                  <h3>Reading Comprehension</h3>
                  <p>1,500–2,000 word texts at C1 register. Practice global thesis identification, implicit meaning analysis, and precise reformulation with accurate AI grading.</p>
                </div>
              </div>

              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-writing.png" alt="Written Production Exercise" class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-blue">✍️ Production Écrite</span>
                  <h3>Written Production</h3>
                  <p>Synthèse (220–240 words, 12.5 pts) and essai argumenté (250+ words, 12.5 pts). Marked on 6 criteria: length compliance, objectivity, task realisation, coherence, lexique, and morphosyntaxe.</p>
                </div>
              </div>

              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-speaking.png" alt="Oral Production Exercise" class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-red">🎤 Production Orale</span>
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

        {/* === PRICING === */}
        <section class="features-section" id="pricing">
          <div class="section-inner">
            <p class="section-eyebrow">Tarifs</p>
            <h2 class="section-title">Simple, transparent pricing</h2>
            <div class="pricing-card reveal">
              <div class="pricing-price-col">
                <div class="pricing-price">£30</div>
                <div class="pricing-period">per month</div>
                <p class="pricing-desc">Full access to all DALF C1 practice materials</p>
              </div>
              <div class="pricing-details-col">
                <ul class="pricing-features">
                  <li>Unlimited access to all generated past papers</li>
                  <li>30 exam section attempts per month</li>
                  <li>AI marking against official rubric</li>
                  <li>Error pattern tracking</li>
                  <li>Cancel anytime</li>
                </ul>
                <a href="/register" class="cta-btn pricing-cta">Start Practicing Now →</a>
              </div>
            </div>
          </div>
        </section>

        {/* === FAQ === */}
        <section class="faq-section" id="faq">
          <div class="section-inner">
            <p class="section-eyebrow">Questions fréquentes</p>
            <h2 class="section-title">Everything you need to know</h2>
            <div class="faq-grid">
              <div class="faq-item reveal">
                <h3>How much does it cost?</h3>
                <p>£30 per month gives you unlimited access to every generated past paper, with up to 30 exam section attempts marked per month. Each past paper covers all 4 DALF C1 sections (CO, CE, PE, PO) and is marked against the official France Education International rubric.</p>
              </div>
              <div class="faq-item reveal">
                <h3>How accurate is the AI marking?</h3>
                <p>Our marking engine is built on the exact France Education International grading grids used by real DALF examiners. It evaluates the same 12 criteria — coherence, lexical range, morphosyntax, register, argumentation — and applies the same /25-per-section scale with the 5/25 eliminatory threshold.</p>
              </div>
              <div class="faq-item reveal">
                <h3>What exam format do the papers follow?</h3>
                <p>The post-2020 unified format — no domain specialisation. All papers cover the 10 universal DALF C1 themes and follow the current structure: CO (~40 min), CE (~50 min), PE (~2h30), PO (~1h30 prep + 30 min test).</p>
              </div>
              <div class="faq-item reveal">
                <h3>Can I track my progress over time?</h3>
                <p>Every submission is logged and scored on the 3-tier performance scale (Below C1 → C1 → C1+). The platform identifies recurring weaknesses across all marking criteria so you know exactly what to improve.</p>
              </div>
              <div class="faq-item reveal">
                <h3>Do I need to create an account?</h3>
                <p>Yes — an account lets us save your attempts, track your error patterns, and build your learner profile over time. Signing up takes 30 seconds. A £30/month subscription is required to start exam attempts.</p>
              </div>
              <div class="faq-item reveal">
                <h3>Is the audio generated by AI?</h3>
                <p>Yes — listening comprehension audio is generated using OpenAI's text-to-speech, producing natural French narration at C1 register. Long documents are split into manageable parts so you can practice under exam conditions.</p>
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
              Subscribe for £30/month to access complete DALF C1 past papers across all 4 sections, submit your answers, and get criterion-level feedback against the official France Education International rubric.
            </p>
            <a href="/register" class="cta-btn">Start Practicing Now →</a>
            <p class="cta-microcopy">⚡ Instant access after subscription. Unlimited past papers, 30 marked attempts per month.</p>
          </div>
        </section>

        {/* === TRICOLOR FOOTER BAR === */}
        <div class="tricolor-bar tricolor-footer-bar">
          <div class="bar-blue"></div>
          <div class="bar-white"></div>
          <div class="bar-red"></div>
        </div>

        {/* === FOOTER === */}
        <footer style="border-top:1px solid var(--border); padding:3rem 1.5rem; text-align:center; background: #f8f9fb; font-family: 'Inter', sans-serif;">
          <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem;">
            {/* Socials */}
            <div style="display:flex; align-items:center; gap:1.25rem;">
              <a href="https://www.linkedin.com/in/james-p-ba7653207/" target="_blank" rel="noopener noreferrer" style="color:var(--text-muted); transition:color 0.2s;" onmouseover="this.style.color='var(--fr-blue)'" onmouseout="this.style.color='var(--text-muted)'" aria-label="LinkedIn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/jamespareslfg" target="_blank" rel="noopener noreferrer" style="color:var(--text-muted); transition:color 0.2s;" onmouseover="this.style.color='var(--fr-blue)'" onmouseout="this.style.color='var(--text-muted)'" aria-label="X">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com/jamespares" target="_blank" rel="noopener noreferrer" style="color:var(--text-muted); transition:color 0.2s;" onmouseover="this.style.color='var(--fr-blue)'" onmouseout="this.style.color='var(--text-muted)'" aria-label="GitHub">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
            </div>

            {/* Legal */}
            <div style="display:flex; align-items:center; gap:1rem; font-size:0.9rem; color:var(--text-muted);">
              <a href="/terms" style="color:inherit; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='var(--fr-blue)'" onmouseout="this.style.color='var(--text-muted)'">Terms</a>
              <span>·</span>
              <a href="/privacy" style="color:inherit; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='var(--fr-blue)'" onmouseout="this.style.color='var(--text-muted)'">Privacy</a>
            </div>

            {/* Copyright */}
            <p style="font-size:0.9rem; color:var(--text-muted); margin:0;">
                &copy; {new Date().getFullYear()} Built by <a href="https://jamespares.me" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration:none; font-weight:600; transition:color 0.2s;" onmouseover="this.style.color='var(--fr-blue)'" onmouseout="this.style.color='var(--text-muted)'">James Pares</a>
            </p>
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

            // Sticky nav background
            var nav = document.getElementById('landingNav');
            window.addEventListener('scroll', function() {
              if (window.scrollY > 40) {
                nav.classList.add('nav-scrolled');
              } else {
                nav.classList.remove('nav-scrolled');
              }
            });
          });
        `}} />
      </body>
    </html>
  );
});

export default landing;
