# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint (flat config, next/core-web-vitals + next/typescript)

No test suite exists in this repo.

## Architecture

Next.js 16 App Router portfolio site, single page (`src/app/page.tsx`) composed of section
components rendered in order: Navbar, Hero, Stats, ArticlesContent, Newsletter, Contact, Footer.

**Articles aggregation** (`src/actions/articles/`): `articles.ts` is the entry point
(`fetchAllBlogs`) — it fetches from three sources in parallel (Substack, Hashnode, Medium via
their respective files in this dir), normalizes each into the shared `ArticleType`
(`src/types/article.type.ts`), merges, sorts by date descending, and paginates. Each source fetch
is individually caught so one failing source doesn't break the others. All action files use
`"use server"` and `unstable_noStore()` to opt out of caching.

**Contact form** (`src/actions/contact.ts`): sends email via `nodemailer` using Gmail SMTP.
Requires `GMAIL_USER` and `GMAIL_APP_PASSWORD` env vars (`.env`).

**Config** (`src/config/index.ts`): small shared constants (e.g. `PER_PAGE`) — check here before
hardcoding values used across the articles pipeline.

**UI components** (`src/components/ui/`): shadcn/ui primitives (`components.json`, style
"new-york", base color neutral). Add new primitives with the shadcn CLI rather than hand-rolling.

**Path alias**: `@/*` → `src/*`.

**Styling**: Tailwind CSS 4, dark mode via `next-themes` (`ThemeProvider` in
`src/components/theme-provider.tsx`, default theme is dark). `cn()` helper in `src/lib/utils.ts`
merges class names (clsx + tailwind-merge).

**URL state**: `nuqs` (`NuqsAdapter` wraps the app in `src/app/layout.tsx`) for search-param-backed
UI state (e.g. articles pagination/filtering).
