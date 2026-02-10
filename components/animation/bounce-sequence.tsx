'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface BounceSequenceProps {
    children: React.ReactNode
    className?: string
    staggerDelay?: number
    initialDelay?: number
    direction?: 'up' | 'down' | 'left' | 'right' | 'none'
    amount?: number
}

export const BounceSequence = ({
    children,
    className = '',
    staggerDelay = 0.1,
    initialDelay = 0,
    direction = 'up',
    amount = 20
}: BounceSequenceProps) => {
    const getInitialProps = () => {
        switch (direction) {
            case 'up': return { y: amount }
            case 'down': return { y: -amount }
            case 'left': return { x: amount }
            case 'right': return { x: -amount }
            default: return {}
        }
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: initialDelay,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, ...getInitialProps(), scale: 0.95 },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
            },
        },
    }

    // Map children to motion items if they aren't already
    const content = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return <motion.div variants={item}>{child}</motion.div>
        }
        return child
    })

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={className}
        >
            {content}
        </motion.div>
    )
}
