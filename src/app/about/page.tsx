'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    ArrowRight,
    ArrowUpRight,
    ExternalLink,
    CheckCircle2,
    Cpu,
    Network,
    TrendingUp,
    Workflow,
    ShieldCheck,
    Layers,
    Boxes,
    Building2,
    Users,
    Sparkles,
    Target,
    Activity,
    Compass
} from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

/* ═══════════════════════════════════════════════════════════════════════
   CHAPTER FRACTURE → REASSEMBLE TRANSITION DIVIDER
═══════════════════════════════════════════════════════════════════════ */
function ChapterFractureDivider() {
    const shouldReduceMotion = useReducedMotion()
    const barRef = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        if (shouldReduceMotion) {
            setInView(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                }
            },
            { threshold: 0.2 }
        )

        if (barRef.current) {
            observer.observe(barRef.current)
        }

        return () => observer.disconnect()
    }, [shouldReduceMotion])

    // 7 geometric segments with initial slight offsets that reassemble on scroll
    const offsets = [-5, 4, -3, 6, -4, 5, -2]

    return (
        <div
            ref={barRef}
            className={`chapter-fracture-bar py-3 ${inView ? 'in-view' : ''}`}
            aria-hidden="true"
        >
            {offsets.map((offset, i) => (
                <span
                    key={i}
                    className="chapter-fracture-segment"
                    style={{
                        transform: inView ? 'translateY(0) scaleX(1)' : `translateY(${offset}px) scaleX(0.75)`,
                        transitionDelay: `${i * 45}ms`,
                    }}
                />
            ))}
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN ABOUT PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
    const shouldReduceMotion = useReducedMotion()
    const containerRef = useRef<HTMLDivElement>(null)

    // GSAP ScrollTrigger Integration for quiet editorial reveals
    useEffect(() => {
        if (shouldReduceMotion || typeof window === 'undefined') return

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.editorial-section').forEach((section) => {
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 16 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
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
        <div
            ref={containerRef}
            className="bg-[#F3F0E8] text-[#181A16] min-h-screen selection:bg-[#9B7545]/20 selection:text-[#181A16] relative overflow-x-hidden font-sans"
        >
            {/* Subtle Architectural Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#181A1608_1px,transparent_1px),linear-gradient(to_bottom,#181A1608_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════════
                HERO: EDITORIAL COMPANY THESIS
            ══════════════════════════════════════════════════════════════ */}
            <header className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E2D7] border border-[#181A16]/10 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#9B7545] animate-pulse flex-shrink-0" />
                    <span className="marginal-label text-[#181A16] font-bold">
                        ABOUT DEEPLINK CREATORS // COMPANY THESIS
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-[#181A16] leading-[1.12] mb-6 break-words">
                    Building the systems behind{' '}
                    <span className="text-brass-gradient">
                        durable business growth.
                    </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-[#65675F] leading-relaxed mb-8 font-normal">
                    DeepLink Creators is a commercial growth infrastructure company. We engineer and operate at the intersection of <strong className="text-[#181A16] font-semibold">operating software, creator-led distribution, and demand growth systems</strong>—connecting customer acquisition directly to downstream sales execution.
                </p>

                {/* Manifesto Pull Quote */}
                <div className="p-5 sm:p-6 rounded-2xl border-l-2 border-[#9B7545] bg-white border border-[#181A16]/10 mb-8 max-w-2xl shadow-sm">
                    <p className="text-sm sm:text-base italic text-[#181A16] leading-relaxed">
                        &ldquo;We believe commercial advantage is not won through ephemeral marketing spikes or isolated software tools, but by connecting customer acquisition, creator distribution, and sales execution into one accountable system.&rdquo;
                    </p>
                </div>

                {/* Clean Overview Coordinates Box */}
                <div className="p-6 sm:p-7 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#181A16]/08">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9B7545]">
                            OPERATING PROFILE
                        </span>
                        <span className="text-xs font-mono text-[#65675F]">DELHI NCR • INDIA</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="space-y-1">
                            <span className="text-[#65675F] font-mono block">Entity Model:</span>
                            <span className="text-[#181A16] font-medium block">
                                Commercial Growth Infrastructure Company
                            </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[#65675F] font-mono block">Headquarters:</span>
                            <span className="text-[#181A16] font-medium block">
                                Greater Noida, Uttar Pradesh (Delhi NCR)
                            </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[#65675F] font-mono block">Flagship Software:</span>
                            <a
                                href="https://sahyak.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9B7545] font-semibold hover:underline inline-flex items-center gap-1"
                            >
                                <span>Sahyak CRM (sahyak.com)</span>
                                <ArrowUpRight size={13} />
                            </a>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[#65675F] font-mono block">Venture Context:</span>
                            <a
                                href="https://mayalokventures.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9B7545] font-semibold hover:underline inline-flex items-center gap-1"
                            >
                                <span>Mayalok Venture Vision</span>
                                <ArrowUpRight size={13} />
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Editorial Lead Imagery Frame */}
            <section className="px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-14 sm:mb-20">
                <div className="relative rounded-2xl overflow-hidden border border-[#181A16]/12 shadow-lg bg-[#E6E2D7]">
                    <div className="relative h-[240px] sm:h-[340px] md:h-[400px] w-full">
                        <Image
                            src="/images/Revenue Architecture Office.jpeg"
                            alt="Deeplink Creators Headquarters"
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#181A16]/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-4 bg-white/95 border-t border-[#181A16]/10 flex items-center justify-between text-xs font-mono text-[#65675F]">
                        <span>OPERATIONAL HEADQUARTERS</span>
                        <span className="text-[#9B7545] font-semibold">GREATER NOIDA • DELHI NCR</span>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                CHAPTER I — THE PROBLEM
            ══════════════════════════════════════════════════════════════ */}
            <article className="editorial-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
                <ChapterFractureDivider />

                <div className="flex items-center gap-3 pt-2">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        01
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER I — THE STRUCTURAL PROBLEM
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    Growth Breaks When Demand and Execution Live in Different Systems.
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-[#65675F] leading-relaxed">
                    <p>
                        Most businesses encounter a persistent bottleneck: marketing teams and agencies can generate attention through paid ads, search queries, creator campaigns, or outbound channels—but growth repeatedly stalls after the inquiry arrives.
                    </p>
                    <p>
                        In practice, commercial value leaks across the handoff:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#181A16] pl-2">
                        <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9B7545] mt-1.5 flex-shrink-0" />
                            <span><strong>Unqualified Inquiries:</strong> Leads enter the pipeline without budget, authority, or timeline qualification gates.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9B7545] mt-1.5 flex-shrink-0" />
                            <span><strong>Response Lag &amp; Poor Routing:</strong> High-intent buyers wait hours or days for first contact because distribution logic is manual.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9B7545] mt-1.5 flex-shrink-0" />
                            <span><strong>Disconnected Data:</strong> Marketing agencies optimize for cost-per-click without knowing which deals actually close.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9B7545] mt-1.5 flex-shrink-0" />
                            <span><strong>Unmeasured Creator Reach:</strong> Creator promotions create temporary social buzz with zero downstream CRM capture.</span>
                        </li>
                    </ul>
                    <p>
                        The core issue is not that marketing doesn&apos;t work. The issue is that <strong>growth becomes fragile when demand generation, conversion web systems, and sales operating software are disconnected.</strong>
                    </p>
                </div>
            </article>

            {/* ══════════════════════════════════════════════════════════════
                CHAPTER II — WHAT WE LEARNED
            ══════════════════════════════════════════════════════════════ */}
            <article className="editorial-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10 space-y-6">
                <div className="flex items-center gap-3">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        02
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER II — THE OPERATIONAL INSIGHT
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    The Real Problem Wasn&apos;t More Marketing. It Was the Missing Operating Layer.
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-[#65675F] leading-relaxed">
                    <p>
                        Acquiring attention is only the first stage of commercial revenue. Adding more ad spend to a leaky sales pipeline merely increases customer acquisition costs without building permanent business enterprise value.
                    </p>
                    <p>
                        A durable growth system requires synchronizing every step of the commercial journey into a single operational loop:
                    </p>

                    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#181A16]/10 space-y-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9B7545] block">
                            THE UNIFIED COMMERCIAL SEQUENCE
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-[#181A16]">
                            <span className="px-2 py-1 rounded bg-white border border-[#181A16]/10 font-bold">DEMAND</span>
                            <span className="text-[#9B7545]">→</span>
                            <span className="px-2 py-1 rounded bg-white border border-[#181A16]/10 font-bold">DISTRIBUTION</span>
                            <span className="text-[#9B7545]">→</span>
                            <span className="px-2 py-1 rounded bg-white border border-[#181A16]/10 font-bold">CONVERSION</span>
                            <span className="text-[#9B7545]">→</span>
                            <span className="px-2 py-1 rounded bg-white border border-[#181A16]/10 font-bold">INGESTION</span>
                            <span className="text-[#9B7545]">→</span>
                            <span className="px-2 py-1 rounded bg-[#D4B270]/20 text-[#9B7545] border border-[#9B7545]/30 font-bold">QUALIFICATION</span>
                            <span className="text-[#9B7545]">→</span>
                            <span className="px-2 py-1 rounded bg-white border border-[#181A16]/10 font-bold">SALES EXECUTION</span>
                            <span className="text-[#9B7545]">→</span>
                            <span className="px-2 py-1 rounded bg-[#3F5544]/15 text-[#3F5544] border border-[#3F5544]/20 font-bold">REVENUE</span>
                        </div>
                    </div>

                    <p>
                        When demand generation, creator distribution, and sales operating software operate in unison, closed-deal data can feed back into acquisition decisions, creating a more measurable and increasingly connected growth system.
                    </p>
                </div>
            </article>

            {/* ══════════════════════════════════════════════════════════════
                CHAPTER III — THE THREE SYSTEMS
            ══════════════════════════════════════════════════════════════ */}
            <article className="editorial-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10 space-y-6">
                <ChapterFractureDivider />

                <div className="flex items-center gap-3 pt-2">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        03
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER III — COMPANY ARCHITECTURE
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    Three Systems. One Commercial Loop.
                </h2>

                <p className="text-sm sm:text-base text-[#65675F] leading-relaxed">
                    To solve this disconnect, DeepLink was structured around three interconnected commercial capabilities rather than isolated agency services:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                    {/* System 01 */}
                    <div className="p-6 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-3 flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-extrabold font-mono text-[#9B7545]">01</span>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E6E2D7] text-[#181A16]">
                                    SOFTWARE
                                </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold font-heading text-[#181A16]">
                                Operating Software
                            </h3>
                            <p className="text-xs text-[#65675F] leading-relaxed">
                                Proprietary sales software (Sahyak CRM at sahyak.com) and custom commercial portals engineered to capture, qualify, route, and enforce sales execution discipline.
                            </p>
                        </div>
                        <div className="pt-3 border-t border-[#181A16]/08">
                            <span className="text-[11px] font-mono text-[#9B7545]">Flagship: Sahyak CRM</span>
                        </div>
                    </div>

                    {/* System 02 */}
                    <div className="p-6 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-3 flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-extrabold font-mono text-[#9B7545]">02</span>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E6E2D7] text-[#181A16]">
                                    DISTRIBUTION
                                </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold font-heading text-[#181A16]">
                                Creator Distribution
                            </h3>
                            <p className="text-xs text-[#65675F] leading-relaxed">
                                Managed creator distribution across B2B technology, industrial markets, regional metros, and consultative services.
                            </p>
                        </div>
                        <div className="pt-3 border-t border-[#181A16]/08">
                            <span className="text-[11px] font-mono text-[#3F5544]">Structured Acquisition</span>
                        </div>
                    </div>

                    {/* System 03 */}
                    <div className="p-6 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-3 flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-extrabold font-mono text-[#9B7545]">03</span>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E6E2D7] text-[#181A16]">
                                    DEMAND
                                </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold font-heading text-[#181A16]">
                                Growth Systems
                            </h3>
                            <p className="text-xs text-[#65675F] leading-relaxed">
                                Commercial search infrastructure (SEO), precision paid media, conversion web architecture, and workflow automation feeding buyer inquiries directly into Sahyak.
                            </p>
                        </div>
                        <div className="pt-3 border-t border-[#181A16]/08">
                            <span className="text-[11px] font-mono text-[#9B7545]">Performance Engines</span>
                        </div>
                    </div>
                </div>
            </article>

            {/* ══════════════════════════════════════════════════════════════
                CHAPTER IV — WHY WE BUILT SAHYAK
            ══════════════════════════════════════════════════════════════ */}
            <article className="editorial-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10 space-y-6">
                <div className="flex items-center gap-3">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        04
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER IV — SOFTWARE EVOLUTION
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    We Built Sahyak Because the Lead Was Never the Finish Line.
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-[#65675F] leading-relaxed">
                    <p>
                        A performance campaign can generate qualified attention. A creator can build commercial credibility. A search result can capture intent. A conversion landing page can collect an inquiry form.
                    </p>
                    <p>
                        <strong>But the actual commercial outcome depends entirely on what happens next.</strong>
                    </p>
                    <p>
                        Conventional CRMs were passive data warehouses where leads frequently sat unassigned or unverified. We engineered Sahyak (<a href="https://sahyak.com" target="_blank" rel="noopener noreferrer" className="text-[#9B7545] font-semibold underline">sahyak.com</a>) as a purpose-built sales operating system to govern the downstream journey:
                    </p>

                    {/* Sahyak 5-Stage Pipeline Block */}
                    <div className="p-6 rounded-2xl bg-[#181A16] text-white border border-[#181A16] space-y-4 shadow-lg">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
                            <span className="text-[#D4B270] font-bold">SAHYAK OS // 5-STAGE PIPELINE ENFORCEMENT</span>
                            <span className="text-[#8FA994] text-[10px] bg-[#3F5544]/20 px-2 py-0.5 rounded">OPERATIONAL LAYER</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                                <span className="text-[10px] font-mono text-[#D4B270] block">01 CAPTURE</span>
                                <p className="text-xs font-bold text-white">Ingestion</p>
                                <p className="text-[10px] text-[#AAA99F]">Full channel attribution</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                                <span className="text-[10px] font-mono text-[#D4B270] block">02 QUALIFY</span>
                                <p className="text-xs font-bold text-white">Stage Gates</p>
                                <p className="text-[10px] text-[#AAA99F]">Budget &amp; timeline check</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                                <span className="text-[10px] font-mono text-[#D4B270] block">03 ASSIGN</span>
                                <p className="text-xs font-bold text-white">Rep Routing</p>
                                <p className="text-[10px] text-[#AAA99F]">Capacity &amp; category rules</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                                <span className="text-[10px] font-mono text-[#D4B270] block">04 FOLLOW UP</span>
                                <p className="text-xs font-bold text-white">Cadence</p>
                                <p className="text-[10px] text-[#AAA99F]">Follow-up alerts</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                                <span className="text-[10px] font-mono text-[#8FA994] block">05 CONVERT</span>
                                <p className="text-xs font-bold text-white">Closed Revenue</p>
                                <p className="text-[10px] text-[#AAA99F]">Velocity &amp; conversion</p>
                            </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-xs">
                            <span className="text-[#AAA99F]">
                                Proprietary sales OS deployed across DeepLink growth engagements.
                            </span>
                            <a
                                href="https://sahyak.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#D4B270] hover:underline font-mono inline-flex items-center gap-1 font-semibold"
                            >
                                <span>Explore Sahyak CRM</span>
                                <ArrowUpRight size={13} />
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            {/* ══════════════════════════════════════════════════════════════
                CHAPTER V — WHY CREATOR DISTRIBUTION EXISTS
            ══════════════════════════════════════════════════════════════ */}
            <article className="editorial-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10 space-y-6">
                <ChapterFractureDivider />

                <div className="flex items-center gap-3 pt-2">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        05
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER V — DISTRIBUTION STRATEGY
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    Distribution Should Be More Than Buying Attention.
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-[#65675F] leading-relaxed">
                    <p>
                        Traditional advertising faces saturation, ad fatigue, and algorithm volatility. Meanwhile, standard influencer marketing frequently focuses on surface vanity metrics—delivering impressions without commercial accountability.
                    </p>
                    <p>
                        DeepLink organizes creator distribution as an accountable acquisition channel structured around:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div className="p-4 rounded-xl border border-[#181A16]/10 bg-white shadow-sm space-y-1.5">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                01 // AUDIENCE RELEVANCE
                            </span>
                            <p className="text-xs sm:text-sm text-[#181A16] leading-relaxed">
                                Selecting creators whose audience matches relevant business buyers, specifiers, and high-intent regional audiences.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl border border-[#181A16]/10 bg-white shadow-sm space-y-1.5">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                02 // CAMPAIGN COORDINATION
                            </span>
                            <p className="text-xs sm:text-sm text-[#181A16] leading-relaxed">
                                Managing briefs, product teardowns, and demonstrations that communicate substantive value rather than superficial endorsements.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl border border-[#181A16]/10 bg-white shadow-sm space-y-1.5">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                03 // COMMERCIAL ATTRIBUTION
                            </span>
                            <p className="text-xs sm:text-sm text-[#181A16] leading-relaxed">
                                Direct attribution linking creator campaigns to dedicated intake funnels, lead capture forms, and CRM handoff.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl border border-[#181A16]/10 bg-white shadow-sm space-y-1.5">
                            <span className="marginal-label text-[#9B7545] font-bold block">
                                04 // PIPELINE CONNECTION
                            </span>
                            <p className="text-xs sm:text-sm text-[#181A16] leading-relaxed">
                                Inquiries generated from creator reach route straight into Sahyak CRM for immediate rep follow-up and sales qualification.
                            </p>
                        </div>
                    </div>
                </div>
            </article>

            {/* ══════════════════════════════════════════════════════════════
                CHAPTER VI — OPERATING PRINCIPLES
            ══════════════════════════════════════════════════════════════ */}
            <article className="editorial-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10 space-y-6">
                <div className="flex items-center gap-3">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        06
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER VI — OPERATING PRINCIPLES
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    How We Engineer &amp; Execute.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            num: '01',
                            title: 'Build What We Need',
                            desc: 'When existing off-the-shelf software creates operational gaps, we engineer the missing operating layer.'
                        },
                        {
                            num: '02',
                            title: 'Connect the Commercial Loop',
                            desc: 'Demand generation must never operate disconnected from conversion web systems and downstream sales execution.'
                        },
                        {
                            num: '03',
                            title: 'Optimize for Commercial Outcomes',
                            desc: 'Impressions, clicks, and raw form submissions are inputs. Closed pipeline velocity and real revenue are what matter.'
                        },
                        {
                            num: '04',
                            title: 'Keep Systems Accountable',
                            desc: 'Every channel, workflow, and campaign must have clear attribution, active ownership, and measurable next actions.'
                        },
                        {
                            num: '05',
                            title: 'Stay Close to the Market',
                            desc: 'We build technology and distribution to solve practical commercial bottlenecks, not for technology’s sake alone.'
                        },
                        {
                            num: '06',
                            title: 'Asset Ownership First',
                            desc: 'Clients should own their software assets, CRM data, and customer relationships rather than renting fragile agency traffic.'
                        }
                    ].map((principle) => (
                        <div
                            key={principle.title}
                            className="p-5 rounded-xl border border-[#181A16]/10 bg-white shadow-sm space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold text-[#9B7545]">
                                    {principle.num}
                                </span>
                            </div>
                            <h3 className="text-sm sm:text-base font-bold font-heading text-[#181A16]">
                                {principle.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed">
                                {principle.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </article>

            {/* ══════════════════════════════════════════════════════════════
                CHAPTER VII — LEADERSHIP (BUILT BY OPERATORS)
            ══════════════════════════════════════════════════════════════ */}
            <article className="editorial-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10 space-y-6">
                <ChapterFractureDivider />

                <div className="flex items-center gap-3 pt-2">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        07
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER VII — LEADERSHIP
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    Built by Operators.
                </h2>

                <p className="text-sm sm:text-base text-[#65675F] leading-relaxed">
                    DeepLink is engineered by practitioners directly involved in software development, creator coordination, growth systems, and commercial execution:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Kunal Pratap Singh */}
                    <div className="p-6 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="marginal-label text-[#9B7545] font-bold">
                                FOUNDER
                            </span>
                            <span className="text-[10px] font-mono text-[#65675F]">STRATEGY &amp; SYSTEMS</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#181A16]">
                            Kunal Pratap Singh
                        </h3>
                        <p className="text-xs text-[#65675F] leading-relaxed">
                            Leading commercial architecture, software product direction, and growth systems strategy across DeepLink Creators.
                        </p>
                        <div className="pt-2 border-t border-[#181A16]/08 flex items-center justify-between">
                            <a
                                href="mailto:kunal@deeplinkcreators.com"
                                className="text-xs font-mono text-[#9B7545] hover:underline"
                            >
                                kunal@deeplinkcreators.com
                            </a>
                        </div>
                    </div>

                    {/* Dileep Yadav */}
                    <div className="p-6 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="marginal-label text-[#9B7545] font-bold">
                                CO-FOUNDER
                            </span>
                            <span className="text-[10px] font-mono text-[#65675F]">OPERATIONS</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#181A16]">
                            Dileep Yadav
                        </h3>
                        <p className="text-xs text-[#65675F] leading-relaxed">
                            Overseeing operational execution, creator network coordination, and distribution infrastructure across priority regional markets.
                        </p>
                        <div className="pt-2 border-t border-[#181A16]/08 flex items-center justify-between">
                            <span className="text-xs font-mono text-[#65675F]">
                                Greater Noida Headquarters
                            </span>
                        </div>
                    </div>
                </div>
            </article>

            {/* ══════════════════════════════════════════════════════════════
                CHAPTER VIII — MAYALOK VENTURE RELATIONSHIP
            ══════════════════════════════════════════════════════════════ */}
            <article className="editorial-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10 space-y-6">
                <div className="flex items-center gap-3">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        08
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER VIII — VENTURE CONTEXT
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    Part of a Larger Venture Direction.
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-[#65675F] leading-relaxed">
                    <p>
                        DeepLink Creators is the active commercial operating business. Mayalok Venture (<a href="https://mayalokventures.com" target="_blank" rel="noopener noreferrer" className="text-[#9B7545] font-semibold underline">mayalokventures.com</a>) represents the broader venture vision under which interconnected technology platforms, commercial systems, and digital capabilities are conceptualized and developed.
                    </p>
                    <p>
                        This overarching context shapes our focus on building software and distribution assets engineered for long-term operational durability.
                    </p>
                </div>
            </article>

            {/* ══════════════════════════════════════════════════════════════
                CHAPTER IX — THE CONNECTED COMMERCIAL LOOP (SYNTHESIS)
            ══════════════════════════════════════════════════════════════ */}
            <section className="editorial-section py-12 sm:py-16 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10">
                <div className="rounded-3xl bg-[#181A16] text-[#F3F0E8] border border-[#181A16] p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-[#AAA99F]">
                        <span className="text-[#D4B270] font-bold">
                            CONNECTED COMMERCIAL FLOW // UNIFIED EXECUTION
                        </span>
                        <span className="text-[#8FA994] bg-[#3F5544]/20 px-2.5 py-1 rounded">
                            UNIFIED SYSTEM
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                            Why DeepLink Exists.
                        </h3>
                        <p className="text-xs sm:text-sm text-[#AAA99F] leading-relaxed">
                            To eliminate the structural break between marketing traffic and closed sales revenue by connecting demand generation, creator distribution, and sales operating software into one accountable execution loop.
                        </p>
                    </div>

                    {/* Sequential Pipeline Bar */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 overflow-x-auto">
                        <div className="flex items-center justify-between min-w-[650px] text-[10px] font-mono text-white/90">
                            <span className="px-2 py-0.5 rounded bg-[#D4B270]/20 text-[#D4B270] font-bold">DEMAND</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2 py-0.5 rounded bg-white/05 text-white/80">DISTRIBUTION</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2 py-0.5 rounded bg-white/05 text-white/80">CONVERSION</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2 py-0.5 rounded bg-[#8FA994]/20 text-[#8FA994] font-bold">INGESTION</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2 py-0.5 rounded bg-[#D4B270]/20 text-[#D4B270] font-bold">SAHYAK CRM</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2 py-0.5 rounded bg-white/05 text-white/80">SALES EXECUTION</span>
                            <span className="text-white/30">→</span>
                            <span className="px-2 py-0.5 rounded bg-[#8FA994]/20 text-[#8FA994] font-bold">REVENUE</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                FINAL STRATEGIC CTA
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10">
                <div className="p-8 sm:p-12 rounded-3xl border border-[#181A16] bg-[#181A16] text-[#F3F0E8] text-center space-y-6 shadow-2xl">
                    <span className="marginal-label text-[#D4B270] tracking-widest font-bold">
                        GET STARTED // CONNECTED GROWTH INFRASTRUCTURE
                    </span>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight">
                        Build the Next Layer of Your Growth System.
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base text-[#AAA99F] leading-relaxed max-w-xl mx-auto font-normal">
                        If your demand generation, creator distribution, or sales execution is operating across disconnected tools, schedule a briefing with DeepLink.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
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
