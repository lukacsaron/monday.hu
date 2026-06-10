# WINS section — design spec

**Date:** 2026-06-10
**Status:** Approved for implementation
**Scope:** Add a new `WINS` section to monday.hu listing the collective's festival awards.

---

## Goal

A new section between `Werk` (BTS) and `WeAre` (the studio) that lists the collective's festival awards as a typographic kinetic display. Restrained in vertical weight, modest in tone, but unmistakably present — the awards march across the page in two scrolling strips, reusing the site's existing marquee language.

The section is a **pure trophy wall** — no per-award video links, no drill-down, no detail pages. Editing wins means editing one TypeScript content file and shipping.

## Section numbering ripple

The site currently runs `01 / Work → 02 / Werk → 03 / WeAre → 04 / Word`. Inserting WINS at position 03 shifts the two later sections by one:

| Section | Before | After |
|--------|--------|-------|
| Work    | 01 / MUSIC VIDEOS  | 01 / MUSIC VIDEOS  |
| Werk    | 02 / BTS           | 02 / BTS           |
| **Wins**| —                  | **03 / WINS**      |
| WeAre   | 03 / THE STUDIO    | 04 / THE STUDIO    |
| Word    | 04 / CONTACT       | 05 / CONTACT       |

Anchor IDs stay stable (`#work`, `#werk`, `#weare`, `#word`); only the prefix number changes. The new section gets `#wins`. `navItems` in `src/content/site.ts` does not need to grow — WINS is not added to the floating menu unless the user later asks for it.

## File layout

Mirrors the existing pattern (`Werk.tsx` + `werks.ts`, `Work.tsx` + `works.ts`):

- `src/content/wins.ts` — typed data file. Exports `wins: Win[]` and `winsCopy`.
- `src/components/Wins.tsx` — server component exporting `WinsSection`. Same `sec / sec__head / sec__id / sec__title / sec__note` scaffold as `Werk.tsx`. Uses `<FlippedW />` for the W.
- `src/app/globals.css` — append a `/* ---------- WINS strips ---------- */` block after the existing marquee section. No CSS modules; matches the site's single-stylesheet pattern.
- `src/app/page.tsx` — insert `<WinsSection />` between `<WerkSection />` and `<WeAreSection />`.
- Two existing components (`WeAre.tsx`, `Word.tsx`) update their `sec__id` strings to the new numbers. No other changes.

## Data model

```ts
// src/content/wins.ts

export type Win = {
  id: string;                  // 'best-music-video-hmvf' — stable React key
  count: number;               // 1, 2, or 3 — number of times won
  title: string;               // 'Best Music Video'
  festival: string;            // short display label, e.g. 'HMVF', 'LONDON'
  festivalFull?: string;       // long-form name for accessibility/title attr
  tier?: 'gold' | 'silver';    // present only when relevant (cinematography)
};

export const wins: Win[] = [
  { id: 'best-music-video-hmvf', count: 3, title: 'Best Music Video',           festival: 'HMVF', festivalFull: 'Hungarian Music Video Festival' },
  { id: 'best-director-hmvf',    count: 3, title: 'Best Director',              festival: 'HMVF', festivalFull: 'Hungarian Music Video Festival' },
  { id: 'best-cine-gold-hmvf',   count: 2, title: 'Best Cinematography',        festival: 'HMVF', festivalFull: 'Hungarian Music Video Festival', tier: 'gold' },
  { id: 'best-cine-silver-hmvf', count: 2, title: 'Best Cinematography',        festival: 'HMVF', festivalFull: 'Hungarian Music Video Festival', tier: 'silver' },
  { id: 'best-image-video-hmvf', count: 2, title: 'Best Image Video',           festival: 'HMVF', festivalFull: 'Hungarian Music Video Festival' },
  { id: 'best-mv-cine-zsigmond', count: 1, title: 'Best MV Cinematography',     festival: 'ZSIGMOND VILMOS FF', festivalFull: 'Zsigmond Vilmos Film Festival' },
  // TODO(content): confirm full list of international wins
  { id: 'best-mv-london',        count: 1, title: 'Best Music Video',           festival: 'LONDON' },
  { id: 'best-mv-kosice',        count: 1, title: 'Best Music Video',           festival: 'KOSICE' },
];

export const winsCopy = {
  note: `Some festivals were kind to us.\nMostly thanks to the artists we worked with.`,
};
```

