'use client'

import { Link } from '@/i18n/navigation'
import { NotificationBell } from '@/components/notifications/notification-bell'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'

interface User {
  name: string
  email: string
  image?: string | null
}

interface AppHeaderProps {
  user?: User | any
}

export function AppHeader({ user }: AppHeaderProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className='sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-xl'
    >
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6'>
        <div className='flex items-center gap-3'>
          <Link href='/' className='flex items-center gap-2 group'>
            <div className='h-8 w-8 bg-brand-navy rounded-lg flex items-center justify-center transition-transform group-hover:scale-110'>
              <img src='/image.png' alt='Safer-Claw Logo' className='h-5 w-5 object-contain invert' />
            </div>
            <span
              className='text-xl font-bold tracking-tight text-brand-navy font-heading'
            >
              safer-claw
            </span>
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' asChild className='rounded-full hover:bg-slate-100 transition-colors'>
              <Link href='/dashboard/settings'>
                <Settings className='h-5 w-5 text-slate-500' />
              </Link>
            </Button>
            <NotificationBell />
          </div>

          {user && <div className='hidden h-6 w-px bg-slate-200 md:block' />}

          {user && (
            <div className='hidden items-center gap-3 sm:flex'>
              <span className='text-sm font-semibold text-slate-700'>{user.name}</span>
              <Avatar className='h-9 w-9 border-2 border-slate-100'>
                <AvatarImage src={user.image || ''} alt={user.name} />
                <AvatarFallback className='bg-slate-100 text-slate-600 font-bold'>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
