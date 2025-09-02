# UI Components - Web3 Korea Bridge Design System

A comprehensive collection of reusable React components built with TypeScript, Tailwind CSS, Framer Motion, and class-variance-authority. All components follow accessibility best practices, include smooth animations, and support the project's design tokens.

## 🎨 Design System

All components are built using the established design tokens from `globals.css`:

### CSS Custom Properties
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground` 
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`

### Base Classes
- `.btn-primary` - Primary button styling
- `.card` - Card container styling
- `.glass-effect` - Glass morphism effect
- `.gradient-text` - Gradient text styling

## ✨ New Features & Enhancements

### 🎬 Framer Motion Integration
All components now include smooth, performant animations:
- **Hover animations** - Scale, lift, glow effects
- **Page transitions** - Smooth enter/exit animations
- **Interactive feedback** - Tap and focus animations
- **Customizable** - Control animation behavior per component

### 🎯 Enhanced Accessibility
- **ARIA attributes** - Comprehensive screen reader support
- **Keyboard navigation** - Full keyboard accessibility
- **Focus management** - Proper focus trapping and restoration
- **Color contrast** - WCAG compliant color combinations

### 🔧 Improved Developer Experience
- **Better TypeScript types** - Enhanced type safety and IntelliSense
- **More variants** - Additional styling options for all components
- **Flexible props** - Granular control over component behavior
- **Performance optimized** - Minimal re-renders and bundle impact

## 🧩 Components

### Button
A versatile button component with animations and enhanced variants.

**New Features:**
- `gradient` and `glass` variants
- `fullWidth` prop for full-width buttons
- `loadingText` for custom loading messages
- `tooltip` prop for accessible tooltips
- `animate` prop to control Framer Motion animations

**Props:**
- `variant`: `primary` | `secondary` | `outline` | `ghost` | `destructive` | `link` | `gradient` | `glass`
- `size`: `sm` | `md` | `lg` | `xl` | `icon`
- `fullWidth`: boolean - Full width button
- `loading`: boolean - Shows loading spinner
- `loadingText`: string - Custom loading text
- `tooltip`: string - Accessible tooltip
- `animate`: boolean - Enable animations (default: true)
- `leftIcon`, `rightIcon`: React.ReactNode - Icon components

**Example:**
```tsx
import { Button } from '@/components/ui'
import { Mail } from 'lucide-react'

<Button 
  variant="gradient" 
  size="lg" 
  leftIcon={<Mail className="h-4 w-4" />}
  tooltip="Send email to user"
  loading={isLoading}
  loadingText="Sending..."
>
  Send Email
</Button>
```

### Card
Enhanced card component with animations and new interaction patterns.

**New Features:**
- `interactive` and `outlined` variants
- `clickable` prop with keyboard navigation
- `animate` prop for Framer Motion effects
- Additional `rounded` sizes (none, sm, md, lg, xl, full)
- Enhanced hover effects (`lift`, `glow`, `scale`, `float`)

**Props:**
- `variant`: `default` | `glass` | `gradient` | `elevated` | `interactive` | `outlined`
- `padding`: `none` | `sm` | `md` | `lg` | `xl`
- `hover`: `none` | `lift` | `glow` | `scale` | `float`
- `rounded`: `none` | `sm` | `md` | `lg` | `xl` | `full`
- `animate`: boolean - Enable animations
- `clickable`: boolean - Make card interactive
- `onCardClick`: () => void - Click handler

**Sub-components:**
- `CardHeader` - Card header section
- `CardTitle` - Card title component
- `CardDescription` - Card description text
- `CardContent` - Card content area
- `CardFooter` - Card footer section

**Example:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

<Card 
  variant="elevated" 
  hover="float" 
  animate={true}
  clickable
  onCardClick={() => navigate('/article')}
>
  <CardHeader>
    <CardTitle>Featured Article</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Click to read more...</p>
  </CardContent>
