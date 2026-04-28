import { Hono } from 'hono';
import { jsx } from 'hono/jsx';
import { detectLang, getDict, type Lang, type Dict } from '../lib/i18n';

const landing = new Hono();

landing.get('/', (c) => {
  const lang = detectLang(c);
  const dict = getDict(lang);
  return c.html(
    <html lang={lang}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{dict.landingMetaTitle}</title>
        <meta name="description" content={dict.landingMetaDesc} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="stylesheet" href="/static/landing.css?v=5" />
      </head>
      <body class="landing-page">


        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var u = new URL(location.href);
            var activeLang = u.searchParams.get('lang') || 'en';
            document.querySelectorAll('.lang-btn').forEach(function(btn) {
              if (btn.getAttribute('data-lang') === activeLang) {
                btn.style.background = 'var(--fr-blue)';
                btn.style.color = '#fff';
                btn.onmouseenter = null;
                btn.onmouseleave = null;
              }
              btn.addEventListener('click', function(e) {
                e.preventDefault();
                var u2 = new URL(location.href);
                u2.searchParams.set('lang', btn.getAttribute('data-lang'));
                location.href = u2.toString();
              });
            });
          })();
        `}} />

        {/* === NAVIGATION === */}
        <nav class="landing-nav" id="landingNav">
          <div class="nav-inner">
            <a href="/" class="nav-logo">
              <img src="/static/logo.png" alt="The DALF Dojo Logo" class="logo-img" />
              <span class="logo-name">
                <span class="logo-the">{dict.landingLogoThe}</span>
                <span class="logo-dojo">{dict.landingLogoDojo}</span>
              </span>
            </a>

            <div class="nav-actions">
              <div id="lang-toggle" style="display:flex; gap:0.25rem; background:rgba(255,255,255,0.9); backdrop-filter:blur(8px); padding:0.35rem 0.5rem; border-radius:999px; border:1px solid var(--border); margin-right:1rem;">
                {[
                  { code: "en", label: dict.langEn },
                  { code: "fr", label: dict.langFr },
                  { code: "zh", label: dict.langZh },
                ].map((l) => (
                  <a
                    key={l.code}
                    href="#"
                    data-lang={l.code}
                    class="lang-btn"
                    style={`font-size:0.85rem; font-weight:500; padding:0.3rem 0.75rem; border-radius:999px; text-decoration:none; transition:all 0.2s; color:var(--text-muted);`}
                    onmouseenter={`this.style.background='rgba(0,0,0,0.05)'; this.style.color='var(--text)'`}
                    onmouseleave={`this.style.background='transparent'; this.style.color='var(--text-muted)'`}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <a href="/login" class="nav-link">{dict.landingNavSignIn}</a>
              <a href="/register" class="nav-cta-pill">{dict.landingNavGetStarted}</a>
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
              {dict.landingHeroPrefix}<br />
              <span class="highlight">{dict.landingHeroHighlight}</span>
            </h1>

            <p class="hero-subtitle">
              {dict.landingHeroSubtitle}
            </p>

            <div class="hero-form-card">
              <form action="/register" method="GET">
                <label class="form-label">{dict.landingTopicLabel}</label>
                <div class="form-input-row">
                  <select name="theme" id="topic-select" required>
                    <option value="" disabled selected>{dict.landingTopicPlaceholder}</option>
                    <option value="Environment and sustainable development">{dict.landingTopicEnv}</option>
                    <option value="Urbanism and city transformation">{dict.landingTopicUrban}</option>
                    <option value="Culture and arts">{dict.landingTopicCulture}</option>
                    <option value="Social issues">{dict.landingTopicSocial}</option>
                    <option value="Science and technology">{dict.landingTopicScience}</option>
                    <option value="Economics and society">{dict.landingTopicEcon}</option>
                    <option value="Family and education">{dict.landingTopicFamily}</option>
                    <option value="Work and wellbeing">{dict.landingTopicWork}</option>
                    <option value="Digital society">{dict.landingTopicDigital}</option>
                    <option value="Consumption and ethics">{dict.landingTopicConsume}</option>
                  </select>
                  <button type="submit" class="form-submit-btn">{dict.landingStartBtn}</button>
                </div>
                <p class="form-microcopy">{dict.landingMicrocopy}</p>
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
                <span class="stat-label">{dict.landingStatSectionsLabel}</span>
                <span class="stat-detail">{dict.landingStatSectionsValue}</span>
              </div>
              <div class="stat-item reveal">
                <span class="stat-number">/100</span>
                <span class="stat-label">{dict.landingStatScaleLabel}</span>
                <span class="stat-detail">{dict.landingStatScaleValue}</span>
              </div>
              <div class="stat-item reveal">
                <span class="stat-number">10</span>
                <span class="stat-label">{dict.landingStatTopicsLabel}</span>
                <span class="stat-detail">{dict.landingStatTopicsValue}</span>
              </div>
              <div class="stat-item reveal">
                <span class="stat-number">5h30</span>
                <span class="stat-label">{dict.landingStatLengthLabel}</span>
                <span class="stat-detail">{dict.landingStatLengthValue}</span>
              </div>
            </div>
          </div>
        </section>

        {/* === SOCIAL PROOF === */}
        <section class="social-proof-section">
          <div class="section-inner">
            <div class="social-proof-content reveal">
              <p class="social-proof-headline">{dict.landingSocialProofHeadline}</p>
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
              <p class="social-proof-sub">{dict.landingSocialProofSub}</p>
            </div>
          </div>
        </section>

        {/* === HOW IT WORKS === */}
        <section class="how-section" id="how">
          <div class="section-inner">
            <p class="section-eyebrow">{dict.landingHowEyebrow}</p>
            <h2 class="section-title">{dict.landingHowTitle}</h2>

            <div class="steps-grid">
              <div class="step-card reveal">
                <div class="step-number step-blue">1</div>
                <h3>{dict.landingHowStep1Title}</h3>
                <p>{dict.landingHowStep1Desc}</p>
              </div>
              <div class="step-card reveal">
                <div class="step-number step-dark">2</div>
                <h3>{dict.landingHowStep2Title}</h3>
                <p>{dict.landingHowStep2Desc}</p>
              </div>
              <div class="step-card reveal">
                <div class="step-number step-red">3</div>
                <h3>{dict.landingHowStep3Title}</h3>
                <p>{dict.landingHowStep3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* === DEMO SECTION === */}
        <section class="demo-section" id="demo">
          <div class="section-inner">
            <p class="section-eyebrow">{dict.landingPreviewEyebrow}</p>
            <h2 class="section-title">{dict.landingPreviewTitle}</h2>

            <div class="demo-grid">
              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-listening.png" alt={dict.landingPreviewListeningAlt} class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-blue">{dict.landingPreviewListeningLabel}</span>
                  <h3>{dict.landingPreviewListeningTitle}</h3>
                  <p>{dict.landingPreviewListeningDesc}</p>
                </div>
              </div>

              <div class="demo-card reveal">
                <div style="background:#f9fafb; padding:1.25rem; border-bottom:1px solid var(--border); overflow:hidden; position:relative; height: 210px;">
                  <h4 style="font-family:'Patrick Hand',cursive; font-size:1.15rem; margin-bottom:0.25rem; color:var(--text); line-height: 1.2; font-weight: 600;">Reading Comprehension — DALF C1 — Culture and arts</h4>
                  <p style="color:var(--text-muted); font-size:0.7rem; margin-bottom:0.85rem;">{dict.readingTime}</p>
                  <div style="background:white; border:1px solid var(--border); border-radius:8px; padding:1rem; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                    <h5 style="font-weight:700; margin-bottom:0.5rem; font-size: 0.85rem; color: var(--text);">{dict.readingText}</h5>
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
                  <span class="demo-card-label label-red">{dict.landingPreviewReadingLabel}</span>
                  <h3>{dict.landingPreviewReadingTitle}</h3>
                  <p>{dict.landingPreviewReadingDesc}</p>
                </div>
              </div>

              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-writing.png" alt={dict.landingPreviewWritingAlt} class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-blue">{dict.landingPreviewWritingLabel}</span>
                  <h3>{dict.landingPreviewWritingTitle}</h3>
                  <p>{dict.landingPreviewWritingDesc}</p>
                </div>
              </div>

              <div class="demo-card reveal">
                <img src="/static/screenshots/demo-speaking.png" alt={dict.landingPreviewSpeakingAlt} class="demo-card-img" />
                <div class="demo-card-body">
                  <span class="demo-card-label label-red">{dict.landingPreviewSpeakingLabel}</span>
                  <h3>{dict.landingPreviewSpeakingTitle}</h3>
                  <p>{dict.landingPreviewSpeakingDesc}</p>
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
            <p class="section-eyebrow">{dict.landingIncludesEyebrow}</p>
            <h2 class="section-title">{dict.landingIncludesTitle}</h2>

            <div class="features-grid">
              <div class="feature-card reveal">
                <div class="feature-icon icon-blue">🎧</div>
                <div class="feature-text">
                  <h3>{dict.landingIncludesCOLabel}</h3>
                  <p>{dict.landingIncludesCODesc}</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-red">📖</div>
                <div class="feature-text">
                  <h3>{dict.landingIncludesCELabel}</h3>
                  <p>{dict.landingIncludesCEDesc}</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-blue">✍️</div>
                <div class="feature-text">
                  <h3>{dict.landingIncludesPELabel}</h3>
                  <p>{dict.landingIncludesPEDesc}</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-red">🎤</div>
                <div class="feature-text">
                  <h3>{dict.landingIncludesPOLabel}</h3>
                  <p>{dict.landingIncludesPODesc}</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-blue">📊</div>
                <div class="feature-text">
                  <h3>{dict.landingIncludesTrackLabel}</h3>
                  <p>{dict.landingIncludesTrackDesc}</p>
                </div>
              </div>

              <div class="feature-card reveal">
                <div class="feature-icon icon-red">🏛️</div>
                <div class="feature-text">
                  <h3>{dict.landingIncludesFormatLabel}</h3>
                  <p>{dict.landingIncludesFormatDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === PRICING === */}
        <section class="features-section" id="pricing">
          <div class="section-inner">
            <p class="section-eyebrow">{dict.landingPricingEyebrow}</p>
            <h2 class="section-title">{dict.landingPricingTitle}</h2>
            <div style="max-width:400px;margin:2rem auto 0;">
              <div class="feature-card reveal" style="text-align:center;padding:2rem;">
                <div style="font-size:2.5rem;font-weight:700;color:var(--fr-blue);">{dict.landingPricingAmount}</div>
                <div style="color:var(--text-muted);margin-bottom:1rem;">{dict.landingPricingPeriod}</div>
                <ul style="text-align:left;padding-left:1.25rem;margin:1rem 0;">
                  <li>{dict.billingFeature1}</li>
                  <li>{dict.billingFeature2}</li>
                  <li>{dict.billingFeature3}</li>
                  <li>{dict.billingFeature4}</li>
                  <li>{dict.landingPricingCancel}</li>
                </ul>
                <a href="/register" class="cta-btn" style="display:inline-block;margin-top:0.5rem;">{dict.landingPricingCTA}</a>
              </div>
            </div>
          </div>
        </section>

        {/* === FAQ === */}
        <section class="faq-section" id="faq">
          <div class="section-inner">
            <p class="section-eyebrow">{dict.landingFaqEyebrow}</p>
            <h2 class="section-title">{dict.landingFaqTitle}</h2>
            <div class="faq-grid">
              <div class="faq-item reveal">
                <h3>{dict.landingFaq1Q}</h3>
                <p>{dict.landingFaq1A}</p>
              </div>
              <div class="faq-item reveal">
                <h3>{dict.landingFaq2Q}</h3>
                <p>{dict.landingFaq2A}</p>
              </div>
              <div class="faq-item reveal">
                <h3>{dict.landingFaq3Q}</h3>
                <p>{dict.landingFaq3A}</p>
              </div>
              <div class="faq-item reveal">
                <h3>{dict.landingFaq4Q}</h3>
                <p>{dict.landingFaq4A}</p>
              </div>
              <div class="faq-item reveal">
                <h3>{dict.landingFaq5Q}</h3>
                <p>{dict.landingFaq5A}</p>
              </div>
              <div class="faq-item reveal">
                <h3>{dict.landingFaq6Q}</h3>
                <p>{dict.landingFaq6A}</p>
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
            <h2 class="cta-title">{dict.landingFinalCTAHeadline}</h2>
            <p class="cta-text">
              {dict.landingFinalCTADesc}
            </p>
            <a href="/register" class="cta-btn">{dict.landingPricingCTA}</a>
            <p class="cta-microcopy">{dict.landingPricingMicrocopy}</p>
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
              <a href="/terms" style="color:inherit; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='var(--fr-blue)'" onmouseout="this.style.color='var(--text-muted)'">{dict.landingFooterTerms}</a>
              <span>·</span>
              <a href="/privacy" style="color:inherit; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='var(--fr-blue)'" onmouseout="this.style.color='var(--text-muted)'">{dict.landingFooterPrivacy}</a>
            </div>

            {/* Copyright */}
            <p style="font-size:0.9rem; color:var(--text-muted); margin:0;">
                &copy; {new Date().getFullYear()} <span dangerouslySetInnerHTML={{ __html: dict.landingFooterBuiltBy.replace('Built by', 'Built by') }} /> <a href="https://jamespares.me" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration:none; font-weight:600; transition:color 0.2s;" onmouseover="this.style.color='var(--fr-blue)'" onmouseout="this.style.color='var(--text-muted)'">James Pares</a>
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
