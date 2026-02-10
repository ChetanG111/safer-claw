'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { HugeiconsIcon } from '@hugeicons/react'
import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons'
import { Flame, ArrowUpRight, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSession } from '@/lib/auth/auth-client'
import { getPriceConfig, type PaymentProvider } from '@/config/payments'

interface PricingProps {
  activeProvider?: PaymentProvider
}

export default function Pricing({ activeProvider = 'stripe' }: PricingProps) {
  const t = useTranslations()
  const router = useRouter()
  const { data: session } = useSession()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const proPrices = getPriceConfig('pro', activeProvider)
  const proPrice = proPrices.find((p) => p.interval === 'month') || proPrices[0]
  const displayPrice = proPrice ? `$${proPrice.amount / 100}` : '-'

  const premiumFeatures = [
    { text: 'Full Next.js boilerplate', included: true },
    { text: 'Auth, payments & UI prewired', included: true },
    { text: 'One-click deploys', included: true },
    { text: 'Role-based access & invite system', included: true },
    { text: 'Advanced SEO & Blog', included: true },
    { text: 'Analytics hooks ready for Posthog', included: true },
    { text: 'Pro UI kit', included: true },
    { text: 'Private Discord Community', included: true },
    { text: 'Lifetime updates', included: true },
    { text: 'Priority support', included: true },
  ]

  const handleCheckout = async (plan: 'pro') => {
    if (!session) {
      router.push(`/register?redirect=/pricing&plan=${plan}`)
      return
    }

    setLoadingPlan(plan)
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <section id='pricing' className='py-12 md:py-24 bg-transparent'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='text-center text-sm font-bold tracking-widest text-brand-navy mb-8 font-mono'>
            {t('PRICING')}
          </h2>{' '}
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-navy'>
              Built for builders who play to win
            </h2>
            <p className='text-lg md:text-xl text-slate-600'>
              Launch faster, sell sooner, and grow without fighting setup pain
            </p>
          </div>
          <div className='flex justify-center'>
            {/* Premium */}
            <div className='flex flex-col p-8 max-w-md w-full relative border border-slate-200 rounded-3xl bg-white shadow-2xl shadow-slate-200/50 transition-transform hover:scale-[1.02]'>
              <div className='mb-8'>
                <div className='flex items-start justify-between mb-4'>
                  <h3 className='text-3xl font-bold text-brand-navy'>Premium</h3>
                  <Badge className='bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full px-4 py-1.5 font-semibold flex items-center gap-1.5'>
                    <Flame className='h-3.5 w-3.5 fill-emerald-500' />
                    Most popular
                  </Badge>
                </div>
                <div className='mb-6'>
                  <div className='flex items-baseline gap-3'>
                    <span className='text-lg text-slate-400 line-through font-mono'>
                      $29
                    </span>
                    <span className='text-5xl font-bold font-mono text-brand-navy'>{displayPrice}</span>
                  </div>
                </div>
                <p className='text-slate-600 mb-6 leading-relaxed'>
                  For founders & builders ready to ship real products and make money.
                </p>
                <p className='text-xs font-bold text-brand-navy uppercase tracking-widest border-b border-slate-100 pb-4 font-mono'>
                  EVERYTHING INCLUDED
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
                <Button
                  className='w-full rounded-2xl h-14 text-lg font-bold bg-brand-navy hover:bg-brand-navy/90 text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]'
                  size='lg'
                  disabled={loadingPlan === 'pro'}
                  onClick={() => handleCheckout('pro')} // Consider using a constant or type from paymentConfig
                >
                  {loadingPlan === 'pro' ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    'Deploy'
                  )}
                  {!loadingPlan && <ArrowUpRight className='ml-2 h-4 w-4' />}
                </Button>
                <p className='text-sm text-center text-muted-foreground'>
                  Deploy your first agent today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
