'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
    ArrowRight,
    ChevronRight,
    Building2,
    CheckCircle2,
    ExternalLink,
    ArrowUpRight,
    Zap
} from 'lucide-react'

// Dynamically import full-bleed WebGL Liquid Growth Field (Zero particles, edge-to-edge coverage)
const LiquidGrowthField = dynamic(
    () => import('@/components/canvas/LiquidGrowthField'),
    { ssr: false }
)

import HeroSystemVisual from '@/components/home/HeroSystemVisual'
import ThreeSystemsSection from '@/components/home/ThreeSystemsSection'
import SahyakCrmShowcase from '@/components/home/SahyakCrmShowcase'
import CreatorNetworkSection from '@/components/home/CreatorNetworkSection'
import GrowthSystemsSection from '@/components/home/GrowthSystemsSection'
import SystemEcosystemLoop from '@/components/home/SystemEcosystemLoop'
import TestimonialSection from '@/components/TestimonialSection'

// FAQ JSON-LD Schema for Generative Search & AI Discovery
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is Deeplink Creators?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators builds proprietary sales software (Sahyak CRM), managed creator distribution networks, and digital growth systems connected into one commercial operating system."
            }
        },
        {
            "@type": "Question",
            "name": "What is Mayalok Venture's relationship to Deeplink Creators?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators is being built as one of the operating businesses within the broader Mayalok Venture vision."
            }
        },
        {
            "@type": "Question",
            "name": "What is Sahyak CRM and how is it deployed?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sahyak CRM (sahyak.com) is Deeplink Creators' proprietary sales operating system, providing multi-channel lead capture, stage-gate qualification, rep routing, and sales team accountability. Qualifying client engagements include access."
            }
        },
        {
            "@type": "Question",
            "name": "How does creator-led distribution work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators builds and manages curated networks of creators that help businesses reach targeted local, regional, and industry audiences as an organized acquisition channel."
            }
        },
        {
            "@type": "Question",
            "name": "Where is Deeplink Creators headquartered?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators is located in Greater Noida, Uttar Pradesh (Delhi NCR), India."
            }
        }
    ]
}

