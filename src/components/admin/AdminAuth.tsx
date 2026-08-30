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
            <div className="min-h-screen bg-[#171816] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#B99152] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-[#171816] text-[#F6F1E7] flex items-center justify-center p-4 selection:bg-[#B99152]/30 selection:text-white font-sans relative overflow-hidden">
                {/* Subtle Background Glow */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#B99152]/10 blur-3xl pointer-events-none" />

                <div className="w-full max-w-md relative z-10">
                    <div className="bg-[#22231F] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl card-shine-sweep">
                        <div className="text-center mb-8">
                            <div className="relative w-14 h-14 mx-auto mb-4">
                                <Image
                                    src="/images/logo.svg"
                                    alt="Deeplink Creators Logo"
                                    fill
                                    sizes="56px"
                                    className="object-contain"
                                />
                            </div>
                            <h1 className="text-2xl font-bold font-heading text-white tracking-tight">
                                Executive Terminal
                            </h1>
                            <p className="text-xs sm:text-sm text-[#AAA99F] mt-1 font-mono">
                                Deeplink Creators • Admin Access
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="password" className="block text-xs font-mono font-medium text-[#AAA99F] mb-1.5 uppercase tracking-wider">
                                    Terminal Access Password
                                </label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AAA99F]" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 bg-[#292A25] border border-white/10 rounded-xl text-white placeholder-[#AAA99F]/40 text-sm focus:outline-none focus:border-[#B99152] focus:ring-1 focus:ring-[#B99152] transition-colors"
                                        placeholder="Enter password"
                                        required
                                        autoComplete="current-password"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#AAA99F] hover:text-white"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-400 text-xs font-mono text-center bg-red-500/10 border border-red-500/20 py-2.5 px-4 rounded-xl">
                                    {error}
                                </div>
                            )}

                            {locked && (
                                <div className="text-amber-400 text-xs font-mono text-center bg-amber-500/10 border border-amber-500/20 py-2.5 px-4 rounded-xl">
                                    Too many failed attempts. Try again in 30 seconds.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || locked}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B99152] via-[#D4B270] to-[#B99152] text-[#171816] font-heading font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(185,145,82,0.25)] hover:shadow-[0_0_30px_rgba(185,145,82,0.4)] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 min-h-[46px]"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-[#171816] border-t-transparent rounded-full animate-spin" />
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
