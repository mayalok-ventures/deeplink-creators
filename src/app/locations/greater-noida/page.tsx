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
        description: 'We dissect your current acquisition funnel — every traffic source, every conversion point, every revenue leak. No guesswork. We map the exact points where you\'re hemorrhaging pipeline.',
        icon: <Brain size={28} />,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        side: 'left' as const,
    },
    {
        step: '02',
        title: 'Architecture Deployment',
        subtitle: 'Week 3–6',
        description: 'We engineer your custom revenue architecture — SEO infrastructure, paid media systems, conversion assets, and tracking frameworks. Every component is built to generate measurable pipeline.',
        icon: <Zap size={28} />,
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
        side: 'right' as const,
    },
    {
        step: '03',
        title: 'Compound Scaling',
        subtitle: 'Month 2+',
        description: 'Once the architecture is validated, we activate compound scaling — doubling down on what works, eliminating what doesn\'t, and systematically increasing your customer acquisition velocity.',
        icon: <TrendingUp size={28} />,
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop',
        side: 'left' as const,
    },
]

export default function GreaterNoidaPage() {
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
            <LocationHero
                city="Greater Noida"
                tagline="Real Estate & B2B Brands"
                subheadline="Revenue Architecture."
                description="The performance marketing agency in Greater Noida that doesn't sell 'digital marketing.' We are based in Alpha 1, Pari Chowk — and we engineer predictable pipeline, measurable ARR, and customer acquisition systems for enterprises that refuse to gamble on vanity metrics."
                heroImage="/images/hero/greater-noida.webp"
            />

            <SpotSection />

            {/* GREATER NOIDA LOCAL CONTEXT SECTION */}
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
                            <span className="text-sm font-medium text-paragraph">Our Home Ground</span>
                        </div>
                        <h2 data-anim="heading" className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-6">
                            We Are Based in{' '}
                            <span className="text-gradient">Alpha 1, Greater Noida</span>
                            {' '}— and We Know Your Market Intimately
                        </h2>
                        <p className="text-lg text-paragraph mb-4 max-w-3xl">
                            Our office at Alpha 1, Pari Chowk is not a satellite location. It is our headquarters — which means when we build a digital strategy for a Greater Noida real estate developer, a Knowledge Park coaching center, or an Ecotech manufacturing unit, we are drawing from direct, on-the-ground market knowledge, not guesswork pulled from a national playbook.
                        </p>
                        <p className="text-lg text-paragraph mb-12 max-w-3xl">
                            Greater Noida&apos;s business ecosystem is unlike any other NCR market. Real estate developers like Gaur and ATS face hyper-competitive paid search, while coaching institutes along Knowledge Park II struggle to differentiate in a sea of identical landing pages. Manufacturing units in UPSIDC Kasna and Ecotech Industrial Area are completely invisible to procurement teams conducting B2B research online. These are not generic problems — they require city-specific solutions.
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
                                label: 'Real Estate & Builders',
                                letter: 'R',
                                color: '#C39A2B',
                                points: [
                                    'High-ticket projects need pre-qualified lead funnels — not volume Facebook ads',
                                    'Long sales cycles demand retargeting sequences, not one-off campaigns',
                                    'Builders in Sector 16B, Techzone IV, and Omicron need SEO that captures intent at every stage',
                                ],
                            },
                            {
                                label: 'Coaching & Education',
                                letter: 'C',
                                color: '#4f8ef7',
                                points: [
                                    'Coaching centers on Knowledge Park Drive compete nationally on Google — local visibility alone is not enough',
                                    'Admission cycles are short; performance campaigns must go live at the right moment with the right message',
                                    'Brand differentiation is zero — neuro-positioning is the only sustainable moat',
                                ],
                            },
                            {
                                label: 'Manufacturing & B2B',
                                letter: 'M',
                                color: '#7c63d4',
                                points: [
                                    'UPSIDC Kasna and Ecotech units are invisible to B2B procurement managers searching on Google',
                                    'Industrial SEO and targeted LinkedIn campaigns can fill your quoting pipeline with enterprise buyers',
                                    'Trade show dependency is a single point of failure — a digital pipeline runs 365 days a year',
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
                            Greater Noida Has 200+ &quot;Digital Marketing Agencies.&quot;{' '}
                            <span className="text-red-400">None of Them Build Revenue Systems.</span>
                        </h2>
                        <p className="text-lg text-paragraph mb-12">
                            The Noida Extension and Knowledge Park corridor is flooded with agencies selling Instagram followers and &quot;monthly SEO packages.&quot; Meanwhile, your competitors are quietly building pipeline machines that compound every quarter.
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
                                    {['500 Instagram followers/month', '"SEO reports" with zero ranking movement', 'Google Ads with no conversion tracking', 'WhatsApp broadcasts they call "lead gen"'].map((item) => (
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
                                    {['Predictable lead pipeline architecture', 'Revenue-attributed campaign tracking', 'Enterprise SEO that compounds quarterly', 'Customer acquisition cost optimization'].map((item) => (
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
                                    We don&apos;t deliver &quot;reports.&quot; We deliver pipeline. Every campaign is reverse-engineered from your revenue target — whether that&apos;s filling a 500-unit real estate inventory or generating ₹2Cr in B2B contracts.
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
                            A 3-phase system engineered to transform your Greater Noida business from &quot;running campaigns&quot; to &quot;operating a revenue machine.&quot;
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
                title="Questions Greater Noida Businesses Ask Us"
                subtitle="Real answers for real business owners — no jargon, no fake promises."
                faqs={[
                    {
                        question: "We are a heavy manufacturing plant in Ecotech. Does digital marketing even work for B2B factories?",
                        answer: "Absolutely. Your buyers (procurement managers and B2B distributors) are searching on Google before they ever attend a trade show. We use Industrial SEO and highly targeted LinkedIn/Google Ads to ensure your factory ranks #1 when large contracts are being negotiated in Greater Noida and NCR."
                    },
                    {
                        question: "How do you generate leads for high-ticket Real Estate projects in Noida Extension?",
                        answer: "We stop running generic \"Buy Now\" Facebook ads. We use Neuro-Branding to position your property as a high-status asset. We build high-speed conversion funnels that filter out junk leads, ensuring your sales team only talks to qualified, high-net-worth individuals."
                    },
                    {
                        question: "Can we visit your office for an in-person consultation?",
                        answer: "Yes. We understand that in Greater Noida, business is built on trust and handshakes. We prefer in-person strategy sessions with decision-makers at our headquarters or your facility to map out your revenue goals."
                    },
                    {
                        question: "How fast can we see an increase in qualified B2B inquiries?",
                        answer: "For immediate lead flow, our Performance Marketing (Paid Ads) systems can start generating qualified inquiries within 14 days. For long-term market dominance and zero-cost leads, our Industrial SEO systems build compound growth over 3 to 6 months."
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
