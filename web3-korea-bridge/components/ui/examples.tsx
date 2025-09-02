/**
 * UI Component Usage Examples - Web3 Korea Bridge
 * 
 * This file demonstrates how to use the UI components in your application.
 * All components follow the established design system and support i18n.
 */

'use client'

import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  Input,
  Textarea,
  Modal,
  Badge,
  StatusBadge,
  NotificationBadge,
  LoadingSpinner,
  Skeleton,
  PageLoading,
  CardSkeleton
} from './index'
import { Search, Mail, Star, Settings, Bell } from 'lucide-react'

export function ComponentExamples() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold gradient-text">UI Components Examples</h1>
      
      {/* Button Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="glass">Glass</Button>
          <Button variant="link">Link</Button>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button leftIcon={<Mail className="h-4 w-4" />}>With Icon</Button>
          <Button rightIcon={<Star className="h-4 w-4" />}>Right Icon</Button>
          <Button loading loadingText="Processing...">Loading</Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth variant="gradient">Full Width</Button>
        </div>
      </section>

      {/* Card Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="default" animate hover="lift">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard card with lift animation</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card demonstrates the default style with smooth hover lift animation.</p>
            </CardContent>
          </Card>

          <Card variant="glass" animate hover="glow">
            <CardHeader>
              <CardTitle>Glass Effect</CardTitle>
              <CardDescription>Card with glass morphism effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Beautiful glass effect with glow hover animation and backdrop blur.</p>
            </CardContent>
          </Card>

          <Card variant="elevated" animate hover="float">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Card with floating hover effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Enhanced shadow with floating hover animation for premium feel.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="gradient">Action</Button>
            </CardFooter>
          </Card>
          
          <Card variant="interactive" animate clickable onCardClick={() => alert('Card clicked!')}>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Clickable card with interactive states</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card is clickable and includes proper keyboard navigation and ARIA attributes.</p>
            </CardContent>
          </Card>
          
          <Card variant="outlined" animate hover="scale" rounded="xl">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>Card with border and scale animation</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Outlined variant with scale hover effect and extra large border radius.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Input Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input 
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              leftIcon={<Mail className="h-4 w-4" />}
            />
            
            <Input 
              label="Search"
              placeholder="Search..."
              rightIcon={<Search className="h-4 w-4" />}
            />
            
            <Input 
              label="Password"
              type="password"
              placeholder="Enter password"
              showPasswordToggle
            />
            
            <Input 
              label="Error Example"
              error="This field is required"
              placeholder="Error state"
            />
            
            <Input 
              label="Success Example"
              success="Looks good!"
              placeholder="Success state"
            />
            
            <Input 
              label="Warning Example"
              warning="Please check this field"
              placeholder="Warning state"
            />
            
            <Input 
              label="Clearable Input"
              placeholder="Type something..."
              clearable
              onClear={() => console.log('Cleared!')}
            />
            
            <Input 
              label="Loading Input"
              placeholder="Loading..."
              loading
            />
          </div>
          
          <div>
            <Textarea
              label="Message"
              placeholder="Type your message here..."
              hint="Maximum 500 characters"
              rows={6}
            />
          </div>
        </div>
      </section>

      {/* Badge Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="online" />
            <StatusBadge status="offline" />
            <StatusBadge status="away" />
            <StatusBadge status="busy" />
            <StatusBadge status="pending" />
            <StatusBadge status="success" />
            <StatusBadge status="error" />
            <StatusBadge status="warning" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <NotificationBadge count={3} />
            <NotificationBadge count={99} />
            <NotificationBadge count={100} max={99} />
            <NotificationBadge count={0} showZero />
          </div>
        </div>
      </section>

      {/* Loading Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Loading States</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
            <LoadingSpinner size="xl" />
            <LoadingSpinner text="Loading..." />
          </div>
          
          <div className="space-y-2">
            <Skeleton height={20} width="100%" />
            <Skeleton height={16} width="80%" />
            <Skeleton height={16} width="60%" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardSkeleton showAvatar showHeader lines={4} />
            <CardSkeleton showHeader={false} lines={6} />
          </div>
        </div>
      </section>

      {/* Modal Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Modal Dialog</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setModalOpen(true)}>Scale Animation</Button>
          <Button variant="outline" onClick={() => setModalOpen(true)}>Fade Animation</Button>
          <Button variant="gradient" onClick={() => setModalOpen(true)}>Slide Up</Button>
        </div>
        
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Enhanced Modal"
          description="This modal includes Framer Motion animations and improved accessibility."
          size="md"
          animate={true}
          animationPreset="scale"
        >
          <div className="space-y-4">
            <p>
              This modal demonstrates:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
              <li>Smooth Framer Motion animations</li>
              <li>Focus management and keyboard navigation</li>
              <li>Proper ARIA attributes for screen readers</li>
              <li>Backdrop blur and overlay effects</li>
              <li>Customizable animation presets</li>
            </ul>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setModalOpen(false)} animate={false}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={() => setModalOpen(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
      </section>

      {/* Interactive Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Interactive Examples</h2>
        <Card>
          <CardHeader>
            <CardTitle>Loading Demo</CardTitle>
            <CardDescription>Click to simulate loading state</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <LoadingSpinner text="Processing..." />
                <div className="space-y-2">
                  <Skeleton height={16} width="100%" />
                  <Skeleton height={16} width="80%" />
                  <Skeleton height={16} width="60%" />
                </div>
              </div>
            ) : (
              <p>Content loaded successfully! Click the button below to simulate loading.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => {
                setLoading(true)
                setTimeout(() => setLoading(false), 3000)
              }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Start Loading Demo'}
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}

// Export component for use in pages
export default ComponentExamples