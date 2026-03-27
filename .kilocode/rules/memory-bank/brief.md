# Project Brief: SARAPSCAN

## Purpose

SARAPSCAN is a mobile-first Filipino Dish Authenticity & Recipe Assistant app. It uses AI to help Filipino home cooks check dish authenticity, generate recipes from ingredients, get random ulam suggestions, rescue cooking disasters, and chat with a kitchen assistant named "Manang."

## Target Users

- Filipino home cooks
- People learning to cook Filipino food
- Anyone looking for recipe inspiration
- Users who want quick cooking rescue tips

## Core Use Case

Users interact with 5 AI-powered features:

1. **Authenticity Checker** - Upload a dish photo, AI rates its visual authenticity
2. **Anong Luto Ko?** - Enter ingredients, AI generates a Filipino fusion recipe
3. **Random Ulam** - Select time of day + weather, AI suggests a fitting dish
4. **Rescue Mission** - Describe a cooking problem, AI gives a quick fix
5. **Ask Manang** - Chat with a cheerful Filipino kitchen expert

## Key Requirements

### Must Have

- Mobile-first responsive design
- Bottom tab navigation (5 tabs)
- AI integration via OpenAI-compatible API
- Taglish (Tagalog + English) UI language
- Filipino kitchen theme (terracotta, cream, dark green)
- Local storage for saved recipes/favorites
- Onboarding screen for first-time users

### Nice to Have

- PWA support (manifest included)
- Favorites/saved recipes system
- Smooth animations and transitions

## Tech Stack

- Next.js 16 with App Router
- React 19
- Tailwind CSS 4
- TypeScript (strict)
- OpenAI SDK for AI calls
- Bun as package manager

## Constraints

- AI calls require OPENAI_API_KEY environment variable
- Mobile-first (max-width: ~500px effective area)
- All UI text in Taglish
