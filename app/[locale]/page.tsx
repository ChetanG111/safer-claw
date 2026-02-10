import Navbar from './(site)/navbar'
import Hero from './(site)/hero'
import Features from './(site)/features'
import Pricing from './(site)/pricing'
import Testimonials from './(site)/testimonials'
import FAQ from './(site)/faq'
import CTA from './(site)/cta'
import Footer from './(site)/footer'
import { GridLayout, SectionDivider } from './(site)/grid-layout'
import { db } from '@/database'
import { user } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { getActivePaymentProvider } from '@/lib/payments/service'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth/auth'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const activeProvider = getActivePaymentProvider()

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  let isOnboarded = false
  if (session?.user) {
    const dbUser = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
      columns: {
        isOnboarded: true,
      },
    })
    isOnboarded = !!dbUser?.isOnboarded
  }

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
