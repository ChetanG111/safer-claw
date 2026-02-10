'use client'

interface GridLayoutProps {
  children: React.ReactNode
  className?: string
}

import { StampBackground } from '@/components/branding/stamp-background'

export const GridLayout = ({ children, className = '' }: GridLayoutProps) => {
  return (
    <div className={`relative min-h-screen ${className}`}>
      <StampBackground />
      <div className='relative z-10'>{children}</div>
    </div>
  )
}

interface SectionDividerProps {
  className?: string
}

export const SectionDivider = ({ className = '' }: SectionDividerProps) => {
  return (
    <div className={`${className}`}>
      <div className='h-px w-full bg-[#E4E4E7]' />
    </div>
  )
}
