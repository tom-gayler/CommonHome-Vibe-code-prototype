# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production build → /dist
npm run preview  # serve the production build locally
```

No test framework is configured.

## Environment

Create `.env.local` with:
```
GEMINI_API_KEY=your_key_here
```

`vite.config.ts` injects this as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` at build time via `define`. The app reads `process.env.API_KEY` in `AIAdvisor.tsx`.

## Architecture

This is a **fully client-side, single-page React app** with no backend. All state lives in `App.tsx` and is passed down as props — there is no global state library.

**Navigation** is tab-based (`'dashboard' | 'roadmap' | 'community' | 'advisor'`), managed by `activeTab` state in `App.tsx`. `Layout.tsx` renders the sidebar/header and receives `setActiveTab` to drive navigation.

**Data** is entirely hardcoded mock data defined in `App.tsx` (`MOCK_NEIGHBORS`, `buildingFacts`). The `Neighbor[]` array is the only mutable state — `CommunityHub` receives `setNeighbors` to update it. There is no API, database, or persistence layer.

**AI integration** (`AIAdvisor.tsx`) instantiates `GoogleGenAI` directly on each message send (no singleton). It uses model `gemini-3-flash-preview` with a hardcoded system prompt scoped to UK commonhold legal guidance. The conversation history is maintained in local component state and passed as `contents` on every request.

**Styling** uses Tailwind CSS loaded from CDN in `index.html` — do not add it as an npm dependency. Brand CSS variables (`--color-brand-*`) and the `bg-brand-gradient` utility are defined in a `<style>` block in `index.html`, not in any config file. The `@/` path alias resolves to the repo root.

**Types** in `types.ts` are the source of truth for data shapes (`Neighbor`, `RoadmapStep`, `BuildingStats`, `BuildingFacts`, `ProjectStatus`).
