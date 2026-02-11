'use client'

import { LoadingShowcase } from '@/components/feedback/loading-showcase'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loading() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        // Delay showing the full showcase to prevent flickering for fast loads
        const timer = setTimeout(() => setShow(true), 300)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-8">
            {show ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-2xl"
                >
                    <LoadingShowcase
                        title="Loading Dashboard"
                        className="border-none bg-transparent backdrop-blur-none shadow-none"
                        hideBackground={true}
                    />
                </motion.div>
            ) : (
                /* Subtle initial feedback */
                <div className="relative h-16 w-16">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 border-4 border-brand-navy/10 rounded-full"
                    />
                    <motion.div
                        className="absolute inset-0 border-4 border-t-brand-navy rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            )}
        </div>
    )
}
