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
├── main.tsx              # Entry point — AppProvider → PaymentProvider → OracleProvider
├── index.css             # Global styles (Tailwind + custom)
├── components/           # Custom app components only (no shadcn dupes)
│   ├── ui/               # Shadcn/radix UI primitives (canonical, only location)
│   ├── TarotCard.tsx     # Renders card image with reversed support
│   ├── OracleConsole.tsx
│   ├── ReadingViewport.tsx
│   ├── SeraphinePortrait.tsx
│   └── ... (38 custom components total)
├── contexts/             # Canonical — only context directory
│   ├── AppContext.tsx     # Auth + modal state; exports useAppContext + useApp
│   ├── OracleContext.tsx  # Oracle phase/reading/explanation state
│   └── PaymentContext.tsx # Stripe subscription state; exports usePayment + usePaymentContext
├── pages/
│   ├── Index.tsx
│   ├── Oracle.tsx         # Main oracle experience
│   ├── Subscribe.tsx
│   ├── PaymentSuccess.tsx
│   ├── CardOfTheDay.tsx
│   ├── SavedReadings.tsx
│   ├── DeckMenu.tsx
│   └── NotFound.tsx
├── lib/
│   ├── supabaseClient.ts  # Supabase initialization
│   ├── tarotCards.ts      # Full 78-card tarot deck data
│   ├── seraphineDialogue.ts  # DIALOGUE_MAP, ART_SLOTS, DialogueLine types
│   ├── seraphineArt.ts    # Art slot helpers
│   ├── artRegistry.ts     # Art asset registry
│   ├── emotionToGradient.ts
│   ├── oracleState.ts
│   └── utils.ts           # cn() utility
├── hooks/
│   ├── useSeraphine.ts    # speak() → DialogueLine | null
│   ├── useSeraphineVoice.ts  # ElevenLabs + browser fallback
│   ├── useDailyCard.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── utils/
│   ├── drawCard.ts        # emits {…card, image, reversed: bool}
│   ├── drawSpread.ts
│   ├── savedReadings.ts
│   ├── speak.ts
│   ├── birthdayEngine.ts
│   └── voiceWarmup.ts
├── data/
│   ├── deckIndex.ts
│   ├── decks.ts
│   └── emotions.ts
├── services/
│   └── subscriptionService.ts
└── assets/
    └── placeholder.svg   # Only dev placeholder (no images — those live in public/)

public/
├── art/
│   ├── backgrounds/hero.jpg, oracle.jpg
│   └── seraphine/portrait.png + emotion/{serene,fierce,sorrow,ascended}.png
├── cards/
│   └── major/00-fool.png … 21-world.png
└── _redirects            # Netlify SPA routing
```

## Routing & Auth
| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page (hero.jpg background) |
| `/login` | Public | Supabase sign in / sign up |
| `/subscribe` | Public | Stripe Elements checkout ($9.99/mo) |
| `/payment-success` | Public | Post-checkout confirmation |
| `/oracle` | Auth + Subscription | Main oracle experience (oracle.jpg bg) |
| `/card-of-the-day` | Auth + Subscription | Daily card |
| `/deck` | Auth + Subscription | Deck vault |
| `/readings` | Auth + Subscription | Saved readings |
| `/account` | Auth only | Email, status, manage/logout |
| `/manage` | Auth only | Cancel/manage subscription |

- `ProtectedRoute` (`src/components/ProtectedRoute.tsx`) gates auth + subscription
- Unauthenticated → redirects to `/login`
- Authenticated but no subscription → redirects to `/subscribe`

## Import Conventions
- **All imports** use `@/` alias (never relative `../` paths)
- Shadcn UI components: `@/components/ui/<name>`
- Custom components: `@/components/<Name>`
- Contexts: `@/contexts/<Context>`
- Hooks: `@/hooks/<hook>`
- Lib: `@/lib/<module>`
- Utils: `@/utils/<util>`

## Image Path Conventions
- Card images: `/cards/major/<id>.png` (e.g. `/cards/major/00-fool.png`)
- Art assets: `/art/backgrounds/<name>.jpg`, `/art/seraphine/<name>.png`
- No `import` of image files — always bare string paths served from `public/`

## Key API Shapes
- `useSeraphine().speak()` returns `DialogueLine | null` — always use `?.text`
- `drawCard()` emits `{...card, image: string, reversed: boolean}` (30% reversed rate)
- `PaymentProvider` accepts optional `user?` prop — `main.tsx` calls it with no props

## Environment Variables Required
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anonymous key
- `VITE_STRIPE_PUBLISHABLE_KEY` — Stripe public key

## Development
```bash
npm run dev    # Starts dev server on port 5000
npm run build  # Production build to dist/ (currently: 1.33s, 63 modules)
```

## Workflow
- **Start application**: `npm run dev` on port 5000

## Deployment
- Target: Netlify (static site)
- Build command: `npm run build`
- Publish dir: `dist/`
- SPA routing: `public/_redirects` (`/* /index.html 200`)
