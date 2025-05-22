# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Ski Trip Idea Sparker - A Firebase + Next.js + Google Gemini AI application that generates personalized ski resort suggestions and creative trip inspiration.

## Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Firebase Functions, Genkit AI framework, Google Gemini Flash 1.5
- **Infrastructure**: Firebase Hosting, Firebase Emulators for local dev
- **Package Manager**: pnpm with workspaces

### Key Architectural Decisions
- Monorepo structure with `apps/web` and `apps/functions`
- AI orchestration through Genkit flows for structured AI interactions
- Mock resort data in `apps/functions/src/data/mockResorts.ts` (ready for DB migration)
- Type-safe API calls through centralized `apps/web/src/lib/api.ts`

## Essential Commands

### Development (3-terminal setup)
```bash
# Terminal 1: Firebase Emulators
pnpm run firebase:emulators

# Terminal 2: Next.js development
pnpm run dev

# Terminal 3: Genkit UI (optional)
pnpm run genkit:dev
```

### Build & Deploy
```bash
pnpm run build              # Build all workspaces
pnpm run lint              # Lint all workspaces
pnpm run type-check        # Type check all workspaces
firebase deploy            # Deploy everything
pnpm run genkit:deploy     # Deploy functions only
```

### Setup & Configuration
```bash
# Set Gemini API key (required)
firebase functions:config:set gemini.api_key="YOUR_KEY"

# Initial setup
./setup.sh

# Environment check
./health-check.sh
```

## AI Flow Structure

The project uses two Genkit flows in `apps/functions/src/flows/`:

1. **suggestResortsFlow**: 
   - Extracts keywords from natural language queries
   - Matches against resort database
   - Generates personalized explanations

2. **generateTripSparkFlow**:
   - Creates imaginative 2-3 sentence trip inspiration
   - Based on selected resort and user preferences

## Development Ports
- Web app: http://localhost:3000
- Firebase Emulator UI: http://localhost:4000
- Functions: http://localhost:5001
- Firestore: http://localhost:8080

## Important Files
- `apps/web/src/app/page.tsx` - Main UI component
- `apps/web/src/lib/api.ts` - Firebase function calls
- `apps/functions/src/flows/` - AI flow definitions
- `apps/functions/src/data/mockResorts.ts` - Resort data

## Environment Variables
Web app requires `.env.local` with Firebase configuration. Use `.env.local.example` as template.