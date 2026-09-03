'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

// ════════════════════════════════════════════════════════════════════════════
// 2-D WAVE SIMULATION
// Uses the classic "fast water" algorithm:
//   next[i] = 2*cur[i] - prev[i] + c² * laplacian(cur[i])
// Disturbances are injected at the cursor's grid position only,
// so waves propagate outward from that point — not uniformly.
// ════════════════════════════════════════════════════════════════════════════

const N = 52 // grid cells per dimension (keeps rAF fast)

class WaveSim {
    cur: Float32Array
    prev: Float32Array
    private d = 0.988 // damping per step (energy dissipates ~1.2%/step)

    constructor() {
        const len = N * N
        this.cur = new Float32Array(len)
        this.prev = new Float32Array(len)
    }

    step() {
        const { cur, prev, d } = this
        const c2 = 0.245 // wave speed² — must be < 0.5 for numerical stability

        for (let y = 1; y < N - 1; y++) {
            for (let x = 1; x < N - 1; x++) {
                const i = y * N + x
                const lap =
                    cur[i - 1] + cur[i + 1] +
                    cur[(y - 1) * N + x] + cur[(y + 1) * N + x] -
                    4 * cur[i]
                const next = 2 * cur[i] - prev[i] + c2 * lap
                prev[i] = cur[i]
                cur[i] = next * d
            }
        }
    }

    /** Inject a disturbance at normalised coordinates (0..1) */
    disturb(nx: number, ny: number, strength: number, radius = 3) {
        const gx = Math.round(Math.max(1, Math.min(N - 2, nx * (N - 1))))
        const gy = Math.round(Math.max(1, Math.min(N - 2, ny * (N - 1))))
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                const xi = gx + dx
                const yi = gy + dy
                if (xi < 1 || xi >= N - 1 || yi < 1 || yi >= N - 1) continue
                const d = Math.sqrt(dx * dx + dy * dy)
                if (d <= radius) {
                    this.cur[yi * N + xi] += strength * (1 - d / radius)
                }
            }
        }
    }

    /** Scatter several disturbances to fill the whole surface (used on activation) */
    burstGlobal(strength: number) {
        const pts = [
            [0.2, 0.3], [0.5, 0.2], [0.8, 0.3],
            [0.15, 0.7], [0.5, 0.75], [0.85, 0.65],
            [0.38, 0.5], [0.62, 0.45],
        ]
        for (const [x, y] of pts) {
            this.disturb(x, y, strength * (0.6 + Math.random() * 0.4), 5)
        }
    }

    maxAmp(): number {
        let m = 0
        const len = this.cur.length
        for (let i = 0; i < len; i++) {
            const a = Math.abs(this.cur[i])
            if (a > m) m = a
        }
        return m
    }

    /**
     * Render the height map as a water-surface sheen onto the canvas.
     * Uses the height gradient to compute surface normals, then a simple
     * specular+diffuse reflection with a light source.
     */
    paint(canvas: HTMLCanvasElement, dark: boolean) {
        const ctx = canvas.getContext('2d', { willReadFrequently: false })
        if (!ctx) return

        const w = canvas.width
        const h = canvas.height
        const img = ctx.createImageData(w, h)
        const data = img.data

        for (let py = 0; py < h; py++) {
            for (let px = 0; px < w; px++) {
                // Map pixel → grid cell (clamped)
                const gx = Math.min(N - 2, Math.floor((px / w) * N))
                const gy = Math.min(N - 2, Math.floor((py / h) * N))
                const i = gy * N + gx

                const h0 = this.cur[i]
                const dhx = this.cur[i + 1] - h0          // dH/dx
                const dhy = this.cur[(gy + 1) * N + gx] - h0 // dH/dy

                // Surface normal (scaled for visual impact)
                const sc = 10
                const nx_ = -dhx * sc
                const ny_ = -dhy * sc
                const nz_ = 1.0
                const nl = Math.sqrt(nx_ * nx_ + ny_ * ny_ + nz_ * nz_)

                // Light direction: top-left, slightly elevated
                const lx = 0.55, ly = -0.42, lz = 0.72
                const dot = (nx_ / nl) * lx + (ny_ / nl) * ly + (nz_ / nl) * lz
                const spec = Math.pow(Math.max(0, dot), 4) // tight specular lobe
                const diff = Math.max(0, dot)
                const amp  = Math.abs(h0)

                // Alpha: only visible where there are waves
                const alpha = Math.min(230, Math.floor(amp * 300 + spec * 180))

                const off = (py * w + px) * 4
                if (dark) {
                    // Dark card → warm brass/gold highlights
                    data[off]     = Math.min(255, Math.floor(spec * 240 + diff * 90))  // R
                    data[off + 1] = Math.min(255, Math.floor(spec * 185 + diff * 60))  // G
                    data[off + 2] = Math.min(255, Math.floor(spec * 70  + diff * 20))  // B
                } else {
                    // Light card → cool slate/olive shimmer on white
                    data[off]     = Math.min(255, Math.floor(spec * 80  + diff * 40))
                    data[off + 1] = Math.min(255, Math.floor(spec * 100 + diff * 55))
                    data[off + 2] = Math.min(255, Math.floor(spec * 60  + diff * 30))
                }
                data[off + 3] = alpha
            }
        }

        ctx.putImageData(img, 0, 0)
    }
}

