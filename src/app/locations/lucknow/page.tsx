'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowRight, Target, BarChart3, Users,
    TrendingUp, Zap, Shield, Brain, Search, Layers, Rocket, Star, Heart,
    MessageCircle, Code, Palette, Megaphone, Mail, Globe, Award, CheckCircle2, Loader2,
    AlertTriangle, Lightbulb, MapPin, MonitorSmartphone
} from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import SpotSection from '@/components/SpotSection'
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

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const processSteps = [
    {
        step: '01',
        title: 'Business Audit',
        subtitle: 'Week 1–2',
        description: 'We sit with you to understand your business — your customers, your local market, your past marketing experience. We audit every rupee you\'ve spent and map exactly where it went wrong. No jargon, just clarity.',
        icon: <Brain size={24} />,
    },
    {
        step: '02',
        title: 'System Setup',
        subtitle: 'Week 3–6',
        description: 'We build your complete digital system — Local SEO to dominate Google Maps, targeted ad campaigns with real tracking, high-converting landing pages, and lead management. Every piece is built to generate real enquiries, not vanity metrics.',
        icon: <Zap size={24} />,
    },
    {
        step: '03',
        title: 'Growth & Scale',
        subtitle: 'Month 2+',
        description: 'Once your system starts delivering enquiries, we scale what works and cut what doesn\'t. Monthly performance reviews with real numbers — not PDF reports. Step-by-step growth, no experiments with your money.',
        icon: <TrendingUp size={24} />,
    },
]

