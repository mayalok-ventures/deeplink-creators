'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, Target, Zap, Shield, TrendingUp, Award, Heart, ArrowRight } from 'lucide-react'

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

const founders = [
    {
        name: 'Kunal Pratap Singh',
        role: 'Founder & Strategy Lead',
        initials: 'KS',
        image: '/images/founders/kunal.webp',
        bio: "I didn\u2019t build Deeplink Creators to win design awards or sell \u2018creative ideas.\u2019 I built it because I saw traditional businesses in NCR bleeding capital to agencies that sold them illusions instead of revenue. My singular directive is to transition our clients into scalable, high-margin market leaders. I look at your business through one lens only: the P&L statement. If our strategy isn\u2019t aggressively multiplying your company\u2019s enterprise value and capturing market share, we aren\u2019t doing our job. We don\u2019t take on \u2018projects\u2019; we engineer financial assets.",
    },
    {
        name: 'Dileep Yadav',
        role: 'Co-Founder & Operations Head',
        initials: 'DY',
        image: '/images/founders/dileep.webp',
        bio: "Marketing without rigorous data science is just gambling with the client\u2019s money. My role is to strip the emotion out of the process and build the mathematical infrastructure behind every campaign we launch. I focus on ruthless execution\u2014tracking every rupee spent, plugging the leaks in your sales funnel, and optimizing the conversion architecture. While Kunal focuses on market dominance, my job is to ensure our internal systems make that growth predictable, trackable, and financially bulletproof.",
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeScale = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const slideFromLeft = {
    hidden: { opacity: 0, x: -60, rotateY: 6 },
    visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const slideFromRight = {
    hidden: { opacity: 0, x: 60, rotateY: -6 },
    visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const processSteps = [
    {
        step: '01',
        title: 'Psychology Audit',
        description: "We analyze your customer's buying psychology, fears, desires, and decision-making patterns.",
        icon: <Brain size={24} />,
    },
    {
        step: '02',
        title: 'Data Deep Dive',
        description: 'We examine your current marketing data to identify leaks in your revenue funnel.',
        icon: <TrendingUp size={24} />,
    },
    {
        step: '03',
        title: 'System Design',
        description: "We build a complete marketing system tailored to your customer's psychology.",
        icon: <Zap size={24} />,
    },
    {
        step: '04',
        title: 'Optimization Loop',
        description: 'Continuous testing and optimization based on real-time performance data.',
        icon: <Target size={24} />,
    },
]

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white text-heading overflow-hidden">
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <img src="/images/hero/hero-about.webp" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-flex items-center gap-2 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-full px-4 py-2 mb-6"
                        >
                            <Brain size={18} />
                            <span className="text-sm font-medium">Premier Revenue Engineering Firm in NCR</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 25, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="text-3xl md:text-5xl font-heading font-extrabold mb-6 leading-tight"
                        >
                            We Don&apos;t Guess. We{' '}
                            <span className="text-[#C39A2B]">Engineer Revenue.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="text-lg text-paragraph mb-8 max-w-3xl"
                        >
                            Deeplink Creators is an elite revenue-engineering unit of{' '}
                            <a href="https://mayalokventures.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#C39A2B] transition-colors">Mayalok Venture</a>.
                            We combine <span className="font-semibold text-[#C39A2B]">Data Science</span> and{' '}
                            <span className="font-semibold text-[#C39A2B]">Neuro-Marketing</span> to build predictable growth systems for Enterprise &amp; High-Ticket Businesses.
                        </motion.p>

                        {/* Animated gold line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '6rem' }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="h-[2px] bg-gradient-to-r from-[#C39A2B] to-[#C39A2B]/30"
                        />
                    </div>
                </div>
            </section>

            {/* Our Genesis */}
            <section data-anim="section-glow" className="section-padding bg-[#FAFAF8]">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="max-w-3xl mx-auto text-center mb-16"
                    >
                        <motion.h2
                            variants={fadeScale}
                            data-anim="heading"
                            className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-6"
                        >
                            Our <span className="text-[#C39A2B]">Genesis</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-base text-paragraph mb-4">
                            The digital marketing industry is broken. It is obsessed with vanity metrics — likes, shares, and meaningless traffic that never convert into actual capital.
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-base text-paragraph mb-4">
                            Deeplink Creators was launched with a singular, ruthless directive: <span className="font-semibold text-heading">To align marketing strictly with P&amp;L (Profit &amp; Loss).</span>
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-base text-paragraph">
                            Backed by the enterprise infrastructure of{' '}
                            <a href="https://mayalokventures.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#C39A2B] transition-colors">Mayalok Venture</a>,
                            we stripped away the &ldquo;fluff&rdquo; of traditional agencies. We replaced guesswork with <span className="font-semibold text-[#C39A2B]">Predictive Data Science</span>,
                            and basic copywriting with <span className="font-semibold text-[#C39A2B]">Consumer Psychology</span>. We don&apos;t build campaigns; we build scalable digital assets that capture market share.
                        </motion.p>
                    </motion.div>

                    {/* The Paradigm Shift */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 data-anim="heading" className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            The <span className="text-[#C39A2B]">Paradigm Shift</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            Why the old model is dead — and what we replaced it with.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
                        style={{ perspective: 1000 }}
                    >
                        <motion.div
                            variants={slideFromLeft}
                            data-anim="card"
                            className="rounded-2xl p-8 bg-red-500/[0.04] border border-red-500/20 transform-gpu"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                                    <Shield size={24} className="text-red-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-red-400">The Old Way</p>
                                    <h3 className="text-xl font-heading font-bold text-heading">The Traditional Agency</h3>
                                </div>
                            </div>
                            <p className="text-paragraph leading-relaxed">
                                Sells you &ldquo;Brand Awareness&rdquo; and monthly retainers with <span className="font-semibold text-red-400">zero accountability</span>.
                                You pay every month regardless of results. They hand you reports filled with impressions, reach, and follower counts — metrics that never touch your bank account. No skin in the game. No revenue alignment. Just invoices.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={slideFromRight}
                            data-anim="card"
                            className="rounded-2xl p-8 bg-[#C39A2B]/[0.04] border border-[#C39A2B]/30 relative transform-gpu"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -15, scale: 0.7 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
                                className="absolute -top-3 right-6 bg-gradient-to-r from-[#B87A14] to-[#E0C27A] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg tracking-wider"
                            >
                                THE DEEPLINK STANDARD
                            </motion.div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#C39A2B]/10 rounded-xl flex items-center justify-center">
                                    <Target size={24} className="text-[#C39A2B]" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-[#C39A2B]">Our Standard</p>
                                    <h3 className="text-xl font-heading font-bold text-heading">Market Dominance</h3>
                                </div>
                            </div>
                            <p className="text-paragraph leading-relaxed">
                                We sell <span className="font-semibold text-[#C39A2B]">Market Dominance</span>. We operate as your outsourced Growth Partner.
                                If a metric doesn&apos;t directly impact your <span className="font-semibold text-heading">Net Profit</span>, we don&apos;t track it.
                                Every rupee we spend is reverse-engineered from your revenue target. We align our success with yours — because that&apos;s the only model that builds long-term partnerships.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section data-anim="section-glow" className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 data-anim="heading" className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            Our <span className="text-[#C39A2B]">Core Values</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            The principles that guide everything we do for our clients.
                        </p>
                    </motion.div>

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
                                variants={fadeScale}
                                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(195,154,43,0.12), 0 8px 16px rgba(0,0,0,0.06)' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                data-anim="card"
                                className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 text-center transform-gpu cursor-default"
                            >
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-16 h-16 bg-[#C39A2B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                >
                                    <div className="text-[#C39A2B]">{value.icon}</div>
                                </motion.div>
                                <h3 className="text-xl font-heading font-bold text-heading mb-3">{value.title}</h3>
                                <p className="text-paragraph">{value.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section data-anim="section-glow" className="section-padding bg-[#FAFAF8]">
                <div className="container-custom">
                    <div className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 md:p-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 data-anim="heading" className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                                Our <span className="text-[#C39A2B]">4-Step</span> Neuro-Marketing Process
                            </h2>
                            <p className="text-lg text-paragraph max-w-3xl mx-auto">
                                How we turn your marketing into a predictable revenue machine
                            </p>
                        </motion.div>

                        {/* Connecting line */}
                        <div className="relative">
                            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-[#E8E6E1] z-0">
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-full bg-gradient-to-r from-[#C39A2B] via-[#C39A2B]/60 to-[#C39A2B] origin-left"
                                />
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
                            >
                                {processSteps.map((process, index) => (
                                    <motion.div
                                        key={index}
                                        variants={{
                                            hidden: { opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 },
                                            visible: {
                                                opacity: 1, x: 0, y: 0,
                                                transition: { duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
                                            },
                                        }}
                                        whileHover={{ y: -4 }}
                                        className="bg-[#F4F5F6] rounded-xl p-6 transform-gpu transition-shadow duration-300 hover:shadow-lg"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 + index * 0.15 }}
                                            className="text-3xl font-bold text-[#C39A2B] mb-4"
                                        >
                                            {process.step}
                                        </motion.div>
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
                </div>
            </section>

            {/* The Operators */}
            <section className="section-padding bg-[#0A0B0C] text-white relative overflow-hidden">
                {/* Animated background glow */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(195,154,43,0.06)_0%,transparent_70%)] animate-pulse" />
                </motion.div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '8rem' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#C39A2B]/50 to-transparent mb-8"
                        />
                        <motion.h2 variants={fadeScale} className="text-2xl md:text-3xl font-heading font-extrabold mb-4">
                            The <span className="text-[#C39A2B]">Operators</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-2xl mx-auto">
                            Driven by Enterprise Vision
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-base text-white/40 max-w-3xl mx-auto mt-4">
                            Deeplink Creators operates under the leadership of founders who understand that business is a numbers game.
                            We don&apos;t hire &ldquo;creative artists&rdquo;; we deploy data analysts and behavioral psychologists.
                            Our mandate is to transition traditional businesses in NCR into scalable, high-margin market leaders.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {founders.map((founder, index) => (
                            <motion.div
                                key={index}
                                variants={index === 0 ? slideFromLeft : slideFromRight}
                                whileHover={{ borderColor: 'rgba(195,154,43,0.3)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 transform-gpu"
                            >
                                <div className="flex items-center gap-5 mb-6">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#B87A14] to-[#E0C27A] flex items-center justify-center flex-shrink-0 overflow-hidden"
                                    >
                                        <img
                                            src={founder.image}
                                            alt={founder.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement
                                                target.style.display = 'none'
                                                target.parentElement!.innerHTML = `<span class="text-2xl font-extrabold text-white/90">${founder.initials}</span>`
                                            }}
                                        />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-xl font-heading font-bold text-white">{founder.name}</h3>
                                        <p className="text-sm font-semibold text-[#C39A2B] tracking-wide uppercase">{founder.role}</p>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-[1px] w-full bg-gradient-to-r from-[#C39A2B]/20 via-white/[0.06] to-transparent mb-6 origin-left"
                                />
                                <p className="text-white/50 leading-relaxed text-[15px]">{founder.bio}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative section-padding bg-[#0F1112] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(195,154,43,0.06)_0%,transparent_60%)]" />
                <div className="container-custom text-center relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '8rem' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#C39A2B] to-transparent mb-12"
                        />
                        <motion.h2
                            variants={fadeScale}
                            data-anim="heading"
                            className="text-2xl md:text-3xl font-heading font-extrabold mb-6"
                        >
                            Ready to Engineer{' '}
                            <span className="text-[#C39A2B]">Predictable Revenue?</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                            We don&apos;t take on every client. If you&apos;re serious about dominating your market and want a growth partner who operates on data, psychology, and ruthless execution — let&apos;s talk.
                        </motion.p>
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link
                                href="/contact"
                                data-anim="cta-pulse"
                                className="group relative bg-gradient-to-r from-[#B87A14] to-[#D4AC55] text-white font-bold py-4 px-9 rounded-full hover:shadow-2xl hover:shadow-[#C39A2B]/20 transition-all duration-300 inline-flex items-center justify-center gap-2 overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10">Book a Strategy Call</span>
                                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/services"
                                className="bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold py-4 px-8 rounded-full border border-white/[0.15] transition-all duration-300"
                            >
                                View Our Services
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
