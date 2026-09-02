(() => {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  const isDesktop = () => window.matchMedia('(min-width: 861px)').matches;

  /* ---- Mobile menu ---- */
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

  /* ---- Rail: click a dot to jump to its chapter ---- */
  const railDots = Array.from(document.querySelectorAll('.rail-dot'));
  railDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const TOTAL_CHAPTERS = railDots.length;
  const tracks = Array.from(document.querySelectorAll('.story-track'));
  const railFill = document.getElementById('railFill');
  const railFollower = document.getElementById('railFollower');
  const railDotsContainer = document.getElementById('railDots');

  function clamp01(n) { return Math.min(1, Math.max(0, n)); }

  /* ---- Story tracks: scroll-scrubbed enter/exit ---- */
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

  /* ---- Rail: continuous progress fill + morphing follower ---- */
  function updateRail(overallProgress) {
    if (railFill) railFill.style.height = (overallProgress * 100).toFixed(1) + '%';

    const activeIndex = Math.min(TOTAL_CHAPTERS - 1, Math.floor(overallProgress * TOTAL_CHAPTERS));
    railDots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === activeIndex);
      dot.classList.toggle('is-complete', i < activeIndex);
    });

    if (railFollower && railDotsContainer && railDots.length) {
      const containerRect = railDotsContainer.getBoundingClientRect();
      const firstRect = railDots[0].getBoundingClientRect();
      const lastRect = railDots[railDots.length - 1].getBoundingClientRect();
      if (isDesktop()) {
        const firstCenter = firstRect.top + firstRect.height / 2 - containerRect.top;
        const lastCenter = lastRect.top + lastRect.height / 2 - containerRect.top;
        const y = firstCenter + (lastCenter - firstCenter) * overallProgress;
        railFollower.style.top = y.toFixed(1) + 'px';
        railFollower.style.left = '50%';
      } else {
        const firstCenter = firstRect.left + firstRect.width / 2 - containerRect.left;
        const lastCenter = lastRect.left + lastRect.width / 2 - containerRect.left;
        const x = firstCenter + (lastCenter - firstCenter) * overallProgress;
        railFollower.style.left = x.toFixed(1) + 'px';
        railFollower.style.top = '50%';
      }
    }
  }

  function mobileShowAllCards() {
    document.querySelectorAll('.story-card').forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.classList.add('is-active');
    });
  }

  let ticking = false;
  function updateAll() {
    ticking = false;
    if (!tracks.length) return;
    const vh = window.innerHeight;

    tracks.forEach(track => {
      const rect = track.getBoundingClientRect();
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const progress = clamp01(total > 0 ? scrolled / total : 0);
      const card = track.querySelector('.story-card');
      if (card) updateStoryCard(card, progress);
    });

    const firstRect = tracks[0].getBoundingClientRect();
    const lastRect = tracks[tracks.length - 1].getBoundingClientRect();
    const journeyTop = firstRect.top + window.scrollY;
    const journeyBottom = lastRect.top + lastRect.height + window.scrollY - vh;
    const overallProgress = clamp01((window.scrollY - journeyTop) / (journeyBottom - journeyTop));
    updateRail(overallProgress);
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateAll);
      ticking = true;
    }
  }

  function init() {
    if (isDesktop()) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      updateAll();
    } else {
      mobileShowAllCards();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      updateAll();
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
