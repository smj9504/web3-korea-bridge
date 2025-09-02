'use client'

import { useEffect, useRef } from 'react'

/**
 * Hook for managing keyboard navigation in components
 * Provides utilities for focus management and keyboard event handling
 */
export function useKeyboardNavigation() {
  const elementRef = useRef<HTMLElement>(null)

  /**
   * Handle arrow key navigation for lists or grids
   */
  const handleArrowNavigation = (
    event: KeyboardEvent,
    direction: 'horizontal' | 'vertical' | 'grid' = 'vertical',
    options?: {
      selector?: string
      loop?: boolean
      onActivate?: (element: HTMLElement) => void
    }
  ) => {
    const { selector = '[data-focusable="true"], button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])', loop = false, onActivate } = options || {}
    
    if (!elementRef.current) return

    const focusableElements = Array.from(elementRef.current.querySelectorAll(selector)) as HTMLElement[]
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
    
    if (currentIndex === -1) return

    let nextIndex = currentIndex

    switch (direction) {
      case 'horizontal':
        if (event.key === 'ArrowRight') {
          nextIndex = currentIndex + 1
        } else if (event.key === 'ArrowLeft') {
          nextIndex = currentIndex - 1
        }
        break
        
      case 'vertical':
        if (event.key === 'ArrowDown') {
          nextIndex = currentIndex + 1
        } else if (event.key === 'ArrowUp') {
          nextIndex = currentIndex - 1
        }
        break
        
      case 'grid':
        // For grid navigation, you'd need to pass columns count
        // This is a simplified version
        if (event.key === 'ArrowRight') {
          nextIndex = currentIndex + 1
        } else if (event.key === 'ArrowLeft') {
          nextIndex = currentIndex - 1
        } else if (event.key === 'ArrowDown') {
          // Assuming 3 columns for example
          nextIndex = currentIndex + 3
        } else if (event.key === 'ArrowUp') {
          nextIndex = currentIndex - 3
        }
        break
    }

    // Handle looping
    if (loop) {
      if (nextIndex >= focusableElements.length) {
        nextIndex = 0
      } else if (nextIndex < 0) {
        nextIndex = focusableElements.length - 1
      }
    } else {
      nextIndex = Math.max(0, Math.min(nextIndex, focusableElements.length - 1))
    }

    const nextElement = focusableElements[nextIndex]
    if (nextElement && nextIndex !== currentIndex) {
      event.preventDefault()
      nextElement.focus()
      onActivate?.(nextElement)
    }
  }

  /**
   * Handle Enter and Space key activation
   */
  const handleActivation = (
    event: KeyboardEvent,
    onActivate: (element: HTMLElement, event: KeyboardEvent) => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const target = event.target as HTMLElement
      onActivate(target, event)
    }
  }

  /**
   * Focus the first focusable element
   */
  const focusFirst = (selector?: string) => {
    if (!elementRef.current) return
    
    const defaultSelector = '[data-focusable="true"], button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
    const firstElement = elementRef.current.querySelector(selector || defaultSelector) as HTMLElement
    firstElement?.focus()
  }

  /**
   * Focus the last focusable element
   */
  const focusLast = (selector?: string) => {
    if (!elementRef.current) return
    
    const defaultSelector = '[data-focusable="true"], button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
    const elements = Array.from(elementRef.current.querySelectorAll(selector || defaultSelector)) as HTMLElement[]
    const lastElement = elements[elements.length - 1]
    lastElement?.focus()
  }

  return {
    elementRef,
    handleArrowNavigation,
    handleActivation,
    focusFirst,
    focusLast
  }
}

/**
 * Hook for managing focus trap in modals and dropdowns
 */
export function useFocusTrap(isActive: boolean = false) {
  const trapRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isActive || !trapRef.current) return

    const element = trapRef.current
    const focusableElements = element.querySelectorAll(
      'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }

    // Focus the first element when trap becomes active
    firstElement?.focus()

    element.addEventListener('keydown', handleTabKey)
    return () => element.removeEventListener('keydown', handleTabKey)
  }, [isActive])

  return { trapRef }
}

/**
 * Hook for handling escape key
 */
export function useEscapeKey(callback: () => void, isActive: boolean = true) {
  useEffect(() => {
    if (!isActive) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [callback, isActive])
}