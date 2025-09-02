# Security Best Practices & Data Validation

## Overview
Comprehensive security framework implementing defense-in-depth principles, input validation, and threat protection.

## Core Security Principles

### 1. Defense in Depth
```
Layer 1: Network Security (Cloudflare, firewall)
Layer 2: Application Security (middleware, validation)
Layer 3: Authentication & Authorization (JWT, RBAC)
Layer 4: Data Security (encryption, sanitization)
Layer 5: Monitoring & Logging (activity tracking)
```

### 2. Zero Trust Architecture
- Verify every request regardless of source
- Minimal privilege access (single admin)
- Continuous monitoring and validation
- Encrypted communication everywhere

## Input Validation Framework

### Validation Schema with Zod
```typescript
// lib/validation/schemas.ts
import { z } from 'zod';

// Common validation patterns
const emailSchema = z.string()
  .email('Invalid email format')
  .max(255, 'Email too long')
  .transform(email => email.toLowerCase().trim());

const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name too long')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters')
  .transform(name => name.trim());

const phoneSchema = z.string()
  .max(20, 'Phone number too long')
  .regex(/^[\+]?[0-9\-\s\(\)]+$/, 'Invalid phone number format')
  .optional()
  .transform(phone => phone?.replace(/\s+/g, ' ').trim());

const urlSchema = z.string()
  .url('Invalid URL format')
  .max(500, 'URL too long')
  .optional();

const slugSchema = z.string()
  .min(3, 'Slug must be at least 3 characters')
  .max(200, 'Slug too long')
  .regex(/^[a-z0-9\-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
  .transform(slug => slug.toLowerCase().trim());

// Content validation schemas
export const blogPostSchema = z.object({
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title too long'),
  slug: slugSchema,
  excerpt: z.string()
    .max(500, 'Excerpt too long')
    .optional(),
  content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(50000, 'Content too long'),
  categoryId: z.number().int().positive(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  featuredImageId: z.number().int().positive().optional(),
  publishedAt: z.string().datetime().optional(),
  metaTitle: z.string().max(200, 'Meta title too long').optional(),
  metaDescription: z.string().max(300, 'Meta description too long').optional(),
  language: z.enum(['en', 'ko', 'ja']).default('en')
});

export const portfolioProjectSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title too long'),
  slug: slugSchema,
  description: z.string()
    .max(1000, 'Description too long')
    .optional(),
  content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(20000, 'Content too long'),
  categoryId: z.number().int().positive(),
  featuredImageId: z.number().int().positive().optional(),
  projectUrl: urlSchema,
  githubUrl: urlSchema,
  clientName: z.string().max(100, 'Client name too long').optional(),
  completionDate: z.string().date().optional(),
  technologies: z.array(z.string().max(50)).max(20, 'Too many technologies'),
  status: z.enum(['active', 'archived', 'hidden']).default('active'),
  language: z.enum(['en', 'ko', 'ja']).default('en')
});

export const contactInquirySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  company: z.string().max(100, 'Company name too long').optional(),
  phone: phoneSchema,
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message too long'),
  recaptchaToken: z.string().min(1, 'reCAPTCHA token required'),
  language: z.enum(['en', 'ko', 'ja']).default('en')
});

export const adminLoginSchema = z.object({
  email: emailSchema,
  password: z.string()
    .min(1, 'Password required')
    .max(100, 'Password too long'),
  recaptchaToken: z.string().optional() // Only required after failed attempts
});
```

### Input Sanitization
```typescript
// lib/security/sanitization.ts
import DOMPurify from 'isomorphic-dompurify';
import { escape } from 'html-escaper';

export class InputSanitizer {
  
  // HTML content sanitization for rich text editors
  static sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'strike', 'code', 'pre',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li',
        'blockquote',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td'
      ],
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'target',
        'width', 'height', 'class', 'id'
      ],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    });
  }

  // Plain text sanitization
  static sanitizeText(text: string): string {
    return escape(text.trim());
  }

  // URL validation and sanitization
  static sanitizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      // Only allow http/https protocols
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Invalid protocol');
      }
      return parsed.toString();
    } catch {
      return '';
    }
  }

  // File name sanitization
  static sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/[^a-zA-Z0-9\-_\.]/g, '_')
      .replace(/_{2,}/g, '_')
      .toLowerCase()
      .substring(0, 255);
  }

  // SQL injection prevention (additional layer)
  static sanitizeSqlInput(input: string): string {
    return input
      .replace(/['";\\]/g, '') // Remove dangerous SQL characters
      .trim()
      .substring(0, 1000); // Limit length
  }
}
```