export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [activePillar, setActivePillar] = useState<'software' | 'distribution' | 'growth'>('software')

    // Continuous scroll progress calculation for GPU shader interpolation
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const heroHeight = window.innerHeight || 800
            const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1)
            setScrollProgress(progress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
                SECTION 1 — HERO: TRUE 100vw × 100vh FULL-BLEED SPATIAL ENVIRONMENT
            ══════════════════════════════════════════════════════════════ */}
            <section className="relative w-full min-h-screen sm:min-h-[100svh] flex items-center justify-center z-10 overflow-hidden bg-[#10120F]">
                {/* Full-Bleed Atmospheric WebGL Liquid Growth Field */}
                <div className="absolute inset-0 w-full h-full pointer-events-auto z-0">
                    <LiquidGrowthField scrollProgress={scrollProgress} />
                </div>

                {/* Hero Centered Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 pointer-events-none">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
                        {/* Hero Text Layer (lg:col-span-7) */}
                        <div className="lg:col-span-7 space-y-7 pointer-events-auto">
                            {/* Top Vision Tag */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181A16]/90 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold tracking-widest uppercase text-[#F3F0E8]">
                                    <span className="w-2 h-2 rounded-full bg-[#D4B270] animate-pulse" />
                                    SOFTWARE • DISTRIBUTION • GROWTH
                                </span>
                                <a
                                    href="https://mayalokventures.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#181A16]/10 text-[11px] font-mono tracking-widest uppercase text-[#65675F] hover:text-[#181A16] hover:border-[#9B7545]/40 transition-colors"
                                >
                                    <span>MAYALOK VENTURE VISION</span>
                                    <ExternalLink size={11} className="text-[#9B7545]" />
                                </a>
                            </div>

                            {/* Display Headline Embedded in Field */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-[#F3F0E8] tracking-tight leading-[1.04]">
                                We Build the Systems Behind{' '}
                                <span className="text-brass-gradient">
                                    Business Growth.
                                </span>
                            </h1>

                            {/* Narrative Subhead */}
                            <p className="text-base sm:text-lg md:text-xl text-[#AAA99F] leading-relaxed max-w-2xl font-normal">
                                Software, creator-led distribution, and growth systems connected into one commercial operating engine.
                            </p>

                            {/* Action CTA Buttons (Primary: Schedule Briefing, Secondary: Explore Sahyak CRM) */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                                <Link
                                    href="/contact"
                                    className="tactile-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#9B7545] via-[#B88E56] to-[#9B7545] text-white font-heading font-semibold text-sm tracking-wide shadow-md active:scale-[0.98] transition-all min-h-[48px]"
                                >
                                    <span>Schedule Briefing</span>
                                    <ChevronRight size={16} className="text-white" />
                                </Link>
                                <a
                                    href="https://sahyak.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tactile-btn inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-heading font-semibold text-sm tracking-wide active:scale-[0.98] transition-all min-h-[48px]"
                                >
                                    <span>Explore Sahyak CRM</span>
                                    <ArrowUpRight size={16} className="text-[#D4B270]" />
                                </a>
                            </div>

                            {/* Location Coordinate */}
                            <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-[#AAA99F]">
                                <Building2 size={14} className="text-[#D4B270]" />
                                <span>Greater Noida • Delhi NCR</span>
                            </div>
                        </div>

                        {/* Hero Editorial Anchor (lg:col-span-5) */}
                        <div className="lg:col-span-5 relative pointer-events-auto">
                            <HeroSystemVisual
                                activePillar={activePillar}
                                onPillarChange={setActivePillar}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECTION 2 — THREE WAYS WE BUILD LEVERAGE
            ══════════════════════════════════════════════════════════════ */}
            <ThreeSystemsSection />

            {/* ══════════════════════════════════════════════════════════════
                SECTION 3 — SAHYAK CRM (PRODUCT MOMENT)
            ══════════════════════════════════════════════════════════════ */}
            <SahyakCrmShowcase />

            {/* ══════════════════════════════════════════════════════════════
                SECTION 4 — CREATOR DISTRIBUTION (CAUSAL NETWORK)
            ══════════════════════════════════════════════════════════════ */}
            <CreatorNetworkSection />

            {/* ══════════════════════════════════════════════════════════════
                SECTION 5 — GROWTH SYSTEMS (CONTINUOUS CONDUIT)
            ══════════════════════════════════════════════════════════════ */}
            <GrowthSystemsSection />

            {/* ══════════════════════════════════════════════════════════════
                SECTION 6 — THE COMPOUNDING CONVERGENCE CLIMAX
            ══════════════════════════════════════════════════════════════ */}
            <SystemEcosystemLoop />

            {/* ══════════════════════════════════════════════════════════════
                SECTION 7 — MAYALOK VENTURE VISION
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left Narrative (lg:col-span-7) */}
                    <div className="lg:col-span-7 space-y-6">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block">
                            VENTURE VISION // FOUNDATIONAL BACKING
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#181A16] tracking-tight leading-tight">
                            Built under the{' '}
                            <span className="text-brass-gradient">Mayalok Venture vision.</span>
                        </h2>

                        <p className="text-base sm:text-lg text-[#65675F] leading-relaxed font-normal">
                            DeepLink Creators is being built as one of the operating businesses within the broader Mayalok Venture vision (<a href="https://mayalokventures.com" target="_blank" rel="noopener noreferrer" className="text-[#9B7545] font-semibold underline hover:text-[#181A16] transition-colors">mayalokventures.com</a>), focusing on software engineering, creator distribution channels, and business growth systems.
                        </p>

                        <div className="pt-2">
                            <a
                                href="https://mayalokventures.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tactile-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#181A16]/15 hover:bg-[#E6E2D7] text-[#181A16] font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-xs"
                            >
                                <span>Explore Mayalok Venture</span>
                                <ArrowUpRight size={14} className="text-[#9B7545]" />
                            </a>
                        </div>
                    </div>

                    {/* Right Architectural Image (lg:col-span-5) */}
                    <div className="lg:col-span-5">
                        <div className="relative rounded-3xl overflow-hidden border border-[#181A16]/15 shadow-xl bg-[#E6E2D7] group">
                            <div className="relative h-[280px] sm:h-[340px] w-full">
                                <Image
                                    src="/images/mayalok-institutional-architecture.jpg"
                                    alt="Mayalok Venture Architecture"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#181A16]/50 via-transparent to-transparent" />
                            </div>

                            <div className="p-4 bg-white/95 border-t border-[#181A16]/10 flex items-center justify-between text-xs font-mono text-[#65675F]">
                                <span>MAYALOK VENTURE</span>
                                <span className="text-[#9B7545] font-semibold">STUDIO FOUNDATION</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECTION 8 — CLIENT ENDORSEMENTS
            ══════════════════════════════════════════════════════════════ */}
            <TestimonialSection />

            {/* ══════════════════════════════════════════════════════════════
                SECTION 9 — DIRECT ANSWERS & FAQ ACCORDION
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block mb-3">
                        QUESTIONS &amp; ANSWERS
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#181A16] tracking-tight mb-4">
                        Frequently Asked Questions.
                    </h2>
                    <p className="text-sm sm:text-base text-[#65675F] leading-relaxed">
                        Clear, direct answers regarding our software systems, Sahyak CRM deployment, and creator distribution networks.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqSchema.mainEntity.map((item, index) => (
                        <details
                            key={index}
                            className="group p-5 sm:p-6 rounded-2xl border border-[#181A16]/10 bg-white shadow-xs open:border-[#9B7545]/40 transition-all duration-200"
                        >
                            <summary className="font-heading font-bold text-base sm:text-lg text-[#181A16] cursor-pointer list-none flex items-center justify-between gap-4">
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
                SECTION 10 — STRATEGIC CTA
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <div className="p-10 sm:p-14 md:p-18 rounded-3xl border border-[#181A16] bg-[#181A16] text-[#F3F0E8] text-center space-y-6 shadow-2xl">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#D4B270] uppercase">
                        GET STARTED
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight max-w-3xl mx-auto leading-tight">
                        Ready to build permanent systems for your business?
                    </h2>

                    <p className="text-sm sm:text-base text-[#AAA99F] leading-relaxed max-w-2xl mx-auto font-normal">
                        Schedule a briefing to evaluate Sahyak CRM deployment, discuss custom software requirements, or activate creator distribution channels.
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
                            <span>Explore sahyak.com</span>
                            <ArrowUpRight size={16} className="text-[#D4B270]" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
