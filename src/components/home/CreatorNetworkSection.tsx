'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    Network,
    Users,
    Layers,
    Target,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Globe2,
    TrendingUp,
    Shield,
    ArrowUpRight,
    Cpu
} from 'lucide-react'

export default function CreatorNetworkSection() {
    const [selectedChannel, setSelectedChannel] = useState(0)

    const channels = [
        {
            id: 'b2b-tech',
            tag: '01 / B2B & TECHNOLOGY',
            title: 'Software, SaaS & Tech Operators',
            profile: 'Founders, CTOs, Operators & Technical Decision Makers',
            impact: 'Educational product teardowns, architectural walk-throughs, and targeted peer adoption.',
            channelOrigin: 'Product / SaaS Source',
            hub: 'Tech & Founder Creator Network',
            audience: 'B2B Commercial Buyers',
            topologyDesc: 'Direct distribution through respected operators and founders.'
        },
        {
            id: 'industrial',
            tag: '02 / INDUSTRIAL & MANUFACTURING',
            title: 'Commercial Machinery & Engineering',
            profile: 'Plant Managers, Operations Heads, Procurement Teams',
            impact: 'Operational field reviews, factory demonstration showcases, and qualified commercial inquiries.',
            channelOrigin: 'Manufacturer / OEM',
            hub: 'Industrial & Trade Creators',
            audience: 'Commercial Buyers & Specifiers',
            topologyDesc: 'Targeted reach across manufacturing and commercial trade networks.'
        },
        {
            id: 'regional',
            tag: '03 / REGIONAL CORRIDORS',
            title: 'Delhi NCR & High-Growth Metros',
            profile: 'Regional Business Owners, Distributors & Commercial Buyers',
            impact: 'Localized community trust, regional brand footprint, and geo-targeted commercial inquiries.',
            channelOrigin: 'Regional Business',
            hub: 'Regional & Local Metro Creators',
            audience: 'Regional Commercial Buyers',
            topologyDesc: 'High-density localized reach across Delhi NCR and key metro corridors.'
        },
        {
            id: 'high-ticket',
            tag: '04 / HIGH-TICKET SERVICES',
            title: 'Consulting, Real Estate & Advisory',
            profile: 'Business Owners, Executives & High-Intent Clients',
            impact: 'Long-form thought leadership, deep-dive problem breakdowns, and advisory pipeline conversion.',
            channelOrigin: 'Service Firm',
            hub: 'Domain Expert Creators',
            audience: 'High-Intent Clients',
            topologyDesc: 'Authority-driven channels delivering qualified consultative pipeline.'
        }
    ]

    const active = channels[selectedChannel]

    return (
        <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="max-w-3xl mb-16 sm:mb-20">
                <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block mb-3">
                    MANAGED CREATOR DISTRIBUTION // OWNED ACQUISITION CHANNEL
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.06] mb-5">
                    Creator distribution as an{' '}
                    <span className="text-brass-gradient">owned acquisition channel.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#65675F] leading-relaxed max-w-2xl font-normal">
                    Traditional paid ads face rising acquisition costs, creative fatigue, and algorithm volatility. DeepLink builds and manages curated creator networks that distribute your message directly to targeted local and niche audiences.
                </p>
            </div>

            {/* Static Clean Architectural Network Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left: Clean Architectural Pathway Map (lg:col-span-7) */}
                <div className="lg:col-span-7 rounded-3xl bg-[#181A16] text-[#F3F0E8] border border-[#181A16] p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
                        <span className="text-[#D4B270] font-bold">AUDIENCE REACH &amp; ACQUISITION CHANNEL</span>
                        <span className="text-[#3F5544] bg-[#3F5544]/20 px-2.5 py-1 rounded-lg">DIRECT ACCESS</span>
                    </div>

                    {/* Static 3-Stage Propagation Flow Diagram */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                            <span className="text-[10px] font-mono uppercase text-[#D4B270] block">01 SOURCE</span>
                            <p className="text-sm font-bold text-white font-heading">{active.channelOrigin}</p>
                            <p className="text-[11px] text-[#AAA99F] font-mono">Primary Offer</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                            <span className="text-[10px] font-mono uppercase text-[#8FA994] block">02 NETWORK</span>
                            <p className="text-sm font-bold text-white font-heading">{active.hub}</p>
                            <p className="text-[11px] text-[#AAA99F] font-mono">Distribution Nodes</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                            <span className="text-[10px] font-mono uppercase text-[#D4B270] block">03 AUDIENCE</span>
                            <p className="text-sm font-bold text-white font-heading">{active.audience}</p>
                            <p className="text-[11px] text-[#AAA99F] font-mono">Target Buyers</p>
                        </div>
                    </div>

                    {/* Dynamic Topology Blueprint Note */}
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-[#AAA99F] leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
                        <span className="text-[#D4B270]">{active.topologyDesc}</span>
                        <span className="text-[#8FA994]">{active.impact}</span>
                    </div>
                </div>

                {/* Right: Channel Selectors (lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-4">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#9B7545]">
                        REGIONAL &amp; INDUSTRY CREATOR NETWORKS
                    </p>

                    <div className="space-y-2.5">
                        {channels.map((ch, idx) => {
                            const isCurrent = selectedChannel === idx

                            return (
                                <button
                                    key={ch.id}
                                    onClick={() => setSelectedChannel(idx)}
                                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all ${
                                        isCurrent
                                            ? 'bg-white border-[#9B7545] shadow-md -translate-x-1'
                                            : 'bg-white/60 border-[#181A16]/10 hover:bg-white hover:border-[#181A16]/20'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-mono font-bold text-[#9B7545]">
                                            {ch.tag}
                                        </span>
                                        {isCurrent && (
                                            <span className="w-2 h-2 rounded-full bg-[#9B7545]" />
                                        )}
                                    </div>
                                    <h4 className="font-heading font-bold text-base text-[#181A16] mt-1">
                                        {ch.title}
                                    </h4>
                                    <p className="text-xs text-[#65675F] mt-1">
                                        {ch.profile}
                                    </p>
                                </button>
                            )
                        })}
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/services/social-commerce/"
                            className="tactile-btn inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#181A16] hover:bg-[#252720] text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
                        >
                            <span>Explore Creator Distribution Systems</span>
                            <ArrowRight size={14} className="text-[#D4B270]" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
