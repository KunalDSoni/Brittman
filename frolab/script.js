/* =========================================================
   FROLAB — interactions
   Recreates the motion system observed on the source site:
   - scroll-into-view reveals (fade / slide / scale)
   - infinite logo + testimonial ticker (seamless loop)
   - FAQ accordion with +/× chevron gesture
   - animated stat count-up
   - sticky / condensing nav
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1. Sticky condensing nav ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 2. Mobile menu ---------- */
  const burger = document.getElementById('burger');
  const links = document.querySelector('.nav-links');
  burger?.addEventListener('click', () => links.classList.toggle('show'));
  links?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') links.classList.remove('show');
  });

  /* ---------- 3. Seamless infinite ticker ----------
     Duplicate each track's children so the -50% keyframe
     loops without a visible jump (matches Framer's Ticker). */
  document.querySelectorAll('.ticker-track').forEach((track) => {
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    // append clones of the original items into the same track
    [...track.children].forEach((child) => {
      track.appendChild(child.cloneNode(true));
    });
    // optional per-track speed override
    const speed = track.dataset.speed;
    if (speed) track.style.animationDuration = speed + 's';
  });

  /* ---------- 4. Scroll-reveal (IntersectionObserver) ----------
     Adds .in when an element enters the viewport, which triggers
     the CSS transition: opacity + transform over .7s on the
     cubic-bezier(.27,0,.51,1) easing reverse-engineered from source. */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ---------- 5. Animated stat count-up ---------- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const dur = 1600;
    let start = null;
    function frame(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      el.textContent = prefix + Math.round(easeOut(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  const statEls = document.querySelectorAll('.stat-num[data-count]');
  if ('IntersectionObserver' in window) {
    const statIO = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            countUp(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    statEls.forEach((el) => statIO.observe(el));
  }

  /* ---------- 6. FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close siblings for a clean single-open accordion
      document.querySelectorAll('.faq-item.open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = isOpen ? null : a.scrollHeight + 'px';
    });
  });
})();
