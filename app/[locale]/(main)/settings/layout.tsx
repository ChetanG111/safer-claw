'use client'

import { Link } from '@/i18n/navigation'
import { usePathname, useRouter } from 'next/navigation'
import { User, CreditCard, HelpCircle, LogOut, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BounceSequence } from '@/components/animation/bounce-sequence'
import { motion } from 'framer-motion'
import { signOut } from '@/lib/auth/auth-client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { StampBackground } from '@/components/branding/stamp-background'

const SETTINGS_SECTIONS = [
    {
        id: 'account',
        label: 'Account',
        description: 'Personal information and security',
        icon: User,
        href: '/settings/account',
    },
    {
        id: 'billing',
        label: 'Billing & Plans',
        description: 'Manage your subscription and usage',
        icon: CreditCard,
        href: '/settings/billing',
    },
    {
        id: 'help',
        label: 'Help & About',
        description: 'Support, documentation, and legal',
        icon: HelpCircle,
        href: '/settings/help',
    },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await signOut()
            router.push('/')
        } catch (error) {
            console.error('Logout error:', error)
            setIsLoggingOut(false)
        }
    }

    // Get active section from pathname
    const activeSection = SETTINGS_SECTIONS.find((section) =>
        pathname.includes(section.id)
    )?.id || 'account'

    return (
        <div className='w-full'>
            <div className='relative'>
                {/* Mobile Header */}
                <div className='sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg md:hidden'>
                    <div className='flex h-14 items-center gap-4 px-4'>
                        <button
                            onClick={() => router.back()}
                            className='flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors'
                        >
                            <ChevronLeft className='h-5 w-5' />
                        </button>
                        <h1 className='flex-1 text-center text-lg font-bold'>Settings</h1>
                        <div className='w-9' /> {/* Spacer for centering */}
                    </div>

                    {/* Mobile Tabs */}
                    <div className='overflow-x-auto overflow-y-hidden scrollbar-hide'>
                        <div className='flex gap-2 px-4 pb-3 min-w-max'>
                            {SETTINGS_SECTIONS.map((section) => {
                                const Icon = section.icon
                                const isActive = activeSection === section.id

                                return (
                                    <Link
                                        key={section.id}
                                        href={section.href}
                                        className={cn(
                                            'flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all',
                                            isActive
                                                ? 'bg-muted text-foreground'
                                                : 'text-muted-foreground hover:bg-muted/50'
                                        )}
                                    >
                                        <Icon className='h-4 w-4' />
                                        {section.label}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className='mx-auto max-w-7xl pb-24 md:pb-0'>
                    <div className='flex gap-8 p-4 md:p-8'>
                        {/* Desktop Sidebar */}
                        <motion.aside
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className='hidden md:block w-64 shrink-0'
                        >
                            <div className='sticky top-24 space-y-6'>
                                <div>
                                    <h1 className='text-2xl font-bold mb-6'>Settings</h1>

                                    <nav className='space-y-1'>
                                        {SETTINGS_SECTIONS.map((section) => {
                                            const Icon = section.icon
                                            const isActive = activeSection === section.id

                                            return (
                                                <Link
                                                    key={section.id}
                                                    href={section.href}
                                                    className={cn(
                                                        'flex items-start gap-3 rounded-xl px-4 py-3 transition-all group',
                                                        isActive
                                                            ? 'bg-muted text-foreground'
                                                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                                    )}
                                                >
                                                    <Icon
                                                        className={cn(
                                                            'h-5 w-5 mt-0.5 transition-colors',
                                                            isActive ? 'text-foreground' : 'text-muted-foreground'
                                                        )}
                                                    />
                                                    <div>
                                                        <div className='font-semibold text-sm'>{section.label}</div>
                                                        <div className='text-xs text-muted-foreground mt-0.5'>
                                                            {section.description}
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </nav>
                                </div>

                                {/* Log Out Button */}
                                <div className='pt-4 border-t border-border'>
                                    <Button
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        variant='ghost'
                                        className='w-full justify-start gap-3 text-muted-foreground hover:text-destructive'
                                    >
                                        <LogOut className='h-5 w-5' />
                                        {isLoggingOut ? 'Logging out...' : 'Log Out'}
                                    </Button>
                                </div>
                            </div>
                        </motion.aside>

                        {/* Main Content */}
                        <main className='flex-1 min-w-0'>
                            <BounceSequence direction='up' staggerDelay={0.05}>
                                {children}
                            </BounceSequence>
                        </main>
                    </div>
                </div>

                {/* Mobile Log Out Button */}
                <div className='md:hidden fixed bottom-0 inset-x-0 border-t border-border bg-background/95 backdrop-blur-lg p-4 safe-area-bottom'>
                    <Button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        variant='ghost'
                        className='w-full justify-center gap-3 text-muted-foreground hover:text-destructive'
                    >
                        <LogOut className='h-5 w-5' />
                        {isLoggingOut ? 'Logging out...' : 'Log Out'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
