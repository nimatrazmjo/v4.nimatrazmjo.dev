# .history

Append-only change log for this repo. Every edit pass gets:

- `<date>-<slug>.md` — what changed, why, file-by-file.
- `snapshots/<date>-<slug>/` — verbatim copies of every touched file **before** the pass,
  mirroring its `src/` path, so any change is diffable/revertable without git.

Revert one file:

```
cp .history/snapshots/<date>-<slug>/src/components/hero.tsx src/components/hero.tsx
```

Diff a whole pass:

```
diff -ru .history/snapshots/<date>-<slug>/src src
```

Log entries are written at the time of the change, not reconstructed after.
