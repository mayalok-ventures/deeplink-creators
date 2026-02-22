'use client'

import Hero from '@/components/Hero'
import ServiceStack from '@/components/ServiceStack'
import TechStack from '@/components/TechStack'
import TestimonialSection from '@/components/TestimonialSection'
import FAQSection from '@/components/FAQSection'
import SpotSection from '@/components/SpotSection'
import { ArrowRight, Target, BarChart3, Users, CheckCircle2, XCircle, Search, FileBarChart, Presentation, Brain, Zap, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
}

export default function HomePage() {
    return (
        <>
            <Hero />
            <SpotSection />

            {/* The Agitation Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8 }}
                className="section-padding relative overflow-hidden bg-[#F4F5F6] dark:bg-[#131415]"
            >
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(195,154,43,0.04),_transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(195,154,43,0.03),_transparent_60%)]" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl md:text-3xl font-extrabold text-heading mb-6">
                            Are You Getting <span className="text-red-400">Vanity Metrics</span> Instead of <span className="text-[#C39A2B]">Real Revenue</span>?
                        </h2>
                        <p className="text-lg text-paragraph mb-8">
                            Most digital marketing agencies give you &quot;likes&quot; and &quot;views&quot; that look good in reports but don&apos;t fill your bank account.
                            We only measure what matters: <span className="font-semibold text-[#C39A2B]">leads, sales, and ROI</span>.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 relative">
                            {/* Decorative connecting line */}
                            <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] -translate-y-1/2 z-0">
                                <svg width="100%" height="40" viewBox="0 0 800 40" fill="none" preserveAspectRatio="none">
                                    <motion.path
                                        d="M0 20 Q200 5 400 20 Q600 35 800 20"
                                        stroke="url(#line-gradient)"
                                        strokeWidth="2"
                                        strokeDasharray="8 4"
                                        fill="none"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.6, ease: 'easeInOut' }}
                                    />
                                    <defs>
                                        <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                                            <stop offset="50%" stopColor="#C39A2B" stopOpacity="0.6" />
                                            <stop offset="100%" stopColor="#E0C27A" stopOpacity="0.4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1.8, duration: 0.4 }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2"
                                >
                                    <ArrowRight size={16} className="text-[#C39A2B]/50" />
                                </motion.div>
                            </div>

                            {/* Card 1 */}
                            <motion.div
                                custom={0}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="glass-card p-6 rounded-xl relative z-10 hover:border-red-500/20 transition-colors duration-300"
                            >
                                <div className="text-red-400 mb-4">
                                    <Users size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-heading">What Others Give You</h3>
                                <ul className="text-paragraph text-left space-y-2">
                                    {['Likes & Followers', 'Empty Website Traffic', 'Beautiful Reports', 'Monthly Retainer Bills'].map((item) => (
                                        <li key={item} className="flex items-center gap-2">
                                            <span className="text-red-400 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-xs font-bold flex-shrink-0">
                                                ✗
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Card 2 - RECOMMENDED */}
                            <motion.div
                                custom={1}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="relative z-10 p-6 rounded-xl transform md:scale-105"
                            >
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
                                    ★ RECOMMENDED
                                </motion.div>

                                <div className="text-[#C39A2B] mb-4">
                                    <Target size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-heading dark:text-white">What We Deliver</h3>
                                <ul className="text-paragraph dark:text-white/60 text-left space-y-2">
                                    {['Qualified Leads', 'Actual Customers', 'Revenue Growth', 'Clear ROI Proof'].map((item) => (
                                        <li key={item} className="flex items-center gap-2">
                                            <span className="text-[#C39A2B] inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#C39A2B]/10 text-xs font-bold flex-shrink-0">
                                                ✓
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div
                                custom={2}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="glass-card p-6 rounded-xl relative z-10 hover:border-[#C39A2B]/20 transition-colors duration-300"
                            >
                                <div className="text-[#C39A2B] mb-4">
                                    <BarChart3 size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-heading">The Difference</h3>
                                <p className="text-paragraph text-left">
                                    We don&apos;t just run Google Ads or Facebook Ads. As NCR&apos;s premier Revenue Engineering firm, we build complete <span className="font-semibold text-heading">Revenue Machines</span> — enterprise SEO, PPC, and lead generation systems that bring you customers 24/7.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <ServiceStack />
            <TechStack />

            {/* How We Build Revenue Architectures */}
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
                            A 3-phase system engineered to transform your business from &quot;running campaigns&quot; to &quot;operating a revenue machine.&quot;
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#C39A2B]/20 via-[#C39A2B]/40 to-[#C39A2B]/20" />
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {[
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
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
                                    className="relative glass-card rounded-2xl p-8"
                                >
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

            {/* Who We Work With (And Who We Don't) */}
            <section className="section-padding bg-white dark:bg-[#0F1112] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C39A2B]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                            We Are <span className="text-[#C39A2B]">Not</span> For Everyone.
                        </h2>
                        <p className="text-lg text-paragraph max-w-2xl mx-auto">
                            We act as an outsourced Growth Partner. We only take on clients when we are 100% certain we can scale their net profit.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* WHO THIS IS FOR */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="glass-card rounded-2xl p-8 border-[#C39A2B]/20 hover:border-[#C39A2B]/40 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-[#C39A2B]/10 rounded-lg flex items-center justify-center">
                                    <CheckCircle2 size={22} className="text-[#C39A2B]" />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-heading">Who This IS For</h3>
                            </div>
                            <ul className="space-y-5">
                                {[
                                    {
                                        title: 'Established Enterprises & Manufacturers',
                                        desc: 'You have a proven product but are losing digital market share to newer competitors.',
                                    },
                                    {
                                        title: 'High-Ticket Real Estate & EdTech',
                                        desc: 'A single customer brings you massive lifetime value, and you need a system to generate them predictably.',
                                    },
                                    {
                                        title: 'Aggressive Scalers',
                                        desc: 'You have the operational capacity to handle a 3X surge in leads and the budget to fuel real growth.',
                                    },
                                ].map((item) => (
                                    <li key={item.title} className="flex gap-3">
                                        <span className="text-[#C39A2B] inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#C39A2B]/10 text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                                        <div>
                                            <p className="font-semibold text-heading text-sm">{item.title}</p>
                                            <p className="text-paragraph text-sm mt-1">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* WHO THIS IS NOT FOR */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="glass-card rounded-2xl p-8 border-red-500/10 hover:border-red-500/20 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                                    <XCircle size={22} className="text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-heading">Who This Is NOT For</h3>
                            </div>
                            <ul className="space-y-5">
                                {[
                                    {
                                        title: 'Early-Stage Startups',
                                        desc: 'Looking for "cheap brand awareness" or viral social media posts.',
                                    },
                                    {
                                        title: 'Indecisive Operators',
                                        desc: 'You want guarantees without giving us the control to fix your broken sales funnels.',
                                    },
                                    {
                                        title: 'Budget-Shoppers',
                                        desc: 'You are looking for a ₹15,000/month agency to manage your Facebook page.',
                                    },
                                ].map((item) => (
                                    <li key={item.title} className="flex gap-3">
                                        <span className="text-red-400 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-xs font-bold flex-shrink-0 mt-0.5">✗</span>
                                        <div>
                                            <p className="font-semibold text-heading text-sm">{item.title}</p>
                                            <p className="text-paragraph text-sm mt-1">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            <TestimonialSection />

            <FAQSection
                title="Got Questions? Here Are Honest Answers."
                subtitle="We don't hide behind jargon. Here's what serious business owners ask us before they sign."
                faqs={[
                    {
                        question: "How is Deeplink Creators different from other digital marketing agencies in NCR?",
                        answer: "We are not a traditional agency; we are a Revenue Engineering firm. While other agencies sell you \"likes, shares, and brand awareness,\" we strictly focus on your P&L. If a marketing campaign doesn't directly decrease your Cost Per Acquisition (CPA) or increase your Net Profit, we shut it down. We use Data Science and Neuro-Marketing to build predictable sales systems."
                    },
                    {
                        question: "Do you guarantee results or a specific ROI?",
                        answer: "We guarantee absolute mathematical transparency. In B2B and High-Ticket sales, anyone promising a fixed overnight ROI is lying to you. We guarantee that your ad spend will be tracked to the last rupee, your vanity metrics will be ignored, and every campaign will be ruthlessly optimized to scale your revenue."
                    },
                    {
                        question: "We have burned money on digital marketing before. Why should we trust you?",
                        answer: "Because we don't operate on guesswork. We start with a brutal ROI Audit of your current systems to show you exactly where your money is leaking (leaky funnels, bad tracking, weak positioning). We fix the foundation before asking you to scale your ad budget."
                    },
                    {
                        question: "Do you work with all types of businesses?",
                        answer: "No. We are highly selective. We exclusively partner with high-ticket businesses (Manufacturers, Real Estate Developers, EdTech, and Enterprise SaaS) who have the capacity to scale and are serious about dominating their market. We do not work with early-stage startups looking for \"cheap branding.\""
                    },
                    {
                        question: "What does your pricing structure look like?",
                        answer: "Our pricing is structured for serious operators. We do not offer generic ₹15,000/month packages. We operate on a combination of strategic retainers and performance-driven scaling models. Book a Discovery Call, and we will build a custom financial model for your growth."
                    },
                ]}
            />

            {/* ROI Audit Roadmap */}
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                            What Happens When You{' '}
                            <span className="text-[#C39A2B]">Claim Your Audit</span>?
                        </h2>
                        <p className="text-lg text-paragraph max-w-2xl mx-auto">
                            No spam calls. No generic PDF. Here&apos;s exactly what happens next.
                        </p>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="hidden md:block absolute top-0 bottom-0 left-[calc(2rem+1px)] w-[2px] bg-gradient-to-b from-[#C39A2B]/40 via-[#C39A2B]/20 to-[#C39A2B]/40" />

                        <div className="space-y-8 md:space-y-10">
                            {[
                                {
                                    step: '01',
                                    icon: <Search size={24} />,
                                    title: 'The Discovery Diagnostic',
                                    time: '15 Minutes',
                                    desc: 'We get on a brief, no-BS call to understand your current CAC (Customer Acquisition Cost) and revenue leaks. No sales pitch — just questions.',
                                },
                                {
                                    step: '02',
                                    icon: <FileBarChart size={24} />,
                                    title: 'The Data Teardown',
                                    time: '48 Hours',
                                    desc: 'Our team analyzes your current ad accounts, SEO positioning, and competitor strategies. We find exactly where your money is leaking.',
                                },
                                {
                                    step: '03',
                                    icon: <Presentation size={24} />,
                                    title: 'The Revenue Blueprint',
                                    time: 'In-Person / Zoom',
                                    desc: 'We present a mathematical roadmap showing exactly how we will scale your ARR. If you like it, we partner up. If not, the blueprint is yours to keep.',
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="flex gap-6 md:gap-8"
                                >
                                    <div className="flex flex-col items-center flex-shrink-0">
                                        <div className="w-16 h-16 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-2xl flex items-center justify-center text-[#C39A2B] relative z-10">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <div className="glass-card rounded-xl p-6 flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-bold uppercase tracking-widest text-[#C39A2B]">Step {item.step}</span>
                                            <span className="text-xs text-paragraph bg-[#C39A2B]/10 px-2.5 py-0.5 rounded-full">{item.time}</span>
                                        </div>
                                        <h3 className="text-lg font-bold font-heading text-heading mb-2">{item.title}</h3>
                                        <p className="text-paragraph text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="section-padding bg-[#0F1112] text-white relative overflow-hidden"
            >
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-10 left-[10%] w-64 h-64 bg-[#C39A2B]/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 right-[10%] w-72 h-72 bg-[#C39A2B]/3 rounded-full blur-3xl animate-float-slow" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="container-custom text-center relative z-10"
                >
                    <div className="mx-auto max-w-3xl">
                        <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-10" />
                        <h2 className="text-2xl md:text-3xl font-extrabold font-heading mb-6 text-white">
                            Ready to Turn Your Marketing into a{' '}
                            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#B87A14] via-[#E0C27A] to-[#B87A14] animate-shimmer" style={{ backgroundSize: '200% auto' }}>
                                Revenue Machine
                            </span>
                            ?
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto text-white/60">
                            Whether you need enterprise SEO services, performance marketing, or a complete digital marketing strategy — get your FREE ROI Audit and discover how to get more customers for less money.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <div className="relative inline-flex">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#B87A14] to-[#E0C27A] rounded-lg blur-lg animate-pulse_glow" />
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 relative z-10"
                        >
                            Get FREE ROI Audit
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                    <Link
                        href="/contact"
                        className="bg-white/[0.05] border border-white/[0.1] text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/[0.1] hover:border-[#C39A2B]/30 transition-all"
                    >
                        Schedule a Call
                    </Link>
                    </div>
                </motion.div>
            </motion.section>
        </>
    )
}
