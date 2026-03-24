'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ArrowRight, TrendingUp, Users, Target, Activity } from 'lucide-react'
import Link from 'next/link'
import { getTestimonials, TestimonialData } from '@/lib/firestore'
import ScrollReveal from '@/components/ScrollReveal'

/* ─────────────────── Static Case Studies (Fallback when 0 Testimonials) ─── */
const CASE_STUDIES = [
    {
        industry: 'B2B SaaS (Fintech)',
        metric1: '+315%',
        metric1Label: 'MQLs Generated',
        metric2: '-42%',
        metric2Label: 'Cost Per Acquisition',
        challenge: 'A Series B fintech needed to scale Enterprise MQLs in a highly competitive market without bleeding ad spend on unqualified clicks.',
        solution: 'We shifted their Google Ads from broad match to exact-match intent terms, deployed a LinkedIn ABM strategy targeting CFOs, and rebuilt their landing pages using neuro-marketing principles.',
        icon: <TrendingUp size={24} />,
        gradient: 'from-blue-500 to-indigo-600'
    },
    {
        industry: 'Real Estate Developer',
        metric1: '14',
        metric1Label: 'Villas Sold',
        metric2: '₹4.2 Cr',
        metric2Label: 'Attributed Revenue',
        challenge: 'A premium developer struggled to get qualified site visits for their luxury £1M+ properties, wasting budget on low-intent Facebook leads.',
        solution: 'We built a hyper-local programmatic geo-fencing campaign around ultra-HNI pin codes, paired with high-ticket Google Search intent targeting and a dedicated IVR sales funnel.',
        icon: <Target size={24} />,
        gradient: 'from-amber-500 to-orange-600'
    },
    {
        industry: 'D2C E-commerce',
        metric1: '5.2×',
        metric1Label: 'Average ROAS',
        metric2: '+184%',
        metric2Label: 'Monthly Revenue',
        challenge: 'A scaling D2C brand was stuck at 1.8× ROAS on Meta Ads and couldn\'t push past a ₹10L/month revenue ceiling without losing money.',
        solution: 'We audited their pixel data, restructured their Meta account into broad testing + consolidation, and introduced profit-based bidding via 3rd party attribution tools.',
        icon: <Activity size={24} />,
        gradient: 'from-emerald-500 to-teal-600'
    },
    {
        industry: 'Ed-Tech Institute',
        metric1: '2,400+',
        metric1Label: 'Enrolments',
        metric2: '₹140',
        metric2Label: 'Cost Per Application',
        challenge: 'A leading coaching institute needed massive enrolment volume for their new tech batches but faced steep CPCs on Google Search.',
        solution: 'We bypassed competitive search terms by dominating YouTube Pre-Roll with educational VSLs, combined with a WhatsApp AI-nurture sequence that converted leads at 4× the industry average.',
        icon: <Users size={24} />,
        gradient: 'from-purple-500 to-pink-600'
    }
]

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTestimonials()
            .then(setTestimonials)
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            {/* ── Hero Section ── */}
            <section className="relative pt-32 pb-20 bg-white dark:bg-[#0F1112] text-heading overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <img src="/images/hero/hero-testinomials.webp" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white dark:from-[#0F1112]/50 dark:via-[#0F1112]/80 dark:to-[#0F1112]" />
                </div>

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
                            <span className="text-sm font-medium">Trusted by Businesses Across India</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 leading-tight">
                            Client ROI &{' '}
                            <span className="text-[#C39A2B]">Growth Stories</span>
                        </h1>
                        <p className="text-lg text-paragraph max-w-2xl mx-auto">
                            We don&apos;t just chase clicks, we engineer revenue. See how our bespoke marketing strategies have transformed businesses across B2B SaaS, Real Estate, and D2C.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Content Grid ── */}
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-[#C39A2B] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : testimonials.length > 0 ? (
                        /* ── Live Testimonials ── */
                        <>
                            <div className="text-center mb-16">
                                <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                                    Client <span className="text-[#C39A2B]">Testimonials</span>
                                </h2>
                                <p className="text-lg text-paragraph max-w-3xl mx-auto">
                                    Real feedback from real clients who experienced measurable growth with our strategies.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {testimonials.map((testimonial, index) => (
                                    <ScrollReveal
                                        key={testimonial.id ?? index}
                                        delay={Math.min(index % 3, 2) * 100}
                                        direction="up"
                                        className="glass-card rounded-2xl p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300"
                                    >
                                        <div className="w-12 h-12 bg-[#C39A2B]/10 rounded-xl flex items-center justify-center mb-6">
                                            <Quote size={24} className="text-[#C39A2B]" />
                                        </div>

                                        <p className="text-paragraph leading-relaxed flex-1 mb-6">
                                            &ldquo;{testimonial.content}&rdquo;
                                        </p>

                                        <div className="flex items-center gap-1 mb-4">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={
                                                        i < testimonial.rating
                                                            ? 'text-yellow-400 fill-yellow-400'
                                                            : 'text-[#4A4A4A]/30'
                                                    }
                                                />
                                            ))}
                                        </div>

                                        <div>
                                            <p className="font-heading font-bold text-heading">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-paragraph">
                                                {testimonial.role} @ {testimonial.company}
                                            </p>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </>
                    ) : (
                        /* ── Fallback Case Studies (When 0 Testimonials Live) ── */
                        <>
                            <div className="text-center mb-16">
                                <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                                    Anonymised <span className="text-[#C39A2B]">Client Results</span>
                                </h2>
                                <p className="text-lg text-paragraph max-w-3xl mx-auto">
                                    To protect our clients&apos; competitive advantage, we maintain strict NDAs. Here are some of our recent, anonymised revenue engineering wins.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                {CASE_STUDIES.map((study, idx) => (
                                    <ScrollReveal
                                        key={idx}
                                        delay={idx % 2 * 100}
                                        direction="up"
                                        className="group relative bg-white dark:bg-[#1C1E20] rounded-2xl p-8 border border-[#E5E7EB] dark:border-[#2A2D30] overflow-hidden hover:border-[#C39A2B]/40 transition-colors duration-300"
                                    >
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${study.gradient} rounded-bl-[100px] opacity-10 group-hover:opacity-20 transition-opacity`} />
                                        
                                        <div className="flex items-center gap-3 mb-8 relative z-10">
                                            <div className="p-3 bg-[#131415] rounded-xl text-white">
                                                {study.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-heading">
                                                {study.industry}
                                            </h3>
                                        </div>

                                        {/* Metrics Block */}
                                        <div className="grid grid-cols-2 gap-4 mb-8 bg-[#F8F9FA] dark:bg-[#131415] rounded-xl p-5 border border-black/5 dark:border-white/5">
                                            <div>
                                                <div className="text-2xl md:text-3xl font-extrabold text-[#C39A2B] mb-1">{study.metric1}</div>
                                                <div className="text-xs uppercase tracking-wider text-paragraph font-semibold">{study.metric1Label}</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl md:text-3xl font-extrabold text-[#C39A2B] mb-1">{study.metric2}</div>
                                                <div className="text-xs uppercase tracking-wider text-paragraph font-semibold">{study.metric2Label}</div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-[#C39A2B] font-bold mb-1">The Challenge</p>
                                                <p className="text-sm text-paragraph leading-relaxed">{study.challenge}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-[#C39A2B] font-bold mb-1">Our Solution</p>
                                                <p className="text-sm text-paragraph leading-relaxed">{study.solution}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="relative section-padding bg-[#0F1112] text-white">
                <div className="absolute inset-0 grid-bg" />
                <div className="container-custom text-center relative z-10">
                    <ScrollReveal direction="up">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-6">
                            Ready for Your Own{' '}
                            <span className="text-[#C39A2B]">Case Study?</span>
                        </h2>
                        <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                            Join the growing list of businesses that chose results over promises. Let&apos;s engineer your revenue growth together.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8"
                        >
                            Start Your Project
                            <ArrowRight size={20} />
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </>
    )
}
