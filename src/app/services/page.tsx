'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, TrendingUp, Target, Globe, ArrowRight, Award, Zap, Shield, Users } from 'lucide-react'

const services = [
    {
        icon: <Search size={28} />,
        title: 'SEO Services in Greater Noida',
        benefit: 'Dominate Google & Get Found by Buyers',
        description:
            'Our Neuro-SEO methodology targets high-intent keywords your customers are actually searching for. No fluff — only rankings that bring revenue.',
        features: [
            'Local SEO for Greater Noida businesses',
            'High-intent keyword targeting',
            'Google Business Profile optimization',
            'Technical SEO audits & fixes',
        ],
        href: '/services/seo-greater-noida',
        gradient: 'from-blue-500 to-primary-600',
    },
    {
        icon: <TrendingUp size={28} />,
        title: 'Performance Marketing',
        benefit: 'Ads That Pay for Themselves — and More',
        description:
            'We build data-driven ad campaigns on Google & Meta that generate qualified leads at the lowest possible cost. Every rupee is tracked.',
        features: [
            'Google & Meta Ads management',
            'Conversion-optimized funnels',
            'Retargeting & lookalike audiences',
            'Real-time ROI dashboards',
        ],
        href: '/services/performance-marketing',
        gradient: 'from-green-500 to-emerald-600',
    },
    {
        icon: <Globe size={28} />,
        title: 'Branding & Identity',
        benefit: 'Build a Brand People Trust & Remember',
        description:
            'From logo design to full brand strategy, we craft identities that make your business stand out in Greater Noida and beyond.',
        features: [
            'Brand strategy & positioning',
            'Visual identity & logo design',
            'Brand messaging & voice',
            'Social media branding',
        ],
        href: '/services/branding',
        gradient: 'from-purple-500 to-violet-600',
    },
]

const whyChooseUs = [
    {
        icon: <Award size={28} />,
        title: 'ROI-First Methodology',
        description:
            'We only measure what impacts your bank account. No vanity metrics, no fluff — just revenue and profit growth.',
    },
    {
        icon: <Zap size={28} />,
        title: 'Neuro-Marketing Science',
        description:
            'We combine data science with human psychology to create campaigns that trigger buying decisions, not just clicks.',
    },
    {
        icon: <Shield size={28} />,
        title: 'Transparent Reporting',
        description:
            'Full access to dashboards and real-time data. You always know exactly where your money goes and what it generates.',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ServicesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:40px_40px]"></div>
                </div>

                <motion.div
                    className="absolute top-1/3 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium">Full-Service Digital Marketing</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Services That Build{' '}
                            <span className="text-secondary-400">Revenue Machines</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            We don't sell "packages." We design custom marketing systems engineered to deliver leads, sales, and measurable ROI for your business.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/20 max-w-3xl mx-auto">
                            <div>
                                <div className="text-2xl font-bold text-secondary-400">300%</div>
                                <div className="text-sm text-gray-400">Average ROI</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-secondary-400">₹2Cr+</div>
                                <div className="text-sm text-gray-400">Revenue Generated</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-secondary-400">50+</div>
                                <div className="text-sm text-gray-400">Businesses Served</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-secondary-400">100%</div>
                                <div className="text-sm text-gray-400">ROI-Focused</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our <span className="text-primary-600">Core Services</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Each service is designed to work independently or as part of a complete revenue system tailored to your business.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -8 }}
                                className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                                <div className="p-8">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                    <p className="text-primary-600 font-semibold mb-4">{service.benefit}</p>
                                    <p className="text-gray-600 mb-6">{service.description}</p>

                                    <ul className="space-y-2 mb-8">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-gray-700 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={service.href}
                                        className="inline-flex items-center gap-2 text-primary-600 font-semibold group/btn"
                                    >
                                        Learn More
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose <span className="text-primary-600">Deeplink Creators</span>?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We're not like other agencies. Here's what makes us different.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <div className="text-primary-600">{item.icon}</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-primary-700 to-primary-600 text-white">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Not Sure Which Service You Need?{' '}
                            <span className="text-secondary-300">Let's Talk.</span>
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Book a FREE strategy call and we'll build a custom plan based on your business goals, audience, and budget.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8"
                            >
                                Get FREE Strategy Call
                                <ArrowRight size={20} />
                            </Link>
                            <a
                                href="tel:+911234567890"
                                className="bg-white text-primary-700 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Call Now: +91 123 456 7890
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
