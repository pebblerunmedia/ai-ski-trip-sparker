# AI Ski Trip Idea Sparker

A modern web application that provides personalized ski resort suggestions and imaginative trip ideas powered by Google's Gemini AI, built with Next.js, Firebase, and Genkit.

## 🏗️ Architecture

This project uses a monorepo structure with the following stack:

- **Frontend**: Next.js 14+ with App Router, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Firebase Functions with Genkit for AI orchestration
- **AI Models**: Google Gemini models via Genkit
- **Database**: Cloud SQL for PostgreSQL (with Firebase Data Connect - to be implemented)
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting

## 📁 Project Structure

```
ai-ski-trip-sparker/
├── apps/
│   ├── web/                 # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/         # Next.js App Router pages
│   │   │   ├── components/  # React components
│   │   │   ├── lib/         # Utility functions
│   │   │   └── types/       # TypeScript type definitions
│   │   └── package.json
│   └── functions/           # Firebase Functions with Genkit
│       ├── src/
│       │   ├── flows/       # Genkit AI flows
│       │   ├── data/        # Data access layer
│       │   └── index.ts     # Function exports
│       └── package.json
├── packages/                # Shared packages (future)
├── firebase.json            # Firebase configuration
├── .firebaserc             # Firebase projects
└── package.json            # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Firebase CLI
- Google AI API key (for Gemini)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd ai-ski-trip-sparker
   pnpm install
   ```

2. **Set up Firebase:**
   ```bash
   # Login to Firebase
   pnpm run setup
   
   # Update .firebaserc with your project ID
   # Edit .firebaserc and replace "your-project-id" with your actual Firebase project ID
   ```

3. **Configure environment variables:**
   ```bash
   # In apps/functions, set up your Gemini API key
   firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY"
   ```

4. **Development with emulators:**
   ```bash
   # Start Firebase emulators
   pnpm run firebase:emulators
   
   # In another terminal, start the web app
   pnpm run dev
   
   # In a third terminal, start Genkit development (optional)
   pnpm run genkit:dev
   ```

## 🎯 Features

### Current Implementation

- **F1: Predefined Ski Resort Dataset** - Mock data with 7 diverse ski resorts
- **F2: User Preference Input** - Natural language query interface
- **F3: AI Resort Suggester** - Gemini-powered resort matching with explanations
- **F4: AI Trip Spark Generator** - Creative trip inspiration generation
- **F5: Display Suggestions and Sparks** - Clean, responsive UI with Google Stitch-inspired design

### Planned Features

- Firebase Data Connect integration with Cloud SQL
- Firebase Authentication
- Enhanced semantic search with embeddings
- User preference persistence
- More sophisticated resort matching algorithms

## 🛠️ Development Commands

```bash
# Root level commands
pnpm run dev          # Start web development server
pnpm run build        # Build all apps
pnpm run lint         # Lint all packages
pnpm run type-check   # Type check all packages

# Web app specific
pnpm --filter web dev    # Start Next.js dev server
pnpm --filter web build  # Build Next.js app

# Functions specific  
pnpm --filter functions genkit:dev    # Start Genkit development
pnpm --filter functions deploy       # Deploy functions

# Firebase
pnpm run firebase:emulators  # Start local emulators
```

## 🧪 Testing the Application

1. Start the development environment (see Getting Started above)
2. Open http://localhost:3000
3. Enter a ski preference query like:
   - "Looking for challenging terrain with luxury amenities"
   - "Family-friendly resort with good snow conditions"  
   - "European skiing with historic atmosphere"
4. View AI-generated resort suggestions
5. Click "Spark an Idea!" to get creative trip inspiration

## 📚 AI Integration

The application uses Genkit flows for AI operations:

- **`suggestResortsFlow`**: Analyzes user preferences and matches with resorts
- **`generateTripSparkFlow`**: Creates imaginative trip inspiration

Both flows use Google's Gemini models for natural language processing and generation.

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Functions, Hosting, and Authentication
3. Update `.firebaserc` with your project ID
4. Set up Gemini API key in Functions config

### Environment Variables
- `GEMINI_API_KEY`: Required for AI model access (set via Firebase Functions config)

## 📝 Notes for AI Coding Assistants

This project is designed to work well with Claude Code and other AI coding assistants:

- Clear TypeScript interfaces and schemas
- Well-documented component structure  
- Separation of concerns between UI and AI logic
- Comprehensive JSDoc comments (to be added)
- Monorepo structure for easy navigation

## 🎨 Design Philosophy

UI design is inspired by Google Stitch (stitch.withgoogle.com) principles:
- Clean, modern interfaces
- Thoughtful use of color and spacing
- Focus on user experience and accessibility
- Material Design influence with custom touches

## 📄 License

This project is private and for development/testing purposes.
