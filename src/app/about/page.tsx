'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, Target, Users, Zap, Shield, TrendingUp, ArrowRight, Award, Heart } from 'lucide-react'

const team = [
    {
        name: 'Amit Sharma',
        role: 'Founder & Neuro-Marketing Strategist',
        expertise: '12+ years in digital psychology',
        description: 'Former head of marketing for 3 tech startups. Specializes in conversion psychology.',
        color: 'from-primary-500 to-primary-600',
    },
    {
        name: 'Priya Verma',
        role: 'Head of Data Science',
        expertise: 'Data Analytics & AI',
        description: 'Ex-Google analyst. Builds predictive models for customer behavior.',
        color: 'from-purple-500 to-purple-600',
    },
    {
        name: 'Raj Patel',
        role: 'Lead Funnel Architect',
        expertise: 'Conversion Rate Optimization',
        description: 'Built funnels generating ₹50+ crore in revenue for clients.',
        color: 'from-green-500 to-green-600',
    },
    {
        name: 'Neha Gupta',
        role: 'Content Psychologist',
        expertise: 'Persuasive Copywriting',
        description: 'Specializes in writing that triggers buying decisions.',
        color: 'from-orange-500 to-orange-600',
    },
]

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
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:40px_40px]"></div>
                </div>

                <motion.div
                    className="absolute top-1/4 right-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
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
                        <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 rounded-full px-4 py-2 mb-6">
                            <Brain size={18} />
                            <span className="text-sm font-medium">Neuro-Marketing Specialists</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            We Combine <span className="text-secondary-400">Data Science</span> with{' '}
                            <span className="text-primary-300">Human Psychology</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                            Most agencies run ads. We analyze buying behavior, predict customer decisions, and build marketing systems that work like clockwork.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Our <span className="text-primary-600">Story</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-4">
                            Deeplink Creators was born from a simple frustration: businesses in Greater Noida were pouring money into marketing agencies and getting nothing but pretty reports in return.
                        </p>
                        <p className="text-lg text-gray-600 mb-4">
                            As a unit of <span className="font-semibold">Mayalok Venture</span>, we set out to build something different — a marketing company that combines the precision of <span className="font-semibold text-primary-600">Data Science</span> with the persuasion power of <span className="font-semibold text-primary-600">Neuro-Marketing</span>.
                        </p>
                        <p className="text-lg text-gray-600">
                            The result? Marketing systems that don't just attract eyeballs — they trigger buying decisions and deliver measurable revenue growth.
                        </p>
                    </motion.div>

                    {/* The Difference */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why We're <span className="text-primary-600">Different</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                The Problem with Traditional Marketing Agencies
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-500 mt-1">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">Focus on Vanity Metrics</h4>
                                        <p className="text-gray-700">
                                            They show you "likes", "shares", and traffic numbers that look good but don't fill your bank account.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-500 mt-1">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">One-Size-Fits-All Approach</h4>
                                        <p className="text-gray-700">
                                            Same strategy for every client, regardless of industry, audience, or business model.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-500 mt-1">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">Monthly Retainers with No ROI</h4>
                                        <p className="text-gray-700">
                                            You keep paying whether you get results or not. No skin in the game.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white"
                        >
                            <h3 className="text-2xl font-bold mb-6">Our Neuro-Marketing Approach</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <Brain size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Psychology-First Strategy</h4>
                                        <p className="text-primary-100">
                                            We study your customer's buying psychology before creating any campaigns.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Data-Driven Decisions</h4>
                                        <p className="text-primary-100">
                                            Every campaign is backed by data analysis and predictive modeling.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">ROI-Focused Reporting</h4>
                                        <p className="text-primary-100">
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
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our <span className="text-primary-600">Core Values</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                                className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <div className="text-primary-600">{value.icon}</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            The <span className="text-primary-600">Minds</span> Behind Your Revenue Growth
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We're not just marketers. We're psychologists, data scientists, and business strategists.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div
                                    className={`w-16 h-16 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4`}
                                >
                                    {member.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
                                <p className="text-primary-600 font-medium text-sm mb-2">{member.role}</p>
                                <p className="text-gray-700 text-sm mb-3">{member.expertise}</p>
                                <p className="text-gray-600 text-sm">{member.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Our <span className="text-primary-600">4-Step</span> Neuro-Marketing Process
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                                    className="bg-gray-50 rounded-xl p-6"
                                >
                                    <div className="text-3xl font-bold text-primary-600 mb-4">{process.step}</div>
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                                        <div className="text-primary-600">{process.icon}</div>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-3">{process.title}</h3>
                                    <p className="text-gray-600">{process.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Apply <span className="text-secondary-300">Neuro-Marketing</span> to Your Business?
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Stop guessing what works. Start using psychology and data to predictably grow your revenue.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8"
                            >
                                Book Psychology Audit
                                <Brain size={20} />
                            </Link>
                            <a
                                href="tel:+911234567890"
                                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-lg border border-white/30 transition-colors"
                            >
                                Speak With Our Strategist
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
