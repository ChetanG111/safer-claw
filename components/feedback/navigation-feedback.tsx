'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * A client component that provides immediate visual feedback on navigation.
 * It detects clicks on <a> tags and shows a progress bar.
 */
function ProgressHandler() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isNavigating, setIsNavigating] = useState(false)

    useEffect(() => {
        // When the path or search params change, the navigation is "done"
        setIsNavigating(false)
    }, [pathname, searchParams])

    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const anchor = target.closest('a')

            if (
                anchor &&
                anchor.href &&
                anchor.href.startsWith(window.location.origin) &&
                !anchor.href.includes('#') &&
                anchor.target !== '_blank' &&
                !e.metaKey &&
                !e.ctrlKey &&
                !e.shiftKey &&
                !e.altKey
            ) {
                // Show progress bar on valid internal navigation
                setIsNavigating(true)
            }
        }

        document.addEventListener('click', handleAnchorClick)
        return () => document.removeEventListener('click', handleAnchorClick)
    }, [])

    return (
        <AnimatePresence>
            {isNavigating && (
                <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
                    <motion.div
                        key="nav-progress-bar"
                        initial={{ width: '0%', opacity: 1 }}
                        animate={{ width: '90%', opacity: 1 }}
                        exit={{ width: '100%', opacity: 0 }}
                        transition={{
                            width: { duration: 10, ease: "easeOut" },
                            opacity: { duration: 0.3 }
                        }}
                        className="h-1.5 bg-brand-navy shadow-[0_4px_12px_rgba(15,23,42,0.5),0_0_20px_rgba(15,23,42,0.3)] origin-left relative overflow-hidden"
                    >
                        {/* Moving shimmer effect to catch the eye */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export function NavigationFeedback() {
    return (
        <Suspense fallback={null}>
            <ProgressHandler />
        </Suspense>
    )
}
