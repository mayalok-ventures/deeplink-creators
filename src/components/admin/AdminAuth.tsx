'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { verifyPassword, setAdminSession, isAdminAuthenticated } from '@/lib/admin-auth'

interface AdminAuthProps {
    children: ReactNode
}

export default function AdminAuth({ children }: AdminAuthProps) {
    const [authenticated, setAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [locked, setLocked] = useState(false)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        setAuthenticated(isAdminAuthenticated())
        setChecking(false)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (locked) return
        setLoading(true)
        setError('')

        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        if (newAttempts >= 5) {
            setLocked(true)
            setTimeout(() => {
                setLocked(false)
                setAttempts(0)
            }, 30000)
        }

        await new Promise(r => setTimeout(r, 400))

        const valid = await verifyPassword(password)
        if (valid) {
            setAdminSession()
            setAuthenticated(true)
            setAttempts(0)
        } else {
            setError('Invalid access password')
            setPassword('')
        }
        setLoading(false)
    }

    if (checking) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#9B7545] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] text-[#181A16] flex items-center justify-center p-4 selection:bg-[#9B7545]/20 selection:text-[#181A16] font-sans relative overflow-hidden">
                {/* Clean Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#9B7545]/5 blur-3xl pointer-events-none" />

                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white border border-[#E5E0D8] rounded-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(24,26,22,0.06)]">
                        <div className="text-center mb-8">
                            <div className="relative w-14 h-14 mx-auto mb-4 p-2 bg-[#F3F0E8] rounded-xl border border-[#E5E0D8]">
                                <Image
                                    src="/images/logo.svg"
                                    alt="Deeplink Creators Logo"
                                    fill
                                    sizes="56px"
                                    className="object-contain p-1"
                                />
                            </div>
                            <h1 className="text-2xl font-bold font-heading text-[#181A16] tracking-tight">
                                Executive Terminal
                            </h1>
                            <p className="text-xs sm:text-sm text-[#6B685F] mt-1 font-mono">
                                Deeplink Creators • Admin Access
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="password" className="block text-xs font-mono font-medium text-[#6B685F] mb-1.5 uppercase tracking-wider">
                                    Terminal Access Password
                                </label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C887B]" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-[#181A16] placeholder-[#8C887B]/60 text-sm focus:outline-none focus:border-[#9B7545] focus:ring-2 focus:ring-[#9B7545]/20 transition-all"
                                        placeholder="Enter password"
                                        required
                                        autoComplete="current-password"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C887B] hover:text-[#181A16] transition-colors"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="text-rose-700 text-xs font-mono text-center bg-rose-50 border border-rose-200 py-2.5 px-4 rounded-xl">
                                    {error}
                                </div>
                            )}

                            {locked && (
                                <div className="text-amber-800 text-xs font-mono text-center bg-amber-50 border border-amber-200 py-2.5 px-4 rounded-xl">
                                    Too many failed attempts. Try again in 30 seconds.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || locked}
                                className="w-full py-3.5 rounded-xl bg-[#9B7545] hover:bg-[#86643B] text-white font-heading font-semibold text-sm tracking-wide shadow-[0_4px_14px_rgba(155,117,69,0.25)] hover:shadow-[0_6px_20px_rgba(155,117,69,0.35)] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2 min-h-[46px]"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <ShieldCheck size={16} />
                                        <span>Unlock Command Center</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
