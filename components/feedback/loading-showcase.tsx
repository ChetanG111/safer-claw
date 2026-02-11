'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StampBackground } from '@/components/branding/stamp-background'
import { cn } from '@/lib/utils'

interface LoadingShowcaseProps {
    title?: string
    messages?: string[]
    className?: string
    hideBackground?: boolean
}

const DEFAULT_MESSAGES = [
    'Initializing secure environment...',
    'Provisioning dedicated resources...',
    'Configuring network protocols...',
    'Optimizing performance clusters...',
    'Syncing global state...',
    'Securing access keys...',
    'Finalizing system setup...',
    'Polishing the experience...',
    'Preparing your workspace...',
]

export function LoadingShowcase({
    title = 'Deploying your instance',
    messages = DEFAULT_MESSAGES,
    className,
    hideBackground = false,
}: LoadingShowcaseProps) {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [messages.length])

    return (
        <div
            className={cn(
                'relative min-h-[450px] w-full flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-200/60 bg-white/40 backdrop-blur-md shadow-sm',
                className
            )}
        >
            {!hideBackground && <StampBackground />}

            {/* Decorative scanning line */}
            <motion.div
                className='absolute inset-0 pointer-events-none z-10 opacity-30'
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                <div className='h-[200px] w-full bg-gradient-to-b from-transparent via-brand-navy/10 to-transparent' />
            </motion.div>

            <div className='relative z-20 flex flex-col items-center gap-10 px-6 text-center max-w-lg'>
                {/* Premium Spinner */}
                <div className='relative h-40 w-40'>
                    {/* Pulsing base */}
                    <motion.div
                        className='absolute inset-4 rounded-full bg-brand-navy/5'
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    <svg className='h-full w-full' viewBox='0 0 100 100'>
                        {/* Outer dotted ring - very slow */}
                        <motion.circle
                            cx='50'
                            cy='50'
                            r='48'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1'
                            strokeDasharray='2 6'
                            className='text-slate-300'
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        />

                        {/* Middle segmented ring - medium speed counter-clockwise */}
                        <motion.circle
                            cx='50'
                            cy='50'
                            r='40'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeDasharray='15 25'
                            className='text-slate-400/30'
                            animate={{ rotate: -360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        />

                        {/* Inner dynamic ring - fast clockwise */}
                        <motion.path
                            d='M 50 20 A 30 30 0 0 1 80 50'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='3'
                            strokeLinecap='round'
                            className='text-brand-navy'
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ transformOrigin: '50px 50px' }}
                        />

                        {/* Small orbit dots */}
                        <motion.circle
                            cx='50'
                            cy='10'
                            r='2'
                            className='fill-brand-navy/40'
                            animate={{ rotate: 360 }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                            style={{ transformOrigin: '50px 50px' }}
                        />

                        {/* Center core */}
                        <circle
                            cx='50'
                            cy='50'
                            r='4'
                            className='fill-brand-navy'
                        />
                    </svg>
                </div>

                <div className='space-y-6'>
                    <div className='space-y-2'>
                        <h2 className='text-3xl font-bold tracking-tight text-brand-navy font-heading'>
                            {title}
                        </h2>
                        <div className='h-1 w-20 bg-brand-navy/10 mx-auto rounded-full' />
                    </div>

                    <div className='h-8 flex items-center justify-center'>
                        <AnimatePresence mode='wait'>
                            <motion.p
                                key={currentMessageIndex}
                                initial={{ y: 10, opacity: 0, filter: 'blur(4px)' }}
                                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                exit={{ y: -10, opacity: 0, filter: 'blur(4px)' }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className='text-slate-600 font-medium text-lg'
                            >
                                {messages[currentMessageIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Progress indicators */}
                <div className='flex gap-2 items-center'>
                    {messages.map((_, i) => (
                        <motion.div
                            key={i}
                            className={cn(
                                'h-1.5 rounded-full transition-all duration-700',
                                i === currentMessageIndex
                                    ? 'w-8 bg-brand-navy'
                                    : i < currentMessageIndex
                                        ? 'w-4 bg-brand-navy/40'
                                        : 'w-4 bg-slate-200'
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
