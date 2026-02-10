'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useBrandConfig } from '@/config/branding'
import { StampBackground } from '@/components/branding/stamp-background'
import { BounceSequence } from '@/components/animation/bounce-sequence'

export function NotFoundContent() {
    const brandConfig = useBrandConfig()
    const router = useRouter()

    return (
        <div className='relative min-h-screen flex items-center justify-center'>
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <StampBackground />
            </div>

            <div className='relative z-10 w-full max-w-[410px] px-4'>
                <BounceSequence>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='space-y-1 text-center'>
                            <h1 className='font-medium text-[32px] text-black tracking-tight'>Page Not Found</h1>
                            <p className='font-[380] text-[16px] text-muted-foreground'>
                                The page you’re looking for doesn’t exist or has been moved.
                            </p>
                        </div>

                        <div className='mt-8 w-full space-y-3'>
                            <Button
                                type='button'
                                size='lg'
                                onClick={() => router.push('/')}
                                className='group inline-flex w-full items-center justify-center gap-2 rounded-[10px] py-[6px] pr-[10px] pl-[12px] text-[15px] font-medium text-white shadow-[inset_0_2px_4px_0_#9B77FF] transition-all'
                            >
                                Return to Home
                            </Button>
                        </div>

                        <div className='mt-8 text-center text-[13px] font-[340] leading-relaxed text-muted-foreground'>
                            Need help?{' '}
                            <a
                                href={`mailto:${brandConfig.supportEmail}`}
                                className='text-(--brand-accent-hex) underline-offset-4 transition hover:text-(--brand-accent-hover-hex) hover:underline'
                            >
                                Contact support
                            </a>
                        </div>
                    </div>
                </BounceSequence>
            </div>
        </div>
    )
}
