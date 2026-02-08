'use client'

import { useTranslations } from 'next-intl'
import { HugeiconsIcon } from '@hugeicons/react'
import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons'
import { Flame, ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'


export default function Pricing() {
  const t = useTranslations()

  const communityFeatures = [
    { text: 'Full Next.js boilerplate', included: true },
    { text: 'Auth, payments & UI prewired', included: true },
    { text: 'Built-in SEO', included: true },
    { text: 'Resend transaction emails', included: true },
    { text: 'Payments via Stripe / Lemon Squeezy / Polar', included: true },
    { text: 'Internationalization (i18n) with TypeScript', included: true },
    { text: 'Up to 100+ hours saved', included: true },
    { text: 'MIT open-source license', included: true },
    { text: 'Community Releases & fixes', included: true },
  ]

  const premiumFeatures = [
    { text: 'Everything in free', included: true },
    { text: 'One-click deploys', included: true },
    { text: 'Role-based access & invite system', included: true },
    { text: 'Advanced SEO & Blog', included: true },
    { text: 'Analytics hooks ready for Posthog', included: true },
    { text: 'Pro UI kit', included: true },
    { text: 'Private Discord Community', included: true },
    { text: 'Lifetime updates', included: true },
    { text: 'Priority support', included: true },
  ]

  return (
    <section id='pricing' className='py-12 md:py-24 bg-[#F4F4F5]'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <div className='mx-auto max-w-3xl'>
          <h2
            className='text-center text-sm font-medium text-muted-foreground mb-8'
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {t('PRICING')}
          </h2>          <div className='text-center mb-16'>
            <h2 className='text-4xl font-semibold tracking-tight mb-4'>
              Built for builders who play to win
            </h2>
            <p className='text-lg text-muted-foreground'>
              Launch faster, sell sooner, and grow without fighting setup pain
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Community */}
            <div className='flex flex-col p-6 border border-[#E4E4E7] rounded-2xl bg-card'>
              <div className='mb-6'>
                <h3 className='text-2xl font-semibold mb-4'>Community</h3>
                <div className='mb-4'>
                  <span className='text-4xl font-semibold font-mono'>$0</span>
                </div>
                <p className='text-sm text-muted-foreground mb-4'>
                  For learners, early builders & indie devs who love to experiment.
                </p>
                <p
                  className='text-xs font-medium text-foreground uppercase'
                  style={{ fontFamily: 'var(--font-geist-mono)' }}
                >
                  INCLUDING
                </p>
              </div>
              <ul className='space-y-3 mb-8 flex-1'>
                {communityFeatures.map((feature, index) => (
                  <li key={index} className='flex items-center gap-2 text-sm'>
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      className='h-4 w-4 text-muted-foreground shrink-0'
                    />
                    <span className='text-muted-foreground'>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <div className='flex flex-col gap-2'>
                <Button className='w-full h-12! text-sm font-medium' size='lg'>
                  Launch
                  <ArrowUpRight className='ml-2 h-4 w-4' />
                </Button>
                <p className='text-sm text-center text-muted-foreground'>
                  Open source. Free forever
                </p>
              </div>
            </div>

            {/* Premium */}
            <div className='flex flex-col p-6 relative border border-primary rounded-2xl bg-card shadow-lg shadow-primary/5'>
              <div className='mb-6'>
                <div className='flex items-start justify-between mb-4'>
                  <h3 className='text-2xl font-semibold'>Premium</h3>
                  <Badge className='bg-white border border-[#DBDAD6] text-[#878787] rounded-full px-3 py-3 font-medium flex items-center gap-1.5'>
                    <Flame className='h-3.5 w-3.5' />
                    Most popular
                  </Badge>
                </div>
                <div className='mb-4'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-sm text-muted-foreground line-through font-mono'>
                      $150
                    </span>
                    <span className='text-4xl font-semibold font-mono'>$90</span>
                  </div>
                </div>
                <p className='text-sm text-muted-foreground mb-4'>
                  For founders & builders ready to ship real products and make money.
                </p>
                <p
                  className='text-xs font-medium text-foreground uppercase'
                  style={{ fontFamily: 'var(--font-geist-mono)' }}
                >
                  INCLUDING
                </p>
              </div>
              <ul className='space-y-3 mb-8 flex-1'>
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className='flex items-center gap-2 text-sm'>
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      className='h-4 w-4 text-muted-foreground shrink-0'
                    />
                    <span className='text-muted-foreground'>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <div className='flex flex-col gap-2'>
                <Button className='w-full h-12! text-sm font-medium' size='lg'>
                  Launch
                  <ArrowUpRight className='ml-2 h-4 w-4' />
                </Button>
                <p className='text-sm text-center text-muted-foreground'>
                  Start your project today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
