'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowRight, Target, BarChart3, Users,
    TrendingUp, Zap, Shield, Brain, Search, Layers, Rocket, Star, Heart,
    MessageCircle, Code, Palette, Megaphone, Mail, Globe, Award, CheckCircle2, Loader2
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
        title: 'Revenue Forensics',
        subtitle: 'Week 1–2',
        description: 'We dissect your current acquisition funnel — every traffic source, every conversion point, every revenue leak. No guesswork. We map the exact points where you\'re hemorrhaging pipeline.',
        icon: <Brain size={24} />,
    },
    {
        step: '02',
        title: 'Architecture Deployment',
        subtitle: 'Week 3–6',
        description: 'We engineer your custom revenue architecture — SEO infrastructure, paid media systems, conversion assets, and tracking frameworks. Every component is built to generate measurable pipeline.',
        icon: <Zap size={24} />,
    },
    {
        step: '03',
        title: 'Compound Scaling',
        subtitle: 'Month 2+',
        description: 'Once the architecture is validated, we activate compound scaling — doubling down on what works, eliminating what doesn\'t, and systematically increasing your customer acquisition velocity.',
        icon: <TrendingUp size={24} />,
    },
]

export default function GreaterNoidaPage() {
    const [services, setServices] = useState<ServiceCardData[]>([])
    const [loadingServices, setLoadingServices] = useState(true)
    const [formSubmitting, setFormSubmitting] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [budget, setBudget] = useState('')

    useEffect(() => {
        getServiceCardsByPage('greater-noida')
            .then(setServices)
            .catch(() => {})
            .finally(() => setLoadingServices(false))
    }, [])

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitting(true)
        try {
            const formData = new FormData(e.target as HTMLFormElement)
            formData.append('source', 'Greater Noida Landing Page')
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
                <img
                    src="/images/hero/greater-noida.webp"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-25 pointer-events-none select-none"
                />
                <div className="absolute inset-0 grid-bg animate-grid-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/60 dark:from-[#0F1112]/90 dark:to-[#0F1112]/60 pointer-events-none" />
                <div className="absolute top-[-10%] right-[60%] w-[500px] h-[500px] bg-[#C39A2B]/8 rounded-full blur-[120px] pointer-events-none animate-float-orb" style={{ animationDuration: '8s' }} />
                <div className="absolute top-[50%] left-[-10%] w-[400px] h-[400px] bg-[#C39A2B]/5 rounded-full blur-[120px] pointer-events-none animate-float-orb" style={{ animationDuration: '10s' }} />

                <div className="container-custom section-padding relative z-10">
                    <div className="relative max-w-5xl">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#C39A2B]/15 via-[#E0C27A]/10 to-[#C39A2B]/15 rounded-3xl blur-sm pointer-events-none" />
                        <div className="relative glass-card rounded-3xl p-8 md:p-12 lg:p-16 !bg-[#F4F5F6]/70 dark:!bg-[#1A1B1C]/70 backdrop-blur-md">
                            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                                <motion.div variants={fadeUp}>
                                    <div className="inline-flex items-center gap-2.5 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-full px-5 py-2.5 mb-8 animate-glow-pulse">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C39A2B] opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C39A2B]" />
                                        </span>
                                        <span className="text-sm font-medium text-paragraph tracking-wide">
                                            Premium Digital Marketing Agency in Greater Noida
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.h1
                                    variants={fadeUp}
                                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight"
                                >
                                    <span className="text-heading">Scaling Greater Noida&apos;s </span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87A14] to-[#E0C27A]">
                                        Real Estate &amp; B2B Brands
                                    </span>
                                    <br />
                                    <span className="text-heading">With Data-Driven </span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87A14] to-[#E0C27A]">
                                        Revenue Architecture.
                                    </span>
                                </motion.h1>

                                <motion.p
                                    variants={fadeUp}
                                    className="text-base md:text-lg lg:text-xl text-paragraph mb-10 max-w-2xl leading-relaxed"
                                >
                                    The performance marketing agency in Greater Noida that doesn&apos;t sell &quot;digital marketing.&quot; We engineer{' '}
                                    <span className="font-semibold text-heading">predictable pipeline, measurable ARR, and customer acquisition systems</span>{' '}
                                    for enterprises that refuse to gamble on vanity metrics.
                                </motion.p>

                                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-14">
                                    <a
                                        href="#apply"
                                        className="group relative inline-flex items-center justify-center gap-2 text-base font-semibold py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#B87A14] to-[#E0C27A] text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(195,154,43,0.4)] hover:-translate-y-0.5"
                                    >
                                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E0C27A] to-[#B87A14] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative flex items-center gap-2">
                                            Apply for Revenue Audit
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
                            Greater Noida Has 200+ &quot;Digital Marketing Agencies.&quot;{' '}
                            <span className="text-red-400">None of Them Build Revenue Systems.</span>
                        </h2>
                        <p className="text-lg text-paragraph mb-12">
                            The Noida Extension and Knowledge Park corridor is flooded with agencies selling Instagram followers and &quot;monthly SEO packages.&quot; Meanwhile, your competitors are quietly building pipeline machines that compound every quarter.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6 rounded-xl hover:border-red-500/20 transition-colors duration-300">
                                <div className="text-red-400 mb-4"><Users size={32} /></div>
                                <h3 className="font-bold text-lg mb-2 text-heading dark:text-white">What They Sell You</h3>
                                <ul className="text-paragraph dark:text-white/60 text-left space-y-2">
                                    {['500 Instagram followers/month', '"SEO reports" with zero ranking movement', 'Google Ads with no conversion tracking', 'WhatsApp broadcasts they call "lead gen"'].map((item) => (
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
                                <h3 className="font-bold text-lg mb-2 text-heading dark:text-white">What We Engineer</h3>
                                <ul className="text-paragraph dark:text-white/60 text-left space-y-2">
                                    {['Predictable lead pipeline architecture', 'Revenue-attributed campaign tracking', 'Enterprise SEO that compounds quarterly', 'Customer acquisition cost optimization'].map((item) => (
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
                                    We don&apos;t deliver &quot;reports.&quot; We deliver pipeline. Every campaign is reverse-engineered from your revenue target — whether that&apos;s filling a 500-unit real estate inventory or generating ₹2Cr in B2B contracts.
                                </p>
                            </motion.div>
                        </div>
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
                                Revenue Pillars for{' '}
                                <span className="text-gradient">Greater Noida Enterprises</span>
                            </h2>
                            <p className="text-lg text-paragraph max-w-3xl mx-auto">
                                Each service pillar is engineered as a standalone revenue system. Combined, they create compound growth that your competitors cannot reverse-engineer.
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

            {/* HOW WE BUILD REVENUE ARCHITECTURES */}
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
                            How We Build{' '}
                            <span className="text-gradient">Revenue Architectures</span>
                        </h2>
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">
                            A 3-phase system engineered to transform your Greater Noida business from &quot;running campaigns&quot; to &quot;operating a revenue machine.&quot;
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
                                Apply for a{' '}
                                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#B87A14] via-[#E0C27A] to-[#B87A14]">
                                    Revenue Architecture Session
                                </span>
                            </h2>
                            <p className="text-lg text-white/60 max-w-2xl mx-auto">
                                This isn&apos;t a &quot;free consultation.&quot; It&apos;s a 45-minute deep-dive where we reverse-engineer your revenue target and map the exact acquisition system needed to hit it.
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
                                        <option value="real-estate" className="bg-[#0F1112]">Real Estate / Builders</option>
                                        <option value="education" className="bg-[#0F1112]">Higher Education / Colleges</option>
                                        <option value="manufacturing" className="bg-[#0F1112]">Manufacturing / Industrial</option>
                                        <option value="saas" className="bg-[#0F1112]">SaaS / Technology</option>
                                        <option value="other" className="bg-[#0F1112]">Other B2B</option>
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
                                        placeholder="Example: We need to sell 50 units in Sector 16B by Q3. Current close rate is 2% from walk-ins."
                                    />
                                </div>

                                <input type="hidden" name="source" value="Greater Noida Landing Page" />

                                <button
                                    type="submit"
                                    disabled={formSubmitting}
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
