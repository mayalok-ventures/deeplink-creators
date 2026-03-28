'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MaskRevealImageProps {
    src: string
    alt: string
    className?: string
    direction?: 'left' | 'right' | 'up'
}

export default function MaskRevealImage({ src, alt, className, direction = 'left' }: MaskRevealImageProps) {
    const container = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end center']
    })

    const maskTranslate = useTransform(scrollYProgress, [0.15, 0.7], ['0%', '-101%'])
    const maskTranslateReverse = useTransform(scrollYProgress, [0.15, 0.7], ['0%', '101%'])
    const imgScale = useTransform(scrollYProgress, [0.15, 0.8], [1.2, 1])
    const imgOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

    const isHorizontal = direction === 'left' || direction === 'right'
    const maskStyle = isHorizontal
        ? { x: direction === 'left' ? maskTranslate : maskTranslateReverse }
        : { y: maskTranslate }

    return (
        <div ref={container} className={cn("relative overflow-hidden rounded-2xl", className)}>
            <motion.div
                className="w-full h-full transform-gpu"
                style={{ scale: imgScale, opacity: imgOpacity }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </motion.div>

            <motion.div
                className="absolute inset-0 bg-[#FAFAF8] z-10 transform-gpu"
                style={maskStyle}
            />

            <motion.div
                className={cn(
                    "absolute z-20 bg-gradient-to-b from-[#C39A2B] to-[#D4AC55] transform-gpu",
                    isHorizontal ? 'top-0 bottom-0 w-[3px]' : 'left-0 right-0 h-[3px]'
                )}
                style={maskStyle}
            />
        </div>
    )
}
