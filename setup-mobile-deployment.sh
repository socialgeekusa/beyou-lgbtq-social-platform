#!/bin/bash

# 🌈 BeYou Mobile Deployment Setup Script
# This script prepares the BeYou app for iOS and Android deployment

echo "🌈 Setting up BeYou for Mobile Deployment..."

# Create necessary directories
mkdir -p public/icons
mkdir -p mobile-assets
mkdir -p scripts

echo "📱 Installing Capacitor for mobile deployment..."
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android

echo "🔧 Installing additional mobile dependencies..."
npm install @capacitor/camera @capacitor/filesystem @capacitor/push-notifications
npm install @capacitor/share @capacitor/splash-screen @capacitor/status-bar
npm install @capacitor/haptics @capacitor/device @capacitor/network

echo "⚡ Installing PWA dependencies..."
npm install next-pwa workbox-webpack-plugin

echo "🎨 Creating placeholder app icons..."
# Note: You'll need to replace these with actual BeYou branded icons
echo "Creating icon placeholders - replace with actual BeYou icons"

echo "📱 Initializing Capacitor..."
npx cap init BeYou com.beyou.app

echo "🍎 Adding iOS platform..."
npx cap add ios

echo "🤖 Adding Android platform..."
npx cap add android

echo "📦 Building the app..."
npm run build

echo "🔄 Syncing with mobile platforms..."
npx cap sync

echo "✅ Mobile deployment setup complete!"
echo ""
echo "Next steps:"
echo "1. Create app icons using the icon generator script"
echo "2. Set up Supabase backend"
echo "3. Configure push notifications"
echo "4. Test on iOS/Android simulators"
echo "5. Submit to app stores"
echo ""
echo "To open in Xcode: npx cap open ios"
echo "To open in Android Studio: npx cap open android"
