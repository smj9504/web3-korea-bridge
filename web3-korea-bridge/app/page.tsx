import { HeroSection } from '@/components/home/hero-section'
import { ServicesSection } from '@/components/home/services-section'
import { AboutSection } from '@/components/home/about-section'
import { PortfolioSection } from '@/components/home/portfolio-section'
import { BlogSection } from '@/components/home/blog-section'
import { ContactSection } from '@/components/home/contact-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <BlogSection />
      <ContactSection />
    </>
  )
}