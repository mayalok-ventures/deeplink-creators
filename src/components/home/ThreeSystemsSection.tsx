'use client'

import Link from 'next/link'
import {
    ArrowUpRight,
    ArrowRight,
    Zap,
    Cpu,
    Network,
    TrendingUp
} from 'lucide-react'

export default function ThreeSystemsSection() {
    return (
        <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
            {/* Section Narrative Header */}
            <div className="max-w-3xl mb-20">
                <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block mb-3">
                    FROM SIGNAL TO SYSTEM // THREE WAYS WE BUILD LEVERAGE
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.06] mb-6">
                    Commercial leverage requires{' '}
                    <span className="text-brass-gradient">connected infrastructure.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#65675F] leading-relaxed max-w-2xl font-normal">
                    When distribution, marketing, and sales software operate in silos, pipeline leaks at every handoff. We build three synchronized pillars to eliminate friction.
                </p>
            </div>

            {/* Continuous 3-Pillar Architectural Narrative */}
            <div className="space-y-16">
                {/* ══════════════════════════════════════════════════════════
                    PILLAR 01: SOFTWARE (Precision / Architecture / Modules)
                ══════════════════════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-[#181A16] text-[#F3F0E8] border border-[#181A16] shadow-2xl relative overflow-hidden">
                    <div className="lg:col-span-6 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl font-extrabold font-heading text-[#D4B270]">01</span>
                            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#AAA99F] border-l border-white/15 pl-3">
                                PROPRIETARY OPERATING SOFTWARE
                            </span>
                        </div>

                        <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
                            Sahyak CRM: Sales Visibility &amp; Pipeline Control.
                        </h3>

                        <p className="text-sm sm:text-base text-[#AAA99F] leading-relaxed">
                            A sales operations suite engineered for stage-gate governance, rules-based rep routing, and absolute activity accountability across the entire deal lifecycle.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-4">
                            <a
                                href="https://sahyak.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tactile-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#9B7545] hover:bg-[#B88E56] text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
                            >
                                <span>Explore Sahyak Platform</span>
                                <ArrowUpRight size={14} />
                            </a>
                            <span className="text-xs font-mono text-[#D4B270]">
                                Complimentary 30-Day Deployment Included
                            </span>
                        </div>
                    </div>

                    {/* Software Modular UI Matrix */}
                    <div className="lg:col-span-6 space-y-3">
                        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-white font-heading">Enterprise Software RFP</p>
                                <p className="text-[11px] text-[#AAA99F] font-mono">Stage: Stage Gate Approved</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-[#D4B270] bg-[#9B7545]/20 px-3 py-1 rounded-lg border border-[#9B7545]/30">
                                ₹18,50,000
                            </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-white font-heading">Industrial Automation Pilot</p>
                                <p className="text-[11px] text-[#AAA99F] font-mono">Stage: Discovery Completed</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-[#3F5544] bg-[#3F5544]/20 px-3 py-1 rounded-lg border border-[#3F5544]/30">
                                ₹9,20,000
                            </span>
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════════════
                    PILLAR 02 & 03: ASYMMETRIC DUAL ENGINES (Distribution & Demand)
                ══════════════════════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Pillar 02: Distribution */}
                    <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-[#181A16]/12 shadow-sm flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-extrabold font-heading text-[#9B7545]">02</span>
                                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#65675F] border-l border-[#181A16]/10 pl-3">
                                    CREATOR-LED DISTRIBUTION
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#181A16] tracking-tight">
                                Direct Market Access &amp; Niche Reach.
                            </h3>

                            <p className="text-sm text-[#65675F] leading-relaxed">
                                Curated creator syndication connecting enterprise products to verified local and niche buyers without relying on volatile ad network algorithms.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-[#181A16]/08">
                            <Link
                                href="/services/social-commerce/"
                                className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#181A16] hover:text-[#9B7545] transition-colors"
                            >
                                <span>Explore Creator Distribution</span>
                                <ArrowRight size={14} className="text-[#9B7545]" />
                            </Link>
                        </div>
                    </div>

                    {/* Pillar 03: Demand */}
                    <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-[#181A16]/12 shadow-sm flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-extrabold font-heading text-[#9B7545]">03</span>
                                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#65675F] border-l border-[#181A16]/10 pl-3">
                                    DEMAND &amp; GROWTH SYSTEMS
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#181A16] tracking-tight">
                                Performance, SEO &amp; Conversion Infrastructure.
                            </h3>

                            <p className="text-sm text-[#65675F] leading-relaxed">
                                High-intent search acquisition, industrial SEO, conversion-focused web engineering, and AI automation synchronized directly into sales pipelines.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-[#181A16]/08">
                            <Link
                                href="/services/"
                                className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#181A16] hover:text-[#9B7545] transition-colors"
                            >
                                <span>Explore Growth Systems</span>
                                <ArrowRight size={14} className="text-[#9B7545]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
