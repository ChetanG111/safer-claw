import Navbar from './(site)/navbar'
import Hero from './(site)/hero'
import Features from './(site)/features'
import Pricing from './(site)/pricing'
import Testimonials from './(site)/testimonials'
import FAQ from './(site)/faq'
import CTA from './(site)/cta'
import Footer from './(site)/footer'
import { GridLayout, SectionDivider } from './(site)/grid-layout'
import { getActivePaymentProvider } from '@/lib/payments/service'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const activeProvider = getActivePaymentProvider()

  return (
    <GridLayout>
      <Navbar />
      <Hero />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <Pricing activeProvider={activeProvider} />
      <SectionDivider />
      {/* <Testimonials /> */}
      <FAQ />
      <CTA />
      <Footer />
    </GridLayout>
  )
}
