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
        color: "from-green-500 to-green-600",
        borderColor: "border-green-500",
    },
    {
        title: "Real Estate Builder",
        metric: "₹2.3 Crore",
        period: "in Sales Generated",
        icon: <DollarSign size={24} />,
        description: "From Facebook ads that were previously losing money",
        color: "from-blue-500 to-blue-600",
        borderColor: "border-blue-500",
    },
    {
        title: "Educational Institute",
        metric: "500+ Admissions",
        period: "in 6 Months",
        icon: <Users size={24} />,
        description: "Through targeted digital marketing campaigns",
        color: "from-purple-500 to-purple-600",
        borderColor: "border-purple-500",
    },
    {
        title: "E-commerce Brand",
        metric: "7X ROI",
        period: "on Ad Spend",
        icon: <Target size={24} />,
        description: "Optimized their complete sales funnel",
        color: "from-orange-500 to-orange-600",
        borderColor: "border-orange-500",
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
        opacity: 0.15,
        scale: 1,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
}

const SocialProof = () => {
    return (
        <section className="section-padding bg-gray-50">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Real Results for <span className="text-primary-600">Greater Noida</span> Businesses
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Don&apos;t just take our word for it. See the numbers that matter to business owners.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${study.borderColor} hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-default`}
                        >
                            <div
                                className={`w-12 h-12 bg-gradient-to-br ${study.color} rounded-lg flex items-center justify-center mb-4`}
                            >
                                <div className="text-white">{study.icon}</div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">{study.title}</h3>

                            <div className="mb-3">
                                <div className="text-2xl md:text-3xl font-bold text-gray-900">{study.metric}</div>
                                <div className="text-gray-600">{study.period}</div>
                            </div>

                            <p className="text-gray-600 text-sm">{study.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonial Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={testimonialVariants}
                    className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white"
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                What Our <span className="text-secondary-300">Clients Say</span>
                            </h3>
                            <p className="text-primary-100">
                                Real feedback from business owners we&apos;ve helped grow
                            </p>
                        </div>

                        <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 overflow-hidden">
                            {/* Animated decorative quote marks */}
                            <motion.span
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={quoteVariants}
                                className="absolute -top-2 left-4 text-[120px] md:text-[160px] leading-none font-serif text-white select-none pointer-events-none"
                                aria-hidden="true"
                            >
                                &ldquo;
                            </motion.span>
                            <motion.span
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={quoteVariants}
                                className="absolute -bottom-16 right-4 text-[120px] md:text-[160px] leading-none font-serif text-white select-none pointer-events-none"
                                aria-hidden="true"
                            >
                                &rdquo;
                            </motion.span>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center text-xl font-bold">
                                        RS
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Rajesh Sharma</h4>
                                        <p className="text-primary-200">Owner, Sharma Manufacturing Works</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-400 fill-yellow-400"
                                                />
                                            ))}
                                            <span className="text-sm text-primary-300 ml-1">Greater Noida</span>
                                        </div>
                                    </div>
                                </div>

                                <blockquote className="text-lg italic mb-8 leading-relaxed">
                                    &ldquo;For 3 years, I wasted money on digital marketing agencies who showed me reports full of &apos;likes&apos; and &apos;views&apos;.
                                    Deeplink Creators showed me actual leads and sales. Within 90 days, they generated &#8377;82 lakh worth of business
                                    that we wouldn&apos;t have gotten otherwise. This is the only agency that talks about profit, not just traffic.&rdquo;
                                </blockquote>

                                <div className="flex items-center justify-between border-t border-white/20 pt-6">
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-extrabold">&#8377;82 Lakh</div>
                                        <div className="text-sm text-primary-200 mt-1">New Business Generated</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-extrabold">47</div>
                                        <div className="text-sm text-primary-200 mt-1">Qualified Leads/Month</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-extrabold">300%</div>
                                        <div className="text-sm text-primary-200 mt-1">Growth in Revenue</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <a
                                href="/results"
                                className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
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
