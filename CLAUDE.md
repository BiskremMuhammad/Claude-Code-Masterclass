# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Pocket Heist** — a Next.js starter project for a Claude Code Masterclass. A task management app themed around small office "heists" (tiny missions, big office mischief).

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run lint       # Run ESLint
npm run test       # Run all Vitest tests
npx vitest run tests/components/Navbar.test.tsx  # Run a single test file
```

## Architecture

**Framework:** Next.js 16 (App Router), React 19, TypeScript 5

**Routing — two route groups:**
- `app/(public)/` — Unauthenticated pages (home, login, signup, preview). Layout has no Navbar.
- `app/(dashboard)/` — Authenticated pages (heists list, create, detail). Layout includes Navbar.

Route groups affect layout composition only; they do not appear in URLs.

**Components** live in `/components/<ComponentName>/` following this pattern:
```
ComponentName.tsx          → Component implementation
ComponentName.module.css   → Scoped styles (CSS Modules)
index.ts                   → Barrel export
```

**Tests** mirror the component structure under `/tests/components/`.

**Styling strategy:** Tailwind CSS 4 for utilities, CSS Modules for complex scoped styles. Custom theme colors are defined in `app/globals.css` (`@theme` block): `primary` (#C27AFF), `secondary` (#FB64B6). Dark background (#030712) is the global default.

**Path alias:** Use `@/` for all imports (maps to project root, configured in `tsconfig.json`).

**Test setup:** Vitest + jsdom + `@testing-library/react`. JSDOM matchers from `@testing-library/jest-dom` are loaded via `vitest.setup.ts`. Vitest globals are enabled — no need to import `describe`/`it`/`expect`.

## Current State

The app has routing structure and placeholder UI only — no API routes, no auth logic, no database, no state management, and no form submission. The Navbar component is the only fully implemented component with tests. Future work will add these capabilities.
