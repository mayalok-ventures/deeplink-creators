'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface TextRevealOnScrollProps {
    text: string
    className?: string
}

function Word({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.15, 1])
    const y = useTransform(progress, range, [4, 0])
    return (
        <motion.span
            style={{ opacity, y }}
            className="inline-block mr-[0.3em] transform-gpu"
        >
            {word}
        </motion.span>
    )
}

export default function TextRevealOnScroll({ text, className = '' }: TextRevealOnScrollProps) {
    const container = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start 0.9', 'start 0.25']
    })

    const words = text.split(' ')

    return (
        <div ref={container} className={className}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading leading-snug text-heading">
                {words.map((word, i) => {
                    const start = i / words.length
                    const end = start + 1 / words.length
                    return (
                        <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
                    )
                })}
            </p>
        </div>
    )
}
