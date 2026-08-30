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
    Bot
} from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

/* ═══════════════════════════════════════════════════════════════════════
   SERVICE DOSSIER INTERFACE & COMPREHENSIVE 10-PILLAR DATASET
═══════════════════════════════════════════════════════════════════════ */
interface ServiceDossier {
    index: string
    slug: string
    category: string
    title: string
    summary: string
    metric: string
    metricLabel: string
    capabilities: string[]
    useCase: string
    techStack: Array<{ name: string; icon: string }>
    accent: string
}

const SERVICE_DOSSIERS: ServiceDossier[] = [
    {
        index: '01',
        slug: '/services/custom-saas-development',
        category: 'B2B ENTERPRISE SAAS',
        title: 'Custom SaaS & Platform Engineering',
        summary: 'Architecting proprietary multi-tenant cloud software, high-concurrency database backends, internal operational portals, and mission-critical API platforms.',
        metric: '100%',
        metricLabel: 'Proprietary IP Ownership',
        capabilities: [
            'Multi-tenant database schema with cryptographic tenant isolation',
            'Role-based access control (RBAC), SSO, and DPDP-ready compliance',
            'Distributed microservices, webhooks & high-throughput REST/GraphQL APIs',
            'Fullstack Next.js, Node.js, Python & PostgreSQL architecture',
        ],
        useCase: 'Eliminating recurring vendor software lock-in by engineering proprietary enterprise SaaS assets that your holding owns permanently.',
        techStack: [
            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
            { name: 'Python', icon: '/images/strategy/python-logo.png' },
            { name: 'PostgreSQL', icon: '/images/strategy/postgresql.png' },
            { name: 'Node.js', icon: '/images/strategy/nodejs.png' },
        ],
        accent: '#9B7545',
    },
    {
        index: '02',
        slug: '/services/ai-marketing-automation',
        category: 'AUTONOMOUS AI SYSTEMS',
        title: 'AI Marketing & Pipeline Automation',
        summary: 'Deploying autonomous LLM agents, intelligent lead qualification workflows, automated outbound telemetry, and real-time CRM routing logic.',
        metric: '< 60s',
        metricLabel: 'Lead Routing Latency',
        capabilities: [
            'Self-orchestrating AI agents for multi-channel intake & qualification',
            'Stage-gated CRM pipeline automation integrated with Sahyak CRM',
            'Predictive lead scoring based on ICP behavioral signals',
            'Automated multi-step follow-up sequences across Email & WhatsApp',
        ],
        useCase: 'Eliminating pipeline leakage and accelerating lead response time from hours to under 60 seconds across distributed enterprise teams.',
        techStack: [
            { name: 'Python', icon: '/images/strategy/python-logo.png' },
            { name: 'Node.js', icon: '/images/strategy/nodejs.png' },
            { name: 'PostgreSQL', icon: '/images/strategy/postgresql.png' },
            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
        ],
        accent: '#3F5544',
    },
    {
        index: '03',
        slug: '/services/industrial-seo',
        category: 'SEARCH INFRASTRUCTURE',
        title: 'Industrial & Enterprise SEO Infrastructure',
        summary: 'Engineering semantic search authority, entity-based knowledge graph architectures, and programmatic content systems for high-ticket commercial keywords.',
        metric: 'Top 1%',
        metricLabel: 'High-Intent SERP Placement',
        capabilities: [
            'Programmatic schema graphs, JSON-LD entity mapping & Knowledge Graph nodes',
            'High-intent B2B commercial keyword domination and competitive displacement',
            'Technical Core Web Vitals optimization (100/100 LCP/INP performance)',
            'Generative Engine Optimization (GEO) for ChatGPT, Perplexity & Claude retrieval',
        ],
        useCase: 'Capturing continuous organic search traffic from C-suite decision-makers seeking enterprise machinery, SaaS, and specialized corporate services.',
        techStack: [
            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
            { name: 'PostgreSQL', icon: '/images/strategy/postgresql.png' },
            { name: 'HTML5', icon: '/images/strategy/HTML.png' },
            { name: 'Node.js', icon: '/images/strategy/nodejs.png' },
        ],
        accent: '#9B7545',
    },
    {
        index: '04',
        slug: '/services/social-commerce',
        category: 'CREATOR SYNDICATION',
        title: 'Creator-Led Commerce & Network Distribution',
        summary: 'Building verified micro-creator syndication networks and social commerce pipelines that bypass traditional ad exchanges to acquire loyal customers.',
        metric: '0%',
        metricLabel: 'Ad Exchange Dependency',
        capabilities: [
            'Curated network of vetted B2B & vertical niche micro-influencers',
            'Direct social checkout funnels and creator attribution tracking',
            'Syndicated short-form content pipelines with measurable commercial ROI',
            'Creator relationship management and automated payout telemetry',
        ],
        useCase: 'Establishing direct-to-consumer and B2B community distribution without suffering from escalating Meta/Google PPC ad bidding auctions.',
        techStack: [
            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
            { name: 'React Native', icon: '/images/strategy/reactnative.png' },
            { name: 'Node.js', icon: '/images/strategy/nodejs.png' },
        ],
        accent: '#3F5544',
    },
    {
        index: '05',
        slug: '/services/conversion-web-design',
        category: 'CONVERSION ARCHITECTURE',
        title: 'High-Velocity Conversion Web Architecture',
        summary: 'Engineering sub-second web platforms, dynamic landing frameworks, and cognitive psychology funnels designed for institutional credibility and maximum lead capture.',
        metric: '< 500ms',
        metricLabel: 'Global Page Render',
        capabilities: [
            'Sub-second TTFB and zero-layout-shift editorial web experiences',
            'Frictionless lead capture forms with instant WhatsApp & CRM handoff',
            'A/B testing architecture and real-time behavioral heatmap telemetry',
            'Responsive multi-breakpoint design engineered for executive review',
        ],
        useCase: 'Modernizing outdated corporate websites into institutional sales machines that convert high-ticket enterprise visitors into qualified briefings.',
        techStack: [
            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
            { name: 'Node.js', icon: '/images/strategy/nodejs.png' },
            { name: 'HTML5', icon: '/images/strategy/HTML.png' },
            { name: 'CSS3', icon: '/images/strategy/css.png' },
        ],
        accent: '#9B7545',
    },
    {
        index: '06',
        slug: '/services/b2b-industrial-marketing',
        category: 'INDUSTRIAL GROWTH',
        title: 'B2B Industrial & Manufacturing Marketing',
        summary: 'Tailored lead generation and demand capture systems for manufacturing plants, heavy machinery suppliers, chemical exporters, and industrial OEMs.',
        metric: '4.2x',
        metricLabel: 'Qualified RFQ Velocity',
        capabilities: [
            'High-ticket Request For Quotation (RFQ) funnels and spec-sheet download gates',
            'Account-Based Marketing (ABM) targeting industrial procurement directors',
            'Technical product catalog indexing with deep industrial search filters',
            'Supply-chain & distributor pipeline telemetry integrated with CRM',
        ],
        useCase: 'Connecting industrial manufacturing plants across NCR, Gujarat, and Maharashtra directly with domestic and international procurement heads.',
        techStack: [
            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
            { name: 'Python', icon: '/images/strategy/python-logo.png' },
            { name: 'PostgreSQL', icon: '/images/strategy/postgresql.png' },
        ],
        accent: '#3F5544',
    },
    {
        index: '07',
        slug: '/services/performance-marketing',
        category: 'PERFORMANCE ACQUISITION',
        title: 'Precision Performance Marketing & CAC Control',
        summary: 'Data-driven paid media execution across Google Ads, LinkedIn Campaign Manager, and programmatic networks focused strictly on customer acquisition cost efficiency.',
        metric: '3.8x',
        metricLabel: 'Average ROAS Multiplier',
        capabilities: [
            'High-intent Google Search Ads & LinkedIn InMail account-based targeting',
            'Advanced conversion API (CAPI) and server-side tracking infrastructure',
            'Continuous creative multivariate testing & CAC compression frameworks',
            'Unified attribution dashboard mapping ad spend directly to closed revenue',
        ],
        useCase: 'Scaling paid acquisition profitably while maintaining strict visibility over cost-per-qualified-lead and pipeline velocity.',
        techStack: [
            { name: 'Python', icon: '/images/strategy/python-logo.png' },
            { name: 'PostgreSQL', icon: '/images/strategy/postgresql.png' },
            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
        ],
        accent: '#9B7545',
    },
    {
        index: '08',
        slug: '/services/brand-psychology',
        category: 'AUTHORITY SYSTEMS',
        title: 'Brand Psychology & Institutional Authority',
        summary: 'Positioning corporate brands as undisputed category leaders through cognitive authority frameworks, executive PR narrative architecture, and institutional design.',
        metric: 'Tier-1',
        metricLabel: 'Market Standing & Trust',
        capabilities: [
            'Executive thought leadership, whitepaper authoring & industry briefings',
            'Visual identity systems tailored for institutional investor confidence',
            'Cognitive framing and premium pricing positioning blueprints',
            'Crisis mitigation, brand sentiment monitoring & corporate reputation guardrails',
        ],
        useCase: 'Enabling growing enterprises to break out of commodity price wars and command premium retainers and contracts in competitive markets.',
        techStack: [
            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
            { name: 'HTML5', icon: '/images/strategy/HTML.png' },
            { name: 'CSS3', icon: '/images/strategy/css.png' },
        ],
        accent: '#3F5544',
    },
    {
        index: '09',
        slug: '/services/real-estate-marketing',
        category: 'PROPTECH ACQUISITION',
        title: 'High-Ticket Real Estate & PropTech Marketing',
        summary: 'Commercial and luxury residential buyer acquisition engines for real estate developers, REITs, and PropTech platforms across metropolitan corridors.',
        metric: '₹50Cr+',
        metricLabel: 'Pipeline Value Generated',
        capabilities: [
            'Verified NRI and high-net-worth investor acquisition funnels',
            'Interactive 3D virtual walkthroughs and project microsite architecture',
            'Automated site-visit scheduling with instant WhatsApp agent dispatch',
            'Lead qualification filtering out unverified inquiries before sales calls',
        ],
        useCase: 'Accelerating luxury inventory absorption and commercial property leasing through hyper-targeted high-net-worth buyer acquisition.',
        techStack: [
            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
            { name: 'React Native', icon: '/images/strategy/reactnative.png' },
            { name: 'PostgreSQL', icon: '/images/strategy/postgresql.png' },
        ],
        accent: '#9B7545',
    },
    {
        index: '10',
        slug: '/services/education-marketing',
        category: 'EDTECH ENGINES',
        title: 'Higher Education & EdTech Student Enrollment',
        summary: 'End-to-end student recruitment pipelines, application portal architectures, and enrollment optimization systems for universities, colleges, and EdTech firms.',
        metric: '65%',
        metricLabel: 'Application Completion Rate',
        capabilities: [
            'Multi-channel student acquisition across NEET, JEE, MBA & global degree programs',
            'Dynamic application portals with document verification and fee payment integration',
            'Automated counselor assignment and multi-touchpoint nurturing journeys',
            'Counselor call tracking and conversion attribution telemetry',
        ],
        useCase: 'Maximizing admissions yield and reducing cost-per-enrolled-student for educational institutions and online learning platforms.',
        techStack: [
            { name: 'Next.js', icon: '/images/strategy/nextjs.png' },
            { name: 'Python', icon: '/images/strategy/python-logo.png' },
            { name: 'PostgreSQL', icon: '/images/strategy/postgresql.png' },
        ],
        accent: '#3F5544',
    },
]

