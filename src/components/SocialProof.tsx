'use client'

import { TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const SocialProof = () => {
    return (
        <section className="section-padding bg-[#FAFAF8] relative overflow-hidden">
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                        Real Results for <span className="text-[#C39A2B]">India&apos;s Leading</span> Businesses
                    </h2>
                    <p className="text-lg text-paragraph max-w-3xl mx-auto mb-12">
                        SEO, performance marketing, and lead generation case studies for businesses across India — coming soon.
                    </p>

                    <div className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 md:p-12 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-[#C39A2B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <TrendingUp className="text-[#C39A2B]" size={32} />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-heading mb-4">
                            Case Studies Coming Soon
                        </h3>
                        <p className="text-paragraph">
                            We are currently working with our first clients. Detailed case studies with verified results will appear here.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default SocialProof
