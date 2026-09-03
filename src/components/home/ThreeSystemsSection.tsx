'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

// ── Card Data ────────────────────────────────────────────────────────────────

const CARDS = [
    {
        id: 'software',
        num: '01',
        eyebrow: 'PROPRIETARY OPERATING SOFTWARE',
        title: 'Sahyak CRM: Sales Visibility & Pipeline Control.',
        body: 'A sales operations suite engineered for qualification stage gates, rules-based rep routing, and complete activity accountability across the entire deal lifecycle.',
        expandedLine:
            'Every inbound lead is qualified, routed automatically, and tracked from first touch to closed deal — eliminating the visibility gaps that cost pipeline.',
        href: 'https://sahyak.com',
        external: true,
        ctaLabel: 'Explore Sahyak Platform',
        dark: true,
    },
    {
        id: 'distribution',
        num: '02',
        eyebrow: 'CREATOR-LED DISTRIBUTION',
        title: 'Direct Market Access & Niche Reach.',
        body: 'Managed creator distribution networks connecting businesses directly to targeted local and niche audiences, reducing reliance on volatile ad network algorithms.',
        expandedLine:
            'Creator-led distribution gives your brand a direct channel into specific buyer communities without paying for reach you do not need.',
        href: '/services/social-commerce/',
        external: false,
        ctaLabel: 'Explore Creator Distribution',
        dark: false,
    },
    {
        id: 'demand',
        num: '03',
        eyebrow: 'DEMAND & GROWTH SYSTEMS',
        title: 'Performance, SEO & Conversion Infrastructure.',
        body: 'High-intent search acquisition, SEO, conversion-focused web architecture, and automated lead routing synchronized directly into sales pipelines.',
        expandedLine:
            'Every channel — organic, paid, or content-driven — connects back into Sahyak, creating a measurable closed-loop growth system.',
        href: '/services/',
        external: false,
        ctaLabel: 'Explore Growth Systems',
        dark: false,
    },
] as const

// ── Per-card fluid state (kept in refs — zero React re-renders) ──────────────

interface Fluid {
    energy: number   // accumulated disturbance energy [0..1.5]
    vx: number       // cursor velocity X (px/ms scaled)
    vy: number       // cursor velocity Y
    posX: number     // normalized cursor X [0..1] within card
    posY: number     // normalized cursor Y [0..1] within card
    lastX: number    // prev cursor X (normalized)
    lastY: number    // prev cursor Y
    lastT: number    // timestamp of last update
    rafId: number | null
}

function makeFluid(): Fluid {
    return { energy: 0, vx: 0, vy: 0, posX: 0.5, posY: 0.5, lastX: -1, lastY: -1, lastT: 0, rafId: null }
}

// ── Single card component ────────────────────────────────────────────────────

interface LiquidCardProps {
    card: (typeof CARDS)[number]
    isActive: boolean
    anyActive: boolean
    onActivate: () => void
    noMotion: boolean
    uid: string
}

