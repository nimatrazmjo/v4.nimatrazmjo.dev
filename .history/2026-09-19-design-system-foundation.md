# 2026-09-19 — design-system foundation pass

Six foundational changes to nimat.dev, implemented as shared tokens/components
rather than per-section CSS. No copy rewritten (two exceptions noted below).

Snapshots of every pre-change file: `snapshots/2026-09-19-design-system-foundation/`.

Verified: `npx tsc --noEmit` clean · `npm run build` succeeds · `npm run lint`
clean for every touched file (7 pre-existing errors remain in `src/actions/**`,
untouched by this pass) · rendered HTML inspected for band order, button
variants, mono scope, stat markup.

---

## 1. Section color bands

New `src/components/ui/section-band.tsx`. Full-bleed `<SectionBand tone>` that
owns its own inner max-width column. `src/app/page.tsx` no longer wraps the page
in `max-w-[1180px]` — that width moved into the band, so backgrounds run edge to
edge and the band change is the only transition (no dividers, no seam shadows).

Order: navbar `base` → hero `base` → **stats `dark`** → projects `light` →
articles `base` → newsletter `light` → **contact `dark`** → **footer `dark`**
(contact and footer share one continuous dark run).

`tone="dark"` stamps `data-band="dark"`, which redefines `--band-ink`,
`--band-ink-muted`, `--band-ink-faint`, `--band-rule` and `--brand-accent-ink`
in place. Shared components therefore adapt to either tone with no per-section
overrides. A new `on-dark:` Tailwind variant (`&:is([data-band="dark"] *)`)
exposes the same thing to utility classes.

`texture` prop lays the `.motif-grid` behind a band (used on stats, contact,
footer).

## 2. Type hierarchy — monospace demoted to an accent

`src/app/layout.tsx`: Manrope → **Inter** (`--font-inter`, weights 400–800) as
`--font-sans`. IBM Plex Mono kept, now accent-only.

New display scale in `@theme` (paired size/leading/tracking/weight so headlines
are one face): `text-display-xl|lg|md|sm`, `text-stat`, `text-lead`, `text-meta`.
All headlines and body copy moved onto it; `text-[clamp(...)]` +
`font-extrabold` one-offs removed.

Monospace now appears **only** on: nav labels (navbar + footer nav headings),
eyebrow/badge text, tag pills, small meta labels (role/company, dates, source),
the `nimat.razmjo` wordmark, and button labels.

> Deliberate reading: button labels stay monospace. Requirement 6 says the
> contact submit must match the hero pills' "font treatment", and the hero pills
> were already mono — so mono is the specified CTA treatment, defined once in
> the Button component.

## 3. The teal accent has multiple jobs

One token, `--brand-accent` (`#00d4ff`), plus `--brand-accent-ink` (AA-safe on
light) and `--brand-accent-on-dark`. Exposed as `bg-brand` / `text-brand-ink`.
Jobs now filled:

1. hero "available" status dot (`.brand-dot`, with accent halo)
2. nav active + hover state (navbar and footer nav)
3. all links (`a` in base layer; hover → `--brand-accent-ink-hover`)
4. numbered eyebrow chips — `01 ·` Projects, `02 ·` Articles, `03 ·` Newsletter,
   `04 ·` Contact, reused via one `<Eyebrow index>` / `<SectionIntro>`
5. 3px accent left rule on project **and** article cards (`.brand-rule-left`,
   saturating on hover)
6. also: icon tiles, tag chips, response-block top rule and syntax keys, hero
   glow, stats-band accent bullets

`.card-hover:hover` was changed to set `border-block-color` /
`border-inline-end-color` instead of `border-color`, so it can't overwrite the
accent edge.

## 4. Stat cards replaced

New `src/components/ui/stat-display.tsx` (`StatDisplay` + `StatRow`).
`src/components/stats.tsx` no longer imports `Card` or `lucide-react`: no
border, no shadow, no per-stat fill, no icon tile. Inside the dark band the
numbers render at `text-stat` (clamp 46–68px, 0.9 leading, -0.04em) with the
label beneath in monospace caps. Separation is whitespace plus 1px vertical
rules from `StatRow` only.

The four `description` strings were dropped along with the cards — they were
card-body copy with nowhere to live in a number-plus-label display.

## 5. Hero visual anchor

New `src/components/response-block.tsx` — a live-looking `GET
/v1/systems/health` JSON response: accent rule on the top edge, status dot,
`200 OK` chip, accent-tinted keys, staged line-in animation (respects
`prefers-reduced-motion`), blinking accent caret.

Hero became a two-column grid on `lg` (text left, block right) with a
`.motif-glow` behind it; it stacks on mobile. Reused as the motif via
`tone="faint"` in the footer (clipped, low opacity) and as the `.motif-grid`
texture derived from it on all three dark bands.

## 6. CTA/button variants locked to two

`src/components/ui/button.tsx` rewritten: the variant list is now exactly
`primary` (solid pill) and `secondary` (outline pill), one shared radius
(`rounded-full`), padding and font treatment; sizes vary padding only. Both
carry their own `on-dark:` treatment. Removed: `default`, `destructive`,
`outline`, `ghost`, `link` and all icon/square sizes.

