# WINS Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `03 / WINS` section between `Werk` and `WeAre` on monday.hu, rendering the collective's festival awards as two horizontally scrolling kinetic strips.

**Architecture:** New typed content file (`src/content/wins.ts`), new server component (`src/components/Wins.tsx`) with `Strip` + `Chip` subcomponents, new CSS block appended to `src/app/globals.css`. The section reuses the existing site marquee language (continuous CSS-only `translateX(-50%)` loop, same as `MarqueeTrack.tsx`). Two later sections (`WeAre`, `Word`) get their `sec__id` numeric prefix bumped.

**Tech Stack:** Next.js 15 (App Router, server components), React 18, TypeScript, plain CSS in `src/app/globals.css`. No new dependencies. No test framework in this project — verification is via `npm run typecheck`, `npm run lint`, and visual inspection in the dev server.

**Reference spec:** `docs/superpowers/specs/2026-06-10-wins-section-design.md`

---

## File map

**Create:**
- `src/content/wins.ts` — typed `Win[]` data + `winsCopy` constant
- `src/components/Wins.tsx` — `WinsSection` server component (with internal `Strip` + `Chip`)

**Modify:**
- `src/app/page.tsx` — insert `<WinsSection />` between `<WerkSection />` and `<WeAreSection />`
- `src/app/globals.css` — append a `WINS strips` CSS block + `sr-only` utility class
- `src/components/WeAre.tsx` — change `sec__id` from `03 / THE STUDIO` to `04 / THE STUDIO`
- `src/components/Word.tsx` — change `sec__id` from `04 / CONTACT` to `05 / CONTACT`

**Touch (read only, for context):**
- `src/components/Werk.tsx` — pattern reference for section scaffold
- `src/components/MarqueeTrack.tsx` — pattern reference for the duplicate-for-loop trick
- `src/components/FlippedW.tsx` — used as-is

---

### Task 1: Create the wins content file

**Files:**
- Create: `src/content/wins.ts`

- [ ] **Step 1: Write the content file**

Write `src/content/wins.ts` with the full type and data:

```ts
// Single source of truth for the WINS section.
// Editing wins = editing this file and shipping. No CMS.

export type Win = {
  id: string;
  count: number;
  title: string;
  festival: string;
  festivalFull?: string;
  tier?: 'gold' | 'silver';
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

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS — no errors. (The file is consumed in a later task; standalone it just type-checks the exports.)

- [ ] **Step 3: Commit**

```bash
git add src/content/wins.ts
git commit -m "feat(wins): add typed wins content file"
```

---

### Task 2: Build the WinsSection component (head + empty strips)

**Files:**
- Create: `src/components/Wins.tsx`

- [ ] **Step 1: Write the component**

Write `src/components/Wins.tsx`:

```tsx
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
        {/*
          The track is rendered twice so the translateX(-50%) loop has identical
          content to fall back to. The second pass is aria-hidden so screen
          readers don't double-read the awards. `display: contents` keeps the
          wrapper out of the flex layout — semantic only, no visual effect.
        */}
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

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS. The component is not yet imported on the page so there's no runtime check — only types.

- [ ] **Step 3: Commit**

```bash
git add src/components/Wins.tsx
git commit -m "feat(wins): add WinsSection component"
```

---

### Task 3: Wire WinsSection into the page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add the import**

Open `src/app/page.tsx`. In the import block at the top (currently importing `WerkSection`, `WeAreSection`, `WordSection`, etc.), add a new line directly after the `WerkSection` import:

```tsx
import { WerkSection } from '@/components/Werk';
import { WinsSection } from '@/components/Wins';
import { WeAreSection } from '@/components/WeAre';
```

- [ ] **Step 2: Render the section between Werk and WeAre**

In the JSX, locate:

```tsx
      <WorkSection />
      <WerkSection />
      <WeAreSection />
```

Change to:

```tsx
      <WorkSection />
      <WerkSection />
      <WinsSection />
      <WeAreSection />
```

