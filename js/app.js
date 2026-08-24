import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Smooth scroll (Lenis) ---------- */
if (!prefersReducedMotion) {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Nav scroll state ---------- */
const nav = document.querySelector('.site-nav');

if (nav) {
  const updateNav = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
}

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
    });
  });
}

/* ---------- Footer year ---------- */
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/* ---------- Generic scroll-reveal ---------- */
gsap.utils.toArray('.reveal').forEach((el, i) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay: (i % 5) * 0.06,
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true,
    },
  });
});

/* ================= Portal landing page ================= */
const heroLanding = document.querySelector('[data-hero="landing"]');

if (heroLanding) {
  /* Particle field around the globe */
  const field = heroLanding.querySelector('.hero-particles');
  if (field) {
    const count = window.innerWidth < 720 ? 14 : 28;
    for (let i = 0; i < count; i += 1) {
      const p = document.createElement('span');
      const size = 2 + Math.random() * 3;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${40 + Math.random() * 55}%`;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 120}px`);
      p.style.setProperty('--drift-y', `${-40 - Math.random() * 100}px`);
      p.style.animationDuration = `${6 + Math.random() * 8}s`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      field.appendChild(p);
    }
  }

  /* Entrance timeline */
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.set(heroLanding, { autoAlpha: 1 })
    .from('.hero-visual', { autoAlpha: 0, y: 24, duration: 1.1 }, 0.1)
    .from('.hero-wordmark', { autoAlpha: 0, y: 16, duration: 0.9 }, 0.55)
    .from('.hero-tagline', { autoAlpha: 0, y: 12, duration: 0.8 }, 0.85)
    .from('.hero-divider', { scaleX: 0, duration: 0.6 }, 1.05)
    .from('.hero-headline', { autoAlpha: 0, y: 16, duration: 0.8 }, 1.15)
    .from('.hero-subline', { autoAlpha: 0, y: 12, duration: 0.7 }, 1.32)
    .from('.portal-card', { autoAlpha: 0, y: 28, duration: 0.9, stagger: 0.14 }, 1.5)
    .from('.hero-scroll-hint', { autoAlpha: 0, duration: 0.6 }, 2.1);

  /* Portal hover + click interactions */
  const heroVisual = heroLanding.querySelector('.hero-visual');
  const overlay = document.querySelector('.page-transition');
  const overlayMark = overlay ? overlay.querySelector('.page-transition-mark') : null;

  const navigateWithTransition = (href) => {
    if (!overlay) {
      window.location.href = href;
      return;
    }
    gsap
      .timeline({ onComplete: () => { window.location.href = href; } })
      .set(overlay, { pointerEvents: 'auto' })
      .to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
      .to(overlayMark, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2');
  };

  heroLanding.querySelectorAll('.portal-card').forEach((card) => {
    const variant = card.classList.contains('portal-card--human') ? 'human' : 'ai';

    card.addEventListener('mouseenter', () => {
      heroLanding.classList.add(`is-${variant}-hover`);
      if (heroVisual) {
        heroVisual.classList.remove('shift-left', 'shift-right');
        heroVisual.classList.add(variant === 'human' ? 'shift-left' : 'shift-right');
      }
    });

    card.addEventListener('mouseleave', () => {
      heroLanding.classList.remove(`is-${variant}-hover`);
      if (heroVisual) heroVisual.classList.remove('shift-left', 'shift-right');
    });

    const go = (event) => {
      event.preventDefault();
      const href = card.getAttribute('href') || card.dataset.href;
      if (href) navigateWithTransition(href);
    };

    card.addEventListener('click', go);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') go(event);
    });
  });
}

/* ================= Inner page hero entrance ================= */
const pageHero = document.querySelector('[data-hero="inner"]');

if (pageHero) {
  gsap.from(pageHero.querySelectorAll('.hero-kicker, .page-hero-title, .page-hero-desc, .page-hero-actions'), {
    autoAlpha: 0,
    y: 20,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.2,
  });

  gsap.from(pageHero.querySelectorAll('.visual-frame, .visual-card'), {
    autoAlpha: 0,
    y: 24,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.4,
  });
}
