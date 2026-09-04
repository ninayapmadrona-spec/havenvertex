# Haven Vertex

**People | Systems | Possibilities.**

A premium, card-based digital-growth-partner website for Haven Vertex, built
with Next.js (App Router), Tailwind CSS, and Framer Motion. There is no
traditional top navigation — the entire homepage is a single scroll-snapped
sequence of eight full-viewport "chapter" cards, navigated by scrolling,
clicking the side rail, or swiping on touch devices.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Brand assets — action needed

The real Haven Vertex logo is live at `public/brand/logo.png` and picked up
automatically by `LogoMark` (`src/components/ui/Logo.tsx`) everywhere the
mark appears — side rail, hero, footer chapter. Do not replace or redesign
this file; it's the one asset the brand direction is explicit about keeping
unchanged.

Everything below is still a structured placeholder, ready for real content
to be dropped in without touching any code:

| What | Where | Fallback until real content lands |
|---|---|---|
| Client logos | `public/clients/<slug>.png` (see `public/clients/README.md`) | Clean typographic wordmark of the client's name |
| Portfolio case studies | `portfolio[].caseStudies` in `src/lib/content.ts` (see `public/portfolio/README.md`) | "Case studies coming soon" badge per category |
| Video testimonials | `videoTestimonials` in `src/lib/content.ts` | "Coming Soon" placeholder tile |
| Written testimonials | `writtenTestimonials` in `src/lib/content.ts` | "Being collected" empty-state message |
| Hero art ("two hands reaching") | `src/components/cards/Card01Welcome.tsx` | CSS/SVG gradient abstraction |
| Calendly link | `brand.calendlyUrl` in `src/lib/content.ts` | Placeholder URL |
| Contact email | `brand.contactEmail` in `src/lib/content.ts` | Placeholder address |
| Contact form backend | `src/app/api/contact/route.ts` | Logs to console only |

No fabricated testimonials, client quotes, ratings, or project names are
used anywhere in the current build — every one of the above shows an honest
"not yet available" state rather than placeholder content dressed up as real.

## UX architecture

The homepage (`src/app/page.tsx`) renders eight chapters inside a single
`<CardExperience>` shell:

| # | Chapter | Component | Purpose |
|---|---------|-----------|---------|
| 01 | Welcome | `Card01Welcome` | Hero, brand tagline, "Enter Our Vertex" CTA |
| 02 | Meet Nina | `Card02MeetNina` | Founder introduction, credibility pills |
| 03 | Services | `Card03Services` | 6 interactive service tiles |
| 04 | Experience | `Card04Experience` | Real stats + interactive category diagram |
| 05 | Clients | `Card05Clients` | Trust grid of real, named clients |
| 06 | Portfolio | `Card06Portfolio` | Case-study categories, structured for real work |
| 07 | Success Stories | `Card07Stories` | Video-first testimonials + trust metrics |
| 08 | Let's Build Together | `Card08Contact` | Discovery-call CTA + contact form |

### Navigation model

There is deliberately no `<nav>` bar. Instead:

- **`SideRail`** (`src/components/layout/SideRail.tsx`) — a fixed, floating
  pill on the left edge (desktop) with one dot per chapter, an active-state
  ring, and a hover/focus tooltip naming the chapter. Clicking a dot
  smooth-scrolls to that chapter.
- **`MobileDock`** (`src/components/layout/MobileDock.tsx`) — the same
  concept collapsed into a bottom dock on small screens.
- **`CardExperience`** (`src/components/layout/CardExperience.tsx`) — the
  scroll container (`scroll-snap-type: y mandatory`) plus an
  `IntersectionObserver` (`useActiveSection` hook) that tracks which chapter
  is dominant in the viewport and keeps the rail in sync, whether the user
  scrolled, clicked, or swiped. A visually-hidden "Skip to content" link is
  the first tab stop for keyboard users.

## Visual design system

Defined once in `tailwind.config.ts` and `src/app/globals.css`.

**Color**

| Token | Hex | Role |
|---|---|---|
| `primary` | `#6A1B9A` | Rich Electric Purple — CTAs, active states |
| `secondary` | `#4A0E6B` | Deep Violet — gradients, dark UI |
| `accent` | `#B57EDC` | Soft Lavender Glow — highlights, glows |
| `cloud` | `#F5F3FF` | Cloud Lavender — page background |
| `plum` | `#22142F` | Dark Plum — body text, dark sections |

**Type**

- Headings: `Cormorant Garamond` (`font-heading`) — large, elegant, editorial.
- Body: `Manrope` (`font-body`) — clean and highly legible at small sizes.
- Both loaded via `next/font/google` in `src/app/layout.tsx` (self-hosted,
  no runtime Google Fonts request).

**Surface language**

- `.glass-panel` / `.glass-panel-deep` (globals.css) — the frosted, translucent
  "glass portal" surface used by every card and tile.
- `shadow-glow` / `shadow-glow-lg` — soft purple bloom on hover/active states.
- `.rail-track` — the side-rail's pill surface.

## Motion system

Built entirely with Framer Motion, tuned to read as **cinematic and
luxurious, never aggressive or game-like**:

