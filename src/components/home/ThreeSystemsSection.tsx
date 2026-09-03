'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

// ─── SVG Liquid Filter ───────────────────────────────────────────────────────
// Inline SVG filter that produces fluid deformation. Applied to the card
// container via CSS filter: url(#liquid-morph).
// We animate feTurbulence baseFrequency to create the settling liquid effect.

function LiquidFilterDef() {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        >
            <defs>
                {/* Phase A: active turbulence while card is expanding */}
                <filter id="liquid-morph-active" x="-5%" y="-5%" width="110%" height="110%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.018 0.024"
                        numOctaves="3"
                        seed="4"
                        result="noise"
                    >
                        <animate
                            attributeName="baseFrequency"
                            values="0.018 0.024;0.032 0.044;0.018 0.024"
                            dur="1.2s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="seed"
                            values="4;8;4"
                            dur="2.4s"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="10"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="displaced"
                    />
                    <feComposite in="displaced" in2="SourceGraphic" operator="atop" />
                </filter>

                {/* Phase B: calm residual fluid motion after settle */}
                <filter id="liquid-morph-settled" x="-3%" y="-3%" width="106%" height="106%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.008 0.010"
                        numOctaves="2"
                        seed="7"
                        result="noise"
                    >
                        <animate
                            attributeName="baseFrequency"
                            values="0.008 0.010;0.012 0.016;0.008 0.010"
                            dur="3.5s"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="5"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="displaced"
                    />
                    <feComposite in="displaced" in2="SourceGraphic" operator="atop" />
                </filter>
            </defs>
        </svg>
    )
}

// ─── Card Data ────────────────────────────────────────────────────────────────

interface CardDef {
    id: string
    num: string
    eyebrow: string
    title: string
    body: string
    expandedDetail: string
    ctaLabel: string
    ctaHref: string
    ctaExternal?: boolean
    dark: boolean
}

const CARDS: CardDef[] = [
    {
        id: 'software',
        num: '01',
        eyebrow: 'PROPRIETARY OPERATING SOFTWARE',
        title: 'Sahyak CRM: Sales Visibility & Pipeline Control.',
        body: 'A sales operations suite engineered for qualification stage gates, rules-based rep routing, and complete activity accountability across the entire deal lifecycle.',
        expandedDetail: 'Inbound leads are qualified, routed to the right rep automatically, and tracked from first touch to closed deal — eliminating the visibility gaps that cost pipeline at every handoff.',
        ctaLabel: 'Explore Sahyak Platform',
        ctaHref: 'https://sahyak.com',
        ctaExternal: true,
        dark: true,
    },
    {
        id: 'distribution',
        num: '02',
        eyebrow: 'CREATOR-LED DISTRIBUTION',
        title: 'Direct Market Access & Niche Reach.',
        body: 'Managed creator distribution networks connecting businesses directly to targeted local and niche audiences, reducing reliance on volatile ad network algorithms.',
        expandedDetail: "Creator-led distribution gives your brand a direct channel into specific buyer communities \u2014 B2B decision-makers, industrial specifiers, and regional metro buyers \u2014 without paying for reach you don't need.",
        ctaLabel: 'Explore Creator Distribution',
        ctaHref: '/services/social-commerce/',
        dark: false,
    },
    {
        id: 'demand',
        num: '03',
        eyebrow: 'DEMAND & GROWTH SYSTEMS',
        title: 'Performance, SEO & Conversion Infrastructure.',
        body: 'High-intent search acquisition, SEO, conversion-focused web architecture, and automated lead routing synchronized directly into sales pipelines.',
        expandedDetail: 'Every campaign channel — organic, paid, or content-driven — connects back to a single conversion layer that routes qualified intent directly into Sahyak, creating a measurable closed-loop growth system.',
        ctaLabel: 'Explore Growth Systems',
        ctaHref: '/services/',
        dark: false,
    },
]

