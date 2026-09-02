'use client'

import { useState } from 'react'
import { Network, TrendingUp, Cpu, ArrowRight, Zap, CheckCircle2 } from 'lucide-react'

export default function SystemEcosystemLoop() {
    const [activeNode, setActiveNode] = useState<number | null>(null)

    const convergenceSteps = [
        {
            num: '01',
            title: 'Multiple Acquisition Streams Enter',
            sub: 'SEO • Creators • Ads • Content',
            desc: 'Diverse commercial acquisition channels feed steady high-intent signals into a centralized system without single-channel vulnerability.',
            icon: Network
        },
        {
            num: '02',
            title: 'Central Growth Engine Orchestrates',
            sub: 'Conversion UX & Automated Routing',
            desc: 'Inbound attention is captured, qualified through high-trust web architecture, and automatically routed with zero pipeline leakage.',
            icon: TrendingUp
        },
        {
            num: '03',
            title: 'Sahyak Produces Compounding Revenue',
            sub: 'Sales Pipeline & Deal Velocity',
            desc: 'Stage-gate sales execution converts inquiries into closed revenue, generating customer insights that feed back into acquisition.',
            icon: Cpu
        }
    ]

    return (
        <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
            {/* Climax Narrative Header */}
            <div className="max-w-3xl mb-16">
                <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block mb-3">
                    THE COMPOUNDING CONVERGENCE // ONE ECOSYSTEM
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.06] mb-5">
                    One system.{' '}
                    <span className="text-brass-gradient">Multiple growth levers.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#65675F] leading-relaxed max-w-2xl font-normal">
                    Many inputs feed one connected growth engine. Attention, conversion, and sales execution reinforce each other in an autonomous feedback cycle.
                </p>
            </div>

            {/* Clean Static Architectural Convergence Blueprint (Zero 3D WebGL Animations) */}
            <div className="mb-12 rounded-3xl bg-[#181A16] text-[#F3F0E8] border border-[#181A16] p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-[#AAA99F]">
                    <span className="text-[#D4B270] font-bold">CONVERGENCE MATRIX // MANY INPUTS ➔ ONE SYSTEM ➔ COMPOUNDING OUTPUT</span>
                    <span className="text-[#3F5544] bg-[#3F5544]/20 px-2.5 py-1 rounded">FEEDBACK ARCHITECTURE</span>
                </div>

                {/* 6 Input Feeds -> Central Core -> 3 Compounding Outputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {/* Left: 6 Input Streams */}
                    <div className="space-y-2.5">
                        <span className="text-[10px] font-mono uppercase text-[#D4B270] tracking-wider block">
                            01 // INPUT ACQUISITION CHANNELS
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                            <span className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white">SEO Traffic</span>
                            <span className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white">Paid Search</span>
                            <span className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white">Creator Reach</span>
                            <span className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white">Content Hubs</span>
                            <span className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white">Automation</span>
                            <span className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white">Direct Referrals</span>
                        </div>
                    </div>

                    {/* Middle: Central Orchestration Engine */}
                    <div className="p-6 rounded-2xl bg-white/[0.06] border border-[#9B7545]/40 text-center space-y-3">
                        <span className="text-[10px] font-mono uppercase text-[#8FA994] tracking-wider block">
                            02 // CENTRAL GROWTH ENGINE
                        </span>
                        <h4 className="text-lg font-bold font-heading text-white">DeepLink Operating Core</h4>
                        <p className="text-xs text-[#AAA99F] leading-relaxed">
                            Synchronizes conversion UX, lead attribution, and instant CRM handoffs.
                        </p>
                    </div>

                    {/* Right: Compounding Revenue Outputs */}
                    <div className="space-y-2.5">
                        <span className="text-[10px] font-mono uppercase text-[#D4B270] tracking-wider block">
                            03 // COMPOUNDING REVENUE OUTPUT
                        </span>
                        <div className="space-y-2 text-xs font-mono">
                            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-white">
                                <span>Qualified Sales Inquiries</span>
                                <span className="text-[#D4B270]">Active</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-white">
                                <span>Sahyak CRM Stage Gates</span>
                                <span className="text-[#8FA994]">Governed</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-white">
                                <span>Predictable Closed Deals</span>
                                <span className="text-[#D4B270]">Compounding</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#AAA99F]">
                    <span>Continuous Feedback: Closed deal data optimizes acquisition channels</span>
                    <span className="text-[#D4B270]">Autonomous Feedback Cycle</span>
                </div>
            </div>

            {/* 3 Step Convergence Stream */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {convergenceSteps.map((step, i) => {
                    const IconComp = step.icon
                    const isHovered = activeNode === i

                    return (
                        <div
                            key={step.num}
                            onMouseEnter={() => setActiveNode(i)}
                            onMouseLeave={() => setActiveNode(null)}
                            className={`p-8 rounded-3xl bg-white border flex flex-col justify-between transition-all duration-300 ${
                                isHovered
                                    ? 'border-[#9B7545] shadow-lg -translate-y-1'
                                    : 'border-[#181A16]/12 shadow-xs'
                            }`}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-extrabold font-heading text-[#9B7545]">
                                        {step.num}
                                    </span>
                                    <div className="w-10 h-10 rounded-xl bg-[#F3F0E8] border border-[#181A16]/10 flex items-center justify-center text-[#181A16]">
                                        <IconComp size={18} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-heading font-extrabold text-xl text-[#181A16] tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs font-mono font-medium text-[#9B7545] mt-1">
                                        {step.sub}
                                    </p>
                                </div>

                                <p className="text-sm text-[#65675F] leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>

                            <div className="pt-6 mt-6 border-t border-[#181A16]/08 flex items-center gap-2 text-xs font-mono text-[#3F5544]">
                                <Zap size={14} className="flex-shrink-0" />
                                <span>Continuous Compounding Loop</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
