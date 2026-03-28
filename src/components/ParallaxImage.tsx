'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxImageProps {
    src: string
    alt: string
    className?: string
}

export default function ParallaxImage({ src, alt, className }: ParallaxImageProps) {
    const container = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    })

    // Clip path reveal: expands from a circle to full rectangle
    const clipPath = useTransform(
        scrollYProgress,
        [0.1, 0.4],
        ['circle(20% at 50% 50%)', 'circle(150% at 50% 50%)']
    )

    // Subtle parallax scale for the image itself
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

    return (
        <motion.div 
            ref={container} 
            className={cn("relative overflow-hidden group rounded-2xl transform-gpu", className)}
            style={{ clipPath, willChange: 'clip-path' }}
        >
            <motion.div
                className="w-full h-full transform-gpu"
                style={{ scale, willChange: 'transform' }}
            >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src={src} 
                    alt={alt}
                    className="w-full h-full object-cover grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-700"
                />
            </motion.div>
            
            {/* Border beam effect if needed, can add a pseudo element via CSS */}
            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none z-20" />
        </motion.div>
    )
}
