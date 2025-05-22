# Claude Code Development Guide

This guide provides common development tasks and commands for working with the AI Ski Trip Sparker project.

## 🏗️ Project Structure Overview

```
ai-ski-trip-sparker/
├── apps/web/          # Next.js frontend (port 3000)
├── apps/functions/    # Firebase Functions with Genkit (port 5001)
├── firebase.json      # Firebase configuration
└── package.json       # Root monorepo config
```

## 🚀 Quick Start Commands

```bash
# Initial setup (run once)
./setup.sh

# Development (3 terminals recommended)
pnpm run firebase:emulators  # Terminal 1: Firebase emulators
pnpm run dev                 # Terminal 2: Next.js dev server  
pnpm run genkit:dev          # Terminal 3: Genkit dev UI (optional)
```

## 📝 Common Development Tasks

### Frontend Development (apps/web/)

```bash
# Start Next.js development server
pnpm --filter web dev

# Build for production
pnpm --filter web build

# Type checking
pnpm --filter web type-check

# Add new Shadcn/ui component (example)
cd apps/web
npx shadcn-ui@latest add checkbox
```

### Backend Development (apps/functions/)

```bash
# Start Genkit development with hot reload
pnpm --filter functions genkit:dev

# Build TypeScript
pnpm --filter functions build

# Deploy functions
pnpm --filter functions deploy
```

### Firebase Operations

```bash
# Start all emulators
firebase emulators:start

# Deploy to production
firebase deploy

# Set environment variables
firebase functions:config:set gemini.api_key="YOUR_KEY"

# View current config
firebase functions:config:get
```

## 🔧 Configuration Files to Update

1. **`.firebaserc`** - Update with your Firebase project ID
2. **`apps/web/.env.local`** - Copy from `.env.example` and update
3. **Firebase Functions config** - Set Gemini API key

## 🐛 Debugging Tips

### Frontend Issues
- Check browser console for errors
- Verify Firebase config in `apps/web/src/lib/firebase.ts`
- Check if emulators are running on correct ports

### Backend Issues  
- Check Genkit logs in terminal
- Verify Gemini API key is set: `firebase functions:config:get`
- Test functions directly via Genkit UI (http://localhost:4000)

### Emulator Issues
- Kill existing processes: `pkill -f firebase`
- Clear emulator data: `firebase emulators:start --reset-data`
- Check port conflicts (5000, 5001, 4000)

## 📦 Adding New Features

### New UI Component
1. Create component in `apps/web/src/components/`
2. Add to main page or create new page in `apps/web/src/app/`
3. Update types in `apps/web/src/types/index.ts`

### New AI Flow
1. Create flow in `apps/functions/src/flows/`
2. Export in `apps/functions/src/index.ts`
3. Add client-side call in `apps/web/src/lib/api.ts`

### New Database Integration
1. Set up Firebase Data Connect schema
2. Update flows to use Data Connect tools
3. Replace mock data in `apps/functions/src/data/`

## 🎯 Key Files for AI Coding Assistants

- **Frontend Entry**: `apps/web/src/app/page.tsx`
- **AI Flows**: `apps/functions/src/flows/`
- **Type Definitions**: `apps/web/src/types/index.ts`
- **API Service**: `apps/web/src/lib/api.ts`
- **Firebase Config**: `apps/web/src/lib/firebase.ts`

## 🔍 Testing the Application

1. Start emulators and dev server
2. Go to http://localhost:3000
3. Enter test queries:
   - "luxury skiing with nightlife"
   - "family-friendly resort with good snow"
   - "challenging terrain in Europe"
4. Check Firebase emulator logs for AI flow execution
5. View Genkit traces at http://localhost:4000

## 📚 Useful Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Firebase Functions Guide](https://firebase.google.com/docs/functions)
- [Shadcn/ui Components](https://ui.shadcn.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
