import { Link } from '@/i18n/navigation'
import { NotificationBell } from '@/components/notifications/notification-bell'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface User {
  name: string
  email: string
  image?: string | null
}

interface AppHeaderProps {
  user?: User
}

export function AppHeader({ user }: AppHeaderProps) {
  return (
    <nav className='sticky top-0 z-30 w-full border-b border-[#E4E4E7] bg-[#F4F4F5]'>
      <div className='mx-auto flex h-14 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6'>
        <div className='flex items-center gap-3'>
          <Link href='/' className='flex items-center gap-2'>
            <img src='/image.png' alt='Safer-Claw Logo' className='h-6 w-6 object-contain' />
            <span
              className='text-base font-semibold text-foreground'
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Safer-Claw
            </span>
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' asChild>
              <Link href='/dashboard/settings'>
                <Settings className='h-5 w-5' />
              </Link>
            </Button>
            <NotificationBell />
          </div>

          {user && <div className='hidden h-6 w-px bg-[#E4E4E7] md:block' />}

          {user && (
            <div className='hidden items-center gap-3 sm:flex'>
              <span className='text-sm font-medium text-muted-foreground'>{user.name}</span>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={user.image || ''} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
