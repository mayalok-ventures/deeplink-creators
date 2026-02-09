'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Search, TrendingUp, Target, Globe, Zap, Shield, Award, Users, BarChart, Layers, Rocket, Star, Heart, MessageCircle, Code, Palette, Megaphone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
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
        <section id="services" className="section-padding bg-dark relative overflow-hidden">
            <div className="absolute inset-0 grid-bg" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-primary-500/5 via-accent/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-heading mb-4">
                        We Don&apos;t Sell Services. We{' '}
                        <span className="text-gradient">
                            Deliver Results
                        </span>
                        .
                    </h2>
                    <p className="text-xl text-paragraph max-w-3xl mx-auto">
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
            </div>
        </section>
    )
}

export default ServiceStack
