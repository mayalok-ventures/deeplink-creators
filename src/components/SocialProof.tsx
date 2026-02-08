'use client'

import { TrendingUp, Users, DollarSign, Target, ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const caseStudies = [
    {
        title: "Manufacturing Client in Greater Noida",
        metric: "300% Growth",
        period: "in 3 Months",
        icon: <TrendingUp size={24} />,
        description: "Went from 2 leads/month to 47 qualified leads/month",
        color: "from-accent to-accent-600",
        borderColor: "border-accent/30",
    },
    {
        title: "Real Estate Builder",
        metric: "₹2.3 Crore",
        period: "in Sales Generated",
        icon: <DollarSign size={24} />,
        description: "From Facebook ads that were previously losing money",
        color: "from-primary-400 to-primary-600",
        borderColor: "border-primary-500/30",
    },
    {
        title: "Educational Institute",
        metric: "500+ Admissions",
        period: "in 6 Months",
        icon: <Users size={24} />,
        description: "Through targeted digital marketing campaigns",
        color: "from-purple-400 to-purple-600",
        borderColor: "border-purple-500/30",
    },
    {
        title: "E-commerce Brand",
        metric: "7X ROI",
        period: "on Ad Spend",
        icon: <Target size={24} />,
        description: "Optimized their complete sales funnel",
        color: "from-orange-400 to-orange-600",
        borderColor: "border-orange-500/30",
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: 'easeOut',
        },
    }),
}

const testimonialVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
}

const quoteVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 0.08,
        scale: 1,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
}

const SocialProof = () => {
    return (
        <section className="section-padding bg-dark-100 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg" />
            <div className="container-custom relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-heading mb-4">
                        Real Results for <span className="text-primary-400">Greater Noida</span> Businesses
                    </h2>
                    <p className="text-xl text-paragraph max-w-3xl mx-auto">
                        Don&apos;t just take our word for it. See the numbers that matter to business owners.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            className={`glass-card-hover rounded-xl p-6 border-l-4 ${study.borderColor} cursor-default`}
                        >
                            <div
                                className={`w-12 h-12 bg-gradient-to-br ${study.color} rounded-lg flex items-center justify-center mb-4`}
                            >
                                <div className="text-white">{study.icon}</div>
                            </div>

                            <h3 className="text-lg font-bold font-heading text-heading mb-2">{study.title}</h3>

                            <div className="mb-3">
                                <div className="text-2xl md:text-3xl font-extrabold font-heading text-heading">{study.metric}</div>
                                <div className="text-paragraph">{study.period}</div>
                            </div>

                            <p className="text-paragraph text-sm">{study.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonial Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={testimonialVariants}
                    className="glass-card rounded-2xl p-8 md:p-12 border-t border-gold/20"
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl md:text-3xl font-extrabold font-heading mb-4 text-heading">
                                What Our <span className="text-accent">Clients Say</span>
                            </h3>
                            <p className="text-paragraph">
                                Real feedback from business owners we&apos;ve helped grow
                            </p>
                        </div>

                        <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 md:p-8 overflow-hidden border border-white/[0.06]">
                            <motion.span
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={quoteVariants}
                                className="absolute -top-2 left-4 text-[120px] md:text-[160px] leading-none font-serif text-primary-400 select-none pointer-events-none"
                                aria-hidden="true"
                            >
                                &ldquo;
                            </motion.span>
                            <motion.span
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={quoteVariants}
                                className="absolute -bottom-16 right-4 text-[120px] md:text-[160px] leading-none font-serif text-primary-400 select-none pointer-events-none"
                                aria-hidden="true"
                            >
                                &rdquo;
                            </motion.span>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center text-xl font-bold text-dark">
                                        RS
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-heading">Rajesh Sharma</h4>
                                        <p className="text-paragraph">Owner, Sharma Manufacturing Works</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className="text-gold fill-gold"
                                                />
                                            ))}
                                            <span className="text-sm text-paragraph ml-1">Greater Noida</span>
                                        </div>
                                    </div>
                                </div>

                                <blockquote className="text-lg italic mb-8 leading-relaxed text-paragraph">
                                    &ldquo;For 3 years, I wasted money on digital marketing agencies who showed me reports full of &apos;likes&apos; and &apos;views&apos;.
                                    Deeplink Creators showed me actual leads and sales. Within 90 days, they generated &#8377;82 lakh worth of business
                                    that we wouldn&apos;t have gotten otherwise. This is the only agency that talks about profit, not just traffic.&rdquo;
                                </blockquote>

                                <div className="flex items-center justify-between border-t border-gold/20 pt-6">
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-extrabold font-heading text-heading">&#8377;82 Lakh</div>
                                        <div className="text-sm text-paragraph mt-1">New Business Generated</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-extrabold font-heading text-heading">47</div>
                                        <div className="text-sm text-paragraph mt-1">Qualified Leads/Month</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-extrabold font-heading text-heading">300%</div>
                                        <div className="text-sm text-paragraph mt-1">Growth in Revenue</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <a
                                href="/results"
                                className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] text-heading font-semibold py-3 px-6 rounded-lg hover:bg-white/[0.1] hover:border-primary-500/30 transition-all"
                            >
                                See More Case Studies
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default SocialProof
