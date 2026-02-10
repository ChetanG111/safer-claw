'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Bot, MessageSquare, Briefcase, Zap, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { BounceSequence } from '@/components/animation/bounce-sequence'

// Configuration options for the onboarding flow
const AGENT_CONFIGS = [
    {
        id: 'support',
        title: 'Support Agent',
        description: 'Automate customer support on WhatsApp & Telegram. Handle FAQs and tickets instantly.',
        icon: MessageSquare,
        color: 'bg-emerald-100 text-emerald-700',
        borderColor: 'border-emerald-200',
        features: ['Auto-reply to FAQs', 'Ticket escalation', 'Multi-channel support'],
    },
    {
        id: 'sales',
        title: 'Sales Rep',
        description: 'Qualify leads and book meetings 24/7. engage visitors and turn them into customers.',
        icon: Briefcase,
        color: 'bg-blue-100 text-blue-700',
        borderColor: 'border-blue-200',
        features: ['Lead qualification', 'Meeting scheduling', 'CRM integration'],
    },
    {
        id: 'ops',
        title: 'Operations Assistant',
        description: 'Connect your tools and automate internal workflows. Streamline your business operations.',
        icon: Bot,
        color: 'bg-purple-100 text-purple-700',
        borderColor: 'border-purple-200',
        features: ['Workflow automation', 'Data entry', 'Internal notifications'],
    },
    {
        id: 'custom',
        title: 'Custom Workflow',
        description: 'Build your own agent logic from scratch. Connect any API and design custom behaviors.',
        icon: Zap,
        color: 'bg-amber-100 text-amber-700',
        borderColor: 'border-amber-200',
        features: ['Custom API integration', 'Advanced scripting', 'Full control'],
    },
]

export default function OnboardingPage() {
    const [selectedConfig, setSelectedConfig] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleContinue = async () => {
        if (!selectedConfig) return

        setLoading(true)

        try {
            const selectedAgent = AGENT_CONFIGS.find(c => c.id === selectedConfig)

            const response = await fetch('/api/onboarding/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    agentType: selectedConfig,
                    agentName: selectedAgent?.title || 'My Agent',
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
        <div className='container max-w-5xl mx-auto py-12 px-4 md:py-20'>
            <BounceSequence className='text-center mb-12'>
                <h1 className='text-3xl md:text-5xl font-bold text-brand-navy mb-4'>
                    Choose your Operator
                </h1>
                <p className='text-lg text-slate-500 max-w-2xl mx-auto'>
                    Select a template to initialize your AI agent. You can customize its behavior and connections later.
                </p>
            </BounceSequence>

            <BounceSequence
                className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'
                staggerDelay={0.1}
                initialDelay={0.2}
            >
                {AGENT_CONFIGS.map((config) => (
                    <motion.div
                        key={config.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedConfig(config.id)}
                        className={cn(
                            'relative p-6 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col h-full bg-white/60 backdrop-blur-sm',
                            selectedConfig === config.id
                                ? `border-brand-navy shadow-xl ring-1 ring-brand-navy/5`
                                : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'
                        )}
                    // Since BounceSequence adds layout/animation props to the wrapper, 
                    // we apply our interactive animations here.
                    >
                        {selectedConfig === config.id && (
                            <div className='absolute top-4 right-4 bg-brand-navy text-white p-1 rounded-full'>
                                <Check className='w-4 h-4' />
                            </div>
                        )}

                        <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-4', config.color)}>
                            <config.icon className='w-6 h-6' />
                        </div>

                        <h3 className='text-xl font-bold text-brand-navy mb-2'>{config.title}</h3>
                        <p className='text-slate-500 mb-6 flex-grow'>{config.description}</p>

                        <ul className='space-y-2 mt-auto'>
                            {config.features.map((feature, i) => (
                                <li key={i} className='flex items-center text-sm text-slate-600'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-slate-300 mr-2' />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </BounceSequence>

            <BounceSequence
                initialDelay={0.6}
                className='flex justify-center'
            >
                <Button
                    onClick={handleContinue}
                    disabled={!selectedConfig || loading}
                    size="lg"
                    className={cn(
                        'rounded-full px-10 h-14 text-lg font-semibold shadow-xl transition-all',
                        selectedConfig
                            ? 'bg-brand-navy hover:bg-brand-navy/90 text-white hover:scale-105 active:scale-95'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    )}
                >
                    {loading ? (
                        <>
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                            Processing...
                        </>
                    ) : (
                        <>
                            Continue
                            <ArrowRight className='ml-2 h-5 w-5' />
                        </>
                    )}
                </Button>
            </BounceSequence>
        </div>
    )
}
