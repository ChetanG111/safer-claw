'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { client } from '@/lib/auth/auth-client'

import { Button } from '@/components/ui/button'
import { ArrowUpRight, Loader2 } from 'lucide-react'
export default function Hero() {
  const [loading, setLoading] = useState(false)

  return (
    <main
      id='hero'
      className='relative flex min-h-screen flex-col items-center justify-center py-24 overflow-hidden'
    >

      <div className='relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='mx-auto max-w-4xl text-balance text-center font-bold text-5xl leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-brand-navy'>
            Your{' '}
            <span className='relative inline-block px-2'>
              <span className='relative z-10 text-brand-navy'>safe</span>
              <div className='absolute inset-0 -inset-x-2 -inset-y-1 -z-10 translate-y-1'>
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
              </div>
            </span>
            <br />
            AI operator inside your inbox
          </h1>

          <p className='mx-auto mt-8 max-w-2xl text-balance text-center text-lg text-slate-600 sm:text-xl md:text-2xl font-medium leading-relaxed'>
            A secure AI assistant that automates tasks and acts as a digital employee directly inside your chat tools.
          </p>

          <div className='mx-auto mt-12 flex items-center justify-center gap-6'>
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
          </div>
        </div>
      </div>
    </main>
  )
}