- **`ChapterSection`** — each chapter fades/scales/lifts into place
  (`opacity/scale/y` via `whileInView`) as it becomes dominant in the
  viewport, giving the "cards move forward and become dominant" effect from
  the brief without any parallax hacks.
- **`AuroraBackground`** — the soft purple wave/blob field behind every
  chapter. Blobs drift on a slow continuous loop (`animate-drift` /
  `animate-float` keyframes) and get an additional gentle parallax offset
  from `pointermove`, spring-smoothed (`useSpring`) so it never feels jumpy.
- **`TiltCard`** — the reusable glass tile (services, portfolio, testimonials).
  Tilts a few degrees toward the cursor via `rotateX`/`rotateY` springs, lifts
  and scales slightly on hover, and casts a radial "spotlight" gradient that
  tracks the pointer. Wrap a set of `TiltCard`s in a `tilt-group` div to get
  the sibling-blur focus effect (hover one tile, the rest soften) — pure CSS,
  no extra JS state.
- **`SideRail`** — the active dot animates scale/color and gets a spring-
  driven focus ring (`layoutId="rail-ring"`) that glides between dots.
- Scroll-triggered reveals (`whileInView`) are used throughout for stats,
  service tiles, portfolio tiles, and testimonials, staggered per item.

All transitions use spring physics or `ease: [0.16, 1, 0.3, 1]` (a
"luxury ease-out") — no bounce, no overshoot, no fast/snappy gaming-style
animation curves.

**`prefers-reduced-motion`**: `TiltCard`, `AuroraBackground`, and
`ChapterSection` all check Framer Motion's `useReducedMotion()` and disable
cursor-tilt, pointer parallax, and the drift/float loops for users who've
asked for reduced motion at the OS level; a global CSS media query is a
second line of defense. Content still reveals (via a plain opacity fade)
rather than staying hidden.

## Component library

```
src/components/
├── layout/
│   ├── CardExperience.tsx   # scroll-snap shell + active-chapter tracking + skip link
│   ├── ChapterSection.tsx   # shared full-viewport chapter wrapper + reveal motion
│   ├── SideRail.tsx         # desktop floating dot navigation
│   └── MobileDock.tsx       # mobile bottom dot navigation
├── decor/
│   └── AuroraBackground.tsx # ambient purple wave/blob field
├── ui/
│   ├── Logo.tsx              # LogoMark (real brand asset + fallback) + Wordmark
│   ├── ClientLogo.tsx        # client trust-grid tile (logo asset + text fallback)
│   ├── Button.tsx            # pill CTA button (solid/ghost)
│   ├── TiltCard.tsx          # cursor-tilt glass tile + spotlight
│   ├── SectionKicker.tsx     # small uppercase kicker + ChapterTag badge
│   └── StatBlock.tsx         # animated stat number + label
└── cards/
    ├── Card01Welcome.tsx
    ├── Card02MeetNina.tsx
    ├── Card03Services.tsx
    ├── Card04Experience.tsx
    ├── Card05Clients.tsx
    ├── Card06Portfolio.tsx
    ├── Card07Stories.tsx
    ├── Card08Contact.tsx
    └── ContactForm.tsx       # client form → /api/contact
```

Copy and structured content (services, stats, clients, portfolio categories,
testimonials) live in one place: `src/lib/content.ts`. Edit that file to
update site copy without touching component markup.

## Responsive behavior

- **Desktop-first**, per the brief: chapters are designed at `lg`/`xl` widths
  first, then constrained down.
- The side rail hides below `md`; the `MobileDock` bottom bar takes over.
- Grids collapse: services 3→2→1 columns, clients 4→3→2, portfolio 2→1,
  video/written testimonials 3→1, as the viewport narrows.
- Scroll-snap and touch scrolling give a native swipe feel on mobile without
  any custom gesture library.

## Accessibility

- A visually-hidden "Skip to content" link is the first focusable element on
  the page.
- All interactive elements (rail dots, buttons, orbital diagram points) have
  explicit `aria-label`s and visible `:focus-visible` outlines in the brand
  purple (`src/app/globals.css`).
- Motion respects `prefers-reduced-motion` (see Motion system above).
- Semantic heading order is preserved (`h1` on the hero, `h2` per chapter).

## Contact form

`Card08Contact` posts to `POST /api/contact`
(`src/app/api/contact/route.ts`), which validates the payload and currently
just logs it — **connect a real email provider (Resend, SendGrid, etc.)
before launch.** The "Book A Discovery Call" CTA links to
`brand.calendlyUrl`, and the email link uses `brand.contactEmail` (both in
`src/lib/content.ts`) — replace both with real values before launch. "Send A
Message" scrolls to and focuses the form rather than duplicating it.

## What's deliberately out of scope here

- No literal geographic map for the "Experience" chapter — an abstract
  orbital diagram (shared with the Portfolio categories) stands in for it,
  to avoid a heavy mapping dependency; swap in a real map (e.g.
  `react-simple-maps`) if that's wanted.
- No CMS — content is static/typed in `src/lib/content.ts`. Wire up a
  headless CMS if content needs to be editable outside of code.
- No analytics/consent tooling wired in yet.
