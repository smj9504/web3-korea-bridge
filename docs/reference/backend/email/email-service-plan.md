# Email Service Integration Plan

## Overview
Multi-provider email service with template management, automatic notifications, and delivery tracking.

## Email Service Providers (Priority Order)

### 1. Primary: Resend (Recommended)
```typescript
// Modern, developer-friendly, excellent deliverability
const resendConfig = {
  provider: 'resend',
  apiKey: process.env.RESEND_API_KEY,
  fromDomain: 'web3-korea-bridge.com',
  defaultFrom: 'noreply@web3-korea-bridge.com',
  adminEmail: 'admin@web3-korea-bridge.com',
  features: ['templates', 'analytics', 'webhooks', 'attachments'],
  pricing: 'Free tier: 3000 emails/month, then $20/month'
};
```

### 2. Fallback: SendGrid
```typescript
const sendGridConfig = {
  provider: 'sendgrid',
  apiKey: process.env.SENDGRID_API_KEY,
  fromDomain: 'web3-korea-bridge.com',
  features: ['templates', 'analytics', 'automation'],
  pricing: 'Free tier: 100 emails/day'
};
```

### 3. Emergency: NodeMailer + SMTP
```typescript
const smtpConfig = {
  provider: 'smtp',
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};
```

## Email Templates System

### Template Structure
```typescript
interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[]; // Template variables like {{name}}, {{message}}
  language: string;
  category: 'contact' | 'notification' | 'system';
  isActive: boolean;
}
```

### Multi-Language Templates
```
templates/
├── contact-inquiry/
│   ├── en.json
│   ├── ko.json
│   └── ja.json
├── admin-notification/
│   ├── en.json
│   ├── ko.json
│   └── ja.json
├── auto-reply/
│   ├── en.json
│   ├── ko.json
│   └── ja.json
└── system-alerts/
    ├── en.json
    ├── ko.json
    └── ja.json
```

### Template Examples

#### Contact Inquiry Auto-Reply (English)
```json
{
  "id": "contact-auto-reply-en",
  "name": "Contact Form Auto Reply (English)",
  "subject": "Thank you for contacting Web3-Korea Bridge",
  "htmlContent": "<!DOCTYPE html><html><body><h2>Hello {{name}},</h2><p>Thank you for reaching out to Web3-Korea Bridge. We have received your inquiry and will respond within 24 hours.</p><div style='background:#f5f5f5;padding:20px;border-left:4px solid #007bff;'><h3>Your Message:</h3><p><strong>Subject:</strong> {{subject}}</p><p><strong>Message:</strong></p><p>{{message}}</p></div><p>Best regards,<br>Web3-Korea Bridge Team</p></body></html>",
  "textContent": "Hello {{name}},\n\nThank you for reaching out to Web3-Korea Bridge. We have received your inquiry and will respond within 24 hours.\n\nYour Message:\nSubject: {{subject}}\nMessage: {{message}}\n\nBest regards,\nWeb3-Korea Bridge Team",
  "variables": ["name", "subject", "message"],
  "language": "en",
  "category": "contact",
  "isActive": true
}
```

#### Admin Notification Template
```json
{
  "id": "admin-notification-en",
  "name": "New Contact Inquiry Notification",
  "subject": "[Web3-Korea Bridge] New Contact Inquiry from {{name}}",
  "htmlContent": "<!DOCTYPE html><html><body><h2>New Contact Inquiry</h2><table style='border-collapse:collapse;width:100%'><tr><td style='border:1px solid #ddd;padding:8px;background-color:#f2f2f2'><strong>Name</strong></td><td style='border:1px solid #ddd;padding:8px'>{{name}}</td></tr><tr><td style='border:1px solid #ddd;padding:8px;background-color:#f2f2f2'><strong>Email</strong></td><td style='border:1px solid #ddd;padding:8px'><a href='mailto:{{email}}'>{{email}}</a></td></tr><tr><td style='border:1px solid #ddd;padding:8px;background-color:#f2f2f2'><strong>Company</strong></td><td style='border:1px solid #ddd;padding:8px'>{{company}}</td></tr><tr><td style='border:1px solid #ddd;padding:8px;background-color:#f2f2f2'><strong>Phone</strong></td><td style='border:1px solid #ddd;padding:8px'>{{phone}}</td></tr><tr><td style='border:1px solid #ddd;padding:8px;background-color:#f2f2f2'><strong>Subject</strong></td><td style='border:1px solid #ddd;padding:8px'>{{subject}}</td></tr></table><h3>Message:</h3><div style='background:#f9f9f9;padding:15px;border:1px solid #ddd'>{{message}}</div><p><a href='{{adminUrl}}/inquiries/{{inquiryId}}' style='background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px'>View in Admin Panel</a></p></body></html>",
  "textContent": "New Contact Inquiry\n\nName: {{name}}\nEmail: {{email}}\nCompany: {{company}}\nPhone: {{phone}}\nSubject: {{subject}}\n\nMessage:\n{{message}}\n\nView in admin panel: {{adminUrl}}/inquiries/{{inquiryId}}",
  "variables": ["name", "email", "company", "phone", "subject", "message", "adminUrl", "inquiryId"],
  "language": "en",
  "category": "notification",
  "isActive": true
}
```

