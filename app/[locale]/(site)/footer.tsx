'use client'

import { Link } from '@/i18n/navigation'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='border-t border-slate-100 bg-transparent py-24'
    >
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto mb-20'>
          {/* Column 1: Links */}
          <div className='text-center md:text-left'>
            <h3 className='mb-6 text-xs font-bold uppercase tracking-widest text-brand-navy font-mono'>
              Resources
            </h3>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/blog'
                  className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='/changelog'
                  className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href='/support'
                  className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                >
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div className='text-center md:text-left'>
            <h3 className='mb-6 text-xs font-bold uppercase tracking-widest text-brand-navy font-mono'>
              Legal
            </h3>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/terms'
                  className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/licenses'
                  className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                >
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='pt-12 border-t border-slate-100'>
          <div className='flex flex-col items-center justify-center text-center gap-8'>
            <div className='flex items-center justify-center gap-3 group cursor-pointer'>
              <div className='h-10 w-10 bg-brand-navy rounded-xl flex items-center justify-center transition-transform group-hover:scale-110'>
                <img src='/image.png' alt='Safer-Claw Logo' className='h-6 w-6 object-contain invert' />
              </div>
              <span className='text-2xl font-bold tracking-tight text-brand-navy font-heading'>
                safer-claw
              </span>
            </div>

            <p className='text-base font-medium text-slate-500 max-w-md'>
              The safest way to deploy and manage AI operators for your business workflows.
            </p>

            <div className='flex flex-col items-center gap-6 w-full'>
              <p className='text-sm font-semibold text-slate-400'>
                &copy; {new Date().getFullYear()} — Safer-Claw. All rights reserved.
              </p>

              <div className='flex items-center gap-6'>
                <Link href='https://x.com/saferclaw' className='text-slate-400 hover:text-brand-navy transition-colors'>
                  <FaXTwitter className='h-5 w-5' />
                </Link>
                <Link href='https://github.com/ChetanG111/safer-claw' className='text-slate-400 hover:text-brand-navy transition-colors'>
                  <FaGithub className='h-5 w-5' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
