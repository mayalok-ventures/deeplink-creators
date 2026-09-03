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
    Workflow,
    Lock,
    Users,
    Layers,
    Boxes,
    ExternalLink,
    Search,
    TrendingUp,
    Building2,
    GraduationCap,
    Store,
    Layout,
    Brain,
    Bot,
    ArrowUpRight,
    Zap,
    Target,
    Gauge,
    Sliders,
    Activity,
    Compass,
    Factory
} from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

/* ═══════════════════════════════════════════════════════════════════════
   PILLAR 01: SAHYAK CRM INTERACTIVE WORKFLOW STAGES
═══════════════════════════════════════════════════════════════════════ */
const SAHYAK_STAGES = [
    {
        id: '01',
        name: 'Capture',
        tag: 'STAGE 01 // INGESTION',
        title: 'Multi-Channel Lead Ingestion',
        description: 'Inbound inquiries from creator funnels, search campaigns, and organic SEO are ingested with complete channel attribution.',
        status: 'Attributed & Ingested'
    },
    {
        id: '02',
        name: 'Qualify',
        tag: 'STAGE 02 // STAGE GATES',
        title: 'Mandatory Qualification Gates',
        description: 'Reps cannot advance speculative deals. Enforced verification of budget brackets, purchase timelines, and decision-maker access.',
        status: 'Stage Gate Verified'
    },
    {
        id: '03',
        name: 'Assign',
        tag: 'STAGE 03 // ROUTING',
        title: 'Rules-Based Rep Allocation',
        description: 'Automated lead distribution based on deal category, territory, and rep capacity ensures rapid first response.',
        status: 'Assigned to Rep'
    },
    {
        id: '04',
        name: 'Follow Up',
        tag: 'STAGE 04 // CADENCE',
        title: 'Activity Cadence & Telemetry',
        description: 'Complete audit trail of calls, proposals, and demos. Automated reminders ensure zero pipeline leakage.',
        status: 'Follow-Up Active'
    },
    {
        id: '05',
        name: 'Convert',
        tag: 'STAGE 05 // VELOCITY',
        title: 'Pipeline Velocity & Conversion Tracking',
        description: 'Real-time visibility into active pipeline stages, deal velocity, and conversion performance.',
        status: 'Conversion Tracking Active'
    }
]

/* ═══════════════════════════════════════════════════════════════════════
   PILLAR 02: CREATOR DISTRIBUTION CHANNELS
═══════════════════════════════════════════════════════════════════════ */
const CREATOR_CHANNELS = [
    {
        id: 'b2b-tech',
        num: '01',
        tag: 'B2B & TECHNOLOGY',
        title: 'Software, SaaS & Tech Operators',
        audience: 'Founders, CTOs, Operators & Technical Decision Makers',
        summary: 'Architectural walk-throughs, product teardowns, and targeted adoption across verified technical communities.',
        deliverable: 'Direct distribution to software buyers and technical evaluators',
        slug: '/services/social-commerce/'
    },
    {
        id: 'industrial',
        num: '02',
        tag: 'INDUSTRIAL & MANUFACTURING',
        title: 'Commercial Machinery & OEM Equipment',
        audience: 'Plant Managers, Operations Heads & Procurement Directors',
        summary: 'Factory floor demonstrations, operational machinery reviews, and qualified commercial inquiry generation.',
        deliverable: 'Direct distribution to industrial specifiers and procurement teams',
        slug: '/services/social-commerce/'
    },
    {
        id: 'regional',
        num: '03',
        tag: 'REGIONAL CORRIDORS',
        title: 'Delhi NCR & High-Growth Metros',
        audience: 'Regional Business Owners, Distributors & Commercial Buyers',
        summary: 'Dense localized creator networks driving geo-targeted commercial distribution across Delhi NCR and key metro hubs.',
        deliverable: 'High-trust localized reach and regional commercial visibility',
        slug: '/services/social-commerce/'
    },
    {
        id: 'high-ticket',
        num: '04',
        tag: 'HIGH-TICKET SERVICES',
        title: 'Consulting, Real Estate & Advisory',
        audience: 'Business Owners, Executives & High-Intent Clients',
        summary: 'Problem breakdowns, executive perspectives, and high-value consultative pipeline development.',
        deliverable: 'Authority-driven channels delivering qualified commercial inquiries',
        slug: '/services/social-commerce/'
    }
]

