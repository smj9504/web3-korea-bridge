#!/bin/bash

# Web3-Korea Bridge Deployment Script
# Usage: ./scripts/deploy.sh [environment]
# Environments: development, staging, production

set -e

ENVIRONMENT=${1:-development}
PROJECT_NAME="web3-korea-bridge"

echo "🚀 Deploying $PROJECT_NAME to $ENVIRONMENT environment..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18 or later."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        log_error "Node.js version 18 or later is required. Current version: $(node -v)"
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed."
        exit 1
    fi
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI not found. Installing..."
        npm install -g vercel@latest
    fi
    
    log_info "Prerequisites check completed ✅"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    npm ci
    log_info "Dependencies installed ✅"
}

# Run tests
run_tests() {
    log_info "Running tests and type checks..."
    
    # Type check
    npm run type-check
    log_info "Type check passed ✅"
    
    # Linting
    npm run lint
    log_info "Linting passed ✅"
    
    # Build test
    log_info "Testing build process..."
    npm run build
    log_info "Build test passed ✅"
}

# Database operations
handle_database() {
    log_info "Handling database operations..."
    
    # Generate Prisma client
    npx prisma generate
    
    case $ENVIRONMENT in
        "development")
            log_info "Pushing database schema for development..."
            npx prisma db push
            ;;
        "staging"|"production")
            log_info "Running database migrations for $ENVIRONMENT..."
            npx prisma migrate deploy
            ;;
    esac
    
    log_info "Database operations completed ✅"
}

# Deploy to Vercel
deploy_to_vercel() {
    log_info "Deploying to Vercel ($ENVIRONMENT)..."
    
    case $ENVIRONMENT in
        "development")
            log_info "Development deployment (preview)..."
            vercel --prod=false
            ;;
        "staging")
            log_info "Staging deployment..."
            vercel --prod=false
            ;;
        "production")
            log_info "Production deployment..."
            vercel --prod
            ;;
    esac
    
    log_info "Vercel deployment completed ✅"
}

# Post-deployment checks
post_deployment_checks() {
    log_info "Running post-deployment checks..."
    
    # Get deployment URL
    DEPLOYMENT_URL=$(vercel ls --scope=team --json | jq -r '.[0].url' 2>/dev/null || echo "")
    
    if [ -n "$DEPLOYMENT_URL" ]; then
        FULL_URL="https://$DEPLOYMENT_URL"
        log_info "Deployment URL: $FULL_URL"
        
        # Health check
        log_info "Performing health check..."
        if curl -f "$FULL_URL/api/health" > /dev/null 2>&1; then
            log_info "Health check passed ✅"
        else
            log_warning "Health check failed. Please verify manually."
        fi
        
        # Homepage check
        log_info "Checking homepage..."
        if curl -f "$FULL_URL" > /dev/null 2>&1; then
            log_info "Homepage check passed ✅"
        else
            log_warning "Homepage check failed. Please verify manually."
        fi
        
    else
        log_warning "Could not retrieve deployment URL. Please check Vercel dashboard."
    fi
}

# Cleanup
cleanup() {
    log_info "Cleaning up..."
    # Remove any temporary files if needed
    log_info "Cleanup completed ✅"
}

# Main deployment flow
main() {
    log_info "Starting deployment process for $ENVIRONMENT environment..."
    
    check_prerequisites
    install_dependencies
    run_tests
    handle_database
    deploy_to_vercel
    post_deployment_checks
    cleanup
    
    log_info "🎉 Deployment completed successfully!"
    log_info "Environment: $ENVIRONMENT"
    log_info "Project: $PROJECT_NAME"
    log_info "Timestamp: $(date)"
}

# Error handling
trap 'log_error "Deployment failed!"; exit 1' ERR

# Run main function
main

# Success message
echo ""
echo "======================================"
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "======================================"
echo "Environment: $ENVIRONMENT"
echo "Project: $PROJECT_NAME"
echo "Time: $(date)"
echo ""
echo "Next steps:"
echo "1. Verify the deployment in your browser"
echo "2. Check monitoring dashboards"
echo "3. Run additional tests if needed"
echo "======================================"