'use client'

import { useState, useEffect, ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import MaskRevealImage from '@/components/MaskRevealImage'
import LocationHero from '@/components/LocationHero'
import {
    ArrowRight, Target, BarChart3, Users,
    TrendingUp, Zap, Shield, Brain, Search, Layers, Rocket, Star, Heart,
    MessageCircle, Code, Palette, Megaphone, Mail, Globe, Award, CheckCircle2, Loader2
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
        description: 'We dissect your current revenue architecture — every acquisition channel, every retention metric, every margin leak. For D2C brands, we audit ROAS, LTV, and unit economics. For legacy businesses, we map the digital opportunity gap your competitors are already exploiting.',
        icon: <Brain size={28} />,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        side: 'left' as const,
    },
    {
        step: '02',
        title: 'Architecture Deployment',
        subtitle: 'Week 3–6',
        description: 'We engineer your custom growth architecture — performance marketing systems with real attribution, brand authority frameworks, retention-focused email and WhatsApp flows, and conversion assets built to command premium pricing.',
        icon: <Zap size={28} />,
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
        side: 'right' as const,
    },
    {
        step: '03',
        title: 'Profit Scaling',
        subtitle: 'Month 2+',
        description: 'Once the architecture is validated, we activate profit scaling — optimizing for margin not just revenue, building brand moats that reduce CAC over time, and systematically increasing customer lifetime value while your competitors race to the bottom.',
        icon: <TrendingUp size={28} />,
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop',
        side: 'left' as const,
    },
]

