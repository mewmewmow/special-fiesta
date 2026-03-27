# Tech Stack: SARAPSCAN

## Core Framework

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.3 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4.1.17 | Styling |

## Dependencies

### Production
| Package | Version | Purpose |
|---------|---------|---------|
| openai | 6.33.0 | AI API client for text/vision/chat |

### Dev
| Package | Version | Purpose |
|---------|---------|---------|
| @tailwindcss/postcss | 4.1.17 | Tailwind integration |
| eslint | 9.39.1 | Code quality |
| eslint-config-next | 16.0.0 | Next.js ESLint rules |

## AI Configuration

The app uses OpenAI-compatible API through 3 endpoints:

| Endpoint | Model | Purpose |
|----------|-------|---------|
| `/api/generate` | `AI_MODEL` (default: gpt-4o-mini) | Text generation |
| `/api/vision` | `AI_VISION_MODEL` (default: gpt-4o-mini) | Image analysis |
| `/api/chat` | `AI_MODEL` (default: gpt-4o-mini) | Chat conversation |

### Environment Variables

```env
OPENAI_API_KEY=sk-...        # Required: API key
AI_BASE_URL=...              # Optional: Custom API base URL
AI_MODEL=gpt-4o-mini         # Optional: Text/chat model
AI_VISION_MODEL=gpt-4o-mini  # Optional: Vision model
```

## Package Manager

- **Bun** (not npm/yarn)
- Commands: `bun install`, `bun run build`, `bun lint`, `bun typecheck`
