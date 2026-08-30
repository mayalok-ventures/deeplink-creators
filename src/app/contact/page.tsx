'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Lock,
    MapPin,
    Clock,
    Sparkles,
    FileText,
    Building2,
    Send,
    Loader2
} from 'lucide-react'
import { saveLeadSubmission } from '@/lib/db-client'

const ease = [0.22, 1, 0.36, 1] as const

export default function ContactPage() {
    const shouldReduceMotion = useReducedMotion()

    // Controlled form state
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        email: '',
        phone: '',
        interest: 'Software Engineering / SaaS',
        scope: '',
        timeline: '1-3 Months',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrorMessage('')

        try {
            // 1. Save lead directly to MongoDB / Leads Data Layer
            try {
                await saveLeadSubmission({
                    name: formData.name,
                    organization: formData.organization,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.interest,
                    timeline: formData.timeline,
                    scope: formData.scope,
                    source: 'Enterprise Briefing (/contact)',
                    status: 'new'
                })
            } catch (dbErr) {
                console.warn('DB lead save warning:', dbErr)
            }

            // 2. Transmit to Formspree endpoint
            const response = await fetch('https://formspree.io/f/mgolvknv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    Name: formData.name,
                    Organization: formData.organization,
                    Email: formData.email,
                    Phone: formData.phone,
                    Engagement_Type: formData.interest,
                    Timeline: formData.timeline,
                    Project_Scope: formData.scope,
                    _subject: `New Enterprise Briefing: ${formData.organization || formData.name}`,
                }),
            })

            if (response.ok) {
                setSubmitted(true)
                setFormData({
                    name: '',
                    organization: '',
                    email: '',
                    phone: '',
                    interest: 'Software Engineering / SaaS',
                    scope: '',
                    timeline: '1-3 Months',
                })
            } else {
                setSubmitted(true)
            }
        } catch (err) {
            console.error('Submission error:', err)
            setErrorMessage('Network error occurred. Please verify your connection or email directly.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-[#F3F0E8] text-[#181A16] min-h-screen selection:bg-[#9B7545]/20 selection:text-[#181A16] relative overflow-x-hidden font-sans">
            {/* Subtle Architectural Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#181A1608_1px,transparent_1px),linear-gradient(to_bottom,#181A1608_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════════
                SECTION 1 — COMPACT INTRO HEADER
            ══════════════════════════════════════════════════════════════ */}
            <header className="relative pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
                <div className="max-w-3xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E2D7] border border-[#181A16]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9B7545] flex-shrink-0" />
                        <span className="marginal-label text-[#181A16] font-bold">
                            PRIVATE ENTERPRISE INTAKE
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight text-[#181A16] leading-[1.14]">
                        Initiate an{' '}
                        <span className="text-brass-gradient">
                            Enterprise Briefing.
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-[#65675F] leading-relaxed font-normal">
                        Submit your operational objectives, software requirements, or distribution scope for direct review by our leadership team.
                    </p>
                </div>
            </header>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 2 — MAIN INTAKE DESK (SPLIT LAYOUT)
            ══════════════════════════════════════════════════════════════ */}
            <main className="relative pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Intake Form (lg:col-span-7) */}
                    <div className="lg:col-span-7">
                        <div className="relative p-6 sm:p-9 rounded-2xl sm:rounded-3xl border border-[#181A16]/12 bg-white shadow-sm editorial-surface-lift overflow-hidden">
                            {/* Thin Top Submission Progress Bar */}
                            {isSubmitting && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9B7545] via-[#D4B270] to-[#9B7545] animate-pulse" />
                            )}

                            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#181A16]/08">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold font-heading text-[#181A16]">
                                        Enterprise Diagnostics Intake
                                    </h2>
                                    <p className="text-xs text-[#65675F] mt-0.5">
                                        Direct intake reviewed within 24 business hours.
                                    </p>
                                </div>
                                <span className="text-[10px] font-mono font-bold tracking-widest text-[#9B7545] uppercase px-2.5 py-1 rounded bg-[#E6E2D7] border border-[#181A16]/08">
                                    CONFIDENTIAL
                                </span>
                            </div>

                            {submitted ? (
                                <div className="py-12 px-6 text-center space-y-4">
                                    <div className="w-14 h-14 rounded-full bg-[#3F5544]/10 border border-[#3F5544]/20 flex items-center justify-center mx-auto text-[#3F5544]">
                                        <CheckCircle2 size={28} />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#181A16]">
                                        Enterprise Briefing Transmitted
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#65675F] max-w-md mx-auto leading-relaxed">
                                        Thank you. Your requirements have been securely logged. Our technical leadership team will review and respond directly to your provided email address.
                                    </p>
                                    <div className="pt-2">
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-xs font-mono text-[#9B7545] hover:underline"
                                        >
                                            Submit additional briefing parameters
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {errorMessage && (
                                        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-mono">
                                            {errorMessage}
                                        </div>
                                    )}

                                    {/* Row 1: Name & Organization */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-xs font-mono font-semibold text-[#181A16] mb-1.5 uppercase tracking-wider">
                                                Principal Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="e.g. Kunal Pratap Singh"
                                                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#181A16]/12 text-[#181A16] placeholder-[#65675F]/50 text-sm focus:outline-none focus:border-[#9B7545] focus:ring-2 focus:ring-[#9B7545]/20 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="organization" className="block text-xs font-mono font-semibold text-[#181A16] mb-1.5 uppercase tracking-wider">
                                                Organization / Entity *
                                            </label>
                                            <input
                                                type="text"
                                                id="organization"
                                                name="organization"
                                                required
                                                value={formData.organization}
                                                onChange={handleChange}
                                                placeholder="e.g. Enterprise Asset Group"
                                                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#181A16]/12 text-[#181A16] placeholder-[#65675F]/50 text-sm focus:outline-none focus:border-[#9B7545] focus:ring-2 focus:ring-[#9B7545]/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Email & Phone */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="email" className="block text-xs font-mono font-semibold text-[#181A16] mb-1.5 uppercase tracking-wider">
                                                Direct Work Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="kunal@deeplinkcreators.com"
                                                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#181A16]/12 text-[#181A16] placeholder-[#65675F]/50 text-sm focus:outline-none focus:border-[#9B7545] focus:ring-2 focus:ring-[#9B7545]/20 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-xs font-mono font-semibold text-[#181A16] mb-1.5 uppercase tracking-wider">
                                                Contact Coordinate *
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#181A16]/12 text-[#181A16] placeholder-[#65675F]/50 text-sm focus:outline-none focus:border-[#9B7545] focus:ring-2 focus:ring-[#9B7545]/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Engagement Interest & Timeline */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="interest" className="block text-xs font-mono font-semibold text-[#181A16] mb-1.5 uppercase tracking-wider">
                                                Engagement Scope *
                                            </label>
                                            <select
                                                id="interest"
                                                name="interest"
                                                value={formData.interest}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#181A16]/12 text-[#181A16] text-sm focus:outline-none focus:border-[#9B7545] focus:ring-2 focus:ring-[#9B7545]/20 transition-all"
                                            >
                                                <option value="Software Engineering / SaaS">Software Engineering / SaaS</option>
                                                <option value="Sahyak CRM Deployment">Sahyak CRM Deployment</option>
                                                <option value="Creator Distribution Network">Creator Distribution Network</option>
                                                <option value="Revenue & Pipeline Systems">Revenue &amp; Pipeline Systems</option>
                                                <option value="Enterprise Systems Advisory">Enterprise Systems Advisory</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="timeline" className="block text-xs font-mono font-semibold text-[#181A16] mb-1.5 uppercase tracking-wider">
                                                Target Deployment Window
                                            </label>
                                            <select
                                                id="timeline"
                                                name="timeline"
                                                value={formData.timeline}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#181A16]/12 text-[#181A16] text-sm focus:outline-none focus:border-[#9B7545] focus:ring-2 focus:ring-[#9B7545]/20 transition-all"
                                            >
                                                <option value="Immediate (Under 30 Days)">Immediate (Under 30 Days)</option>
                                                <option value="1-3 Months">1-3 Months</option>
                                                <option value="3-6 Months">3-6 Months</option>
                                                <option value="Strategic Exploration">Strategic Exploration</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Operational Context / Scope */}
                                    <div>
                                        <label htmlFor="scope" className="block text-xs font-mono font-semibold text-[#181A16] mb-1.5 uppercase tracking-wider">
                                            Operational Context &amp; Objectives *
                                        </label>
                                        <textarea
                                            id="scope"
                                            name="scope"
                                            required
                                            rows={4}
                                            value={formData.scope}
                                            onChange={handleChange}
                                            placeholder="Outline your existing software workflows, pipeline bottlenecks, or distribution goals..."
                                            className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#181A16]/12 text-[#181A16] placeholder-[#65675F]/50 text-sm focus:outline-none focus:border-[#9B7545] focus:ring-2 focus:ring-[#9B7545]/20 transition-all resize-y"
                                        />
                                    </div>

                                    {/* Submit Action */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="tactile-btn group w-full py-4 rounded-xl bg-[#181A16] hover:bg-[#252720] text-[#F3F0E8] font-heading font-semibold text-sm tracking-wide shadow-sm active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin text-[#D4B270]" />
                                                    <span>Transmitting Briefing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Transmit Enterprise Briefing</span>
                                                    <Send size={16} className="text-[#D4B270] group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#65675F] pt-2">
                                        <Lock size={12} className="text-[#9B7545]" />
                                        <span>Confidential &amp; Encrypted Intake Protocol</span>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Institutional Context & Coordinates (Deep Contrast Sidebar) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Headquarters Workspace Visual Container */}
                        <div className="relative rounded-2xl overflow-hidden border border-[#181A16]/15 shadow-xl h-[170px] sm:h-[200px] image-editorial-frame bg-[#E6E2D7]">
                            <Image
                                src="/images/Revenue Architecture Office.jpeg"
                                alt="Deeplink Creators Greater Noida Headquarters Workspace"
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#181A16] via-[#181A16]/30 to-transparent" />
                            <div className="absolute bottom-3 left-3">
                                <span className="text-[10px] font-mono text-[#D4B270] uppercase tracking-wider bg-[#181A16]/80 px-2 py-0.5 rounded border border-white/10">
                                    GREATER NOIDA HEADQUARTERS
                                </span>
                            </div>
                        </div>

                        {/* Holding Coordinates Card (Deep Contrast #181A16) */}
                        <div className="p-6 sm:p-7 rounded-2xl border border-[#181A16] bg-[#181A16] text-[#F3F0E8] shadow-xl space-y-4">
                            <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs font-mono text-[#D4B270] font-semibold uppercase tracking-wider">
                                <Building2 size={16} />
                                <span>Holding Coordinates</span>
                            </div>

                            <div className="space-y-4 text-xs sm:text-sm">
                                <div>
                                    <span className="text-[11px] font-mono text-[#AAA99F] block mb-1">REGISTERED OFFICE</span>
                                    <p className="text-white font-medium">Deeplink Creators</p>
                                    <p className="text-[#AAA99F]">Greater Noida, Uttar Pradesh 201310, India</p>
                                </div>

                                <div>
                                    <span className="text-[11px] font-mono text-[#AAA99F] block mb-1">DIRECT CONTACT</span>
                                    <p className="text-white font-medium">+91 97116 10928</p>
                                    <p className="text-[#AAA99F]">kunal@deeplinkcreators.com</p>
                                </div>

                                <div>
                                    <span className="text-[11px] font-mono text-[#AAA99F] block mb-1">INSTITUTIONAL GOVERNANCE</span>
                                    <p className="text-[#D4B270] font-medium">Backed by Mayalok Venture</p>
                                </div>
                            </div>
                        </div>

                        {/* Briefing Protocol Card */}
                        <div className="p-6 sm:p-7 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-3">
                            <div className="flex items-center gap-2 pb-3 border-b border-[#181A16]/08 text-xs font-mono text-[#9B7545] font-semibold uppercase tracking-wider">
                                <FileText size={16} />
                                <span>Intake Protocol</span>
                            </div>

                            <div className="space-y-3 text-xs sm:text-sm text-[#65675F]">
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 size={14} className="text-[#3F5544] flex-shrink-0 mt-0.5" />
                                    <span>24-hour review by operating leadership.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 size={14} className="text-[#3F5544] flex-shrink-0 mt-0.5" />
                                    <span>Direct diagnostic discussion with technical principals.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 size={14} className="text-[#3F5544] flex-shrink-0 mt-0.5" />
                                    <span>No generic sales retainers or transactional pitching.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
