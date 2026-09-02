'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    TrendingUp,
    Search,
    Cpu,
    MousePointerClick,
    ArrowRight,
    CheckCircle2,
    Layers,
    Sparkles
} from 'lucide-react'

export default function GrowthSystemsSection() {
    const [activeStep, setActiveStep] = useState(0)

    const funnelSteps = [
        {
            num: '01',
            name: 'REACH',
            title: 'High-Intent Acquisition',
            subtitle: 'Paid Search, Social & Targeted Content',
            description:
                'We capture active buyer intent across Google Search, LinkedIn, and Meta campaigns with unit-economic rigor.',
            deliverables: ['High-Intent Search Campaigns', 'LinkedIn & Meta B2B Targeting', 'Attribution & ROAS Tracking'],
            link: '/services/performance-marketing/'
        },
        {
            num: '02',
            name: 'CAPTURE',
            title: 'Organic Search & Landing Infrastructure',
            subtitle: 'Industrial SEO & High-Velocity Landing Assets',
            description:
                'Technical search architecture and topical authority content designed to capture durable, high-value organic search volume.',
            deliverables: ['Industrial & Enterprise SEO', 'Topical Authority Keyword Mapping', 'Fast Next.js Landing Assets'],
            link: '/services/industrial-seo/'
        },
        {
            num: '03',
            name: 'CONVERT',
            title: 'Conversion Architecture & UX',
            subtitle: 'CRO, Interactive Demos & Commercial Web Design',
            description:
                'Frictionless digital journeys that turn traffic into structured inquiries with clear conversion incentives.',
            deliverables: ['Conversion Rate Optimization (CRO)', 'Interactive Product Demonstrations', 'High-Trust Positioning'],
            link: '/services/conversion-web-design/'
        },
        {
            num: '04',
            name: 'AUTOMATE',
            title: 'Workflow Automation & CRM Sync',
            subtitle: 'Automated Lead Routing & Nurture Sequences',
            description:
                'Connecting every digital touchpoint directly into Sahyak CRM and automated sales sequences for rapid deal handling.',
            deliverables: ['Sahyak CRM Instant Sync', 'Multi-Channel Touchpoint Alerts', 'Automated Follow-Up Cadence'],
            link: '/services/ai-marketing-automation/'
        }
    ]

    const active = funnelSteps[activeStep]

    return (
        <section className="py-20 sm:py-28 md:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10">
            {/* Header */}
            <div className="max-w-3xl mb-16 sm:mb-20">
                <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block mb-3">
                    DEMAND ARCHITECTURE
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.08] mb-5">
                    Growth is not a channel.{' '}
                    <span className="text-brass-gradient">It&apos;s a system.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#65675F] leading-relaxed max-w-2xl font-normal">
                    Marketing operates as an integrated sequence—from initial buyer discovery to automated sales pipeline entry.
                </p>
            </div>

            {/* Continuous Funnel Architecture */}
            <div className="space-y-8">
                {/* 4-Step Horizontal Sequence Selector */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {funnelSteps.map((step, idx) => {
                        const isCurrent = activeStep === idx

                        return (
                            <button
                                key={step.num}
                                onClick={() => setActiveStep(idx)}
                                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[120px] ${
                                    isCurrent
                                        ? 'bg-[#181A16] text-[#F3F0E8] border-[#181A16] shadow-lg -translate-y-1'
                                        : 'bg-white text-[#65675F] border-[#181A16]/10 hover:border-[#9B7545]/40 hover:bg-[#FAF8F5]'
                                }`}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span
                                        className={`text-xs font-mono font-bold ${
                                            isCurrent ? 'text-[#D4B270]' : 'text-[#9B7545]'
                                        }`}
                                    >
                                        STEP {step.num}
                                    </span>
                                    {isCurrent && (
                                        <span className="w-2 h-2 rounded-full bg-[#D4B270] animate-pulse" />
                                    )}
                                </div>
                                <div>
                                    <h4
                                        className={`font-heading font-extrabold text-base sm:text-lg ${
                                            isCurrent ? 'text-white' : 'text-[#181A16]'
                                        }`}
                                    >
                                        {step.name}
                                    </h4>
                                    <p
                                        className={`text-[11px] font-mono line-clamp-1 mt-0.5 ${
                                            isCurrent ? 'text-[#AAA99F]' : 'text-[#65675F]'
                                        }`}
                                    >
                                        {step.subtitle}
                                    </p>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Active Step Deep-Dive Canvas */}
                <div className="rounded-3xl bg-white border border-[#181A16]/12 p-8 sm:p-12 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-extrabold font-heading text-[#9B7545]">
                                    {active.num}
                                </span>
                                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#65675F] border-l border-[#181A16]/10 pl-3">
                                    FUNNEL PHASE: {active.name}
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#181A16] tracking-tight">
                                {active.title}
                            </h3>

                            <p className="text-sm sm:text-base text-[#65675F] leading-relaxed">
                                {active.description}
                            </p>

                            <div className="pt-2">
                                <Link
                                    href={active.link}
                                    className="tactile-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#181A16] hover:bg-[#252720] text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
                                >
                                    <span>Explore {active.name} Architecture</span>
                                    <ArrowRight size={14} className="text-[#D4B270]" />
                                </Link>
                            </div>
                        </div>

                        {/* Deliverables Right */}
                        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#F3F0E8] border border-[#181A16]/10 space-y-4">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#181A16]">
                                CORE CAPABILITIES &amp; DELIVERABLES
                            </h4>
                            <div className="space-y-3 text-xs sm:text-sm text-[#181A16]">
                                {active.deliverables.map((d, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <CheckCircle2 size={15} className="text-[#3F5544] flex-shrink-0" />
                                        <span>{d}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-2 border-t border-[#181A16]/10 text-[11px] font-mono text-[#65675F]">
                                Feeds directly into Sahyak CRM pipeline
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
