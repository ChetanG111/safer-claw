'use client'

import { Link } from '@/i18n/navigation'
import { X, Menu } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useSession } from '@/lib/auth/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { motion } from 'framer-motion'

export default function Navbar({ showLinks = true }: { showLinks?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const user = session?.user

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className='fixed inset-x-0 top-0 z-50 border-b border-slate-200/50 bg-white/70 backdrop-blur-xl'
      >
        <div className='mx-auto max-w-7xl flex h-16 items-center justify-between gap-8 px-4 sm:px-6'>
          <div className='flex items-center gap-3'>
            <Link href='/' className='flex items-center gap-2 group'>
              <div className='h-8 w-8 bg-brand-navy rounded-lg flex items-center justify-center transition-transform group-hover:scale-110'>
                <img src='/image.png' alt='Safer-Claw Logo' className='h-5 w-5 object-contain invert' />
              </div>
              <span className='text-xl font-bold tracking-tight text-brand-navy font-heading'>
                safer-claw
              </span>
            </Link>
          </div>

          <div className='hidden flex-1 md:flex justify-center'>
            <div className='flex items-center gap-8'>
              {showLinks && (
                <>
                  <Link
                    href='/#features'
                    className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                  >
                    Features
                  </Link>
                  <Link
                    href='/#pricing'
                    className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                  >
                    Pricing
                  </Link>
                  <Link
                    href='/#faq'
                    className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                  >
                    FAQ
                  </Link>
                  <Link
                    href='/blog'
                    className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                  >
                    Blog
                  </Link>
                </>
              )}
              {user && (
                <Link
                  href='/dashboard'
                  className='text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy'
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className='flex items-center gap-4'>
            {user ? (
              <div className='flex items-center gap-3'>
                <span className='hidden sm:block text-sm font-semibold text-slate-700'>{user.name}</span>
                <Avatar className='h-9 w-9 border-2 border-slate-100'>
                  <AvatarImage src={user.image || ''} alt={user.name} />
                  <AvatarFallback className='bg-slate-100 text-slate-600 font-bold'>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Button
                size="sm"
                className='hidden md:flex rounded-full px-6 font-bold bg-brand-navy text-white hover:bg-brand-navy/90 shadow-lg shadow-slate-200'
                render={
                  <Link href='/#cta'>
                    Launch
                  </Link>
                }
              />
            )}

            <button
              type='button'
              onClick={toggleMenu}
              className='inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden'
            >
              <span className='sr-only'>Toggle menu</span>
              {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className='border-t border-slate-100 bg-white/95 backdrop-blur-lg md:hidden'>
            <div className='mx-auto max-w-6xl space-y-2 px-4 pb-6 pt-4'>
              {showLinks && (
                <>
                  <Link
                    href='#features'
                    className='block rounded-xl px-4 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-all'
                    onClick={toggleMenu}
                  >
                    Features
                  </Link>
                  <Link
                    href='#pricing'
                    className='block rounded-xl px-4 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-all'
                    onClick={toggleMenu}
                  >
                    Pricing
                  </Link>
                  <Link
                    href='#faq'
                    className='block rounded-xl px-4 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-all'
                    onClick={toggleMenu}
                  >
                    FAQ
                  </Link>
                  <Link
                    href='/blog'
                    className='block rounded-xl px-4 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-all'
                    onClick={toggleMenu}
                  >
                    Blog
                  </Link>
                </>
              )}

              {user && (
                <Link
                  href='/dashboard'
                  className='block rounded-xl px-4 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-all'
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              )}

              {!user && (
                <div className='pt-2'>
                  <Button
                    className='w-full rounded-full h-12 font-bold bg-brand-navy text-white hover:bg-brand-navy/90'
                    render={
                      <Link
                        href='/#cta'
                        onClick={toggleMenu}
                      >
                        Launch Now
                      </Link>
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </motion.nav>
    </>
  )
}
