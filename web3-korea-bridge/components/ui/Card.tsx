'use client'

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  // Base styles from globals.css .card class with enhanced accessibility
  'card transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-card-foreground shadow-sm',
        glass: 'glass-effect border-white/20 text-foreground backdrop-blur-md',
        gradient: 'bg-gradient-to-br from-card via-card to-muted border-border/50',
        elevated: 'shadow-lg border-border/50 hover:shadow-xl',
        interactive: 'cursor-pointer hover:bg-accent/5 active:scale-[0.99]',
        outlined: 'border-2 border-primary/20 bg-background hover:border-primary/40',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-y-1 hover:shadow-lg',
        glow: 'hover:ring-2 hover:ring-primary/20 hover:shadow-primary/10 hover:shadow-lg',
        scale: 'hover:scale-[1.02]',
        float: 'hover:-translate-y-2 hover:shadow-xl',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: 'none',
      rounded: 'lg',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  animate?: boolean
  clickable?: boolean
  onCardClick?: () => void
  whileHover?: any
  whileTap?: any
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    padding, 
    hover, 
    rounded,
    animate = false,
    clickable = false,
    onCardClick,
    whileHover,
    whileTap,
    children,
    ...props 
  }, ref) => {
    const isInteractive = clickable || onCardClick || variant === 'interactive'
    
    const motionProps = animate ? {
      whileHover: whileHover || (hover === 'lift' ? { y: -4 } : hover === 'scale' ? { scale: 1.02 } : hover === 'float' ? { y: -8 } : {}),
      whileTap: whileTap || (isInteractive ? { scale: 0.99 } : {}),
      transition: { duration: 0.2, ease: 'easeOut' },
      layout: true,
    } : {}

    const finalVariant = isInteractive && variant === 'default' ? 'interactive' : variant
    
    const commonProps = {
      ref,
      className: cn(cardVariants({ variant: finalVariant, padding, hover, rounded, className })),
      onClick: onCardClick,
      role: isInteractive ? 'button' as const : undefined,
      tabIndex: isInteractive ? 0 : undefined,
      onKeyDown: isInteractive ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onCardClick?.()
        }
      } : undefined,
    }

    if (animate) {
      const MotionDiv = motion.div
      return (
        <MotionDiv
          {...commonProps}
          {...motionProps}
          {...(props as any)}
        >
          {children}
        </MotionDiv>
      )
    }

    return (
      <div
        {...commonProps}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 pb-4', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn('p-6 pt-0', className)} 
    {...props} 
  />
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants 
}