# 2026-09-19 — fix: footer motif sat under the footer text

Reported: the `GET /v1/systems/health` panel in the footer renders underneath
the other footer text and looks bad.

Snapshots: `snapshots/2026-09-19-footer-motif-overlap/`.

## Cause

The design-system pass echoed the hero motif in the footer as a second, ghosted
copy of the response panel, absolutely positioned behind the content:

```jsx
<ResponseBlock tone="faint"
  className="... absolute -bottom-12 -right-16 ... w-[340px] rotate-2 opacity-30 lg:block" />
```

`-bottom-12 -right-16` puts it directly behind the newsletter column and the
copyright row. Lowering the opacity does not help: the panel has its own solid
background, border and a header bar with live text, so footer copy ends up
sitting on top of *other text* rather than on top of a texture.

## Fix

- `src/components/footer.tsx` — removed the `<ResponseBlock>` and the
  `overflow-hidden` that existed only to clip it. The footer keeps the
  `.motif-grid` texture, which is what the motif echo should have been all
  along: a background, not a second copy of the panel.
- `src/components/response-block.tsx` — dropped the now-unused `tone` prop and
  its `faint` branches (opacity/shadow override, animation suppression, caret
  suppression). The component is the hero's anchor and nothing else; the doc
  comment now says so, and says not to ghost it behind body copy.

Verified in the prerendered artifact and on a clean server: one panel in the
page (hero), zero in the footer, zero absolutely-positioned panels, footer grid
texture still present. `tsc` clean, build clean, lint clean for touched files.

## Note for next time

Three of this session's verification reads were wrong because a stale
`next-server` held port 3000 and served an old build. `pkill -f "next start"`
does **not** match it — the process is named `next-server`. Kill with
`pkill -9 -f next-server` (and confirm with `pgrep -fl next`) before trusting
any `curl localhost:3000` output.

## Also: dropped the footer's own texture

The contact band and the footer band are both dark and both carried `texture`.
`.motif-grid`'s mask fades from each band's own top, so the grid faded out inside
contact and then restarted at the footer's top edge — a faint repeat right at the
seam, mildly at odds with "the band itself carries the transition, no extra
dividers".

`texture` removed from the footer, so the contact+footer dark run has one
continuous grid treatment. The page now has two textured bands, stats and
contact; verified in the artifact that the footer emits no `.motif-grid` and
contact still does.
