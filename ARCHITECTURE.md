# Web3-Korea Bridge Website Architecture

## Project Overview
A modern, scalable React/Next.js website for Web3-Korea Bridge with multi-language support, admin dashboard, and content management capabilities.

## Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **i18n**: next-intl
- **State Management**: Zustand + React Query
- **Email**: Resend
- **Validation**: Zod
- **Security**: reCAPTCHA v3

## Folder Structure

```
web3-korea-bridge/
├── app/                          # Next.js 14 App Router
│   ├── [locale]/                 # Internationalization
│   │   ├── (admin)/              # Admin routes (protected)
│   │   │   ├── admin/
│   │   │   │   ├── layout.tsx    # Admin layout
│   │   │   │   ├── page.tsx      # Admin dashboard
│   │   │   │   ├── blog/         # Blog management
│   │   │   │   ├── news/         # News management
│   │   │   │   ├── users/        # User management
│   │   │   │   └── settings/     # Site settings
│   │   │   └── login/
│   │   │       └── page.tsx      # Admin login
│   │   ├── (main)/               # Public routes
│   │   │   ├── layout.tsx        # Main layout
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── about/            # About pages
│   │   │   ├── services/         # Services pages
│   │   │   ├── blog/             # Blog listing/detail
│   │   │   ├── news/             # News listing/detail
│   │   │   ├── events/           # Events pages
│   │   │   ├── contact/          # Contact page
│   │   │   └── resources/        # Resources/documentation
│   │   ├── globals.css           # Global styles
│   │   └── not-found.tsx         # 404 page
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication
│   │   ├── blog/                 # Blog CRUD
│   │   ├── news/                 # News CRUD
│   │   ├── contact/              # Contact form
│   │   ├── upload/               # File upload
│   │   └── admin/                # Admin-specific endpoints
│   ├── favicon.ico
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Global loading UI
│   ├── error.tsx                 # Error boundary
│   └── global-error.tsx          # Global error handler
│
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Spinner/
│   │   └── index.ts              # Barrel exports
│   ├── layout/                   # Layout components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── LanguageSwitch.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── Container.tsx
│   ├── forms/                    # Form components
│   │   ├── ContactForm/
│   │   ├── NewsletterForm/
│   │   ├── LoginForm/
│   │   └── SearchForm/
│   ├── content/                  # Content components
│   │   ├── BlogCard/
│   │   ├── NewsCard/
│   │   ├── EventCard/
│   │   ├── HeroSection/
│   │   ├── FeatureSection/
│   │   └── TestimonialSection/
│   ├── admin/                    # Admin components
│   │   ├── AdminLayout/
│   │   ├── DataTable/
│   │   ├── ContentEditor/
│   │   ├── MediaUploader/
│   │   └── StatsCard/
│   └── common/                   # Common components
│       ├── SEO/
│       ├── LoadingSpinner/
│       ├── ErrorBoundary/
│       ├── Pagination/
│       └── BreadCrumb/
│
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication config
│   ├── db.ts                     # Database connection
│   ├── email.ts                  # Email service
│   ├── utils.ts                  # General utilities
│   ├── validations.ts            # Zod schemas
│   ├── constants.ts              # App constants
│   ├── recaptcha.ts              # reCAPTCHA integration
│   └── api.ts                    # API utilities
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useLocalStorage.ts        # Local storage hook
│   ├── useDebounce.ts            # Debounce hook
│   ├── useInfiniteScroll.ts      # Infinite scroll hook
│   └── useRecaptcha.ts           # reCAPTCHA hook
│
├── store/                        # State management
│   ├── authStore.ts              # Auth state
│   ├── uiStore.ts                # UI state
│   ├── contentStore.ts           # Content state
│   └── index.ts                  # Store exports
│
├── types/                        # TypeScript types
│   ├── auth.types.ts
│   ├── blog.types.ts
│   ├── news.types.ts
│   ├── common.types.ts
│   └── api.types.ts
│
├── styles/                       # Styling
│   ├── globals.css               # Global CSS
│   ├── components.css            # Component styles
│   └── admin.css                 # Admin styles
│
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Database migrations
│   └── seed.ts                   # Database seeding
│
├── messages/                     # Internationalization
│   ├── en.json                   # English translations
│   └── ko.json                   # Korean translations
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   ├── logos/
│   └── documents/
│
├── middleware.ts                 # Next.js middleware
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
├── .env.local                    # Environment variables
├── .gitignore
└── README.md
```

## Component Hierarchy & Organization

### 1. Base UI Components (`components/ui/`)
- **Atomic Design Principles**: Atoms → Molecules → Organisms
- **TypeScript Interfaces**: Strict type definitions for all props
- **Accessibility**: WCAG 2.1 AA compliance built-in
- **Theming**: Tailwind CSS with CSS custom properties

### 2. Layout Components (`components/layout/`)
- **Responsive Design**: Mobile-first approach
- **SEO Optimization**: Structured data and meta tags
- **Performance**: Lazy loading and code splitting

### 3. Content Components (`components/content/`)
- **Reusable Cards**: Blog, news, event cards
- **Interactive Sections**: Hero, features, testimonials
- **Media Optimization**: Next.js Image component integration

### 4. Admin Components (`components/admin/`)
- **Data Management**: CRUD operations with optimistic updates
- **Rich Text Editor**: Markdown or WYSIWYG editor
- **File Management**: Media upload and organization

