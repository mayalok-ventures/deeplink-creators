'use client'

import { useState, useEffect, ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import MaskRevealImage from '@/components/MaskRevealImage'
import LocationHero from '@/components/LocationHero'
import {
    ArrowRight, Target, BarChart3, Users,
    TrendingUp, Zap, Shield, Brain, Search, Layers, Rocket, Star, Heart,
    MessageCircle, Code, Palette, Megaphone, Mail, Globe, Award, CheckCircle2, Loader2,
    AlertTriangle, Lightbulb, MapPin, MonitorSmartphone
} from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import TechStack from '@/components/TechStack'
import SpotSection from '@/components/SpotSection'
import FAQSection from '@/components/FAQSection'
import { getServiceCardsByPage, ServiceCardData } from '@/lib/firestore'

const ICON_MAP: Record<string, ReactNode> = {
    Search: <Search size={32} />,
    TrendingUp: <TrendingUp size={32} />,
    Target: <Target size={32} />,
    Globe: <Globe size={32} />,
    Zap: <Zap size={32} />,
    Shield: <Shield size={32} />,
    Award: <Award size={32} />,
    Users: <Users size={32} />,
    BarChart: <BarChart3 size={32} />,
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

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
}

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

const processSteps = [
    {
        step: '01',
        title: 'Revenue Forensics',
        subtitle: 'Week 1–2',
        description: 'We dissect your current revenue architecture — every acquisition channel, every conversion metric, every margin leak. For real estate developers, we audit cost-per-site-visit and booking ratios. For legacy businesses, we map the digital opportunity gap your competitors are already exploiting.',
        icon: <Brain size={28} />,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        side: 'left' as const,
    },
    {
        step: '02',
        title: 'Architecture Deployment',
        subtitle: 'Week 3–6',
        description: 'We engineer your custom growth architecture — Local SEO infrastructure to dominate Lucknow search, performance marketing systems with real attribution, high-converting landing pages, and lead pipeline management. Every component drives measurable revenue, not vanity metrics.',
        icon: <Zap size={28} />,
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
        side: 'right' as const,
    },
    {
        step: '03',
        title: 'Profit Scaling',
        subtitle: 'Month 2+',
        description: 'Once the architecture is validated, we activate profit scaling — doubling down on channels driving qualified leads, eliminating underperforming spend, and systematically decreasing your customer acquisition cost while your competitors waste budgets on experiments.',
        icon: <TrendingUp size={28} />,
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop',
        side: 'left' as const,
    },
]

export default function LucknowPage() {
    const [services, setServices] = useState<ServiceCardData[]>([])
    const [loadingServices, setLoadingServices] = useState(true)
    const [formSubmitting, setFormSubmitting] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [budget, setBudget] = useState('')

    const processRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress: processScroll } = useScroll({
        target: processRef,
        offset: ['start end', 'end start']
    })
    const processLineHeight = useTransform(processScroll, [0.1, 0.8], ['0%', '100%'])

    useEffect(() => {
        getServiceCardsByPage('lucknow')
            .then(setServices)
            .catch(() => {})
            .finally(() => setLoadingServices(false))
    }, [])

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitting(true)
        try {
            const formData = new FormData(e.target as HTMLFormElement)
            formData.append('source', 'Lucknow Landing Page')
            const res = await fetch('https://formspree.io/f/mgolvknv', {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            })
            if (res.ok) {
                setFormSubmitted(true)
                ;(e.target as HTMLFormElement).reset()
                setBudget('')
            }
        } catch {}
        setFormSubmitting(false)
    }

    return (
        <>
            <LocationHero
                city="Lucknow"
                tagline="Real Estate, Education & Heritage Brands"
                subheadline="Revenue-Proven Growth Architecture."
                description="Lucknow's Gomti Nagar developers, Hazratganj coaching institutes, and heritage retail brands don't need 'social media management.' They need qualified lead pipelines, revenue-attributed tracking, and systematic market dominance — engineered by a team that proves ROI, not promises it."
                heroImage="/images/hero/lucknow-hero.webp"
            />

            <SpotSection />

            {/* LUCKNOW LOCAL CONTEXT SECTION */}
            <section data-anim="section-glow" className="section-padding bg-white relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 bg-[#C39A2B] rounded-full" />
                            <span className="text-sm font-medium text-paragraph">Lucknow&apos;s First-Mover Window</span>
                        </div>
                        <h2 data-anim="heading" className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-6">
                            Lucknow Is an Emerging Market With{' '}
                            <span className="text-gradient">First-Mover Advantages</span>
                            {' '}That Close Quickly
                        </h2>
                        <p className="text-lg text-paragraph mb-4 max-w-3xl">
                            Lucknow is at an inflection point. Hazratganj retail brands that thrived entirely on foot traffic and word-of-mouth for decades are now watching a new generation of buyers discover competitors on Google before they ever visit a store. Coaching institutes from the city are now competing nationally — against JEE factories in Kota and Hyderabad edtech platforms — for the same students who happen to be in Lucknow. The window to dominate Lucknow&apos;s digital landscape before it matures is open now, but it will not stay open.
                        </p>
                        <p className="text-lg text-paragraph mb-12 max-w-3xl">
                            IT City on Vibhuti Khand and the Amausi/UPSIDA industrial corridor represent two very different but equally underserved digital opportunity zones. Lucknow&apos;s growing startup ecosystem — primarily in tech services, edtech, and agri-processing — is building company brands without the SEO and content infrastructure that converts online visibility into inbound revenue. We have worked with businesses in this exact phase. The playbook exists. The only missing variable is whether your business will be the one that deploys it first.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {[
                            {
                                label: 'Traditional Businesses Going Digital',
                                letter: 'T',
                                color: '#C39A2B',
                                points: [
                                    'Hazratganj retail and heritage brands risk becoming invisible as buying decisions shift online — without disrupting their existing business',
                                    'Family enterprises with 30+ year offline track records need digital authority that reflects their credibility, not a new identity',
                                    'Local manufacturers in UPSIDA Amausi can reach national B2B buyers through systematic industrial SEO',
                                ],
                            },
                            {
                                label: 'Education & Coaching Sector',
                                letter: 'E',
                                color: '#4f8ef7',
                                points: [
                                    'IIT/NEET coaching institutes now compete nationally — Lucknow brands need SEO that captures intent across UP, Bihar, and Jharkhand',
                                    'Admission cycles are 60-90 day windows — performance marketing must activate at the right moment with precision targeting',
                                    'Ed-tech incumbents from Hyderabad and Bangalore are acquiring your students online — organic authority is your only durable defence',
                                ],
                            },
                            {
                                label: 'Lucknow\'s Startup Ecosystem',
                                letter: 'L',
                                color: '#2bc39a',
                                points: [
                                    'IT City on Vibhuti Khand is Lucknow\'s emerging tech hub — SaaS and services startups here need B2B lead systems, not brand-awareness campaigns',
                                    'Agri-processing and manufacturing startups in Lucknow can access government procurement and institutional buyers through targeted digital pipelines',
                                    'Early-stage companies benefit most from SEO investment — compound returns on organic content start accumulating from month 3 onwards',
                                ],
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                                className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-7 relative overflow-hidden"
                                data-anim="card"
                            >
                                <div
                                    className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                                    style={{ background: item.color }}
                                />
                                <div
                                    className="absolute bottom-3 right-4 text-[80px] font-black leading-none select-none pointer-events-none"
                                    style={{ color: item.color, opacity: 0.06 }}
                                >
                                    {item.letter}
                                </div>
                                <h3 className="text-lg font-heading font-bold text-heading mb-4 pl-2">{item.label}</h3>
                                <ul className="space-y-3 pl-2">
                                    {item.points.map((pt, j) => (
                                        <li key={j} className="flex items-start gap-2 text-paragraph text-sm">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* AGITATION SECTION */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8 }}
                className="section-padding relative overflow-hidden bg-[#FAFAF8]"
            >
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h2 data-anim="heading" className="text-2xl md:text-3xl font-extrabold text-heading mb-6">
                            Lucknow Has 300+ &quot;Digital Marketing Agencies.&quot;{' '}
                            <span className="text-red-400">None of Them Prove Revenue.</span>
                        </h2>
                        <p className="text-lg text-paragraph mb-12">
                            Gomti Nagar, Hazratganj, Aliganj — flooded with agencies making hollow promises at throwaway prices. You&apos;ve already burned capital on experiments that delivered vanity metrics. Your business needs proven systems that deliver accountable ROI, not another agency selling dreams.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -60, rotateY: 8 }}
                                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.8, ease }}
                                className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 hover:border-red-500/20 transition-colors duration-300 transform-gpu"
                            >
                                <div className="text-red-400 mb-6"><Users size={36} /></div>
                                <h3 className="font-bold text-xl mb-4 text-heading">What They Sell You</h3>
                                <ul className="text-paragraph text-left space-y-3">
                                    {['"Guaranteed rankings" that never materialize', 'Facebook boosts with zero lead attribution', '"SEO packages" with no measurable pipeline impact', 'WhatsApp broadcasts disguised as "demand generation"'].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-red-400 inline-flex mt-0.5 items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-xs font-bold flex-shrink-0">✗</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
                                className="relative z-10 p-8 rounded-2xl transform md:scale-105"
                            >
                                <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#B87A14] via-[#C39A2B] to-[#E0C27A] -z-10 opacity-80" />
                                <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#B87A14] via-[#C39A2B] to-[#E0C27A] -z-20 blur-md opacity-30" />
                                <div className="absolute inset-0 rounded-2xl bg-white -z-[5]" />
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#B87A14] to-[#E0C27A] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg tracking-wider"
                                >
                                    ★ OUR STANDARD
                                </motion.div>
                                <div className="text-[#C39A2B] mb-6"><Target size={36} /></div>
                                <h3 className="font-bold text-xl mb-4 text-heading">What We Engineer</h3>
                                <ul className="text-paragraph text-left space-y-3">
                                    {['Google Maps dominance across Lucknow micro-markets', 'Revenue-attributed campaign tracking with real ROI', 'Performance marketing systems with exact cost-per-lead', 'Conversion architectures built for Lucknow\'s premium buyers'].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-[#C39A2B] inline-flex mt-0.5 items-center justify-center w-5 h-5 rounded-full bg-[#C39A2B]/10 text-xs font-bold flex-shrink-0">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 60, rotateY: -8 }}
                                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.8, delay: 0.2, ease }}
                                className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 hover:border-[#C39A2B]/20 transition-colors duration-300 transform-gpu"
                            >
                                <div className="text-[#C39A2B] mb-6"><BarChart3 size={36} /></div>
                                <h3 className="font-bold text-xl mb-4 text-heading">The Outcome</h3>
                                <p className="text-paragraph text-left leading-relaxed">
                                    Not ads — revenue. We don&apos;t deliver PDF reports; we deliver measurable business outcomes. Whether you&apos;re a developer liquidating 200 units in Gomti Nagar or a coaching institute scaling to 500 admissions, every rupee is tracked to a qualified lead.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* PAIN POINTS SECTION */}
            <section className="section-padding bg-white relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 data-anim="heading" className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                            The Real Problems{' '}
                            <span className="text-gradient">Lucknow Businesses Face</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            These are the critical challenges that keep Lucknow&apos;s business leaders up at night — and no local agency has the architecture to solve them.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8">
                            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-400">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-heading mb-3">&quot;Digital Spend With Zero Measurable Return&quot;</h3>
                            <p className="text-paragraph">
                                You have a website, social media presence, and ongoing ad spend — but no qualified leads. The enquiries that trickle in are unqualified, and there is zero attribution between your spend and your revenue. Sound familiar?
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8">
                            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-400">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-heading mb-3">&quot;Every Agency Looks Identical — Because They Are&quot;</h3>
                            <p className="text-paragraph">
                                Local agencies promise everything at throwaway rates with zero differentiation. The result is always the same — no accountability, no tracking, and no provable business impact. You deserve a partner, not a vendor.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8">
                            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-400">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-heading mb-3">&quot;Burned by Agencies Before — Trust Deficit is Real&quot;</h3>
                            <p className="text-paragraph">
                                Hollow commitments, disappearing teams, and fabricated reports have eroded your confidence in digital marketing entirely. We understand the trust deficit — which is why every engagement is built on transparent tracking and provable outcomes.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8">
                            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-400">
                                <MonitorSmartphone size={24} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-heading mb-3">&quot;Will This Actually Work for Our Industry?&quot;</h3>
                            <p className="text-paragraph">
                                Your business has thrived on referrals and offline reputation for decades. The shift to digital feels unfamiliar and risky. We don&apos;t replace what works — we digitize your legacy, translating offline trust into online market dominance with zero disruption.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SOLUTION SECTION */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8 }}
                className="section-padding relative overflow-hidden bg-[#FAFAF8]"
            >
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 data-anim="heading" className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                            Our Solution:{' '}
                            <span className="text-gradient">Revenue Architecture for Lucknow</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            We don&apos;t run experiments with your capital. We deploy proven revenue systems engineered to capture Lucknow&apos;s high-intent local demand and convert it into qualified, trackable pipeline.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            {
                                icon: <MapPin size={24} />,
                                title: 'Local SEO & Maps',
                                description: 'Dominate Google Maps when someone searches for your service in Lucknow. Be the first business they see and call.',
                            },
                            {
                                icon: <Star size={24} />,
                                title: 'Reputation & Reviews',
                                description: 'Build a 4.8+ star rating that makes customers choose you over competitors. Automated review collection system.',
                            },
                            {
                                icon: <Target size={24} />,
                                title: 'Targeted Ad Campaigns',
                                description: 'Google & Meta Ads that target Lucknow buyers actively searching for your service. Every rupee tracked to a real lead.',
                            },
                            {
                                icon: <Rocket size={24} />,
                                title: 'High-Converting Pages',
                                description: 'Landing pages designed for Lucknow audiences that turn visitors into phone calls and WhatsApp enquiries.',
                            },
                        ].map((item, index) => (
                            <motion.div key={index} variants={fadeUp} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-6">
                                <div className="w-12 h-12 bg-[#C39A2B]/10 rounded-xl flex items-center justify-center mb-4 text-[#C39A2B]">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-heading font-bold text-heading mb-2">{item.title}</h3>
                                <p className="text-paragraph text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* SERVICES/PILLARS - Admin Controlled */}
            {services.length > 0 && (
                <section className="section-padding bg-white relative overflow-hidden">
                    <div className="container-custom relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 data-anim="heading" className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                                Revenue Pillars for{' '}
                                <span className="text-gradient">Lucknow Enterprises</span>
                            </h2>
                            <p className="text-lg text-paragraph max-w-3xl mx-auto">
                                Each service pillar is engineered as a standalone revenue system for Lucknow&apos;s diverse business ecosystem. Combined, they create compound growth that your competitors cannot replicate.
                            </p>
                        </motion.div>

                        <div className={`grid grid-cols-1 md:grid-cols-2 ${services.length <= 4 ? 'lg:grid-cols-' + Math.min(services.length, 4) : 'lg:grid-cols-3'} gap-6`}>
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
                                    imageUrl={service.imageUrl}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <TechStack />

            {/* HOW WE BUILD GROWTH SYSTEMS */}
            <section data-anim="section-glow" className="section-padding bg-white relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 data-anim="heading" className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                            How We Build{' '}
                            <span className="text-gradient">Revenue Architectures</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            A 3-phase system engineered to transform your Lucknow business from &quot;running experiments&quot; to &quot;operating a proven revenue machine.&quot;
                        </p>
                    </motion.div>

                    <div ref={processRef} className="relative max-w-5xl mx-auto mt-24">
                        {/* Animated vertical line */}
                        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#E8E6E1]">
                            <motion.div
                                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#C39A2B] to-[#D4AC55] origin-top"
                                style={{ height: processLineHeight }}
                            />
                        </div>

                        <div className="space-y-16 lg:space-y-32">
                            {processSteps.map((step, index) => (
                                <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${step.side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                                    {/* Content card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: step.side === 'left' ? -60 : 60 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-100px' }}
                                        transition={{ duration: 0.8, ease }}
                                        className="flex-1 transform-gpu"
                                    >
                                        <div className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 relative">
                                            <div className="text-6xl font-extrabold text-[#C39A2B]/8 absolute top-4 right-6 font-heading">{step.step}</div>
                                            <div className="w-14 h-14 bg-[#C39A2B]/10 rounded-xl flex items-center justify-center mb-6 text-[#C39A2B]">
                                                {step.icon}
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-[#C39A2B] mb-2 block">{step.subtitle}</span>
                                            <h3 className="text-2xl font-heading font-bold text-heading mb-3">{step.title}</h3>
                                            <p className="text-paragraph leading-relaxed">{step.description}</p>
                                        </div>
                                    </motion.div>

                                    {/* Center dot on timeline */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                                        className="hidden lg:flex w-12 h-12 rounded-full bg-white border-2 border-[#C39A2B] items-center justify-center z-10 flex-shrink-0 shadow-md"
                                    >
                                        <span className="text-sm font-extrabold text-[#C39A2B]">{step.step}</span>
                                    </motion.div>

                                    {/* Image */}
                                    <div className="flex-1 w-full">
                                        <MaskRevealImage
                                            src={step.image}
                                            alt={step.title}
                                            className="h-[280px] md:h-[360px] w-full"
                                            direction={step.side === 'left' ? 'right' : 'left'}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection
                title="Questions Lucknow&apos;s Business Leaders Ask Us"
                subtitle="Straight answers for legacy businesses and premium brands ready to dominate digitally."
                faqs={[
                    {
                        question: "The Lucknow market is very traditional. Will high-end digital marketing work here?",
                        answer: "The traditional nature of the market is your biggest advantage. Most of your local competitors have weak digital presences. By moving first with a heavy, data-driven SEO and Performance Marketing strategy, you can monopolize the digital space in Lucknow before it gets crowded."
                    },
                    {
                        question: "We want to expand our Lucknow-based business to the rest of UP and Delhi NCR. Can you help?",
                        answer: "Yes. That is exactly what our Revenue Systems are built for. We design hyper-targeted geographic ad campaigns to test new markets (like NCR) with minimal risk, establishing your brand presence and generating leads before you even open a physical office there."
                    },
                    {
                        question: "Do we need a massive budget to start dominating our local market?",
                        answer: "You don't need a massive budget; you need a precise one. We start by capturing the existing high-intent search traffic in Lucknow (people already looking for your services) to generate immediate cash flow, which can then be reinvested into larger brand-building campaigns."
                    },
                ]}
            />

            {/* EXIT-INTENT LEAD FORM */}
            <section id="apply" data-anim="section-glow" className="section-padding bg-[#0F1112] text-white relative overflow-hidden">

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <div className="inline-flex items-center gap-2 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-full px-5 py-2.5 mb-6">
                                <Shield size={16} className="text-[#C39A2B]" />
                                <span className="text-sm font-medium text-white/70">Limited to 5 New Clients Per Quarter</span>
                            </div>
                            <h2 data-anim="heading" className="text-2xl md:text-3xl font-extrabold font-heading mb-6">
                                Apply for a{' '}
                                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#B87A14] via-[#E0C27A] to-[#B87A14]">
                                    Revenue Architecture Session
                                </span>
                            </h2>
                            <p className="text-lg text-white/60 max-w-2xl mx-auto">
                                This isn&apos;t a &quot;free consultation.&quot; It&apos;s a 45-minute deep-dive where we reverse-engineer your profit target and map the exact growth system needed to hit it — with proof, not promises.
                            </p>
                        </motion.div>

                        {formSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#1A1B1C] border border-white/[0.08] rounded-2xl p-12 text-center"
                            >
                                <div className="w-16 h-16 bg-[#C39A2B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="text-[#C39A2B]" size={32} />
                                </div>
                                <h3 className="text-2xl font-extrabold font-heading mb-4">Application Received.</h3>
                                <p className="text-white/60 mb-6">Our revenue strategist will review your application and respond within 24 hours if you qualify.</p>
                                <button onClick={() => setFormSubmitted(false)} className="text-[#C39A2B] hover:text-[#A9791B] text-sm font-medium transition-colors">
                                    Submit another application
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                onSubmit={handleFormSubmit}
                                className="bg-[#1A1B1C] border border-white/[0.08] rounded-2xl p-8 md:p-12 space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
                                        <input type="text" name="name" required className="w-full px-4 py-3 bg-[#0F1112]/80 border border-white/[0.08] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#C39A2B]/50 focus:border-[#C39A2B]/50 transition-colors" placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Company *</label>
                                        <input type="text" name="company" required className="w-full px-4 py-3 bg-[#0F1112]/80 border border-white/[0.08] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#C39A2B]/50 focus:border-[#C39A2B]/50 transition-colors" placeholder="Company name" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Business Email *</label>
                                        <input type="email" name="email" required className="w-full px-4 py-3 bg-[#0F1112]/80 border border-white/[0.08] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#C39A2B]/50 focus:border-[#C39A2B]/50 transition-colors" placeholder="you@company.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Phone *</label>
                                        <input type="tel" name="phone" required className="w-full px-4 py-3 bg-[#0F1112]/80 border border-white/[0.08] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#C39A2B]/50 focus:border-[#C39A2B]/50 transition-colors" placeholder="+91 123 456 7890" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Industry *</label>
                                    <select name="industry" required className="w-full px-4 py-3 bg-[#0F1112]/80 border border-white/[0.08] rounded-lg text-white focus:ring-2 focus:ring-[#C39A2B]/50 focus:border-[#C39A2B]/50 transition-colors">
                                        <option value="" className="bg-[#0F1112]">Select industry</option>
                                        <option value="real-estate" className="bg-[#0F1112]">Real Estate / Development</option>
                                        <option value="coaching" className="bg-[#0F1112]">Education / Coaching Institutes</option>
                                        <option value="healthcare" className="bg-[#0F1112]">Healthcare / Super-Specialty Clinics</option>
                                        <option value="retail-dcc" className="bg-[#0F1112]">Heritage Retail / D2C / Jewellery</option>
                                        <option value="manufacturing" className="bg-[#0F1112]">Manufacturing / Industrial</option>
                                        <option value="family-business" className="bg-[#0F1112]">Legacy Family Enterprise</option>
                                        <option value="other" className="bg-[#0F1112]">Other Premium Business</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Monthly Marketing Investment *</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {[
                                            { value: '50k-1l', label: '₹50k – ₹1L', desc: 'Growth stage' },
                                            { value: '1l-3l', label: '₹1L – ₹3L', desc: 'Scaling stage' },
                                            { value: '3l-plus', label: '₹3L+', desc: 'Enterprise' },
                                        ].map((opt) => (
                                            <label
                                                key={opt.value}
                                                className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${budget === opt.value ? 'border-[#C39A2B]/50 bg-[#C39A2B]/10 ring-1 ring-[#C39A2B]/30' : 'border-white/[0.08] hover:border-white/[0.15] bg-[#0F1112]/50'}`}
                                            >
                                                <input type="radio" name="budget" value={opt.value} checked={budget === opt.value} onChange={(e) => setBudget(e.target.value)} className="sr-only" required />
                                                <span className="font-semibold text-white">{opt.label}</span>
                                                <span className="text-sm text-white/50 mt-1">{opt.desc}</span>
                                                {budget === opt.value && <div className="absolute top-2 right-2 w-3 h-3 bg-[#C39A2B] rounded-full" />}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">What&apos;s your current revenue target? *</label>
                                    <textarea
                                        name="challenge"
                                        rows={3}
                                        required
                                        className="w-full px-4 py-3 bg-[#0F1112]/80 border border-white/[0.08] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#C39A2B]/50 focus:border-[#C39A2B]/50 transition-colors"
                                        placeholder="Example: We are a real estate developer in Gomti Nagar with 200 unsold units. Current ad spend is ₹1.5L/month but site visit quality is poor. We need qualified buyer leads with trackable attribution."
                                    />
                                </div>

                                <input type="hidden" name="source" value="Lucknow Landing Page" />

                                <button
                                    type="submit"
                                    disabled={formSubmitting}
                                    data-anim="cta-pulse"
                                    className="w-full bg-gradient-to-r from-[#B87A14] to-[#E0C27A] text-white font-semibold py-4 px-8 rounded-xl hover:shadow-[0_0_30px_rgba(195,154,43,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
                                >
                                    {formSubmitting ? (
                                        <><Loader2 className="animate-spin" size={20} /> Processing...</>
                                    ) : (
                                        <>Submit Application <ArrowRight size={20} /></>
                                    )}
                                </button>
                                <p className="text-center text-sm text-white/40">
                                    We review every application. Only qualified businesses receive a response within 24 hours.
                                </p>
                            </motion.form>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
