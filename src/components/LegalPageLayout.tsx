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
        <div className="bg-[#F3F0E8] min-h-screen py-10 sm:py-16 selection:bg-[#9B7545]/20 selection:text-[#181A16]">
            <div
                className="max-w-[820px] mx-auto bg-white shadow-[0_2px_40px_rgba(24,26,22,0.06)] border border-[#181A16]/10 rounded-2xl select-none"
                onContextMenu={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                style={{ WebkitUserSelect: 'none', MozUserSelect: 'none' } as React.CSSProperties}
            >
                {/* Document header */}
                <div className="border-b border-[#181A16]/10 px-8 sm:px-14 pt-12 pb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <FileText className="text-[#9B7545] flex-shrink-0" size={22} />
                        <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#9B7545]">Legal Document</p>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#181A16] leading-tight">{title}</h1>
                    <p className="text-sm text-[#65675F] mt-3">
                        Effective Date: <span className="text-[#181A16] font-medium">{lastUpdated}</span>
                    </p>
                    <p className="text-xs text-[#65675F] mt-1">
                        Deeplink Creators — A Unit of <a href="https://mayalokventures.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#181A16] transition-colors underline">Mayalok Venture</a> (Private Limited)
                    </p>
                </div>

                {/* Document body */}
                <div className="px-8 sm:px-14 py-10">
                    <div className="legal-document space-y-8 text-[15px] leading-[1.85] text-[#181A16]">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-[#181A16]/10 px-8 sm:px-14 py-6 bg-[#FAF8F5] rounded-b-2xl">
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-[#65675F]">
                        <Link href="/terms" className="text-[#9B7545] hover:underline transition-colors">
                            Terms & Conditions
                        </Link>
                        <span className="text-[#181A16]/20">·</span>
                        <Link href="/privacy" className="text-[#9B7545] hover:underline transition-colors">
                            Privacy Policy
                        </Link>
                        <span className="text-[#181A16]/20">·</span>
                        <Link href="/disclaimer" className="text-[#9B7545] hover:underline transition-colors">
                            Disclaimer
                        </Link>
                    </div>
                    <p className="text-xs text-[#65675F] mt-3">
                        © {new Date().getFullYear()} Deeplink Creators. All rights reserved. This document may not be reproduced or copied without prior written consent.
                    </p>
                </div>
            </div>
        </div>
    )
}
