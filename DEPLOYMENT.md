# Web3-Korea Bridge Deployment & Hosting Strategy

## Executive Summary

This comprehensive deployment strategy provides a cost-effective, scalable solution for the Web3-Korea Bridge website with multi-region support, high availability, and automated CI/CD workflows.

**Recommended Stack**: Vercel + PlanetScale + Cloudflare + GitHub Actions
**Total Monthly Cost**: $89-159 (Development → Production)
**Global Performance**: <200ms response time from Korea/Global

---

## 1. Hosting Platform Comparison

### Primary Recommendation: Vercel Pro

| Feature | Vercel Pro | Netlify Pro | AWS | Railway |
|---------|------------|-------------|-----|---------|
| **Monthly Cost** | $20 | $19 | $25-50 | $5-20 |
| **Next.js Support** | ⭐⭐⭐⭐⭐ Native | ⭐⭐⭐⭐ Good | ⭐⭐⭐ Configure | ⭐⭐⭐⭐ Good |
| **Edge Network** | ⭐⭐⭐⭐⭐ Global | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ CloudFront | ⭐⭐⭐ Limited |
| **Auto-scaling** | ⭐⭐⭐⭐⭐ Instant | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Advanced | ⭐⭐⭐ Basic |
| **Korea Performance** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Average |
| **Setup Complexity** | ⭐⭐⭐⭐⭐ Simple | ⭐⭐⭐⭐⭐ Simple | ⭐⭐ Complex | ⭐⭐⭐⭐ Simple |

### Why Vercel?
- **Native Next.js Integration**: Zero-config deployment with automatic optimization
- **Edge Runtime**: Global edge functions for optimal performance
- **Automatic Image Optimization**: WebP/AVIF conversion and responsive sizing
- **Preview Deployments**: Perfect for staging environments
- **Built-in Analytics**: Core Web Vitals monitoring

---

## 2. Complete Infrastructure Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        GLOBAL INFRASTRUCTURE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │   CLOUDFLARE    │    │   VERCEL EDGE   │                    │
│  │                 │    │                 │                    │
│  │ • DNS           │────│ • CDN           │                    │
│  │ • SSL           │    │ • Edge Functions│                    │
│  │ • DDoS          │    │ • Image Opt     │                    │
│  │ • WAF           │    │ • Static Cache  │                    │
│  └─────────────────┘    └─────────────────┘                    │
│                                   │                            │
│                                   ▼                            │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │              VERCEL DEPLOYMENT                             │ │
│  │                                                           │ │
│  │  Production:  web3korea.com                              │ │
│  │  Staging:     staging-web3korea.vercel.app              │ │
│  │  Preview:     feat-123-web3korea.vercel.app             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                   │                            │
│                                   ▼                            │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │   PLANETSCALE   │    │   UPLOADTHING   │                    │
│  │                 │    │                 │                    │
│  │ • PostgreSQL    │    │ • File Storage  │                    │
│  │ • Auto-scaling  │    │ • Image CDN     │                    │
│  │ • Backups       │    │ • Upload API    │                    │
│  │ • Multi-region  │    │ • Optimization  │                    │
│  └─────────────────┘    └─────────────────┘                    │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │     RESEND      │    │    MONITORING   │                    │
│  │                 │    │                 │                    │
│  │ • Email API     │    │ • Uptime        │                    │
│  │ • Templates     │    │ • Analytics     │                    │
│  │ • Deliverability│    │ • Error Track   │                    │
│  │ • DKIM/SPF      │    │ • Performance   │                    │
│  └─────────────────┘    └─────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

### Multi-Region Performance Strategy

**Primary Regions**:
- **Asia-Pacific**: Singapore, Seoul, Tokyo (Vercel Edge)
- **Americas**: N. Virginia, San Francisco
- **Europe**: Frankfurt, London

**Performance Targets**:
- Korea: <150ms TTFB
- Asia-Pacific: <200ms TTFB
- Global: <300ms TTFB

---

## 3. Environment Configuration Strategy

