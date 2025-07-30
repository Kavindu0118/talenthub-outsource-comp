#!/bin/bash

# Workforce Outsourcing Website - Deployment Script

echo "🚀 Starting deployment process..."

# Check if Google Sheets is configured
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Google Sheets integration will not work without configuration."
    echo "   Please copy .env.example to .env and configure your Google Sheets URLs."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Built files are in the 'dist' directory"
    echo ""
    echo "🌐 Ready to deploy to:"
    echo "   - Vercel: npm install -g vercel && vercel"
    echo "   - Netlify: drag and drop 'dist' folder to netlify.com/drop"
    echo "   - GitHub Pages: push to repository and enable GitHub Pages"
    echo ""
    echo "📋 Don't forget to:"
    echo "   1. Configure Google Sheets URLs in your hosting platform"
    echo "   2. Set up custom domain (optional)"
    echo "   3. Configure SSL certificate"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
