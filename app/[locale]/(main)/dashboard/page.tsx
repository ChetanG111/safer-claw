'use client'

import { useState } from 'react'
import { Check, Bot, Zap, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { BounceSequence } from '@/components/animation/bounce-sequence'
import { AnimatePresence } from 'framer-motion'

const MODELS = [
  { id: 'kimi-2.5', name: 'Kimi K2.5' },
  { id: 'gemini-3-pro', name: 'Gemini 3 Pro' },
  { id: 'claude-opus-4.5', name: 'Claude Opus 4.5' },
  { id: 'gpt-5.3', name: 'GPT 5.3' },
]

const CONNECTIONS = [
  { id: 'telegram', name: 'Telegram', icon: '/icons/telegram.svg' }, // Using text if icons sort of hard
  { id: 'whatsapp', name: 'WhatsApp', icon: '/icons/whatsapp.svg' },
  { id: 'slack', name: 'Slack', icon: '/icons/slack.svg' },
]

export default function DashboardPage() {
  const [step, setStep] = useState<'config' | 'pricing'>('config')
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id)
  const [selectedConnection, setSelectedConnection] = useState(CONNECTIONS[0].id)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleContinue = async () => {
    setLoading(true)

    try {
      // Updated to pass model and connection data if backend supports it,
      // for now simplified to just checkout flow
      const response = await fetch('/api/onboarding/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentType: 'openclaw',
          agentName: 'OpenClaw Agent',
          config: {
            model: selectedModel,
            connection: selectedConnection,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to start checkout')
      }

      const data = await response.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className='container max-w-4xl mx-auto py-12 px-4 md:py-20'>
      <AnimatePresence mode='wait'>
        {step === 'config' ? (
          <BounceSequence
            key='config'
            className='flex flex-col items-center text-center max-w-2xl mx-auto'
          >
            <div className='w-16 h-16 bg-brand-navy rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-brand-navy/20'>
              <Bot className='w-8 h-8 text-white' />
            </div>

            <h1 className='text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight'>
              Deploy{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-purple-600'>
                OpenClaw
              </span>
            </h1>

            <p className='text-lg text-slate-500 mb-10'>
              Select your preferred model and primary connection channel.
            </p>

            <div className='w-full space-y-8 mb-12 text-left'>
              {/* Model Selection */}
              <div>
                <div className='text-sm font-semibold text-slate-900 uppercase tracking-widest mb-4 block pl-1'>
                  Select Model
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                  {MODELS.map((model) => (
                    <div
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={cn(
                        'p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group h-full',
                        selectedModel === model.id
                          ? 'border-brand-navy bg-brand-navy/5'
                          : 'border-slate-100 hover:border-brand-navy/30 hover:bg-slate-50'
                      )}
                    >
                      <span
                        className={cn(
                          'font-medium text-sm text-center',
                          selectedModel === model.id ? 'text-brand-navy' : 'text-slate-600'
                        )}
                      >
                        {model.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection Selection */}
              <div>
                <div className='text-sm font-semibold text-slate-900 uppercase tracking-widest mb-4 block pl-1'>
                  Primary Connection
                </div>
                <div className='flex gap-3 justify-center'>
                  {CONNECTIONS.map((conn) => (
                    <div
                      key={conn.id}
                      onClick={() => setSelectedConnection(conn.id)}
                      className={cn(
                        'flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-2',
                        selectedConnection === conn.id
                          ? 'border-brand-navy bg-brand-navy/5'
                          : 'border-slate-100 hover:border-brand-navy/30 hover:bg-slate-50'
                      )}
                    >
                      {/* Ideally use SVGs here, using text fallback for now */}
                      <span className='font-medium text-sm'>{conn.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={() => setStep('pricing')}
              size='lg'
              className='w-full md:w-auto rounded-full px-12 h-14 text-lg font-semibold bg-brand-navy hover:bg-brand-navy/90 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all'
            >
              Deploy Operator
              <ArrowRight className='ml-3 w-5 h-5' />
            </Button>
          </BounceSequence>
        ) : (
          <BounceSequence key='pricing' className='max-w-md mx-auto'>
            <button
              onClick={() => setStep('config')}
              className='mb-8 text-sm text-slate-500 hover:text-brand-navy flex items-center transition-colors'
            >
              ← Back
            </button>

            <div className='bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden'>
              <div className='absolute top-0 right-0 p-4 opacity-5'>
                <Zap className='w-32 h-32' />
              </div>

              <div className='relative z-10'>
                <h2 className='text-2xl font-bold text-brand-navy mb-2'>Standard Plan</h2>
                <p className='text-slate-500 mb-8'>Everything you need to run OpenClaw.</p>

                <div className='flex items-baseline mb-8'>
                  <span className='text-5xl font-extrabold text-brand-navy'>$19</span>
                  <span className='text-slate-500 ml-2'>/month</span>
                </div>

                <div className='p-4 bg-blue-50 border border-blue-100 rounded-xl mb-8 flex items-start'>
                  <div className='bg-blue-100 p-1 rounded-full mr-3 mt-0.5'>
                    <Check className='w-3 h-3 text-blue-600' />
                  </div>
                  <div>
                    <span className='font-semibold text-blue-800 block text-sm'>
                      Included in Plan
                    </span>
                    <span className='text-blue-700 text-sm'>
                      Includes <strong>$10/mo</strong> in AI credits to use with Claude, GPT-4, and
                      Gemini.
                    </span>
                  </div>
                </div>

                <ul className='space-y-4 mb-8'>
                  <li className='flex items-center text-slate-600 text-sm'>
                    <Check className='w-4 h-4 text-brand-navy mr-3' />
                    <span>Unlimited local execution</span>
                  </li>
                  <li className='flex items-center text-slate-600 text-sm'>
                    <Check className='w-4 h-4 text-brand-navy mr-3' />
                    <span>Full source code access</span>
                  </li>
                  <li className='flex items-center text-slate-600 text-sm'>
                    <Check className='w-4 h-4 text-brand-navy mr-3' />
                    <span>Priority community support</span>
                  </li>
                </ul>

                <Button
                  onClick={handleContinue}
                  disabled={loading}
                  className='w-full rounded-xl h-14 text-lg font-semibold bg-brand-navy hover:bg-brand-navy/90 text-white shadow-lg transition-all'
                >
                  {loading ? (
                    <>
                      <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className='ml-2 w-5 h-5' />
                    </>
                  )}
                </Button>

                <p className='text-center text-xs text-slate-400 mt-4'>
                  Secure payment via Dodo Payments. Cancel anytime.
                </p>
              </div>
            </div>
          </BounceSequence>
        )}
      </AnimatePresence>
    </div>
  )
}