## Authentication Security

### JWT Security Implementation
```typescript
// lib/security/jwt.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export class JWTSecurity {
  private static readonly ACCESS_TOKEN_EXPIRY = '15m';
  private static readonly REFRESH_TOKEN_EXPIRY = '7d';
  private static readonly ALGORITHM = 'HS512'; // Strong HMAC

  static generateTokens(payload: { userId: number; email: string; role: string }) {
    const accessToken = jwt.sign(
      {
        ...payload,
        type: 'access',
        jti: crypto.randomUUID() // Unique token ID
      },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: this.ACCESS_TOKEN_EXPIRY,
        issuer: 'web3-korea-bridge',
        audience: 'admin-panel',
        algorithm: this.ALGORITHM as jwt.Algorithm
      }
    );

    const refreshToken = jwt.sign(
      {
        ...payload,
        type: 'refresh',
        jti: crypto.randomUUID()
      },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: this.REFRESH_TOKEN_EXPIRY,
        issuer: 'web3-korea-bridge',
        audience: 'admin-panel',
        algorithm: this.ALGORITHM as jwt.Algorithm
      }
    );

    return { accessToken, refreshToken };
  }

  static verifyAccessToken(token: string): jwt.JwtPayload {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!, {
      issuer: 'web3-korea-bridge',
      audience: 'admin-panel',
      algorithms: [this.ALGORITHM as jwt.Algorithm]
    }) as jwt.JwtPayload;
  }

  static verifyRefreshToken(token: string): jwt.JwtPayload {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!, {
      issuer: 'web3-korea-bridge',
      audience: 'admin-panel',
      algorithms: [this.ALGORITHM as jwt.Algorithm]
    }) as jwt.JwtPayload;
  }
}
```

### Password Security
```typescript
// lib/security/password.ts
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class PasswordSecurity {
  private static readonly SALT_ROUNDS = 12;
  private static readonly PEPPER = process.env.PASSWORD_PEPPER || '';
  
  // Password strength validation
  static validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 12) {
      errors.push('Password must be at least 12 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    // Check against common passwords (simplified)
    const commonPasswords = [
      'password123', 'admin123456', 'administrator',
      'password1234', '123456789012'
    ];
    
    if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
      errors.push('Password contains common patterns');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  // Hash password with salt and pepper
  static async hashPassword(password: string): Promise<string> {
    // Add pepper before hashing
    const pepperedPassword = password + this.PEPPER;
    return bcrypt.hash(pepperedPassword, this.SALT_ROUNDS);
  }
  
  // Verify password
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    const pepperedPassword = password + this.PEPPER;
    return bcrypt.compare(pepperedPassword, hash);
  }
  
  // Generate secure random password (for password reset)
  static generateSecurePassword(length = 16): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = uppercase + lowercase + numbers + symbols;
    
    let password = '';
    
    // Ensure at least one character from each category
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}
```

## API Security Middleware

