'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initScrollAnimations } from '../lib/animations'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  useEffect(() => {
    const t = setTimeout(initScrollAnimations, 400)
    return () => {
      clearTimeout(t)
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars && st.vars._animLib) st.kill()
      })
    }
  }, [])
}
