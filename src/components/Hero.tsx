'use client'

import { ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const floatingOrbs = [
    {
        className: 'w-[500px] h-[500px] bg-[#C39A2B]/8',
        style: { left: '60%', top: '-10%' },
        animationDuration: '8s',
    },
    {
        className: 'w-[400px] h-[400px] bg-[#C39A2B]/5',
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
            className="relative min-h-[90vh] flex items-center bg-white dark:bg-[#0F1112] text-heading overflow-hidden"
        >
            {/* Hero Background Image */}
            <img
                src="/images/hero/home-hero.webp"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-25 pointer-events-none select-none"
            />

            {/* Grid Pattern Overlay - Engineering/Precision feel */}
            <div className="absolute inset-0 grid-bg animate-grid-pulse" />

            {/* Gradient Mesh Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/60 dark:from-[#0F1112]/90 dark:to-[#0F1112]/60 pointer-events-none" />

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
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-[#C39A2B]/15 via-[#E0C27A]/10 to-[#C39A2B]/15 rounded-3xl blur-sm pointer-events-none" />

                    <div className="relative glass-card rounded-3xl p-8 md:p-12 lg:p-16 !bg-[#F4F5F6]/70 dark:!bg-[#1A1B1C]/70 backdrop-blur-md">
                        {/* Gold accent line at top */}
                        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Badge */}
                            <motion.div variants={itemVariants}>
                                <div className="inline-flex items-center gap-2.5 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-full px-5 py-2.5 mb-8 animate-glow-pulse">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C39A2B] opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C39A2B]" />
                                    </span>
                                    <span className="text-sm font-medium text-paragraph tracking-wide">
                                        Best Digital Marketing Company in India
                                    </span>
                                </div>
                            </motion.div>

                            {/* Main Headline */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87A14] to-[#E0C27A]">
                                    Still Burning Money on Ads?
                                </span>
                                <br />
                                <span className="text-heading">We Build </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87A14] to-[#E0C27A]">
                                    Revenue Machines
                                </span>
                                <br className="hidden md:block" />
                                <span className="text-heading">
                                    {' '}
                                    for Businesses Across India
                                </span>
                            </motion.h1>

                            {/* Sub-headline */}
                            <motion.p
                                variants={itemVariants}
                                className="text-base md:text-lg lg:text-xl text-paragraph mb-10 max-w-2xl leading-relaxed"
                            >
                                The top performance marketing agency in India. We don&apos;t deliver clicks — we deliver{' '}
                                <span className="font-semibold text-heading">
                                    customers, revenue, and measurable ROI
                                </span>{' '}
                                through enterprise SEO, performance marketing, and lead generation.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-4 mb-14"
                            >
                                <Link
                                    href="/contact"
                                    className="group relative inline-flex items-center justify-center gap-2 text-base font-semibold py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#B87A14] to-[#E0C27A] text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(195,154,43,0.4)] hover:-translate-y-0.5"
                                >
                                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E0C27A] to-[#B87A14] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative flex items-center gap-2">
                                        Scale My Business
                                        <ArrowRight
                                            size={20}
                                            className="group-hover:translate-x-1 transition-transform duration-300"
                                        />
                                    </span>
                                </Link>
                                <Link
                                    href="/blog"
                                    className="group relative inline-flex items-center justify-center gap-2 text-base font-semibold py-3.5 px-8 rounded-xl bg-[#F4F5F6] dark:bg-white/[0.05] text-heading border border-[#4A4A4A]/15 dark:border-white/[0.1] transition-all duration-300 hover:bg-[#F4F5F6]/80 dark:hover:bg-white/[0.1] hover:border-primary-500/30 hover:shadow-[0_0_25px_rgba(195,154,43,0.15)] hover:-translate-y-0.5 backdrop-blur-sm"
                                >
                                    <Play
                                        size={20}
                                        className="group-hover:scale-110 transition-transform duration-300"
                                    />
                                    See Case Studies
                                </Link>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
