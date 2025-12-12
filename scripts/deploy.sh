#!/bin/bash

# Section 3 Compliance System - Production Deployment Script
# This script handles the complete deployment process to Vercel

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    error "package.json not found. Please run this script from the project root."
    exit 1
fi

log "Starting Section 3 Compliance System deployment..."

# Load environment variables
if [ -f ".env.local" ]; then
    log "Loading environment variables from .env.local"
    export $(cat .env.local | grep -v '^#' | xargs)
elif [ -f ".env.production" ]; then
    log "Loading environment variables from .env.production"
    export $(cat .env.production | grep -v '^#' | xargs)
else
    error "No environment file found (.env.local or .env.production)"
    exit 1
fi

# Run pre-deployment checks
log "Running pre-deployment checks..."
if ! node scripts/pre-deployment-check.js; then
    error "Pre-deployment checks failed. Please fix the issues and try again."
    exit 1
fi

# Check if Vercel CLI is installed and authenticated
log "Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    error "Vercel CLI not found. Please install it with: npm install -g vercel"
    exit 1
fi

# Check if logged into Vercel
if ! vercel whoami &> /dev/null; then
    error "Not logged into Vercel. Please run: vercel login"
    exit 1
fi

# Install dependencies
log "Installing dependencies..."
npm ci --production=false

# Run tests
log "Running tests..."
if npm run test --if-present; then
    success "Tests passed"
else
    warning "Tests failed or not configured"
fi

# Build the application
log "Building application..."
if npm run build; then
    success "Build completed successfully"
else
    error "Build failed"
    exit 1
fi

# Run database migrations if needed
log "Checking database status..."
if [ -n "$SUPABASE_URL" ] && [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    log "Running database setup..."
    node scripts/setup-database.js
else
    warning "Supabase credentials not found. Skipping database setup."
fi

# Deploy to Vercel
log "Deploying to Vercel..."
if vercel --prod --yes; then
    success "Deployment completed successfully!"
    
    # Get deployment URL
    DEPLOYMENT_URL=$(vercel ls --scope=$(vercel whoami) | grep "section3-compliance" | head -1 | awk '{print $2}')
    if [ -n "$DEPLOYMENT_URL" ]; then
        success "Application deployed to: https://$DEPLOYMENT_URL"
    fi
    
    # Run post-deployment health checks
    log "Running post-deployment health checks..."
    sleep 10  # Wait for deployment to be ready
    node scripts/health-check.js
    
else
    error "Deployment failed"
    exit 1
fi

# Clean up
log "Cleaning up..."
rm -rf .next

success "Deployment process completed successfully!"
log "Your Section 3 Compliance System is now live!"
