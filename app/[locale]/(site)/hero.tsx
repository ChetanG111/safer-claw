'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

import { useRouter } from 'next/navigation'
import type { User } from 'better-auth'

export default function Hero({
  user,
  isOnboarded = false,
}: {
  user: User | null
  isOnboarded?: boolean
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  } as const

  return (
    <main
      id='hero'
      className='relative flex min-h-screen flex-col items-center justify-center py-24 overflow-hidden'
    >
      <motion.div
        className='relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='mx-auto max-w-5xl text-center'>
          <motion.h1
            variants={itemVariants}
            className='mx-auto max-w-5xl text-balance text-center font-bold text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-brand-navy'
          >
            The{' '}
            <span className='relative inline-block px-1'>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='absolute inset-x-0 top-[10%] bottom-[5%] z-[-1] bg-[#BDF7E2]'
                style={{
                  clipPath: 'polygon(4% 22%, 25% 14%, 55% 12%, 96% 18%, 98% 50%, 95% 82%, 55% 90%, 25% 88%, 2% 80%, 5% 50%)',
                  transformOrigin: 'left',
                }}
              />
              safe
            </span>{' '}
            AI powerhouse for everyone, one click away
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className='mx-auto mt-8 max-w-3xl text-balance text-center text-base text-slate-500 sm:text-lg font-medium leading-relaxed'
          >
            Deploy secure OpenClaw agents in one click with built-in sandbox guardrails—no coding required.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='mx-auto mt-12 flex items-center justify-center gap-6'
          >
            <Button
              disabled={loading}
              size='lg'
              className='rounded-full px-12 h-18 text-xl font-semibold bg-brand-navy hover:bg-brand-navy/90 text-white shadow-xl transition-all hover:scale-105 active:scale-95'
              onClick={async () => {
                setLoading(true)
                try {
                  if (user) {
                    router.push('/dashboard')
                  } else {
                    router.push('/login')
                  }
                } catch (error) {
                  setLoading(false)
                }
              }}
            >
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Deploying...
                </>
              ) : (
                <>
                  {user && isOnboarded ? 'Go to Dashboard' : 'Deploy Your First Agent'}
                  <ArrowUpRight className='h-6 w-6 ml-2' />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </main >
  )
}
