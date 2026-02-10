import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import Navbar from '../(site)/navbar'
import Footer from '../(site)/footer'
import { GridLayout } from '../(site)/grid-layout'
import { BounceSequence } from '@/components/animation/bounce-sequence'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service for Safer-Claw platform',
  canonical: '/terms',
})

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <GridLayout>
      <Navbar />
      <main className='min-h-screen pt-20'>
        <BounceSequence className='mx-auto max-w-4xl px-4 py-16 sm:px-6'>
          <h1 className='mb-4 text-4xl md:text-5xl font-bold tracking-tight text-brand-navy'>Terms of Service</h1>
          <p className='mb-12 text-sm font-semibold text-slate-400 font-mono text-uppercase tracking-widest'>LAST UPDATED: 17 JAN 2026</p>

          <div className='prose prose-sm max-w-none space-y-8 text-muted-foreground'>
            <p>
              welcome to safer-claw. by accessing or using our platform, you agree to these terms.
              if you don't agree, please don't use safer-claw.
            </p>

            <section>
              <h2 className='mb-4 text-xl font-semibold text-foreground'>1. using kyronhq</h2>
              <p>
                you must use safer-claw only for lawful purposes. you're responsible for how you use
                the platform, including any projects, code, or data you upload or share.
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-xl font-semibold text-foreground'>2. accounts</h2>
              <p>
                you're responsible for keeping your account secure. if you suspect unauthorized
                access, contact us immediately at{' '}
                <a
                  href='mailto:support@safer-claw.com'
                  className='font-medium text-foreground underline underline-offset-4'
                >
                  support@safer-claw.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-xl font-semibold text-foreground'>
                3. intellectual property
              </h2>
              <p>
                all code, templates, and assets provided through safer-claw are owned by us or
                licensed to us. you retain rights to your own projects built using our tools, but
                not to the underlying boilerplate.
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-xl font-semibold text-foreground'>4. restrictions</h2>
              <p>
                don't attempt to hack, decompile, or resell safer-claw's products or services. we
                reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-xl font-semibold text-foreground'>5. liability</h2>
              <p>
                safer-claw is provided "as is." we don't guarantee uninterrupted service or that our
                platform will be error-free. we're not liable for any damages, data loss, or
                downtime.
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-xl font-semibold text-foreground'>6. updates to terms</h2>
              <p>
                we may update these terms anytime. continued use means you accept the latest
                version.
              </p>
            </section>
          </div>
        </BounceSequence>
      </main>
      <Footer />
    </GridLayout>
  )
}
