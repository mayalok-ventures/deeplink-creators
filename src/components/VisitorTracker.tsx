'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackVisit } from '@/lib/analytics'

export default function VisitorTracker() {
    const pathname = usePathname()

    useEffect(() => {
        if (pathname?.startsWith('/deepadmin')) return
        trackVisit(pathname || '/').catch(() => {})
    }, [pathname])

    return null
}
