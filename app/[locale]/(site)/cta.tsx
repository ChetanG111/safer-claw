'use client'

import { useState } from 'react'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/auth/auth-client'

export default function CTA() {
  const [loading, setLoading] = useState(false)

  return (
    <section className='py-12 md:py-24 px-4 sm:px-6 bg-[#F4F4F5]'>
      <div className='mx-auto max-w-4xl'>
        {/* Section label */}
        <h2
          className='text-center text-sm font-medium text-muted-foreground mb-8'
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          DEPLOY NOW
        </h2>

        {/* Main heading */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-semibold tracking-tight mb-4'>
            Ready to hire your first digital employee?
          </h2>
          <p className='text-base text-muted-foreground'>
            Secure your spot and be the first to deploy your safe AI operator.
          </p>
        </div>

        {/* Buttons */}
        <div className='mx-auto mt-10 flex items-center justify-center gap-4'>
          <Button
            disabled={loading}
            className='font-semibold h-12! px-8 text-base text-white'
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
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Deploying...
              </>
            ) : (
              <>
                Deploy
                <ArrowUpRight className='h-8 w-8 ml-0' />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
