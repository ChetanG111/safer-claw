'use client'

import { useState } from 'react'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import { motion } from 'framer-motion'

export default function CTA() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <section className='py-12 md:py-32 px-4 sm:px-6 bg-transparent overflow-hidden'>
      <div className='mx-auto max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
          }}
          className='relative bg-brand-navy rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl'
        >
          {/* Decorative background element for the CTA card */}
          <div
            aria-hidden='true'
            className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full'
          />
          <div
            aria-hidden='true'
            className='absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full'
          />

          <div className='relative z-10'>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='text-sm font-bold tracking-widest text-emerald-400 mb-8 uppercase font-mono'
            >
              GET STARTED
            </motion.h2>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className='text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white'
            >
              Ready to unleash the <br className='hidden md:block' /> power of OpenClaw safely?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className='text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto'
            >
              Join the new generation of non-technical users exploring the future of autonomous AI in just one click.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className='flex items-center justify-center'
            >
              <Button
                disabled={loading}
                size='lg'
                className='rounded-full px-12 h-16 text-lg font-bold bg-white hover:bg-slate-100 text-brand-navy shadow-lg transition-all hover:scale-105 active:scale-95'
                onClick={() => {
                  setLoading(true)
                  router.push('/login')
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
      </div>
    </section>
  )
}
