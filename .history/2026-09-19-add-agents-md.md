# 2026-09-19 — track AGENTS.md

Committed the pre-existing untracked `AGENTS.md` at the user's request.

No snapshot directory: the file is newly tracked, so there is no pre-change
state to diff against.

## What it is

Byte-for-byte identical to `CLAUDE.md` except two lines:

```
- # CLAUDE.md                                        -> # AGENTS.md
- ...guidance to Claude Code (claude.ai/code)...      -> ...guidance to Codex (Codex.ai/code)...
```

So the repo now carries the same guidance under both conventions, for whichever
agent reads which filename.

## Known staleness (not changed — out of scope of the request)

Both files predate the design-system pass in
[2026-09-19-design-system-foundation.md](2026-09-19-design-system-foundation.md)
and so describe none of it. Their **Architecture** and **UI components** sections
in particular no longer tell the whole story:

- no mention of the band/accent/type tokens in `src/app/globals.css`
- no mention of `SectionBand`, `SectionIntro`, `Eyebrow`, `StatDisplay`,
  `ResponseBlock`
- "Add new primitives with the shadcn CLI rather than hand-rolling" now has an
  explicit exception: `Button` is deliberately reduced to two variants and must
  not be regenerated from the CLI, or the variant lock is lost
- nothing tells a future agent that `cn()` is an extended tailwind-merge and that
  new `text-*` size tokens must be registered there

Worth a follow-up docs pass across both files.
