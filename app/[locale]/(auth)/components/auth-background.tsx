import { cn } from '@/lib/utils'
import { StampBackground } from '@/components/branding/stamp-background'

type AuthBackgroundProps = {
  className?: string
  children?: React.ReactNode
}

export default function AuthBackground({ className, children }: AuthBackgroundProps) {
  return (
    <div className={cn('relative min-h-screen w-full overflow-hidden bg-white', className)}>
      <StampBackground />
      <div className='relative z-20'>{children}</div>
    </div>
  )
}
