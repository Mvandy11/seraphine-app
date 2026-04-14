# Seraphine Awaits — Tarot Reading Oracle

## Project Overview
A cinematic tarot reading web app featuring Seraphine Vale, a mystical oracle. Users can ask questions, draw tarot cards, and receive interpretations through an immersive, dark-themed UI.

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + Shadcn UI components
- **State**: React Context API (AppContext, OracleContext, PaymentContext)
- **Routing**: React Router DOM v6
- **Backend/Auth**: Supabase
- **Payments**: Stripe
- **Package Manager**: npm

## Project Structure
```
src/
├── App.tsx               # Root app with routing
├── main.tsx              # Entry point
├── index.css             # Global styles (Tailwind + custom)
├── components/           # UI components
│   ├── ui/               # Shadcn/radix UI primitives
│   ├── Header.tsx
│   ├── OracleConsole.tsx
│   ├── SeraphinePortrait.tsx
│   ├── TarotCard.tsx
│   └── ...
├── contexts/
│   ├── AppContext.tsx     # User auth state
│   ├── OracleContext.tsx  # Oracle phase/reading state
│   └── PaymentContext.tsx # Subscription state
├── pages/
│   ├── Oracle.tsx         # Main oracle experience
│   ├── Subscribe.tsx      # Subscription page
│   ├── ManageSubscription.tsx
│   └── NotFound.tsx
├── lib/
│   ├── supabaseClient.ts  # Supabase initialization
│   ├── tarotCards.ts      # Full 78-card tarot deck data
│   ├── utils.ts           # cn() utility
│   └── ...
└── hooks/
    ├── use-toast.ts
    └── useSeraphineVoice.ts
```

## Environment Variables Required
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anonymous key

## Development
```bash
npm run dev    # Starts dev server on port 5000
npm run build  # Production build to dist/
```

## Workflow
- **Start application**: `npm run dev` on port 5000 (webview)

## Deployment
- Type: Static site
- Build: `npm run build`
- Serve: `dist/` directory

## Notes
- The project was imported from GitHub with all source files originally in a `src/` directory structure. The vite config uses `@` as alias to `./src`.
- A placeholder is used for `seraphine.jpeg` (portrait image) — replace with actual artwork.
- Supabase credentials must be configured for auth to work.
- The root directory contains many unrelated library files from a node_modules dump that are part of the original repo commit history.
