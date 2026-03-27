# 🍲 SARAPSCAN

**AI-powered Filipino cooking companion** — Scan ingredients, generate recipes, and get cooking advice from Manang!

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-green)

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Authenticity Checker** | Snap a photo of food to check if it's authentic Filipino cuisine |
| 🍳 **Recipe Generator** | "Anong Luto Ko?" — Get AI-generated recipes based on available ingredients |
| 🎲 **Random Ulam** | Feeling indecisive? Get a random Filipino dish suggestion |
| 🆘 **Rescue Mission** | Got leftovers? AI suggests creative ways to repurpose them |
| 👵 **Ask Manang** | Chat with a virtual Filipino cooking auntie for tips and advice |
| ❤️ **Favorites** | Save your favorite recipes locally |

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/mewmewmow/special-fiesta.git
cd special-fiesta

# Install
npm install

# Configure
cp .env.example .env.local
# Add your OpenAI API key to .env.local

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — Kain na! 🍚

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **AI:** OpenAI GPT-4o / GPT-4o-mini (vision + chat)
- **Language:** TypeScript 5.9
- **Storage:** LocalStorage (favorites)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts      # Chat completions endpoint
│   │   ├── generate/route.ts  # Recipe generation endpoint
│   │   └── vision/route.ts    # Image analysis endpoint
│   ├── page.tsx               # Main app shell
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── AskManang.tsx          # AI chat interface
│   ├── ImageChecker.tsx       # Food authenticity scanner
│   ├── RecipeGenerator.tsx    # Recipe generation UI
│   ├── RandomUlam.tsx         # Random dish picker
│   ├── RescueMission.tsx      # Leftover repurposer
│   ├── BottomNav.tsx          # Navigation bar
│   ├── Onboarding.tsx         # First-time user guide
│   └── Icons.tsx              # SVG icon components
└── lib/
    ├── ai.ts                  # AI client utilities
    ├── storage.ts             # LocalStorage helpers
    └── types.ts               # TypeScript types
```

## ⚙️ Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | ✅ | — | Your OpenAI API key |
| `AI_API_KEY` | ✅ | — | Alternative API key name |
| `AI_BASE_URL` | ❌ | `https://api.openai.com/v1` | Custom API base URL (supports OpenRouter) |
| `AI_MODEL` | ❌ | `gpt-4o-mini` | Chat model name |
| `AI_VISION_MODEL` | ❌ | `gpt-4o-mini` | Vision model name |
| `OPENROUTER_REFERRER` | ❌ | `https://sarapscan.app` | OpenRouter referrer header |

## 🌏 OpenRouter Support

SARAPSCAN works with [OpenRouter](https://openrouter.ai) out of the box:

```env
AI_API_KEY=sk-or-...
AI_BASE_URL=https://openrouter.ai/api/v1
AI_MODEL=meta-llama/llama-3.1-8b-instruct
```

## 📱 PWA Ready

The app is mobile-first with a native feel:
- Bottom navigation
- Touch-friendly UI
- Offline favorites (localStorage)

## 📄 License

MIT

---

**SARAPSCAN** — *Masarap na, mabilis pa!* 🇵🇭
