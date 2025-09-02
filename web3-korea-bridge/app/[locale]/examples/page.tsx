import { ComponentExamples } from '@/components/ui/examples'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UI Components Examples - Web3 Korea Bridge',
  description: 'Comprehensive examples and demos of all UI components in the Web3 Korea Bridge design system.',
}

export default function ExamplesPage() {
  return <ComponentExamples />
}