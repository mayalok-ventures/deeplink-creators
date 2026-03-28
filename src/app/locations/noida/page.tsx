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
        title: 'Funnel Forensics',
        subtitle: 'Week 1–2',
        description: 'We dissect your current B2B acquisition funnel — every traffic source, every demo conversion point, every pipeline leak. No guesswork. We map the exact points where you\'re losing qualified enterprise opportunities.',
        icon: <Brain size={28} />,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        side: 'left' as const,
    },
    {
        step: '02',
        title: 'Pipeline Deployment',
        subtitle: 'Week 3–6',
        description: 'We engineer your custom B2B pipeline — SEO infrastructure targeting decision-makers, paid media systems optimized for demo bookings, conversion assets, and revenue tracking frameworks. Every component drives measurable SQL pipeline.',
        icon: <Zap size={28} />,
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
        side: 'right' as const,
    },
    {
        step: '03',
        title: 'Compound Scaling',
        subtitle: 'Month 2+',
        description: 'Once the pipeline is validated, we activate compound scaling — doubling down on channels driving enterprise demos, eliminating vanity metrics, and systematically decreasing your customer acquisition cost while increasing MRR.',
        icon: <TrendingUp size={28} />,
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop',
        side: 'left' as const,
    },
]

export default function NoidaPage() {
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
        getServiceCardsByPage('noida')
            .then(setServices)
            .catch(() => {})
            .finally(() => setLoadingServices(false))
    }, [])

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitting(true)
        try {
            const formData = new FormData(e.target as HTMLFormElement)
            formData.append('source', 'Noida Landing Page')
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
                city="Noida"
                tagline="Tech, SaaS & B2B Enterprises"
                subheadline="Revenue-Engineered Growth Systems."
                description="Noida's Sector 62, 125, 132, and 142 are packed with IT companies and SaaS startups all burning budgets on Google Ads without a single SQL. We engineer predictable demo pipelines, enterprise MRR systems, and B2B acquisition architectures that turn ad spend into qualified revenue."
                heroImage="/images/hero/noida-hero.webp"
            />

            <SpotSection />

            {/* NOIDA LOCAL CONTEXT SECTION */}
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
                            <span className="text-sm font-medium text-paragraph">Noida&apos;s Digital Battlefield</span>
                        </div>
                        <h2 data-anim="heading" className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-6">
                            Noida Is One of India&apos;s Most{' '}
                            <span className="text-gradient">Competitive Digital Markets</span>
                            {' '}— and Most Agencies Lose Here
                        </h2>
                        <p className="text-lg text-paragraph mb-4 max-w-3xl">
                            Sector 18&apos;s commercial density, Sector 62&apos;s IT parks, and the Expressway corridor from Sector 125 to 142 collectively house thousands of businesses all competing for the same eyeballs on Google. The CPC rates in Noida&apos;s B2B SaaS and IT services categories are consistently 3–5× higher than in cities like Lucknow or Jaipur — because your competitors are also spending aggressively. Volume bidding alone will bankrupt your paid media budget.
                        </p>
                        <p className="text-lg text-paragraph mb-12 max-w-3xl">
                            What separates businesses that scale ARR in Noida from those that burn through ad budgets is architecture — a precise system that targets decision-makers at the SQL (Sales Qualified Lead) stage rather than broad interest audiences. Delhi NCR&apos;s proximity means buyers in Noida compare you not just to local competitors but to South Delhi agencies, Gurugram SaaS providers, and national brands. You need enterprise-grade positioning, not SME-tier marketing.
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
                                label: 'IT & SaaS Companies',
                                letter: 'I',
                                color: '#C39A2B',
                                points: [
                                    'Sector 62, 125 & 132 IT companies compete for enterprise contracts nationally — local SEO alone will not win deals',
                                    'SaaS startups need Account-Based Marketing to reach CTOs and procurement heads directly',
                                    'High CAC is the norm; the fix is SQL-attributed tracking, not more ad spend',
                                ],
                            },
                            {
                                label: 'E-Commerce & D2C',
                                letter: 'E',
                                color: '#2bc39a',
                                points: [
                                    'E-commerce brands in Noida face Myntra, Amazon, and Flipkart on every search — organic positioning requires deep category authority',
                                    'Repeat purchase and LTV optimization differentiates profitable brands from ones that survive on Meta ROAS',
                                    'Sector 18&apos;s commercial retail belt needs hyperlocal Google Maps dominance for walk-in traffic',
                                ],
                            },
                            {
                                label: 'Noida vs. Delhi Dynamics',
                                letter: 'N',
                                color: '#e05c5c',
                                points: [
                                    'Buyers in Noida actively compare offers from Delhi NCR brands — you need positioning that wins cross-market',
                                    'Noida&apos;s startup density means your competition is often better-funded than you — outmanoeuvre with precision',
                                    'B2B buyers in Noida Expressway zone expect enterprise-grade digital presence before an intro call',
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
                            Noida Has 500+ &quot;Digital Marketing Agencies.&quot;{' '}
                            <span className="text-red-400">None of Them Understand B2B Funnels.</span>
                        </h2>
                        <p className="text-lg text-paragraph mb-12">
                            The Sector 62 IT corridor is flooded with agencies selling Instagram followers and &quot;monthly SEO packages&quot; to SaaS companies. Meanwhile, your competitors are quietly building pipeline machines that compound MRR every quarter.
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
                                    {['₹5k/month SEO with zero pipeline impact', '"Social media management" for B2B SaaS companies', 'Google Ads with no conversion tracking or SQL attribution', 'WhatsApp broadcasts they call "demand generation"'].map((item) => (
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
                                    {['Predictable demo booking pipeline architecture', 'Revenue-attributed campaign tracking with SQL metrics', 'Enterprise SEO that compounds quarterly MRR', 'Customer acquisition cost optimization for SaaS'].map((item) => (
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
                                    We don&apos;t deliver &quot;reports.&quot; We deliver pipeline. Every campaign is reverse-engineered from your revenue target — whether that&apos;s driving 200 enterprise demo bookings per quarter or generating ₹5Cr in B2B contracts for your IT services company.
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
                                <span className="text-gradient">Noida Enterprises</span>
                            </h2>
                            <p className="text-lg text-paragraph max-w-3xl mx-auto">
                                Each service pillar is engineered as a standalone revenue system for Noida&apos;s tech and B2B ecosystem. Combined, they create compound growth that your competitors cannot reverse-engineer.
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
                            A 3-phase system engineered to transform your Noida tech business from &quot;running campaigns&quot; to &quot;operating a predictable revenue machine.&quot;
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
                title="Questions Noida&apos;s Tech Leaders Ask Us"
                subtitle="Direct answers for B2B and SaaS founders who are tired of agency BS."
                faqs={[
                    {
                        question: "We are a B2B Tech/SaaS company in Noida. Can you help us scale our ARR?",
                        answer: "Yes. Scaling ARR requires precision. We deploy Account-Based Marketing (ABM) and advanced Sales Funnel architectures to target specific decision-makers (CTOs, CEOs) in your ideal client profile, reducing your Customer Acquisition Cost (CAC) significantly."
                    },
                    {
                        question: "Our current agency is getting us traffic, but no high-quality leads. Can you fix this?",
                        answer: "Traffic without conversion is just an expense. We use Neuro-Marketing to analyze why your current traffic isn't converting. We restructure your website's copy and user experience (UX) to trigger buying decisions, turning your website from a brochure into a lead-generation machine."
                    },
                    {
                        question: "Do you handle end-to-end marketing automation?",
                        answer: "Yes. For fast-paced Noida businesses, relying on manual follow-ups is a mistake. We integrate AI-driven marketing automation to nurture your leads 24/7, ensuring no high-ticket prospect slips through the cracks."
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
                                This isn&apos;t a &quot;free consultation.&quot; It&apos;s a 45-minute deep-dive where we reverse-engineer your revenue target and map the exact B2B acquisition system needed to hit it.
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
                                        <option value="saas-it" className="bg-[#0F1112]">B2B SaaS / IT Services</option>
                                        <option value="healthcare" className="bg-[#0F1112]">Corporate Healthcare</option>
                                        <option value="real-estate" className="bg-[#0F1112]">Commercial Real Estate / Coworking</option>
                                        <option value="manufacturing" className="bg-[#0F1112]">Manufacturing / Industrial</option>
                                        <option value="other" className="bg-[#0F1112]">Other B2B Enterprise</option>
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
                                        placeholder="Example: We need to generate 150 enterprise demo bookings per quarter. Current demo-to-close rate is 8% from inbound."
                                    />
                                </div>

                                <input type="hidden" name="source" value="Noida Landing Page" />

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
