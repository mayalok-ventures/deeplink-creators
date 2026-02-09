'use client'

import Hero from '@/components/Hero'
import ServiceStack from '@/components/ServiceStack'
import SocialProof from '@/components/SocialProof'
import { ArrowRight, Target, BarChart3, Users } from 'lucide-react'
import { motion } from 'framer-motion'

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

            {/* The Agitation Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8 }}
                className="section-padding relative overflow-hidden bg-dark-100"
            >
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.06),_transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,229,153,0.04),_transparent_60%)]" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-heading mb-6">
                            Are You Getting <span className="text-red-400">Vanity Metrics</span> Instead of <span className="text-accent">Real Revenue</span>?
                        </h2>
                        <p className="text-xl text-paragraph mb-8">
                            Most agencies give you &quot;likes&quot; and &quot;views&quot; that look good in reports but don&apos;t fill your bank account.
                            We&apos;re different. We only measure what matters: <span className="font-semibold text-primary-400">leads, sales, and ROI</span>.
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
                                            <stop offset="50%" stopColor="#00E599" stopOpacity="0.6" />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
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
                                    <ArrowRight size={16} className="text-primary-500/50" />
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
                                <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-accent via-accent-600 to-accent -z-10 opacity-80" />
                                <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-accent via-accent-600 to-accent -z-20 blur-md opacity-30" />
                                <div className="absolute inset-0 rounded-xl bg-dark-200 -z-[5]" />

                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent-500 to-accent-600 text-dark text-xs font-bold px-4 py-1 rounded-full shadow-lg tracking-wider"
                                >
                                    ★ RECOMMENDED
                                </motion.div>

                                <div className="text-accent mb-4">
                                    <Target size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-heading">What We Deliver</h3>
                                <ul className="text-paragraph text-left space-y-2">
                                    {['Qualified Leads', 'Actual Customers', 'Revenue Growth', 'Clear ROI Proof'].map((item) => (
                                        <li key={item} className="flex items-center gap-2">
                                            <span className="text-accent inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-xs font-bold flex-shrink-0">
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
                                className="glass-card p-6 rounded-xl relative z-10 hover:border-primary-500/20 transition-colors duration-300"
                            >
                                <div className="text-primary-400 mb-4">
                                    <BarChart3 size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-heading">The Difference</h3>
                                <p className="text-paragraph text-left">
                                    We don&apos;t just run ads. We build complete <span className="font-semibold text-heading">Revenue Machines</span> that work 24/7 to bring you customers while you sleep.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <ServiceStack />
            <SocialProof />

            {/* Final CTA Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="section-padding bg-dark-200 text-white relative overflow-hidden"
            >
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-10 left-[10%] w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 right-[10%] w-72 h-72 bg-primary-500/5 rounded-full blur-3xl animate-float-slow" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="container-custom text-center relative z-10"
                >
                    <div className="mx-auto max-w-3xl">
                        <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-10" />
                        <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-6 text-heading">
                            Ready to Turn Your Marketing into a{' '}
                            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary-400 to-accent animate-shimmer" style={{ backgroundSize: '200% auto' }}>
                                Revenue Machine
                            </span>
                            ?
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto text-paragraph">
                            Stop guessing. Start growing. Get your FREE ROI Audit and discover exactly how to get more customers for less money.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="relative inline-flex">
                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-600 rounded-lg blur-lg animate-pulse_glow" />
                            <a
                                href="/contact"
                                className="btn-secondary inline-flex items-center justify-center gap-2 relative z-10"
                            >
                                Get FREE ROI Audit
                                <ArrowRight size={20} />
                            </a>
                        </div>
                        <a
                            href="/contact"
                            className="bg-white/[0.05] border border-white/[0.1] text-heading font-semibold py-3 px-6 rounded-lg hover:bg-white/[0.1] hover:border-primary-500/30 transition-all"
                        >
                            Schedule a Call
                        </a>
                    </div>
                </motion.div>
            </motion.section>
        </>
    )
}
