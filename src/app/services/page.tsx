'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    Search, TrendingUp, Target, Globe, ArrowRight, Award, Zap, Shield,
    Users, Star, Heart, MessageCircle, Code, Palette, Megaphone, Mail,
    BarChart, Layers, Rocket, CheckCircle2
} from 'lucide-react'
import { getVisibleServiceCards } from '@/lib/firestore'
import ScrollReveal from '@/components/ScrollReveal'

/* ─────────────────────────────── Icon map ─────────────────────────────── */
const ICON_MAP: Record<string, ReactNode> = {
    Search: <Search size={26} />,
    TrendingUp: <TrendingUp size={26} />,
    Target: <Target size={26} />,
    Globe: <Globe size={26} />,
    Zap: <Zap size={26} />,
    Shield: <Shield size={26} />,
    Award: <Award size={26} />,
    Users: <Users size={26} />,
    BarChart: <BarChart size={26} />,
    Layers: <Layers size={26} />,
    Rocket: <Rocket size={26} />,
    Star: <Star size={26} />,
    Heart: <Heart size={26} />,
    MessageCircle: <MessageCircle size={26} />,
    Code: <Code size={26} />,
    Palette: <Palette size={26} />,
    Megaphone: <Megaphone size={26} />,
    Mail: <Mail size={26} />,
}

/* ──────────────────────────── Types ──────────────────────────────────── */
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

/* ─────────────────── Static fallback (shown when Firestore is empty) ─── */
const FALLBACK_SERVICES: ServiceItem[] = [
    {
        icon: 'Search',
        title: 'Enterprise SEO',
        benefit: 'Rank #1, sustainably',
        description: 'Full-funnel technical and content SEO that compounds month-over-month — topical authority, schema, Core Web Vitals, and entity-based link acquisition.',
        features: ['Technical audit & remediation', 'Topical authority clusters', 'Core Web Vitals optimisation', 'Entity-based link building'],
        href: '/services/enterprise-seo/',
        gradient: 'from-amber-500 to-yellow-600',
    },
    {
        icon: 'TrendingUp',
        title: 'Performance Marketing',
        benefit: '3-5× ROAS, guaranteed',
        description: 'Meta Ads, Google PPC, and programmatic buying engineered for cost-per-sale, not just clicks. Every rupee tracked back to revenue.',
        features: ['Google Search & Performance Max', 'Meta & Instagram Ads', 'Programmatic display', 'Full attribution modelling'],
        href: '/services/performance-marketing/',
        gradient: 'from-orange-500 to-red-600',
    },
    {
        icon: 'Target',
        title: 'B2B Industrial Marketing',
        benefit: 'Pipeline, not just leads',
        description: 'Decision-maker targeting, LinkedIn ABM, and long-cycle nurture sequences built for complex B2B sales in manufacturing, SaaS, and infrastructure sectors.',
        features: ['LinkedIn ABM campaigns', 'Buyer-journey content', 'CRM integration & scoring', 'Intent-data prospecting'],
        href: '/services/b2b-industrial-marketing/',
        gradient: 'from-blue-500 to-indigo-600',
    },
    {
        icon: 'Palette',
        title: 'Brand Psychology',
        benefit: 'Neuro-driven brand equity',
        description: 'Identity systems built on cognitive science — colour psychology, typography hierarchy, and narrative frameworks that make your brand the default choice.',
        features: ['Neuro-marketing brand audit', 'Visual identity system', 'Brand voice & messaging', 'Omni-channel consistency'],
        href: '/services/brand-psychology/',
        gradient: 'from-purple-500 to-pink-600',
    },
    {
        icon: 'Code',
        title: 'Conversion Web Design',
        benefit: 'Design that sells',
        description: 'Landing pages and websites built around heat-mapping data, F-pattern reading flows, and psychographic CTAs — every pixel earns its place.',
        features: ['CRO-led UX design', 'A/B testing framework', 'Heatmap & session analysis', 'Speed & Core Web Vitals'],
        href: '/services/conversion-web-design/',
        gradient: 'from-teal-500 to-green-600',
    },
    {
        icon: 'BarChart',
        title: 'Analytics & Revenue Attribution',
        benefit: 'Know what drives profit',
        description: 'GA4, Looker Studio, and custom dashboards that connect ad spend to closed deals — surfacing the exact campaigns, pages, and keywords generating revenue.',
        features: ['GA4 & GTM implementation', 'Custom Looker Studio dashboards', 'Multi-touch attribution', 'Monthly revenue reports'],
        href: '/services/analytics/',
        gradient: 'from-cyan-500 to-blue-600',
    },
    {
        icon: 'Megaphone',
        title: 'Education Marketing',
        benefit: 'Fill seats, grow enrolments',
        description: 'Enrolment funnels, YouTube pre-roll, and counsellor CRM integrations for coaching institutes, ed-tech platforms, and universities in the NCR corridor.',
        features: ['Lead-gen landing pages', 'Enrolment funnel automation', 'YouTube & Google Ads', 'Counsellor CRM dashboards'],
        href: '/services/education-marketing/',
        gradient: 'from-rose-500 to-pink-600',
    },
    {
        icon: 'Globe',
        title: 'Real Estate Marketing',
        benefit: 'Qualified site-visit leads',
        description: 'RERA-compliant digital campaigns for builders, developers, and brokers — precision geo-targeting around your projects with CPL well below industry average.',
        features: ['Hyper-local geo targeting', 'RERA-compliant creatives', 'IVR + CRM integration', 'Virtual tour campaigns'],
        href: '/services/real-estate-marketing/',
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        icon: 'Zap',
        title: 'AI Marketing Automation',
        benefit: 'Scale without headcount',
        description: 'AI-powered lead scoring, chatbot funnels, and automated nurture sequences that keep your pipeline warm 24/7 without adding to your team size.',
        features: ['AI lead scoring', 'WhatsApp & email automation', 'Chatbot funnel design', 'Predictive campaign bidding'],
        href: '/services/ai-marketing-automation/',
        gradient: 'from-violet-500 to-purple-600',
    },
    {
        icon: 'Shield',
        title: 'Reputation & Review Management',
        benefit: 'Own your SERP narrative',
        description: 'Google Business Profile dominance, structured review acquisition, and negative-mention suppression so your brand is always trustworthy at the zero moment of truth.',
        features: ['Google Business optimisation', 'Review acquisition system', 'ORM monitoring & alerts', 'Competitor mention tracking'],
        href: '/services/',
        gradient: 'from-slate-500 to-gray-600',
    },
]

