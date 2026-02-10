'use client'

import { useState } from 'react'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/auth/auth-client'

export default function CTA() {
  const [loading, setLoading] = useState(false)

  return (
    <section className='py-12 md:py-32 px-4 sm:px-6 bg-transparent'>
      <div className='mx-auto max-w-4xl'>
        <div className='relative bg-brand-navy rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl'>
          {/* Decorative background element for the CTA card */}
          <div aria-hidden="true" className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full' />
          <div aria-hidden="true" className='absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full' />

          <div className='relative z-10'>
            <h2 className='text-sm font-bold tracking-widest text-emerald-400 mb-8 uppercase font-mono'>
              GET STARTED
            </h2>

            <h2 className='text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white'>
              Ready to hire your first <br className='hidden md:block' /> digital employee?
            </h2>
            <p className='text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto'>
              Secure your spot and be the first to deploy your safe AI operator directly in your chat tools.
            </p>

            <div className='flex items-center justify-center'>
              <Button
                disabled={loading}
                size="lg"
                className='rounded-full px-12 h-16 text-lg font-bold bg-white hover:bg-slate-100 text-brand-navy shadow-lg transition-all hover:scale-105 active:scale-95'
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
      </div>
    </section>
  )
}
