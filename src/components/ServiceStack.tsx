'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Search, TrendingUp, Target, Globe, Zap, Shield, Award, Users, BarChart, Layers, Rocket, Star, Heart, MessageCircle, Code, Palette, Megaphone, Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ServiceCard from './ServiceCard'
import { getFeaturedServiceCards, ServiceCardData } from '@/lib/firestore'

const ICON_MAP: Record<string, ReactNode> = {
    Search: <Search size={32} />,
    TrendingUp: <TrendingUp size={32} />,
    Target: <Target size={32} />,
    Globe: <Globe size={32} />,
    Zap: <Zap size={32} />,
    Shield: <Shield size={32} />,
    Award: <Award size={32} />,
    Users: <Users size={32} />,
    BarChart: <BarChart size={32} />,
    Layers: <Layers size={32} />,
    Rocket: <Rocket size={32} />,
    Star: <Star size={32} />,
    Heart: <Heart size={32} />,
    MessageCircle: <MessageCircle size={32} />,
    Code: <Code size={32} />,
    Palette: <Palette size={32} />,
    Megaphone: <Megaphone size={32} />,
    Mail: <Mail size={32} />,
}

interface ServiceItem {
    icon: string
    title: string
    benefit: string
    description: string
    features: string[]
    cta: string
    href: string
    gradient: string
}

const ServiceStack = () => {
    const [services, setServices] = useState<ServiceItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getFeaturedServiceCards().then(cards => {
            setServices(cards.map(c => ({
                icon: c.icon,
                title: c.title,
                benefit: c.benefit,
                description: c.description,
                features: c.features,
                cta: c.cta,
                href: c.href,
                gradient: c.gradient,
            })))
        }).catch(() => {}).finally(() => setLoading(false))
    }, [])

    if (loading || services.length === 0) return null

    return (
        <section id="services" className="section-padding bg-white dark:bg-[#0F1112] relative overflow-hidden">
            <div className="absolute inset-0 grid-bg" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-[#C39A2B]/5 via-[#E0C27A]/5 to-[#C39A2B]/3 rounded-full blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                        We Don&apos;t Sell Services. We{' '}
                        <span className="text-gradient">
                            Deliver Results
                        </span>
                        .
                    </h2>
                    <p className="text-lg text-paragraph max-w-3xl mx-auto">
                        Every strategy is designed with one goal: <span className="font-semibold text-heading">maximize your revenue</span>.
                        No vanity metrics, only what actually impacts your bottom line.
                    </p>
                </motion.div>

                <div className={`grid grid-cols-1 md:grid-cols-2 ${services.length <= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={ICON_MAP[service.icon] || <Search size={32} />}
                            title={service.title}
                            benefit={service.benefit}
                            description={service.description}
                            features={service.features}
                            cta={service.cta}
                            href={service.href}
                            gradient={service.gradient}
                            index={index}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 bg-[#F4F5F6] dark:bg-white/[0.05] border border-[#4A4A4A]/15 dark:border-white/[0.1] text-heading font-semibold py-3 px-8 rounded-lg hover:bg-[#F4F5F6]/80 dark:hover:bg-white/[0.1] hover:border-[#C39A2B]/30 transition-all"
                    >
                        View All Services
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default ServiceStack
