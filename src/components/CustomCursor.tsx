'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const pos = useRef({ x: -100, y: -100 })
    const [isMobile, setIsMobile] = useState(true)

    useEffect(() => {
        setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    }, [])

    const onMove = useCallback((e: MouseEvent) => {
        pos.current.x = e.clientX
        pos.current.y = e.clientY
        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`
            cursorRef.current.style.opacity = '1'
        }
    }, [])

    const onOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!cursorRef.current) return
        if (target.closest('a') || target.closest('button')) {
            cursorRef.current.classList.add('cursor-hover')
        } else {
            cursorRef.current.classList.remove('cursor-hover')
        }
    }, [])

    useEffect(() => {
        if (isMobile) return
        window.addEventListener('mousemove', onMove, { passive: true })
        window.addEventListener('mouseover', onOver, { passive: true })
        document.documentElement.addEventListener('mouseleave', () => {
            if (cursorRef.current) cursorRef.current.style.opacity = '0'
        })
        document.documentElement.addEventListener('mouseenter', () => {
            if (cursorRef.current) cursorRef.current.style.opacity = '1'
        })
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseover', onOver)
        }
    }, [isMobile, onMove, onOver])

    if (isMobile) return null

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#C39A2B] bg-[#C39A2B]/10 pointer-events-none z-[9999] opacity-0 transition-[width,height,border-width,background-color] duration-150 ease-out cursor-hover:scale-[2.5]"
            style={{ willChange: 'transform' }}
        />
    )
}
