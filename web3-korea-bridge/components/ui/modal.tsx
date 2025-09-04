'use client'

import React, { useEffect, useRef, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { Button } from './button'

const modalVariants = cva(
  'relative bg-background border rounded-lg shadow-lg',
  {
    variants: {
      size: {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  preventScroll?: boolean
  animate?: boolean
  animationPreset?: 'fade' | 'slide' | 'scale' | 'slideUp' | 'slideDown'
  overlayClassName?: string
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({
    isOpen,
    onClose,
    title,
    description,
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    preventScroll = true,
    animate = true,
    animationPreset = 'fade',
    overlayClassName,
    size,
    children,
    className,
    ...props
  }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)

    // Focus management
    useEffect(() => {
      if (isOpen) {
        previousActiveElement.current = document.activeElement as HTMLElement
        modalRef.current?.focus()
      } else {
        previousActiveElement.current?.focus()
      }
    }, [isOpen])

    // Escape key handler
    useEffect(() => {
      if (!closeOnEscape) return

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          onClose()
        }
      }

      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
      }
    }, [isOpen, closeOnEscape, onClose])

    // Prevent scroll
    useEffect(() => {
      if (!preventScroll) return

      if (isOpen) {
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = 'unset'
        }
      }
    }, [isOpen, preventScroll])

    // Focus trap
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        
        if (!focusableElements || focusableElements.length === 0) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose()
      }
    }

    // Animation variants
    const animationVariants = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      scale: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
      },
      slide: {
        initial: { opacity: 0, x: '100%' },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: '100%' },
      },
      slideUp: {
        initial: { opacity: 0, y: '100%' },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: '100%' },
      },
      slideDown: {
        initial: { opacity: 0, y: '-100%' },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: '-100%' },
      },
    }

    const overlayVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }

    const currentVariants = animationVariants[animationPreset]

    const modalContent = (
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleOverlayClick}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animate ? overlayVariants : undefined}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div 
              className={cn("fixed inset-0 bg-black/50 backdrop-blur-sm", overlayClassName)}
              variants={animate ? overlayVariants : undefined}
              transition={{ duration: 0.2 }}
            />
            
            {/* Modal */}
            <motion.div
              ref={modalRef}
              className={cn(modalVariants({ size }), className)}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              aria-describedby={description ? 'modal-description' : undefined}
              tabIndex={-1}
              onKeyDown={handleKeyDown}
              variants={animate ? currentVariants : undefined}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-6 pb-4">
              <div>
                {title && (
                  <h2 id="modal-title" className="text-lg font-semibold leading-none tracking-tight">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="text-sm text-muted-foreground mt-1">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-6 w-6 rounded-sm"
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

              {/* Content */}
              <div className={cn('p-6', (title || showCloseButton) && 'pt-0')}>
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )

    // Render portal
    return typeof window !== 'undefined' 
      ? createPortal(modalContent, document.body)
      : null
  }
)

Modal.displayName = 'Modal'

// Modal compound components
const ModalHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
))
ModalHeader.displayName = 'ModalHeader'

const ModalFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4', className)}
    {...props}
  />
))
ModalFooter.displayName = 'ModalFooter'

const ModalTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
ModalTitle.displayName = 'ModalTitle'

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

export { 
  Modal, 
  ModalHeader, 
  ModalFooter, 
  ModalTitle, 
  ModalDescription,
  modalVariants 
}