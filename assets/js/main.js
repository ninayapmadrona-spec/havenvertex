(() => {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  const isDesktop = () => window.matchMedia('(min-width: 861px)').matches;

  /* ---- Nav ---- */
  const nav = document.getElementById('nav');
  const onScrollNav = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  navToggle.addEventListener('click', () => navMobile.classList.toggle('open'));
  navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMobile.classList.remove('open')));

  /* ---- Generic reveal-on-scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- Story progress dots ---- */
  const TOTAL_CHAPTERS = 6;
  document.querySelectorAll('.story-progress').forEach(container => {
    const forChapter = parseInt(container.dataset.progressFor, 10);
    for (let i = 1; i <= TOTAL_CHAPTERS; i++) {
      const dot = document.createElement('i');
      if (i === forChapter) dot.classList.add('is-current');
      container.appendChild(dot);
    }
  });

  /* ---- Story tracks: scroll-scrubbed enter/exit ---- */
  const tracks = Array.from(document.querySelectorAll('.story-track'));

  function clamp01(n) { return Math.min(1, Math.max(0, n)); }

  function updateStoryCard(card, progress) {
    const enterEnd = 0.16;
    const exitStart = 0.84;
    let t, opacity, translate;
    if (progress < enterEnd) {
      t = progress / enterEnd;
      opacity = t;
      translate = 46 * (1 - t);
    } else if (progress > exitStart) {
      t = (progress - exitStart) / (1 - exitStart);
      opacity = 1 - t;
      translate = -46 * t;
    } else {
      opacity = 1;
      translate = 0;
    }
    card.style.opacity = String(opacity);
    card.style.transform = `translateY(${translate.toFixed(1)}px)`;
    card.classList.toggle('is-active', progress >= enterEnd && progress <= exitStart);
  }

  function mobileShowAllCards() {
    document.querySelectorAll('.story-card').forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.classList.add('is-active');
    });
  }

  let ticking = false;
  function updateAllTracks() {
    ticking = false;
    const vh = window.innerHeight;
    tracks.forEach(track => {
      const rect = track.getBoundingClientRect();
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const progress = clamp01(total > 0 ? scrolled / total : 0);
      const card = track.querySelector('.story-card');
      if (card) updateStoryCard(card, progress);
    });
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateAllTracks);
      ticking = true;
    }
  }

  function init() {
    if (isDesktop()) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      updateAllTracks();
    } else {
      mobileShowAllCards();
    }
  }

  let currentMode = isDesktop();
  window.addEventListener('resize', () => {
    const nowDesktop = isDesktop();
    if (nowDesktop !== currentMode) {
      currentMode = nowDesktop;
      window.location.reload();
    }
  });

  init();
})();