function LiquidCard({ card, isActive, anyActive, onActivate, noMotion, uid }: LiquidCardProps) {
    const divRef = useRef<HTMLDivElement>(null)
    const fl = useRef<Fluid>(makeFluid())

    // Unique IDs for SVG filter elements — accessed via getElementById to avoid TS SVGElement ref issues
    const filterId = `${uid}-${card.id}`
    const turbId = `${filterId}-turb`
    const dispId = `${filterId}-disp`

    // ── rAF animation loop: updates SVG filter attributes ──────────────────
    const tick = useCallback(() => {
        const f = fl.current
        const turb = document.getElementById(turbId)
        const disp = document.getElementById(dispId)
        if (!turb || !disp) { f.rafId = null; return }

        const now = performance.now()
        const dt = Math.min((now - f.lastT) / 1000, 0.05)
        f.lastT = now

        // Natural decay — energy and velocity dissipate
        const eDec = 2.6
        const vDec = 5.0
        f.energy = Math.max(0, f.energy - f.energy * eDec * dt)
        f.vx = f.vx > 0
            ? Math.max(0, f.vx - f.vx * vDec * dt)
            : Math.min(0, f.vx - f.vx * vDec * dt)
        f.vy = f.vy > 0
            ? Math.max(0, f.vy - f.vy * vDec * dt)
            : Math.min(0, f.vy - f.vy * vDec * dt)

        const speed = Math.sqrt(f.vx * f.vx + f.vy * f.vy)

        // Map fluid state to SVG parameters
        const dispScale = Math.min(38, f.energy * 26 + speed * 14)
        // baseFrequency varies spatially with cursor position + energy
        const bfx = (0.006 + f.posX * 0.007 + f.energy * 0.016).toFixed(4)
        const bfy = (0.008 + f.posY * 0.006 + f.energy * 0.016).toFixed(4)
        // Seed drifts with cursor position for organic variation
        const seed = String(Math.floor(f.posX * 11 + f.posY * 9 + f.energy * 7) % 50)

        turb.setAttribute('baseFrequency', `${bfx} ${bfy}`)
        turb.setAttribute('seed', seed)
        disp.setAttribute('scale', dispScale.toFixed(1))

        // Stop loop when fully settled
        if (f.energy < 0.004 && speed < 0.004) {
            disp.setAttribute('scale', '1.5')
            turb.setAttribute('baseFrequency', '0.005 0.007')
            f.rafId = null
            return
        }

        f.rafId = requestAnimationFrame(tick)
    }, [turbId, dispId])

    const startLoop = useCallback(() => {
        const f = fl.current
        if (f.rafId !== null) return
        f.lastT = performance.now()
        f.rafId = requestAnimationFrame(tick)
    }, [tick])

    // ── Pointer move handler ────────────────────────────────────────────────
    const onPointerMove = useCallback(
        (e: PointerEvent) => {
            if (noMotion) return
            const el = divRef.current
            if (!el) return

            const rect = el.getBoundingClientRect()
            const px = (e.clientX - rect.left) / rect.width
            const py = (e.clientY - rect.top) / rect.height
            const f = fl.current
            const now = performance.now()
            const dt = Math.max(4, now - f.lastT) // clamp to avoid div/0

            if (f.lastX >= 0) {
                // Convert pixel delta to speed (px/frame at 60fps equivalent)
                const dx = (px - f.lastX) * rect.width
                const dy = (py - f.lastY) * rect.height
                const spd = Math.sqrt(dx * dx + dy * dy) / dt * 16

                f.vx = (dx / dt) * 16
                f.vy = (dy / dt) * 16

                // Inject energy proportional to cursor speed
                f.energy = Math.min(1.5, f.energy + spd * 0.02)
            }

            f.posX = Math.max(0.01, Math.min(0.99, px))
            f.posY = Math.max(0.01, Math.min(0.99, py))
            f.lastX = px
            f.lastY = py

            startLoop()
        },
        [noMotion, startLoop]
    )

    // ── Register pointer move on the DOM element (not React synthetic, for perf) ──
    useEffect(() => {
        const el = divRef.current
        if (!el) return
        el.addEventListener('pointermove', onPointerMove, { passive: true })
        return () => el.removeEventListener('pointermove', onPointerMove)
    }, [onPointerMove])

    // ── Inject burst of energy when this card becomes active ───────────────
    useEffect(() => {
        if (isActive && !noMotion) {
            const f = fl.current
            f.energy = Math.max(f.energy, 0.9)
            f.lastX = -1 // reset position tracking so first move registers cleanly
            startLoop()
        }
    }, [isActive, noMotion, startLoop])

    // ── Cleanup rAF on unmount ───────────────────────────────────────────────
    useEffect(() => {
        return () => {
            const f = fl.current
            if (f.rafId !== null) {
                cancelAnimationFrame(f.rafId)
                f.rafId = null
            }
        }
    }, [])

    const dark = card.dark

    return (
        <div
            ref={divRef}
            onPointerEnter={onActivate}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={card.title}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onActivate()
            }}
            style={{
                // ── Layout ─────────────────────────────────────────────────
                // Active: snaps to full width, floated to top via order:-1
                // Inactive with an active sibling: split the row below
                // Default (no active): all three equal
                order: isActive ? -1 : 0,
                flex: isActive ? '0 0 100%' : '1 1 0',
                minWidth: anyActive && !isActive ? 180 : 220,
                // ── Visual ─────────────────────────────────────────────────
                filter: noMotion ? 'none' : `url(#${filterId})`,
                boxShadow: isActive
                    ? dark
                        ? '0 28px 72px rgba(24,26,22,0.5)'
                        : '0 24px 60px rgba(155,117,69,0.22)'
                    : 'none',
                willChange: 'filter',
                // allow filter overflow to bleed beyond card bounds (liquid edges)
                overflow: 'visible',
                transition: 'box-shadow 0.4s ease',
            }}
            className={[
                'relative cursor-pointer select-none rounded-3xl border',
                dark
                    ? 'bg-[#181A16] border-[#181A16] text-[#F3F0E8]'
                    : 'bg-white border-[#181A16]/12 text-[#181A16]',
            ].join(' ')}
        >
            {/* ── SVG Filter Definition (hidden, zero-size) ──────────────── */}
            {!noMotion && (
                <svg
                    aria-hidden="true"
                    focusable="false"
                    style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
                >
                    <defs>
                        <filter
                            id={filterId}
                            x="-10%"
                            y="-10%"
                            width="120%"
                            height="120%"
                            colorInterpolationFilters="sRGB"
                        >
                            <feTurbulence
                                id={turbId}
                                type="fractalNoise"
                                baseFrequency="0.005 0.007"
                                numOctaves="3"
                                seed="2"
                                result="noise"
                            />
                            <feDisplacementMap
                                id={dispId}
                                in="SourceGraphic"
                                in2="noise"
                                scale="1.5"
                                xChannelSelector="R"
                                yChannelSelector="G"
                            />
                        </filter>
                    </defs>
                </svg>
            )}

            {/* ── Card Content ───────────────────────────────────────────── */}
            <div
                className="p-7 sm:p-9 flex flex-col gap-4 rounded-3xl"
                style={{
                    // Clip content to card bounds even though the outer div has overflow:visible
                    overflow: 'hidden',
                    minHeight: 264,
                }}
            >
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

                {/* Title */}
                <h3
                    className={[
                        'font-extrabold font-heading tracking-tight leading-tight text-xl sm:text-2xl shrink-0',
                        dark ? 'text-white' : 'text-[#181A16]',
                    ].join(' ')}
                >
                    {card.title}
                </h3>

                {/* Body */}
                <p
                    className={[
                        'text-sm leading-relaxed shrink-0',
                        dark ? 'text-[#AAA99F]' : 'text-[#65675F]',
                    ].join(' ')}
                >
                    {card.body}
                </p>

                {/* Expanded detail — fades in when active */}
                <p
                    className={[
                        'text-sm leading-relaxed shrink-0',
                        dark ? 'text-[#D4B270]/80' : 'text-[#9B7545]',
                    ].join(' ')}
                    style={{
                        opacity: isActive ? 1 : 0,
                        maxHeight: isActive ? '4em' : '0',
                        overflow: 'hidden',
                        transition: 'opacity 0.5s 0.2s ease, max-height 0.5s 0.1s ease',
                    }}
                    aria-hidden={!isActive}
                >
                    {card.expandedLine}
                </p>

                <div className="mt-auto" />

                {/* CTA */}
                <div
                    className={[
                        'shrink-0 border-t pt-4',
                        dark ? 'border-white/10' : 'border-[#181A16]/08',
                    ].join(' ')}
                >
                    {card.external ? (
                        <a
                            href={card.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={[
                                'inline-flex items-center gap-2 text-xs font-heading font-bold transition-colors',
                                dark ? 'text-[#D4B270] hover:text-white' : 'text-[#181A16] hover:text-[#9B7545]',
                            ].join(' ')}
                        >
                            <span>{card.ctaLabel}</span>
                            <ArrowUpRight size={13} />
                        </a>
                    ) : (
                        <Link
                            href={card.href}
                            onClick={(e) => e.stopPropagation()}
                            className={[
                                'inline-flex items-center gap-2 text-xs font-heading font-bold transition-colors',
                                dark ? 'text-[#D4B270] hover:text-white' : 'text-[#181A16] hover:text-[#9B7545]',
                            ].join(' ')}
                        >
                            <span>{card.ctaLabel}</span>
                            <ArrowRight
                                size={13}
                                className={dark ? 'text-[#D4B270]' : 'text-[#9B7545]'}
                            />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

// ── Main Section ─────────────────────────────────────────────────────────────

export default function ThreeSystemsSection() {
    const [activeId, setActiveId] = useState<string | null>(null)
    const noMotion = useReducedMotion() ?? false
    // Stable UID for filter IDs (avoid SSR mismatch by using a static prefix)
    const uid = 'dlc-liq'

    const handleContainerLeave = useCallback(() => {
        setActiveId(null)
    }, [])

    return (
        <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
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
                    When distribution, marketing, and sales software operate in silos, pipeline leaks at
                    every handoff. We build three synchronized capabilities that connect demand directly to
                    sales execution.
                </p>
            </div>

            {/*
              ── Flex-wrap accordion ──────────────────────────────────────────
              Default: three cards side-by-side (flex: 1 1 0 each)
              Active:  active card → flex: 0 0 100% + order:-1 (wraps to its own top row)
                       inactive cards → flex: 1 1 0 (split the row below naturally)

              The layout SNAPS (no CSS transition on flex-basis) because the
              liquid distortion on the active card provides the visual continuity.
            */}
            <div
                className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-5"
                onMouseLeave={handleContainerLeave}
                style={{ alignItems: 'stretch' }}
            >
                {CARDS.map((card) => (
                    <LiquidCard
                        key={card.id}
                        card={card}
                        isActive={activeId === card.id}
                        anyActive={activeId !== null}
                        onActivate={() => setActiveId(card.id)}
                        noMotion={noMotion}
                        uid={uid}
                    />
                ))}
            </div>

            {/* Hint */}
            <p
                className="mt-5 text-[11px] font-mono text-[#AAA99F] text-center tracking-wider"
                aria-live="polite"
            >
                {activeId
                    ? 'MOVE CURSOR \u2014 FLUID RESPONDS TO MOTION'
                    : 'HOVER TO EXPLORE EACH SYSTEM'}
            </p>
        </section>
    )
}