Every CTA updated to one of the two:

| Where | Before | After |
| --- | --- | --- |
| hero primary | solid pill `Read Articles →` | `primary`, arrow dropped |
| hero secondary | `variant="outline"` pill | `secondary` |
| navbar / mobile menu | ad-hoc `h-11` solid pill | `primary` `size="sm"` |
| newsletter | solid pill `Join on Substack ↗` | `primary`, arrow dropped |
| contact submit | square `rounded-[10px]` `Send Message ➤` | `primary`, full width |
| footer subscribe | 9×9 `rounded-[8px]` arrow icon button | `primary` `size="sm"` |
| articles empty state | `variant="link"` | `secondary` `size="sm"` |

> Two copy changes forced by this requirement: the footer's icon-only
> `ArrowUpRight` button had no label, so it became **"Subscribe"**; trailing
> arrow glyphs (`→ ➤ ↗`) were dropped because they were the per-CTA
> one-off treatment the requirement removes.

---

## Also changed

- **`src/lib/utils.ts`** — `cn()` now uses `extendTailwindMerge` to register the
  custom `text-display-*` / `text-stat` / `text-lead` / `text-meta` classes as
  font sizes. Without this, tailwind-merge read them as *colour* utilities and
  silently dropped the size whenever a component combined one with a text
  colour (caught in the rendered HTML: `<Eyebrow>` was losing `text-meta`).
- **`eslint.config.mjs`** — `.history/**` added to `globalIgnores`; the
  snapshots are archived copies, not live source.
- **`src/components/contact.tsx`** — while rewriting: added `htmlFor`/`id` pairs
  to the three form labels, `role="status"` on the result banner, and removed an
  unused `catch (error)` binding (the one ESLint warning in this file).
- **`src/components/footer.tsx`** — `aria-label` on the three social icon links,
  `aria-label` on the email input.
- **`src/components/navbar.tsx`** — `aria-current` on the active nav link.

## New files

```
src/components/response-block.tsx      hero/footer visual motif
src/components/ui/section-band.tsx     full-bleed colour band + width column
src/components/ui/eyebrow.tsx          eyebrow/badge + numbered accent chip
src/components/ui/section-intro.tsx    eyebrow + display headline + lead
src/components/ui/stat-display.tsx     card-less stat typography
```

## Modified files

```
eslint.config.mjs
src/app/globals.css        tokens: bands, accent, type scale, motif utilities
src/app/layout.tsx         Manrope -> Inter
src/app/page.tsx           page-level width wrapper removed
src/lib/utils.ts           tailwind-merge font-size registration
src/components/ui/button.tsx
src/components/{navbar,hero,stats,projects,articles-content,newsletter,contact,footer,calendar-button}.tsx
```

---

## Review pass (same day, before commit)

Two findings from reading the full diff back:

1. **Dropped an unrelated declaration.** The rewrite of `globals.css` lost the
   author's `font-feature-settings: "cv02", "cv03", "cv04", "cv11"` on `body`.
   Restored. Note it was inert under Manrope (no such axes) and now actually
   takes effect, since `cv*` are Inter character variants.

2. **`--band-ink-faint` on dark bands failed AA.** Measured against the compiled
   `--band-dark` (`#131e2a`): the initial `oklch(60% …)` → `#76828b` gives
   **4.28:1**, under 4.5 for the 11px mono meta labels that use it (footer
   copyright, contact field labels, article dates). Raised to `oklch(62% …)`
   → `#7c8891` = **4.65:1**, the lowest value that clears AA while keeping a
   clear step down from `--band-ink-muted` (7.33:1). Full dark-band ladder:
   ink 15.5:1 · muted 7.33:1 · faint 4.65:1 · accent 10.1:1.

   > First attempt at this overshot to 68% off a bad hand-estimate of
   > `--band-dark`'s luminance; corrected by computing oklch→sRGB→WCAG directly.

Also confirmed in the built output: `size="sm"` buttons resolve to `text-[12px]`
(base `text-[13px]` correctly overridden by tailwind-merge), all 6 buttons
`rounded-full`, only `primary`/`secondary` variants present, 4 `data-slot="stat"`
with no card markup, 1px stat dividers compiled as expected.

### Accepted, not changed

- **Hero is left-aligned on mobile** (was centred). Unavoidable consequence of
  giving the hero a side-by-side visual anchor per requirement 5; the text
  column keeps its own alignment when the grid collapses.
- **`!important` on nav/footer link colours.** Needed to beat the base-layer
  `a { color: … }` rule. Consistent with how the repo already did it
  (`!text-inherit` in the old footer); the alternative is narrowing that base
  rule, which is a wider change than this pass.
- **Light-band `--band-ink-faint`** (inherited `--text-faint`, `oklch(58%)`)
  sits at ~3.4:1 on white — below AA, but predates this pass and is used by the
  existing light-band meta text. Left as-is rather than shifting the
  established light palette; worth a follow-up.
