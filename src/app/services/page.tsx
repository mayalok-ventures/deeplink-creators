'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    ArrowRight,
    ChevronRight,
    ShieldCheck,
    Cpu,
    Network,
    BarChart3,
    CheckCircle2,
    Sparkles,
    Gift,
    Workflow,
    Lock,
    Users,
    Layers,
    Boxes,
    ExternalLink
} from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

/* ═══════════════════════════════════════════════════════════════════════
   DOSSIER CARD WITH IDENTITY SWAP & DELAYED REALITY
═══════════════════════════════════════════════════════════════════════ */
interface DossierCardProps {
    index: string
    title: string
    summary: string
    category: string
    capabilities: string[]
    useCase: string
    techStack: Array<{ name: string; icon: string }>
}

function DossierOfferingCard({
    index,
    title,
    summary,
    category,
    capabilities,
    useCase,
    techStack,
}: DossierCardProps) {
    return (
        <div className="dossier-card gsap-card rounded-2xl border border-[#181A16]/12 bg-white p-6 sm:p-8 shadow-sm relative min-h-[380px] flex flex-col justify-between overflow-hidden">
            {/* 1. PRIMARY VIEW (Default Surface) */}
            <div className="dossier-primary-view space-y-4">
                <div className="flex items-center justify-between">
                    <span className="chapter-numeral text-3xl font-extrabold text-[#9B7545]">
                        {index}
                    </span>
                    <span className="marginal-label text-[#65675F] px-2.5 py-1 rounded bg-[#E6E2D7] border border-[#181A16]/08">
                        {category}
                    </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#181A16] tracking-tight">
                    {title}
                </h2>

                <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed">
                    {summary}
                </p>

                {/* Tech Stack Badges */}
                <div className="pt-3 border-t border-[#181A16]/08">
                    <span className="text-[10px] font-mono text-[#65675F] uppercase block mb-2">
                        ENGINEERING STACK
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                        {techStack.map((tech) => (
                            <span
                                key={tech.name}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#181A16]/08 text-[11px] font-mono text-[#181A16]"
                            >
                                <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    className="w-3.5 h-3.5 object-contain"
                                />
                                <span>{tech.name}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. SECONDARY VIEW (Dossier Identity Swap Reveal - Visible on Desktop Hover) */}
            <div className="dossier-secondary-view absolute inset-0 bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between border-t-2 border-[#9B7545]">
                <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#181A16]/08">
                        <span className="text-xs font-mono font-bold text-[#9B7545] uppercase tracking-wider">
                            DOSSIER // CAPABILITIES
                        </span>
                        <span className="text-xs font-mono text-[#65675F]">{index}</span>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-[#181A16]">
                        {capabilities.map((cap, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-[#3F5544] flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">{cap}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-2">
                        <p className="text-[11px] font-mono text-[#65675F] leading-relaxed bg-white p-2.5 rounded-lg border border-[#181A16]/08">
                            <strong className="text-[#181A16]">Impact:</strong> {useCase}
                        </p>
                    </div>
                </div>

                <div className="pt-3 border-t border-[#181A16]/08">
                    <Link
                        href="/contact"
                        className="tactile-btn w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#181A16] hover:bg-[#252720] text-[#F3F0E8] font-heading font-semibold text-xs tracking-wide shadow-sm"
                    >
                        <span>Initiate Briefing on this Offering</span>
                        <ArrowRight size={13} className="text-[#D4B270]" />
                    </Link>
                </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-4 border-t border-[#181A16]/08 flex items-center justify-between text-xs font-mono text-[#65675F]">
                <span>Enterprise Offering</span>
                <span className="text-[#9B7545] font-medium hidden sm:inline">Hover for Dossier →</span>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════════════
   SAHYAK CRM INSIDE-OUT SPOTLIGHT COMPONENT
═══════════════════════════════════════════════════════════════════════ */
function SahyakInsideOutSpotlight() {
    const shouldReduceMotion = useReducedMotion()
    const cardRef = useRef<HTMLDivElement>(null)
    const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 })

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (shouldReduceMotion || typeof window === 'undefined') return
            if (!cardRef.current) return

            const rect = cardRef.current.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height
            const rx = (0.5 - y) * 8
            const ry = (x - 0.5) * 8

            setTilt({ rx, ry, mx: x * 100, my: y * 100 })
        },
        [shouldReduceMotion]
    )

    const handleMouseLeave = useCallback(() => {
        setTilt({ rx: 0, ry: 0, mx: 50, my: 50 })
    }, [])

    return (
        <div className="inside-out-stage">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="inside-out-card relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#181A16] living-border-frame living-border-glow"
                style={{
                    transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                    '--mouse-x': `${tilt.mx}%`,
                    '--mouse-y': `${tilt.my}%`,
                } as React.CSSProperties}
            >
                <div className="relative h-[260px] sm:h-[320px] md:h-[380px] w-full">
                    <Image
                        src="/images/sahyak-crm-mockup.jpg"
                        alt="Sahyak CRM Platform Dashboard Interface"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181A16]/70 via-transparent to-transparent" />
                </div>

                <div className="impossible-reflection" />

                <div className="p-4 bg-[#181A16]/95 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#AAA99F] relative z-10">
                    <span className="text-[#D4B270] font-semibold">sahyak.com</span>
                    <span>30-DAY COMPLIMENTARY DEPLOYMENT</span>
                </div>
            </div>
        </div>
    )
}

export default function ServicesPage() {
    const shouldReduceMotion = useReducedMotion()
    const containerRef = useRef<HTMLDivElement>(null)

    // GSAP ScrollTrigger Integration for subtle card reveals
    useEffect(() => {
        if (shouldReduceMotion || typeof window === 'undefined') return

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.gsap-card').forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 16 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: (i % 2) * 0.08,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })
        }, containerRef)

        return () => ctx.revert()
    }, [shouldReduceMotion])

    return (
        <div
            ref={containerRef}
            className="bg-[#F3F0E8] text-[#181A16] min-h-screen selection:bg-[#9B7545]/20 selection:text-[#181A16] relative overflow-x-hidden font-sans"
        >
            {/* Subtle Architectural Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#181A1608_1px,transparent_1px),linear-gradient(to_bottom,#181A1608_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════════
                1. COMPACT SERVICES HEADER (Editorial Catalog Intro)
            ══════════════════════════════════════════════════════════════ */}
            <header className="relative pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-12 md:pb-14 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Core Value & Call to Actions */}
                    <div className="lg:col-span-7 space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E2D7] border border-[#181A16]/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9B7545] animate-pulse flex-shrink-0" />
                            <span className="marginal-label text-[#181A16] font-bold">
                                ENTERPRISE OFFERINGS CATALOG
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-[#181A16] leading-[1.14]">
                            Software, Distribution &amp;{' '}
                            <span className="text-brass-gradient">
                                Enterprise Systems.
                            </span>
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg text-[#65675F] max-w-2xl leading-relaxed font-normal">
                            Deeplink Creators builds proprietary software infrastructure and creator-led distribution systems for organizations seeking durable operational and market advantage.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto pt-1">
                            <Link
                                href="/contact"
                                className="tactile-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#181A16] text-[#F3F0E8] font-heading font-semibold text-sm tracking-wide shadow-sm hover:bg-[#252720] active:scale-[0.98] transition-all min-h-[46px]"
                            >
                                <span>Schedule Enterprise Briefing</span>
                                <ArrowRight size={16} className="text-[#D4B270]" />
                            </Link>

                            <a
                                href="https://sahyak.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tactile-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#181A16] border border-[#181A16]/15 hover:bg-[#E6E2D7] font-heading font-semibold text-sm tracking-wide active:scale-[0.98] transition-all min-h-[46px]"
                            >
                                <span>Sahyak CRM Platform</span>
                                <ExternalLink size={14} className="text-[#9B7545]" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Key Operating Signals */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="p-4 sm:p-5 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-1">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                ARCHITECTURE
                            </span>
                            <span className="text-lg sm:text-xl font-bold font-heading text-[#181A16] block">
                                Multi-Tenant
                            </span>
                            <p className="text-xs text-[#65675F] leading-snug">
                                Secure database isolation and custom workflow rules
                            </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-1">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                DISTRIBUTION
                            </span>
                            <span className="text-lg sm:text-xl font-bold font-heading text-[#181A16] block">
                                Creator-Led
                            </span>
                            <p className="text-xs text-[#65675F] leading-snug">
                                Niche audience access and verified syndication
                            </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-1">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                CRM PLATFORM
                            </span>
                            <span className="text-lg sm:text-xl font-bold font-heading text-[#181A16] block">
                                Sahyak CRM
                            </span>
                            <p className="text-xs text-[#65675F] leading-snug">
                                30-day deployment benefit included with engagements
                            </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-1">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                GOVERNANCE
                            </span>
                            <span className="text-lg sm:text-xl font-bold font-heading text-[#181A16] block">
                                Mayalok Unit
                            </span>
                            <p className="text-xs text-[#65675F] leading-snug">
                                Institutional venture capital backing and stability
                            </p>
                        </div>
                    </div>
                </div>
            </header>


            {/* ══════════════════════════════════════════════════════════════
                2. FOUR CORE OFFERINGS (Dossier Identity Swap Grid)
            ══════════════════════════════════════════════════════════════ */}
            <main className="relative pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Offering 01 */}
                    <DossierOfferingCard
                        index="01"
                        category="PROPRIETARY SOFTWARE"
                        title="B2B SaaS &amp; Custom Software Engineering"
                        summary="End-to-end architecture and engineering of proprietary B2B software, multi-tenant SaaS platforms, internal operating systems, and client portals."
                        capabilities={[
                            'Multi-tenant database schema & secure auth architecture',
                            'Role-based access control (RBAC) & tenant isolation',
                            'Scalable API design, webhooks & microservices integration',
                            'High-performance fullstack development with Next.js & Python',
                        ]}
                        useCase="Transitioning internal spreadsheets or fragmented tools into a proprietary, scalable B2B SaaS asset owned permanently by your enterprise."
                        techStack={[
                            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
                            { name: 'Python', icon: '/images/strategy/python-logo.png' },
                            { name: 'PostgreSQL', icon: '/images/strategy/postgresql.png' },
                            { name: 'Node.js', icon: '/images/strategy/nodejs.png' },
                        ]}
                    />

                    {/* Offering 02 */}
                    <DossierOfferingCard
                        index="02"
                        category="AUDIENCE DISTRIBUTION"
                        title="Creator-Led Audience &amp; Distribution Networks"
                        summary="Strategic curation, onboarding, and orchestration of dedicated creator and micro-influencer ecosystems that syndicate your enterprise message."
                        capabilities={[
                            'Curated creator network vetting & audience integrity audit',
                            'Syndicated content distribution across niche industry verticals',
                            'Zero dependency on volatile paid advertising algorithms',
                            'Conversion attribution tracking & performance telemetry',
                        ]}
                        useCase="Establishing direct commercial distribution channels into high-value B2B decision-maker communities without burning budget on PPC bidding."
                        techStack={[
                            { name: 'Node.js', icon: '/images/strategy/nodejs.png' },
                            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
                            { name: 'React Native', icon: '/images/strategy/reactnative.png' },
                        ]}
                    />

                    {/* Offering 03 */}
                    <DossierOfferingCard
                        index="03"
                        category="PIPELINE AUTOMATION"
                        title="Revenue Operations &amp; Pipeline Automation"
                        summary="Engineering high-conversion sales funnels, CRM workflow architecture, automated lead routing, and revenue telemetry systems."
                        capabilities={[
                            'Automated multi-channel lead routing & SLA tracking',
                            'Stage-gated pipeline workflows & automated follow-ups',
                            'Live revenue analytics & conversion bottleneck detection',
                            'Deep CRM telemetry integration powered by Sahyak CRM',
                        ]}
                        useCase="Eliminating pipeline leakage and enforcing operational accountability across distributed enterprise sales representatives."
                        techStack={[
                            { name: 'Python', icon: '/images/strategy/python-logo.png' },
                            { name: 'PostgreSQL', icon: '/images/strategy/postgresql.png' },
                            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
                        ]}
                    />

                    {/* Offering 04 */}
                    <DossierOfferingCard
                        index="04"
                        category="STRATEGIC ADVISORY"
                        title="Enterprise Systems Advisory &amp; Architecture"
                        summary="Fractional CTO, software holding advisory, and technical due diligence for organizations modernizing legacy workflows or scaling digital assets."
                        capabilities={[
                            'Legacy system refactoring & cloud migration blueprints',
                            'Data security, regulatory compliance & DPDP readiness',
                            'Venture studio scaling frameworks & technical due diligence',
                            'Engineering team mentorship & architectural governance',
                        ]}
                        useCase="Empowering executive leadership with senior architectural guidance to avoid costly infrastructure missteps."
                        techStack={[
                            { name: 'PostgreSQL', icon: '/images/strategy/postgresql.png' },
                            { name: 'Python', icon: '/images/strategy/python-logo.png' },
                            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
                        ]}
                    />
                </div>
            </main>


            {/* ══════════════════════════════════════════════════════════════
                3. SAHYAK CRM COMPLIMENTARY INCLUSION CHAPTER
                Inside-Out Product Spotlight & 30-Day Deployment Benefit
            ══════════════════════════════════════════════════════════════ */}
            <section
                id="sahyak-crm"
                className="py-14 sm:py-20 md:py-28 px-5 sm:px-6 lg:px-8 bg-[#252720] text-[#F3F0E8] relative z-10 border-t border-[#181A16]"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        {/* Left Narrative Column (lg:col-span-6) */}
                        <div className="lg:col-span-6 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B7545]/20 border border-[#9B7545]/35 text-[#D4B270] text-[11px] font-mono font-bold tracking-widest uppercase">
                                <Sparkles size={13} />
                                FLAGSHIP SOFTWARE BENEFIT
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                                30-Day Sahyak CRM Access{' '}
                                <span className="text-[#D4B270]">
                                    Included with Every Client Engagement.
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base text-[#AAA99F] leading-relaxed">
                                We believe execution without software is incomplete. When you partner with Deeplink Creators for software development or distribution architecture, we deploy Sahyak CRM into your organization with 30 days of complimentary access.
                            </p>

                            <div className="space-y-3 pt-2">
                                {[
                                    'Pre-configured pipeline stages tailored to your commercial model',
                                    'Multi-agent lead assignment, status tracking & SLA monitoring',
                                    'Automated multi-channel follow-up workflows and notifications',
                                    'Seamless integration with custom web apps and landing pages',
                                ].map((benefit) => (
                                    <div key={benefit} className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                                        <CheckCircle2 size={15} className="text-[#9B7545] flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-2 flex flex-wrap items-center gap-4">
                                <a
                                    href="https://sahyak.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tactile-btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#9B7545] hover:bg-[#B88E56] text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                                >
                                    <span>Explore Sahyak CRM (sahyak.com)</span>
                                    <ExternalLink size={14} />
                                </a>

                                <Link
                                    href="/contact"
                                    className="tactile-btn inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all border border-white/10"
                                >
                                    <span>Claim 30-Day Deployment</span>
                                    <ArrowRight size={14} className="text-[#D4B270]" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Software Mockup (Inside-Out 3D Spotlight) */}
                        <div className="lg:col-span-6">
                            <SahyakInsideOutSpotlight />
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════════════
                4. ENTERPRISE ENGAGEMENT CTA
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 md:py-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10">
                <div className="p-8 sm:p-12 md:p-16 rounded-3xl border border-[#181A16]/15 bg-[#181A16] text-[#F3F0E8] text-center space-y-6 shadow-2xl">
                    <span className="marginal-label text-[#D4B270] tracking-widest font-bold">
                        ENGAGEMENT PROCESS
                    </span>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight max-w-3xl mx-auto leading-tight">
                        Engineer your software and distribution systems.
                    </h2>

                    <p className="text-sm sm:text-base text-[#AAA99F] leading-relaxed max-w-2xl mx-auto font-normal">
                        Submit your project scope or schedule a consultation with our technical principals in Greater Noida.
                    </p>

                    <div className="pt-2">
                        <Link
                            href="/contact"
                            className="tactile-btn inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#9B7545] via-[#B88E56] to-[#9B7545] text-white font-heading font-bold text-sm tracking-wide shadow-md active:scale-[0.98] transition-all min-h-[48px]"
                        >
                            <span>Schedule Enterprise Briefing</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