## Email Service Implementation

### Email Service Class
```typescript
// lib/email/EmailService.ts
import { Resend } from 'resend';
import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

export class EmailService {
  private resend?: Resend;
  private sendGridConfigured = false;
  private smtpTransporter?: nodemailer.Transporter;

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize Resend (Primary)
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
    }

    // Initialize SendGrid (Fallback)
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      this.sendGridConfigured = true;
    }

    // Initialize SMTP (Emergency)
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      this.smtpTransporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    }
  }

  async sendEmail(params: SendEmailParams): Promise<EmailResult> {
    const providers = ['resend', 'sendgrid', 'smtp'];
    
    for (const provider of providers) {
      try {
        const result = await this.sendWithProvider(provider, params);
        
        // Log successful send
        await this.logEmail({
          to: params.to,
          from: params.from,
          subject: params.subject,
          status: 'sent',
          provider,
          providerId: result.id
        });

        return result;
      } catch (error) {
        console.error(`Email failed with ${provider}:`, error);
        continue; // Try next provider
      }
    }

    // All providers failed
    await this.logEmail({
      to: params.to,
      from: params.from,
      subject: params.subject,
      status: 'failed',
      errorMessage: 'All email providers failed'
    });

    throw new Error('All email providers failed');
  }

  private async sendWithProvider(provider: string, params: SendEmailParams): Promise<EmailResult> {
    switch (provider) {
      case 'resend':
        if (!this.resend) throw new Error('Resend not configured');
        const resendResult = await this.resend.emails.send({
          from: params.from,
          to: params.to,
          subject: params.subject,
          html: params.html,
          text: params.text
        });
        return { id: resendResult.data?.id || '', provider: 'resend' };

      case 'sendgrid':
        if (!this.sendGridConfigured) throw new Error('SendGrid not configured');
        const sendGridResult = await sgMail.send({
          from: params.from,
          to: params.to,
          subject: params.subject,
          html: params.html,
          text: params.text
        });
        return { id: sendGridResult[0].headers['x-message-id'], provider: 'sendgrid' };

      case 'smtp':
        if (!this.smtpTransporter) throw new Error('SMTP not configured');
        const smtpResult = await this.smtpTransporter.sendMail({
          from: params.from,
          to: params.to,
          subject: params.subject,
          html: params.html,
          text: params.text
        });
        return { id: smtpResult.messageId, provider: 'smtp' };

      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }

  async sendTemplate(templateId: string, to: string, variables: Record<string, string>, language = 'en'): Promise<EmailResult> {
    const template = await this.loadTemplate(templateId, language);
    
    const processedSubject = this.processTemplate(template.subject, variables);
    const processedHtml = this.processTemplate(template.htmlContent, variables);
    const processedText = this.processTemplate(template.textContent, variables);

    return this.sendEmail({
      to,
      from: process.env.DEFAULT_FROM_EMAIL || 'noreply@web3-korea-bridge.com',
      subject: processedSubject,
      html: processedHtml,
      text: processedText
    });
  }

  private processTemplate(template: string, variables: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] || match;
    });
  }

  private async loadTemplate(templateId: string, language: string): Promise<EmailTemplate> {
    // Load template from file system or database
    const fs = require('fs').promises;
    const path = require('path');
    
    const templatePath = path.join(process.cwd(), 'templates', templateId, `${language}.json`);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    return JSON.parse(templateContent);
  }

  private async logEmail(logData: EmailLogData): Promise<void> {
    const db = await connectDB();
    await db.query(
      `INSERT INTO email_logs (to_email, from_email, subject, template_name, status, provider_id, error_message, sent_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        logData.to,
        logData.from,
        logData.subject,
        logData.templateName || null,
        logData.status,
        logData.providerId || null,
        logData.errorMessage || null,
        logData.status === 'sent' ? new Date() : null
      ]
    );
  }
}
```

## Contact Form Processing Flow

### Contact Form Handler
```typescript
// app/api/contact/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/email/EmailService';
import { validateRecaptcha } from '@/lib/recaptcha';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(2000),
  recaptchaToken: z.string(),
  language: z.enum(['en', 'ko', 'ja']).default('en')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Verify reCAPTCHA
    const recaptchaValid = await validateRecaptcha(
      validatedData.recaptchaToken,
      request.ip || 'unknown'
    );
    
    if (!recaptchaValid.success || recaptchaValid.score < 0.5) {
      return NextResponse.json({
        success: false,
        error: { code: 'RECAPTCHA_FAILED', message: 'reCAPTCHA verification failed' }
      }, { status: 400 });
    }

    // Save to database
    const db = await connectDB();
    const result = await db.query(
      `INSERT INTO contact_inquiries 
       (name, email, company, phone, subject, message, ip_address, user_agent, language_preference, recaptcha_score)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id`,
      [
        validatedData.name,
        validatedData.email,
        validatedData.company || null,
        validatedData.phone || null,
        validatedData.subject,
        validatedData.message,
        request.ip || null,
        request.headers.get('user-agent') || null,
        validatedData.language,
        recaptchaValid.score
      ]
    );

    const inquiryId = result.rows[0].id;
    const emailService = new EmailService();

    // Send auto-reply to user
    try {
      await emailService.sendTemplate(
        'contact-auto-reply',
        validatedData.email,
        {
          name: validatedData.name,
          subject: validatedData.subject,
          message: validatedData.message
        },
        validatedData.language
      );
    } catch (error) {
      console.error('Failed to send auto-reply:', error);
      // Don't fail the entire request if auto-reply fails
    }

    // Send notification to admin
    try {
      await emailService.sendTemplate(
        'admin-notification',
        process.env.ADMIN_EMAIL || 'admin@web3-korea-bridge.com',
        {
          name: validatedData.name,
          email: validatedData.email,
          company: validatedData.company || 'Not provided',
          phone: validatedData.phone || 'Not provided',
          subject: validatedData.subject,
          message: validatedData.message,
          adminUrl: process.env.ADMIN_URL || 'https://admin.web3-korea-bridge.com',
          inquiryId: inquiryId.toString()
        },
        'en' // Always send admin notifications in English
      );
    } catch (error) {
      console.error('Failed to send admin notification:', error);
    }

    return NextResponse.json({
      success: true,
      data: {
        message: 'Contact form submitted successfully',
        inquiryId
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid form data',
          details: error.errors
        }
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while processing your request'
      }
    }, { status: 500 });
  }
}
```

## Email Template Storage Strategy

### File-based Storage (Development)
```
templates/
├── contact-auto-reply/
│   ├── en.json
│   ├── ko.json
│   └── ja.json
├── admin-notification/
│   ├── en.json
│   ├── ko.json
│   └── ja.json
└── system-alert/
    ├── en.json
    ├── ko.json
    └── ja.json
```

### Database Storage (Production)
```sql
-- Email templates table
CREATE TABLE email_templates (
    id SERIAL PRIMARY KEY,
    template_key VARCHAR(100) NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    name VARCHAR(200) NOT NULL,
    subject VARCHAR(300) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT NOT NULL,
    variables TEXT[], -- Array of variable names
    category VARCHAR(50) DEFAULT 'general',
    is_active BOOLEAN DEFAULT TRUE,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(template_key, language_code)
);
```

## Environment Variables
```bash
# Email Service Configuration
RESEND_API_KEY=re_your_resend_api_key
SENDGRID_API_KEY=SG.your_sendgrid_api_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Default email settings
DEFAULT_FROM_EMAIL=noreply@web3-korea-bridge.com
ADMIN_EMAIL=admin@web3-korea-bridge.com
ADMIN_URL=https://admin.web3-korea-bridge.com

# reCAPTCHA
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
RECAPTCHA_MINIMUM_SCORE=0.5
```