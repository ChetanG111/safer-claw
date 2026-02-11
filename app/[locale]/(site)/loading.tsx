'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loading() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        // Show after 200ms
        const timer = setTimeout(() => setShow(true), 200)
        return () => clearTimeout(timer)
    }, [])

    if (!show) return null

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
            <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="h-1.5 bg-brand-navy shadow-[0_4px_12px_rgba(15,23,42,0.5),0_0_20px_rgba(15,23,42,0.3)] relative overflow-hidden"
            >
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
            </motion.div>
            <div className="flex items-center justify-center min-h-[50vh]">
                {/* Simple premium spinner for site content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative h-10 w-10"
                >
                    <div className="absolute inset-0 border-2 border-slate-200 rounded-full" />
                    <motion.div
                        className="absolute inset-0 border-2 border-t-brand-navy rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            </div>
        </div>
    )
}
