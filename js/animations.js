import { gsap } from 'gsap';

const hero = document.querySelector('[data-hero="landing"]');

if (hero) {
  /* Particle field */
  const field = hero.querySelector('.hero-particles');
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

  tl.set(hero, { autoAlpha: 1 })
    .from('.hero-visual', { autoAlpha: 0, y: 24, duration: 1.1 }, 0.1)
    .from('.hero-wordmark', { autoAlpha: 0, y: 16, duration: 0.9 }, 0.55)
    .from('.hero-tagline', { autoAlpha: 0, y: 12, duration: 0.8 }, 0.85)
    .from('.hero-divider', { scaleX: 0, duration: 0.6 }, 1.05)
    .from('.hero-headline', { autoAlpha: 0, y: 16, duration: 0.8 }, 1.15)
    .from('.hero-subline', { autoAlpha: 0, y: 12, duration: 0.7 }, 1.32)
    .from(
      '.portal-card',
      { autoAlpha: 0, y: 28, duration: 0.9, stagger: 0.14 },
      1.5
    )
    .from('.hero-scroll-hint', { autoAlpha: 0, duration: 0.6 }, 2.1);
}

/* Inner page hero entrance */
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