// ─── Single Expandable Card ───────────────────────────────────────────────────

interface CardProps {
    card: CardDef
    isExpanded: boolean
    onActivate: () => void
    reducedMotion: boolean
}

function InfraCard({ card, isExpanded, onActivate, reducedMotion }: CardProps) {
    const [filterPhase, setFilterPhase] = useState<'none' | 'active' | 'settled'>('none')
    const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Trigger liquid effect lifecycle when expansion starts
    useEffect(() => {
        if (reducedMotion) return

        if (isExpanded) {
            setFilterPhase('active')
            settleTimer.current = setTimeout(() => {
                setFilterPhase('settled')
            }, 900)
        } else {
            if (settleTimer.current) clearTimeout(settleTimer.current)
            setFilterPhase('none')
        }
        return () => {
            if (settleTimer.current) clearTimeout(settleTimer.current)
        }
    }, [isExpanded, reducedMotion])

    const filterStyle =
        filterPhase === 'active'
            ? { filter: 'url(#liquid-morph-active)' }
            : filterPhase === 'settled'
              ? { filter: 'url(#liquid-morph-settled)' }
              : {}

    const dark = card.dark

    return (
        <motion.div
            layout={!reducedMotion}
            className={[
                'relative overflow-hidden rounded-3xl border flex flex-col',
                'cursor-pointer select-none',
                // Desktop: size controlled by flex
                'min-w-0',
                dark
                    ? 'bg-[#181A16] border-[#181A16] text-[#F3F0E8]'
                    : 'bg-white border-[#181A16]/12 text-[#181A16]',
            ].join(' ')}
            style={{
                // Flex grow drives width: 1 = collapsed, 3.5 = expanded (desktop)
                flexGrow: isExpanded ? 3.5 : 1,
                flexShrink: 1,
                flexBasis: 0,
                minHeight: 280,
                transition: reducedMotion
                    ? 'none'
                    : 'flex-grow 0.65s cubic-bezier(0.22, 0.88, 0.36, 1), box-shadow 0.4s ease',
                boxShadow: isExpanded
                    ? dark
                        ? '0 24px 64px rgba(24,26,22,0.5)'
                        : '0 20px 56px rgba(155,117,69,0.18)'
                    : 'none',
                willChange: 'flex-grow',
                ...filterStyle,
            }}
            onMouseEnter={onActivate}
            onTouchStart={onActivate}
            onFocus={onActivate}
            tabIndex={0}
            role="button"
            aria-expanded={isExpanded}
            aria-label={card.title}
        >
            {/* Inner content — padding stays fixed */}
            <div className="p-7 sm:p-9 flex flex-col h-full gap-5">
                {/* Header */}
                <div className="flex items-center gap-3 shrink-0">
                    <span
                        className={[
                            'text-3xl font-extrabold font-heading',
                            dark ? 'text-[#D4B270]' : 'text-[#9B7545]',
                        ].join(' ')}
                    >
                        {card.num}
                    </span>
                    <span
                        className={[
                            'text-[10px] font-mono font-bold tracking-widest uppercase border-l pl-3',
                            dark ? 'text-[#AAA99F] border-white/15' : 'text-[#65675F] border-[#181A16]/10',
                        ].join(' ')}
                    >
                        {card.eyebrow}
                    </span>
                </div>

                {/* Title — always visible */}
                <h3
                    className={[
                        'font-extrabold font-heading tracking-tight leading-tight shrink-0',
                        isExpanded ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl',
                        dark ? 'text-white' : 'text-[#181A16]',
                    ].join(' ')}
                    style={{
                        transition: reducedMotion ? 'none' : 'font-size 0.5s ease',
                    }}
                    dangerouslySetInnerHTML={{ __html: card.title.replace('&', '&amp;') }}
                />

                {/* Body */}
                <p
                    className={[
                        'text-sm leading-relaxed shrink-0',
                        dark ? 'text-[#AAA99F]' : 'text-[#65675F]',
                    ].join(' ')}
                >
                    {card.body}
                </p>

                {/* Expanded detail — fade in */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            key="detail"
                            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className={[
                                'text-sm leading-relaxed shrink-0',
                                dark ? 'text-[#D4B270]/80' : 'text-[#9B7545]',
                            ].join(' ')}
                        >
                            {card.expandedDetail}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Spacer */}
                <div className="flex-1" />

                {/* CTA */}
                <div
                    className={[
                        'shrink-0 border-t pt-4',
                        dark ? 'border-white/10' : 'border-[#181A16]/08',
                    ].join(' ')}
                >
                    {card.ctaExternal ? (
                        <a
                            href={card.ctaHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={[
                                'inline-flex items-center gap-2 text-xs font-heading font-bold transition-colors',
                                dark
                                    ? 'text-[#D4B270] hover:text-white'
                                    : 'text-[#181A16] hover:text-[#9B7545]',
                            ].join(' ')}
                        >
                            <span>{card.ctaLabel}</span>
                            <ArrowUpRight size={13} />
                        </a>
                    ) : (
                        <Link
                            href={card.ctaHref}
                            onClick={(e) => e.stopPropagation()}
                            className={[
                                'inline-flex items-center gap-2 text-xs font-heading font-bold transition-colors',
                                dark
                                    ? 'text-[#D4B270] hover:text-white'
                                    : 'text-[#181A16] hover:text-[#9B7545]',
                            ].join(' ')}
                        >
                            <span>{card.ctaLabel}</span>
                            <ArrowRight size={13} className={dark ? 'text-[#D4B270]' : 'text-[#9B7545]'} />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ThreeSystemsSection() {
    const [activeId, setActiveId] = useState<string>('software')
    const reducedMotion = useReducedMotion() ?? false

    const handleActivate = useCallback((id: string) => {
        setActiveId(id)
    }, [])

    // Reset to first card when mouse leaves the container
    const handleContainerLeave = useCallback(() => {
        setActiveId('software')
    }, [])

    return (
        <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
            {/* SVG filter defs (hidden) */}
            {!reducedMotion && <LiquidFilterDef />}

            {/* Section Header */}
            <div className="max-w-3xl mb-16">
                <span className="text-xs font-mono font-bold tracking-widest text-[#9B7545] uppercase block mb-3">
                    THREE CONNECTED CAPABILITIES // GROWTH INFRASTRUCTURE
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.06] mb-6">
                    Commercial growth requires{' '}
                    <span className="text-brass-gradient">connected infrastructure.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#65675F] leading-relaxed max-w-2xl font-normal">
                    When distribution, marketing, and sales software operate in silos, pipeline leaks at every handoff. We build three synchronized capabilities that connect demand directly to sales execution.
                </p>
            </div>

            {/*
              ── Accordion Row ──────────────────────────────────────────────
              Desktop: flex row — cards grow/shrink via flex-grow.
              Mobile:  flex column — cards stack, active card gains extra height.
            */}
            <div
                className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch"
                onMouseLeave={handleContainerLeave}
                style={{ minHeight: 320 }}
            >
                {CARDS.map((card) => (
                    <InfraCard
                        key={card.id}
                        card={card}
                        isExpanded={activeId === card.id}
                        onActivate={() => handleActivate(card.id)}
                        reducedMotion={reducedMotion}
                    />
                ))}
            </div>

            {/* Hint label — desktop only */}
            <p className="hidden sm:block mt-5 text-[11px] font-mono text-[#AAA99F] text-center tracking-wider">
                HOVER TO EXPLORE EACH SYSTEM
            </p>
            <p className="sm:hidden mt-5 text-[11px] font-mono text-[#AAA99F] text-center tracking-wider">
                TAP TO EXPLORE EACH SYSTEM
            </p>
        </section>
    )
}
