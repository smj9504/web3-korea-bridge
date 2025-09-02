// Layout components export
export { Header } from './header'
export { Footer } from './footer'
export { MainLayout, Container, Section, AdminLayout } from './main-layout'

// Usage examples:
/*
// Basic usage with MainLayout
<MainLayout>
  <Section padding="lg" background="gradient">
    <Container>
      <h1>Your content here</h1>
    </Container>
  </Section>
</MainLayout>

// Different container sizes
<Container size="sm">Small content</Container>
<Container size="default">Default content</Container>
<Container size="lg">Large content</Container>
<Container size="xl">Extra large content</Container>
<Container size="full">Full width content</Container>

// Different section backgrounds and padding
<Section background="muted" padding="xl">...</Section>
<Section background="gradient" padding="lg">...</Section>
<Section background="primary" padding="sm">...</Section>

// Admin layout (for future admin pages)
<AdminLayout>
  <h1>Admin Dashboard</h1>
  <p>Admin content here</p>
</AdminLayout>
*/