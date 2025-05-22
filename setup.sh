#!/bin/bash

# Development setup script for AI Ski Trip Sparker

echo "🎿 Setting up AI Ski Trip Sparker development environment..."

# Check if required tools are installed
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first."
    echo "Run: npm install -g pnpm"
    exit 1
fi

if ! command -v firebase &> /dev/null; then
    echo "🔧 Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

echo "✅ Prerequisites check complete"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Check if Firebase is configured
if [ ! -f .firebaserc ] || grep -q "your-project-id" .firebaserc; then
    echo "⚠️  Firebase not configured yet."
    echo "Please:"
    echo "1. Create a Firebase project at https://console.firebase.google.com"
    echo "2. Run 'firebase login' to authenticate"
    echo "3. Update .firebaserc with your project ID"
    echo "4. Set up your Gemini API key: firebase functions:config:set gemini.api_key=\"YOUR_KEY\""
    echo ""
fi

# Create local environment file if it doesn't exist
if [ ! -f apps/web/.env.local ]; then
    echo "🔧 Creating local environment file..."
    cp apps/web/.env.example apps/web/.env.local
    echo "⚠️  Please update apps/web/.env.local with your Firebase configuration"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure Firebase (see warnings above if any)"
echo "2. Start development:"
echo "   - Terminal 1: pnpm run firebase:emulators"
echo "   - Terminal 2: pnpm run dev"
echo "   - Terminal 3: pnpm run genkit:dev (optional)"
echo ""
echo "3. Open http://localhost:3000 to see the app"
echo "4. Firebase emulator UI at http://localhost:4000"
echo ""
