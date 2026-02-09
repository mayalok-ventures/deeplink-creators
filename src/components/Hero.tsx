'use client'

import { ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

const floatingOrbs = [
    {
        className: 'w-[500px] h-[500px] bg-primary-500/10',
        style: { left: '60%', top: '-10%' },
        animationDuration: '8s',
    },
    {
        className: 'w-[400px] h-[400px] bg-accent/10',
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

const Hero = () => {
    return (
        <section
            className="relative min-h-[90vh] flex items-center bg-dark text-white overflow-hidden"
        >
            {/* Grid Pattern Overlay - Engineering/Precision feel */}
            <div className="absolute inset-0 grid-bg animate-grid-pulse" />

            {/* Gradient Mesh Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-dark/60 pointer-events-none" />

            {/* Animated Floating Orbs */}
            {floatingOrbs.map((orb, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full blur-[120px] pointer-events-none animate-float-orb ${orb.className}`}
                    style={{ ...orb.style, animationDuration: orb.animationDuration }}
                />
            ))}

            {/* Main Content */}
            <div className="container-custom section-padding relative z-10">
                <div className="relative max-w-5xl">
                    {/* Outer glow */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-primary-500/20 via-accent/15 to-primary-500/20 rounded-3xl blur-sm pointer-events-none" />

                    <div className="relative glass-card rounded-3xl p-8 md:p-12 lg:p-16">
                        {/* Gold accent line at top */}
                        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Badge */}
                            <motion.div variants={itemVariants}>
                                <div className="inline-flex items-center gap-2.5 bg-primary-500/10 border border-primary-500/20 rounded-full px-5 py-2.5 mb-8 animate-glow-pulse">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                                    </span>
                                    <span className="text-sm font-medium text-paragraph tracking-wide">
                                        Best Digital Marketing Agency in Greater Noida & Noida
                                    </span>
                                </div>
                            </motion.div>

                            {/* Main Headline */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
                                    Ads pe paisa jala rahe ho?
                                </span>
                                <br />
                                <span className="text-heading">We Build </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-300">
                                    Revenue Machines
                                </span>
                                <br className="hidden md:block" />
                                <span className="text-heading">
                                    {' '}
                                    for Greater Noida Businesses
                                </span>
                            </motion.h1>

                            {/* Sub-headline */}
                            <motion.p
                                variants={itemVariants}
                                className="text-lg md:text-xl lg:text-2xl text-paragraph mb-10 max-w-2xl leading-relaxed"
                            >
                                The top SEO company in Greater Noida &amp; Noida. We don&apos;t deliver clicks — we deliver{' '}
                                <span className="font-semibold text-heading">
                                    customers, sales, and ROI
                                </span>{' '}
                                through SEO, performance marketing, and Google Ads.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-4 mb-14"
                            >
                                <a
                                    href="/contact"
                                    className="group relative inline-flex items-center justify-center gap-2 text-lg font-semibold py-4 px-10 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-dark transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,153,0.4)] hover:-translate-y-0.5"
                                >
                                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-500 to-accent-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                                    className="group relative inline-flex items-center justify-center gap-2 text-lg font-semibold py-4 px-10 rounded-xl bg-white/[0.04] text-heading border border-white/[0.1] transition-all duration-300 hover:bg-white/[0.08] hover:border-primary-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:-translate-y-0.5 backdrop-blur-sm"
                                >
                                    <Play
                                        size={20}
                                        className="group-hover:scale-110 transition-transform duration-300"
                                    />
                                    See Case Studies
                                </a>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
