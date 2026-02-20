import { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import AboutSection from '@/components/sections/AboutSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import PortfolioPreview from '@/components/sections/PortfolioPreview'
import PricingSection from '@/components/sections/PricingSection'
import FAQSection from '@/components/sections/FAQSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <SocialProofSection />
      <PortfolioPreview />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </>
  )
}