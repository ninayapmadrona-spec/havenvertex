# Haven Vertex

**People | Systems | Possibilities.**

A premium, card-based digital-growth-partner website for Haven Vertex, built
with Next.js (App Router), Tailwind CSS, and Framer Motion. There is no
traditional top navigation — the entire homepage is a single scroll-snapped
sequence of seven full-viewport "chapter" cards, navigated by scrolling,
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

The winged purple logo shown in the brand references is **not included** in
this repo (only rendered as a screenshot, not an exportable file). Drop the
official file in as:

```
public/brand/logo.png
```

`src/components/ui/Logo.tsx` picks it up automatically everywhere the mark
appears (side rail, hero, footer chapter). Until that file exists, the site
shows a lightweight placeholder wing glyph so nothing renders broken — that
placeholder is scaffolding only, never a redesign of the real logo.

The same applies to real photography (the "two hands reaching" hero art,
client headshots, portfolio screenshots): those are currently built from
CSS/SVG gradients and abstract mockup frames as brand-safe stand-ins. Swap
them for real assets in `src/components/cards/*` and `public/` when
available.

## UX architecture

The homepage (`src/app/page.tsx`) renders seven chapters inside a single
`<CardExperience>` shell:

| # | Chapter | Component | Purpose |
|---|---------|-----------|---------|
| 01 | Welcome | `Card01Welcome` | Hero, brand tagline, "Enter Our Vertex" CTA |
| 02 | Meet Nina | `Card02MeetNina` | Founder story, credibility pills |
| 03 | Services | `Card03Services` | 6 interactive service tiles |
| 04 | Experience | `Card04Experience` | Stats + interactive industries diagram |
| 05 | Portfolio | `Card05Portfolio` | Case study tiles by industry |
| 06 | Success Stories | `Card06Stories` | Testimonials + trust signals |
| 07 | Let's Build Together | `Card07Contact` | Discovery-call CTA + contact form |

### Navigation model

There is deliberately no `<nav>` bar. Instead:

- **`SideRail`** (`src/components/layout/SideRail.tsx`) — a fixed, floating
  pill on the left edge (desktop) with one dot per chapter, an active-state
  ring, and a hover tooltip naming the chapter. Clicking a dot smooth-scrolls
  to that chapter.
- **`MobileDock`** (`src/components/layout/MobileDock.tsx`) — the same
  concept collapsed into a bottom dock on small screens.
- **`CardExperience`** (`src/components/layout/CardExperience.tsx`) — the
  scroll container (`scroll-snap-type: y mandatory`) plus an
  `IntersectionObserver` (`useActiveSection` hook) that tracks which chapter
  is dominant in the viewport and keeps the rail in sync, whether the user
  scrolled, clicked, or swiped.

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

## Component library

```
src/components/
├── layout/
│   ├── CardExperience.tsx   # scroll-snap shell + active-chapter tracking
│   ├── ChapterSection.tsx   # shared full-viewport chapter wrapper + reveal motion
│   ├── SideRail.tsx         # desktop floating dot navigation
│   └── MobileDock.tsx       # mobile bottom dot navigation
├── decor/
│   └── AuroraBackground.tsx # ambient purple wave/blob field
├── ui/
│   ├── Logo.tsx              # LogoMark (brand asset + fallback) + Wordmark
│   ├── Button.tsx            # pill CTA button (solid/ghost)
│   ├── TiltCard.tsx          # cursor-tilt glass tile + spotlight
│   ├── SectionKicker.tsx     # small uppercase kicker + ChapterTag badge
│   └── StatBlock.tsx         # animated stat number + label
└── cards/
    ├── Card01Welcome.tsx
    ├── Card02MeetNina.tsx
    ├── Card03Services.tsx
    ├── Card04Experience.tsx
    ├── Card05Portfolio.tsx
    ├── Card06Stories.tsx
    ├── Card07Contact.tsx
    └── ContactForm.tsx       # client form → /api/contact
```

Copy and structured content (services, stats, testimonials, portfolio items)
live in one place: `src/lib/content.ts`. Edit that file to update site copy
without touching component markup.

## Responsive behavior

- **Desktop-first**, per the brief: chapters are designed at `lg`/`xl` widths
  first, then constrained down.
- The side rail hides below `md`; the `MobileDock` bottom bar takes over.
- Grids collapse: services 3→2→1 columns, portfolio 2→1, testimonials 3→1,
  as the viewport narrows.
- Scroll-snap and touch scrolling give a native swipe feel on mobile without
  any custom gesture library.

## Contact form

`Card07Contact` posts to `POST /api/contact`
(`src/app/api/contact/route.ts`), which validates the payload and currently
just logs it — **connect a real email provider (Resend, SendGrid, etc.)
before launch.** The "Book a Discovery Call" CTA links to
`brand.calendlyUrl` in `src/lib/content.ts`; replace with the real Calendly
(or booking tool) URL before launch.

## What's deliberately out of scope here

- No literal geographic map for the "Experience" chapter — an abstract
  orbital diagram of industries stands in for it, to avoid a heavy mapping
  dependency; swap in a real map (e.g. `react-simple-maps`) if that's wanted.
- No CMS — content is static/typed in `src/lib/content.ts`. Wire up a
  headless CMS if content needs to be editable outside of code.
- No analytics/consent tooling wired in yet.
