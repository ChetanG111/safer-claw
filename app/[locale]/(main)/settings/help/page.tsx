'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, FileText, MessageCircle, Github, Mail, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

const SUPPORT_LINKS = [
    {
        title: 'Documentation',
        description: 'Browse our comprehensive guides and API reference',
        icon: BookOpen,
        href: 'https://docs.safer-claw.com',
        external: true,
    },
    {
        title: 'Community Support',
        description: 'Join our Discord community for help and discussions',
        icon: MessageCircle,
        href: 'https://discord.gg/safer-claw',
        external: true,
    },
    {
        title: 'GitHub Repository',
        description: 'View source code, report issues, and contribute',
        icon: Github,
        href: 'https://github.com/ChetanG111/safer-claw',
        external: true,
    },
    {
        title: 'Email Support',
        description: 'Get in touch with our support team',
        icon: Mail,
        href: 'mailto:support@safer-claw.com',
        external: false,
    },
]

const LEGAL_LINKS = [
    {
        title: 'Privacy Policy',
        description: 'How we handle your data',
        href: '/privacy',
    },
    {
        title: 'Terms of Service',
        description: 'Terms and conditions for using Safer-Claw',
        href: '/terms',
    },
    {
        title: 'Licenses',
        description: 'Open source licenses and attributions',
        href: '/licenses',
    },
]

export default function HelpPage() {
    return (
        <div className='max-w-2xl space-y-8'>
            {/* Header */}
            <div>
                <h2 className='text-2xl font-bold text-foreground md:text-3xl'>Help & About</h2>
                <p className='mt-2 text-sm text-muted-foreground md:text-base'>
                    Support, documentation, and legal information.
                </p>
            </div>

            {/* Support Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='space-y-3'
            >
                <h3 className='text-lg font-semibold'>Support</h3>
                <div className='grid gap-3'>
                    {SUPPORT_LINKS.map((link, index) => {
                        const Icon = link.icon
                        return (
                            <motion.div
                                key={link.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className='transition-all hover:border-primary/50 hover:shadow-md'>
                                    <CardHeader className='pb-3'>
                                        <div className='flex items-start justify-between'>
                                            <div className='flex items-start gap-3'>
                                                <div className='rounded-lg bg-primary/10 p-2'>
                                                    <Icon className='h-5 w-5 text-primary' />
                                                </div>
                                                <div>
                                                    <CardTitle className='text-base'>{link.title}</CardTitle>
                                                    <CardDescription className='text-sm mt-1'>
                                                        {link.description}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            {link.external && <ExternalLink className='h-4 w-4 text-muted-foreground' />}
                                        </div>
                                    </CardHeader>
                                    <CardContent className='pt-0'>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            className='w-full justify-start'
                                            asChild
                                        >
                                            <a
                                                href={link.href}
                                                target={link.external ? '_blank' : '_self'}
                                                rel={link.external ? 'noopener noreferrer' : undefined}
                                            >
                                                Visit
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>

            {/* Legal Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='space-y-3'
            >
                <h3 className='text-lg font-semibold'>Legal</h3>
                <div className='grid gap-3'>
                    {LEGAL_LINKS.map((link, index) => (
                        <motion.div
                            key={link.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                        >
                            <Card className='transition-all hover:border-primary/50 hover:shadow-md'>
                                <CardHeader className='pb-3'>
                                    <div className='flex items-start justify-between'>
                                        <div className='flex items-start gap-3'>
                                            <div className='rounded-lg bg-muted p-2'>
                                                <FileText className='h-5 w-5 text-muted-foreground' />
                                            </div>
                                            <div>
                                                <CardTitle className='text-base'>{link.title}</CardTitle>
                                                <CardDescription className='text-sm mt-1'>
                                                    {link.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className='pt-0'>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        className='w-full justify-start'
                                        asChild
                                    >
                                        <a href={link.href}>View</a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* About Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>About Safer-Claw</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-3 text-sm text-muted-foreground'>
                        <p>
                            Safer-Claw is an AI-powered platform that enables you to deploy intelligent agents
                            across multiple communication channels with ease.
                        </p>
                        <div className='flex items-center gap-2 pt-2 border-t border-border'>
                            <span className='font-semibold text-foreground'>Version:</span>
                            <span>1.0.0</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='font-semibold text-foreground'>License:</span>
                            <span>MIT</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
