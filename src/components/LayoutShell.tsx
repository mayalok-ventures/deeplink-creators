'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const VisitorTracker = dynamic(() => import('@/components/VisitorTracker'), { ssr: false })

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith('/deepadmin')

    return (
        <>
            <VisitorTracker />
            {isAdmin ? (
                children
            ) : (
                <>
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </>
            )}
        </>
    )
}
