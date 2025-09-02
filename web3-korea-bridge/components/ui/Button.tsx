'use client'

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  // Base styles with improved accessibility and focus states
  'relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md active:scale-[0.98]',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md',
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
        gradient: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl',
        glass: 'glass-effect text-foreground hover:bg-white/20 border border-white/20 backdrop-blur-sm',
      },
      size: {
        sm: 'h-9 px-3 text-xs rounded-md',
        md: 'h-10 px-4 py-2 text-sm rounded-md',
        lg: 'h-11 px-8 text-base rounded-lg',
        xl: 'h-12 px-10 text-lg rounded-lg',
        icon: 'h-10 w-10 rounded-md',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean
  animate?: boolean
  loadingText?: string
  tooltip?: string
  whileHover?: any
  whileTap?: any
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size,
    fullWidth,
    loading = false, 
    leftIcon, 
    rightIcon, 
    children, 
    disabled,
    animate = true,
    loadingText,
    tooltip,
    whileHover,
    whileTap,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    const buttonContent = (
      <>
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!loading && leftIcon && (
          <span className="mr-2 flex-shrink-0">{leftIcon}</span>
        )}
        <span className={loading ? 'opacity-0' : ''}>
          {loading && loadingText ? loadingText : children}
        </span>
        {!loading && rightIcon && (
          <span className="ml-2 flex-shrink-0">{rightIcon}</span>
        )}
      </>
    )

    const motionProps = animate ? {
      whileHover: whileHover || { scale: variant === 'link' ? 1 : 1.02 },
      whileTap: whileTap || { scale: variant === 'link' ? 1 : 0.98 },
      transition: { duration: 0.15 }
    } : {}

    const ButtonComponent = animate ? motion.button : 'button'

    if (animate) {
      const MotionButton = motion.button
      return (
        <MotionButton
          ref={ref}
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          disabled={isDisabled}
          title={tooltip}
          aria-label={loading ? `Loading: ${loadingText || children}` : undefined}
          {...motionProps}
          {...(props as any)}
        >
          {buttonContent}
        </MotionButton>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isDisabled}
        title={tooltip}
        aria-label={loading ? `Loading: ${loadingText || children}` : undefined}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {buttonContent}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }