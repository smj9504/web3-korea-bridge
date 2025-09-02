# Authentication System Design

## Overview
Single admin user authentication system with JWT tokens, session management, and security features.

## Authentication Flow

### 1. Login Process
```
1. Client sends credentials (email + password)
2. Server validates credentials against hashed password
3. Check for account lockout status
4. Verify reCAPTCHA (after 3 failed attempts)
5. Generate JWT access token (15 min) + refresh token (7 days)
6. Store refresh token in httpOnly cookie
7. Log admin activity
8. Return access token and user info
```

### 2. Token Management
```
Access Token (JWT):
- Lifetime: 15 minutes
- Payload: { userId, email, role, iat, exp }
- Stored in: Client memory/state (not localStorage)

Refresh Token:
- Lifetime: 7 days
- Stored in: httpOnly, secure, sameSite cookie
- Used to generate new access tokens
- Rotated on each refresh
```

### 3. Session Validation
```
1. Client sends request with Authorization: Bearer <token>
2. Middleware validates JWT signature and expiration
3. Extract user info from token payload
4. Check if user is still active in database
5. Attach user to request context
6. Continue to route handler
```

## Implementation Details

### JWT Configuration
```typescript
interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  iat: number;  // issued at
  exp: number;  // expires at
}

const JWT_CONFIG = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
  issuer: 'web3-korea-bridge',
  audience: 'admin-panel'
};
```

### Password Security
```typescript
// Password requirements
const PASSWORD_POLICY = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventCommonPasswords: true,
  preventUserInfoInPassword: true
};

// Hashing configuration
const BCRYPT_CONFIG = {
  saltRounds: 12,  // High security for single admin
  pepper: process.env.PASSWORD_PEPPER // Additional secret
};
```

### Account Security Features
```typescript
interface AccountSecurity {
  // Lockout mechanism
  maxLoginAttempts: 5;
  lockoutDuration: 30; // minutes
  
  // Session management
  maxActiveSessions: 3;
  sessionTimeout: 8; // hours of inactivity
  
  // Password management
  passwordChangeInterval: 90; // days
  passwordHistoryCount: 5; // prevent reuse
  
  // Two-factor authentication (optional)
  requireMFA: boolean;
  mfaBackupCodes: string[];
}
```

## Middleware Implementation

### Authentication Middleware
```typescript
// app/api/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';

export async function authMiddleware(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'No token provided' } },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Verify JWT token
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JWTPayload;
    
    // Check if user is still active
    const db = await connectDB();
    const user = await db.query(
      'SELECT id, email, role, is_active FROM admin_users WHERE id = $1',
      [payload.userId]
    );

    if (!user.rows[0] || !user.rows[0].is_active) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'User not found or inactive' } },
        { status: 401 }
      );
    }

    // Add user info to request context
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.userId.toString());
    response.headers.set('x-user-email', payload.email);
    response.headers.set('x-user-role', payload.role);

    return response;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { success: false, error: { code: 'TOKEN_EXPIRED', message: 'Token expired' } },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid token' } },
      { status: 401 }
    );
  }
}
```

### Rate Limiting Middleware
```typescript
// app/api/middleware/rateLimit.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

const RATE_LIMITS = {
  '/api/auth/login': { requests: 5, window: 15 * 60 * 1000 }, // 5 per 15 min
  '/api/contact/submit': { requests: 3, window: 60 * 60 * 1000 }, // 3 per hour
  default: { requests: 100, window: 60 * 60 * 1000 } // 100 per hour
};

export async function rateLimitMiddleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const path = request.nextUrl.pathname;
  const limit = RATE_LIMITS[path as keyof typeof RATE_LIMITS] || RATE_LIMITS.default;
  
  const key = `rate_limit:${ip}:${path}`;
  const now = Date.now();
  const window = now - limit.window;
  
  try {
    const db = await connectDB();
    
    // Clean old entries and count current requests
    await db.query('DELETE FROM rate_limit_log WHERE created_at < $1', [new Date(window)]);
    
    const result = await db.query(
      'SELECT COUNT(*) as count FROM rate_limit_log WHERE ip_address = $1 AND endpoint = $2 AND created_at > $3',
      [ip, path, new Date(window)]
    );
    
    const currentCount = parseInt(result.rows[0].count);
    
    if (currentCount >= limit.requests) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'RATE_LIMIT_EXCEEDED', 
            message: 'Too many requests' 
          } 
        },
        { status: 429 }
      );
    }
    
    // Log this request
    await db.query(
      'INSERT INTO rate_limit_log (ip_address, endpoint, created_at) VALUES ($1, $2, $3)',
      [ip, path, new Date()]
    );
    
    return NextResponse.next();
  } catch (error) {
    console.error('Rate limit middleware error:', error);
    return NextResponse.next(); // Fail open for availability
  }
}
```

## Security Headers Configuration

```typescript
// next.config.js security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
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
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src 'self';
      frame-src https://www.google.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

## Database Schema for Authentication

```sql
-- Additional tables for authentication features

-- Rate limiting log
CREATE TABLE rate_limit_log (
    id SERIAL PRIMARY KEY,
    ip_address INET NOT NULL,
    endpoint VARCHAR(200) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Session management
CREATE TABLE admin_sessions (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
    refresh_token_hash VARCHAR(255) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Password history (prevent reuse)
CREATE TABLE password_history (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Two-factor authentication (optional)
CREATE TABLE admin_mfa (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
    secret_key VARCHAR(255) NOT NULL,
    backup_codes TEXT[], -- Array of hashed backup codes
    is_enabled BOOLEAN DEFAULT FALSE,
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_rate_limit_ip_endpoint ON rate_limit_log(ip_address, endpoint);
CREATE INDEX idx_rate_limit_created ON rate_limit_log(created_at);
CREATE INDEX idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX idx_admin_sessions_expires ON admin_sessions(expires_at);
```

## Environment Variables

```bash
# JWT Configuration
JWT_ACCESS_SECRET=your-super-secure-access-token-secret-here
JWT_REFRESH_SECRET=your-super-secure-refresh-token-secret-here
PASSWORD_PEPPER=additional-password-security-pepper

# reCAPTCHA Configuration
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
RECAPTCHA_SITE_KEY=your-recaptcha-site-key

# Security Configuration
ADMIN_EMAIL=admin@web3-korea-bridge.com
LOCKOUT_DURATION_MINUTES=30
MAX_LOGIN_ATTEMPTS=5
SESSION_TIMEOUT_HOURS=8
```