'use client'

import { Link } from '@/i18n/navigation'
import { client } from '@/lib/auth/auth-client'

import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import {
  Tooltip,
  TooltipCreateHandle,
  TooltipProvider,
  TooltipTrigger,
  TooltipPopup,
} from '@/components/ui/tooltip'


const tooltipHandle = TooltipCreateHandle<React.ComponentType>()

export default function Hero() {
  return (
    <main
      id='hero'
      className='flex min-h-screen flex-col bg-[#F4F4F5] items-center justify-center py-24'
    >
      <div className='mx-auto w-full max-w-6xl px-4 sm:px-6'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='mx-auto max-w-3xl text-balance text-center font-semibold text-4xl leading-tight tracking-tighter sm:text-5xl md:max-w-4xl md:text-6xl lg:leading-[1.1]'>
            Your private,{' '}
            <span className='relative inline-block px-2'>
              <svg
                className='absolute inset-0 w-[110%] h-[120%] -left-[5%] -top-[10%] -rotate-2 -z-10 text-orange-400 opacity-90'
                viewBox='0 0 272 66'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='none'
              >
                <path
                  d='M5.42461 45.3409C5.42461 45.3409 68.6186 -5.67909 261.218 10.3341C267.892 10.8879 270.62 18.0463 266.079 26.5684C236.467 82.1287 90.2526 73.1764 45.5684 63.8569C25.4678 59.6645 -11.5323 57.0784 5.42461 45.3409Z'
                  fill='currentColor'
                />
              </svg>
              <span className='relative z-10'>safe</span>
            </span>
            , controllable AI operator inside your business inbox
          </h1>
          <p className='mx-auto mt-6 max-w-xl text-balance text-center text-muted-foreground md:max-w-2xl md:text-lg'>
            A controlled, secure AI assistant that can run workflows, automate repetitive tasks, and act like a digital employee inside your existing chat tools.
          </p>
          <div className='mx-auto mt-10 flex items-center justify-center gap-4'>
            <Button
              className='font-semibold h-12! px-8 text-base text-white'
              onClick={async () => {
                await client.signIn.social({
                  provider: 'google',
                  callbackURL: '/dashboard'
                })
              }}
            >
              Join Waitlist
              <ArrowUpRight className='h-8 w-8 ml-0' />
            </Button>

          </div>
        </div>

        {/* Built With Section */}
        {/* Built With Section */}
        {/* <TooltipProvider>
          <div className='mt-24 w-full'>
            <h2
              className='text-center text-sm font-medium text-muted-foreground mb-8'
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              DEPLOY OPENCLAW TO YOUR FAVORITE CHAT APPS
            </h2>
            <div className='flex items-center justify-center gap-6 sm:gap-10 md:gap-12 flex-wrap'>
              <TooltipTrigger
                handle={tooltipHandle}
                payload={() => <span>OpenClaw</span>}
                className='flex items-center justify-center h-16 w-16 cursor-pointer'
              >
                <img
                  src='/stack-icons/openclaw.svg'
                  alt='OpenClaw'
                  className='h-16 w-16 transition-transform duration-200 hover:scale-110'
                />
              </TooltipTrigger>

              <TooltipTrigger
                handle={tooltipHandle}
                payload={() => <span>Telegram</span>}
                className='flex items-center justify-center h-16 w-16 cursor-pointer'
              >
                <img
                  src='/stack-icons/telegram.svg'
                  alt='Telegram'
                  className='h-16 w-16 transition-transform duration-200 hover:scale-110'
                />
              </TooltipTrigger>

              <TooltipTrigger
                handle={tooltipHandle}
                payload={() => <span>WhatsApp</span>}
                className='flex items-center justify-center h-16 w-16 cursor-pointer'
              >
                <img
                  src='/stack-icons/whatsapp.svg'
                  alt='WhatsApp'
                  className='h-16 w-16 transition-transform duration-200 hover:scale-110'
                />
              </TooltipTrigger>
            </div>
          </div>

          <Tooltip handle={tooltipHandle}>
            {({ payload: Payload }) => (
              <TooltipPopup>{Payload !== undefined && <Payload />}</TooltipPopup>
            )}
          </Tooltip>
        </TooltipProvider> */}
      </div>
    </main>
  )
}