/* ═══════════════════════════════════════════════════════════════════════
   PILLAR 03: DEMAND & GROWTH SYSTEMS CAPABILITIES
═══════════════════════════════════════════════════════════════════════ */
const GROWTH_CAPABILITIES = [
    {
        num: '01',
        slug: '/services/industrial-seo/',
        category: 'SEARCH INFRASTRUCTURE',
        title: 'Industrial & Commercial SEO Infrastructure',
        summary: 'High-intent commercial and industrial search visibility engineered through semantic entity mapping, programmatic keyword structures, and technical optimization.',
        metric: 'High-Intent Search',
        metricLabel: 'Durable Organic Demand',
        capabilities: [
            'Programmatic schema graphs and entity mapping',
            'High-intent commercial search keyword strategy',
            'Technical Core Web Vitals optimization',
            'Generative Engine Optimization (GEO) for AI search engines'
        ],
        techStack: ['Next.js', 'PostgreSQL', 'HTML5', 'Node.js']
    },
    {
        num: '02',
        slug: '/services/performance-marketing/',
        category: 'PERFORMANCE ACQUISITION',
        title: 'Precision Performance Marketing & CAC Control',
        summary: 'Paid acquisition across Google Search, LinkedIn, and Meta campaigns with rigorous conversion tracking, attribution, and customer acquisition cost (CAC) visibility.',
        metric: 'Unit Economics',
        metricLabel: 'Attribution & CAC Control',
        capabilities: [
            'High-intent Google Search & LinkedIn account targeting',
            'Server-side Conversion API (CAPI) tracking infrastructure',
            'Continuous creative testing & CAC compression',
            'Direct attribution connecting ad spend to pipeline stages'
        ],
        techStack: ['Python', 'PostgreSQL', 'Next.js']
    },
    {
        num: '03',
        slug: '/services/conversion-web-design/',
        category: 'CONVERSION ARCHITECTURE',
        title: 'High-Velocity Conversion Web Architecture',
        summary: 'Web experiences designed to turn qualified attention into measurable inquiries through fast loading, frictionless capture, and clear commercial value framing.',
        metric: 'Sub-Second Render',
        metricLabel: 'Conversion Optimization',
        capabilities: [
            'Editorial, high-performance web experiences',
            'Friction-free lead capture with instant CRM handoff',
            'Behavioral tracking and conversion rate optimization (CRO)',
            'Responsive multi-breakpoint design engineered for decision makers'
        ],
        techStack: ['Next.js', 'Node.js', 'HTML5', 'CSS3']
    },
    {
        num: '04',
        slug: '/services/ai-marketing-automation/',
        category: 'PIPELINE AUTOMATION',
        title: 'AI Workflow & Pipeline Automation',
        summary: 'Automated workflows for lead routing, qualification stage gates, and follow-up sequences that eliminate response lag and prevent pipeline leakage.',
        metric: 'Instant Handoff',
        metricLabel: 'Zero Pipeline Leakage',
        capabilities: [
            'Multi-channel lead intake and automated verification',
            'Stage-gated pipeline automation synchronized with Sahyak CRM',
            'Automated follow-up sequences across Email and messaging',
            'Real-time rep routing alerts and SLA monitoring'
        ],
        techStack: ['Python', 'Node.js', 'PostgreSQL', 'Next.js']
    },
    {
        num: '05',
        slug: '/services/brand-psychology/',
        category: 'EXECUTIVE AUTHORITY',
        title: 'Executive Positioning & Brand Psychology',
        summary: 'Brand and category positioning designed to strengthen commercial trust through executive thought leadership, authoritative viewpoints, and high-trust design.',
        metric: 'Market Standing',
        metricLabel: 'Executive Trust & Authority',
        capabilities: [
            'Executive thought leadership and industry briefings',
            'Visual identity systems tailored for commercial confidence',
            'Cognitive framing and premium market positioning',
            'Corporate reputation architecture'
        ],
        techStack: ['Next.js', 'HTML5', 'CSS3']
    }
]

