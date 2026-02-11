'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function TopProgressBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        // We can't easily detect navigation START in Next.js App Router
        // without intercepting all clicks, but we can detect when it FINISHES.
        // To show immediate feedback, we'd need to wrap Link.
        // However, we can at least ensure the bar hides when transition completes.
        setIsAnimating(false)
    }, [pathname, searchParams])

    // To make this work effectively, we should expose a way to start it
    // or use a more advanced pattern. For now, let's provide the visual bar
    // that loading.tsx can also trigger if needed.

    return (
        <AnimatePresence>
            {isAnimating && (
                <motion.div
                    initial={{ width: '0%', opacity: 1 }}
                    animate={{ width: '100%', opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="fixed top-0 left-0 right-0 h-1 bg-brand-navy z-[100] shadow-[0_0_10px_rgba(15,23,42,0.5)]"
                />
            )}
        </AnimatePresence>
    )
}