**Chip display formula:**
- Lead: `count× ` (Space Mono, smaller, opacity .55)
- Title: `title` + (`· Gold` | `· Silver`) if `tier` is set
- Trail: `· festival` (Space Mono, smaller)

`festivalFull` is used in the `title` attribute on each chip (or `aria-label`) so the long name is available without crowding the visible chip.

## Component shape

```tsx
// src/components/Wins.tsx
import { FlippedW } from './FlippedW';
import { wins, winsCopy, type Win } from '@/content/wins';

function partitionByCount(items: Win[]): { multi: Win[]; single: Win[] } {
  return {
    multi: items.filter((w) => w.count >= 2),
    single: items.filter((w) => w.count === 1),
  };
}

function Chip({ w }: { w: Win }) {
  const tierSuffix = w.tier ? ` · ${w.tier === 'gold' ? 'Gold' : 'Silver'}` : '';
  return (
    <li className="wins__chip" title={w.festivalFull ?? w.festival}>
      <span className="wins__count mono" aria-hidden="true">{w.count}×</span>
      <span className="sr-only">{w.count} wins:</span>
      <span className="wins__title">{w.title}{tierSuffix}</span>
      <span className="wins__fest mono">· {w.festival}</span>
      <span className="wins__dot" aria-hidden="true" />
    </li>
  );
}

function Strip({ items, inverted, reverse }: { items: Win[]; inverted?: boolean; reverse?: boolean }) {
  if (items.length === 0) return null;
  return (
    <div className={`wins__strip ${inverted ? 'inv' : ''}`}>
      <ul className={`wins__track ${reverse ? 'rev' : ''}`}>
        {items.map((w) => <Chip key={w.id} w={w} />)}
        <span aria-hidden="true" style={{ display: 'contents' }}>
          {items.map((w) => <Chip key={`${w.id}-dup`} w={w} />)}
        </span>
      </ul>
    </div>
  );
}

export function WinsSection() {
  const { multi, single } = partitionByCount(wins);
  return (
    <section className="sec wins" id="wins" aria-labelledby="wins-title">
      <div className="sec__head">
        <div>
          <div className="sec__id mono">03 / WINS</div>
          <h2 className="sec__title" id="wins-title">
            <FlippedW />INS
          </h2>
        </div>
        <p className="sec__note">{winsCopy.note}</p>
      </div>
      <Strip items={multi} />
      <Strip items={single} inverted reverse />
    </section>
  );
}
```

Notes:
- The `<FlippedW />` motif matches the other sections (the M flips to read as W, then rolls on hover).
- Duplicated chips on the second loop carry the `-dup` key suffix and are visually identical but `aria-hidden="true"` is applied at the **track** level via CSS — see styling below.
- A `.sr-only` utility class will be added to `globals.css` if it doesn't already exist (standard visually-hidden pattern).

## Styling

Append to `src/app/globals.css`:

```css
/* ---------- WINS strips ---------- */
.wins__strip {
  overflow: hidden;
  white-space: nowrap;
  border-top: 2px solid var(--line);
  padding-block: 12px;
  position: relative;
}
.wins__strip.inv { background: var(--ink); color: var(--paper); }
/* Note: the section's own .page .sec { border-bottom } closes the last strip.
   No per-strip bottom border or we'd get a doubled 4px line. */

.wins__track {
  display: inline-flex;
  gap: 36px;
  align-items: center;
  animation: scrollLeft 32s linear infinite;
  list-style: none;
}
.wins__track.rev { animation: scrollRight 36s linear infinite; }

@keyframes scrollLeft { to { transform: translateX(-50%); } }
@keyframes scrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }

.wins__chip {
  display: inline-flex;
  align-items: baseline;
  gap: 14px;
  font-weight: 900;
  font-size: 48px;
  line-height: 1;
  letter-spacing: -.03em;
  text-transform: uppercase;
}
.wins__count {
  font-weight: 700;
  font-size: 22px;
  opacity: .55;
  transform: translateY(-4px);
}
.wins__fest {
  font-weight: 400;
  font-size: 14px;
  opacity: .55;
  letter-spacing: .06em;
  transform: translateY(-10px);
}
.wins__dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: currentColor;
  opacity: .35;
  transform: translateY(-12px);
  margin-inline: 8px;
}

.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

/* Mobile */
@media (max-width: 768px) {
  .wins__strip { padding-block: 8px; }
  .wins__chip { font-size: 30px; gap: 10px; }
  .wins__count { font-size: 16px; }
  .wins__fest { font-size: 11px; }
}
```

