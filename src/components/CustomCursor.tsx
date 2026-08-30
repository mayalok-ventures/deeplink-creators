'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const pos = useRef({ x: -100, y: -100 })
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        const isCoarse = window.matchMedia('(pointer: coarse)').matches
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        setDisabled(isCoarse || isReduced)
    }, [])

    const onMove = useCallback((e: MouseEvent) => {
        pos.current.x = e.clientX
        pos.current.y = e.clientY
        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`
            cursorRef.current.style.opacity = '1'
        }
    }, [])

    const onOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!cursorRef.current || !target) return
        if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
            cursorRef.current.classList.add('cursor-hover')
        } else {
            cursorRef.current.classList.remove('cursor-hover')
        }
    }, [])

    useEffect(() => {
        if (disabled) return
        window.addEventListener('mousemove', onMove, { passive: true })
        window.addEventListener('mouseover', onOver, { passive: true })
        const onMouseLeave = () => {
            if (cursorRef.current) cursorRef.current.style.opacity = '0'
        }
        const onMouseEnter = () => {
            if (cursorRef.current) cursorRef.current.style.opacity = '1'
        }
        document.documentElement.addEventListener('mouseleave', onMouseLeave)
        document.documentElement.addEventListener('mouseenter', onMouseEnter)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseover', onOver)
            document.documentElement.removeEventListener('mouseleave', onMouseLeave)
            document.documentElement.removeEventListener('mouseenter', onMouseEnter)
        }
    }, [disabled, onMove, onOver])

    if (disabled) return null

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-5 h-5 rounded-full border border-[#9B7545] bg-[#9B7545]/15 pointer-events-none z-[9999] opacity-0 transition-opacity duration-150 ease-out"
            style={{ willChange: 'transform' }}
        />
    )
}
