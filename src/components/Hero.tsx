'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

const useCountUp = (end: number, duration: number, startOnView: boolean) => {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
        if (!startOnView || hasStarted) return
        setHasStarted(true)

        let startTime: number | null = null
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [startOnView, end, duration, hasStarted])

    return count
}

const trustIndicators = [
    { end: 300, suffix: '%', label: 'Average ROI' },
    { end: 24, suffix: 'h', label: 'Response Time' },
    { prefix: '₹', end: 2, suffix: 'Cr+', label: 'Revenue Generated' },
    { end: 100, suffix: '%', label: 'ROI-Focused' },
]

const floatingOrbs = [
    {
        className: 'w-[500px] h-[500px] bg-primary-500/20',
        style: { left: '60%', top: '-10%' },
        animationDuration: '8s',
    },
    {
        className: 'w-[400px] h-[400px] bg-secondary-500/15',
        style: { left: '-10%', top: '50%' },
        animationDuration: '10s',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    },
}

const TrustStat = ({
    item,
    inView,
}: {
    item: (typeof trustIndicators)[number]
    inView: boolean
}) => {
    const count = useCountUp(item.end, 2, inView)

    return (
        <div className="text-center sm:text-left group">
            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-emerald-400">
                {item.prefix ?? ''}
                {count}
                {item.suffix}
            </div>
            <div className="text-sm text-gray-400 mt-1">{item.label}</div>
        </div>
    )
}

const Hero = () => {
    const statsRef = useRef<HTMLDivElement>(null)
    const statsInView = useInView(statsRef, { once: true, margin: '-50px' })

    return (
        <section
            className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-950 via-gray-900 to-primary-700/80 text-white overflow-hidden"
        >
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.07]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            {/* Gradient Mesh Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/40 pointer-events-none" />

            {/* Animated Floating Orbs */}
            {floatingOrbs.map((orb, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full blur-[100px] pointer-events-none animate-float-orb ${orb.className}`}
                    style={{ ...orb.style, animationDuration: orb.animationDuration }}
                />
            ))}

            {/* Main Content */}
            <div className="container-custom section-padding relative z-10">
                {/* Gradient Border Glow Container */}
                <div className="relative max-w-5xl">
                    {/* Outer glow */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-purple-500/20 rounded-3xl blur-sm pointer-events-none" />
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-purple-500/10 rounded-3xl pointer-events-none" />

                    <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 border border-white/[0.06]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Badge */}
                            <motion.div variants={itemVariants}>
                                <div className="inline-flex items-center gap-2.5 bg-primary-600/15 border border-primary-500/25 rounded-full px-5 py-2.5 mb-8 animate-glow-pulse">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                    </span>
                                    <span className="text-sm font-medium text-gray-200 tracking-wide">
                                        Serving Greater Noida Businesses
                                    </span>
                                </div>
                            </motion.div>

                            {/* Main Headline */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-primary-500">
                                    Ads pe paisa jala rahe ho?
                                </span>
                                <br />
                                <span className="text-white">We Build </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-emerald-400">
                                    Revenue Machines
                                </span>
                                <br className="hidden md:block" />
                                <span className="text-white">
                                    {' '}
                                    for Greater Noida Businesses
                                </span>
                            </motion.h1>

                            {/* Sub-headline */}
                            <motion.p
                                variants={itemVariants}
                                className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
                            >
                                We don&apos;t deliver clicks. We deliver{' '}
                                <span className="font-semibold text-white">
                                    customers, sales, and growth
                                </span>
                                .
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-4 mb-14"
                            >
                                <a
                                    href="/contact"
                                    className="group relative inline-flex items-center justify-center gap-2 text-lg font-semibold py-4 px-10 rounded-xl bg-gradient-to-r from-secondary-500 to-secondary-600 text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-0.5"
                                >
                                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative flex items-center gap-2">
                                        Scale My Business
                                        <ArrowRight
                                            size={20}
                                            className="group-hover:translate-x-1 transition-transform duration-300"
                                        />
                                    </span>
                                </a>
                                <a
                                    href="#case-studies"
                                    className="group relative inline-flex items-center justify-center gap-2 text-lg font-semibold py-4 px-10 rounded-xl bg-white/[0.06] text-white border border-white/[0.12] transition-all duration-300 hover:bg-white/[0.12] hover:border-white/25 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:-translate-y-0.5 backdrop-blur-sm"
                                >
                                    <Play
                                        size={20}
                                        className="group-hover:scale-110 transition-transform duration-300"
                                    />
                                    See Case Studies
                                </a>
                            </motion.div>

                            {/* Trust Indicators */}
                            <motion.div
                                ref={statsRef}
                                variants={itemVariants}
                                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/[0.08]"
                            >
                                {trustIndicators.map((item, i) => (
                                    <TrustStat
                                        key={i}
                                        item={item}
                                        inView={statsInView}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
