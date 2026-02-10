'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { client } from '@/lib/auth/auth-client'

import { Button } from '@/components/ui/button'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [loading, setLoading] = useState(false)

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
        <div className='mx-auto max-w-4xl text-center'>
          <motion.h1
            variants={itemVariants}
            className='mx-auto max-w-4xl text-balance text-center font-bold text-5xl leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-brand-navy'
          >
            Your{' '}
            <span className='relative inline-block px-2'>
              <span className='relative z-10 text-brand-navy'>safe</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: 'circOut' }}
                className='absolute inset-0 -inset-x-2 -inset-y-1 -z-10 translate-y-1 origin-left'
              >
                <svg
                  className='w-full h-full text-emerald-400/30'
                  viewBox='0 0 100 40'
                  preserveAspectRatio='none'
                >
                  <path
                    d='M2 15 Q 50 10, 98 15 L 96 35 Q 50 38, 4 34 Z'
                    fill='currentColor'
                  />
                </svg>
              </motion.div>
            </span>
            <br />
            AI operator inside your inbox
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className='mx-auto mt-8 max-w-2xl text-balance text-center text-lg text-slate-600 sm:text-xl md:text-2xl font-medium leading-relaxed'
          >
            A secure AI assistant that automates tasks and acts as a digital employee directly inside your chat tools.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='mx-auto mt-12 flex items-center justify-center gap-6'
          >
            <Button
              disabled={loading}
              size="lg"
              className='rounded-full px-10 h-14 text-lg font-semibold bg-brand-navy hover:bg-brand-navy/90 text-white shadow-xl transition-all hover:scale-105 active:scale-95'
              onClick={async () => {
                setLoading(true)
                try {
                  await client.signIn.social({
                    provider: 'google',
                    callbackURL: '/dashboard',
                  })
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
                  Deploy Now
                  <ArrowUpRight className='h-6 w-6 ml-2' />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