export default function DelhiPage() {
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
        getServiceCardsByPage('delhi')
            .then(setServices)
            .catch(() => {})
            .finally(() => setLoadingServices(false))
    }, [])

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitting(true)
        try {
            const formData = new FormData(e.target as HTMLFormElement)
            formData.append('source', 'Delhi Landing Page')
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
                city="Delhi"
                tagline="D2C Brands & Legacy Businesses"
                subheadline="Revenue-Proven Growth Architecture."
                description="Delhi's South Delhi, Okhla, and Naraina corridors are home to legacy businesses ready for digital transformation, and premium D2C brands whose Meta Ads ROAS is bleeding dry. We build high-margin retention architectures, brand authority systems, and independent enterprise lead engines that prove revenue — not promise it."
                heroImage="/images/hero/delhi-hero.webp"
            />

            <SpotSection />

            {/* DELHI LOCAL CONTEXT SECTION */}
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
                            <span className="text-sm font-medium text-paragraph">Delhi&apos;s Enterprise Market Reality</span>
                        </div>
                        <h2 data-anim="heading" className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-6">
                            Delhi&apos;s High-Ticket Clients Demand{' '}
                            <span className="text-gradient">Enterprise-Grade Marketing</span>
                            {' '}— Not Agency Templates
                        </h2>
                        <p className="text-lg text-paragraph mb-4 max-w-3xl">
                            South Delhi&apos;s premium business belt — Greater Kailash, Vasant Kunj, Saket, and Defence Colony — houses India&apos;s most discerning B2C buyers and a dense concentration of high-value B2B buyers. Connaught Place&apos;s professional services corridor includes law firms, chartered accountancy practices, management consulting firms, and boutique investment offices that do not respond to standard performance marketing playbooks. They respond to authority, precision, and verifiable proof.
                        </p>
                        <p className="text-lg text-paragraph mb-12 max-w-3xl">
                            Okhla&apos;s industrial and commercial belt is simultaneously one of Delhi&apos;s busiest B2B procurement hubs and one of the most underserved in terms of digital infrastructure. Manufacturers, exporters, and trading companies in Okhla Phase I, II, and III still rely almost entirely on relationships and trade shows — while their international competitors use LinkedIn ABM and SEO to win contracts before the relationship even starts. This is the window that revenue-focused B2B marketing can open.
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
                                label: 'South Delhi Premium Clients',
                                letter: 'S',
                                color: '#C39A2B',
                                points: [
                                    'GK, Vasant Kunj, and Saket buyers evaluate brand authority before a conversation begins — your digital presence must reflect premium positioning',
                                    'High-net-worth client acquisition requires content that demonstrates domain mastery, not generic "services" pages',
                                    'Premium brands need SEO that targets buyer intent, not traffic volume',
                                ],
                            },
                            {
                                label: 'Okhla & CP B2B Corridor',
                                letter: 'O',
                                color: '#7c63d4',
                                points: [
                                    'Okhla Phase I, II & III manufacturers need B2B SEO to appear in procurement-stage searches by enterprise buyers',
                                    'Connaught Place professional services firms can generate inbound retainer clients via thought leadership + LinkedIn',
                                    'B2B exporters in Okhla compete with global suppliers — digital authority bridges the credibility gap',
                                ],
                            },
                            {
                                label: 'Enterprise Service Providers',
                                letter: 'E',
                                color: '#2bc3a8',
                                points: [
                                    'Law firms, CA practices, and boutique consultancies need compliance-aware content marketing — not click-bait SEO',
                                    'High-ticket service brands cannot afford brand erosion from mismatch between offline prestige and thin online presence',
                                    'Enterprise leads are won on Google before they are won in a meeting room — the research phase is where we deploy',
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
                            Delhi Has 1000+ &quot;Digital Marketing Agencies.&quot;{' '}
                            <span className="text-red-400">None of Them Prove Revenue.</span>
                        </h2>
                        <p className="text-lg text-paragraph mb-12">
                            South Delhi, Okhla, Naraina — flooded with agencies making fake promises. You&apos;ve already burned money on experiments that delivered vanity metrics. Your business needs proven systems that deliver accountable ROI, not another agency selling dreams.
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
                                    {['"Guaranteed rankings" that never materialize', 'Social media posts that get likes but zero revenue', 'Meta Ads with bleeding ROAS and no retention strategy', '"Brand awareness campaigns" with no measurable ROI'].map((item) => (
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
                                    {['High-margin D2C retention architectures that scale', 'Revenue-attributed campaign tracking with real ROI', 'Brand authority systems that command premium pricing', 'Independent lead engines for legacy B2B businesses'].map((item) => (
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
                                    We don&apos;t promise traffic. We prove revenue. Every campaign is reverse-engineered from your profit target — whether that&apos;s scaling a D2C brand to ₹10Cr ARR without killing margins or building a legacy manufacturer&apos;s first independent digital pipeline.
                                </p>
                            </motion.div>
                        </div>
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
                                <span className="text-gradient">Delhi Enterprises</span>
                            </h2>
                            <p className="text-lg text-paragraph max-w-3xl mx-auto">
                                Each service pillar is engineered as a standalone revenue system for Delhi&apos;s diverse business ecosystem. Combined, they create compound growth that your competitors cannot reverse-engineer.
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

            {/* HOW WE BUILD REVENUE ARCHITECTURES */}
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
                            A 3-phase system engineered to transform your Delhi business from &quot;running experiments&quot; to &quot;operating a proven revenue machine.&quot;
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
                title="Questions Delhi&apos;s Business Leaders Ask Us"
                subtitle="Straight answers for legacy businesses and premium brands ready to dominate digitally."
                faqs={[
                    {
                        question: "We are a legacy business in Delhi with an established offline network. Why do we need your systems?",
                        answer: "Because your competitors are actively digitizing and stealing your future market share. We don't replace your offline network; we digitize your legacy. We build high-authority digital assets that translate your decades of offline trust into online market dominance."
                    },
                    {
                        question: "Can you handle large-scale enterprise ad budgets without wasting capital?",
                        answer: "Yes. Wasting large budgets is easy; scaling them profitably is a science. We use strict predictive modeling and tracking architectures. We test small, prove the ROI, and then scale aggressively to ensure every rupee spent defends your bottom line."
                    },
                    {
                        question: "How do you position premium brands in a crowded Delhi market?",
                        answer: "Through ruthless positioning and Neuro-Branding. We don't compete on price; we compete on value and psychology. We craft brand narratives that make your services look like the only logical choice for high-net-worth clients."
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
                                        <option value="d2c-ecommerce" className="bg-[#0F1112]">D2C E-commerce / Brand</option>
                                        <option value="legacy-manufacturing" className="bg-[#0F1112]">Legacy Manufacturing / B2B Trading</option>
                                        <option value="clinics" className="bg-[#0F1112]">Aesthetic / Super-Specialty Clinics</option>
                                        <option value="professional-services" className="bg-[#0F1112]">Professional Services (Law / Consulting)</option>
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
                                    <label className="block text-sm font-medium text-white mb-2">What&apos;s your current monthly revenue target? *</label>
                                    <textarea
                                        name="challenge"
                                        rows={3}
                                        required
                                        className="w-full px-4 py-3 bg-[#0F1112]/80 border border-white/[0.08] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#C39A2B]/50 focus:border-[#C39A2B]/50 transition-colors"
                                        placeholder="Example: We're a D2C brand doing ₹50L/month but our Meta ROAS has dropped to 1.8x. We need to scale to ₹2Cr/month without killing margins."
                                    />
                                </div>

                                <input type="hidden" name="source" value="Delhi Landing Page" />

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
