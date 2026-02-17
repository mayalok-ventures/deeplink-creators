'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getTestimonials, TestimonialData } from '@/lib/firestore'

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

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
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-dark text-white overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>

                <motion.div
                    className="absolute top-1/3 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
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
                        <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium">Trusted by Businesses Across India</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight">
                            What Our Clients{' '}
                            <span className="text-primary-400">Say About Us</span>
                        </h1>
                        <p className="text-xl text-paragraph max-w-2xl mx-auto">
                            Real feedback from real businesses. See why companies trust Deeplink Creators to deliver measurable results.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            Client <span className="text-primary-400">Testimonials</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            Every review is from a real client who experienced real growth with our strategies.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="text-center py-16">
                            <Quote size={48} className="text-primary-500/30 mx-auto mb-4" />
                            <p className="text-lg text-paragraph">No testimonials yet. Check back soon!</p>
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id ?? index}
                                    variants={cardVariants}
                                    whileHover={{ y: -8 }}
                                    className="glass-card rounded-2xl p-8 flex flex-col"
                                >
                                    <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mb-6">
                                        <Quote size={24} className="text-primary-400" />
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
                                                        : 'text-dark-300'
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
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative section-padding bg-dark-200 text-white">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="container-custom text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6">
                            Ready to Be Our Next{' '}
                            <span className="text-accent">Success Story?</span>
                        </h2>
                        <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                            Join the growing list of businesses that chose results over promises. Let&apos;s build something measurable together.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8 text-dark"
                        >
                            Start Your Project
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
