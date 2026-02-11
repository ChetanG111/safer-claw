'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth/auth-client'
import { useTranslations } from 'next-intl'

interface LogoutButtonProps {
    variant?: 'ghost' | 'default' | 'outline' | 'destructive' | 'secondary' | 'link'
    className?: string
    isMobile?: boolean
}

export function LogoutButton({ variant = 'ghost', className, isMobile = false }: LogoutButtonProps) {
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const router = useRouter()
    const t = useTranslations('Settings')

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

    return (
        <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant={variant}
            className={className}
        >
            <LogOut className='h-5 w-5' />
            {isLoggingOut ? t('loggingOut') : t('logOut')}
        </Button>
    )
}
