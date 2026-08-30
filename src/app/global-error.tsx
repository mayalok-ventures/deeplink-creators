'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-[#F3F0E8] text-[#181A16] flex items-center justify-center p-4 font-sans">
                <div className="max-w-md w-full bg-white border border-[#181A16]/10 rounded-2xl p-8 text-center shadow-sm space-y-5">
                    <div className="w-12 h-12 rounded-full bg-[#9B7545]/10 text-[#9B7545] flex items-center justify-center mx-auto">
                        <AlertTriangle size={24} />
                    </div>

                    <div className="space-y-1.5">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#9B7545] uppercase">
                            CRITICAL SYSTEM NOTICE
                        </span>
                        <h2 className="text-xl font-bold font-heading text-[#181A16]">
                            Application Encountered an Error
                        </h2>
                        <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed">
                            A global application exception occurred. Please attempt to reset the session.
                        </p>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={() => reset()}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#181A16] text-[#F3F0E8] text-xs font-mono font-semibold hover:bg-[#252720] transition-colors"
                        >
                            <RefreshCw size={14} />
                            <span>Reset Application State</span>
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}
