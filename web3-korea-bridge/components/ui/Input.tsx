'use client'

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

const inputVariants = cva(
  'flex w-full rounded-md border transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input bg-background hover:border-input/80 focus:border-ring',
        ghost: 'border-transparent bg-transparent hover:bg-accent/50',
        filled: 'border-transparent bg-muted hover:bg-muted/80 focus:bg-background focus:border-ring',
        outlined: 'border-2 border-muted-foreground/25 bg-transparent hover:border-muted-foreground/40 focus:border-ring',
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-md',
        md: 'h-10 px-3 text-sm rounded-md',
        lg: 'h-11 px-4 text-base rounded-lg',
        xl: 'h-12 px-4 text-lg rounded-lg',
      },
      state: {
        default: 'border-input',
        error: 'border-destructive focus-visible:ring-destructive ring-destructive/20',
        success: 'border-green-500 focus-visible:ring-green-500 ring-green-500/20',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500 ring-yellow-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  success?: string
  warning?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showPasswordToggle?: boolean
  loading?: boolean
  clearable?: boolean
  onClear?: () => void
  containerClassName?: string
  labelClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    variant,
    size,
    state,
    label,
    error,
    success,
    warning,
    hint,
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    loading = false,
    clearable = false,
    onClear,
    containerClassName,
    labelClassName,
    disabled,
    value,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type

    // Determine state based on error/success/warning
    const currentState = error ? 'error' : success ? 'success' : warning ? 'warning' : state
    
    const showClearButton = clearable && value && !disabled && !loading
    const hasRightContent = rightIcon || showPasswordToggle || showClearButton || loading

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label 
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error && 'text-destructive',
              success && 'text-green-600',
              warning && 'text-yellow-600',
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              inputVariants({ variant, size, state: currentState }),
              leftIcon && 'pl-10',
              hasRightContent && 'pr-10',
              className
            )}
            ref={ref}
            disabled={disabled || loading}
            value={value}
            {...props}
          />

          {hasRightContent && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {loading && (
                <div className="animate-spin h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full" />
              )}
              {showClearButton && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded"
                  aria-label="Clear input"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {showPasswordToggle && type === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded"
                  disabled={disabled}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
              {rightIcon && !showPasswordToggle && (
                <span className="text-muted-foreground">{rightIcon}</span>
              )}
            </div>
          )}
        </div>

        {(error || success || warning || hint) && (
          <div className="flex items-center space-x-1 text-xs">
            {error && (
              <>
                <AlertCircle className="h-3 w-3 text-destructive" />
                <span className="text-destructive">{error}</span>
              </>
            )}
            {success && !error && (
              <>
                <svg className="h-3 w-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-600">{success}</span>
              </>
            )}
            {warning && !error && !success && (
              <>
                <svg className="h-3 w-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-yellow-600">{warning}</span>
              </>
            )}
            {!error && !success && !warning && hint && (
              <span className="text-muted-foreground">{hint}</span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Textarea Component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof inputVariants>, 'size'> {
  label?: string
  error?: string
  success?: string
  hint?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className,
    variant,
    state,
    label,
    error,
    success,
    hint,
    resize = 'vertical',
    ...props 
  }, ref) => {
    // Determine state based on error/success
    const currentState = error ? 'error' : success ? 'success' : state

    return (
      <div className="space-y-2">
        {label && (
          <label 
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error && 'text-destructive'
            )}
          >
            {label}
          </label>
        )}
        
        <textarea
          className={cn(
            inputVariants({ variant, state: currentState }),
            'min-h-[80px] px-3 py-2',
            resize === 'none' && 'resize-none',
            resize === 'vertical' && 'resize-y',
            resize === 'horizontal' && 'resize-x',
            resize === 'both' && 'resize',
            className
          )}
          ref={ref}
          {...props}
        />

        {(error || success || hint) && (
          <div className="flex items-center space-x-1 text-xs">
            {error && (
              <>
                <AlertCircle className="h-3 w-3 text-destructive" />
                <span className="text-destructive">{error}</span>
              </>
            )}
            {success && (
              <span className="text-green-600">{success}</span>
            )}
            {!error && !success && hint && (
              <span className="text-muted-foreground">{hint}</span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Input, Textarea, inputVariants }