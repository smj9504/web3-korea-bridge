'use client'

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const loadingVariants = cva(
  'animate-spin',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  text?: string
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, text, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center', className)}
        {...props}
      >
        <div className="flex items-center space-x-2">
          <Loader2 className={cn(loadingVariants({ size }))} />
          {text && <span className="text-sm text-muted-foreground">{text}</span>}
        </div>
      </div>
    )
  }
)

LoadingSpinner.displayName = 'LoadingSpinner'

// Skeleton Loading Component
const skeletonVariants = cva(
  'animate-pulse rounded-md bg-muted',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        circle: 'rounded-full bg-muted',
        text: 'h-4 bg-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

// Dots Loading Animation
export interface LoadingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const LoadingDots = forwardRef<HTMLDivElement, LoadingDotsProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const dotSize = {
      sm: 'w-1 h-1',
      md: 'w-1.5 h-1.5',
      lg: 'w-2 h-2',
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center space-x-1', className)}
        {...props}
      >
        <div 
          className={cn(
            'bg-current rounded-full animate-pulse',
            dotSize[size]
          )}
          style={{ animationDelay: '0ms' }}
        />
        <div 
          className={cn(
            'bg-current rounded-full animate-pulse',
            dotSize[size]
          )}
          style={{ animationDelay: '150ms' }}
        />
        <div 
          className={cn(
            'bg-current rounded-full animate-pulse',
            dotSize[size]
          )}
          style={{ animationDelay: '300ms' }}
        />
      </div>
    )
  }
)

LoadingDots.displayName = 'LoadingDots'

// Page Loading Component
export interface PageLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
}

const PageLoading = forwardRef<HTMLDivElement, PageLoadingProps>(
  ({ className, title = 'Loading...', subtitle, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center min-h-[400px] space-y-4',
          className
        )}
        {...props}
      >
        <LoadingSpinner size="xl" />
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    )
  }
)

PageLoading.displayName = 'PageLoading'

// Card Skeleton Template
export interface CardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showAvatar?: boolean
  showHeader?: boolean
  lines?: number
}

const CardSkeleton = forwardRef<HTMLDivElement, CardSkeletonProps>(
  ({ className, showAvatar = false, showHeader = true, lines = 3, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('card p-6 space-y-4', className)}
        {...props}
      >
        {showHeader && (
          <div className="flex items-center space-x-4">
            {showAvatar && (
              <Skeleton variant="circle" width={40} height={40} />
            )}
            <div className="flex-1 space-y-2">
              <Skeleton height={16} width="60%" />
              <Skeleton height={12} width="40%" />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              height={12}
              width={index === lines - 1 ? '70%' : '100%'}
            />
          ))}
        </div>
      </div>
    )
  }
)

CardSkeleton.displayName = 'CardSkeleton'

export { 
  LoadingSpinner, 
  Skeleton, 
  LoadingDots, 
  PageLoading, 
  CardSkeleton,
  loadingVariants,
  skeletonVariants 
}