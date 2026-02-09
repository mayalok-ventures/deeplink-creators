'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Lock, Eye, EyeOff, Shield } from 'lucide-react'
import { verifyPassword, setAdminSession, isAdminAuthenticated, clearAdminSession } from '@/lib/admin-auth'

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

        if (newAttempts >= 3) {
            setLocked(true)
            setTimeout(() => {
                setLocked(false)
                setAttempts(0)
            }, 30000)
        }

        await new Promise(r => setTimeout(r, 1000))

        const valid = await verifyPassword(password)
        if (valid) {
            setAdminSession()
            setAuthenticated(true)
            setAttempts(0)
        } else {
            setError('Invalid password')
            setPassword('')
        }
        setLoading(false)
    }

    if (checking) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="glass-card rounded-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="text-primary-400" size={32} />
                            </div>
                            <h1 className="text-2xl font-bold font-heading text-heading">Admin Access</h1>
                            <p className="text-paragraph text-sm mt-2">Enter your password to continue</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-heading mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-paragraph" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                        placeholder="Enter admin password"
                                        required
                                        autoComplete="off"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-paragraph hover:text-heading"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 px-4 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {locked && (
                                <div className="text-yellow-400 text-sm text-center bg-yellow-500/10 py-2 px-4 rounded-lg">
                                    Too many attempts. Try again in 30 seconds.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || locked}
                                className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Lock size={18} />
                                        Sign In
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
