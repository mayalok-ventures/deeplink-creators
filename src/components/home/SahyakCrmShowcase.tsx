'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    ArrowUpRight,
    ArrowRight,
    ChevronRight,
    CheckCircle2,
    Sliders,
    Workflow,
    Activity,
    Layers,
    PhoneCall,
    Mail,
    Calendar,
    Users,
    Filter,
    ShieldCheck
} from 'lucide-react'

export default function SahyakCrmShowcase() {
    const [activeStage, setActiveStage] = useState(0)

    const stages = [
        {
            id: '01',
            name: 'Capture',
            stageTag: 'STAGE 01 // MULTI-SOURCE INGESTION',
            title: 'Unified Lead Capture & Attribution',
            description:
                'Every inquiry from creator funnels, search ads, and organic SEO is ingested instantly with channel attribution.',
            uiView: {
                header: 'Live Ingestion Stream (Real-Time)',
                items: [
                    { label: 'Commercial Equipment RFP', source: 'Creator Syndication Funnel', value: '₹14,50,000', status: 'Routing' },
                    { label: 'Industrial Automation Quote', source: 'Industrial SEO Search', value: '₹22,00,000', status: 'New Lead' },
                    { label: 'SaaS Platform Deployment', source: 'Direct Inbound Form', value: '₹8,50,000', status: 'New Lead' }
                ]
            }
        },
        {
            id: '02',
            name: 'Qualify',
            stageTag: 'STAGE 02 // STAGE GATE GOVERNANCE',
            title: 'Enforced Pipeline Verification Gates',
            description:
                'Reps cannot advance deals on speculation. Mandatory verification of budget, timeline, and decision-maker access.',
            uiView: {
                header: 'Stage Gate Verification Matrix',
                items: [
                    { label: 'Authority Verification', source: 'Decision Maker Confirmed: MD & VP', value: 'Verified', status: 'Passed' },
                    { label: 'Commercial Budget Check', source: '₹15L - ₹30L Bracket Confirmed', value: 'Verified', status: 'Passed' },
                    { label: 'Rollout Timeline', source: 'Target Deployment: Q4 Implementation', value: 'Confirmed', status: 'Passed' }
                ]
            }
        },
        {
            id: '03',
            name: 'Assign',
            stageTag: 'STAGE 03 // INTELLIGENT ROUTING',
            title: 'Rules-Based Rep & Account Routing',
            description:
                'Automatic lead distribution based on deal value, geography, and rep bandwidth ensures sub-15m first response.',
            uiView: {
                header: 'Rep Routing & Capacity Engine',
                items: [
                    { label: 'Account Exec A (Enterprise)', source: '3 Active Deals (Capacity: 75%)', value: 'Assigned', status: 'Active' },
                    { label: 'Account Exec B (Industrial)', source: '2 Active Deals (Capacity: 50%)', value: 'Next in Queue', status: 'Routing' },
                    { label: 'Account Exec C (Regional)', source: '4 Active Deals (Capacity: 80%)', value: 'Balanced', status: 'Standby' }
                ]
            }
        },
        {
            id: '04',
            name: 'Follow Up',
            stageTag: 'STAGE 04 // ACTIVITY TELEMETRY',
            title: 'Activity Cadence & Timeline Audit',
            description:
                'Full audit trail of calls, demos, and follow-ups. Zero deals slip through cracks with automated cadence reminders.',
            uiView: {
                header: 'Executive Activity Timeline',
                items: [
                    { label: 'Executive Discovery Call', source: 'Completed by Kunal • 28m duration', value: 'Positive Intent', status: 'Logged' },
                    { label: 'Commercial Proposal Sent', source: 'Sent to CFO • Scheduled Follow-up', value: 'Tomorrow 11 AM', status: 'Pending' },
                    { label: 'Technical Architecture Review', source: 'Completed with VP Engineering', value: 'Approved', status: 'Logged' }
                ]
            }
        },
        {
            id: '05',
            name: 'Convert',
            stageTag: 'STAGE 05 // REVENUE PIPELINE',
            title: 'Pipeline Velocity & Deal Closing',
            description:
                'Real-time visibility into deal velocity and closed-won revenue without compiling manual spreadsheets.',
            uiView: {
                header: 'Closed-Won Revenue Kanban',
                items: [
                    { label: 'Master Services Agreement Signed', source: 'Industrial Distribution Hub', value: '₹32,50,000', status: 'Won' },
                    { label: 'Enterprise Platform Contract', source: 'SaaS Platform Deployment', value: '₹18,50,000', status: 'Closing' },
                    { label: 'Annual Growth Infrastructure', source: 'Commercial Proposal Accepted', value: '₹14,00,000', status: 'Won' }
                ]
            }
        }
    ]

    const current = stages[activeStage]

    return (
        <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 bg-[#181A16] text-[#F3F0E8] relative z-10 border-y border-[#181A16]">
            {/* Subtle Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#9B7545_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-15 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mb-20">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#D4B270] uppercase block mb-3">
                        THE PRODUCT MOMENT // SAHYAK CRM
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.06] mb-5">
                        A CRM built around the way{' '}
                        <span className="text-[#D4B270]">sales actually happen.</span>
                    </h2>
                    <p className="text-base sm:text-lg text-[#AAA99F] leading-relaxed max-w-2xl font-normal">
                        Sahyak brings leads, pipelines, follow-ups, accountability and sales visibility into one operating system.
                    </p>
                </div>

                {/* Spatial Product Viewport */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Left: 5 Stage Selectors (lg:col-span-5) */}
                    <div className="lg:col-span-5 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-wider text-[#D4B270] mb-3">
                            OPERATIONAL PIPELINE STAGES
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
                                <span>Explore sahyak.com Platform</span>
                                <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Right: High-Fidelity Product UI Viewport (lg:col-span-7) */}
                    <div className="lg:col-span-7 space-y-5">
                        <div className="rounded-3xl border border-white/15 bg-[#121310] p-6 sm:p-8 shadow-2xl space-y-6">
                            {/* Product Viewport Header */}
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div>
                                    <span className="text-[10px] font-mono text-[#D4B270] uppercase font-bold block">
                                        {current.stageTag}
                                    </span>
                                    <h4 className="text-lg sm:text-xl font-bold font-heading text-white mt-0.5">
                                        {current.uiView.header}
                                    </h4>
                                </div>
                                <span className="text-xs font-mono text-[#3F5544] bg-[#3F5544]/20 border border-[#3F5544]/40 px-2.5 py-1 rounded-lg">
                                    ACTIVE PIPELINE
                                </span>
                            </div>

                            {/* Dynamic Stage Workflow Items */}
                            <div className="space-y-3">
                                {current.uiView.items.map((item, i) => (
                                    <div
                                        key={i}
                                        className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#9B7545]/40 transition-colors"
                                    >
                                        <div>
                                            <p className="text-xs font-bold text-white font-heading">
                                                {item.label}
                                            </p>
                                            <p className="text-[11px] text-[#AAA99F] font-mono mt-0.5">
                                                {item.source}
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

                            {/* Viewport Platform Reference */}
                            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#AAA99F]">
                                <span>Platform Deployment: sahyak.com</span>
                                <span className="text-[#D4B270]">Sales Operations Suite</span>
                            </div>
                        </div>

                        {/* Complimentary Inclusion Callout */}
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
