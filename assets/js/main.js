(() => {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- Nav: solid background + mobile toggle ---- */
  const nav = document.getElementById('nav');
  const onScrollNav = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  navToggle.addEventListener('click', () => {
    const open = navMobile.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navMobile.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navMobile.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- Cursor-following ambient glow (desktop only) ---- */
  const glow = document.querySelector('.cursor-glow');
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (isFinePointer && glow) {
    window.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* ---- Process scrollytelling: pinned timeline progress ---- */
  const processPin = document.getElementById('processPin');
  const processVisual = document.querySelector('.process-visual');
  const items = Array.from(document.querySelectorAll('.process-item'));
  const fill = document.getElementById('processFill');
  const numberEl = document.getElementById('processNumber');
  const glowEl = document.getElementById('processGlow');

  const stepGlows = [
    'radial-gradient(circle, rgba(192,132,252,.55), transparent 68%)',
    'radial-gradient(circle, rgba(124,58,237,.55), transparent 68%)',
    'radial-gradient(circle, rgba(99,102,241,.55), transparent 68%)',
    'radial-gradient(circle, rgba(56,189,248,.5), transparent 68%)',
  ];

  let ticking = false;

  function updateProcess() {
    ticking = false;
    if (!processPin || !processVisual) return;
    const rect = processPin.getBoundingClientRect();
    const stickyTop = window.innerHeight * 0.22; // matches CSS `top: 22vh`
    const total = rect.height - processVisual.offsetHeight;
    const scrolled = stickyTop - rect.top;
    const progress = Math.min(1, Math.max(0, total > 0 ? scrolled / total : 0));

    fill.style.height = (progress * 100) + '%';

    let activeIndex = Math.floor(progress * items.length);
    activeIndex = Math.min(items.length - 1, activeIndex);
    if (progress <= 0) activeIndex = -1;

    items.forEach((item, i) => item.classList.toggle('active', i <= activeIndex));

    const displayIndex = Math.max(0, activeIndex);
    numberEl.textContent = String(displayIndex + 1).padStart(2, '0');
    glowEl.style.background = stepGlows[displayIndex];
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateProcess);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateProcess();
})();