## State Management Strategy

### Zustand for Client State
```typescript
// store/authStore.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

// store/uiStore.ts
interface UIState {
  isMobileMenuOpen: boolean;
  theme: 'light' | 'dark';
  locale: 'en' | 'ko';
  toggleMobileMenu: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLocale: (locale: 'en' | 'ko') => void;
}
```

### React Query for Server State
- **Data Fetching**: Automatic caching and synchronization
- **Mutations**: Optimistic updates with rollback
- **Background Refetching**: Keep data fresh
- **Error Handling**: Retry logic and error boundaries

## API Route Structure

### RESTful API Design
```
/api/
├── auth/
│   ├── login/              # POST - Admin authentication
│   ├── logout/             # POST - Logout
│   └── refresh/            # POST - Refresh token
├── blog/
│   ├── route.ts           # GET, POST - List/create posts
│   ├── [slug]/
│   │   └── route.ts       # GET, PUT, DELETE - CRUD operations
│   └── search/
│       └── route.ts       # GET - Search posts
├── news/
│   ├── route.ts           # GET, POST - List/create news
│   ├── [id]/
│   │   └── route.ts       # GET, PUT, DELETE - CRUD operations
│   └── categories/
│       └── route.ts       # GET - News categories
├── contact/
│   └── route.ts           # POST - Contact form submission
├── upload/
│   └── route.ts           # POST - File upload
└── admin/
    ├── stats/
    │   └── route.ts       # GET - Dashboard statistics
    └── settings/
        └── route.ts       # GET, PUT - Site settings
```

## Database Integration Strategy

### Prisma ORM with PostgreSQL
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  posts     Post[]
  news      News[]
  
  @@map("users")
}

model Post {
  id          String   @id @default(cuid())
  title       Json     // Multi-language support
  content     Json     // Multi-language support
  slug        String   @unique
  excerpt     String?
  coverImage  String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  
  tags        Tag[]
  categories  Category[]
  
  @@map("posts")
}

model News {
  id          String   @id @default(cuid())
  title       Json     // Multi-language support
  content     Json     // Multi-language support
  slug        String   @unique
  excerpt     String?
  coverImage  String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  
  categories  NewsCategory[]
  
  @@map("news")
}

enum Role {
  USER
  ADMIN
  EDITOR
}
```

## Authentication Approach

### NextAuth.js Configuration
```typescript
// lib/auth.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './db'
import { verify } from 'argon2'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !await verify(user.password, credentials.password)) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login'
  }
}
```

## i18n Implementation Strategy

### next-intl Configuration
```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ko'],
  defaultLocale: 'en',
  localeDetection: true
})

// messages/en.json
{
  "navigation": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "blog": "Blog",
    "news": "News",
    "contact": "Contact"
  },
  "hero": {
    "title": "Bridging Web3 Innovation Between Korea and the World",
    "subtitle": "Connecting Korean blockchain projects with global opportunities"
  }
}

// messages/ko.json
{
  "navigation": {
    "home": "홈",
    "about": "소개",
    "services": "서비스",
    "blog": "블로그",
    "news": "뉴스",
    "contact": "연락처"
  },
  "hero": {
    "title": "한국과 세계를 연결하는 Web3 혁신의 다리",
    "subtitle": "한국 블록체인 프로젝트와 글로벌 기회를 연결합니다"
  }
}
```

## Performance Optimization Techniques

### 1. Next.js Optimizations
- **App Router**: Improved performance with React Server Components
- **Image Optimization**: Automatic WebP/AVIF conversion and lazy loading
- **Font Optimization**: Self-hosted fonts with font-display: swap
- **Bundle Analysis**: @next/bundle-analyzer for size monitoring

### 2. Code Splitting & Lazy Loading
```typescript
// Dynamic imports for heavy components
const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  loading: () => <div>Loading editor...</div>,
  ssr: false
})
```

### 3. Caching Strategies
- **Static Generation**: ISG for blog/news content
- **API Routes**: Response caching with appropriate headers
- **Database**: Query optimization and connection pooling
- **CDN**: Static asset delivery via Vercel Edge Network

### 4. Performance Budgets
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Bundle Size**: < 500KB initial load

## Security Considerations

### 1. Authentication & Authorization
- **Role-based Access Control**: Admin, Editor, User roles
- **JWT Security**: HttpOnly cookies with secure flags
- **CSRF Protection**: Built-in Next.js protection
- **Rate Limiting**: API route protection

### 2. Data Validation
```typescript
// lib/validations.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  recaptchaToken: z.string().min(1, 'reCAPTCHA verification required')
})

export const blogPostSchema = z.object({
  title: z.record(z.string().min(1)),
  content: z.record(z.string().min(1)),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  published: z.boolean(),
  tags: z.array(z.string()),
  categoryIds: z.array(z.string())
})
```

### 3. reCAPTCHA Integration
```typescript
// lib/recaptcha.ts
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY!,
      response: token
    })
  })

  const data = await response.json()
  return data.success && data.score > 0.5
}
```

## Deployment & DevOps

### 1. Environment Configuration
```env
# .env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
RECAPTCHA_SECRET_KEY="..."
RECAPTCHA_SITE_KEY="..."
RESEND_API_KEY="..."
UPLOADTHING_SECRET="..."
```

### 2. Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

This architecture provides a solid foundation for a scalable, maintainable Web3-Korea Bridge website with all the requested features and modern best practices.