'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Sparkles,
    CheckCircle2,
    ShieldCheck,
    ArrowUpRight,
    ArrowRight,
    Sliders,
    Workflow,
    Activity,
    Layers,
    ChevronRight,
    PhoneCall,
    Mail,
    Calendar,
    Users,
    Filter
} from 'lucide-react'

export default function SahyakCrmShowcase() {
    const [activeStage, setActiveStage] = useState(0)

    const stages = [
        {
            id: '01',
            name: 'Capture',
            title: 'Unified Multi-Source Lead Capture',
            description:
                'Inquiries from landing pages, creator funnels, and inbound marketing are ingested instantly with channel attribution.',
            previewBadge: 'STAGE 01: INGESTION FEED',
            interactiveItems: [
                { source: 'Creator Syndication Funnel', contact: 'Tech Director (Mumbai)', value: '₹12,00,000', status: 'New Inquiry' },
                { source: 'Industrial SEO Search', contact: 'Procurement Head (NCR)', value: '₹24,50,000', status: 'Routing' },
                { source: 'Direct Inbound Form', contact: 'Managing Partner (Bengaluru)', value: '₹8,50,000', status: 'New Inquiry' }
            ]
        },
        {
            id: '02',
            name: 'Qualify',
            title: 'Enforced Pipeline Stage Gates',
            description:
                'Deals cannot move forward on guesswork. Reps must verify budget, timeline, and decision-maker access before advancing.',
            previewBadge: 'STAGE 02: STAGE GATE CRITERIA',
            interactiveItems: [
                { source: 'Authority Verification', contact: 'Decision Maker Identified: MD & VP', value: 'Verified', status: 'Passed' },
                { source: 'Commercial Budget', contact: 'Budget Confirmed: ₹15L - ₹30L Bracket', value: 'Verified', status: 'Passed' },
                { source: 'Implementation Window', contact: 'Target Rollout: Q4 Execution', value: 'Pending Check', status: 'In Review' }
            ]
        },
        {
            id: '03',
            name: 'Assign',
            title: 'Automated Account & Team Routing',
            description:
                'Rules-based lead assignment ensures rapid response times based on rep capacity, geography, and deal size.',
            previewBadge: 'STAGE 03: ROUTING MATRIX',
            interactiveItems: [
                { source: 'Account Exec A (Enterprise)', contact: '3 Active Deals (Capacity: 80%)', value: 'Active', status: 'Assigned' },
                { source: 'Account Exec B (Industrial)', contact: '2 Active Deals (Capacity: 50%)', value: 'Next in Queue', status: 'Routing' },
                { source: 'Account Exec C (Regional)', contact: '4 Active Deals (Capacity: 90%)', value: 'Balanced', status: 'Standby' }
            ]
        },
        {
            id: '04',
            name: 'Follow Up',
            title: 'Activity Cadence & Timeline Audit',
            description:
                'Complete audit trail of every call, demo, email, and scheduled touchpoint. Zero deals slip through cracks.',
            previewBadge: 'STAGE 04: ACTIVITY TELEMETRY',
            interactiveItems: [
                { source: 'Executive Briefing Call', contact: 'Completed by Kunal • 24m duration', value: 'Positive Intent', status: 'Logged' },
                { source: 'Custom Proposal Review', contact: 'Sent to CFO • Scheduled Follow-up', value: 'Tomorrow 11 AM', status: 'Pending' },
                { source: 'Technical Discovery Demo', contact: 'Scheduled with Engineering Team', value: 'Thursday 3 PM', status: 'Confirmed' }
            ]
        },
        {
            id: '05',
            name: 'Convert',
            title: 'Pipeline Velocity & Deal Closing',
            description:
                'Real-time visibility into pipeline value, deal stages, and win rates without compiling manual status sheets.',
            previewBadge: 'STAGE 05: REVENUE PIPELINE',
            interactiveItems: [
                { source: 'SaaS Platform Deployment', contact: 'Final Contract Sent • 30-Day Rollout', value: '₹18,00,000', status: 'Closing' },
                { source: 'Industrial Distribution Hub', contact: 'Master Services Agreement Signed', value: '₹32,50,000', status: 'Won' },
                { source: 'Annual Growth Infrastructure', contact: 'Commercial Proposal Accepted', value: '₹14,00,000', status: 'Won' }
            ]
        }
    ]

    const current = stages[activeStage]

    return (
        <section className="py-20 sm:py-28 md:py-32 px-5 sm:px-6 lg:px-8 bg-[#181A16] text-[#F3F0E8] relative z-10 border-y border-[#181A16]">
            {/* Subtle Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#9B7545_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-15 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="max-w-3xl mb-16 sm:mb-20">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#D4B270] uppercase block mb-3">
                        FLAGSHIP PRODUCT
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.08] mb-5">
                        A CRM built around the way{' '}
                        <span className="text-[#D4B270]">sales actually happen.</span>
                    </h2>
                    <p className="text-base sm:text-lg text-[#AAA99F] leading-relaxed max-w-2xl font-normal">
                        Sahyak brings leads, pipelines, follow-ups, accountability and sales visibility into one operating system designed for serious sales execution.
                    </p>
                </div>

                {/* Interactive Product Canvas */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Left: 5 Stage Selectors (lg:col-span-5) */}
                    <div className="lg:col-span-5 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-wider text-[#D4B270] mb-3">
                            SELECT WORKFLOW STAGE
                        </p>

                        {stages.map((stage, idx) => {
                            const isSelected = activeStage === idx

                            return (
                                <button
                                    key={stage.id}
                                    onClick={() => setActiveStage(idx)}
                                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col gap-1.5 ${
                                        isSelected
                                            ? 'bg-white/10 border-[#9B7545] shadow-lg translate-x-1.5'
                                            : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                                                    isSelected
                                                        ? 'bg-[#9B7545] text-white'
                                                        : 'bg-white/10 text-[#AAA99F]'
                                                }`}
                                            >
                                                {stage.id}
                                            </span>
                                            <span className="font-heading font-bold text-base text-white">
                                                {stage.name}
                                            </span>
                                        </div>
                                        <ChevronRight
                                            size={16}
                                            className={`transition-transform ${
                                                isSelected ? 'text-[#D4B270] rotate-90' : 'text-[#AAA99F]/40'
                                            }`}
                                        />
                                    </div>

                                    <p className="text-xs text-[#AAA99F] leading-relaxed pl-9">
                                        {stage.description}
                                    </p>
                                </button>
                            )
                        })}

                        {/* Sahyak External Callout */}
                        <div className="pt-4">
                            <a
                                href="https://sahyak.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tactile-btn inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[#9B7545] hover:bg-[#B88E56] text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                            >
                                <span>Explore Live Sahyak Platform</span>
                                <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Right: Dynamic Interactive Interface Visual (lg:col-span-7) */}
                    <div className="lg:col-span-7 space-y-5">
                        <div className="rounded-3xl border border-white/15 bg-[#121310] p-6 sm:p-8 shadow-2xl space-y-6">
                            {/* Visual Title Bar */}
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div>
                                    <span className="text-[10px] font-mono text-[#D4B270] uppercase font-bold block">
                                        {current.previewBadge}
                                    </span>
                                    <h4 className="text-lg sm:text-xl font-bold font-heading text-white mt-0.5">
                                        {current.title}
                                    </h4>
                                </div>
                                <span className="text-xs font-mono text-[#3F5544] bg-[#3F5544]/20 border border-[#3F5544]/40 px-2.5 py-1 rounded-lg">
                                    ACTIVE PIPELINE
                                </span>
                            </div>

                            {/* Dynamic Stage Items */}
                            <div className="space-y-3">
                                {current.interactiveItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#9B7545]/40 transition-colors"
                                    >
                                        <div>
                                            <p className="text-xs font-bold text-white">
                                                {item.source}
                                            </p>
                                            <p className="text-[11px] text-[#AAA99F] mt-0.5">
                                                {item.contact}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2.5 sm:self-auto self-start">
                                            <span className="text-xs font-mono font-bold text-[#D4B270]">
                                                {item.value}
                                            </span>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Real Platform Screenshot Reference */}
                            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#AAA99F]">
                                <span>Platform Deployment: sahyak.com</span>
                                <span className="text-[#D4B270]">Sales Operations Suite</span>
                            </div>
                        </div>

                        {/* Complimentary Inclusion Banner */}
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#9B7545]/30 flex items-center justify-between gap-3 text-xs">
                            <span className="text-[#D4B270] font-mono font-semibold">
                                Complimentary 30-Day Deployment Included with Qualifying Growth Engagements
                            </span>
                            <a
                                href="https://sahyak.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-[#D4B270] underline flex-shrink-0"
                            >
                                Learn More ↗
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
