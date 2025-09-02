'use client'

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        success: 'border-transparent bg-green-500 text-white',
        warning: 'border-transparent bg-yellow-500 text-white',
        info: 'border-transparent bg-blue-500 text-white',
        outline: 'text-foreground',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, icon, removable, onRemove, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(badgeVariants({ variant, size }), className)} 
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
        {removable && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 rounded-full hover:bg-black/20 p-0.5 transition-colors"
            aria-label="Remove badge"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

// Status Badge - Specialized component for status indication
export interface StatusBadgeProps 
  extends Omit<BadgeProps, 'variant'> {
  status: 'online' | 'offline' | 'away' | 'busy' | 'pending' | 'success' | 'error' | 'warning'
  showDot?: boolean
}

const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, showDot = true, className, children, ...props }, ref) => {
    const statusConfig = {
      online: { variant: 'success' as const, color: 'bg-green-500', label: 'Online' },
      offline: { variant: 'secondary' as const, color: 'bg-gray-500', label: 'Offline' },
      away: { variant: 'warning' as const, color: 'bg-yellow-500', label: 'Away' },
      busy: { variant: 'destructive' as const, color: 'bg-red-500', label: 'Busy' },
      pending: { variant: 'warning' as const, color: 'bg-yellow-500', label: 'Pending' },
      success: { variant: 'success' as const, color: 'bg-green-500', label: 'Success' },
      error: { variant: 'destructive' as const, color: 'bg-red-500', label: 'Error' },
      warning: { variant: 'warning' as const, color: 'bg-yellow-500', label: 'Warning' },
    }

    const config = statusConfig[status]

    return (
      <Badge
        ref={ref}
        variant={config.variant}
        className={className}
        {...props}
      >
        {showDot && (
          <span
            className={cn(
              'mr-1.5 h-2 w-2 rounded-full',
              config.color
            )}
            aria-hidden="true"
          />
        )}
        {children || config.label}
      </Badge>
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

// Notification Badge - For counts/numbers
export interface NotificationBadgeProps
  extends Omit<BadgeProps, 'variant' | 'children'> {
  count: number
  max?: number
  showZero?: boolean
}

const NotificationBadge = forwardRef<HTMLDivElement, NotificationBadgeProps>(
  ({ count, max = 99, showZero = false, className, ...props }, ref) => {
    if (count <= 0 && !showZero) return null

    const displayCount = count > max ? `${max}+` : count.toString()

    return (
      <Badge
        ref={ref}
        variant="destructive"
        size="sm"
        className={cn(
          'min-w-[1.25rem] h-5 flex items-center justify-center p-0',
          count > 99 && 'px-1',
          className
        )}
        {...props}
      >
        {displayCount}
      </Badge>
    )
  }
)

NotificationBadge.displayName = 'NotificationBadge'

export { Badge, StatusBadge, NotificationBadge, badgeVariants }