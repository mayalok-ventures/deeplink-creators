'use client'

import { useEffect } from 'react'
import { FileText } from 'lucide-react'
import Link from 'next/link'

interface LegalPageLayoutProps {
    title: string
    lastUpdated: string
    children: React.ReactNode
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'a' || e.key === 'u')) {
                e.preventDefault()
            }
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [])

    return (
        <div className="bg-[#F0EDE6] dark:bg-[#0F1112] min-h-screen py-10 sm:py-16">
            <div
                className="max-w-[820px] mx-auto bg-white dark:bg-[#161718] shadow-[0_2px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_40px_rgba(0,0,0,0.4)] rounded-sm sm:rounded-md select-none"
                onContextMenu={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                style={{ WebkitUserSelect: 'none', MozUserSelect: 'none' } as React.CSSProperties}
            >
                {/* Document header */}
                <div className="border-b-2 border-[#C39A2B]/40 px-8 sm:px-14 pt-12 pb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <FileText className="text-[#C39A2B] flex-shrink-0" size={22} />
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C39A2B]">Legal Document</p>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading text-heading leading-tight">{title}</h1>
                    <p className="text-sm text-paragraph mt-3">
                        Effective Date: <span className="text-heading font-medium">{lastUpdated}</span>
                    </p>
                    <p className="text-xs text-paragraph/60 mt-1">
                        Deeplink Creators — A Unit of Mayalok Venture (Private Limited)
                    </p>
                </div>

                {/* Document body */}
                <div className="px-8 sm:px-14 py-10">
                    <div className="legal-document space-y-8 text-[15px] leading-[1.85] text-paragraph">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 dark:border-white/[0.08] px-8 sm:px-14 py-6">
                    <div className="flex flex-wrap gap-4 text-sm text-paragraph">
                        <Link href="/terms" className="text-[#C39A2B] hover:underline transition-colors">
                            Terms & Conditions
                        </Link>
                        <span className="text-paragraph/30">·</span>
                        <Link href="/privacy" className="text-[#C39A2B] hover:underline transition-colors">
                            Privacy Policy
                        </Link>
                        <span className="text-paragraph/30">·</span>
                        <Link href="/disclaimer" className="text-[#C39A2B] hover:underline transition-colors">
                            Disclaimer
                        </Link>
                    </div>
                    <p className="text-xs text-paragraph/50 mt-3">
                        © {new Date().getFullYear()} Deeplink Creators. All rights reserved. This document may not be reproduced or copied without prior written consent.
                    </p>
                </div>
            </div>
        </div>
    )
}
