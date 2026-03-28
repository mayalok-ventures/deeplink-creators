'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HorizontalScrollSectionProps {
    children: ReactNode
    itemCount: number
    className?: string
}

export default function HorizontalScrollSection({ children, itemCount, className = '' }: HorizontalScrollSectionProps) {
    const container = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const x = useTransform(scrollYProgress, [0, 1], ['1%', `${-(itemCount - 1) * 100 / itemCount}%`])

    return (
        <section ref={container} className={className} style={{ height: `${itemCount * 100}vh` }}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    className="flex transform-gpu"
                    style={{ x }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    )
}
