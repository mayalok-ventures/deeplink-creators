'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackVisit } from '@/lib/analytics'

export default function VisitorTracker() {
    const pathname = usePathname()

    useEffect(() => {
        if (pathname?.startsWith('/deepadmin')) return

        // 1. Record route transition visit
        trackVisit(pathname || '/').catch(() => {})

        // 2. Active presence heartbeat every 45 seconds while tab is open
        const heartbeat = setInterval(() => {
            if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
                trackVisit(pathname || '/').catch(() => {})
            }
        }, 45000)

        return () => clearInterval(heartbeat)
    }, [pathname])

    return null
}
