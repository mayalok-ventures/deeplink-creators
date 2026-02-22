'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, TrendingUp, Target, Globe, ArrowRight, Award, Zap, Shield, Users, Star, Heart, MessageCircle, Code, Palette, Megaphone, Mail, BarChart, Layers, Rocket } from 'lucide-react'
import { getVisibleServiceCards } from '@/lib/firestore'

const ICON_MAP: Record<string, ReactNode> = {
    Search: <Search size={28} />,
    TrendingUp: <TrendingUp size={28} />,
    Target: <Target size={28} />,
    Globe: <Globe size={28} />,
    Zap: <Zap size={28} />,
    Shield: <Shield size={28} />,
    Award: <Award size={28} />,
    Users: <Users size={28} />,
    BarChart: <BarChart size={28} />,
    Layers: <Layers size={28} />,
    Rocket: <Rocket size={28} />,
    Star: <Star size={28} />,
    Heart: <Heart size={28} />,
    MessageCircle: <MessageCircle size={28} />,
    Code: <Code size={28} />,
    Palette: <Palette size={28} />,
    Megaphone: <Megaphone size={28} />,
    Mail: <Mail size={28} />,
}

interface ServiceItem {
    icon: string
    title: string
    benefit: string
    description: string
    features: string[]
    href: string
    gradient: string
    imageUrl?: string
}

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
    const [services, setServices] = useState<ServiceItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getVisibleServiceCards().then(cards => {
            setServices(cards.map(c => ({
                icon: c.icon,
                title: c.title,
                benefit: c.benefit,
                description: c.description,
                features: c.features,
                href: c.href,
                gradient: c.gradient,
                imageUrl: c.imageUrl,
            })))
        }).catch(() => {}).finally(() => setLoading(false))
    }, [])

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white dark:bg-[#0F1112] text-heading overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <img src="/images/hero/hero-services.webp" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white dark:from-[#0F1112]/50 dark:via-[#0F1112]/80 dark:to-[#0F1112]" />
                </div>

                <motion.div
                    className="absolute top-1/3 right-10 w-72 h-72 bg-[#C39A2B]/8 rounded-full blur-3xl"
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
                        <div className="inline-flex items-center gap-2 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 bg-[#C39A2B] rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium">Best Digital Marketing Company in India</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 leading-tight">
                            Digital Marketing Services in India That Build{' '}
                            <span className="text-[#C39A2B]">Revenue Machines</span>
                        </h1>
                        <p className="text-lg text-paragraph mb-8 max-w-2xl mx-auto">
                            The top digital marketing company in India. We design custom marketing systems — enterprise SEO, Google Ads, PPC, performance marketing, and lead generation — engineered to deliver customers, revenue, and measurable ROI for your business.
                        </p>


                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            Our <span className="text-[#C39A2B]">Core Services</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            Each service is designed to work independently or as part of a complete revenue system tailored to your business.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-[#C39A2B] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : services.length === 0 ? (
                        <p className="text-center text-paragraph text-lg">Services coming soon.</p>
                    ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className={`grid grid-cols-1 ${services.length === 1 ? 'lg:grid-cols-1 max-w-xl mx-auto' : services.length === 2 ? 'lg:grid-cols-2 max-w-4xl mx-auto' : 'lg:grid-cols-3'} gap-8`}
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -8 }}
                                className="group glass-card-hover rounded-2xl overflow-hidden"
                            >
                                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                                {service.imageUrl && (
                                    <div className="relative h-48 overflow-hidden">
                                        <motion.img
                                            src={service.imageUrl}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            initial={{ scale: 1.1, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#131415] via-transparent to-transparent opacity-80" />
                                    </div>
                                )}
                                <div className="p-8">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 ${service.imageUrl ? '-mt-8 relative z-10 shadow-lg ring-2 ring-white/20' : ''}`}>
                                        {ICON_MAP[service.icon] || <Search size={28} />}
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-heading mb-2">{service.title}</h3>
                                    <p className="text-[#C39A2B] font-semibold mb-4">{service.benefit}</p>
                                    <p className="text-paragraph mb-6">{service.description}</p>

                                    <ul className="space-y-2 mb-8">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-[#C39A2B] rounded-full"></div>
                                                <span className="text-paragraph text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={service.href}
                                        className="inline-flex items-center gap-2 text-[#C39A2B] font-semibold group/btn"
                                    >
                                        Learn More
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            Why Choose <span className="text-[#C39A2B]">Deeplink Creators</span>?
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            The best digital marketing company in India. Here&apos;s what makes us different from other agencies.
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
                                className="glass-card rounded-2xl p-8 text-center"
                            >
                                <div className="w-16 h-16 bg-[#C39A2B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <div className="text-[#C39A2B]">{item.icon}</div>
                                </div>
                                <h3 className="text-xl font-heading font-bold text-heading mb-3">{item.title}</h3>
                                <p className="text-paragraph">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
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
                            Not Sure Which Service You Need?{' '}
                            <span className="text-[#C39A2B]">Let's Talk.</span>
                        </h2>
                        <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                            Book a FREE strategy call with India&apos;s leading digital marketing experts. We&apos;ll build a custom plan — SEO, Google Ads, or performance marketing — based on your business goals and budget.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="btn-secondary inline-flex items-center justify-center gap-2 text-base py-3.5 px-8"
                            >
                                Get FREE Strategy Call
                                <ArrowRight size={20} />
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold py-4 px-8 rounded-lg border border-white/[0.1] transition-colors"
                            >
                                Schedule a Call
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