// ════════════════════════════════════════════════════════════════════════════
// CARD DATA
// ════════════════════════════════════════════════════════════════════════════

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

// ════════════════════════════════════════════════════════════════════════════
// SINGLE CARD
// ════════════════════════════════════════════════════════════════════════════

interface CardProps {
    card: (typeof CARDS)[number]
    isActive: boolean
    anyActive: boolean
    onActivate: () => void
    noMotion: boolean
}

function LiquidCard({ card, isActive, anyActive, onActivate, noMotion }: CardProps) {
    const divRef    = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sim       = useRef(new WaveSim())
    const raf       = useRef<number | null>(null)
    const lastPtr   = useRef({ x: -1, y: -1, t: 0 })
    const wasActive = useRef(false)

    // ── animation loop ─────────────────────────────────────────────────────
    const startLoop = useCallback(() => {
        if (raf.current !== null) return

        const canvas = canvasRef.current
        const s = sim.current

        const tick = () => {
            s.step()

            if (canvas) {
                // Adaptive internal resolution: crisp wave fidelity at minimal CPU cost
                const clientW = canvas.clientWidth || 300
                const clientH = canvas.clientHeight || 200
                const aspect = clientW / clientH
                const targetH = 80
                const targetW = Math.round(Math.min(260, Math.max(80, targetH * aspect)))
                if (canvas.width !== targetW) canvas.width = targetW
                if (canvas.height !== targetH) canvas.height = targetH

                s.paint(canvas, card.dark)
            }

            if (s.maxAmp() > 0.002) {
                raf.current = requestAnimationFrame(tick)
            } else {
                // Settled — clear canvas completely
                if (canvas) {
                    const ctx = canvas.getContext('2d')
                    ctx?.clearRect(0, 0, canvas.width, canvas.height)
                }
                raf.current = null
            }
        }

        raf.current = requestAnimationFrame(tick)
    }, [card.dark])

    // Pointer enter: activate card & inject disturbance ONLY at cursor position
    const handlePointerEnter = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            onActivate()
            if (noMotion) return
            const el = divRef.current
            if (!el) return
            const r = el.getBoundingClientRect()
            const nx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
            const ny = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height))
            // Point ripple localized right at entry point
            sim.current.disturb(nx, ny, 0.85, 4)
            startLoop()
        },
        [onActivate, noMotion, startLoop]
    )

    // ── pointer move → inject disturbance at cursor position only ──────────
    const onPointerMove = useCallback(
        (e: PointerEvent) => {
            if (noMotion || !isActive) return
            const el = divRef.current
            if (!el) return

            const r  = el.getBoundingClientRect()
            const nx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
            const ny = Math.max(0, Math.min(1, (e.clientY - r.top)  / r.height))
            const t  = e.timeStamp

            const last = lastPtr.current
            if (last.x >= 0) {
                const dx   = (nx - last.x) * r.width
                const dy   = (ny - last.y) * r.height
                const dt   = Math.max(6, t - last.t)
                const spd  = Math.sqrt(dx * dx + dy * dy) / dt * 16 // px / frame
                const str  = Math.min(0.9, spd * 0.045)             // cap strength

                if (str > 0.008) {
                    sim.current.disturb(nx, ny, str, 3)
                    startLoop()
                }
            }

            lastPtr.current = { x: nx, y: ny, t }
        },
        [noMotion, isActive, startLoop]
    )

    useEffect(() => {
        const el = divRef.current
        if (!el) return
        el.addEventListener('pointermove', onPointerMove, { passive: true })
        return () => el.removeEventListener('pointermove', onPointerMove)
    }, [onPointerMove])

    // Reset cursor tracking when card deactivates
    useEffect(() => {
        if (!isActive) lastPtr.current = { x: -1, y: -1, t: 0 }
    }, [isActive])

    // Cleanup rAF on unmount
    useEffect(
        () => () => { if (raf.current) cancelAnimationFrame(raf.current) },
        []
    )

    const dark = card.dark

    return (
        <div
            ref={divRef}
            onPointerEnter={handlePointerEnter}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={card.title}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onActivate() }}
            style={{
                // ── Layout ──────────────────────────────────────────────────
                order: isActive ? -1 : 0,
                flex:  isActive ? '0 0 100%' : '1 1 0',
                minWidth: anyActive && !isActive ? 160 : 200,
                // ── Visual ──────────────────────────────────────────────────
                position: 'relative',
                overflow: 'hidden',          // ← clips canvas strictly to card
                transition: 'box-shadow 0.45s ease',
                boxShadow: isActive
                    ? dark
                        ? '0 28px 72px rgba(24,26,22,0.5)'
                        : '0 24px 60px rgba(155,117,69,0.22)'
                    : 'none',
            }}
            className={[
                'cursor-pointer select-none rounded-3xl border',
                dark
                    ? 'bg-[#181A16] border-[#181A16] text-[#F3F0E8]'
                    : 'bg-white border-[#181A16]/12 text-[#181A16]',
            ].join(' ')}
        >
            {/* ── Water-surface canvas (strictly clipped inside card) ───── */}
            {!noMotion && (
                <canvas
                    ref={canvasRef}
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width:  '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        // blend mode makes the ripple sheen sit ON TOP of the card colour
                        mixBlendMode: dark ? 'screen' : 'multiply',
                        opacity: 0.7,
                        zIndex: 1,
                        borderRadius: 'inherit',
                    }}
                />
            )}

            {/* ── Text content (above canvas) ──────────────────────────── */}
            <div
                className="relative p-7 sm:p-9 flex flex-col gap-4"
                style={{ zIndex: 2, minHeight: 264 }}
            >
                {/* Header pill */}
                <div className="flex items-center gap-3 shrink-0">
                    <span className={[
                        'text-3xl font-extrabold font-heading',
                        dark ? 'text-[#D4B270]' : 'text-[#9B7545]',
                    ].join(' ')}>
                        {card.num}
                    </span>
                    <span className={[
                        'text-[10px] font-mono font-bold tracking-widest uppercase border-l pl-3',
                        dark ? 'text-[#AAA99F] border-white/15' : 'text-[#65675F] border-[#181A16]/10',
                    ].join(' ')}>
                        {card.eyebrow}
                    </span>
                </div>

                {/* Title */}
                <h3 className={[
                    'font-extrabold font-heading tracking-tight leading-tight text-xl sm:text-2xl shrink-0',
                    dark ? 'text-white' : 'text-[#181A16]',
                ].join(' ')}>
                    {card.title}
                </h3>

                {/* Body */}
                <p className={[
                    'text-sm leading-relaxed shrink-0',
                    dark ? 'text-[#AAA99F]' : 'text-[#65675F]',
                ].join(' ')}>
                    {card.body}
                </p>

                {/* Expanded detail — fades in when active */}
                <p
                    className={[
                        'text-sm leading-relaxed shrink-0',
                        dark ? 'text-[#D4B270]/80' : 'text-[#9B7545]',
                    ].join(' ')}
                    style={{
                        opacity:   isActive ? 1 : 0,
                        maxHeight: isActive ? '5em' : '0',
                        overflow:  'hidden',
                        transition: 'opacity 0.5s 0.2s ease, max-height 0.5s 0.1s ease',
                    }}
                    aria-hidden={!isActive}
                >
                    {card.expandedLine}
                </p>

                <div className="mt-auto" />

                {/* CTA */}
                <div className={[
                    'shrink-0 border-t pt-4',
                    dark ? 'border-white/10' : 'border-[#181A16]/08',
                ].join(' ')}>
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

// ════════════════════════════════════════════════════════════════════════════
// SECTION
// ════════════════════════════════════════════════════════════════════════════

export default function ThreeSystemsSection() {
    const [activeId, setActiveId] = useState<string | null>(null)
    const noMotion = useReducedMotion() ?? false

    return (
        <section className="py-24 sm:py-32 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
            {/* Header */}
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
                    every handoff. We build three synchronized capabilities that connect demand directly
                    to sales execution.
                </p>
            </div>

            {/* Cards — flex-wrap accordion */}
            <div
                className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-5"
                onMouseLeave={() => setActiveId(null)}
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
                    />
                ))}
            </div>

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
