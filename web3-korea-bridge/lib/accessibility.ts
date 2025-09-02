/**
 * Accessibility utilities for Web3 Korea Bridge
 * Provides helper functions for improving component accessibility
 */

/**
 * Generate a unique ID for accessibility attributes
 */
export function generateId(prefix: string = 'ui'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Announce text to screen readers
 * Creates a live region to announce dynamic content changes
 */
export function announceToScreenReader(
  message: string, 
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.setAttribute('role', priority === 'assertive' ? 'alert' : 'status')
  announcement.style.position = 'absolute'
  announcement.style.left = '-10000px'
  announcement.style.width = '1px'
  announcement.style.height = '1px'
  announcement.style.overflow = 'hidden'
  
  document.body.appendChild(announcement)
  announcement.textContent = message
  
  // Clean up after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Get appropriate ARIA attributes for form validation states
 */
export function getValidationAria(
  error?: string,
  success?: string,
  hint?: string,
  fieldId?: string
) {
  const describedBy: string[] = []
  const attributes: Record<string, string> = {}

  if (error) {
    attributes['aria-invalid'] = 'true'
    if (fieldId) {
      const errorId = `${fieldId}-error`
      describedBy.push(errorId)
      attributes['aria-errormessage'] = errorId
    }
  }

  if (success && fieldId) {
    describedBy.push(`${fieldId}-success`)
  }

  if (hint && fieldId) {
    describedBy.push(`${fieldId}-hint`)
  }

  if (describedBy.length > 0) {
    attributes['aria-describedby'] = describedBy.join(' ')
  }

  return attributes
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get contrast ratio between two colors
 * Useful for ensuring WCAG compliance
 */
export function getContrastRatio(color1: string, color2: string): number {
  // This is a simplified implementation
  // In a real application, you'd use a more robust color contrast calculation
  const getLuminance = (color: string): number => {
    // Convert hex to RGB and calculate relative luminance
    // This is a placeholder - implement full WCAG contrast calculation
    return 0.5 // Placeholder return
  }

  const l1 = getLuminance(color1)
  const l2 = getLuminance(color2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if an element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element)
  
  return !(
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    style.opacity === '0' ||
    element.getAttribute('aria-hidden') === 'true' ||
    element.hasAttribute('hidden')
  )
}

/**
 * Focus management utilities
 */
export const focusUtils = {
  /**
   * Save current focus and return a function to restore it
   */
  saveFocus(): () => void {
    const activeElement = document.activeElement as HTMLElement
    return () => {
      if (activeElement && typeof activeElement.focus === 'function') {
        activeElement.focus()
      }
    }
  },

  /**
   * Focus the first focusable element in a container
   */
  focusFirst(container: HTMLElement): boolean {
    const focusable = container.querySelector(
      'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement

    if (focusable) {
      focusable.focus()
      return true
    }
    return false
  },

  /**
   * Check if an element is focusable
   */
  isFocusable(element: HTMLElement): boolean {
    const focusableSelectors = [
      'button:not(:disabled)',
      '[href]',
      'input:not(:disabled)',
      'select:not(:disabled)', 
      'textarea:not(:disabled)',
      '[tabindex]:not([tabindex="-1"])'
    ]

    return focusableSelectors.some(selector => 
      element.matches(selector)
    ) && isVisibleToScreenReader(element)
  }
}

/**
 * ARIA live region manager
 * Manages live regions for dynamic content announcements
 */
export class LiveRegionManager {
  private static instance: LiveRegionManager
  private regions: Map<string, HTMLElement> = new Map()

  static getInstance(): LiveRegionManager {
    if (!LiveRegionManager.instance) {
      LiveRegionManager.instance = new LiveRegionManager()
    }
    return LiveRegionManager.instance
  }

  private constructor() {
    if (typeof window !== 'undefined') {
      this.createDefaultRegions()
    }
  }

  private createDefaultRegions(): void {
    // Create polite live region
    const politeRegion = document.createElement('div')
    politeRegion.id = 'live-region-polite'
    politeRegion.setAttribute('aria-live', 'polite')
    politeRegion.setAttribute('aria-atomic', 'true')
    politeRegion.style.position = 'absolute'
    politeRegion.style.left = '-10000px'
    politeRegion.style.width = '1px'
    politeRegion.style.height = '1px'
    politeRegion.style.overflow = 'hidden'
    
    document.body.appendChild(politeRegion)
    this.regions.set('polite', politeRegion)

    // Create assertive live region
    const assertiveRegion = document.createElement('div')
    assertiveRegion.id = 'live-region-assertive'
    assertiveRegion.setAttribute('aria-live', 'assertive')
    assertiveRegion.setAttribute('aria-atomic', 'true')
    assertiveRegion.style.position = 'absolute'
    assertiveRegion.style.left = '-10000px'
    assertiveRegion.style.width = '1px'
    assertiveRegion.style.height = '1px'
    assertiveRegion.style.overflow = 'hidden'
    
    document.body.appendChild(assertiveRegion)
    this.regions.set('assertive', assertiveRegion)
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const region = this.regions.get(priority)
    if (region) {
      // Clear previous message
      region.textContent = ''
      // Set new message after a brief delay to ensure screen readers pick it up
      setTimeout(() => {
        region.textContent = message
      }, 100)
    }
  }
}

/**
 * Hook-like function for managing accessible descriptions
 */
export function createAccessibleDescription(
  options: {
    error?: string
    success?: string  
    hint?: string
    baseId: string
  }
): {
  describedBy: string
  errorId?: string
  successId?: string
  hintId?: string
} {
  const { error, success, hint, baseId } = options
  const describedBy: string[] = []
  const result: {
    describedBy: string
    errorId?: string
    successId?: string
    hintId?: string
  } = { describedBy: '' }

  if (error) {
    result.errorId = `${baseId}-error`
    describedBy.push(result.errorId)
  }

  if (success) {
    result.successId = `${baseId}-success`
    describedBy.push(result.successId)
  }

  if (hint) {
    result.hintId = `${baseId}-hint`
    describedBy.push(result.hintId)
  }

  result.describedBy = describedBy.join(' ')
  return result
}