/* ═══════════════════════════════════════════════════════════════════════
   BENTO DOSSIER CARD COMPONENT
═══════════════════════════════════════════════════════════════════════ */
function ServiceBentoCard({ dossier }: { dossier: ServiceDossier }) {
    return (
        <article className="gsap-card group relative rounded-2xl border border-[#181A16]/12 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top Bar: Chapter Numeral, Category Badge, Metric Badge */}
            <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-extrabold font-mono text-[#9B7545]">
                            {dossier.index}
                        </span>
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#E6E2D7] text-[#181A16] border border-[#181A16]/08">
                            {dossier.category}
                        </span>
                    </div>

                    <div className="text-right hidden sm:block">
                        <span className="text-sm font-extrabold font-mono text-[#181A16] block">
                            {dossier.metric}
                        </span>
                        <span className="text-[10px] font-mono text-[#65675F] block">
                            {dossier.metricLabel}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#181A16] tracking-tight group-hover:text-[#9B7545] transition-colors leading-snug">
                    <Link href={dossier.slug} className="focus:outline-none">
                        {dossier.title}
                    </Link>
                </h2>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed">
                    {dossier.summary}
                </p>

                {/* Core Capabilities Checklist */}
                <div className="pt-3 border-t border-[#181A16]/08 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9B7545] block">
                        CORE ARCHITECTURAL CAPABILITIES
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#181A16]">
                        {dossier.capabilities.map((cap, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 size={13} className="text-[#3F5544] flex-shrink-0 mt-0.5" />
                                <span className="leading-snug text-[#454740]">{cap}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Impact Statement */}
                <div className="pt-2">
                    <p className="text-[11px] font-mono text-[#65675F] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#181A16]/08">
                        <strong className="text-[#181A16]">Strategic Impact:</strong> {dossier.useCase}
                    </p>
                </div>
            </div>

            {/* Bottom Actions & Tech Badges */}
            <div className="pt-5 mt-4 border-t border-[#181A16]/08 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                        {dossier.techStack.map((tech) => (
                            <span
                                key={tech.name}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#181A16]/08 text-[10px] font-mono text-[#181A16]"
                            >
                                <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    className="w-3 h-3 object-contain"
                                />
                                <span>{tech.name}</span>
                            </span>
                        ))}
                    </div>

                    <span className="text-[11px] font-mono font-bold text-[#9B7545] sm:hidden">
                        {dossier.metric} {dossier.metricLabel}
                    </span>
                </div>

                {/* Explicit Navigation Links to Sub-page and Briefing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <Link
                        href={dossier.slug}
                        className="tactile-btn inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-[#181A16]/15 hover:bg-[#E6E2D7] text-[#181A16] font-heading font-semibold text-xs tracking-wide transition-all shadow-xs"
                    >
                        <span>Examine Blueprint</span>
                        <ChevronRight size={13} className="text-[#9B7545]" />
                    </Link>

                    <Link
                        href="/contact"
                        className="tactile-btn inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#181A16] hover:bg-[#252720] text-[#F3F0E8] font-heading font-semibold text-xs tracking-wide transition-all shadow-xs"
                    >
                        <span>Schedule Briefing</span>
                        <ArrowRight size={13} className="text-[#D4B270]" />
                    </Link>
                </div>
            </div>
        </article>
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
                                ENTERPRISE OFFERINGS CATALOG // 10 ACTIVE PILLARS
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-[#181A16] leading-[1.14]">
                            Software, Distribution &amp;{' '}
                            <span className="text-brass-gradient">
                                Enterprise Systems.
                            </span>
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg text-[#65675F] max-w-2xl leading-relaxed font-normal">
                            Deeplink Creators, backed by Mayalok Venture, engineers proprietary B2B software infrastructure, autonomous AI revenue pipelines, and creator-led syndication networks for organizations seeking durable commercial advantage.
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
                                <span>Sahyak CRM Platform ↗</span>
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
                                Cryptographic tenant isolation &amp; custom workflow logic
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
                                Vetted audience access &amp; direct attribution tracking
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
                2. TEN SPECIALIZED SERVICE DOSSIERS (Bento Grid Reintegration)
            ══════════════════════════════════════════════════════════════ */}
            <main className="relative pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
                <div className="mb-8 flex items-center justify-between pb-4 border-b border-[#181A16]/10">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9B7545] block">
                            ACTIVE SERVICE PILLARS
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#181A16]">
                            Explore Specialized Engineering &amp; Growth Architectures
                        </h2>
                    </div>
                    <span className="text-xs font-mono text-[#65675F] hidden sm:inline">
                        10 Dedicated Pillars
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {SERVICE_DOSSIERS.map((dossier) => (
                        <ServiceBentoCard key={dossier.slug} dossier={dossier} />
                    ))}
                </div>
            </main>

            {/* ══════════════════════════════════════════════════════════════
                3. SAHYAK CRM COMPLIMENTARY INCLUSION CHAPTER
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
                        Submit your project scope or schedule a technical briefing with our principals in Greater Noida.
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
