#!/bin/bash

# WeatherPro Deployment Script for Vercel

echo "🚀 Starting WeatherPro deployment preparation..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for deployment."
    echo "📁 Build files are in the 'dist' directory"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo "🎉 WeatherPro is ready for Vercel deployment!"
echo "💡 Next steps:"
echo "   1. Push to GitHub"
echo "   2. Connect repository to Vercel"
echo "   3. Deploy automatically"
