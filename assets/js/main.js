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

  const railDots = Array.from(document.querySelectorAll('.rail-dot'));
  const TOTAL_CHAPTERS = railDots.length;
  const railFill = document.getElementById('railFill');
  const railFollower = document.getElementById('railFollower');
  const railDotsContainer = document.getElementById('railDots');

  function clamp01(n) { return Math.min(1, Math.max(0, n)); }

  /* ---- Horizontal accordion story track ---- */
  const storyTrack = document.getElementById('storyTrack');
  const hPanels = Array.from(document.querySelectorAll('.h-panel'));
  const NUM_PANELS = hPanels.length;
  const BULGE = 3.4; // how much wider the focused panel gets relative to its neighbours

  /* Rail dots jump into a proportional slice of the single scroll track */
  railDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (!storyTrack) return;
      if (!isDesktop()) {
        hPanels[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      const rect = storyTrack.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const chapterProgress = NUM_PANELS > 1 ? i / (NUM_PANELS - 1) : 0;
      const targetY = window.scrollY + rect.top + chapterProgress * total;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  function updatePanels(progress) {
    if (!hPanels.length) return;
    const focusIndex = progress * (NUM_PANELS - 1);

    const weights = hPanels.map((_, i) => 1 + BULGE * Math.max(0, 1 - Math.abs(focusIndex - i)));
    const weightSum = weights.reduce((a, b) => a + b, 0);

    let activeIndex = 0;
    let bestDist = Infinity;

    hPanels.forEach((panel, i) => {
      const widthPct = (weights[i] / weightSum) * 100;
      panel.style.width = widthPct.toFixed(3) + '%';

      const dist = Math.abs(focusIndex - i);
      if (dist < bestDist) { bestDist = dist; activeIndex = i; }

      const contentOpacity = clamp01(1 - dist * 1.6);
      const content = panel.querySelector('.h-panel-content');
      if (content) content.style.opacity = String(contentOpacity);
    });

    hPanels.forEach((panel, i) => panel.classList.toggle('is-focused', i === activeIndex));
    return activeIndex;
  }

  function mobileResetPanels() {
    hPanels.forEach(panel => {
      panel.style.width = '';
      panel.classList.add('is-focused');
      const content = panel.querySelector('.h-panel-content');
      if (content) content.style.opacity = '';
    });
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

  let ticking = false;
  function updateAll() {
    ticking = false;
    if (!storyTrack) return;
    const vh = window.innerHeight;

    const rect = storyTrack.getBoundingClientRect();
    const total = rect.height - vh;
    const scrolled = -rect.top;
    const storyProgress = clamp01(total > 0 ? scrolled / total : 0);

    if (isDesktop()) updatePanels(storyProgress);
    updateRail(storyProgress);
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
      mobileResetPanels();
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
