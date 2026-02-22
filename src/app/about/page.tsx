'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, Target, Users, Zap, Shield, TrendingUp, Award, Heart } from 'lucide-react'

const values = [
    {
        icon: <Target size={24} />,
        title: 'Revenue Over Vanity',
        description: "We only track metrics that hit your bottom line. Likes don't pay bills — leads and sales do.",
    },
    {
        icon: <Heart size={24} />,
        title: 'Client-First Always',
        description: 'We treat your budget like our own. Every campaign is designed for maximum return.',
    },
    {
        icon: <Award size={24} />,
        title: 'Radical Transparency',
        description: 'No hidden fees, no jargon-filled reports. You see exactly what we do and what it delivers.',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white dark:bg-[#0F1112] text-heading overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <img src="/images/hero/hero-about.webp" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white dark:from-[#0F1112]/50 dark:via-[#0F1112]/80 dark:to-[#0F1112]" />
                </div>

                <motion.div
                    className="absolute top-1/4 right-10 w-64 h-64 bg-[#C39A2B]/8 rounded-full blur-3xl"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-full px-4 py-2 mb-6">
                            <Brain size={18} />
                            <span className="text-sm font-medium">Best Digital Marketing Company in India</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-heading font-extrabold mb-6 leading-tight">
                            We Combine <span className="text-[#C39A2B]">Data Science</span> with{' '}
                            <span className="text-[#C39A2B]">Human Psychology</span>
                        </h1>
                        <p className="text-lg text-paragraph mb-8 max-w-3xl">
                            Most digital marketing agencies run ads blindly. As India&apos;s leading revenue-focused digital marketing company, we analyze buying behavior, predict customer decisions, and build marketing systems that work like clockwork.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-6">
                            Our <span className="text-[#C39A2B]">Story</span>
                        </h2>
                        <p className="text-base text-paragraph mb-4">
                            Deeplink Creators was born from a simple frustration: businesses across India were pouring money into digital marketing agencies and getting nothing but pretty reports in return.
                        </p>
                        <p className="text-base text-paragraph mb-4">
                            As a unit of <a href="https://mayalokventures.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#C39A2B] transition-colors">Mayalok Venture</a>, we set out to build the best digital marketing company in India — one that combines the precision of <span className="font-semibold text-[#C39A2B]">Data Science</span> with the persuasion power of <span className="font-semibold text-[#C39A2B]">Neuro-Marketing</span> to deliver enterprise SEO services and ROI-focused performance marketing.
                        </p>
                        <p className="text-base text-paragraph">
                            The result? Marketing systems that don't just attract eyeballs — they trigger buying decisions and deliver measurable revenue growth.
                        </p>
                    </motion.div>

                    {/* The Difference */}
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            Why We're <span className="text-[#C39A2B]">Different</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            We don't just follow marketing trends. We understand why they work at a psychological level.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
                    >
                        <motion.div variants={fadeUp}>
                            <h3 className="text-2xl font-heading font-bold text-heading mb-6">
                                The Problem with Traditional Marketing Agencies
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-red-500/10 rounded-lg">
                                    <div className="text-red-400 mt-1">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-heading mb-2">Focus on Vanity Metrics</h4>
                                        <p className="text-paragraph">
                                            They show you "likes", "shares", and traffic numbers that look good but don't fill your bank account.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-red-500/10 rounded-lg">
                                    <div className="text-red-400 mt-1">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-heading mb-2">One-Size-Fits-All Approach</h4>
                                        <p className="text-paragraph">
                                            Same strategy for every client, regardless of industry, audience, or business model.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-red-500/10 rounded-lg">
                                    <div className="text-red-400 mt-1">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-heading mb-2">Monthly Retainers with No ROI</h4>
                                        <p className="text-paragraph">
                                            You keep paying whether you get results or not. No skin in the game.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="glass-card rounded-2xl p-8 text-heading border-[#C39A2B]/30"
                        >
                            <h3 className="text-2xl font-heading font-bold mb-6">Our Neuro-Marketing Approach</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/[0.08] p-3 rounded-lg">
                                        <Brain size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Psychology-First Strategy</h4>
                                        <p className="text-paragraph">
                                            We study your customer's buying psychology before creating any campaigns.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/[0.08] p-3 rounded-lg">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Data-Driven Decisions</h4>
                                        <p className="text-paragraph">
                                            Every campaign is backed by data analysis and predictive modeling.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/[0.08] p-3 rounded-lg">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">ROI-Focused Reporting</h4>
                                        <p className="text-paragraph">
                                            We only measure what impacts your revenue. Clear, profit-focused metrics.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            Our <span className="text-[#C39A2B]">Core Values</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            The principles that guide everything we do for our clients.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                className="glass-card rounded-2xl p-8 text-center"
                            >
                                <div className="w-16 h-16 bg-[#C39A2B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <div className="text-[#C39A2B]">{value.icon}</div>
                                </div>
                                <h3 className="text-xl font-heading font-bold text-heading mb-3">{value.title}</h3>
                                <p className="text-paragraph">{value.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section-padding bg-white dark:bg-[#0F1112]">
                <div className="container-custom">
                    <div className="glass-card rounded-2xl p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                                Our <span className="text-[#C39A2B]">4-Step</span> Neuro-Marketing Process
                            </h2>
                            <p className="text-lg text-paragraph max-w-3xl mx-auto">
                                How we turn your marketing into a predictable revenue machine
                            </p>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {[
                                {
                                    step: '01',
                                    title: 'Psychology Audit',
                                    description:
                                        "We analyze your customer's buying psychology, fears, desires, and decision-making patterns.",
                                    icon: <Brain size={24} />,
                                },
                                {
                                    step: '02',
                                    title: 'Data Deep Dive',
                                    description:
                                        'We examine your current marketing data to identify leaks in your revenue funnel.',
                                    icon: <TrendingUp size={24} />,
                                },
                                {
                                    step: '03',
                                    title: 'System Design',
                                    description:
                                        "We build a complete marketing system tailored to your customer's psychology.",
                                    icon: <Zap size={24} />,
                                },
                                {
                                    step: '04',
                                    title: 'Optimization Loop',
                                    description:
                                        'Continuous testing and optimization based on real-time performance data.',
                                    icon: <Target size={24} />,
                                },
                            ].map((process, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeUp}
                                    className="bg-[#F4F5F6] dark:bg-[#1A1B1C] rounded-xl p-6"
                                >
                                    <div className="text-3xl font-bold text-[#C39A2B] mb-4">{process.step}</div>
                                    <div className="w-12 h-12 bg-[#C39A2B]/10 rounded-lg flex items-center justify-center mb-4">
                                        <div className="text-[#C39A2B]">{process.icon}</div>
                                    </div>
                                    <h3 className="font-heading font-bold text-heading text-lg mb-3">{process.title}</h3>
                                    <p className="text-paragraph">{process.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative section-padding bg-[#0F1112] text-white">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="container-custom text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-6">
                            Ready to Apply <span className="text-[#C39A2B]">Neuro-Marketing</span> to Your Business?
                        </h2>
                        <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                            Whether you need enterprise SEO services, performance marketing expertise, or a complete digital marketing strategy for your business — start using psychology and data to predictably grow your revenue.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="btn-secondary inline-flex items-center justify-center gap-2 text-base py-3.5 px-8"
                            >
                                Book Psychology Audit
                                <Brain size={20} />
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-white/[0.08] hover:bg-white/[0.1] text-white font-semibold py-4 px-8 rounded-lg border border-white/[0.1] transition-colors"
                            >
                                Speak With Our Strategist
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
