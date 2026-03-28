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
    imageUrl?: string
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop'

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
                imageUrl: c.imageUrl || FALLBACK_IMAGE,
            })))
        }).catch(() => {}).finally(() => setLoading(false))
    }, [])

    if (loading || services.length === 0) return null

    return (
        <section id="services" className="py-24 bg-[#FAFAF8] relative overflow-hidden">
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold font-space-grotesk mb-6 text-[#0F1112]">
                        We Don&apos;t Sell Services. We{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C39A2B] to-[#D4AC55]">
                            Deliver Results
                        </span>
                        .
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Every strategy is engineered with one goal: <span className="font-semibold text-[#0F1112]">maximizing revenue</span>.
                        No vanity metrics, only what actively compounds pipeline.
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[minmax(380px,auto)] gap-6">
                    {services.map((service, index) => {
                        const isFeatured = index === 0;
                        const colSpanClass = isFeatured ? 'lg:col-span-8' : 
                                            index === 1 ? 'lg:col-span-4' :
                                            index === 2 ? 'lg:col-span-4' : 'lg:col-span-8';

                        return (
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
                                imageUrl={service.imageUrl}
                                className={colSpanClass}
                            />
                        )
                    })}
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
                        className="inline-flex items-center gap-2 border border-[#E8E6E1] bg-white text-[#0F1112] font-semibold py-4 px-10 rounded-full hover:shadow-md hover:border-[#C39A2B]/40 transition-all duration-300 transform-gpu"
                    >
                        Explore All Ecosystems
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default ServiceStack