export default function LucknowPage() {
    const [services, setServices] = useState<ServiceCardData[]>([])
    const [loadingServices, setLoadingServices] = useState(true)
    const [formSubmitting, setFormSubmitting] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [budget, setBudget] = useState('')

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
            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center bg-white dark:bg-[#0F1112] overflow-hidden">
                <div className="absolute inset-0 grid-bg animate-grid-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/60 dark:from-[#0F1112]/90 dark:to-[#0F1112]/60 pointer-events-none" />
                <div className="absolute top-[-10%] right-[60%] w-[500px] h-[500px] bg-[#C39A2B]/8 rounded-full blur-[120px] pointer-events-none animate-float-orb" style={{ animationDuration: '8s' }} />
                <div className="absolute top-[50%] left-[-10%] w-[400px] h-[400px] bg-[#C39A2B]/5 rounded-full blur-[120px] pointer-events-none animate-float-orb" style={{ animationDuration: '10s' }} />

                <div className="container-custom section-padding relative z-10">
                    <div className="relative max-w-5xl">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#C39A2B]/15 via-[#E0C27A]/10 to-[#C39A2B]/15 rounded-3xl blur-sm pointer-events-none" />
                        <div className="relative glass-card rounded-3xl p-8 md:p-12 lg:p-16">
                            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                                <motion.div variants={fadeUp}>
                                    <div className="inline-flex items-center gap-2.5 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-full px-5 py-2.5 mb-8 animate-glow-pulse">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C39A2B] opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C39A2B]" />
                                        </span>
                                        <span className="text-sm font-medium text-paragraph tracking-wide">
                                            Best Digital Marketing Agency in Lucknow
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.h1
                                    variants={fadeUp}
                                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight"
                                >
                                    <span className="text-heading">Digital Marketing That </span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87A14] to-[#E0C27A]">
                                        Lucknow&apos;s Businesses
                                    </span>
                                    <br />
                                    <span className="text-heading">Can Actually </span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87A14] to-[#E0C27A]">
                                        Trust &amp; Measure.
                                    </span>
                                </motion.h1>

                                <motion.p
                                    variants={fadeUp}
                                    className="text-base md:text-lg lg:text-xl text-paragraph mb-10 max-w-2xl leading-relaxed"
                                >
                                    Lucknow ke builders, coaching institutes, aur heritage brands ko &quot;social media management&quot; nahi chahiye. Inhe chahiye{' '}
                                    <span className="font-semibold text-heading">real enquiries, trackable ROI, aur step-by-step growth</span>{' '}
                                    — bina kisi experiment ke. We build digital systems that deliver real leads, not fake promises.
                                </motion.p>

                                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-14">
                                    <a
                                        href="#apply"
                                        className="group relative inline-flex items-center justify-center gap-2 text-base font-semibold py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#B87A14] to-[#E0C27A] text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(195,154,43,0.4)] hover:-translate-y-0.5"
                                    >
                                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E0C27A] to-[#B87A14] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative flex items-center gap-2">
                                            Get Your Free Business Audit
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>
                                    </a>
                                    <Link
                                        href="/blog"
                                        className="group relative inline-flex items-center justify-center gap-2 text-base font-semibold py-3.5 px-8 rounded-xl bg-[#F4F5F6] dark:bg-white/[0.05] text-heading border border-[#4A4A4A]/15 dark:border-white/[0.1] transition-all duration-300 hover:bg-[#F4F5F6]/80 dark:hover:bg-white/[0.1] hover:border-primary-500/30 hover:-translate-y-0.5"
                                    >
                                        See Our Methodology
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <SpotSection />

            {/* AGITATION SECTION */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8 }}
                className="section-padding relative overflow-hidden bg-[#F4F5F6] dark:bg-[#131415]"
            >
                <div className="absolute inset-0 grid-bg" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl md:text-3xl font-extrabold text-heading mb-6">
                            Lucknow Has 300+ &quot;Digital Marketing Agencies.&quot;{' '}
                            <span className="text-red-400">Sab Same Lag Rahi Hain — Because They Are.</span>
                        </h2>
                        <p className="text-lg text-paragraph mb-12">
                            ₹5k–₹10k mein sab kuch karne wali agencies ne Lucknow ke businesses ka trust todh diya hai. Fake promises, WhatsApp pe gayab hone wali teams, aur PDF reports jo koi nahi padhta. Your business deserves better.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6 rounded-xl hover:border-red-500/20 transition-colors duration-300">
                                <div className="text-red-400 mb-4"><Users size={32} /></div>
                                <h3 className="font-bold text-lg mb-2 text-heading dark:text-white">What They Sell You</h3>
                                <ul className="text-paragraph dark:text-white/60 text-left space-y-2">
                                    {['₹5k/month "complete digital marketing"', 'Facebook boosts with zero lead tracking', '"SEO packages" that never move rankings', 'WhatsApp broadcasts they call "lead generation"'].map((item) => (
                                        <li key={item} className="flex items-center gap-2">
                                            <span className="text-red-400 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-xs font-bold flex-shrink-0">✗</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10 p-6 rounded-xl transform md:scale-105">
                                <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-[#B87A14] via-[#C39A2B] to-[#E0C27A] -z-10 opacity-80" />
                                <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-[#B87A14] via-[#C39A2B] to-[#E0C27A] -z-20 blur-md opacity-30" />
                                <div className="absolute inset-0 rounded-xl bg-white dark:bg-[#1A1B1C] -z-[5]" />
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#B87A14] to-[#E0C27A] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg tracking-wider"
                                >
                                    ★ OUR STANDARD
                                </motion.div>
                                <div className="text-[#C39A2B] mb-4"><Target size={32} /></div>
                                <h3 className="font-bold text-lg mb-2 text-heading dark:text-white">What We Build For You</h3>
                                <ul className="text-paragraph dark:text-white/60 text-left space-y-2">
                                    {['Google Maps dominance for local searches', 'Real enquiry pipelines with call tracking', 'Ad campaigns with exact cost-per-lead data', 'Landing pages built to convert Lucknow buyers'].map((item) => (
                                        <li key={item} className="flex items-center gap-2">
                                            <span className="text-[#C39A2B] inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#C39A2B]/10 text-xs font-bold flex-shrink-0">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6 rounded-xl hover:border-[#C39A2B]/20 transition-colors duration-300">
                                <div className="text-[#C39A2B] mb-4"><BarChart3 size={32} /></div>
                                <h3 className="font-bold text-lg mb-2 text-heading dark:text-white">The Outcome</h3>
                                <p className="text-paragraph dark:text-white/60 text-left">
                                    Ads nahi, real enquiries. We don&apos;t deliver reports — we deliver results. Whether you&apos;re a builder liquidating 200 flats in Gomti Nagar or a coaching institute filling 500 seats, every rupee is tracked and accountable.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* PAIN POINTS SECTION */}
            <section className="section-padding bg-white dark:bg-[#0F1112] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                            The Real Problems{' '}
                            <span className="text-gradient">Lucknow Businesses Face</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            Ye woh cheezein hain jo business owners raat ko sochte hain — aur koi agency address nahi karti.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-8">
                            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-400">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-heading mb-3">&quot;Online ka fayda samajh nahi aa raha&quot;</h3>
                            <p className="text-paragraph">
                                Website banwa rakhi hai, Facebook page hai — par leads nahi aati. Jo aati hain woh timepass hoti hain. Paise daal rahe hain, result nahi mil raha. Sound familiar?
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-8">
                            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-400">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-heading mb-3">&quot;Sab agency same hi lag rahi hai&quot;</h3>
                            <p className="text-paragraph">
                                2–3 local agencies ₹5k–₹10k mein sab kuch bol deti hain. Quality vs price ka farq nahi samajh aata. Aur result? Sab ka same — zero accountability.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-8">
                            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-400">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-heading mb-3">&quot;Is baar bhi dhokha hua to?&quot;</h3>
                            <p className="text-paragraph">
                                Past experience kharab rahi hai. Fake promises, WhatsApp pe gayab ho jaane wali agencies. Trust deficit bahut zyada hai — aur hum samajhte hain kyun.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-8">
                            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-400">
                                <MonitorSmartphone size={24} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-heading mb-3">&quot;Hamare business ke liye kaam karega?&quot;</h3>
                            <p className="text-paragraph">
                                Word-of-mouth pe chal raha business. Google, Ads, SEO — sab unfamiliar lagta hai. Offline se online shift ka darr real hai. We make this transition simple and risk-free.
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
                className="section-padding relative overflow-hidden bg-[#F4F5F6] dark:bg-[#131415]"
            >
                <div className="absolute inset-0 grid-bg" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                            Our Solution:{' '}
                            <span className="text-gradient">A Complete Digital System for Lucknow</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            Hum experiments nahi karte. Hum proven digital systems build karte hain jo Lucknow ke local buyers ko target karte hain aur real enquiries laate hain.
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
                            <motion.div key={index} variants={fadeUp} className="glass-card rounded-2xl p-6">
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
                <section className="section-padding bg-white dark:bg-[#0F1112] relative overflow-hidden">
                    <div className="absolute inset-0 grid-bg" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-[#C39A2B]/5 via-[#E0C27A]/5 to-[#C39A2B]/3 rounded-full blur-3xl pointer-events-none" />
                    <div className="container-custom relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                                Growth Systems for{' '}
                                <span className="text-gradient">Lucknow Businesses</span>
                            </h2>
                            <p className="text-lg text-paragraph max-w-3xl mx-auto">
                                Each service is built as a complete growth system for Lucknow&apos;s unique market. Real results, real accountability, real growth.
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
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* HOW WE BUILD GROWTH SYSTEMS */}
            <section className="section-padding bg-white dark:bg-[#0F1112] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                            Step-by-Step Growth,{' '}
                            <span className="text-gradient">No Experiments</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            A 3-phase system that takes your Lucknow business from &quot;online ka kya fayda&quot; to &quot;aur leads chahiye.&quot;
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#C39A2B]/20 via-[#C39A2B]/40 to-[#C39A2B]/20" />
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {processSteps.map((step, index) => (
                                <motion.div key={index} variants={fadeUp} className="relative glass-card rounded-2xl p-8">
                                    <div className="text-5xl font-extrabold text-[#C39A2B]/10 absolute top-4 right-4">{step.step}</div>
                                    <div className="w-14 h-14 bg-[#C39A2B]/10 rounded-xl flex items-center justify-center mb-6 text-[#C39A2B]">
                                        {step.icon}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#C39A2B] mb-2 block">{step.subtitle}</span>
                                    <h3 className="text-xl font-heading font-bold text-heading mb-3">{step.title}</h3>
                                    <p className="text-paragraph">{step.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* EXIT-INTENT LEAD FORM */}
            <section id="apply" className="section-padding bg-[#0F1112] text-white relative overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-10 left-[10%] w-64 h-64 bg-[#C39A2B]/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 right-[10%] w-72 h-72 bg-[#C39A2B]/3 rounded-full blur-3xl animate-float-slow" />

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
                            <h2 className="text-2xl md:text-3xl font-extrabold font-heading mb-6">
                                Get Your Free{' '}
                                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#B87A14] via-[#E0C27A] to-[#B87A14]">
                                    Business Growth Audit
                                </span>
                            </h2>
                            <p className="text-lg text-white/60 max-w-2xl mx-auto">
                                No fake promises, no jargon. A 30-minute honest conversation where we tell you exactly what&apos;s working, what&apos;s not, and what it will take to get real leads for your Lucknow business.
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
                                <p className="text-white/60 mb-6">Our team will review your application and get back to you within 24 hours.</p>
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
                                        <label className="block text-sm font-medium text-white mb-2">Business Name *</label>
                                        <input type="text" name="company" required className="w-full px-4 py-3 bg-[#0F1112]/80 border border-white/[0.08] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#C39A2B]/50 focus:border-[#C39A2B]/50 transition-colors" placeholder="Business name" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Email *</label>
                                        <input type="email" name="email" required className="w-full px-4 py-3 bg-[#0F1112]/80 border border-white/[0.08] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#C39A2B]/50 focus:border-[#C39A2B]/50 transition-colors" placeholder="you@business.com" />
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
                                        <option value="real-estate" className="bg-[#0F1112]">Real Estate / Builders</option>
                                        <option value="coaching" className="bg-[#0F1112]">Coaching Institute / Education</option>
                                        <option value="healthcare" className="bg-[#0F1112]">Doctors / Clinics / Hospitals</option>
                                        <option value="retail-dcc" className="bg-[#0F1112]">Heritage Retail / D2C / Jewellery</option>
                                        <option value="manufacturing" className="bg-[#0F1112]">Manufacturing / Distribution</option>
                                        <option value="family-business" className="bg-[#0F1112]">Traditional Family Business</option>
                                        <option value="other" className="bg-[#0F1112]">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Monthly Marketing Investment *</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {[
                                            { value: '20k-50k', label: '₹20k – ₹50k', desc: 'Starting out' },
                                            { value: '50k-1l', label: '₹50k – ₹1L', desc: 'Growth stage' },
                                            { value: '1l-plus', label: '₹1L+', desc: 'Scaling fast' },
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
                                    <label className="block text-sm font-medium text-white mb-2">What&apos;s your biggest challenge right now? *</label>
                                    <textarea
                                        name="challenge"
                                        rows={3}
                                        required
                                        className="w-full px-4 py-3 bg-[#0F1112]/80 border border-white/[0.08] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#C39A2B]/50 focus:border-[#C39A2B]/50 transition-colors"
                                        placeholder="Example: We're a coaching institute in Hazratganj. We spend ₹30k/month on ads but get mostly timepass enquiries. We need serious admission leads."
                                    />
                                </div>

                                <input type="hidden" name="source" value="Lucknow Landing Page" />

                                <button
                                    type="submit"
                                    disabled={formSubmitting}
                                    className="w-full bg-gradient-to-r from-[#B87A14] to-[#E0C27A] text-white font-semibold py-4 px-8 rounded-xl hover:shadow-[0_0_30px_rgba(195,154,43,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
                                >
                                    {formSubmitting ? (
                                        <><Loader2 className="animate-spin" size={20} /> Processing...</>
                                    ) : (
                                        <>Get My Free Audit <ArrowRight size={20} /></>
                                    )}
                                </button>
                                <p className="text-center text-sm text-white/40">
                                    We review every application. Qualified businesses receive a response within 24 hours.
                                </p>
                            </motion.form>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