- [ ] **Step 3: Typecheck and run the dev server**

Run: `npm run typecheck`
Expected: PASS.

Run: `npm run dev` (background) and open `http://localhost:3000` in a browser. Scroll past `Work` and `Werk`. You should see the new `03 / WINS` head with the section number, the flipped-W title `WINS`, and the modest note in the top right. The strips below will be **unstyled** at this point (chips render as inline list items, no marquee animation). That's expected — styling comes in Task 4.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(wins): render WinsSection between Werk and WeAre"
```

---

### Task 4: Add WINS styling to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Locate the insertion point**

Open `src/app/globals.css`. The file organizes section styles in this order: `WORK collage → WERK → WE ARE → WORD / contact`, with a single centralized `MOBILE (≤768px)` block near the end containing all responsive overrides for those sections.

For the WINS block, you'll make **two** edits:
- **(a) Desktop styles:** insert immediately before the marker comment `/* ---------- WE ARE ---------- */` (currently around line 342). This keeps the CSS block order aligned with DOM order (WORK → WERK → WINS → WE ARE → WORD).
- **(b) Mobile overrides:** add to the inside of the existing `@media (max-width: 768px) { ... }` block (currently starts at line 710), placed after the `.werk` rules and before the `.weare__intro` rules — same logical position as in DOM order.

- [ ] **Step 2a: Insert the WINS desktop block**

Insert this block immediately before the line `/* ---------- WE ARE ---------- */`:

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
/* Note: the page-wide `.page .sec { border-bottom }` rule closes the last
   strip. No per-strip bottom border or we'd get a doubled 4px line. */

.wins__track {
  display: inline-flex;
  gap: 36px;
  align-items: center;
  animation: winsScrollLeft 32s linear infinite;
  list-style: none;
}
.wins__track.rev { animation: winsScrollRight 36s linear infinite; }

@keyframes winsScrollLeft { to { transform: translateX(-50%); } }
@keyframes winsScrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }

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
```

Notes:
- Keyframe names are prefixed `wins…` to avoid any collision with the existing `@keyframes scroll` used by the MONDAY marquee. Don't change the existing `scroll` keyframe.

- [ ] **Step 2b: Insert the WINS mobile rules**

Inside the existing `@media (max-width: 768px) { ... }` block (around line 710), find the `.werk__cta .yt` rule (the last `.werk*` rule before `.weare__intro`). Insert these lines on a new line immediately after it, before `.weare__intro`:

```css
  .wins__strip { padding-block: 8px; }
  .wins__chip { font-size: 30px; gap: 10px; }
  .wins__count { font-size: 16px; }
  .wins__fest { font-size: 11px; }
```

(Two-space indent to match the rest of the mobile block.)

- [ ] **Step 3: Verify in the browser**

The dev server from Task 3 should still be running. Reload `http://localhost:3000` and scroll to the WINS section. You should see:
- The top strip (paper background) scrolling left, containing the five `count >= 2` chips
- The bottom strip (ink background, paper text) scrolling right, containing the three `count == 1` chips
- Each chip shows `count×`, the title (with `· Gold` / `· Silver` where present), and `· festival`
- A small dot separates chips
- The section is roughly half the height of the Hero

Resize the browser to ~400px wide. Confirm:
- Section title drops to 64px (via the existing `.sec__title` media query)
- Chip TITLE drops to 30px
- Strips remain readable, just shorter

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(wins): style strips, chips, and add sr-only utility"
```

---

### Task 5: Renumber the WeAre and Word section IDs

**Files:**
- Modify: `src/components/WeAre.tsx`
- Modify: `src/components/Word.tsx`

- [ ] **Step 1: Update WeAre**

Open `src/components/WeAre.tsx`. Locate the line:

```tsx
          <div className="sec__id mono">03 / THE STUDIO</div>
```

Change to:

```tsx
          <div className="sec__id mono">04 / THE STUDIO</div>
