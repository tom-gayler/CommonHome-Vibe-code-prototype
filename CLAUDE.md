# CLAUDE.md

## Project Overview

**Common Home** — a collaborative platform for UK leaseholders navigating commonhold conversion. Features a step-by-step roadmap, neighbor engagement tools, and a Google Gemini-powered AI legal advisor.

## Tech Stack

- **React 19** with TypeScript
- **Vite 6** (dev server on port 3000)
- **Tailwind CSS** (loaded via CDN in `index.html`)
- **Recharts** for data visualization
- **Google Gemini AI** (`@google/genai`) for the AI Advisor

## Project Structure

```
/
├── components/
│   ├── AIAdvisor.tsx      # Gemini-powered chat interface
│   ├── CommunityHub.tsx   # Neighbor directory and engagement
│   ├── Dashboard.tsx      # Progress stats, charts, activity feed
│   ├── Layout.tsx         # Sidebar/header navigation wrapper
│   └── Roadmap.tsx        # 5-step commonhold conversion guide
├── App.tsx                # Root component
├── index.tsx              # React DOM entry point
├── types.ts               # Shared TypeScript types
├── vite.config.ts
└── tsconfig.json
```

## Development

```bash
npm install
# Add GEMINI_API_KEY to .env.local
npm run dev        # localhost:3000
npm run build      # production build → /dist
npm run preview    # preview production build
```

## Environment Variables

Set in `.env.local` (never commit this file):

```
GEMINI_API_KEY=your_key_here
```

Vite exposes this as `process.env.API_KEY` and `process.env.GEMINI_API_KEY` in the frontend.

## TypeScript

- Strict mode enabled
- Path alias: `@/` maps to the project root
- Target: ES2022, module resolution: bundler

## Design System

- **Font**: Outfit (Google Fonts)
- **Brand colors** (CSS variables in `index.html`):
  - Light Blue: `#75b0d3`
  - Dark Blue: `#4c6fa1`
  - Pink: `#d94e6d`
- **Border radius**: `2rem` throughout
- Tailwind utility classes for layout and spacing

## Testing

No test framework is configured. There are no test files in this project.

## Key Notes

- Tailwind is loaded from CDN — do not install it as an npm package
- The AI Advisor uses a specific system prompt in `AIAdvisor.tsx` scoped to UK commonhold legal guidance — preserve its tone and scope when modifying
- No backend; this is a fully client-side app
- Dev container is configured in `.devcontainer/` for consistent environments
