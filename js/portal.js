import { gsap } from 'gsap';

const hero = document.querySelector('[data-hero="landing"]');
const heroVisual = document.querySelector('.hero-visual');
const overlay = document.querySelector('.page-transition');
const overlayMark = overlay ? overlay.querySelector('.page-transition-mark') : null;

if (hero) {
  const cards = hero.querySelectorAll('.portal-card');

  cards.forEach((card) => {
    const variant = card.classList.contains('portal-card--human') ? 'human' : 'ai';

    card.addEventListener('mouseenter', () => {
      hero.classList.add(`is-${variant}-hover`);
      if (heroVisual) {
        heroVisual.classList.remove('shift-left', 'shift-right');
        heroVisual.classList.add(variant === 'human' ? 'shift-left' : 'shift-right');
      }
    });

    card.addEventListener('mouseleave', () => {
      hero.classList.remove(`is-${variant}-hover`);
      if (heroVisual) heroVisual.classList.remove('shift-left', 'shift-right');
    });

    const go = (event) => {
      event.preventDefault();
      const href = card.getAttribute('href') || card.dataset.href;
      if (!href) return;
      navigateWithTransition(href);
    };

    card.addEventListener('click', go);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') go(event);
    });
  });
}

function navigateWithTransition(href) {
  if (!overlay) {
    window.location.href = href;
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      window.location.href = href;
    },
  });

  tl.set(overlay, { pointerEvents: 'auto' })
    .to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
    .to(overlayMark, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2');
}