### Rate Limiting Enhanced
```typescript
// lib/security/rateLimiting.ts
import { NextRequest } from 'next/server';
import { connectDB } from '../db';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export class AdvancedRateLimit {
  private static readonly configs: Record<string, RateLimitConfig> = {
    '/api/auth/login': { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 per 15 min
    '/api/contact/submit': { windowMs: 60 * 60 * 1000, maxRequests: 3 }, // 3 per hour
    '/api/admin/*': { windowMs: 60 * 1000, maxRequests: 60 }, // 60 per minute
    'default': { windowMs: 60 * 60 * 1000, maxRequests: 100 } // 100 per hour
  };

  static async checkRateLimit(request: NextRequest): Promise<{
    allowed: boolean;
    remainingRequests?: number;
    resetTime?: Date;
    error?: string;
  }> {
    try {
      const ip = this.getClientIP(request);
      const path = request.nextUrl.pathname;
      const config = this.getConfig(path);
      const key = `rate_limit:${ip}:${path}`;
      
      const db = await connectDB();
      const now = new Date();
      const windowStart = new Date(now.getTime() - config.windowMs);
      
      // Clean old entries
      await db.query(
        'DELETE FROM rate_limit_log WHERE created_at < $1',
        [windowStart]
      );
      
      // Count current requests in window
      const result = await db.query(
        `SELECT COUNT(*) as count, MIN(created_at) as first_request
         FROM rate_limit_log 
         WHERE ip_address = $1 AND endpoint = $2 AND created_at > $3`,
        [ip, path, windowStart]
      );
      
      const currentCount = parseInt(result.rows[0].count);
      const firstRequest = result.rows[0].first_request;
      
      if (currentCount >= config.maxRequests) {
        const resetTime = new Date(
          new Date(firstRequest).getTime() + config.windowMs
        );
        
        return {
          allowed: false,
          remainingRequests: 0,
          resetTime,
          error: 'Rate limit exceeded'
        };
      }
      
      // Log this request
      await db.query(
        'INSERT INTO rate_limit_log (ip_address, endpoint, user_agent, created_at) VALUES ($1, $2, $3, $4)',
        [ip, path, request.headers.get('user-agent'), now]
      );
      
      return {
        allowed: true,
        remainingRequests: config.maxRequests - currentCount - 1,
        resetTime: new Date(now.getTime() + config.windowMs)
      };
      
    } catch (error) {
      console.error('Rate limit check error:', error);
      return { allowed: true }; // Fail open
    }
  }
  
  private static getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    
    return cfConnectingIP || forwarded?.split(',')[0] || realIP || request.ip || 'unknown';
  }
  
  private static getConfig(path: string): RateLimitConfig {
    for (const [pattern, config] of Object.entries(this.configs)) {
      if (pattern !== 'default' && path.startsWith(pattern.replace('/*', ''))) {
        return config;
      }
    }
    return this.configs.default;
  }
}
```

### Request Validation Middleware
```typescript
// lib/middleware/validation.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { InputSanitizer } from '../security/sanitization';

export function createValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return async (request: NextRequest, handler: (data: T) => Promise<NextResponse>) => {
    try {
      const body = await request.json();
      
      // Sanitize inputs before validation
      const sanitizedBody = sanitizeObject(body);
      
      // Validate with schema
      const validatedData = schema.parse(sanitizedBody);
      
      return handler(validatedData);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          }
        }, { status: 400 });
      }
      
      return NextResponse.json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Request processing failed'
        }
      }, { status: 500 });
    }
  };
}

function sanitizeObject(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = InputSanitizer.sanitizeText(value);
    } else {
      sanitized[key] = sanitizeObject(value);
    }
  }
  
  return sanitized;
}
```

## Security Headers & CSP

### Content Security Policy
```typescript
// lib/security/csp.ts
export const securityHeaders = [
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
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self' https:",
      "connect-src 'self' https://api.web3-korea-bridge.com",
      "frame-src 'self' https://www.google.com https://challenges.cloudflare.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ')
  }
];
```

## Data Protection & Privacy

### Data Encryption
```typescript
// lib/security/encryption.ts
import crypto from 'crypto';

export class DataEncryption {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY = crypto.scryptSync(process.env.ENCRYPTION_KEY!, 'salt', 32);
  
  static encrypt(text: string): { encrypted: string; iv: string; tag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.ALGORITHM, this.KEY);
    cipher.setAAD(Buffer.from('web3-korea-bridge', 'utf8'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex')
    };
  }
  
  static decrypt(encryptedData: { encrypted: string; iv: string; tag: string }): string {
    const decipher = crypto.createDecipher(this.ALGORITHM, this.KEY);
    decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
    decipher.setAAD(Buffer.from('web3-korea-bridge', 'utf8'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

## Security Monitoring & Logging

### Security Event Logging
```sql
-- Security events table
CREATE TABLE security_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL, -- failed_login, suspicious_activity, etc.
    severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
    ip_address INET,
    user_agent TEXT,
    user_id INTEGER REFERENCES admin_users(id),
    details JSONB,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_security_events_type ON security_events(event_type);
CREATE INDEX idx_security_events_severity ON security_events(severity);
CREATE INDEX idx_security_events_created ON security_events(created_at DESC);
```

## Environment Variables

```bash
# Security Configuration
JWT_ACCESS_SECRET=your-super-secure-jwt-access-secret-256-bits-minimum
JWT_REFRESH_SECRET=your-super-secure-jwt-refresh-secret-256-bits-minimum
PASSWORD_PEPPER=additional-password-security-pepper-string
ENCRYPTION_KEY=your-encryption-key-for-sensitive-data-32-chars

# Rate Limiting
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
ALLOWED_ORIGINS=https://web3-korea-bridge.com,https://admin.web3-korea-bridge.com

# Content Security Policy
CSP_REPORT_URI=https://your-csp-report-endpoint.com/report
```