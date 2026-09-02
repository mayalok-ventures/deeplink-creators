'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
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
    ArrowUpRight
} from 'lucide-react'

// Dynamic R3F Canvas import
const NetworkFlowCanvas = dynamic(
    () => import('@/components/canvas/NetworkFlowCanvas'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[340px] flex items-center justify-center bg-[#181A16] rounded-3xl">
                <div className="w-7 h-7 rounded-full border-2 border-[#D4B270] border-t-transparent animate-spin" />
            </div>
        )
    }
)

export default function CreatorNetworkSection() {
    const [selectedChannel, setSelectedChannel] = useState(0)

    const channels = [
        {
            id: 'b2b-tech',
            tag: '01 / B2B & TECHNOLOGY',
            title: 'Software, SaaS & Developer Tools',
            profile: 'Founders, CTOs, Tech Leads & Enterprise Operators',
            impact: 'Educational product teardowns, architectural walk-throughs, and targeted peer adoption.',
            channelOrigin: 'Enterprise Brand Source',
            hub: 'Tech Authority Hub (3 Nodes)',
            audience: 'Verified B2B Decision Makers',
            topologyDesc: 'Concentrated executive channels with high-velocity deal routing.'
        },
        {
            id: 'industrial',
            tag: '02 / INDUSTRIAL & MANUFACTURING',
            title: 'Commercial Equipment & Engineering',
            profile: 'Plant Managers, Procurement Heads, Machinery Buyers',
            impact: 'Operational field reviews, factory demonstration showcases, and qualified commercial RFQs.',
            channelOrigin: 'Manufacturer / OEM',
            hub: 'Industrial Authority Creators',
            audience: 'Commercial Procurement Leads',
            topologyDesc: 'Wide centralized engineering spans with strong distribution paths.'
        },
        {
            id: 'regional',
            tag: '03 / REGIONAL CORRIDORS',
            title: 'Delhi NCR & High-Growth Metros',
            profile: 'Regional Business Owners, Distributors & High-Net-Worth Consumers',
            impact: 'Localized community trust, regional brand footprint, and geo-targeted commercial inquiries.',
            channelOrigin: 'Regional Enterprise',
            hub: 'Local Metro Creator Hubs',
            audience: 'Regional Commercial Buyers',
            topologyDesc: 'Dense localized metro clusters with shorter, highly interconnected paths.'
        },
        {
            id: 'high-ticket',
            tag: '04 / HIGH-TICKET SERVICES',
            title: 'Consulting, Real Estate & Premium Education',
            profile: 'Senior Executives, Institutional Buyers, High-Intent Students',
            impact: 'Long-form thought leadership, deep-dive problem breakdowns, and advisory pipeline conversion.',
            channelOrigin: 'Service Firm',
            hub: 'Domain Expert Creators',
            audience: 'High-Intent Pipeline',
            topologyDesc: 'Selective high-value advisory routing conduits.'
        }
    ]

    const active = channels[selectedChannel]

    return (
        <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="max-w-3xl mb-16 sm:mb-20">
                <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block mb-3">
                    DISTRIBUTION INFRASTRUCTURE // CAUSAL NETWORK PROPAGATION
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.06] mb-5">
                    Distribution is{' '}
                    <span className="text-brass-gradient">changing.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#65675F] leading-relaxed max-w-2xl font-normal">
                    One message propagated through curated creator hubs reaches verified commercial buyers with organic authority, bypassing algorithmic ad fatigue.
                </p>
            </div>

            {/* Immersive 3D Network Topology & Selector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left: Interactive 3D WebGL Canvas Topology (lg:col-span-7) */}
                <div className="lg:col-span-7 rounded-3xl bg-[#181A16] text-[#F3F0E8] border border-[#181A16] p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
                        <span className="text-[#D4B270] font-bold">CAUSAL PROPAGATION TOPOLOGY</span>
                        <span className="text-[#3F5544] bg-[#3F5544]/20 px-2.5 py-1 rounded-lg">ORIGIN ➔ HUBS ➔ AUDIENCE</span>
                    </div>

                    {/* R3F WebGL Flow Canvas */}
                    <div className="rounded-2xl overflow-hidden bg-[#121310] border border-white/10 relative">
                        <NetworkFlowCanvas activeIndex={selectedChannel} />

                        <div className="absolute top-3 left-4 right-4 flex flex-wrap items-center justify-between text-[10px] font-mono text-[#AAA99F] gap-2">
                            <span>SOURCE: {active.channelOrigin}</span>
                            <span className="text-[#D4B270]">HUB: {active.hub}</span>
                            <span className="text-[#8FA994]">TARGET: {active.audience}</span>
                        </div>
                    </div>

                    {/* Dynamic Topology Blueprint Note */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-[#AAA99F] leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
                        <span className="text-[#D4B270]">{active.topologyDesc}</span>
                        <span className="text-[#8FA994]">{active.impact}</span>
                    </div>
                </div>

                {/* Right: Channel Selectors (lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-4">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#9B7545]">
                        DYNAMIC NETWORK TOPOLOGIES
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
                            <span>Learn More About Creator Distribution</span>
                            <ArrowRight size={14} className="text-[#D4B270]" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
