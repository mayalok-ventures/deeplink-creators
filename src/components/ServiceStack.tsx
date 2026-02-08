'use client'

import { Search, TrendingUp, Target, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import ServiceCard from './ServiceCard'

const ServiceStack = () => {
    const services = [
        {
            icon: <Search size={32} />,
            title: "Neuro-SEO",
            benefit: "Free Traffic from Google That Actually Converts",
            description: "Our proprietary Neuro-SEO method doesn't just rank pages - it ranks pages that actually convert visitors into customers.",
            features: [
                "Local SEO for Greater Noida",
                "Conversion-Optimized Pages",
                "Competitor Analysis",
                "Monthly Performance Reports"
            ],
            cta: "Get SEO Audit",
            href: "/services/seo-greater-noida",
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Performance Marketing",
            benefit: "Paid Ads That Make More Than They Cost",
            description: "Stop wasting money on clicks. We build complete funnel systems that guarantee positive ROI on every rupee spent.",
            features: [
                "Facebook/Google Ads",
                "ROI-Focused Campaigns",
                "Conversion Tracking",
                "Weekly Optimization"
            ],
            cta: "Optimize My Ads",
            href: "/services/performance-marketing",
            gradient: "from-green-500 to-emerald-500",
        },
        {
            icon: <Target size={32} />,
            title: "Conversion Rate Optimization",
            benefit: "Turn Visitors into Paying Customers",
            description: "Why pay for more traffic when you can convert more of your existing visitors? We specialize in fixing leaky funnels.",
            features: [
                "Funnel Analysis",
                "A/B Testing",
                "Landing Page Design",
                "Checkout Optimization"
            ],
            cta: "Fix My Funnel",
            href: "/services/conversion-optimization",
            gradient: "from-orange-500 to-red-500",
        },
        {
            icon: <Globe size={32} />,
            title: "Brand Authority",
            benefit: "Become The Industry Leader in Greater Noida",
            description: "Build a brand that commands premium prices. We position you as the expert that customers trust automatically.",
            features: [
                "Content Strategy",
                "PR & Outreach",
                "Social Proof Systems",
                "Industry Authority"
            ],
            cta: "Build My Brand",
            href: "/services/branding",
            gradient: "from-purple-500 to-pink-500",
        }
    ]

    return (
        <section id="services" className="section-padding bg-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-pink-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        We Don&apos;t Sell Services. We{' '}
                        <span className="bg-gradient-to-r from-primary-600 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                            Deliver Results
                        </span>
                        .
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Every strategy is designed with one goal: <span className="font-semibold">maximize your revenue</span>.
                        No vanity metrics, only what actually impacts your bottom line.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServiceStack
