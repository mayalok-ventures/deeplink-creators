'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    ArrowRight,
    ChevronRight,
    ShieldCheck,
    Cpu,
    Network,
    Workflow,
    Lock,
    Building2,
    Sparkles,
    CheckCircle2,
    BarChart3,
    Boxes,
    Globe2,
    Radio,
    ExternalLink,
    HelpCircle
} from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const ease = [0.22, 1, 0.36, 1] as const

// FAQ JSON-LD Schema for Generative Search & AI Answers
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is Deeplink Creators?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators is an AI-first enterprise software holding and venture studio operating under Mayalok Venture. It engineers proprietary B2B SaaS infrastructure, including Sahyak CRM, and creator-led distribution systems for enterprises."
            }
        },
        {
            "@type": "Question",
            "name": "What is Mayalok Venture's relationship to Deeplink Creators?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators operates as a specialized software holding and venture studio unit under Mayalok Venture, backed by its institutional governance, strategic oversight, and long-term capital backing."
            }
        },
        {
            "@type": "Question",
            "name": "What is Sahyak CRM and how is it deployed?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sahyak CRM (sahyak.com) is Deeplink Creators' flagship B2B sales pipeline and workflow management software. Every qualifying service engagement includes complimentary 30-day access to Sahyak CRM for the client organization."
            }
        },
        {
            "@type": "Question",
            "name": "How does creator-led distribution work for B2B enterprises?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators structures curated creator and micro-influencer ecosystems into accountable distribution channels, connecting enterprise software offerings with relevant niche audiences and reducing reliance on volatile paid ads."
            }
        },
        {
            "@type": "Question",
            "name": "Where is Deeplink Creators headquartered?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators is headquartered in Greater Noida, Uttar Pradesh (Delhi NCR), India, with operations led by Founder Kunal Pratap Singh and Co-founder Dileep Yadav."
            }
        }
    ]
}

/* ═══════════════════════════════════════════════════════════════════════
   HERO "REALITY TEAR" SIGNATURE COMPONENT (Desktop Pointer Mask Seam)
═══════════════════════════════════════════════════════════════════════ */
function HeroRealityTear() {
    const shouldReduceMotion = useReducedMotion()
    const containerRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number | null>(null)
    const [tearState, setTearState] = useState({ active: false, xPct: 50, yPct: 50 })

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (shouldReduceMotion || typeof window === 'undefined') return
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
            const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))

            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(() => {
                setTearState({ active: true, xPct: x, yPct: y })
            })
        },
        [shouldReduceMotion]
    )

    const handleMouseLeave = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        setTearState({ active: false, xPct: 50, yPct: 50 })
    }, [])

    const seamGap = tearState.active ? 4.5 : 0
    const leftClip = `polygon(0 0, ${Math.max(0, tearState.xPct - seamGap)}% 0, ${Math.max(0, tearState.xPct - seamGap)}% 100%, 0 100%)`
    const rightClip = `polygon(${Math.min(100, tearState.xPct + seamGap)}% 0, 100% 0, 100% 100%, ${Math.min(100, tearState.xPct + seamGap)}% 100%)`

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="reality-tear-container relative rounded-2xl overflow-hidden border border-[#181A16]/15 shadow-xl bg-[#181A16] group"
        >
            {/* 1. UNDERLAYER (Sub-Reality Architectural Blueprint Revealed Underneath) */}
            <div className="reality-tear-underlayer relative h-[320px] sm:h-[400px] md:h-[460px] w-full p-6 flex flex-col justify-between select-none">
                <div className="absolute inset-0 bg-[radial-gradient(#9B7545_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />
                <div className="flex items-center justify-between text-[10px] font-mono text-[#D4B270] relative z-10">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#9B7545] animate-ping" />
                        SYSTEM KERNEL // TELEMETRY
                    </span>
                    <span>28.4744° N, 77.5040° E</span>
                </div>

                <div className="space-y-3 relative z-10 max-w-xs bg-[#181A16]/90 p-4 rounded-xl border border-[#9B7545]/30 backdrop-blur-md">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="text-xs font-mono font-bold text-white uppercase">
                            Sahyak Engine v2.4
                        </span>
                        <span className="text-[10px] font-mono text-[#3F5544] bg-[#3F5544]/20 px-1.5 py-0.5 rounded">
                            ACTIVE
                        </span>
                    </div>
                    <div className="space-y-1.5 text-[11px] font-mono text-[#AAA99F]">
                        <div className="flex justify-between">
                            <span>Isolation:</span>
                            <span className="text-white">Multi-Tenant Vault</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Distribution Nodes:</span>
                            <span className="text-[#D4B270]">120+ Vetted</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Throughput SLA:</span>
                            <span className="text-white">99.98%</span>
                        </div>
                    </div>
                </div>

                <div className="text-[10px] font-mono text-[#AAA99F]/70 relative z-10 flex items-center justify-between">
                    <span>ARCHITECTURAL PROSPECTUS</span>
                    <span className="text-[#D4B270]">SUB-LAYER REVEALED</span>
                </div>
            </div>

            {/* 2. UPPER LAYER A (Left Portion of Image) */}
            <div
                className="reality-tear-upper"
                style={{ clipPath: leftClip }}
            >
                <div className="relative h-[320px] sm:h-[400px] md:h-[460px] w-full">
                    <Image
                        src="/images/hero-enterprise-architecture.jpg"
                        alt="Deeplink Creators Enterprise Studio Workspace"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181A16]/40 via-transparent to-transparent" />
                </div>
            </div>

            {/* 3. UPPER LAYER B (Right Portion of Image) */}
            <div
                className="reality-tear-upper"
                style={{ clipPath: rightClip }}
            >
                <div className="relative h-[320px] sm:h-[400px] md:h-[460px] w-full">
                    <Image
                        src="/images/hero-enterprise-architecture.jpg"
                        alt="Deeplink Creators Enterprise Studio Workspace"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181A16]/40 via-transparent to-transparent" />
                </div>
            </div>

            {/* 4. SEAM SPLIT LINE (Refined Editorial Brass Light Line) */}
            {tearState.active && (
                <div
                    className="reality-tear-seam"
                    style={{
                        left: `${tearState.xPct}%`,
                        opacity: tearState.active ? 1 : 0,
                    }}
                />
            )}

            {/* Caption Footer */}
            <div className="p-4 bg-white/95 backdrop-blur-sm border-t border-[#181A16]/10 flex items-center justify-between text-xs font-mono text-[#65675F] relative z-10">
                <span>EDITORIAL PROSPECTUS</span>
                <span className="text-[#9B7545] font-semibold">FIG 01. STUDIO LAB</span>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════════════
   SAHYAK CRM INSIDE-OUT SPOTLIGHT WITH IMPOSSIBLE REFLECTION
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
            const rx = (0.5 - y) * 8 // max 4 deg tilt
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
                {/* 3D Deep Product Frame */}
                <div className="relative h-[260px] sm:h-[340px] md:h-[420px] w-full">
                    <Image
                        src="/images/sahyak-crm-mockup.jpg"
                        alt="Sahyak CRM Enterprise Platform Dashboard Interface"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181A16]/70 via-transparent to-transparent" />
                </div>

                {/* Impossible Reflection Overlay */}
                <div className="impossible-reflection" />

                <div className="p-4 bg-[#181A16]/95 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#AAA99F] relative z-10">
                    <span className="text-[#D4B270] font-semibold">sahyak.com</span>
                    <span>FLAGSHIP PRODUCT DEPLOYMENT</span>
                </div>
            </div>
        </div>
    )
}

export default function HomePage() {
    const shouldReduceMotion = useReducedMotion()
    const containerRef = useRef<HTMLDivElement>(null)
    const [hoveredEngine, setHoveredEngine] = useState<'software' | 'distribution' | null>(null)

    // GSAP ScrollTrigger Integration with Mobile-Safe Guardrails
    useEffect(() => {
        if (shouldReduceMotion || typeof window === 'undefined') return

        const isDesktop = window.innerWidth >= 768

        const ctx = gsap.context(() => {
            if (isDesktop) {
                // Desktop-only architectural line reveal
                gsap.fromTo(
                    '.arch-connecting-line',
                    { scaleY: 0, transformOrigin: 'top center' },
                    {
                        scaleY: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.engine-section',
                            start: 'top 75%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            }

            // Universal vertical reveal
            gsap.utils.toArray<HTMLElement>('.gsap-reveal-card').forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: isDesktop ? 24 : 12 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: isDesktop ? 0.7 : 0.45,
                        delay: isDesktop ? (i % 3) * 0.08 : 0,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })
        }, containerRef)

        return () => ctx.revert()
    }, [shouldReduceMotion])

    return (
        <div ref={containerRef} className="bg-[#F3F0E8] text-[#181A16] min-h-screen selection:bg-[#9B7545]/20 selection:text-[#181A16] relative overflow-x-hidden font-sans">
            {/* SEO JSON-LD FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Subtle Architectural Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#181A1608_1px,transparent_1px),linear-gradient(to_bottom,#181A1608_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════════
                SECTION 1 — LIGHT EDITORIAL HERO
            ══════════════════════════════════════════════════════════════ */}
            <section className="relative pt-12 sm:pt-16 md:pt-24 pb-14 sm:pb-20 md:pb-28 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Hero Text Column (lg:col-span-7) */}
                    <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                        {/* Top Metadata Badges */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E2D7] border border-[#181A16]/10 text-[11px] font-mono font-bold tracking-widest uppercase text-[#181A16]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#9B7545] animate-pulse" />
                                AI-FIRST ENTERPRISE SOFTWARE HOLDING
                            </span>
                            <a
                                href="https://mayalokventures.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#181A16]/10 text-[11px] font-mono tracking-widest uppercase text-[#65675F] hover:text-[#181A16] hover:border-[#9B7545]/40 transition-colors"
                            >
                                <span>MAYALOK VENTURE UNIT</span>
                                <ExternalLink size={11} className="text-[#9B7545]" />
                            </a>
                        </div>

                        {/* Display Headline */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.12]">
                            Software assets and distribution engines for{' '}
                            <span className="text-brass-gradient">
                                enduring enterprise leverage.
                            </span>
                        </h1>

                        {/* Narrative Subhead */}
                        <p className="text-base sm:text-lg md:text-xl text-[#65675F] leading-7 sm:leading-relaxed max-w-2xl font-normal">
                            Deeplink Creators builds proprietary B2B software systems—led by Sahyak CRM—and deploys creator-led distribution infrastructure to create durable commercial advantage.
                        </p>

                        {/* Action CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
                            <Link
                                href="/contact"
                                className="tactile-btn inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#181A16] text-[#F3F0E8] font-heading font-semibold text-sm tracking-wide shadow-sm hover:bg-[#252720] active:scale-[0.98] transition-all min-h-[48px]"
                            >
                                <span>Schedule Enterprise Briefing</span>
                                <ArrowRight size={16} className="text-[#D4B270]" />
                            </Link>
                            <Link
                                href="/services"
                                className="tactile-btn inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#181A16] border border-[#181A16]/15 hover:bg-[#E6E2D7] font-heading font-semibold text-sm tracking-wide active:scale-[0.98] transition-all min-h-[48px]"
                            >
                                <span>Explore Offerings</span>
                                <ChevronRight size={16} className="text-[#65675F]" />
                            </Link>
                        </div>

                        {/* Trust Coordinates */}
                        <div className="pt-4 border-t border-[#181A16]/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#65675F]">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck size={14} className="text-[#3F5544]" />
                                <span>Institutional Governance</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Building2 size={14} className="text-[#9B7545]" />
                                <span>Greater Noida • Delhi NCR</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Architectural Image (Reality Tear Signature Interaction) */}
                    <div className="lg:col-span-5 relative">
                        <HeroRealityTear />
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 2 — THE DUAL-ENGINE MODEL (Chain Reaction Integration)
            ══════════════════════════════════════════════════════════════ */}
            <section className="engine-section py-14 sm:py-20 md:py-28 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <span className="marginal-label text-[#9B7545] font-bold block mb-2">
                        THE CORE ARCHITECTURE
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-heading text-[#181A16] tracking-tight mb-4">
                        Two synchronized engines. One compound advantage.
                    </h2>
                    <p className="text-base sm:text-lg text-[#65675F] leading-relaxed">
                        Traditional companies build software without distribution, or run marketing without proprietary assets. Deeplink Creators executes both as an integrated system.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative">
                    {/* Connecting Line between the two engines with Chain Pulse */}
                    <div className="arch-connecting-line hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-[#9B7545]/20 via-[#9B7545]/50 to-[#9B7545]/20 -translate-x-1/2 pointer-events-none overflow-hidden">
                        {hoveredEngine && <div className="chain-pulse-line" />}
                    </div>

                    {/* Engine 1: Software Infrastructure */}
                    <div
                        onMouseEnter={() => setHoveredEngine('software')}
                        onMouseLeave={() => setHoveredEngine(null)}
                        className={`gsap-reveal-card rounded-2xl border bg-white p-7 sm:p-9 shadow-sm editorial-surface-lift relative space-y-5 transition-all duration-300 ${
                            hoveredEngine === 'distribution' ? 'border-[#9B7545]/50 shadow-md' : 'border-[#181A16]/12'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="chapter-numeral text-2xl sm:text-3xl font-extrabold text-[#9B7545]">
                                01
                            </span>
                            <span className="marginal-label text-[#65675F] px-2.5 py-1 rounded bg-[#E6E2D7] border border-[#181A16]/08">
                                SOFTWARE ASSET ENGINE
                            </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#181A16]">
                            Proprietary Software Systems
                        </h3>

                        <p className="text-sm sm:text-base text-[#65675F] leading-relaxed">
                            We architect, build, and deploy multi-tenant SaaS products and operational workflow software tailored to solve specific commercial bottlenecks.
                        </p>

                        <div className="space-y-2.5 pt-2 border-t border-[#181A16]/08 text-xs sm:text-sm text-[#181A16]">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={15} className="text-[#3F5544] flex-shrink-0" />
                                <span>Multi-tenant architecture &amp; secure data isolation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={15} className="text-[#3F5544] flex-shrink-0" />
                                <span>Custom CRM, sales pipeline &amp; lead workflow automation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={15} className="text-[#3F5544] flex-shrink-0" />
                                <span>Proprietary software asset ownership for the enterprise</span>
                            </div>
                        </div>
                    </div>

                    {/* Engine 2: Distribution Engine */}
                    <div
                        onMouseEnter={() => setHoveredEngine('distribution')}
                        onMouseLeave={() => setHoveredEngine(null)}
                        className={`gsap-reveal-card rounded-2xl border bg-white p-7 sm:p-9 shadow-sm editorial-surface-lift relative space-y-5 transition-all duration-300 ${
                            hoveredEngine === 'software' ? 'border-[#9B7545]/50 shadow-md' : 'border-[#181A16]/12'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="chapter-numeral text-2xl sm:text-3xl font-extrabold text-[#9B7545]">
                                02
                            </span>
                            <span className="marginal-label text-[#65675F] px-2.5 py-1 rounded bg-[#E6E2D7] border border-[#181A16]/08">
                                DISTRIBUTION ENGINE
                            </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#181A16]">
                            Creator-Led Market Access
                        </h3>

                        <p className="text-sm sm:text-base text-[#65675F] leading-relaxed">
                            We curate and orchestrate targeted creator networks and niche distribution channels, bypassing ad-network fatigue and connecting products with verified demand.
                        </p>

                        <div className="space-y-2.5 pt-2 border-t border-[#181A16]/08 text-xs sm:text-sm text-[#181A16]">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={15} className="text-[#3F5544] flex-shrink-0" />
                                <span>Curated creator &amp; micro-influencer syndication networks</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={15} className="text-[#3F5544] flex-shrink-0" />
                                <span>Authority content positioning &amp; niche community reach</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={15} className="text-[#3F5544] flex-shrink-0" />
                                <span>Predictable customer acquisition without ad volatility</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 3 — FLAGSHIP SOFTWARE SPOTLIGHT (SAHYAK CRM)
                Inside-Out Product Reveal + Living Border
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 md:py-28 px-5 sm:px-6 lg:px-8 bg-[#252720] text-[#F3F0E8] relative z-10 border-y border-[#181A16]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        {/* Left Software Narrative (lg:col-span-6) */}
                        <div className="lg:col-span-6 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B7545]/20 border border-[#9B7545]/35 text-[#D4B270] text-[11px] font-mono font-bold tracking-widest uppercase">
                                <Sparkles size={13} />
                                FLAGSHIP SOFTWARE PLATFORM
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                                Sahyak CRM:{' '}
                                <span className="text-[#D4B270]">
                                    Purpose-Built B2B Pipeline Infrastructure.
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base text-[#AAA99F] leading-relaxed">
                                Sahyak CRM is Deeplink Creators’ proprietary flagship sales management and customer workflow software. Designed for high-ticket B2B sales cycles, multi-agent tracking, and end-to-end operational visibility.
                            </p>

                            <div className="space-y-3 pt-2">
                                {[
                                    'Intelligent Lead Routing & Team Accountability',
                                    'Pipeline Stage Visibility & Custom Stage Gates',
                                    'Automated Follow-ups & Multi-Channel Touchpoints',
                                    'Real-Time Deal Telemetry & Conversion Analytics',
                                ].map((feature) => (
                                    <div key={feature} className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                                        <CheckCircle2 size={15} className="text-[#9B7545] flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Complimentary Deployment Banner */}
                            <div className="p-4 rounded-xl bg-white/[0.05] border border-[#9B7545]/30 flex items-start gap-3">
                                <ShieldCheck size={18} className="text-[#D4B270] flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-mono font-semibold text-[#D4B270] uppercase">
                                        Complimentary Enterprise Inclusion
                                    </p>
                                    <p className="text-xs text-[#AAA99F] mt-0.5 leading-relaxed">
                                        Qualifying client engagements include 30-day complimentary access to Sahyak CRM to centralize pipeline control and sales accountability.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a
                                    href="https://sahyak.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tactile-btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#9B7545] hover:bg-[#B88E56] text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                                >
                                    <span>Explore Sahyak CRM Live Platform</span>
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>

                        {/* Right Real Software Mockup (Inside-Out 3D Spotlight) */}
                        <div className="lg:col-span-6">
                            <SahyakInsideOutSpotlight />
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 4 — CREATOR DISTRIBUTION ECOSYSTEM
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 md:py-28 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left Distribution Image (lg:col-span-6) */}
                    <div className="lg:col-span-6 order-2 lg:order-1">
                        <div className="relative rounded-2xl overflow-hidden border border-[#181A16]/15 shadow-xl bg-[#E6E2D7] image-editorial-frame">
                            <div className="relative h-[260px] sm:h-[340px] md:h-[400px] w-full">
                                <Image
                                    src="/images/creator-network-distribution.jpg"
                                    alt="Deeplink Creators Distribution Network Architecture"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#181A16]/40 via-transparent to-transparent" />
                            </div>

                            <div className="p-4 bg-white/95 border-t border-[#181A16]/10 flex items-center justify-between text-xs font-mono text-[#65675F]">
                                <span>DISTRIBUTION MATRIX</span>
                                <span className="text-[#9B7545] font-semibold">FIG 02. NETWORK SYNDICATION</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Narrative (lg:col-span-6) */}
                    <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E2D7] border border-[#181A16]/10 text-[11px] font-mono font-bold tracking-widest uppercase text-[#181A16]">
                            <Network size={13} className="text-[#9B7545]" />
                            SYNDICATED AUDIENCE ACCESS
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#181A16] tracking-tight leading-tight">
                            Direct Creator Networks.{' '}
                            <span className="text-brass-gradient">
                                Zero Ad-Network Dependency.
                            </span>
                        </h2>

                        <p className="text-sm sm:text-base text-[#65675F] leading-relaxed font-normal">
                            Paid ad algorithms have become increasingly costly and unpredictable. We build private creator ecosystems that syndicate your enterprise message directly into targeted industry niches with compounding credibility.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="p-4 rounded-xl border border-[#181A16]/10 bg-white shadow-sm space-y-1">
                                <span className="text-xl sm:text-2xl font-bold font-heading text-[#181A16]">100%</span>
                                <p className="text-xs font-mono text-[#65675F]">Verified Distribution</p>
                            </div>
                            <div className="p-4 rounded-xl border border-[#181A16]/10 bg-white shadow-sm space-y-1">
                                <span className="text-xl sm:text-2xl font-bold font-heading text-[#181A16]">Zero</span>
                                <p className="text-xs font-mono text-[#65675F]">Paid Ad Dependency</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 5 — MAYALOK VENTURE INSTITUTIONAL FOUNDATION
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 md:py-28 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left Narrative (lg:col-span-6) */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E2D7] border border-[#181A16]/10 text-[11px] font-mono font-bold tracking-widest uppercase text-[#181A16]">
                            <Building2 size={13} className="text-[#9B7545]" />
                            INSTITUTIONAL FOUNDATION
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#181A16] tracking-tight leading-tight">
                            Backed by Mayalok Venture.
                        </h2>

                        <p className="text-sm sm:text-base text-[#65675F] leading-relaxed font-normal">
                            Deeplink Creators is an AI-first venture studio and software holding under Mayalok Venture (<a href="https://mayalokventures.com" target="_blank" rel="noopener noreferrer" className="text-[#9B7545] font-semibold underline">mayalokventures.com</a>). This relationship guarantees corporate governance, institutional integrity, and long-term capital backing for every enterprise system we build.
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#181A16]">
                                <CheckCircle2 size={15} className="text-[#3F5544] flex-shrink-0" />
                                <span>Long-term capital security &amp; corporate backing</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#181A16]">
                                <CheckCircle2 size={15} className="text-[#3F5544] flex-shrink-0" />
                                <span>Venture studio model prioritizing equity &amp; lasting assets</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Holding Image (lg:col-span-6) */}
                    <div className="lg:col-span-6">
                        <div className="relative rounded-2xl overflow-hidden border border-[#181A16]/15 shadow-xl bg-[#E6E2D7] image-editorial-frame">
                            <div className="relative h-[260px] sm:h-[340px] md:h-[400px] w-full">
                                <Image
                                    src="/images/mayalok-institutional-architecture.jpg"
                                    alt="Mayalok Venture Institutional Holding Architecture"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#181A16]/40 via-transparent to-transparent" />
                            </div>

                            <div className="p-4 bg-white/95 border-t border-[#181A16]/10 flex items-center justify-between text-xs font-mono text-[#65675F]">
                                <span>PARENT HOLDING STRUCTURE</span>
                                <span className="text-[#9B7545] font-semibold">FIG 03. MAYALOK VENTURE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 6 — DIRECT ANSWER & FAQ ACCORDION (GEO / AI Discovery)
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 md:py-28 px-5 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 border-t border-[#181A16]/10">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <span className="marginal-label text-[#9B7545] font-bold block mb-2">
                        DIRECT ANSWERS &amp; FAQS
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-[#181A16] tracking-tight mb-4">
                        Frequently Asked Questions.
                    </h2>
                    <p className="text-sm sm:text-base text-[#65675F] leading-relaxed">
                        Clear, definitive answers regarding our holding structure, Sahyak CRM deployment, creator distribution, and headquarters.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqSchema.mainEntity.map((item, index) => (
                        <details
                            key={index}
                            className="group p-5 sm:p-6 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm open:border-[#9B7545]/40 transition-all duration-300"
                        >
                            <summary className="font-heading font-bold text-sm sm:text-base md:text-lg text-[#181A16] cursor-pointer list-none flex items-center justify-between gap-4">
                                <span>{item.name}</span>
                                <span className="w-6 h-6 rounded-full bg-[#E6E2D7] text-[#181A16] flex items-center justify-center flex-shrink-0 text-xs group-open:rotate-180 transition-transform">
                                    ↓
                                </span>
                            </summary>
                            <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed pt-3.5 border-t border-[#181A16]/08 mt-3.5">
                                {item.acceptedAnswer.text}
                            </p>
                        </details>
                    ))}
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 7 — ENTERPRISE ENGAGEMENT CTA
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-20 md:py-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10">
                <div className="p-8 sm:p-12 md:p-16 rounded-3xl border border-[#181A16]/15 bg-[#181A16] text-[#F3F0E8] text-center space-y-6 shadow-2xl">
                    <span className="marginal-label text-[#D4B270] tracking-widest font-bold">
                        STRATEGIC INTAKE
                    </span>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight max-w-3xl mx-auto leading-tight">
                        Ready to build permanent software &amp; distribution assets?
                    </h2>

                    <p className="text-sm sm:text-base text-[#AAA99F] leading-relaxed max-w-2xl mx-auto font-normal">
                        Schedule an executive briefing to diagnose your sales pipeline, evaluate custom SaaS requirements, or activate dedicated creator distribution channels.
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
