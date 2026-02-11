'use client'

import { useState, useEffect } from 'react'
import { useSession } from '@/lib/auth/auth-client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle2, XCircle, ExternalLink, CreditCard, Calendar, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface SubscriptionData {
    status: 'active' | 'cancelled' | 'expired' | 'none'
    planName?: string
    amount?: number
    currency?: string
    currentPeriodEnd?: string
    cancelAtPeriodEnd?: boolean
    usage?: {
        credits: {
            used: number
            total: number
        }
    }
}

export default function BillingPage() {
    const { data: session } = useSession()
    const user = session?.user
    const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isManaging, setIsManaging] = useState(false)

    useEffect(() => {
        fetchSubscriptionData()
    }, [])

    const fetchSubscriptionData = async () => {
        try {
            const response = await fetch('/api/subscription/status')
            if (response.ok) {
                const data = await response.json()
                setSubscription(data)
            } else {
                setSubscription({ status: 'none' })
            }
        } catch (error) {
            console.error('Error fetching subscription:', error)
            setSubscription({ status: 'none' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleManageSubscription = async () => {
        setIsManaging(true)
        try {
            const response = await fetch('/api/subscription/manage-portal', {
                method: 'POST',
            })

            if (response.ok) {
                const { url } = await response.json()
                window.location.href = url
            } else {
                throw new Error('Failed to create portal session')
            }
        } catch (error) {
            console.error('Error managing subscription:', error)
            alert('Failed to open billing portal. Please try again.')
            setIsManaging(false)
        }
    }

    const handleUpgrade = () => {
        window.location.href = '/pricing'
    }

    if (isLoading) {
        return (
            <div className='flex items-center justify-center py-12'>
                <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
            </div>
        )
    }

    const creditsPercentage = subscription?.usage?.credits
        ? (subscription.usage.credits.used / subscription.usage.credits.total) * 100
        : 0

    return (
        <div className='max-w-2xl space-y-8'>
            {/* Header */}
            <div>
                <h2 className='text-2xl font-bold text-foreground md:text-3xl'>Billing & Plans</h2>
                <p className='mt-2 text-sm text-muted-foreground md:text-base'>
                    Manage your subscription and usage.
                </p>
            </div>

            {/* Subscription Status */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle className='flex items-center gap-2'>
                                <CreditCard className='h-5 w-5' />
                                Current Plan
                            </CardTitle>
                            {subscription?.status === 'active' ? (
                                <Badge variant='default' className='gap-1'>
                                    <CheckCircle2 className='h-3 w-3' />
                                    Active
                                </Badge>
                            ) : subscription?.status === 'cancelled' ? (
                                <Badge variant='destructive' className='gap-1'>
                                    <XCircle className='h-3 w-3' />
                                    Cancelled
                                </Badge>
                            ) : (
                                <Badge variant='outline'>None</Badge>
                            )}
                        </div>
                        {subscription?.planName && (
                            <CardDescription>{subscription.planName}</CardDescription>
                        )}
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        {subscription?.status === 'active' ? (
                            <>
                                <div className='flex items-baseline gap-2'>
                                    <span className='text-3xl font-bold'>
                                        ${subscription.amount ? (subscription.amount / 100).toFixed(0) : '0'}
                                    </span>
                                    <span className='text-muted-foreground'>/month</span>
                                </div>

                                {subscription.currentPeriodEnd && (
                                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                        <Calendar className='h-4 w-4' />
                                        {subscription.cancelAtPeriodEnd ? (
                                            <span>Expires on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
                                        ) : (
                                            <span>Renews on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
                                        )}
                                    </div>
                                )}

                                <Button
                                    onClick={handleManageSubscription}
                                    disabled={isManaging}
                                    variant='outline'
                                    className='w-full gap-2'
                                >
                                    {isManaging ? (
                                        <>
                                            <Loader2 className='h-4 w-4 animate-spin' />
                                            Opening billing portal...
                                        </>
                                    ) : (
                                        <>
                                            Manage Subscription
                                            <ExternalLink className='h-4 w-4' />
                                        </>
                                    )}
                                </Button>
                            </>
                        ) : (
                            <>
                                <p className='text-muted-foreground'>
                                    You don't have an active subscription. Upgrade to access all features.
                                </p>
                                <Button onClick={handleUpgrade} className='w-full'>
                                    Upgrade Now
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Usage Statistics */}
            {subscription?.status === 'active' && subscription.usage && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <TrendingUp className='h-5 w-5' />
                                Usage This Month
                            </CardTitle>
                            <CardDescription>AI credits included in your plan</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-between text-sm'>
                                    <span className='text-muted-foreground'>AI Credits</span>
                                    <span className='font-semibold'>
                                        ${subscription.usage.credits.used.toFixed(2)} / ${subscription.usage.credits.total.toFixed(2)}
                                    </span>
                                </div>
                                <Progress value={creditsPercentage} className='h-2' />
                                <p className='text-xs text-muted-foreground'>
                                    {creditsPercentage < 80
                                        ? 'You have plenty of credits remaining this month.'
                                        : creditsPercentage < 100
                                            ? 'You are running low on credits. Consider upgrading if you need more.'
                                            : 'You have used all your credits. Additional usage will be billed separately.'}
                                </p>
                            </div>

                            <div className='rounded-lg bg-muted/50 p-4 text-sm'>
                                <h4 className='font-semibold mb-2'>What's included:</h4>
                                <ul className='space-y-1 text-muted-foreground'>
                                    <li>• Unlimited local execution</li>
                                    <li>• Full source code access</li>
                                    <li>• Priority community support</li>
                                    <li>• Access to Claude, GPT-4, and Gemini models</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    )
}
