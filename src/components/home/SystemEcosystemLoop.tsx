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
            <div className="w-full h-[280px] flex items-center justify-center bg-[#181A16] rounded-3xl">
                <div className="w-7 h-7 rounded-full border-2 border-[#D4B270] border-t-transparent animate-spin" />
            </div>
        )
    }
)

export default function SystemEcosystemLoop() {
    const [activeNode, setActiveNode] = useState<number | null>(null)

    const loopNodes = [
        {
            num: '01',
            name: 'Distribution Creates Attention',
            sub: 'Curated Creator Channels',
            desc: 'Targeted creator syndication introduces enterprise products to verified buyer niches without total reliance on paid ad algorithms.',
            icon: Network,
            color: '#3F5544',
            bg: 'bg-[#3F5544]/10',
            border: 'border-[#3F5544]/30'
        },
        {
            num: '02',
            name: 'Growth Captures & Converts Demand',
            sub: 'Search, Social & Web Assets',
            desc: 'High-intent search capture, technical SEO, and conversion-engineered landing assets turn audience attention into qualified inquiries.',
            icon: TrendingUp,
            color: '#7A5B32',
            bg: 'bg-[#7A5B32]/10',
            border: 'border-[#7A5B32]/30'
        },
        {
            num: '03',
            name: 'Sahyak Operationalizes Revenue',
            sub: 'Sales Pipeline & Accountability',
            desc: 'Inquiries route automatically into Sahyak CRM for stage-gate qualification, team follow-ups, and predictable deal closing.',
            icon: Cpu,
            color: '#9B7545',
            bg: 'bg-[#9B7545]/10',
            border: 'border-[#9B7545]/30'
        }
    ]

    return (
        <section className="py-20 sm:py-28 md:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10">
            {/* Header */}
            <div className="max-w-3xl mb-16 sm:mb-20">
                <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block mb-3">
                    COMPOUNDING ARCHITECTURE
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.08] mb-5">
                    One system.{' '}
                    <span className="text-brass-gradient">Multiple growth levers.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#65675F] leading-relaxed max-w-2xl font-normal">
                    When distribution, marketing, and sales software operate in isolation, pipeline leaks at every handoff. DeepLink Creators connects all three into a single continuous feedback loop.
                </p>
            </div>

            {/* Central Orbital WebGL Core Visual */}
            <div className="mb-10 rounded-3xl bg-[#181A16] border border-[#181A16] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-[#AAA99F]">
                    <span className="text-[#D4B270] font-bold">SYNCHRONOUS ORBITAL CORE // THREE.JS ENGINE</span>
                    <span className="text-[#3F5544] bg-[#3F5544]/20 px-2.5 py-1 rounded">FEEDBACK LOOP</span>
                </div>
                <CompoundingLoopCanvas activeIndex={activeNode} />
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#AAA99F]">
                    <span>Distribution ➔ Growth ➔ Software</span>
                    <span className="text-[#D4B270]">Autonomous Loop</span>
                </div>
            </div>

            {/* Loop Nodes Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {loopNodes.map((node, i) => {
                    const IconComp = node.icon
                    const isHovered = activeNode === i

                    return (
                        <div
                            key={node.num}
                            onMouseEnter={() => setActiveNode(i)}
                            onMouseLeave={() => setActiveNode(null)}
                            className={`p-8 rounded-3xl bg-white border flex flex-col justify-between transition-all duration-300 relative group ${
                                isHovered
                                    ? 'border-[#9B7545] shadow-lg -translate-y-1'
                                    : 'border-[#181A16]/12 shadow-xs'
                            }`}
                        >
                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-extrabold font-heading text-[#9B7545]">
                                        {node.num}
                                    </span>
                                    <div className="w-10 h-10 rounded-xl bg-[#F3F0E8] border border-[#181A16]/10 flex items-center justify-center text-[#181A16] group-hover:text-[#9B7545] transition-colors">
                                        <IconComp size={18} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-heading font-extrabold text-xl text-[#181A16] tracking-tight">
                                        {node.name}
                                    </h3>
                                    <p className="text-xs font-mono font-medium text-[#9B7545] mt-1">
                                        {node.sub}
                                    </p>
                                </div>

                                <p className="text-sm text-[#65675F] leading-relaxed">
                                    {node.desc}
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
