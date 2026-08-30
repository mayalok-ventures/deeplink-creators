'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2, Building2, ShieldCheck, MapPin } from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const ease = [0.22, 1, 0.36, 1] as const

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

    // 7 geometric segments with initial slight offsets that reassemble on entry
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

export default function AboutPage() {
    const shouldReduceMotion = useReducedMotion()
    const containerRef = useRef<HTMLDivElement>(null)

    // GSAP ScrollTrigger Integration for quiet editorial reveals
    useEffect(() => {
        if (shouldReduceMotion || typeof window === 'undefined') return

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.prospectus-section').forEach((section) => {
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
                SECTION 1 — EDITORIAL INTRODUCTION
            ══════════════════════════════════════════════════════════════ */}
            <header className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E2D7] border border-[#181A16]/10 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7545] flex-shrink-0" />
                    <span className="marginal-label text-[#181A16] font-bold">
                        COMPANY MANIFESTO &amp; PROSPECTUS
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-[#181A16] leading-[1.14] mb-6 break-words">
                    Building the systems behind{' '}
                    <span className="text-brass-gradient">
                        durable enterprise growth.
                    </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-[#65675F] leading-relaxed mb-8 font-normal">
                    Deeplink Creators is an AI-first enterprise software holding and venture studio backed by Mayalok Venture. We build proprietary B2B software infrastructure and creator-led distribution systems for organizations seeking stronger operational control and more durable routes to market.
                </p>

                {/* Manifesto Pull Quote */}
                <div className="p-5 sm:p-6 rounded-xl border-l-2 border-[#9B7545] bg-white border border-[#181A16]/10 mb-8 max-w-2xl shadow-sm">
                    <p className="text-sm sm:text-base italic text-[#181A16] leading-relaxed">
                        &ldquo;We believe enterprise advantage is not won through ephemeral marketing spikes, but by owning the software assets and distribution channels that make commercial execution repeatable.&rdquo;
                    </p>
                </div>

                {/* Overview Coordinates Box */}
                <div className="p-6 sm:p-7 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#181A16]/08">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9B7545]">
                            HOLDING PROFILE
                        </span>
                        <span className="text-xs font-mono text-[#65675F]">EST. 2024 • NCR</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="space-y-1">
                            <span className="text-[#65675F] font-mono block">Entity Model:</span>
                            <span className="text-[#181A16] font-medium block">
                                AI-First Software Holding &amp; Venture Studio
                            </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[#65675F] font-mono block">Institutional Parent:</span>
                            <a
                                href="https://mayalokventures.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9B7545] font-semibold hover:underline flex items-center gap-1"
                            >
                                <span>Mayalok Venture ↗</span>
                            </a>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[#65675F] font-mono block">Flagship Software:</span>
                            <a
                                href="https://sahyak.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9B7545] font-semibold hover:underline flex items-center gap-1"
                            >
                                <span>Sahyak CRM (sahyak.com) ↗</span>
                            </a>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[#65675F] font-mono block">Headquarters:</span>
                            <span className="text-[#181A16] font-medium block">
                                Greater Noida, Uttar Pradesh (Delhi NCR)
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Editorial Lead Imagery Frame */}
            <section className="px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-14 sm:mb-20">
                <div className="relative rounded-2xl overflow-hidden border border-[#181A16]/12 shadow-lg bg-[#E6E2D7] image-editorial-frame">
                    <div className="relative h-[240px] sm:h-[340px] md:h-[400px] w-full">
                        <Image
                            src="/images/Revenue Architecture Office.jpeg"
                            alt="Deeplink Creators Executive Engineering Lab"
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#181A16]/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-4 bg-white/95 border-t border-[#181A16]/10 flex items-center justify-between text-xs font-mono text-[#65675F]">
                        <span>HEADQUARTERS LAB</span>
                        <span className="text-[#9B7545] font-semibold">GREATER NOIDA • NCR</span>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 2 — CHAPTER I: THE THESIS (With Chapter Fracture Rule)
            ══════════════════════════════════════════════════════════════ */}
            <article className="prospectus-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
                <ChapterFractureDivider />

                <div className="flex items-center gap-3 pt-2">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        01
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER I — THE OPERATIONAL THESIS
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    Why Traditional Agency &amp; Software Models Break Down.
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-[#65675F] leading-relaxed">
                    <p>
                        Most modern enterprises face a structural dilemma: software agencies deliver code without an understanding of customer acquisition, while marketing agencies execute campaigns without building durable assets.
                    </p>
                    <p>
                        When ad costs fluctuate or service contracts conclude, marketing gains evaporate because the organization never developed proprietary distribution or owned operating software.
                    </p>
                    <p>
                        Deeplink Creators was architected to bridge this division. By pairing dedicated software engineering with creator-led audience networks, we help businesses build permanent capabilities that compound in value over time.
                    </p>
                </div>
            </article>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 3 — CHAPTER II: THE HYBRID MODEL
            ══════════════════════════════════════════════════════════════ */}
            <article className="prospectus-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10 space-y-6">
                <div className="flex items-center gap-3">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        02
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER II — THE HYBRID ARCHITECTURE
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    Software Assets and Creator Syndication as One Machine.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-5 rounded-xl border border-[#181A16]/10 bg-white shadow-sm space-y-2">
                        <span className="marginal-label text-[#9B7545] font-bold block">
                            THE SOFTWARE ENGINE
                        </span>
                        <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed">
                            B2B SaaS applications, sales pipeline automation, and multi-tenant platforms that enforce operational discipline and institutional memory.
                        </p>
                    </div>

                    <div className="p-5 rounded-xl border border-[#181A16]/10 bg-white shadow-sm space-y-2">
                        <span className="marginal-label text-[#9B7545] font-bold block">
                            THE DISTRIBUTION ENGINE
                        </span>
                        <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed">
                            Vetted creator networks and micro-influencer ecosystems that bypass saturated advertising algorithms to connect directly with decision-makers.
                        </p>
                    </div>
                </div>
            </article>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 4 — CHAPTER III: MAYALOK VENTURE GOVERNANCE (With Fracture Rule)
            ══════════════════════════════════════════════════════════════ */}
            <article className="prospectus-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
                <ChapterFractureDivider />

                <div className="flex items-center gap-3 pt-2">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        03
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER III — INSTITUTIONAL GOVERNANCE
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    Backed by Mayalok Venture.
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-[#65675F] leading-relaxed">
                    <p>
                        Deeplink Creators operates as a strategic unit of Mayalok Venture (<a href="https://mayalokventures.com" target="_blank" rel="noopener noreferrer" className="text-[#9B7545] font-semibold underline">mayalokventures.com</a>), a forward-looking venture firm dedicated to building enduring digital and technological capabilities.
                    </p>
                    <p>
                        This affiliation provides our engineering teams and client partners with long-term capital stability, rigorous corporate governance, and a venture-scale perspective that prioritizes durable enterprise equity over transient gains.
                    </p>
                </div>
            </article>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 5 — CHAPTER IV: PRINCIPLES
            ══════════════════════════════════════════════════════════════ */}
            <article className="prospectus-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10 space-y-6">
                <div className="flex items-center gap-3">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        04
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER IV — OPERATING PRINCIPLES
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    How We Engineer &amp; Deliver.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: 'Asset Ownership First', desc: 'Every line of code and pipeline system is architected for long-term client control.' },
                        { title: 'Zero Operational Leakage', desc: 'Workflows and CRM protocols ensure no qualified inquiry is lost to poor execution.' },
                        { title: 'Curated Distribution Integrity', desc: 'We only activate creator channels with verified, non-incentivized audience relevance.' },
                        { title: 'Venture-Scale Reliability', desc: 'Multi-tenant architecture and secure infrastructure built for enterprise longevity.' },
                    ].map((principle) => (
                        <div key={principle.title} className="p-5 rounded-xl border border-[#181A16]/10 bg-white shadow-sm space-y-1.5">
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
                SECTION 6 — CHAPTER V: LEADERSHIP & GOVERNANCE
            ══════════════════════════════════════════════════════════════ */}
            <article className="prospectus-section py-10 sm:py-14 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10 space-y-6">
                <div className="flex items-center gap-3">
                    <span className="chapter-numeral text-3xl sm:text-4xl font-extrabold text-[#9B7545]">
                        05
                    </span>
                    <span className="marginal-label text-[#65675F]">
                        CHAPTER V — EXECUTIVE LEADERSHIP
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#181A16] tracking-tight">
                    Leadership &amp; Corporate Governance.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Kunal Pratap Singh - Founder */}
                    <div className="p-6 rounded-2xl border border-[#181A16]/10 bg-white shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="marginal-label text-[#9B7545] font-bold">
                                FOUNDER
                            </span>
                            <span className="text-[10px] font-mono text-[#65675F]">EXECUTIVE</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#181A16]">
                            Kunal Pratap Singh
                        </h3>
                        <p className="text-xs text-[#65675F] leading-relaxed">
                            Leading enterprise strategy, venture partnerships, and commercial architecture across Deeplink Creators and portfolio platforms.
                        </p>
                        <div className="pt-2 border-t border-[#181A16]/08">
                            <a href="mailto:kunal@deeplinkcreators.com" className="text-xs font-mono text-[#9B7545] hover:underline">
                                kunal@deeplinkcreators.com
                            </a>
                        </div>
                    </div>

                    {/* Dileep Yadav - Co-founder */}
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
                            Overseeing operational execution, creator network governance, and multi-channel distribution infrastructure across priority regions.
                        </p>
                        <div className="pt-2 border-t border-[#181A16]/08">
                            <span className="text-xs font-mono text-[#65675F]">
                                Greater Noida Headquarters
                            </span>
                        </div>
                    </div>
                </div>
            </article>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 7 — ENTERPRISE ENGAGEMENT CTA
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#181A16]/10">
                <div className="p-8 sm:p-12 rounded-3xl border border-[#181A16]/15 bg-[#181A16] text-[#F3F0E8] text-center space-y-5 shadow-xl">
                    <span className="marginal-label text-[#D4B270] tracking-widest font-bold">
                        EXECUTIVE INTAKE
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight">
                        Initiate an Institutional Dialogue.
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-[#AAA99F] leading-relaxed max-w-xl mx-auto">
                        Explore custom software architecture, creator syndication, or strategic venture collaboration with Deeplink Creators.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/contact"
                            className="tactile-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#9B7545] via-[#B88E56] to-[#9B7545] text-white font-heading font-bold text-sm tracking-wide shadow-md active:scale-[0.98] transition-all min-h-[48px]"
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