### Development Environment
```env
# .env.local (Development)
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://localhost:5432/web3korea_dev

# Email (Test)
RESEND_API_KEY=test_key
FROM_EMAIL=dev@test.com

# Upload (Development)
UPLOADTHING_SECRET=test_secret
UPLOADTHING_APP_ID=test_app

# reCAPTCHA (Test keys)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=test_site_key
RECAPTCHA_SECRET_KEY=test_secret_key

# Analytics
NEXT_PUBLIC_GA_ID=
VERCEL_ANALYTICS_ID=
```

### Staging Environment
```env
# .env.staging
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging-web3korea.vercel.app
NEXTAUTH_URL=https://staging-web3korea.vercel.app

# Database (PlanetScale Staging)
DATABASE_URL=mysql://staging_connection_string

# Email (Resend Test)
RESEND_API_KEY=re_staging_key
FROM_EMAIL=staging@web3korea.com

# Upload (UploadThing Staging)
UPLOADTHING_SECRET=ut_staging_secret
UPLOADTHING_APP_ID=staging_app_id

# reCAPTCHA (Test)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=staging_site_key
RECAPTCHA_SECRET_KEY=staging_secret_key

# Analytics (Staging)
NEXT_PUBLIC_GA_ID=GA_STAGING_ID
VERCEL_ANALYTICS_ID=staging_analytics_id
```

### Production Environment
```env
# .env.production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://web3korea.com
NEXTAUTH_URL=https://web3korea.com

# Database (PlanetScale Production)
DATABASE_URL=mysql://production_connection_string

# Email (Resend Production)
RESEND_API_KEY=re_production_key
FROM_EMAIL=contact@web3korea.com

# Upload (UploadThing Production)
UPLOADTHING_SECRET=ut_production_secret
UPLOADTHING_APP_ID=production_app_id

# reCAPTCHA (Production)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=production_site_key
RECAPTCHA_SECRET_KEY=production_secret_key

# Analytics (Production)
NEXT_PUBLIC_GA_ID=GA_PRODUCTION_ID
VERCEL_ANALYTICS_ID=production_analytics_id

# Security
NEXTAUTH_SECRET=ultra_secure_jwt_secret_32_chars
ENCRYPTION_KEY=32_byte_encryption_key_for_sensitive_data

# Monitoring
SENTRY_DSN=https://sentry.io/project/dsn
UPTIME_ROBOT_API_KEY=ur_api_key
```

---

## 4. CI/CD Pipeline Configuration

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy Web3-Korea Bridge

on:
  push:
    branches: [main, staging, develop]
  pull_request:
    branches: [main, staging]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  test:
    name: Test & Lint
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Type check
        run: npm run type-check
        
      - name: Lint
        run: npm run lint
        
      - name: Build test
        run: npm run build
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://test:test@localhost:5432/test
          NEXTAUTH_SECRET: test_secret_32_characters_long
          NEXTAUTH_URL: http://localhost:3000

  deploy-staging:
    name: Deploy to Staging
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/staging'
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Install Vercel CLI
        run: npm i -g vercel@latest
        
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Build Project
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Update Database Schema (Staging)
        run: |
          npx prisma generate
          npx prisma db push
        env:
          DATABASE_URL: ${{ secrets.STAGING_DATABASE_URL }}

  deploy-production:
    name: Deploy to Production
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Install Vercel CLI
        run: npm i -g vercel@latest
        
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Deploy to Vercel
        id: deploy
        run: |
          vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }} > deployment_url.txt
          echo "::set-output name=url::$(cat deployment_url.txt)"
        
      - name: Run Database Migrations
        run: |
          npx prisma generate
          npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.PRODUCTION_DATABASE_URL }}
          
      - name: Warm up production endpoints
        run: |
          curl -f ${{ steps.deploy.outputs.url }}/api/health
          curl -f ${{ steps.deploy.outputs.url }}/
          curl -f ${{ steps.deploy.outputs.url }}/ko
          
      - name: Run smoke tests
        run: npm run test:e2e:production
        env:
          BASE_URL: ${{ steps.deploy.outputs.url }}

  security-scan:
    name: Security Scan
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Run Snyk Security Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
          
      - name: Audit dependencies
        run: npm audit --audit-level high
