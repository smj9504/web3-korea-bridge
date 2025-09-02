// Common types used across the application

export type Locale = 'en' | 'ko';

export interface MultiLanguageText {
  en: string;
  ko: string;
}

export interface SEOData {
  title?: MultiLanguageText;
  description?: MultiLanguageText;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'blog';
  twitterCard?: 'summary' | 'summary_large_image';
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface ImageUpload {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  alt?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  recaptchaToken: string;
}

export interface NewsletterSubscription {
  email: string;
  locale: Locale;
  recaptchaToken?: string;
}

// Status types
export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type ContactStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'SPAM';
export type UserRole = 'USER' | 'EDITOR' | 'ADMIN';

// Filter and search types
export interface SearchFilters {
  category?: string;
  tag?: string;
  author?: string;
  status?: PostStatus;
  featured?: boolean;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface SortOption {
  label: string;
  value: string;
  field: string;
  order: 'asc' | 'desc';
}

// Form validation types
export interface FormFieldError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: FormFieldError[];
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

// Theme and UI types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface MenuItem {
  label: MultiLanguageText;
  href: string;
  icon?: string;
  children?: MenuItem[];
  external?: boolean;
  protected?: boolean;
}

export interface StatsCard {
  title: MultiLanguageText;
  value: number | string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LinkProps extends BaseComponentProps {
  href: string;
  external?: boolean;
  locale?: Locale;
}

// Error types
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export interface ErrorInfo {
  statusCode: number;
  message: string;
  stack?: string;
  timestamp: string;
  url?: string;
  userAgent?: string;
}