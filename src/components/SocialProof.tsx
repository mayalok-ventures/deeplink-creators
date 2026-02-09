'use client'

import { TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const SocialProof = () => {
    return (
        <section className="section-padding bg-dark-100 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg" />
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-heading mb-4">
                        Real Results for <span className="text-primary-400">Greater Noida</span> Businesses
                    </h2>
                    <p className="text-xl text-paragraph max-w-3xl mx-auto mb-12">
                        Client success stories and case studies will be published here soon.
                    </p>

                    <div className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl mx-auto border-t border-gold/20">
                        <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <TrendingUp className="text-primary-400" size={32} />
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
