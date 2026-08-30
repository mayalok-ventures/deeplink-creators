'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Star,
    Quote,
    ArrowRight,
    TrendingUp,
    Users,
    Target,
    Activity,
    CheckCircle2,
    ShieldCheck,
    MessageSquarePlus,
    Building2,
    Sparkles,
    Loader2,
    Send
} from 'lucide-react'
import Link from 'next/link'
import { getTestimonials, createTestimonial, TestimonialData } from '@/lib/db-client'

/* ─────────────────── Institutional Case Studies ─── */
const CASE_STUDIES = [
    {
        industry: 'B2B SaaS (Fintech Infrastructure)',
        metric1: '+315%',
        metric1Label: 'Enterprise MQLs',
        metric2: '-42%',
        metric2Label: 'Acquisition Cost',
        challenge: 'A Series B fintech needed to scale Enterprise MQLs in a highly competitive market without bleeding ad spend on unqualified clicks.',
        solution: 'We shifted their search architecture from broad match to exact-match intent terms, deployed a LinkedIn ABM strategy targeting CFOs, and rebuilt their landing pipelines on high-speed Next.js architecture.',
        icon: <TrendingUp size={20} className="text-[#9B7545]" />,
    },
    {
        industry: 'Ultra-Luxury Real Estate Developer',
        metric1: '14 Units',
        metric1Label: 'Villas Closed',
        metric2: '₹4.2 Cr',
        metric2Label: 'Attributed ARR',
        challenge: 'A premium developer struggled to get qualified site visits for their luxury properties, wasting budget on low-intent mass social leads.',
        solution: 'We built a hyper-local programmatic geo-fencing campaign around ultra-HNI pin codes, paired with high-ticket search intent targeting and Sahyak CRM sales dispatch.',
        icon: <Target size={20} className="text-[#9B7545]" />,
    },
    {
        industry: 'D2C Consumer Brands Network',
        metric1: '5.2×',
        metric1Label: 'Average ROAS',
        metric2: '+184%',
        metric2Label: 'Monthly Revenue',
        challenge: 'A scaling D2C holding was stuck at 1.8× ROAS on paid channels and could not push past revenue ceilings without margin collapse.',
        solution: 'We engineered direct creator syndication funnels, completely bypassing saturated ad auctions with native influencer endorsements that drove compounding conversions.',
        icon: <Activity size={20} className="text-[#9B7545]" />,
    },
    {
        industry: 'National Ed-Tech Academy',
        metric1: '2,400+',
        metric1Label: 'Enrolments',
        metric2: '₹140',
        metric2Label: 'Cost Per Application',
        challenge: 'A leading coaching institute needed massive enrolment volume for their new tech batches but faced steep CPCs across search engines.',
        solution: 'We bypassed competitive search terms through syndicated educational video distribution combined with an automated WhatsApp AI-nurture sequence.',
        icon: <Users size={20} className="text-[#9B7545]" />,
    }
]

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submittedSuccess, setSubmittedSuccess] = useState(false)

    // Form state
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [company, setCompany] = useState('')
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(5)
    const [project, setProject] = useState('')
    const [metrics, setMetrics] = useState('')

    const loadTestimonials = async () => {
        setLoading(true)
        try {
            const data = await getTestimonials()
            setTestimonials(data)
        } catch (err) {
            console.error('Failed to load testimonials:', err)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadTestimonials()
    }, [])

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !company || !content) return

        setSubmitting(true)
        try {
            await createTestimonial({
                name,
                role: role || 'Enterprise Client',
                company,
                content,
                rating,
                project: project || 'Enterprise Software & Distribution',
                metrics: metrics || 'Verified Partnership',
                featured: true,
                order: testimonials.length + 1,
            })

            setSubmittedSuccess(true)
            setShowForm(false)
            // Reset fields
            setName('')
            setRole('')
            setCompany('')
            setContent('')
            setProject('')
            setMetrics('')
            setRating(5)

            // Reload fresh list
            await loadTestimonials()
        } catch (err) {
            console.error('Error submitting review:', err)
        }
        setSubmitting(false)
    }

    return (
        <div className="bg-[#F3F0E8] min-h-screen text-[#181A16]">
            {/* ── Hero Section ── */}
            <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#181A16]/10 text-xs font-mono font-bold tracking-widest uppercase text-[#181A16] shadow-xs">
                        <ShieldCheck size={14} className="text-[#9B7545]" />
                        <span>INSTITUTIONAL PROOF &amp; REPUTATION</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading text-[#181A16] tracking-tight leading-tight">
                        Client Endorsements &amp;{' '}
                        <span className="text-brass-gradient">
                            Growth Dossiers.
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-[#65675F] leading-relaxed">
                        Documented outcomes, technical performance metrics, and verified feedback from organizations powered by Deeplink Creators and Mayalok Venture infrastructure.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => {
                                setShowForm(!showForm)
                                setSubmittedSuccess(false)
                            }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#181A16] text-[#F3F0E8] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#2B2E28] transition-all shadow-sm"
                        >
                            <MessageSquarePlus size={15} className="text-[#D4B270]" />
                            <span>{showForm ? 'Close Review Form' : 'Submit an Endorsement'}</span>
                        </button>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#181A16]/15 text-[#181A16] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#E6E2D7] transition-all shadow-xs"
                        >
                            <span>Initiate Inquiry</span>
                            <ArrowRight size={14} className="text-[#9B7545]" />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ── Submit Review Interactive Form ── */}
            <AnimatePresence>
                {showForm && (
                    <motion.section
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 sm:px-6 lg:px-8 max-w-3xl mx-auto mb-16 overflow-hidden"
                    >
                        <div className="bg-white rounded-2xl border border-[#9B7545]/30 shadow-xl p-6 sm:p-10 space-y-6">
                            <div className="border-b border-[#181A16]/10 pb-4">
                                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                    <Sparkles size={14} />
                                    <span>Verified Client Submission</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#181A16] mt-1">
                                    Submit Your Review &amp; Endorsement
                                </h3>
                                <p className="text-xs sm:text-sm text-[#65675F] mt-1">
                                    Your feedback will be published across our live institutional proof network.
                                </p>
                            </div>

                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-[#181A16] font-semibold mb-1">
                                            Your Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Vikramaditya Singh"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#181A16]/15 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9B7545]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-[#181A16] font-semibold mb-1">
                                            Company / Organization *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            placeholder="e.g. Apex Holdings Pvt Ltd"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#181A16]/15 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9B7545]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-[#181A16] font-semibold mb-1">
                                            Executive Role / Title
                                        </label>
                                        <input
                                            type="text"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            placeholder="e.g. Chief Technology Officer"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#181A16]/15 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9B7545]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-[#181A16] font-semibold mb-1">
                                            Star Rating
                                        </label>
                                        <div className="flex items-center gap-2 py-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    type="button"
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    className="p-1 hover:scale-110 transition-transform"
                                                >
                                                    <Star
                                                        size={22}
                                                        className={star <= rating ? 'text-[#9B7545] fill-[#9B7545]' : 'text-gray-300'}
                                                    />
                                                </button>
                                            ))}
                                            <span className="text-xs font-mono text-[#65675F] ml-2 font-bold">{rating} / 5 Stars</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-[#181A16] font-semibold mb-1">
                                            Project / Engagement Scope
                                        </label>
                                        <input
                                            type="text"
                                            value={project}
                                            onChange={(e) => setProject(e.target.value)}
                                            placeholder="e.g. Sahyak CRM Multi-Tenant Deployment"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#181A16]/15 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9B7545]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-[#181A16] font-semibold mb-1">
                                            Measurable Metrics Achieved
                                        </label>
                                        <input
                                            type="text"
                                            value={metrics}
                                            onChange={(e) => setMetrics(e.target.value)}
                                            placeholder="e.g. +315% MQLs | 99.98% Uptime"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#181A16]/15 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9B7545]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-[#181A16] font-semibold mb-1">
                                        Endorsement &amp; Detailed Feedback *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Describe the architectural quality, impact on operations, and executive experience working with Deeplink Creators..."
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#181A16]/15 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9B7545] resize-y"
                                    />
                                </div>

                                <div className="pt-2 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-5 py-2.5 rounded-xl border border-[#181A16]/15 text-xs font-mono font-semibold text-[#65675F] hover:bg-[#FAFAF8]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#181A16] text-[#F3F0E8] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2B2E28] transition-colors shadow-sm disabled:opacity-50"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 size={14} className="animate-spin" />
                                                <span>Publishing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send size={14} className="text-[#D4B270]" />
                                                <span>Publish Review</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Confirmation Banner */}
            {submittedSuccess && (
                <div className="max-w-3xl mx-auto px-5 mb-10">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                        <p className="text-xs sm:text-sm font-mono font-semibold">
                            Thank you! Your verified endorsement has been recorded and published to our network.
                        </p>
                    </div>
                </div>
            )}

            {/* ── Verified Client Reviews Grid ── */}
            <section className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 sm:mb-28">
                <div className="flex items-center justify-between border-b border-[#181A16]/10 pb-4 mb-8">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#181A16]">
                            Verified Client Reviews ({testimonials.length})
                        </h2>
                        <p className="text-xs font-mono text-[#65675F] mt-0.5">
                            Authenticated executive accounts &amp; production deployments
                        </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-mono text-[#3F5544] font-semibold bg-[#3F5544]/10 px-3 py-1 rounded-full">
                        <CheckCircle2 size={13} />
                        <span>100% Verified Submissions</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-[#9B7545] animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={item.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#181A16]/10 shadow-sm flex flex-col justify-between hover:border-[#9B7545]/40 hover:shadow-md transition-all duration-300"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: item.rating || 5 }).map((_, i) => (
                                                <Star key={i} size={15} className="text-[#9B7545] fill-[#9B7545]" />
                                            ))}
                                        </div>

                                        <div className="inline-flex items-center gap-1 text-[10px] font-mono text-[#3F5544] bg-[#3F5544]/10 px-2 py-0.5 rounded-full font-semibold">
                                            <CheckCircle2 size={11} />
                                            <span>Verified Client</span>
                                        </div>
                                    </div>

                                    {item.project && (
                                        <div className="text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                            {item.project}
                                        </div>
                                    )}

                                    {item.metrics && (
                                        <div className="p-2.5 rounded-lg bg-[#F3F0E8] border border-[#181A16]/5 text-xs font-mono text-[#181A16] font-semibold">
                                            📈 {item.metrics}
                                        </div>
                                    )}

                                    <blockquote className="text-sm text-[#181A16]/90 leading-relaxed font-normal italic">
                                        &ldquo;{item.content}&rdquo;
                                    </blockquote>
                                </div>

                                <div className="pt-6 mt-6 border-t border-[#181A16]/10 flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-full bg-[#181A16] text-[#F3F0E8] font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold text-sm text-[#181A16]">
                                            {item.name}
                                        </h4>
                                        <p className="text-xs text-[#65675F] font-mono">
                                            {item.role} • {item.company}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Anonymised Case Studies Section ── */}
            <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#181A16]/10">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="marginal-label text-[#9B7545] font-bold block mb-2">
                        CONFIDENTIAL ENTERPRISE ENGAGEMENTS
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#181A16] tracking-tight mb-4">
                        Anonymised Industry Case Studies.
                    </h2>
                    <p className="text-sm sm:text-base text-[#65675F] leading-relaxed">
                        To preserve our institutional clients&apos; competitive moats, we maintain strict non-disclosure covenants. Here are select audited performance breakdowns.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {CASE_STUDIES.map((study, idx) => (
                        <div
                            key={idx}
                            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#181A16]/10 shadow-sm space-y-6 hover:border-[#9B7545]/40 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#F3F0E8] border border-[#181A16]/10 flex items-center justify-center flex-shrink-0">
                                    {study.icon}
                                </div>
                                <h3 className="font-heading font-bold text-base sm:text-lg text-[#181A16]">
                                    {study.industry}
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#F3F0E8] border border-[#181A16]/5">
                                <div>
                                    <div className="text-xl sm:text-2xl font-extrabold font-heading text-[#9B7545]">
                                        {study.metric1}
                                    </div>
                                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#65675F] font-semibold">
                                        {study.metric1Label}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-extrabold font-heading text-[#9B7545]">
                                        {study.metric2}
                                    </div>
                                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#65675F] font-semibold">
                                        {study.metric2Label}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 text-xs sm:text-sm">
                                <div>
                                    <span className="font-mono font-bold text-[#9B7545] uppercase text-[10px] tracking-widest block mb-0.5">
                                        The Challenge
                                    </span>
                                    <p className="text-[#65675F] leading-relaxed">
                                        {study.challenge}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-mono font-bold text-[#9B7545] uppercase text-[10px] tracking-widest block mb-0.5">
                                        Engineered Solution
                                    </span>
                                    <p className="text-[#65675F] leading-relaxed">
                                        {study.solution}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Bottom CTA ── */}
            <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-t border-[#181A16]/10 mb-16">
                <div className="p-8 sm:p-12 rounded-3xl bg-[#181A16] text-[#F3F0E8] space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                        <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                            Engineer Your Organization&apos;s Revenue Velocity.
                        </h2>
                        <p className="text-sm sm:text-base text-[#D0CBBF] leading-relaxed font-normal">
                            Deploy Sahyak CRM or our syndicated creator distribution engine for your enterprise.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4B270] text-[#181A16] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#E5C78A] transition-all shadow-md"
                            >
                                <span>Request Technical Briefing</span>
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