```

- [ ] **Step 2: Update Word**

Open `src/components/Word.tsx`. Locate the line:

```tsx
      <div className="sec__id mono" style={{ marginBottom: 8 }}>04 / CONTACT</div>
```

Change to:

```tsx
      <div className="sec__id mono" style={{ marginBottom: 8 }}>05 / CONTACT</div>
```

- [ ] **Step 3: Verify in the browser**

Reload `http://localhost:3000`. Scroll through the page top to bottom and confirm the section number sequence reads:
- 01 / MUSIC VIDEOS
- 02 / BTS
- 03 / WINS
- 04 / THE STUDIO
- 05 / CONTACT

- [ ] **Step 4: Commit**

```bash
git add src/components/WeAre.tsx src/components/Word.tsx
git commit -m "feat(wins): renumber WeAre to 04 and Word to 05"
```

---

### Task 6: Accessibility + reduced-motion verification

**Files:** (no edits — verification only)

- [ ] **Step 1: Confirm prefers-reduced-motion freezes the strips**

In Chrome/Safari DevTools, open the Rendering panel and set **Emulate CSS prefers-reduced-motion** → **reduce**. Reload the page and scroll to WINS. Both strips should be **static** — no scrolling animation. The first set of chips should remain visible (overflow hidden hides the rest).

Reset the emulation to **no preference** when done.

- [ ] **Step 2: Confirm the chips read correctly to a screen reader**

Open Chrome DevTools → Lighthouse → Accessibility audit on the page (or use VoiceOver on macOS: ⌘F5, navigate to WINS). Each chip should read as a single list item, roughly: "3 wins: Best Music Video, · HMVF" — with each award read **once**, not twice. The duplicate set should not be announced (it's wrapped in `aria-hidden`).

If you hear awards being announced twice, confirm the `<span aria-hidden="true" style={{ display: 'contents' }}>` wrapper is present in `Strip` and that the second `items.map(...)` is inside it.

- [ ] **Step 3: Confirm tooltips on hover**

Hover over a chip whose `festivalFull` differs from `festival` (e.g., the `HMVF` chips, which have full name "Hungarian Music Video Festival"). The browser's native tooltip should show the full name after the standard hover delay.

- [ ] **Step 4: No commit**

This task is verification only. If issues are found, file a fix as an addendum task and address before moving on.

---

### Task 7: Final sweep + cleanup

**Files:** (no edits — final verification)

- [ ] **Step 1: Typecheck and lint**

Run:
```bash
npm run typecheck
npm run lint
```
Expected: both PASS with no errors or new warnings.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: PASS. The build artifact should include the WINS section in the prerendered page output.

- [ ] **Step 3: Visual full-page sanity check**

Reload `http://localhost:3000` one final time. Scroll the entire page slowly. Confirm:

- No layout shift on initial paint
- The two strips loop smoothly (no visible "jump" at the end of each cycle)
- The strip directions are opposite (top: left, bottom: right)
- Section borders all read as crisp 2px lines (no doubled lines anywhere around WINS)
- The `FlippedW` glyph in the WINS title rolls 360° when hovering anywhere in the section (this is the existing `.sec:hover .sec__title .flipM` behaviour)
- The note copy "Some festivals were kind to us. / Mostly thanks to the artists we worked with." displays right-aligned in the top right of the section head

- [ ] **Step 4: Compare with the spec acceptance criteria**

Open `docs/superpowers/specs/2026-06-10-wins-section-design.md` and walk through the **Acceptance criteria** numbered list at the bottom. Tick each one mentally against the running page.

- [ ] **Step 5: Stop the dev server**

If `npm run dev` is still running in a background slot, stop it.

- [ ] **Step 6: No additional commit**

All work is already committed across Tasks 1-5. This task is final verification only.

---

## Done

The WINS section is shipped. The user can later edit `src/content/wins.ts` to add or correct awards. If they want festival year ranges, hover tooltips, video links, or JSON-LD structured data, those are deliberately out of scope for v1 and would extend this section in a follow-up plan.
