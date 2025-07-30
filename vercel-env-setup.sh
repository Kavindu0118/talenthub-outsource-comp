#!/bin/bash
# Vercel Environment Variables Setup Script
# Run this script after installing Vercel CLI: npm i -g vercel

echo "Setting up environment variables for Vercel deployment..."

# Google Sheets Configuration
vercel env add VITE_GOOGLE_SCRIPT_URL production
# Enter: https://script.google.com/macros/s/AKfycbwQoopux9COimFOvBvmuGh_ExVqMMpQybB9DyqvDW3wmLGXlf4zwb_Y7NegYT-uzjZl/exec

vercel env add VITE_TALENT_GOOGLE_SCRIPT_URL production
# Enter: https://script.google.com/macros/s/AKfycbyQmTZqg071NdZzFSj7TI-XTtkoVuw4e1c0o_0ASGMlCRrVs8W2ycv9jyz39QItOHgkRw/exec

vercel env add VITE_PROJECT_REQUEST_GOOGLE_SCRIPT_URL production
# Enter: https://script.google.com/macros/s/AKfycby19h6UqYmKhH7EYJRbHhIL1G_FZNe0rrwByy-HfTULfZuT26puQt5G5cHkd00vWKZwcA/exec

echo "Environment variables setup complete!"
echo "Now run: vercel --prod to redeploy with new environment variables"
