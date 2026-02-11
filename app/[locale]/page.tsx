import Navbar from './(site)/navbar'
import Hero from './(site)/hero'
import Features from './(site)/features'
import Pricing from './(site)/pricing'
import FAQ from './(site)/faq'
import CTA from './(site)/cta'
import Footer from './(site)/footer'
import { GridLayout, SectionDivider } from './(site)/grid-layout'
import { getActivePaymentProvider } from '@/lib/payments/service'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth/auth'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const activeProvider = getActivePaymentProvider()

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // @ts-ignore - isOnboarded is added via Better Auth additionalFields
  const isOnboarded = !!session?.user?.isOnboarded

  return (
    <GridLayout>
      <Navbar isOnboarded={isOnboarded} />
      <Hero user={session?.user || null} isOnboarded={isOnboarded} />
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
