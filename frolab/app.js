/* =========================================================
   BRITTMAN site — shared layout + interactions
   Injects header/menu/footer on every page so they stay
   consistent, then wires all interactions.
   ========================================================= */
(function () {
  'use strict';

  const PAGE = document.body.dataset.page || 'home';
  const NAV = [
    ['Services', 'services.html'], ['Industries', 'work.html'], ['About', 'about.html'],
    ['Leadership', 'team.html'], ['Insights', 'blog.html'], ['Careers', 'career.html'], ['Contact', 'contact.html'],
  ];
  const active = (href) => href.split('.')[0] === PAGE ? ' aria-current="page"' : '';

  /* ---------- HEADER ---------- */
  const headerHTML = `
    <header class="nav" id="nav">
      <div class="container nav-inner">
        <a class="logo" href="index.html" aria-label="Brittman home"><span class="slash">//</span> BRITTMAN</a>
        <button class="menu-btn" id="menuBtn" aria-label="Open menu"><span></span><span></span></button>
      </div>
    </header>
    <div class="menu-overlay" id="menuOverlay" aria-hidden="true">
      <button class="menu-close" id="menuClose" aria-label="Close menu">✕</button>
      <nav class="menu-links">
        ${NAV.map(([l, h]) => `<a href="${h}"${active(h)}>${l}</a>`).join('')}
      </nav>
    </div>`;

  /* ---------- FOOTER ---------- */
  const footerHTML = `
    <footer class="footer">
      <div class="container footer-top">
        <div class="footer-col">
          <h4>Company</h4>
          ${NAV.map(([l, h]) => `<a href="${h}">${l}</a>`).join('')}
        </div>
        <div class="footer-col">
          <h4>Get in touch</h4>
          <a href="mailto:info@brittman.com">info@brittman.com</a>
          <a href="tel:+912265300998">+91 22 6530 0998</a>
          <a href="https://www.linkedin.com/company/brittman-utilities-&-services-pvt-ltd-" target="_blank" rel="noopener">LinkedIn</a>
        </div>
        <a class="whatsapp-card" href="contact.html">
          <span class="wa-top"><span class="wa-ico">✦</span> Talk to our workforce team</span>
          <span class="wa-bottom">Request a Consultation <span class="arrow">↗</span></span>
        </a>
      </div>
      <div class="container footer-bottom">
        <a class="logo light" href="index.html"><span class="slash">//</span> BRITTMAN</a>
        <span class="legal">Privacy Policy &nbsp;&bull;&nbsp; Terms &amp; Conditions</span>
        <span class="copy">© 2026 Brittman Utilities &amp; Services Pvt. Ltd. All rights reserved.</span>
      </div>
    </footer>`;

  /* ---------- STUDY BADGE ---------- */
  const badgeHTML = `
    <div class="study-badge" id="studyBadge">
      <span>Demo build — design template adapted, content for Brittman</span>
      <button aria-label="Dismiss">✕</button>
    </div>`;

  const hMount = document.getElementById('site-header');
  const fMount = document.getElementById('site-footer');
  if (hMount) hMount.innerHTML = headerHTML;
  if (fMount) fMount.innerHTML = footerHTML;
  document.body.insertAdjacentHTML('beforeend', badgeHTML);

  /* ---------- sticky condensing nav ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- menu overlay ---------- */
  const overlay = document.getElementById('menuOverlay');
  const openMenu = () => { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { overlay.classList.remove('open'); document.body.style.overflow = ''; };
  document.getElementById('menuBtn')?.addEventListener('click', openMenu);
  document.getElementById('menuClose')?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

  /* ---------- study badge dismiss ---------- */
  const badge = document.getElementById('studyBadge');
  if (sessionStorage.getItem('hideStudyBadge')) badge.style.display = 'none';
  badge.querySelector('button').addEventListener('click', () => {
    badge.style.display = 'none'; sessionStorage.setItem('hideStudyBadge', '1');
  });

  /* ---------- seamless tickers + testimonial columns ---------- */
  document.querySelectorAll('.ticker-track, .testi-col').forEach((track) => {
    [...track.children].forEach((c) => track.appendChild(c.cloneNode(true)));
  });

  /* ---------- scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add('in'));

  /* ---------- stat count-up ---------- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  function countUp(el) {
    const target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || '', dur = 1500;
    let start = null;
    (function frame(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(easeOut(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    })(performance.now());
  }
  if ('IntersectionObserver' in window) {
    const sIO = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach((el) => sIO.observe(el));
  }

  /* ---------- generic accordions (FAQ + awards) ---------- */
  function wireAccordion(selector, itemSel, panelSel) {
    document.querySelectorAll(selector).forEach((item) => {
      const trigger = item.querySelector(itemSel);
      const panel = panelSel ? item.querySelector(panelSel) : null;
      trigger.addEventListener('click', () => {
        const open = item.classList.contains('open');
        item.parentElement.querySelectorAll('.open').forEach((o) => {
          o.classList.remove('open');
          const p = o.querySelector(panelSel);
          if (p) p.style.maxHeight = null;
        });
        if (!open) {
          item.classList.add('open');
          if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }
  wireAccordion('.faq-item', '.faq-q', '.faq-a');
  wireAccordion('.aw', 'button', null); // awards use CSS max-height on .open

  /* ---------- scroll-linked hero zoom ----------
     Mirrors the live site: the hero video scales with scroll position.
     It eases up to a peak as the media reaches the viewport centre,
     then eases back down as it scrolls away ("zoom, then close"). */
  const heroMedia = document.getElementById('heroMedia');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroMedia && !reduceMotion) {
    const BASE = 0.90, PEAK = 1.05, SPREAD = 0.92; // SPREAD in viewport-height units
    let ticking = false;
    const apply = () => {
      const r = heroMedia.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const d = (r.top + r.height / 2 - vh / 2) / vh;          // 0 when centred
      const f = Math.max(0, 1 - Math.pow(d / SPREAD, 2));      // 1 at centre → 0 at edges
      heroMedia.style.transform = 'scale(' + (BASE + (PEAK - BASE) * f).toFixed(4) + ')';
      ticking = false;
    };
    const onScrollZoom = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
    window.addEventListener('scroll', onScrollZoom, { passive: true });
    window.addEventListener('resize', onScrollZoom);
    apply();
  }

  /* ---------- hero video play / pause toggle ---------- */
  const heroVideo = document.getElementById('heroVideo');
  const playToggle = document.getElementById('heroPlayToggle');
  if (heroVideo && playToggle) {
    const sync = () => {
      const paused = heroVideo.paused;
      playToggle.textContent = paused ? '▶' : '❚❚';
      playToggle.classList.toggle('is-paused', paused);
      playToggle.setAttribute('aria-label', paused ? 'Play video' : 'Pause video');
    };
    playToggle.addEventListener('click', () => {
      heroVideo.paused ? heroVideo.play() : heroVideo.pause();
    });
    heroVideo.addEventListener('play', sync);
    heroVideo.addEventListener('pause', sync);
    // some browsers block autoplay until interaction — keep the poster usable
    heroVideo.play().catch(() => {});
    sync();
  }

  /* ---------- contact form ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach((f) => {
        const bad = !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
        f.classList.toggle('invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) return;
      form.innerHTML = `<div class="form-success"><span class="check">✓</span>
        <h3>Thank you — your enquiry has been received.</h3><p>A member of the Brittman team will get back to you shortly. For urgent requirements, email info@brittman.com.</p></div>`;
    });
    form.querySelectorAll('input,textarea').forEach((f) =>
      f.addEventListener('input', () => f.classList.remove('invalid')));
  }
})();
