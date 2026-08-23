# Flick — landing page

Marketing site for Flick, a dollar card product, Nigeria first: fund a wallet in
Naira (or in USDC, if you already hold it), get a Visa card that works at any
online checkout in the world.

Built with Next.js 16 (App Router, Turbopack) and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | What it does                                    |
| --------------- | ----------------------------------------------- |
| `npm run dev`   | Dev server with Fast Refresh                    |
| `npm run build` | Production build                                |
| `npm run start` | Serve the production build                      |
| `npm run lint`  | ESLint (`next lint` was removed in Next.js 16)  |

## Where things live

```
app/
  globals.css        Design tokens as a Tailwind @theme, plus page-level base CSS
  fonts.ts           next/font declarations for the three families
  fonts/             Self-hosted Satoshi woff2 files
  layout.tsx         Root layout: fonts, metadata, viewport
  page.tsx           Composes the sections in order
  actions.ts         joinWaitlist Server Action
components/
  ui/                Design-system primitives (Button, Surface, DataTable, …)
  sections/          One component per band of the page
  effects/           Pointer engine, parallax tilt, custom cursor, 3D card
lib/
  content.ts         All copy and data for the page
  waitlist.ts        Waitlist form state and email pattern
  cn.ts              Conditional class-list joiner
```

Components are Server Components by default. `'use client'` appears only where
interaction actually lives: `EmailCapture`, `Tabs`, `PersonaSwitcher`,
`CustomCursor`, `Tilt` and `FlickCard3D`.

## Design source

The page implements `LandingPage.dc.html` from a
[Claude Design](https://claude.ai/design/p/3b19b403-7963-467d-90ac-2ae9d4e21b2b)
project. That project — not this repo — is the source of truth for tokens, copy
and brand rules. Read it with the `claude_design` MCP before changing values
here.

Its design system (`_ds/flick-design-system-…/`) ships `readme.md` with the
brand rules, `tokens/*.css` with the values, and `_ds_bundle.js` with the
component implementations.

### Rules that are easy to break by accident

- Green never exceeds **5% of a viewport** and never sets body text.
- **Pure white is never used.** Text is warm bone (`#F4F1EA`).
- Signal red is the declined-card moment, **once per page**.
- **Surfaces carry no shadow.** Depth is stacked ink plus a hairline. The only
  drop shadow in the system belongs to the card object.
- No icon library, no emoji, no padlock trust imagery, no photography.
- Sentence case everywhere except mono eyebrows and table headers.
- Numbers persuade, adjectives don't: write `0.80%`, not "incredibly low fees".

## Styling

All styling is Tailwind utilities. There are no CSS Modules; `app/globals.css`
is the only stylesheet.

Design tokens live in an `@theme` block, so every value is reachable as a
utility:

| Token                 | Utility            |
| --------------------- | ------------------ |
| `--color-ink-800`     | `bg-ink-800`       |
| `--color-bone-300`    | `text-bone-300`    |
| `--text-display-xl`   | `text-display-xl`  |
| `--shadow-card`       | `shadow-card`      |
| `--tracking-eyebrow`  | `tracking-eyebrow` |
| `--container-measure` | `max-w-measure`    |

The design system's 4px base unit lines up exactly with Tailwind's default
spacing scale, so `--s-6` (24px) is simply `p-6` — no spacing overrides.

Display type sizes carry their own leading and tracking via Tailwind's
`--text-*--line-height` / `--text-*--letter-spacing` modifiers, so
`text-display-xl` is complete on its own.

Only three things stay outside utilities, all in `app/globals.css`:

- `@layer base` — the grain overlay, focus ring, link colour, smooth scroll,
  and the global `prefers-reduced-motion` collapse.
- `@utility bg-card-object` — the system's single gradient.
- The page-load keyframes (`flick-rise`, `flick-settle`), exposed as
  `animate-rise-0` … `animate-rise-4`, `animate-settle` and `animate-reveal`.
  The stagger is baked into each animation so components never need a separate
  `animation-delay` utility.

## Typography

All three families are self-hosted through `next/font`, so no request leaves the
deployment at runtime.

| Family           | Role                                          | Source        |
| ---------------- | --------------------------------------------- | ------------- |
| Instrument Serif | Emotional statements. Never bold, never <24px | Google Fonts  |
| Satoshi          | Everything functional (400/500/700/900)       | `app/fonts/`  |
| Martian Mono     | Every number a user might check, `tabular-nums` | Google Fonts |

`fonts.ts` exposes each as a CSS variable that `globals.css` folds into
`--font-display` / `--font-body` / `--font-mono`. **Nothing else should
reference a family by name** — `next/font` renames them at build time.

That last point matters for the 3D card: `components/effects/card-face.ts`
paints the card artwork onto a canvas, and a hardcoded `'Instrument Serif'`
there would silently fall back to Georgia. It reads the resolved family names
back out of the tokens and waits for them to load before painting.

## Motion

One orchestrated page-load, not scattered micro-interactions. 160ms hovers,
280ms tab switches, 600ms section entrances, 900ms hero settle. No spring, no
bounce, no elastic, no scroll parallax.

`components/effects/pointer-engine.ts` runs **one** pointer listener and **one**
`requestAnimationFrame` loop for the whole page. The custom cursor, every
tilting panel and the 3D card subscribe to it rather than each running a loop
and measuring the DOM on every pointer move.

Reduced motion is honoured globally: animation and transition durations collapse
to 1ms, and the engine holds parallax at zero.

## The card object

`components/effects/FlickCard3D.tsx` renders the card as anodised hardware —
`MeshPhysicalMaterial`, roughness 0.35, metalness 0.90, clearcoat 0.30, a green
rim light on the right edge, and a `RoomEnvironment` HDRI.

- `three` is behind a dynamic import, so it never lands in the initial bundle.
- A static CSS card paints first and remains if WebGL is unavailable.
- Geometries, materials, textures and the renderer are disposed on unmount.
- The stage is a real `<button>`, so the card flips from the keyboard too.

## Waitlist form

`app/actions.ts` holds a `joinWaitlist` Server Action; `EmailCapture` drives it
with `useActionState` and `useFormStatus` for its pending, error and joined
states. Validation runs on the server, so it cannot be skipped from the client.

**No store is wired up yet.** The action validates the address and logs it —
swap the `console.info` for the real write and the rest of the flow is unchanged.

## Accessibility notes

- The persona fork is a real tablist with arrow-key, `Home` and `End` navigation.
- The fee table uses row and column headers plus a screen-reader caption.
- The 3D card is keyboard-operable and labelled.
- The design specifies `cursor: none` page-wide. `CustomCursor` applies it only
  once it has mounted a replacement on a fine pointer, so touch devices and
  visitors without JavaScript always keep a cursor.
- Below 1024px the header's nav links are hidden (wordmark and CTA remain). All
  five links are repeated in the footer and the page is a single scroll. The
  design system defines no mobile menu component, and its readme says to ask
  before adding one.

## Working on this with an agent

`AGENTS.md` is generated by `next dev` and points at the version-matched docs in
`node_modules/next/dist/docs/`. Read the relevant guide there before writing
code — this Next.js version has breaking changes against most training data.
