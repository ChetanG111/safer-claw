'use client'

import { LoadingShowcase } from '@/components/feedback/loading-showcase'
import { Link } from '@/i18n/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LoadingShowcasePage() {
    return (
        <main className='min-h-screen p-8 flex flex-col items-center justify-center gap-8'>
            <div className='absolute top-8 left-8'>
                <Button variant='ghost' asChild className='gap-2'>
                    <Link href='/'>
                        <ArrowLeft className='h-4 w-4' />
                        Back to Home
                    </Link>
                </Button>
            </div>

            <div className='max-w-2xl w-full space-y-8'>
                <div className='space-y-2 text-center'>
                    <h1 className='text-3xl font-bold tracking-tight text-brand-navy font-heading'>
                        Loading State Showcase
                    </h1>
                    <p className='text-slate-500'>
                        This is the premium loading state designed to keep users engaged during async operations like deployment.
                    </p>
                </div>

                <LoadingShowcase
                    className="shadow-2xl shadow-brand-navy/5 border-slate-200/60"
                />
            </div>
        </main>
    )
}
