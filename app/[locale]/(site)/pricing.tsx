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

import { motion } from 'framer-motion'

export default function Pricing({ activeProvider = 'stripe' }: PricingProps) {
  const t = useTranslations()
  const router = useRouter()
  const { data: session } = useSession()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const proPrices = getPriceConfig('pro', activeProvider)
  const proPrice = proPrices.find((p) => p.interval === 'month') || proPrices[0]
  const displayPrice = proPrice ? `$${proPrice.amount / 100}` : '-'

  const premiumFeatures = [
    { text: 'One-Click OpenClaw Deploy', included: true },
    { text: 'Secure Sandbox Environment', included: true },
    { text: 'Built-in AI Guardrails', included: true },
    { text: 'Telegram & WhatsApp Integration', included: true },
    { text: 'Zero Maintenance Infrastructure', included: true },
    { text: 'Role-Based Access Control', included: true },
    { text: '24/7 Managed Operations', included: true },
    { text: 'Priority Support & Community', included: true },
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
    <section id='pricing' className='py-12 md:py-24 bg-transparent overflow-hidden'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <div className='mx-auto max-w-3xl'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='text-center text-sm font-bold tracking-widest text-brand-navy mb-8 font-mono'
          >
            {t('PRICING')}
          </motion.h2>
          <div className='text-center mb-16'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-navy'
            >
              Simple, Safe, Powerful.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-lg md:text-xl text-slate-600'
            >
              One simple plan to unlock the full potential of OpenClaw safely.
            </motion.p>
          </div>
          <div className='flex justify-center'>
            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.3,
              }}
              className='flex flex-col p-8 max-w-md w-full relative border border-slate-200 rounded-3xl bg-white shadow-2xl shadow-slate-200/50'
            >
              <div className='mb-8'>
                <div className='flex items-start justify-between mb-4'>
                  <h3 className='text-3xl font-bold text-brand-navy'>Premium</h3>
                  <Badge className='bg-brand-navy/5 border border-brand-navy/10 text-brand-navy rounded-full px-4 py-1.5 font-semibold flex items-center gap-1.5'>
                    <Flame className='h-3.5 w-3.5 fill-brand-navy' />
                    Full Access
                  </Badge>
                </div>
                <div className='mb-6'>
                  <div className='flex items-baseline gap-3'>
                    <span className='text-lg text-slate-400 line-through font-mono'>$29</span>
                    <div className='flex items-baseline'>
                      <span className='text-5xl font-bold font-mono text-brand-navy'>
                        {displayPrice}
                      </span>
                      <span className='text-xl font-bold font-mono text-slate-400'>/mo</span>
                    </div>
                  </div>
                </div>
                <p className='text-slate-600 mb-6 leading-relaxed'>
                  For anyone ready to explore the future of AI without the technical headache.
                </p>
                <p className='text-xs font-bold text-brand-navy uppercase tracking-widest border-b border-slate-100 pb-4 font-mono'>
                  EVERYTHING INCLUDED
                </p>
              </div>
              <ul className='space-y-3 mb-8 flex-1'>
                {premiumFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className='flex items-center gap-2 text-sm'
                  >
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      className='h-4 w-4 text-muted-foreground shrink-0'
                    />
                    <span className='text-muted-foreground'>{feature.text}</span>
                  </motion.li>
                ))}
              </ul>
              <div className='flex flex-col gap-2'>
                <Button
                  className='w-full rounded-2xl h-16 text-xl font-bold bg-brand-navy hover:bg-brand-navy/90 text-white shadow-xl'
                  size='lg'
                  disabled={loadingPlan === 'pro'}
                  onClick={() => handleCheckout('pro')}
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
