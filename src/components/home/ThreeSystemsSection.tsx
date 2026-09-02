'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
    Cpu,
    Network,
    TrendingUp,
    ArrowUpRight,
    ArrowRight,
    CheckCircle2,
    Layers,
    Target,
    Zap
} from 'lucide-react'

export default function ThreeSystemsSection() {
    return (
        <section className="py-20 sm:py-28 md:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10">
            {/* Section Header with Editorial Typography */}
            <div className="max-w-3xl mb-16 sm:mb-20">
                <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block mb-3">
                    CORE ARCHITECTURE
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.08] mb-5">
                    Three ways we build{' '}
                    <span className="text-brass-gradient">commercial leverage.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#65675F] leading-relaxed max-w-2xl font-normal">
                    We combine proprietary software, creator distribution networks, and performance growth into an integrated system designed to scale real revenue.
                </p>
            </div>

            {/* Asymmetric 3-Pillar Layout */}
            <div className="space-y-12 sm:space-y-16">
                {/* ══════════════════════════════════════════════════════════
                    PILLAR 01: SOFTWARE (Sahyak CRM & Custom Applications)
                ══════════════════════════════════════════════════════════ */}
                <div className="rounded-3xl bg-[#181A16] text-[#F3F0E8] border border-[#181A16] p-8 sm:p-12 overflow-hidden relative shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                        {/* Narrative Left */}
                        <div className="lg:col-span-6 space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl sm:text-4xl font-extrabold font-heading text-[#D4B270]">
                                    01
                                </span>
                                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#AAA99F] border-l border-white/15 pl-3">
                                    PROPRIETARY SOFTWARE PLATFORM
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
                                Sahyak CRM: Sales Visibility &amp; Pipeline Control.
                            </h3>

                            <p className="text-sm sm:text-base text-[#AAA99F] leading-relaxed">
                                Our flagship sales pipeline software built for sales teams that need stage-gate governance, automatic lead distribution, and absolute activity accountability.
                            </p>

                            <div className="pt-2 flex flex-wrap items-center gap-4">
                                <a
                                    href="https://sahyak.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tactile-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#9B7545] hover:bg-[#B88E56] text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
                                >
                                    <span>Explore Sahyak.com</span>
                                    <ArrowUpRight size={14} />
                                </a>
                                <span className="text-xs font-mono text-[#AAA99F]">
                                    Complimentary 30-day enterprise access included
                                </span>
                            </div>
                        </div>

                        {/* Interactive UI Fragment Right */}
                        <div className="lg:col-span-6">
                            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#121310] p-5 sm:p-6 shadow-2xl space-y-4">
                                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-[#AAA99F]">
                                    <span className="text-white font-bold">Sahyak Pipeline Engine</span>
                                    <span className="text-[#D4B270]">LIVE STAGE GATE</span>
                                </div>

                                <div className="space-y-2.5">
                                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-white">Enterprise Software RFP</p>
                                            <p className="text-[11px] text-[#AAA99F]">Stage: Technical Discovery</p>
                                        </div>
                                        <span className="text-xs font-mono font-bold text-[#D4B270] bg-[#9B7545]/20 px-2.5 py-1 rounded border border-[#9B7545]/30">
                                            ₹18,50,000
                                        </span>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-white">Industrial Automation Pilot</p>
                                            <p className="text-[11px] text-[#AAA99F]">Stage: Stage Gate Approved</p>
                                        </div>
                                        <span className="text-xs font-mono font-bold text-[#3F5544] bg-[#3F5544]/20 px-2.5 py-1 rounded border border-[#3F5544]/30">
                                            ₹9,20,000
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════════════
                    PILLAR 02 & 03: ASYMMETRIC SPLIT (Distribution & Growth)
                ══════════════════════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Pillar 02: Distribution Infrastructure (lg:col-span-6) */}
                    <div className="lg:col-span-6 rounded-3xl bg-white border border-[#181A16]/12 p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:border-[#9B7545]/40 transition-all duration-300">
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-extrabold font-heading text-[#9B7545]">
                                    02
                                </span>
                                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#65675F] border-l border-[#181A16]/10 pl-3">
                                    DISTRIBUTION INFRASTRUCTURE
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#181A16] tracking-tight">
                                Creator-Led Market Access.
                            </h3>

                            <p className="text-sm text-[#65675F] leading-relaxed">
                                We curate direct creator and niche audience networks, enabling businesses to distribute their product to verified buyer demographics without relying on volatile ad networks.
                            </p>

                            {/* Network Verticals Grid */}
                            <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs font-mono">
                                <div className="p-3 rounded-xl bg-[#F3F0E8] border border-[#181A16]/5 text-[#181A16]">
                                    <p className="font-bold">B2B &amp; Tech</p>
                                    <p className="text-[10px] text-[#65675F]">Software &amp; Founders</p>
                                </div>
                                <div className="p-3 rounded-xl bg-[#F3F0E8] border border-[#181A16]/5 text-[#181A16]">
                                    <p className="font-bold">Industrial &amp; OEM</p>
                                    <p className="text-[10px] text-[#65675F]">Commercial Buyers</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-[#181A16]/08">
                            <Link
                                href="/services/social-commerce/"
                                className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#181A16] hover:text-[#9B7545] transition-colors"
                            >
                                <span>Explore Creator Distribution</span>
                                <ArrowRight size={14} className="text-[#9B7545]" />
                            </Link>
                        </div>
                    </div>

                    {/* Pillar 03: Demand Systems (lg:col-span-6) */}
                    <div className="lg:col-span-6 rounded-3xl bg-white border border-[#181A16]/12 p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:border-[#9B7545]/40 transition-all duration-300">
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-extrabold font-heading text-[#9B7545]">
                                    03
                                </span>
                                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#65675F] border-l border-[#181A16]/10 pl-3">
                                    GROWTH &amp; DEMAND SYSTEMS
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#181A16] tracking-tight">
                                Performance &amp; Conversion Infrastructure.
                            </h3>

                            <p className="text-sm text-[#65675F] leading-relaxed">
                                Paid search, technical enterprise SEO, conversion web design, and AI workflow automations connected directly to sales pipeline execution.
                            </p>

                            {/* 4-Step Funnel Flow */}
                            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs font-mono">
                                <div className="p-2.5 rounded-xl bg-[#F3F0E8] border border-[#181A16]/5">
                                    <span className="text-[10px] text-[#9B7545] font-bold block">01</span>
                                    <span className="font-bold text-[11px] text-[#181A16]">Reach</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#F3F0E8] border border-[#181A16]/5">
                                    <span className="text-[10px] text-[#9B7545] font-bold block">02</span>
                                    <span className="font-bold text-[11px] text-[#181A16]">Capture</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#F3F0E8] border border-[#181A16]/5">
                                    <span className="text-[10px] text-[#9B7545] font-bold block">03</span>
                                    <span className="font-bold text-[11px] text-[#181A16]">Convert</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#F3F0E8] border border-[#181A16]/5">
                                    <span className="text-[10px] text-[#9B7545] font-bold block">04</span>
                                    <span className="font-bold text-[11px] text-[#181A16]">Automate</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-[#181A16]/08">
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
