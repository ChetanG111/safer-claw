'use client'

import { useState } from 'react'
import { useSession } from '@/lib/auth/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { AlertTriangle, Loader2, Save } from 'lucide-react'
import { motion } from 'framer-motion'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'

export default function AccountPage() {
    const { data: session } = useSession()
    const user = session?.user
    const router = useRouter()

    const [displayName, setDisplayName] = useState(user?.name || '')
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleSaveDisplayName = async () => {
        if (!displayName.trim() || displayName === user?.name) return

        setIsSaving(true)
        try {
            const response = await fetch('/api/user/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: displayName.trim() }),
            })

            if (!response.ok) {
                throw new Error('Failed to update profile')
            }

            // Reload session to get updated data
            window.location.reload()
        } catch (error) {
            console.error('Error updating profile:', error)
            alert('Failed to update display name. Please try again.')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeleteAccount = async () => {
        setIsDeleting(true)
        try {
            const response = await fetch('/api/user/delete-account', {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete account')
            }

            // Redirect to home page
            router.push('/')
        } catch (error) {
            console.error('Error deleting account:', error)
            alert('Failed to delete account. Please try again.')
            setIsDeleting(false)
        }
    }

    if (!user) {
        return (
            <div className='flex items-center justify-center py-12'>
                <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
            </div>
        )
    }

    const hasChanges = displayName.trim() !== user.name && displayName.trim() !== ''

    return (
        <div className='max-w-2xl space-y-8'>
            {/* Header */}
            <div>
                <h2 className='text-2xl font-bold text-foreground md:text-3xl'>Personal Information</h2>
                <p className='mt-2 text-sm text-muted-foreground md:text-base'>
                    Manage your profile details and preferences.
                </p>
            </div>

            {/* Avatar Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-start gap-4'
            >
                <Avatar className='h-20 w-20 border-4 border-muted'>
                    <AvatarImage src={user.image || ''} alt={user.name} referrerPolicy='no-referrer' />
                    <AvatarFallback className='bg-muted text-foreground text-2xl font-bold'>
                        {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                    <p className='text-sm italic text-muted-foreground'>Avatar managed via Google Account</p>
                </div>
            </motion.div>

            {/* Display Name */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='space-y-2'
            >
                <Label htmlFor='display-name' className='text-sm font-semibold'>
                    Display Name
                </Label>
                <div className='flex gap-3'>
                    <Input
                        id='display-name'
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder='Enter your display name'
                        className='flex-1'
                    />
                    {hasChanges && (
                        <Button
                            onClick={handleSaveDisplayName}
                            disabled={isSaving}
                            className='gap-2'
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className='h-4 w-4 animate-spin' />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className='h-4 w-4' />
                                    Save
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </motion.div>

            {/* Email Address */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='space-y-2'
            >
                <Label htmlFor='email' className='text-sm font-semibold'>
                    Email Address
                </Label>
                <Input
                    id='email'
                    value={user.email}
                    disabled
                    className='bg-muted/50 cursor-not-allowed'
                />
                <p className='text-xs text-muted-foreground'>
                    Email cannot be changed as it's linked to your Google Account.
                </p>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='rounded-xl border-2 border-destructive/20 bg-destructive/5 p-6 space-y-4'
            >
                <div className='flex items-center gap-2 text-destructive'>
                    <AlertTriangle className='h-5 w-5' />
                    <h3 className='font-bold text-base'>Danger Zone</h3>
                </div>
                <p className='text-sm text-foreground/80'>
                    Permanently delete your account and all of your content. This action cannot be undone.
                </p>

                <AlertDialog>
                    <AlertDialogTrigger
                        className='mt-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-destructive text-white hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Deleting...
                            </>
                        ) : (
                            'Delete Account'
                        )}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove
                                all your data from our servers, including:
                                <ul className='mt-2 list-disc list-inside space-y-1'>
                                    <li>Your profile information</li>
                                    <li>All deployed agents</li>
                                    <li>Subscription and billing data</li>
                                    <li>Usage history and logs</li>
                                </ul>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteAccount}
                                className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                            >
                                Yes, delete my account
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </motion.div>
        </div>
    )
}