const whyChooseUs = [
    {
        icon: <Award size={28} />,
        title: 'ROI-First Methodology',
        stat: '4.2×',
        statLabel: 'average ROAS',
        description: 'We only measure what impacts your bank account. No vanity metrics — just revenue and profit growth.',
    },
    {
        icon: <Zap size={28} />,
        title: 'Neuro-Marketing Science',
        stat: '63%',
        statLabel: 'higher CVR vs. intuition-led',
        description: 'Data science + human psychology to create campaigns that trigger buying decisions, not just clicks.',
    },
    {
        icon: <Shield size={28} />,
        title: 'Transparent Reporting',
        stat: '100%',
        statLabel: 'dashboard access',
        description: 'Full real-time data. You always know exactly where your money goes and what it generates.',
    },
]

export default function ServicesPage() {
    const [services, setServices] = useState<ServiceItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getVisibleServiceCards()
            .then(cards => {
                if (cards.length > 0) {
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
                } else {
                    setServices(FALLBACK_SERVICES)
                }
            })
            .catch(() => setServices(FALLBACK_SERVICES))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            {/* ── Hero ── */}
            <section className="relative pt-32 pb-24 bg-white dark:bg-[#0F1112] text-heading overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <img src="/images/hero/hero-services.webp" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white dark:from-[#0F1112]/50 dark:via-[#0F1112]/80 dark:to-[#0F1112]" />
                </div>

                {/* floating orb */}
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
                            <span className="w-2 h-2 bg-[#C39A2B] rounded-full animate-pulse" />
                            <span className="text-sm font-medium">Revenue-Focused Digital Marketing</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 leading-tight">
                            Digital Marketing Services That Build{' '}
                            <span className="text-[#C39A2B]">Revenue Machines</span>
                        </h1>
                        <p className="text-lg text-paragraph mb-10 max-w-2xl mx-auto">
                            Enterprise SEO, performance marketing, and AI-powered lead generation — engineered to deliver customers, revenue, and measurable ROI.
                        </p>

                        {/* Trust bar */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-paragraph">
                            {['200+ Brands Grown', '₹50 Cr+ Ad Spend Managed', '4.2× Avg ROAS', 'Greater Noida · NCR'].map((t) => (
                                <div key={t} className="flex items-center gap-2">
                                    <CheckCircle2 size={15} className="text-[#C39A2B]" />
                                    <span>{t}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Services — Asymmetric Bespoke Grid ── */}
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    <ScrollReveal className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            Our <span className="text-[#C39A2B]">Core Services</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            Each service works independently or as part of a complete revenue system tailored to your business.
                        </p>
                    </ScrollReveal>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="w-8 h-8 border-2 border-[#C39A2B] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        /* Asymmetric masonry-style grid: 2-col with varying spans */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {services.map((service, index) => {
                                /* Featured cards: first one is tall/wide, every 7th card is wide */
                                const isFeatured = index === 0
                                const isWide = index === 6
                                const spanClass = isFeatured
                                    ? 'lg:col-span-2 lg:row-span-2'
                                    : isWide
                                    ? 'lg:col-span-2'
                                    : ''

                                return (
                                    <ScrollReveal
                                        key={index}
                                        delay={Math.min(index % 3, 2) * 80}
                                        direction="up"
                                        className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-[#1C1E20] border border-[#E5E7EB] dark:border-[#2A2D30] hover:border-[#C39A2B]/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${spanClass}`}
                                    >
                                        {/* Gradient top bar */}
                                        <div className={`h-1.5 w-full bg-gradient-to-r ${service.gradient}`} />

                                        {/* Featured card has a large image strip */}
                                        {isFeatured && service.imageUrl && (
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={service.imageUrl}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1C1E20] via-transparent to-transparent" />
                                            </div>
                                        )}

                                        <div className={`p-7 ${isFeatured ? 'md:p-10' : ''}`}>
                                            {/* Icon */}
                                            <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-5 text-white transition-transform duration-300 group-hover:scale-110 ${isFeatured && service.imageUrl ? '-mt-8 relative z-10 shadow-lg ring-2 ring-white/20' : ''}`}>
                                                {ICON_MAP[service.icon] ?? <Search size={26} />}
                                            </div>

                                            {/* Benefit badge */}
                                            <p className="text-xs font-semibold uppercase tracking-widest text-[#C39A2B] mb-2">{service.benefit}</p>

                                            <h3 className={`font-heading font-bold text-heading mb-3 ${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                                                {service.title}
                                            </h3>
                                            <p className={`text-paragraph mb-5 leading-relaxed ${isFeatured ? 'text-base' : 'text-sm'}`}>
                                                {service.description}
                                            </p>

                                            {/* Features list */}
                                            <ul className="space-y-1.5 mb-6">
                                                {service.features.slice(0, isFeatured ? 4 : 3).map((feat, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-paragraph">
                                                        <CheckCircle2 size={14} className="text-[#C39A2B] flex-shrink-0" />
                                                        {feat}
                                                    </li>
                                                ))}
                                            </ul>

                                            <Link
                                                href={service.href}
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C39A2B] hover:gap-3 transition-all duration-200"
                                            >
                                                Learn More <ArrowRight size={15} />
                                            </Link>
                                        </div>
                                    </ScrollReveal>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ── Why Choose Us — Stat-forward cards ── */}
            <section className="section-padding bg-white dark:bg-[#0F1112]">
                <div className="container-custom">
                    <ScrollReveal className="text-center mb-14">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            Why Choose <span className="text-[#C39A2B]">Deeplink Creators</span>?
                        </h2>
                        <p className="text-lg text-paragraph max-w-2xl mx-auto">
                            Here&apos;s what makes us different from every other agency.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {whyChooseUs.map((item, index) => (
                            <ScrollReveal key={index} delay={index * 100} direction="up">
                                <div className="glass-card rounded-2xl p-8 text-center hover:border-[#C39A2B]/40 transition-colors duration-300 border border-transparent">
                                    <div className="w-16 h-16 bg-[#C39A2B]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                        <div className="text-[#C39A2B]">{item.icon}</div>
                                    </div>
                                    <div className="text-4xl font-extrabold text-[#C39A2B] mb-1">{item.stat}</div>
                                    <div className="text-xs uppercase tracking-widest text-paragraph mb-4">{item.statLabel}</div>
                                    <h3 className="text-lg font-heading font-bold text-heading mb-2">{item.title}</h3>
                                    <p className="text-sm text-paragraph leading-relaxed">{item.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="relative section-padding bg-[#0F1112] text-white">
                <div className="absolute inset-0 grid-bg" />
                <div className="container-custom text-center relative z-10">
                    <ScrollReveal direction="up">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-6">
                            Not Sure Which Service You Need?{' '}
                            <span className="text-[#C39A2B]">Let&apos;s Talk.</span>
                        </h2>
                        <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                            Book a FREE strategy call with India&apos;s leading digital marketing experts. We&apos;ll build a custom plan based on your business goals and budget.
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
                    </ScrollReveal>
                </div>
            </section>
        </>
    )
}
