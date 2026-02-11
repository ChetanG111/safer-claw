import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import Navbar from '../(site)/navbar'
import Footer from '../(site)/footer'
import { GridLayout } from '../(site)/grid-layout'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Licenses - Safer-Claw: Simple Deployment for OpenClaw',
  description: 'Understand the licensing terms for Safer-Claw, empowering non-technical users to deploy OpenClaw agents effortlessly.',
  canonical: '/licenses',
})

export default async function LicensesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <GridLayout>
      <Navbar />
      <main className='min-h-screen pt-20 bg-white'>
        <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6'>
          <h1 className='mb-4 text-4xl md:text-5xl font-bold tracking-tight text-brand-navy'>
            Licenses
          </h1>
          <p className='mb-12 text-sm font-semibold text-slate-400 font-mono text-uppercase tracking-widest'>
            LAST UPDATED: 17 JAN 2026
          </p>
          <p className='mb-12 text-lg text-slate-600 leading-relaxed'>
            These terms govern your use of Safer-Claw to deploy your OpenClaw agents. By using our platform, you agree to these licensing provisions.
          </p>

          <div className='prose prose-sm max-w-none space-y-8 text-muted-foreground'>
            <section>
              <h2 className='mb-4 text-xl font-semibold text-foreground'>1. Safer-Claw Platform and Tools</h2>
              <p>
                The Safer-Claw platform, including its tools and related source code, is licensed for users who wish to deploy OpenClaw agents for commercial and personal projects. Redistribution or resale of the platform itself without explicit permission is prohibited.
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-xl font-semibold text-foreground'>
                2. open-source components
              </h2>
              <p>
                safer-claw includes open-source libraries under their respective licenses (MIT,
                Apache 2.0, etc.). you must comply with their terms when using or modifying those
                components.
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-xl font-semibold text-foreground'>3. attribution</h2>
              <p>
                you're not required to publicly credit safer-claw, but attribution is appreciated
                when showcasing products built using it.
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-xl font-semibold text-foreground'>4. termination</h2>
              <p>
                we reserve the right to revoke your license if you misuse or redistribute our code
                in violation of these terms.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </GridLayout>
  )
}
