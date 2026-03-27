# System Patterns: SARAPSCAN

## Architecture Overview

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout + SARAPSCAN metadata
│   ├── page.tsx                  # Main app shell (client component)
│   ├── globals.css               # Filipino kitchen theme
│   └── api/                      # API routes for AI
│       ├── generate/route.ts     # Text generation endpoint
│       ├── vision/route.ts       # Image analysis endpoint
│       └── chat/route.ts         # Chat endpoint
├── components/
│   ├── Icons.tsx                 # SVG icon components
│   ├── BottomNav.tsx             # Tab bar navigation
│   ├── Onboarding.tsx            # Swipe onboarding
│   ├── ImageChecker.tsx          # Feature 1: Authenticity checker
│   ├── RecipeGenerator.tsx       # Feature 2: Ingredient recipes
│   ├── RandomUlam.tsx            # Feature 3: Random ulam
│   ├── RescueMission.tsx         # Feature 4: Cooking rescue
│   └── AskManang.tsx             # Feature 5: Chat assistant
└── lib/
    ├── types.ts                  # TypeScript interfaces
    ├── ai.ts                     # Client-side AI call helpers
    └── storage.ts                # LocalStorage helpers
```

## Key Design Patterns

### 1. Client-Side Tab Navigation

The app uses a single page (`page.tsx`) with client-side tab routing:
- State-based screen switching (no URL changes)
- Bottom navigation bar with 5 tabs
- Each feature is a separate component

### 2. AI Integration Pattern

Three-tier architecture:
1. **Client components** call helper functions from `lib/ai.ts`
2. **`lib/ai.ts`** makes fetch calls to Next.js API routes
3. **API routes** use OpenAI SDK to call the AI model

This keeps the API key server-side while giving client components a clean interface.

### 3. Feature Component Pattern

Each feature follows the same structure:
- State for input, result, loading, error
- Form UI with inputs/dropdowns
- Submit button that calls `callTextAI()` or `callVisionAI()`
- Result card with favorite toggle
- Consistent loading spinner and error display

### 4. Favorites System

- Uses `localStorage` via `lib/storage.ts`
- Each saved recipe has: id, title, content, feature type, timestamp
- Heart icon toggle on result cards
- Favorites panel accessible from header

## Styling Conventions

- Custom CSS variables for Filipino kitchen colors
- Tailwind utility classes with custom theme tokens
- Mobile-first: max-w-lg containers, responsive padding
- Custom animations: `animate-fade-up`, `animate-slide-in`
- Chat bubble styles for Manang conversation