The existing global `@media (prefers-reduced-motion: reduce)` rule already kills the marquee animation — no extra rule needed.

## Motion behaviour

- Both strips scroll continuously. Strip 1 left-to-right, Strip 2 right-to-left.
- No pause on hover. Matches the existing top-bar and footer-band `MONDAY` marquees.
- Duration ~32s (Strip 1) and ~36s (Strip 2). Slight desync prevents visual lock-step.
- Content duplication uses the same pattern as `MarqueeTrack.tsx`: render the chip list twice in one inline-flex container, animate `translateX(-50%)`, infinite loop.
- `prefers-reduced-motion: reduce` → animation freezes. List is still readable as a static row (overflow hidden, but the first chip-set is visible).

## Accessibility

- Section landmark with `aria-labelledby` pointing at the `<h2>`.
- Chip list is a semantic `<ul>` with `<li>` chips per strip.
- Visual duplication for the loop: the duplicate `<Chip>` set is wrapped in `<span aria-hidden="true" style={{ display: 'contents' }}>` so screen readers read each award once. `display: contents` keeps the wrapper out of the flex layout so the wrap is purely semantic, not visual.
- `count×` is rendered visibly as `3×` but with an `sr-only` "3 wins:" prefix so the natural reading is "3 wins: Best Music Video, HMVF."
- `festivalFull` is exposed via the `title` attribute on each chip for hover tooltips (sighted) and as a fallback for assistive tech that prefers `title`.

## Mobile behaviour

- Section title `.sec__title` already drops to 64px under the existing media query — no change needed.
- Strip type drops to 30px chip / 16px count / 11px festival.
- Strip vertical padding drops to 8px → each strip ~52px tall.
- Total section height on mobile: ~210–240px (head + 2 strips).

## Edge cases & non-goals

**Edge cases (handled):**
- Empty bucket → `Strip` returns `null`; no empty band rendered.
- Single chip in a bucket → duplicated-list trick still produces a continuous scroll.
- Pathologically long title → `white-space: nowrap` + `overflow: hidden` on strip; no clipping artifacts, just pushes neighbours along.
- `wins` empty array → both strips return `null`; section head still renders. (Could `return null` from `WinsSection` entirely; defer that decision to implementation since it won't happen in practice.)

**Out of scope for v1 (explicit):**
- No CMS. Editing wins = editing `wins.ts`.
- No per-award video links, no detail pages.
- No animated count-up on `count×`. Static text.
- No SEO JSON-LD (`Award` / `CreativeWork`). Can be added later if needed.
- No addition to the `FloatingMenu` nav. Section is reachable by scroll only, unless user later asks.
- No pause-on-hover. Matches existing marquee behaviour.

**Open content TODO:**
- The international wins beyond London and Kosice are placeholder. The content file ships with a `// TODO(content)` comment; the user fills the remaining festivals before launch.

## Acceptance criteria

1. New `WINS` section appears between `Werk` and `WeAre`, labelled `03 / WINS`, with the `FlippedW` glyph in the title.
2. The section note reads: "Some festivals were kind to us.\nMostly thanks to the artists we worked with." in the top-right `sec__note` slot.
3. Two horizontal strips render below the head; top one paper, bottom one ink. Both scroll continuously in opposite directions, looping seamlessly.
4. Strip 1 contains the four HMVF multi-wins (Best Music Video ×3, Best Director ×3, Best Cinematographer Gold ×2, Best Image Video ×2); Strip 2 contains the Zsigmond Vilmos cinematography win, the Europe Music Video Awards win, and the three Berlin Music Video Award entries (one win + two nominations).
5. Each chip shows `count×`, the award title (with `· Gold` / `· Silver` suffix where applicable), and `· festival` annotation.
6. Section title at 150px on desktop, 64px on mobile. Chip title 48px desktop / 30px mobile.
7. Section IDs `04 / THE STUDIO` and `05 / CONTACT` are updated in `WeAre.tsx` and `Word.tsx` respectively.
8. With `prefers-reduced-motion: reduce`, both strips render static — no animation.
9. Page passes `npm run typecheck` and `npm run lint`.
