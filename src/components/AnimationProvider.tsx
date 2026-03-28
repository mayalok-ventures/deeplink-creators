'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

gsap.registerPlugin(ScrollTrigger)

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  useScrollAnimations()
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // Dynamically import Lenis so it never runs on the server
    // and avoids webpack dev-mode chunk graph issues
    let cleanup: (() => void) | undefined
    let rafId: number

    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      // Also feed GSAP ticker for ScrollTrigger
      gsap.ticker.lagSmoothing(0)

      cleanup = () => {
        cancelAnimationFrame(rafId)
        lenis.destroy()
      }
    }).catch(() => {
      // If Lenis fails to load for any reason, gracefully skip
    })

    return () => cleanup?.()
  }, [])

  return <>{children}</>
}