</Card>
```

### Input
Comprehensive input component with enhanced features and states.

**New Features:**
- `warning` state for input validation
- `outlined` variant for emphasized inputs
- `clearable` prop with clear functionality
- `loading` state for async operations
- Enhanced icon positioning and sizing
- `xl` size for larger forms

**Props:**
- `variant`: `default` | `ghost` | `filled` | `outlined`
- `size`: `sm` | `md` | `lg` | `xl`
- `state`: `default` | `error` | `success` | `warning`
- `label`: string - Input label
- `error`: string - Error message
- `success`: string - Success message
- `warning`: string - Warning message
- `hint`: string - Helper text
- `loading`: boolean - Loading state
- `clearable`: boolean - Show clear button
- `onClear`: () => void - Clear handler
- `containerClassName`: string - Container styling
- `labelClassName`: string - Label styling

**Example:**
```tsx
import { Input } from '@/components/ui'
import { Search } from 'lucide-react'

<Input
  label="Search Products"
  placeholder="Type to search..."
  leftIcon={<Search className="h-4 w-4" />}
  clearable
  loading={isSearching}
  onClear={() => setSearchQuery('')}
  warning={hasTypos ? 'Did you mean something else?' : undefined}
/>
```

### Textarea
Enhanced textarea component with validation states.

**Props:**
- `variant`: `default` | `ghost` | `filled` | `outlined`
- `state`: `default` | `error` | `success` | `warning`
- `label`: string - Textarea label
- `error`: string - Error message
- `success`: string - Success message
- `warning`: string - Warning message
- `hint`: string - Helper text
- `resize`: `none` | `vertical` | `horizontal` | `both`

### Modal
Enhanced modal with animations and improved accessibility.

**New Features:**
- **Framer Motion animations** with presets
- `animationPreset`: `fade` | `scale` | `slide` | `slideUp` | `slideDown`
- Improved focus management and ARIA attributes
- Custom overlay styling
- Better keyboard navigation

**Props:**
- `isOpen`: boolean - Modal open state
- `onClose`: () => void - Close handler
- `title`: string - Modal title
- `description`: string - Modal description
- `size`: `sm` | `md` | `lg` | `xl` | `full`
- `animate`: boolean - Enable animations (default: true)
- `animationPreset`: Animation style
- `overlayClassName`: string - Custom overlay styling

**Sub-components:**
- `ModalHeader` - Modal header section
- `ModalTitle` - Modal title component
- `ModalDescription` - Modal description
- `ModalFooter` - Modal footer section

**Example:**
```tsx
import { Modal, Button } from '@/components/ui'

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Delete Item"
  description="This action cannot be undone."
  animate={true}
  animationPreset="scale"
  size="md"
>
  <div className="flex justify-end space-x-2">
    <Button variant="outline" onClick={onClose}>Cancel</Button>
    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
  </div>
</Modal>
```

### Badge
Enhanced badge component with more variants and states.

**Props:**
- `variant`: `default` | `secondary` | `destructive` | `success` | `warning` | `info` | `outline`
- `size`: `sm` | `md` | `lg`
- `icon`: React.ReactNode - Optional icon
- `removable`: boolean - Show remove button
- `onRemove`: () => void - Remove handler

**Specialized Components:**
- `StatusBadge` - Status indicators (online, offline, away, etc.)
- `NotificationBadge` - Number indicators with count

**Example:**
```tsx
import { Badge, StatusBadge, NotificationBadge } from '@/components/ui'

<Badge variant="success">Active</Badge>
<StatusBadge status="online" />
<NotificationBadge count={5} />
```

### Loading Components
Comprehensive loading states with smooth animations.

**Components:**
- `LoadingSpinner` - Spinning loader with customizable sizes
- `Skeleton` - Flexible placeholder components
- `LoadingDots` - Elegant animated dot loader
- `PageLoading` - Full page loading state
- `CardSkeleton` - Card-shaped skeleton templates

**Example:**
```tsx
import { LoadingSpinner, Skeleton, CardSkeleton } from '@/components/ui'

