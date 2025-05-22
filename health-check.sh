#!/bin/bash

# Project health check script

echo "🎿 AI Ski Trip Sparker - Project Health Check"
echo "=============================================="

# Check Node.js version
echo "📦 Node.js version:"
node --version

# Check pnpm version  
echo "📦 pnpm version:"
pnpm --version

# Check if dependencies are installed
if [ -d "node_modules" ]; then
    echo "✅ Root dependencies installed"
else
    echo "❌ Root dependencies missing - run 'pnpm install'"
fi

if [ -d "apps/web/node_modules" ]; then
    echo "✅ Web app dependencies installed" 
else
    echo "❌ Web app dependencies missing"
fi

if [ -d "apps/functions/node_modules" ]; then
    echo "✅ Functions dependencies installed"
else
    echo "❌ Functions dependencies missing"
fi

# Check Firebase configuration
if [ -f ".firebaserc" ]; then
    if grep -q "your-project-id" .firebaserc; then
        echo "⚠️  Firebase project ID not configured (still using placeholder)"
    else
        echo "✅ Firebase project configured"
    fi
else
    echo "❌ Firebase configuration missing"
fi

# Check environment files
if [ -f "apps/web/.env.local" ]; then
    echo "✅ Web environment file exists"
else
    echo "⚠️  Web environment file missing - copy from .env.example"
fi

# Check if ports are available
echo ""
echo "🔍 Checking port availability:"

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is in use (Next.js)"
else
    echo "✅ Port 3000 available (Next.js)"
fi

if lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5001 is in use (Firebase Functions)"
else
    echo "✅ Port 5001 available (Firebase Functions)"
fi

if lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 4000 is in use (Firebase Emulator UI)"
else
    echo "✅ Port 4000 available (Firebase Emulator UI)"
fi

# Check TypeScript compilation
echo ""
echo "🔍 TypeScript check:"
cd apps/web
if pnpm tsc --noEmit > /dev/null 2>&1; then
    echo "✅ Web app TypeScript compiles successfully"
else
    echo "❌ Web app TypeScript compilation errors"
fi

cd ../functions
if pnpm tsc --noEmit > /dev/null 2>&1; then
    echo "✅ Functions TypeScript compiles successfully"
else
    echo "❌ Functions TypeScript compilation errors"
fi

cd ../..

echo ""
echo "🎯 Quick commands:"
echo "  Start development: pnpm run dev"
echo "  Start emulators:   pnpm run firebase:emulators"
echo "  Full setup:        ./setup.sh"
echo ""
