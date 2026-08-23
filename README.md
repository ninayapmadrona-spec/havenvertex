# Haven Vertex

Official website of Haven Vertex Studio — *Connect. Automate. Elevate.*

A cinematic, portal-driven experience: visitors choose how they'd like to work with us —
**Human-First** (human-led, personally handled) or **AI-Enabled** (human-led, technology-enhanced).
Both routes offer the same services; only the working style differs.

## Stack

Plain HTML5 / CSS3 / JavaScript — no framework. [GSAP](https://gsap.com/) for animation,
[Lenis](https://lenis.darkroom.engineering/) for smooth scroll, [Vite](https://vitejs.dev/) for local dev and bundling.

## Pages

- `index.html` — landing / portal selection experience
- `human.html` — Human-First route
- `ai.html` — AI-Enabled route

## Development

```bash
npm install
npm run dev       # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Structure

```
index.html / human.html / ai.html
css/
  variables.css   — brand tokens (color, type, motion)
  main.css        — layout & components
  animations.css  — keyframes & motion states
js/
  app.js          — smooth scroll, nav, scroll-reveal
  animations.js   — hero entrance timelines
  portal.js       — portal hover/click transitions
public/assets/
  logo/           — brand mark
  icons/          — favicons
```