<LoadingSpinner size="lg" text="Loading..." />
<Skeleton height={20} width="100%" />
<CardSkeleton showAvatar showHeader lines={3} />
```

## 🎯 Design Principles

### Animation Philosophy
- **Purposeful** - Animations enhance usability
- **Performant** - 60fps smooth animations
- **Respectful** - Respects user preferences (prefers-reduced-motion)
- **Consistent** - Unified timing and easing functions

### Accessibility First
- **WCAG 2.1 AA compliance** - Meets accessibility standards
- **Keyboard navigation** - Full keyboard support
- **Screen readers** - Comprehensive ARIA implementation
- **Focus management** - Proper focus handling
- **Color contrast** - High contrast ratios

### Developer Experience
- **Type safety** - Full TypeScript support with IntelliSense
- **Flexible APIs** - Granular control over behavior
- **Performance** - Optimized for minimal bundle impact
- **Documentation** - Comprehensive examples and guides

## 🚀 Usage

### Basic Import
```tsx
import { 
  Button, 
  Card, 
  Input, 
  Modal, 
  Badge, 
  LoadingSpinner 
} from '@/components/ui'
```

### Animation Control
```tsx
// Enable animations (default)
<Button animate={true} variant="gradient">Animated Button</Button>

// Disable animations
<Card animate={false} hover="lift">Static Card</Card>

// Custom animation props
<Modal 
  animate={true} 
  animationPreset="slideUp"
  isOpen={isOpen}
  onClose={onClose}
>
  Modal Content
</Modal>
```

### Accessibility Features
```tsx
// Proper labeling and ARIA
<Input 
  label="Email Address"
  aria-describedby="email-hint"
  error="Please enter a valid email"
/>

// Keyboard navigation
<Card 
  clickable 
  onCardClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleClick()
  }}
>
  Interactive Card
</Card>

// Focus management
<Modal 
  isOpen={isOpen}
  onClose={onClose}
  title="Accessible Modal"
  description="Proper focus management included"
>
  Content
</Modal>
```

## 🔧 Customization

### Variant Extension
```tsx
// Extend button variants in Button.tsx
const buttonVariants = cva(
  // base styles
  '...',
  {
    variants: {
      variant: {
        // existing variants...
        custom: 'your-custom-styles-here'
      }
    }
  }
)
```

### Animation Customization
```tsx
// Custom animation variants
<motion.div
  whileHover={{ scale: 1.05, rotate: 2 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Custom Animation
</motion.div>
```

## 📱 Responsive Design

All components include:
- **Mobile-first** responsive breakpoints
- **Touch-friendly** tap targets (44px minimum)
- **Flexible layouts** that adapt to screen sizes
- **Optimized performance** on mobile devices

## 🧪 Testing

### Component Testing
```bash
# Start development server
npm run dev

# Visit examples page
http://localhost:3003/examples
```

### Accessibility Testing
- Screen reader testing with NVDA/JAWS
- Keyboard navigation testing
- Color contrast validation
- Focus management verification

## 📊 Performance

### Bundle Optimization
- **Tree-shakeable** exports
- **Code splitting** ready
- **Minimal dependencies**
- **Optimized animations**

### Runtime Performance
- **Efficient re-renders**
- **Memoized components**
- **Optimized event handlers**
- **Smooth 60fps animations**

## 🔄 Migration Guide

### From Previous Version
```tsx
// Old usage
<Button variant="primary" className="hover:scale-105">

// New usage
<Button variant="primary" animate={true}>
```

### Animation Migration
```tsx
// Replace CSS transitions with animate prop
<Card hover="lift" animate={true}>
```

## 🎨 Theme Integration

Components automatically adapt to the project's theme system:
- **CSS custom properties** - Uses established design tokens
- **Dark/light mode** - Automatic theme switching with next-themes
- **Consistent styling** - Maintains visual hierarchy across themes

## 🚀 Development Server

Test all components on the development server:
```bash
npm run dev
# Visit: http://localhost:3003/examples
```

All components are ready for production use with full TypeScript support, accessibility compliance, and smooth animations!