# API Endpoint Structure - Next.js App Router

## Public API Routes (pages/api/)

### Authentication Routes
```
POST   /api/auth/login              # Admin login
POST   /api/auth/logout             # Admin logout
GET    /api/auth/me                 # Get current admin user
POST   /api/auth/refresh            # Refresh JWT token
POST   /api/auth/forgot-password    # Password reset request
POST   /api/auth/reset-password     # Password reset
```

### Content API Routes (Public Read Access)
```
GET    /api/content/blog            # Get blog posts (with pagination, filters)
GET    /api/content/blog/[slug]     # Get single blog post by slug
GET    /api/content/portfolio       # Get portfolio projects
GET    /api/content/portfolio/[slug] # Get single portfolio project
GET    /api/content/categories      # Get all categories (blog + portfolio)
GET    /api/content/static/[key]    # Get static content by key
GET    /api/content/languages       # Get supported languages
```

### Contact & Inquiry Routes
```
POST   /api/contact/submit          # Submit contact form
POST   /api/contact/newsletter      # Newsletter signup
POST   /api/recaptcha/verify        # Verify reCAPTCHA token
```

### Media & Files
```
GET    /api/media/[...path]         # Serve uploaded media files
POST   /api/upload/image            # Upload images (admin only)
```

### Analytics (Public)
```
POST   /api/analytics/pageview      # Track page views
```

## Admin API Routes (Authenticated)

### Dashboard
```
GET    /api/admin/dashboard         # Dashboard statistics
GET    /api/admin/recent-activity   # Recent admin activity
```

### Blog Management
```
GET    /api/admin/blog              # Get all blog posts (admin view)
POST   /api/admin/blog              # Create new blog post
GET    /api/admin/blog/[id]         # Get blog post for editing
PUT    /api/admin/blog/[id]         # Update blog post
DELETE /api/admin/blog/[id]         # Delete blog post
PATCH  /api/admin/blog/[id]/status  # Update post status
```

### Portfolio Management
```
GET    /api/admin/portfolio         # Get all portfolio projects
POST   /api/admin/portfolio         # Create new portfolio project
GET    /api/admin/portfolio/[id]    # Get portfolio project for editing
PUT    /api/admin/portfolio/[id]    # Update portfolio project
DELETE /api/admin/portfolio/[id]    # Delete portfolio project
PATCH  /api/admin/portfolio/[id]/status # Update project status
```

### Content Categories
```
GET    /api/admin/categories        # Get all categories
POST   /api/admin/categories        # Create new category
PUT    /api/admin/categories/[id]   # Update category
DELETE /api/admin/categories/[id]   # Delete category
```

### Static Content Management
```
GET    /api/admin/static-content    # Get all static content
GET    /api/admin/static-content/[key] # Get static content by key
PUT    /api/admin/static-content/[key] # Update static content
```

### Contact Inquiries Management
```
GET    /api/admin/inquiries         # Get all contact inquiries
GET    /api/admin/inquiries/[id]    # Get single inquiry
PATCH  /api/admin/inquiries/[id]    # Update inquiry status
POST   /api/admin/inquiries/[id]/notes # Add note to inquiry
DELETE /api/admin/inquiries/[id]    # Delete inquiry
POST   /api/admin/inquiries/[id]/reply # Reply to inquiry
```

### Media Management
```
GET    /api/admin/media             # Get uploaded media files
POST   /api/admin/media/upload      # Upload new media file
DELETE /api/admin/media/[id]        # Delete media file
PATCH  /api/admin/media/[id]        # Update media metadata
```

### Analytics & Reporting
```
GET    /api/admin/analytics/overview # Analytics overview
GET    /api/admin/analytics/posts   # Blog post analytics
GET    /api/admin/analytics/traffic # Website traffic analytics
```

### System Management
```
GET    /api/admin/settings          # Get system settings
PUT    /api/admin/settings          # Update system settings
GET    /api/admin/activity-logs     # Get admin activity logs
POST   /api/admin/backup            # Create database backup
```

## Route Implementation Examples

### Sample Route Structure (Next.js 13+ App Router)
```
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── logout/route.ts
│   │   └── me/route.ts
│   ├── content/
│   │   ├── blog/
│   │   │   ├── route.ts              # GET /api/content/blog
│   │   │   └── [slug]/route.ts       # GET /api/content/blog/[slug]
│   │   ├── portfolio/
│   │   │   ├── route.ts
│   │   │   └── [slug]/route.ts
│   │   └── static/
│   │       └── [key]/route.ts
│   ├── contact/
│   │   ├── submit/route.ts
│   │   └── newsletter/route.ts
│   ├── admin/
│   │   ├── blog/
│   │   │   ├── route.ts              # GET, POST /api/admin/blog
│   │   │   └── [id]/
│   │   │       ├── route.ts          # GET, PUT, DELETE
│   │   │       └── status/route.ts   # PATCH status
│   │   ├── portfolio/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── inquiries/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       ├── notes/route.ts
│   │   │       └── reply/route.ts
│   │   └── media/
│   │       ├── route.ts
│   │       ├── upload/route.ts
│   │       └── [id]/route.ts
│   ├── media/
│   │   └── [...path]/route.ts        # Dynamic media serving
│   └── recaptcha/
│       └── verify/route.ts
```

## Request/Response Patterns

### Standard Response Format
```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  meta?: {
    timestamp: string;
    version: string;
    language?: string;
  };
}
```

### Error Response Codes
```typescript
enum ErrorCodes {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  RECAPTCHA_FAILED = 'RECAPTCHA_FAILED',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}
```

### Query Parameters for Content APIs
```typescript
// Blog posts query parameters
interface BlogQueryParams {
  page?: number;          // Page number (default: 1)
  limit?: number;         // Items per page (default: 10)
  category?: string;      // Filter by category slug
  status?: string;        // Filter by status (admin only)
  featured?: boolean;     // Filter featured posts
  search?: string;        // Search in title/content
  lang?: string;          // Language code
  sort?: 'newest' | 'oldest' | 'popular';
}

// Portfolio query parameters
interface PortfolioQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  status?: string;        // admin only
  lang?: string;
  sort?: 'newest' | 'oldest' | 'order';
}
```

## Middleware Configuration

### Authentication Middleware Routes
```typescript
// Protected admin routes
const adminRoutes = [
  '/api/admin/*',
  '/api/upload/*'
];

// Rate limited routes
const rateLimitedRoutes = [
  '/api/contact/*',
  '/api/auth/login',
  '/api/auth/forgot-password'
];

// Public routes (no auth required)
const publicRoutes = [
  '/api/content/*',
  '/api/media/*',
  '/api/analytics/pageview',
  '/api/recaptcha/verify'
];
```