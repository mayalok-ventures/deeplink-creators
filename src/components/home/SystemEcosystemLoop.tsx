'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Network, TrendingUp, Cpu, ArrowRight, Zap, CheckCircle2 } from 'lucide-react'

// Dynamic R3F Canvas import
const CompoundingLoopCanvas = dynamic(
    () => import('@/components/canvas/CompoundingLoopCanvas'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[300px] flex items-center justify-center bg-[#181A16] rounded-3xl">
                <div className="w-7 h-7 rounded-full border-2 border-[#D4B270] border-t-transparent animate-spin" />
            </div>
        )
    }
)

export default function SystemEcosystemLoop() {
    const [activeNode, setActiveNode] = useState<number | null>(null)

    const convergenceSteps = [
        {
            num: '01',
            title: 'Distribution Creates Attention',
            sub: 'Curated Creator Channels',
            desc: 'Targeted creator syndication introduces enterprise products to verified buyer niches without total reliance on paid ad algorithms.',
            icon: Network
        },
        {
            num: '02',
            title: 'Growth Captures & Converts Demand',
            sub: 'Search, Social & Conversion UX',
            desc: 'High-intent search capture, technical SEO, and conversion-engineered landing assets turn audience attention into qualified inquiries.',
            icon: TrendingUp
        },
        {
            num: '03',
            title: 'Sahyak Operationalizes Revenue',
            sub: 'Sales Pipeline & Accountability',
            desc: 'Inquiries route automatically into Sahyak CRM for stage-gate qualification, team follow-ups, and predictable deal closing.',
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
                    When distribution, marketing, and sales software operate in isolation, pipeline leaks at every handoff. DeepLink Creators connects all three into a single continuous feedback loop.
                </p>
            </div>

            {/* Central Orbital Convergence Payoff Canvas */}
            <div className="mb-12 rounded-3xl bg-[#181A16] text-[#F3F0E8] border border-[#181A16] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-[#AAA99F]">
                    <span className="text-[#D4B270] font-bold">SYNCHRONOUS ORBITAL PAYOFF // THREE.JS ENGINE</span>
                    <span className="text-[#3F5544] bg-[#3F5544]/20 px-2.5 py-1 rounded">AUTONOMOUS CONVERGENCE</span>
                </div>

                <CompoundingLoopCanvas activeIndex={activeNode} />

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#AAA99F]">
                    <span>Distribution Creates Attention ➔ Growth Captures Demand ➔ Sahyak Closes Deals</span>
                    <span className="text-[#D4B270]">Autonomous Feedback Loop</span>
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
