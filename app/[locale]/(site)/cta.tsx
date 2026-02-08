'use client'

import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'


export default function CTA() {
  return (
    <section className='py-12 md:py-24 px-4 sm:px-6 bg-[#F4F4F5]'>
      <div className='mx-auto max-w-4xl'>
        {/* Section label */}
        <h2
          className='text-center text-sm font-medium text-muted-foreground mb-8'
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          JOIN WAITLIST
        </h2>

        {/* Main heading */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-semibold tracking-tight mb-4'>
            Ready to hire your first digital employee?
          </h2>
          <p className='text-base text-muted-foreground'>
            Secure your spot and be the first to deploy your private AI operator.
          </p>
        </div>

        {/* Buttons */}
        <div className='mx-auto mt-10 flex items-center justify-center gap-4'>
          <Button className='font-semibold h-12! px-8 text-base text-white'>
            Join Waitlist
            <ArrowUpRight className='h-8 w-8 ml-2' />
          </Button>

        </div>
      </div>
    </section>
  )
}
