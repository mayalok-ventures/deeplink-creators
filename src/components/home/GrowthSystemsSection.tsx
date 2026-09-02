'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    ArrowRight,
    CheckCircle2,
    Zap,
    TrendingUp,
    Search,
    Cpu,
    MousePointerClick
} from 'lucide-react'

export default function GrowthSystemsSection() {
    const [activeStep, setActiveStep] = useState(0)

    const steps = [
        {
            num: '01',
            name: 'Reach',
            phase: 'HIGH-INTENT DEMAND GENERATION',
            title: 'Paid Search, Social & Targeted Content',
            description:
                'Capturing active commercial intent across Google Search, LinkedIn, and Meta campaigns with rigorous unit-economic tracking.',
            deliverables: ['High-Intent Search Campaigns', 'B2B & Industry Account Targeting', 'Channel Attribution & CAC Tracking'],
            link: '/services/performance-marketing/'
        },
        {
            num: '02',
            name: 'Capture',
            phase: 'ORGANIC SEARCH & LANDING ASSETS',
            title: 'High-Intent SEO & Conversion Pages',
            description:
                'Technical search architecture and topical authority content engineered to capture durable, high-intent commercial search volume.',
            deliverables: ['Industry & Commercial SEO', 'Topical Authority Keyword Strategy', 'High-Performance Web Architecture'],
            link: '/services/industrial-seo/'
        },
        {
            num: '03',
            name: 'Convert',
            phase: 'CONVERSION ARCHITECTURE',
            title: 'Conversion UX & Commercial Proof',
            description:
                'Frictionless digital journeys that turn traffic into structured commercial inquiries with high-trust proof points.',
            deliverables: ['Conversion Rate Optimization (CRO)', 'Interactive Product Demonstrations', 'Lead Capture Architecture'],
            link: '/services/conversion-web-design/'
        },
        {
            num: '04',
            name: 'Automate',
            phase: 'SALES INFRASTRUCTURE SYNC',
            title: 'Automated Routing & Sahyak CRM Sync',
            description:
                'Connecting every digital touchpoint directly into Sahyak CRM and automated sales sequences for rapid deal handling.',
            deliverables: ['Instant Sahyak CRM Synchronization', 'Multi-Channel Rep Alerts', 'Automated Follow-Up Cadence'],
            link: '/services/ai-marketing-automation/'
        }
    ]

    const active = steps[activeStep]

    return (
        <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
            {/* Section Narrative Header */}
            <div className="max-w-3xl mb-16">
                <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block mb-3">
                    DEMAND &amp; ACQUISITION SYSTEMS // INBOUND PIPELINE FLOW
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.06] mb-5">
                    Growth is an acquisition engine,{' '}
                    <span className="text-brass-gradient">not a list of services.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#65675F] leading-relaxed max-w-2xl font-normal">
                    We build the search, advertising, and conversion architecture that generates qualified buyer demand and feeds it directly into your downstream sales infrastructure.
                </p>
            </div>

            {/* Continuous Acquisition Flow Conduit */}
            <div className="space-y-8">
                {/* 4-Step Linear Conduit Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {steps.map((step, idx) => {
                        const isCurrent = activeStep === idx

                        return (
                            <button
                                key={step.num}
                                onClick={() => setActiveStep(idx)}
                                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[110px] ${
                                    isCurrent
                                        ? 'bg-[#181A16] text-[#F3F0E8] border-[#181A16] shadow-xl -translate-y-1'
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
                                        className={`text-[10px] font-mono uppercase tracking-wider mt-0.5 line-clamp-1 ${
                                            isCurrent ? 'text-[#AAA99F]' : 'text-[#65675F]'
                                        }`}
                                    >
                                        {step.phase}
                                    </p>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Continuous Conduit Stream Detail */}
                <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#181A16]/12 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-extrabold font-heading text-[#9B7545]">
                                    {active.num}
                                </span>
                                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#65675F] border-l border-[#181A16]/10 pl-3">
                                    FLOW STAGE: {active.phase}
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
                                    <span>Explore {active.name} Systems</span>
                                    <ArrowRight size={14} className="text-[#D4B270]" />
                                </Link>
                            </div>
                        </div>

                        {/* Deliverables Right */}
                        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#F3F0E8] border border-[#181A16]/10 space-y-4">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#181A16]">
                                SYSTEM CAPABILITIES
                            </h4>
                            <div className="space-y-3 text-xs sm:text-sm text-[#181A16]">
                                {active.deliverables.map((d, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <CheckCircle2 size={15} className="text-[#3F5544] flex-shrink-0" />
                                        <span>{d}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-2 border-t border-[#181A16]/10 text-[11px] font-mono text-[#65675F] flex items-center gap-1.5">
                                <Zap size={12} className="text-[#9B7545]" />
                                <span>Feeds qualified inquiries directly into Sahyak CRM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