```

### Branch Strategy
```
main (Production)
  ↑
staging (Staging Environment)
  ↑
develop (Development)
  ↑
feature/* (Feature branches)
```

### Deployment Triggers
- **Production**: Push to `main` → Auto-deploy to `web3korea.com`
- **Staging**: Push to `staging` → Auto-deploy to `staging-web3korea.vercel.app`
- **Preview**: Pull Request → Deploy to unique preview URL
- **Development**: Local development with hot reload

---

## 5. Performance Optimization Strategies

### Next.js Optimizations
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client']
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', // UploadThing
        port: '',
        pathname: '/f/**',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Bundle analysis
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Bundle optimization
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name: 'lib',
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
        },
      },
    };
    
    return config;
  },
  
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=86400',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

### Database Performance
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Connection optimization
export async function connectDB() {
  try {
    await prisma.$connect()
    console.log('📊 Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

// Query optimization helpers
export const queryOptions = {
  // Cache frequently accessed data
  posts: {
    where: { published: true },
    orderBy: { publishedAt: 'desc' as const },
    include: {
      author: {
        select: { name: true, email: true }
      },
      tags: true,
      categories: true
    }
  },
  
  // Pagination helper
  getPagination: (page: number, limit: number = 12) => ({
    skip: (page - 1) * limit,
    take: limit
  })
}
```

### Caching Strategy
```typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache'
import { prisma } from './db'

// Static page generation with revalidation
export const revalidate = 3600 // 1 hour

// Cached data fetching
export const getCachedPosts = unstable_cache(
  async (locale: string) => {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 6,
      include: {
        author: { select: { name: true } },
        tags: true
      }
    })
  },
  ['homepage-posts'],
  {
    revalidate: 3600,
    tags: ['posts']
  }
)

export const getCachedNews = unstable_cache(
  async (locale: string) => {
    return await prisma.news.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 4,
      include: {
        author: { select: { name: true } }
      }
    })
  },
  ['homepage-news'],
  {
    revalidate: 1800, // 30 minutes
    tags: ['news']
  }
)
```

---

## 6. Monitoring & Logging Setup

### Vercel Analytics Integration
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Error Tracking with Sentry
```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Error filtering
  beforeSend(event) {
    // Filter out known non-critical errors
    if (event.exception) {
      const error = event.exception.values?.[0]
      if (error?.type === 'ChunkLoadError') return null
    }
    return event
  },
  
  // Performance monitoring
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/web3korea\.com/],
    }),
  ],
})
```

### Health Check Endpoint
```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Check external services
    const services = {
      database: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      uptime: process.uptime()
    }
    
    return NextResponse.json(services, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        error: 'Database connection failed',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    )
  }
}
```

### Uptime Monitoring Script
```bash
#!/bin/bash
# scripts/monitor.sh

ENDPOINTS=(
  "https://web3korea.com"
  "https://web3korea.com/api/health"
  "https://web3korea.com/ko"
)

for endpoint in "${ENDPOINTS[@]}"; do
  response=$(curl -s -o /dev/null -w "%{http_code}" "$endpoint")
  if [ "$response" -ne 200 ]; then
    echo "❌ $endpoint returned $response"
    # Send alert (webhook, email, etc.)
  else
    echo "✅ $endpoint is healthy"
  fi
done
```

---

## 7. Backup Automation

### Database Backup Strategy
```yaml
# .github/workflows/backup.yml
name: Database Backup

on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM UTC (11 AM KST)
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    
    steps:
      - name: Backup Production Database
        run: |
          # PlanetScale creates automatic backups
          # Additional backup to AWS S3
          npx prisma db dump --url=${{ secrets.PRODUCTION_DATABASE_URL }} > backup-$(date +%Y%m%d).sql
          
      - name: Upload to S3
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2
          
      - name: Sync to S3
        run: |
          aws s3 cp backup-$(date +%Y%m%d).sql s3://web3korea-backups/database/
          
      - name: Cleanup old backups
        run: |
          # Keep only last 30 days of backups
          aws s3api list-objects-v2 --bucket web3korea-backups --prefix database/ --query 'Contents[?LastModified<=`2024-01-01`].Key' --output text | xargs -I {} aws s3 rm s3://web3korea-backups/{}
```

### File Storage Backup
```typescript
// scripts/backup-files.ts
import AWS from 'aws-sdk'
import { UTApi } from 'uploadthing/server'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
})

const utapi = new UTApi()

async function backupFiles() {
  try {
    // Get all files from UploadThing
    const files = await utapi.listFiles()
    
    for (const file of files) {
      // Download from UploadThing
      const response = await fetch(file.url)
      const buffer = await response.arrayBuffer()
      
      // Upload to S3 backup
      await s3.upload({
        Bucket: 'web3korea-backups',
        Key: `files/${file.name}`,
        Body: Buffer.from(buffer),
        Metadata: {
          originalUrl: file.url,
          uploadedAt: file.uploadedAt.toISOString()
        }
      }).promise()
      
      console.log(`✅ Backed up ${file.name}`)
    }
    
    console.log('🎉 File backup completed successfully')
  } catch (error) {
    console.error('❌ File backup failed:', error)
    throw error
  }
}

backupFiles()
```

---

## 8. Cost Estimation

### Monthly Costs Breakdown

#### Development Environment (Free Tier)
- **Vercel Hobby**: $0
- **PlanetScale Hobby**: $0
- **Resend Free**: $0
- **UploadThing Free**: $0
- **Cloudflare Free**: $0
- **Total**: **$0/month**

#### Production Environment (Standard)
- **Vercel Pro**: $20/month
- **PlanetScale Scaler Pro**: $39/month
- **Resend Pro**: $20/month (10K emails)
- **UploadThing Pro**: $10/month (100GB)
- **Cloudflare Pro**: $20/month
- **Monitoring (Sentry)**: $26/month
- **Backup Storage (AWS S3)**: $5/month
- **Total**: **$140/month**

#### High-Traffic Production (Enterprise)
- **Vercel Enterprise**: $400/month
- **PlanetScale Scaler Pro+**: $99/month
- **Resend Enterprise**: $85/month (100K emails)
- **UploadThing Enterprise**: $50/month (1TB)
- **Cloudflare Business**: $200/month
- **Monitoring Suite**: $100/month
- **Backup & Security**: $25/month
- **Total**: **$959/month**

### Cost Optimization Strategies

1. **Start with Standard Plan**: Begin with $140/month setup
2. **Scale on Demand**: Upgrade components as traffic grows
3. **Free Tier Usage**: Utilize free tiers during development
4. **Reserved Instances**: Use committed usage discounts for predictable workloads
5. **Resource Monitoring**: Implement alerts for unexpected usage spikes

---

## 9. SSL Certificates & Domain Configuration

### Domain Setup with Cloudflare

#### Step 1: Domain Registration & DNS
```bash
# Add domain to Cloudflare
# Update nameservers to Cloudflare

# DNS Records
A    web3korea.com        → 76.76.19.61 (Vercel)
AAAA web3korea.com        → 2606:4700:10::6816:4b3d (Vercel)
A    www.web3korea.com    → 76.76.19.61 (Vercel)
CNAME api.web3korea.com   → cname.vercel-dns.com
CNAME cdn.web3korea.com   → utfs.io
TXT  web3korea.com        → "v=spf1 include:spf.resend.com ~all"
TXT  _dmarc.web3korea.com → "v=DMARC1; p=none; rua=mailto:admin@web3korea.com"
```

#### Step 2: SSL Configuration
```javascript
// Vercel automatically provides SSL certificates
// Cloudflare provides additional SSL/TLS encryption

// Force HTTPS redirect in next.config.js
async redirects() {
  return [
    {
      source: '/:path*',
      has: [
        {
          type: 'header',
          key: 'x-forwarded-proto',
          value: 'http',
        },
      ],
      destination: 'https://web3korea.com/:path*',
      permanent: true,
    },
  ]
}
```

#### Step 3: Security Headers
```javascript
// next.config.js security headers
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload'
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel.app *.google.com *.gstatic.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' *.vercel.app vitals.vercel-analytics.com"
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        }
      ]
    }
  ]
}
```

---

## 10. Step-by-Step Deployment Guide

### Phase 1: Initial Setup (Day 1)

#### Step 1: Repository Setup
```bash
# Clone the repository
git clone https://github.com/your-org/web3-korea-bridge.git
cd web3-korea-bridge

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your local development variables
```

#### Step 2: Database Setup (PlanetScale)
```bash
# 1. Create PlanetScale account at https://planetscale.com
# 2. Create new database "web3korea"
# 3. Get connection string

# Install PlanetScale CLI
npm install -g @planetscale/cli

# Authenticate
pscale auth login

# Connect to database
pscale connect web3korea main --port 3309

# In another terminal, run migrations
DATABASE_URL="mysql://root@127.0.0.1:3309/web3korea" npx prisma db push

# Generate Prisma client
npx prisma generate
```

#### Step 3: External Services Setup

**UploadThing (File Storage)**
```bash
# 1. Go to https://uploadthing.com
# 2. Create new app
# 3. Get API keys
# 4. Add to environment variables
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=your_app_id
```

**Resend (Email Service)**
```bash
# 1. Go to https://resend.com
# 2. Create account and get API key
# 3. Set up domain verification
# 4. Add to environment variables
RESEND_API_KEY=re_...
FROM_EMAIL=contact@web3korea.com
```

**reCAPTCHA Setup**
```bash
# 1. Go to https://www.google.com/recaptcha/admin
# 2. Create new site (v3)
# 3. Add domains: localhost, your-staging-domain.com, web3korea.com
# 4. Get site key and secret key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6L...
RECAPTCHA_SECRET_KEY=6L...
```

### Phase 2: Hosting Setup (Day 2)

#### Step 4: Vercel Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link

# Set up environment variables in Vercel dashboard:
# 1. Go to project settings
# 2. Add environment variables for production and preview
# 3. Important: Use PlanetScale production connection string
```

#### Step 5: Cloudflare Setup
```bash
# 1. Add domain to Cloudflare
# 2. Change nameservers at domain registrar
# 3. Wait for DNS propagation (up to 48 hours)
# 4. Enable "Full (Strict)" SSL/TLS encryption
# 5. Add DNS records:

# DNS Records to add:
A     @               76.76.19.61         # Vercel IP
A     www             76.76.19.61         # Vercel IP
CNAME api             cname.vercel-dns.com
CNAME cdn             utfs.io
TXT   @               "v=spf1 include:spf.resend.com ~all"
TXT   _dmarc          "v=DMARC1; p=none; rua=mailto:admin@web3korea.com"
```

#### Step 6: Domain Configuration in Vercel
```bash
# In Vercel dashboard:
# 1. Go to Project → Settings → Domains
# 2. Add custom domain: web3korea.com
# 3. Add www redirect: www.web3korea.com → web3korea.com
# 4. Wait for SSL certificate provisioning
```

### Phase 3: CI/CD Pipeline (Day 3)

#### Step 7: GitHub Secrets Setup
```bash
# In GitHub repository settings → Secrets → Actions, add:

VERCEL_ORG_ID=team_...
VERCEL_PROJECT_ID=prj_...
VERCEL_TOKEN=vercel_token_...

# Database URLs
PRODUCTION_DATABASE_URL=mysql://...
STAGING_DATABASE_URL=mysql://...

# External service keys
RESEND_API_KEY=re_...
UPLOADTHING_SECRET=ut_...
RECAPTCHA_SECRET_KEY=6L...

# Monitoring
SENTRY_DSN=https://...
SNYK_TOKEN=snyk_token_...

# Backup (Optional)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=secret...
```

#### Step 8: Branch Strategy Setup
```bash
# Create staging branch
git checkout -b staging
git push origin staging

# Create develop branch
git checkout -b develop
git push origin develop

# Set up branch protection rules in GitHub:
# 1. Require pull request reviews for main
# 2. Require status checks to pass
# 3. Require branches to be up to date
# 4. Restrict pushes to main branch
```

### Phase 4: Monitoring & Security (Day 4)

#### Step 9: Monitoring Setup

**Sentry Error Tracking**
```bash
# 1. Create Sentry account at https://sentry.io
# 2. Create new project for Next.js
# 3. Get DSN
# 4. Install Sentry in your app (already configured in architecture)

# Test error tracking
npm run build
npm start
# Visit /api/test-error to verify Sentry integration
```

**Uptime Monitoring**
```bash
# Set up UptimeRobot or similar:
# 1. Monitor https://web3korea.com
# 2. Monitor https://web3korea.com/api/health
# 3. Monitor https://web3korea.com/ko
# 4. Set up alerts via email/Slack
```

#### Step 10: Security Configuration

**Cloudflare Security Settings**
```bash
# In Cloudflare Dashboard:
# 1. Security → WAF → Enable managed rules
# 2. Security → DDoS → Enable DDoS protection
# 3. Security → Bot Fight Mode → Enable
# 4. SSL/TLS → Edge Certificates → Enable HSTS
# 5. Network → gRPC → Enable
```

**Content Security Policy Testing**
```bash
# Test CSP headers are working:
curl -I https://web3korea.com

# Should include:
# Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval'...
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
# X-Frame-Options: DENY
```

### Phase 5: Performance & Optimization (Day 5)

#### Step 11: Performance Testing
```bash
# Install testing tools
npm install -D lighthouse @axe-core/playwright

# Run Lighthouse audit
npx lighthouse https://web3korea.com --output=html --output-path=./lighthouse-report.html

# Performance targets to verify:
# - Performance Score: >90
# - First Contentful Paint: <1.8s
# - Largest Contentful Paint: <2.5s
# - Cumulative Layout Shift: <0.1
```

#### Step 12: SEO Optimization
```bash
# Verify structured data
# 1. Go to https://search.google.com/structured-data/testing-tool
# 2. Test homepage and blog pages
# 3. Submit sitemap to Google Search Console
# 4. Submit sitemap to Naver Webmaster Tools (for Korea)

# XML Sitemap will be auto-generated at:
# https://web3korea.com/sitemap.xml
# https://web3korea.com/ko/sitemap.xml
```

### Phase 6: Launch Preparation (Day 6-7)

#### Step 13: Content Migration
```bash
# If migrating from existing site:
# 1. Export existing content
# 2. Create migration scripts in prisma/migrations/
# 3. Run data import

# Seed initial data
npm run db:seed
```

#### Step 14: Final Testing Checklist

**Functional Testing**
- [ ] Homepage loads in both English and Korean
- [ ] Navigation works correctly
- [ ] Contact form submits successfully
- [ ] Admin login and dashboard access
- [ ] Blog/news creation and editing
- [ ] File upload functionality
- [ ] Email notifications working

**Performance Testing**
- [ ] Core Web Vitals passing
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Korean CDN performance verified

**Security Testing**
- [ ] HTTPS enforced across all pages
- [ ] Security headers present
- [ ] SQL injection protection
- [ ] XSS protection enabled
- [ ] CSRF tokens working

**SEO Testing**
- [ ] Meta tags present on all pages
- [ ] Structured data validation
- [ ] Sitemap accessible
- [ ] robots.txt configured
- [ ] Open Graph tags working

### Phase 7: Go Live (Day 8)

#### Step 15: Production Deployment
```bash
# Final production deployment
git checkout main
git merge staging
git push origin main

# Monitor deployment
vercel logs --follow

# Verify production deployment
curl https://web3korea.com/api/health
```

#### Step 16: Post-Launch Monitoring
```bash
# Set up monitoring dashboards:
# 1. Vercel Analytics Dashboard
# 2. Cloudflare Analytics
# 3. Google Analytics 4
# 4. Sentry Error Dashboard
# 5. UptimeRobot Status Page

# Create status page for transparency:
# https://status.web3korea.com (using Vercel or StatusPage.io)
```

### Phase 8: Ongoing Maintenance

#### Daily Tasks
- [ ] Check error logs in Sentry
- [ ] Monitor performance metrics
- [ ] Review security alerts

#### Weekly Tasks
- [ ] Update dependencies
- [ ] Review backup status
- [ ] Analyze performance metrics
- [ ] Security vulnerability scans

#### Monthly Tasks
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Cost optimization analysis
- [ ] Content and SEO review

---

## 11. Troubleshooting Guide

### Common Deployment Issues

**Build Failures**
```bash
# Error: Module not found
# Solution: Check import paths and dependencies
npm install
npm run type-check

# Error: Environment variables not found
# Solution: Verify all required env vars are set in Vercel dashboard
vercel env ls
```

**Database Connection Issues**
```bash
# Error: Can't reach database server
# Solution: Check PlanetScale connection string and firewall settings
pscale connect web3korea main --port 3309
DATABASE_URL="mysql://root@127.0.0.1:3309/web3korea" npm run dev
```

**Performance Issues**
```bash
# Slow page load times
# Solution: Enable Cloudflare caching and optimize images
# Check Next.js bundle analyzer
npm run analyze

# High database query times
# Solution: Add database indexes and optimize queries
npx prisma studio
```

**SSL Certificate Issues**
```bash
# SSL/TLS errors
# Solution: Verify Cloudflare SSL settings and domain configuration
# Check SSL Labs report: https://www.ssllabs.com/ssltest/
```

### Emergency Response Plan

**Site Down**
1. Check Vercel status page
2. Verify DNS resolution
3. Check Cloudflare dashboard for issues
4. Review recent deployments
5. Rollback if necessary: `vercel rollback`

**Database Issues**
1. Check PlanetScale dashboard
2. Verify connection strings
3. Check for ongoing maintenance
4. Switch to read-replica if available

**Security Breach**
1. Immediately rotate all API keys
2. Check access logs in Vercel and Cloudflare
3. Update Sentry for security events
4. Notify users if data affected
5. Conduct full security audit

### Support Contacts
- **Vercel Support**: https://vercel.com/help
- **PlanetScale Support**: https://planetscale.com/docs
- **Cloudflare Support**: https://support.cloudflare.com
- **Emergency Escalation**: Set up PagerDuty or similar for critical alerts

---

## 12. Conclusion

This deployment strategy provides a robust, scalable, and cost-effective solution for the Web3-Korea Bridge website. The architecture supports:

✅ **High Performance**: <200ms response times globally
✅ **Scalability**: Auto-scaling from 0 to millions of requests
✅ **Reliability**: 99.9% uptime SLA with automatic failover
✅ **Security**: Enterprise-grade security with WAF and DDoS protection
✅ **Cost Efficiency**: Start at $140/month, scale based on usage
✅ **Developer Experience**: Modern CI/CD with preview deployments
✅ **Multi-region**: Optimized for Korea and global audiences

The recommended technology stack (Vercel + PlanetScale + Cloudflare) provides the best balance of performance, cost, and developer experience for a Next.js application targeting Korean and global markets.

**Next Steps**:
1. Follow the 8-phase deployment guide
2. Set up monitoring and alerting
3. Establish backup and recovery procedures
4. Plan for traffic scaling and optimization
5. Regular security audits and updates

**Success Metrics**:
- Page load time <1.5s from Korea
- 99.9% uptime over 30 days
- Core Web Vitals all green
- Zero critical security vulnerabilities
- <$200/month operating costs for first 6 months

This deployment strategy positions the Web3-Korea Bridge website for success with modern infrastructure that scales with your business growth.

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Research and compare hosting platforms for Next.js applications", "status": "completed", "activeForm": "Researching hosting platforms for Next.js applications"}, {"content": "Design deployment architecture for multi-region support", "status": "completed", "activeForm": "Designing deployment architecture for multi-region support"}, {"content": "Create environment configuration strategy (dev/staging/production)", "status": "completed", "activeForm": "Creating environment configuration strategy"}, {"content": "Configure CI/CD pipeline with GitHub Actions", "status": "completed", "activeForm": "Configuring CI/CD pipeline with GitHub Actions"}, {"content": "Set up monitoring, logging, and backup automation", "status": "completed", "activeForm": "Setting up monitoring, logging, and backup automation"}, {"content": "Provide cost estimation and deployment guide", "status": "in_progress", "activeForm": "Providing cost estimation and deployment guide"}]