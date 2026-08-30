'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, RefreshCw, AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('App runtime error:', error)
    }, [error])

    return (
        <div className="min-h-[70vh] bg-[#F3F0E8] text-[#181A16] flex items-center justify-center px-4 py-16">
            <div className="max-w-md w-full bg-white border border-[#181A16]/10 rounded-2xl p-8 text-center shadow-sm space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#9B7545]/10 text-[#9B7545] flex items-center justify-center mx-auto">
                    <AlertTriangle size={24} />
                </div>

                <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#9B7545] uppercase">
                        SYSTEM NOTICE
                    </span>
                    <h2 className="text-xl font-bold font-heading text-[#181A16]">
                        Temporary Operational Issue
                    </h2>
                    <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed">
                        An unexpected condition occurred while loading this view. You can reload or return to the overview.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                        onClick={() => reset()}
                        className="tactile-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#181A16] text-[#F3F0E8] text-xs font-mono font-semibold hover:bg-[#252720] transition-colors"
                    >
                        <RefreshCw size={14} />
                        <span>Retry View</span>
                    </button>
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E6E2D7] text-[#181A16] text-xs font-mono font-medium hover:bg-[#FAF8F5] transition-colors"
                    >
                        <span>Return Home</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
