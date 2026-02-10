'use client'

import Link from 'next/link'
import { CreditCard, Settings, User, ArrowUpRight } from 'lucide-react'
import { BounceSequence } from '@/components/animation/bounce-sequence'

export default function DashboardPage() {
  return (
    <div className='container mx-auto py-12 px-4 max-w-5xl'>
      <BounceSequence className='mb-12'>
        <h1 className='text-4xl font-bold tracking-tight text-brand-navy mb-3'>Dashboard</h1>
        <p className='text-lg text-slate-500'>Welcome back! Here's an overview of your AI operators.</p>
      </BounceSequence>

      <BounceSequence className='grid gap-6 md:grid-cols-2 lg:grid-cols-3' staggerDelay={0.15} initialDelay={0.2}>
        {/* Billing Card */}
        <Link
          href='/dashboard/billing'
          className='group relative flex flex-col p-8 rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1'
        >
          <div className='flex items-start justify-between mb-8'>
            <div className='p-3 rounded-2xl bg-slate-50 text-brand-navy border border-slate-100 group-hover:bg-brand-navy group-hover:text-white transition-colors'>
              <CreditCard className='h-6 w-6' />
            </div>
            <ArrowUpRight className='h-5 w-5 text-slate-300 group-hover:text-brand-navy transition-colors' />
          </div>
          <h2 className='text-xl font-bold text-brand-navy mb-2'>
            Billing
          </h2>
          <p className='text-sm text-slate-500 leading-relaxed'>
            Manage your subscription and view payment history.
          </p>
        </Link>

        {/* Profile Card */}
        <div className='group relative flex flex-col p-8 rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm opacity-60 grayscale'>
          <div className='flex items-start justify-between mb-8'>
            <div className='p-3 rounded-2xl bg-slate-50 text-brand-navy border border-slate-100'>
              <User className='h-6 w-6' />
            </div>
          </div>
          <h2 className='text-xl font-bold text-brand-navy mb-2'>Profile</h2>
          <p className='text-sm text-slate-500 leading-relaxed'>Manage your personal account settings.</p>
          <span className='absolute top-4 right-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono bg-slate-50 px-2 py-1 rounded-full'>Coming Soon</span>
        </div>

        {/* Settings Card */}
        <div className='group relative flex flex-col p-8 rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm opacity-60 grayscale'>
          <div className='flex items-start justify-between mb-8'>
            <div className='p-3 rounded-2xl bg-slate-50 text-brand-navy border border-slate-100'>
              <Settings className='h-6 w-6' />
            </div>
          </div>
          <h2 className='text-xl font-bold text-brand-navy mb-2'>Settings</h2>
          <p className='text-sm text-slate-500 leading-relaxed'>Configure your application preferences.</p>
          <span className='absolute top-4 right-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono bg-slate-50 px-2 py-1 rounded-full'>Coming Soon</span>
        </div>
      </BounceSequence>
    </div>
  )
}
