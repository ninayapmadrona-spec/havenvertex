(() => {
  'use strict';

  const isDesktop = () => window.matchMedia('(min-width: 861px)').matches;

  /* ---- Rail: click to navigate ---- */
  const railDots = Array.from(document.querySelectorAll('.rail-dot'));
  railDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---- Rail: highlight based on visible chapter ---- */
  const chapterOrder = ['chapter-chaos', 'chapter-foundation', 'chapter-presence', 'chapter-visibility', 'chapter-growth', 'chapter-haven'];
  const railTargets = chapterOrder.map(id => {
    const section = document.getElementById(id);
    if (!section) return null;
    const pin = section.querySelector('.chapter-pin');
    return { id, el: pin || section };
  }).filter(Boolean);

  const railObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = railTargets.findIndex(t => t.el === entry.target);
      if (idx === -1) return;
      railDots.forEach((d, i) => {
        d.classList.toggle('is-active', i === idx);
        d.classList.toggle('is-complete', i < idx);
        d.classList.toggle('is-gold', i === 5 && idx === 5);
      });
    });
  }, { threshold: 0.5 });
  railTargets.forEach(t => railObserver.observe(t.el));

  /* ---- Landing: card selection ---- */
  const cardRow = document.getElementById('cardRow');
  document.querySelectorAll('.chapter-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = document.getElementById(card.dataset.target);
      if (!target) return;
      cardRow.classList.add('is-selecting');
      card.classList.add('is-selecting');
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
        window.setTimeout(() => {
          cardRow.classList.remove('is-selecting');
          card.classList.remove('is-selecting');
        }, 900);
      }, 380);
    });
  });

  /* ---- Haven: simple reveal-on-view ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- Mobile: one-shot reveal of chapter internals (no continuous scroll-jack) ---- */
  function mobileRevealAll() {
    document.querySelectorAll('.foundation-legend').forEach(el => el.classList.add('is-visible'));
    document.querySelectorAll('.fnode, .fnode-line').forEach(el => el.classList.add('is-lit'));
    document.querySelectorAll('.presence-item').forEach(el => el.classList.add('is-visible'));
    document.querySelectorAll('.ring, .return-line, .glimmer').forEach(el => el.classList.add('is-visible'));
    document.querySelectorAll('.growth-ticket').forEach(el => el.classList.add('is-visible'));
    document.querySelectorAll('.growth-phone').forEach(el => el.classList.add('is-answered'));
    document.querySelectorAll('.service-legend').forEach(el => el.classList.add('is-visible'));
    const hg = document.getElementById('hgBottom');
    if (hg) hg.style.fill = 'rgba(227,216,246,0.55)';
    document.querySelectorAll('.chapter-pin').forEach(el => el.classList.add('is-visible'));
  }

  /* ---- Desktop: scroll-progress-driven chapter animations ---- */
  const tracks = Array.from(document.querySelectorAll('.chapter-track'));

  function clamp01(n) { return Math.min(1, Math.max(0, n)); }

  function pinOpacity(progress) {
    if (progress < 0.1) return progress / 0.1;
    return 1;
  }

  function updateChaos(progress, root) {
    const stack = root.querySelector('#chaosStack');
    if (stack) {
      const extra = progress * 14;
      stack.style.setProperty('--lean', extra + 'deg');
      Array.from(stack.children).forEach((i, idx) => {
        i.style.transform = `rotate(${9 + idx * 6 + extra}deg) translate(${idx * 10}px, ${idx * 8}px)`;
      });
    }
    const date = root.querySelector('#chaosDate');
    if (date) date.style.opacity = String(1 - progress * 0.6);
  }

  function updateFoundation(progress, root) {
    const nodes = root.querySelectorAll('.fnode');
    const lines = root.querySelectorAll('.fnode-line');
    nodes.forEach((n, i) => {
      const threshold = 0.08 + i * 0.1;
      n.classList.toggle('is-lit', progress > threshold);
    });
    lines.forEach((l, i) => {
      const threshold = 0.08 + i * 0.1;
      l.classList.toggle('is-lit', progress > threshold);
    });
    const legend = root.querySelector('.foundation-legend');
    if (legend) legend.classList.toggle('is-visible', progress > 0.78);
  }

  function updatePresence(progress, root) {
    const bands = [
      { sel: '.presence-facade', at: 0.06 },
      { sel: '.presence-mobile', at: 0.18 },
      { sel: '.tile-1', at: 0.32 },
      { sel: '.tile-2', at: 0.40 },
      { sel: '.tile-3', at: 0.48 },
      { sel: '.tile-4', at: 0.56 },
      { sel: '.presence-brand', at: 0.68 },
    ];
    bands.forEach(b => {
      const el = root.querySelector(b.sel);
      if (el) el.classList.toggle('is-visible', progress > b.at);
    });
    const visual = root.querySelector('.presence-visual');
    if (visual) visual.classList.toggle('is-pulsing', progress > 0.88 && progress < 0.97);
    updatePresenceParallax(progress, root);
  }

  function updateVisibility(progress, root) {
    root.querySelectorAll('.ring').forEach((ring, i) => {
      ring.classList.toggle('is-visible', progress > 0.1 + i * 0.15);
    });
    root.querySelectorAll('.return-line').forEach((line, i) => {
      line.classList.toggle('is-visible', progress > 0.5 + i * 0.15);
    });
    root.querySelectorAll('.glimmer').forEach(dot => {
      const t = parseFloat(dot.dataset.t || '0.5');
      if (progress > t) dot.classList.add('is-visible');
    });
    const legend = root.querySelector('.service-legend');
    if (legend) legend.classList.toggle('is-visible', progress > 0.55);
  }

  function updateGrowth(progress, root, section) {
    const hg = root.querySelector('#hgBottom');
    if (hg) {
      const fillAlpha = clamp01(progress * 1.1) * 0.6 + 0.05;
      hg.style.fill = `rgba(227,216,246,${fillAlpha.toFixed(2)})`;
    }
    const phone = root.querySelector('.growth-phone');
    if (phone) phone.classList.toggle('is-answered', progress > 0.2);
    const tickets = [
      { sel: '.t1', at: 0.35 },
      { sel: '.t2', at: 0.48 },
      { sel: '.t3', at: 0.6 },
    ];
    tickets.forEach(t => {
      const el = root.querySelector(t.sel);
      if (el) el.classList.toggle('is-visible', progress > t.at);
    });
    const overlay = section.querySelector('#goldOverlay');
    if (overlay) {
      const goldT = progress > 0.75 ? (progress - 0.75) / 0.25 : 0;
      overlay.style.opacity = String(clamp01(goldT));
    }
    const legend = root.querySelector('.service-legend');
    if (legend) legend.classList.toggle('is-visible', progress > 0.4);
  }

  function updatePresenceParallax(progress, root) {
    const glowOffset = (progress - 0.5) * 40;
    root.style.setProperty('--presence-parallax', glowOffset.toFixed(1) + 'px');
  }

  const updaters = {
    chaos: updateChaos,
    foundation: updateFoundation,
    presence: updatePresence,
    visibility: updateVisibility,
    growth: updateGrowth,
  };

  let ticking = false;

  function updateAllTracks() {
    ticking = false;
    const vh = window.innerHeight;
    tracks.forEach(track => {
      const rect = track.getBoundingClientRect();
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const progress = clamp01(total > 0 ? scrolled / total : 0);

      const pin = track.querySelector('.chapter-pin');
      if (pin) pin.style.opacity = String(pinOpacity(progress));

      const chapter = track.dataset.chapter;
      const fn = updaters[chapter];
      if (fn) fn(progress, track, track);
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
      mobileRevealAll();
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