/* ═══════════════════════════════════════════════════════════════════════
   INDUSTRY APPLICATIONS / USE CASES DATA
═══════════════════════════════════════════════════════════════════════ */
const INDUSTRY_APPLICATIONS = [
    {
        icon: Factory,
        slug: '/services/b2b-industrial-marketing/',
        title: 'B2B Industrial & Manufacturing',
        summary: 'Demand generation and RFQ pipelines for manufacturing plants, heavy machinery OEMs, and engineering suppliers.',
        highlight: 'High-ticket RFQ funnels & industrial search indexing'
    },
    {
        icon: Building2,
        slug: '/services/real-estate-marketing/',
        title: 'High-Ticket Real Estate & PropTech',
        summary: 'Commercial and residential buyer acquisition engines for developers, property firms, and PropTech platforms.',
        highlight: 'Verified investor acquisition & project microsites'
    },
    {
        icon: GraduationCap,
        slug: '/services/education-marketing/',
        title: 'Higher Education & EdTech',
        summary: 'Recruitment pipelines, dynamic application portal architectures, and counselor workflow optimization for institutions.',
        highlight: 'Application portal architecture & counselor tracking'
    }
]

/* ═══════════════════════════════════════════════════════════════════════
   SAHYAK SPOTLIGHT: INTERACTIVE 3D TILT VIEWPORT COMPONENT
═══════════════════════════════════════════════════════════════════════ */
function SahyakInsideOutSpotlight() {
    const cardRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const shouldReduceMotion = useReducedMotion()

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current || shouldReduceMotion) return
            const rect = cardRef.current.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width - 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5
            setMousePos({ x, y })
        },
        [shouldReduceMotion]
    )

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
        setIsHovered(false)
        setMousePos({ x: 0, y: 0 })
    }

    const tiltX = shouldReduceMotion ? 0 : mousePos.y * -8
    const tiltY = shouldReduceMotion ? 0 : mousePos.x * 8

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
            }}
            className="relative rounded-3xl bg-gradient-to-br from-[#1F211C] to-[#141612] border border-[#9B7545]/30 p-6 sm:p-8 shadow-2xl overflow-hidden group"
        >
            {/* Ambient Gold Glow on Cursor */}
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(400px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(212, 178, 112, 0.12), transparent 80%)`,
                }}
            />

            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs font-mono">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9B7545]" />
                    <span className="text-[#D4B270] font-bold">SAHYAK OS // LIVE PIPELINE CONTROL</span>
                </div>
                <span className="text-[#8FA994] text-[10px] bg-[#3F5544]/20 px-2 py-0.5 rounded border border-[#8FA994]/30">
                    STATUS: OPERATIONAL
                </span>
            </div>

            {/* Live Pipeline Telemetry Mockup */}
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/08">
                        <span className="text-[10px] font-mono text-[#AAA99F] block">INGESTED LEADS</span>
                        <span className="text-xl font-bold font-mono text-white mt-0.5 block">142</span>
                        <span className="text-[9px] font-mono text-[#8FA994]">Channel Attributed</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/08">
                        <span className="text-[10px] font-mono text-[#AAA99F] block">STAGE GATED</span>
                        <span className="text-xl font-bold font-mono text-[#D4B270] mt-0.5 block">88</span>
                        <span className="text-[9px] font-mono text-[#D4B270]">Verified Intent</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/08">
                        <span className="text-[10px] font-mono text-[#AAA99F] block">REP ACTIVE</span>
                        <span className="text-xl font-bold font-mono text-white mt-0.5 block">100%</span>
                        <span className="text-[9px] font-mono text-[#8FA994]">0 SLA Breaches</span>
                    </div>
                </div>

                {/* Pipeline Flow Stages Mini-Display */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/06 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#AAA99F]">
                        <span>PIPELINE VELOCITY TELEMETRY</span>
                        <span className="text-[#D4B270]">5-STAGE ENFORCEMENT</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 pt-1">
                        {['Capture', 'Qualify', 'Assign', 'Follow-up', 'Convert'].map((stage, i) => (
                            <div
                                key={stage}
                                className={`p-2 rounded-lg text-center font-mono text-[9px] border transition-colors ${
                                    i <= 3
                                        ? 'bg-[#9B7545]/15 border-[#9B7545]/40 text-[#D4B270]'
                                        : 'bg-white/[0.02] border-white/06 text-[#AAA99F]'
                                }`}
                            >
                                <span className="block font-bold">{`0${i + 1}`}</span>
                                <span className="truncate block mt-0.5">{stage}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Lead Dossier Snapshot */}
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#9B7545]/20 border border-[#9B7545]/40 flex items-center justify-center text-[#D4B270] font-mono font-bold text-xs">
                            RFQ
                        </div>
                        <div>
                            <p className="font-heading font-bold text-white text-xs">Industrial OEM Inquiry</p>
                            <p className="text-[10px] text-[#AAA99F] font-mono">Source: Creator Network // Stage: Rep Assigned</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#3F5544]/30 text-[#8FA994] border border-[#8FA994]/20">
                        ROUTED &lt; 2M
                    </span>
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN OFFERINGS PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const shouldReduceMotion = useReducedMotion()
    const [activeSahyakStage, setActiveSahyakStage] = useState(0)

    // GSAP ScrollTrigger Integration for smooth card reveals
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
                        delay: (i % 2) * 0.06,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 92%',
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
            {/* Subtle Architectural Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#181A1608_1px,transparent_1px),linear-gradient(to_bottom,#181A1608_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════════
                1. OFFERING HERO & 4 OPERATING SIGNALS
            ══════════════════════════════════════════════════════════════ */}
            <header className="relative pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Core Identity & CTAs */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E2D7] border border-[#181A16]/10">
                            <span className="w-2 h-2 rounded-full bg-[#9B7545] animate-pulse flex-shrink-0" />
                            <span className="marginal-label text-[#181A16] font-bold">
                                DEEPLINK OFFERINGS // COMMERCIAL INFRASTRUCTURE
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-[#181A16] leading-[1.08]">
                            What We Build &amp;{' '}
                            <span className="text-brass-gradient">
                                Operate for Growth.
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-[#65675F] max-w-2xl leading-relaxed font-normal">
                            Software, creator distribution, and growth systems engineered to connect demand generation directly to downstream sales execution.
                        </p>

                        {/* Standardized Primary/Secondary CTAs */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                            <Link
                                href="/contact"
                                className="tactile-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#181A16] text-[#F3F0E8] font-heading font-semibold text-sm tracking-wide shadow-sm hover:bg-[#252720] active:scale-[0.98] transition-all min-h-[46px]"
                            >
                                <span>Schedule Briefing</span>
                                <ArrowRight size={16} className="text-[#D4B270]" />
                            </Link>

                            <a
                                href="https://sahyak.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tactile-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#181A16] border border-[#181A16]/15 hover:bg-[#E6E2D7] font-heading font-semibold text-sm tracking-wide active:scale-[0.98] transition-all min-h-[46px]"
                            >
                                <span>Explore Sahyak CRM</span>
                                <ExternalLink size={14} className="text-[#9B7545]" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: 4 Clean Operating Signals */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="p-4 sm:p-5 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-1">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                01 // SOFTWARE
                            </span>
                            <span className="text-base sm:text-lg font-bold font-heading text-[#181A16] block">
                                Sahyak CRM
                            </span>
                            <p className="text-xs text-[#65675F] leading-snug">
                                Lead qualification, rep routing &amp; pipeline control
                            </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-1">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                02 // DISTRIBUTION
                            </span>
                            <span className="text-base sm:text-lg font-bold font-heading text-[#181A16] block">
                                Creator Networks
                            </span>
                            <p className="text-xs text-[#65675F] leading-snug">
                                Managed regional &amp; industry distribution channels
                            </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-1">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                03 // DEMAND
                            </span>
                            <span className="text-base sm:text-lg font-bold font-heading text-[#181A16] block">
                                Growth Systems
                            </span>
                            <p className="text-xs text-[#65675F] leading-snug">
                                Search, paid media, conversion web UX &amp; automation
                            </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-1">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                04 // VISION
                            </span>
                            <span className="text-base sm:text-lg font-bold font-heading text-[#181A16] block">
                                Mayalok Vision
                            </span>
                            <p className="text-xs text-[#65675F] leading-snug">
                                Operating business within the Mayalok Venture vision
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* ══════════════════════════════════════════════════════════════
                2. PILLAR 01: PROPRIETARY OPERATING SOFTWARE (SAHYAK CRM)
            ══════════════════════════════════════════════════════════════ */}
            <section
                id="operating-software"
                className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 bg-[#181A16] text-[#F3F0E8] relative z-10 border-y border-[#181A16]"
            >
                {/* Subtle Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#9B7545_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-15 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 space-y-14 sm:space-y-16">
                    {/* Pillar 01 Header */}
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-4xl font-extrabold font-heading text-[#D4B270]">01</span>
                            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#AAA99F] border-l border-white/15 pl-3">
                                PROPRIETARY OPERATING SOFTWARE
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight mb-4">
                            Sahyak CRM: The Operating Layer Between{' '}
                            <span className="text-[#D4B270]">Demand &amp; Revenue.</span>
                        </h2>

                        <p className="text-sm sm:text-base text-[#AAA99F] leading-relaxed">
                            Demand generation only creates value when leads convert through disciplined sales execution. Sahyak is DeepLink&apos;s proprietary sales operating system—engineered to capture, qualify, route, follow up, and manage inquiries with complete operational visibility.
                        </p>
                    </div>

                    {/* Sahyak Grid: Interactive Workflow & 3D Tilt Viewport */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left: 5-Stage Interactive Operational Pipeline */}
                        <div className="lg:col-span-6 space-y-4">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4B270] block">
                                SAHYAK SALES OPERATING WORKFLOW
                            </span>

                            <div className="space-y-2.5">
                                {SAHYAK_STAGES.map((st, idx) => {
                                    const isCurrent = activeSahyakStage === idx

                                    return (
                                        <button
                                            key={st.id}
                                            onClick={() => setActiveSahyakStage(idx)}
                                            className={`w-full text-left p-4 rounded-2xl border transition-all ${
                                                isCurrent
                                                    ? 'bg-white/[0.08] border-[#9B7545] shadow-lg -translate-x-1'
                                                    : 'bg-white/[0.02] border-white/08 hover:bg-white/[0.05] hover:border-white/15'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-mono font-bold text-[#D4B270]">
                                                    {st.tag}
                                                </span>
                                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                                                    {st.status}
                                                </span>
                                            </div>
                                            <h4 className="font-heading font-bold text-base text-white mt-1">
                                                {st.title}
                                            </h4>
                                            <p className="text-xs text-[#AAA99F] mt-1 leading-relaxed">
                                                {st.description}
                                            </p>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Engagement Deployment Note */}
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#9B7545]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <span className="text-[#D4B270] font-mono font-semibold">
                                    Eligible DeepLink growth engagements include pre-configured Sahyak CRM deployment.
                                </span>
                                <a
                                    href="https://sahyak.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-[#D4B270] underline flex-shrink-0 font-medium"
                                >
                                    sahyak.com ↗
                                </a>
                            </div>
                        </div>

                        {/* Right: 3D Tilt Viewport */}
                        <div className="lg:col-span-6 space-y-4">
                            <SahyakInsideOutSpotlight />

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <a
                                    href="https://sahyak.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tactile-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#9B7545] hover:bg-[#B88E56] text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
                                >
                                    <span>Explore Sahyak CRM</span>
                                    <ExternalLink size={13} />
                                </a>

                                <Link
                                    href="/contact"
                                    className="tactile-btn inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all border border-white/10"
                                >
                                    <span>Schedule Briefing</span>
                                    <ArrowRight size={13} className="text-[#D4B270]" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Capability: Custom Commercial Systems */}
                    <div
                        id="custom-systems"
                        className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                            <div>
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4B270] block">
                                    SECONDARY SOFTWARE CAPABILITY
                                </span>
                                <h3 className="text-2xl font-bold font-heading text-white mt-1">
                                    Custom Commercial Systems &amp; Operational Portals
                                </h3>
                            </div>
                            <Link
                                href="/services/custom-saas-development/"
                                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4B270] hover:underline"
                            >
                                <span>Examine Custom Software Blueprint</span>
                                <ArrowRight size={13} />
                            </Link>
                        </div>

                        <p className="text-sm text-[#AAA99F] leading-relaxed max-w-4xl">
                            When standard CRM software is insufficient for complex operations, DeepLink engineers custom internal sales portals, multi-tenant B2B platforms, distributor networks, business dashboards, and custom integrations tailored to your specific commercial workflows.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono text-white">
                            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/08">
                                <span className="text-[#D4B270] block mb-1">01 // INTERNAL PORTALS</span>
                                <span>Sales Rep &amp; Account Portals</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/08">
                                <span className="text-[#D4B270] block mb-1">02 // DISTRIBUTION HUBS</span>
                                <span>Distributor &amp; Vendor Networks</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/08">
                                <span className="text-[#D4B270] block mb-1">03 // CUSTOM SAAS</span>
                                <span>Proprietary Cloud Platforms</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/08">
                                <span className="text-[#D4B270] block mb-1">04 // INTEGRATIONS</span>
                                <span>Multi-Channel API Infrastructure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                3. PILLAR 02: CREATOR DISTRIBUTION NETWORKS
            ══════════════════════════════════════════════════════════════ */}
            <section
                id="creator-distribution"
                className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
            >
                <div className="space-y-12 sm:space-y-16">
                    {/* Pillar 02 Header */}
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-4xl font-extrabold font-heading text-[#9B7545]">02</span>
                            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#65675F] border-l border-[#181A16]/10 pl-3">
                                CREATOR-LED DISTRIBUTION
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#181A16] tracking-tight leading-tight mb-4">
                            Managed Creator Networks as a{' '}
                            <span className="text-brass-gradient">Structured Acquisition Channel.</span>
                        </h2>

                        <p className="text-base sm:text-lg text-[#65675F] leading-relaxed">
                            DeepLink organizes creator distribution around defined audiences, specialized industries, and commercial objectives—transforming creator reach into structured, accountable acquisition channels.
                        </p>
                    </div>

                    {/* Flow Diagram: Brand -> Creator Network -> Distribution -> Audience -> Sahyak */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-[#181A16] text-[#F3F0E8] border border-[#181A16] space-y-6 shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
                            <span className="text-[#D4B270] font-bold">CREATOR DISTRIBUTION CONDUIT</span>
                            <span className="text-[#8FA994] bg-[#3F5544]/20 px-2.5 py-1 rounded">STRUCTURED CHANNEL</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                                <span className="text-[10px] font-mono text-[#D4B270] block">STEP 01</span>
                                <p className="text-sm font-bold text-white font-heading">Brand / Offer</p>
                                <p className="text-[11px] text-[#AAA99F] font-mono">Value Proposition</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                                <span className="text-[10px] font-mono text-[#8FA994] block">STEP 02</span>
                                <p className="text-sm font-bold text-white font-heading">Creator Network</p>
                                <p className="text-[11px] text-[#AAA99F] font-mono">Targeted Hubs</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                                <span className="text-[10px] font-mono text-[#D4B270] block">STEP 03</span>
                                <p className="text-sm font-bold text-white font-heading">Content Reach</p>
                                <p className="text-[11px] text-[#AAA99F] font-mono">Audience Ingestion</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                                <span className="text-[10px] font-mono text-[#8FA994] block">STEP 04</span>
                                <p className="text-sm font-bold text-white font-heading">Lead Capture</p>
                                <p className="text-[11px] text-[#AAA99F] font-mono">Attributed Inquiries</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                                <span className="text-[10px] font-mono text-[#D4B270] block">STEP 05</span>
                                <p className="text-sm font-bold text-white font-heading">Sahyak CRM</p>
                                <p className="text-[11px] text-[#AAA99F] font-mono">Sales Routing &amp; Close</p>
                            </div>
                        </div>
                    </div>

                    {/* 4 Creator Channel Bento Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {CREATOR_CHANNELS.map((ch) => (
                            <article
                                key={ch.id}
                                className="gsap-card group p-6 sm:p-8 rounded-3xl bg-white border border-[#181A16]/12 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-extrabold font-mono text-[#9B7545]">
                                            {ch.num}
                                        </span>
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#E6E2D7] text-[#181A16]">
                                            {ch.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#181A16]">
                                        {ch.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed">
                                        {ch.summary}
                                    </p>

                                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#181A16]/08 text-xs font-mono text-[#181A16] space-y-1">
                                        <span className="text-[#9B7545] font-bold block">Target Audience:</span>
                                        <span>{ch.audience}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#181A16]/08 flex items-center justify-between">
                                    <span className="text-[11px] font-mono text-[#3F5544]">
                                        {ch.deliverable}
                                    </span>
                                    <Link
                                        href={ch.slug}
                                        className="inline-flex items-center gap-1 text-xs font-heading font-bold text-[#181A16] hover:text-[#9B7545] transition-colors"
                                    >
                                        <span>Examine Blueprint</span>
                                        <ChevronRight size={14} className="text-[#9B7545]" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                4. PILLAR 03: DEMAND & PERFORMANCE GROWTH SYSTEMS
            ══════════════════════════════════════════════════════════════ */}
            <section
                id="growth-systems"
                className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10"
            >
                <div className="space-y-12 sm:space-y-16">
                    {/* Pillar 03 Header */}
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-4xl font-extrabold font-heading text-[#9B7545]">03</span>
                            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#65675F] border-l border-[#181A16]/10 pl-3">
                                DEMAND &amp; GROWTH SYSTEMS
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#181A16] tracking-tight leading-tight mb-4">
                            Demand &amp; Performance Systems{' '}
                            <span className="text-brass-gradient">Connected to Sales Execution.</span>
                        </h2>

                        <p className="text-base sm:text-lg text-[#65675F] leading-relaxed">
                            Search infrastructure, precision paid media, conversion web architecture, and automated routing engineered to deliver high-intent commercial inquiries directly into Sahyak CRM.
                        </p>
                    </div>

                    {/* 5 Core Growth Capabilities Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {GROWTH_CAPABILITIES.map((cap) => (
                            <article
                                key={cap.num}
                                className="gsap-card group p-6 sm:p-8 rounded-3xl bg-white border border-[#181A16]/12 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-extrabold font-mono text-[#9B7545]">
                                                {cap.num}
                                            </span>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#E6E2D7] text-[#181A16]">
                                                {cap.category}
                                            </span>
                                        </div>
                                        <span className="text-xs font-mono font-bold text-[#181A16] hidden sm:block">
                                            {cap.metric}
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#181A16] group-hover:text-[#9B7545] transition-colors">
                                        <Link href={cap.slug}>
                                            {cap.title}
                                        </Link>
                                    </h3>

                                    <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed">
                                        {cap.summary}
                                    </p>

                                    {/* Capabilities Checklist */}
                                    <div className="pt-3 border-t border-[#181A16]/08 space-y-2">
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9B7545] block">
                                            SYSTEM CAPABILITIES
                                        </span>
                                        <ul className="space-y-1.5 text-xs text-[#181A16]">
                                            {cap.capabilities.map((c, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <CheckCircle2 size={13} className="text-[#3F5544] flex-shrink-0 mt-0.5" />
                                                    <span className="leading-snug text-[#454740]">{c}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#181A16]/08 flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1.5">
                                        {cap.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#181A16]/08 text-[10px] font-mono text-[#65675F]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={cap.slug}
                                        className="inline-flex items-center gap-1 text-xs font-heading font-bold text-[#181A16] hover:text-[#9B7545] transition-colors"
                                    >
                                        <span>Examine Blueprint</span>
                                        <ChevronRight size={14} className="text-[#9B7545]" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Sub-Section: Industry Applications & Use Cases */}
                    <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#181A16]/10 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#181A16]/10 pb-4">
                            <div>
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9B7545] block">
                                    SECTOR APPLICATIONS
                                </span>
                                <h3 className="text-2xl font-bold font-heading text-[#181A16] mt-1">
                                    Industry-Specific Acquisition &amp; Conversion Use Cases
                                </h3>
                            </div>
                            <span className="text-xs font-mono text-[#65675F]">
                                The same underlying commercial systems adapted to specialized acquisition and conversion environments.
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {INDUSTRY_APPLICATIONS.map((app) => {
                                const IconComp = app.icon

                                return (
                                    <div
                                        key={app.title}
                                        className="p-6 rounded-2xl bg-white border border-[#181A16]/08 space-y-4 flex flex-col justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#F3F0E8] border border-[#181A16]/10 flex items-center justify-center text-[#9B7545]">
                                                <IconComp size={18} />
                                            </div>
                                            <h4 className="font-heading font-bold text-lg text-[#181A16]">
                                                {app.title}
                                            </h4>
                                            <p className="text-xs text-[#65675F] leading-relaxed">
                                                {app.summary}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-[#181A16]/08 flex items-center justify-between">
                                            <span className="text-[10px] font-mono text-[#3F5544]">
                                                {app.highlight}
                                            </span>
                                            <Link
                                                href={app.slug}
                                                className="text-xs font-mono text-[#9B7545] hover:underline"
                                            >
                                                Blueprint →
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                5. THE CONNECTED COMMERCIAL SYSTEM (SYNTHESIS)
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10">
                <div className="rounded-3xl bg-[#181A16] text-[#F3F0E8] border border-[#181A16] p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-[#AAA99F]">
                        <span className="text-[#D4B270] font-bold">
                            CONNECTED COMMERCIAL FLOW // UNIFIED EXECUTION
                        </span>
                        <span className="text-[#8FA994] bg-[#3F5544]/20 px-2.5 py-1 rounded">
                            UNIFIED SYSTEM
                        </span>
                    </div>

                    <div className="max-w-2xl space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                            Why these capabilities operate in one system.
                        </h3>
                        <p className="text-xs sm:text-sm text-[#AAA99F] leading-relaxed">
                            When demand generation, creator distribution, and sales operating software are disconnected, lead leakage occurs at every handoff. DeepLink synchronizes acquisition with sales execution.
                        </p>
                    </div>

                    {/* Prominent Visual Sequential Pipeline Bar */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 overflow-x-auto">
                        <div className="flex items-center justify-between min-w-[700px] text-[10px] font-mono text-white/90">
                            <span className="px-2.5 py-1 rounded bg-[#D4B270]/20 text-[#D4B270] font-bold">DEMAND</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2.5 py-1 rounded bg-white/05 text-white/80">DISTRIBUTION</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2.5 py-1 rounded bg-white/05 text-white/80">CONVERSION</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2.5 py-1 rounded bg-[#8FA994]/20 text-[#8FA994] font-bold">LEAD INGESTION</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2.5 py-1 rounded bg-[#D4B270]/20 text-[#D4B270] font-bold">SAHYAK CRM</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2.5 py-1 rounded bg-white/05 text-white/80">SALES EXECUTION</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2.5 py-1 rounded bg-[#8FA994]/20 text-[#8FA994] font-bold">REVENUE</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2.5 py-1 rounded bg-[#D4B270]/20 text-[#D4B270] font-bold">OPTIMIZATION</span>
                        </div>
                    </div>

                    {/* Visual 4-Stage Synthesis Bento */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
                        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                            <span className="text-[10px] font-mono text-[#D4B270] block">01 DEMAND &amp; DISTRIBUTION</span>
                            <p className="text-sm font-bold text-white font-heading">Qualified Inbound Intent</p>
                            <p className="text-xs text-[#AAA99F] leading-relaxed">
                                Search SEO, performance media, and creator reach attract commercial buyers.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                            <span className="text-[10px] font-mono text-[#8FA994] block">02 CONVERSION &amp; INGESTION</span>
                            <p className="text-sm font-bold text-white font-heading">Friction-Free Capture</p>
                            <p className="text-xs text-[#AAA99F] leading-relaxed">
                                High-trust web architecture captures inquiries with channel attribution.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                            <span className="text-[10px] font-mono text-[#D4B270] block">03 SAHYAK SALES EXECUTION</span>
                            <p className="text-sm font-bold text-white font-heading">Stage Gate Operations</p>
                            <p className="text-xs text-[#AAA99F] leading-relaxed">
                                Rep routing, qualification criteria, and follow-up discipline convert leads.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                            <span className="text-[10px] font-mono text-[#8FA994] block">04 CLOSED REVENUE &amp; DATA</span>
                            <p className="text-sm font-bold text-white font-heading">Optimization Feedback</p>
                            <p className="text-xs text-[#AAA99F] leading-relaxed">
                                Closed deal data feeds back to optimize acquisition targeting and CAC.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                6. FINAL STRATEGIC CTA
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10">
                <div className="p-8 sm:p-12 md:p-16 rounded-3xl border border-[#181A16] bg-[#181A16] text-[#F3F0E8] text-center space-y-6 shadow-2xl">
                    <span className="marginal-label text-[#D4B270] tracking-widest font-bold">
                        GET STARTED // CONNECTED GROWTH INFRASTRUCTURE
                    </span>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight max-w-3xl mx-auto leading-tight">
                        Ready to build permanent systems for your business?
                    </h2>

                    <p className="text-sm sm:text-base text-[#AAA99F] leading-relaxed max-w-2xl mx-auto font-normal">
                        Schedule a briefing to evaluate Sahyak CRM deployment, activate creator distribution channels, or build custom demand systems.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="/contact"
                            className="tactile-btn inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#9B7545] via-[#B88E56] to-[#9B7545] text-white font-heading font-bold text-sm tracking-wide shadow-md active:scale-[0.98] transition-all min-h-[48px] w-full sm:w-auto"
                        >
                            <span>Schedule Briefing</span>
                            <ArrowRight size={16} />
                        </Link>
                        <a
                            href="https://sahyak.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tactile-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-heading font-semibold text-sm tracking-wide active:scale-[0.98] transition-all min-h-[48px] w-full sm:w-auto"
                        >
                            <span>Explore Sahyak CRM</span>
                            <ArrowUpRight size={16} className="text-[#D4B270]" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
