/* =========================================================
   FROLAB — interactions (light-theme build)
   ========================================================= */
(function () {
  'use strict';

  /* ---- sticky condensing nav ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- fullscreen menu overlay ---- */
  const overlay = document.getElementById('menuOverlay');
  document.getElementById('menuBtn')?.addEventListener('click', () => {
    overlay.classList.add('open'); document.body.style.overflow = 'hidden';
  });
  const closeMenu = () => { overlay.classList.remove('open'); document.body.style.overflow = ''; };
  document.getElementById('menuClose')?.addEventListener('click', closeMenu);
  overlay?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  /* ---- seamless infinite logo ticker ---- */
  document.querySelectorAll('.ticker-track').forEach((track) => {
    [...track.children].forEach((c) => track.appendChild(c.cloneNode(true)));
  });

  /* ---- infinite testimonial columns (duplicate for seamless loop) ---- */
  document.querySelectorAll('.testi-col').forEach((col) => {
    [...col.children].forEach((c) => col.appendChild(c.cloneNode(true)));
  });

  /* ---- scroll reveal (IntersectionObserver) ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ---- animated stat count-up ---- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1500; let start = null;
    (function frame(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(easeOut(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    })(performance.now());
  }
  const stats = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const sIO = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    stats.forEach((el) => sIO.observe(el));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const a = item.querySelector('.faq-a');
    item.querySelector('.faq-q').addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((o) => {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; }
      });
      item.classList.toggle('open', !open);
      a.style.maxHeight = open ? null : a.scrollHeight + 'px';
    });
  });

  /* ---- awards accordion (single-open) ---- */
  document.querySelectorAll('.aw button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const li = btn.parentElement;
      const wasOpen = li.classList.contains('open');
      document.querySelectorAll('.aw.open').forEach((o) => o.classList.remove('open'));
      if (!wasOpen) li.classList.add('open');
    });
  });
})();
