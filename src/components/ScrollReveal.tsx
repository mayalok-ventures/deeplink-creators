'use client'

import { useEffect, useRef, ReactNode, CSSProperties } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

export interface ScrollRevealProps {
    children: ReactNode
    delay?: number        // ms delay before animation starts
    direction?: Direction
    distance?: number     // px translation
    duration?: number     // ms
    once?: boolean        // only animate once (default true)
    className?: string
    style?: CSSProperties
    as?: keyof JSX.IntrinsicElements
    key?: string | number // strictly for local TS environment
}

const directionMap: Record<Direction, string> = {
    up: 'translateY(VALpx)',
    down: 'translateY(-VALpx)',
    left: 'translateX(VALpx)',
    right: 'translateX(-VALpx)',
    none: 'none',
}

export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    distance = 32,
    duration = 550,
    once = true,
    className = '',
    style,
    as: Tag = 'div',
}: ScrollRevealProps) {
    const ref = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const initialTransform = directionMap[direction].replace('VAL', String(distance))

        // Set initial hidden state
        el.style.opacity = '0'
        el.style.transform = initialTransform === 'none' ? '' : initialTransform
        el.style.transition = `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        el.style.opacity = '1'
                        el.style.transform = ''
                        if (once) observer.unobserve(el)
                    } else if (!once) {
                        el.style.opacity = '0'
                        el.style.transform = initialTransform === 'none' ? '' : initialTransform
                    }
                })
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [delay, direction, distance, duration, once])

    const Component = Tag as any

    return (
        <Component
            ref={ref}
            className={className}
            style={style}
        >
            {children}
        </Component>
    )
}
