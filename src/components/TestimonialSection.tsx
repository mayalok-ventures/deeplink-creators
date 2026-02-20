'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getFeaturedTestimonials, TestimonialData } from '@/lib/firestore'

const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getFeaturedTestimonials()
            .then(setTestimonials)
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    if (loading || testimonials.length === 0) return null

    return (
        <section className="section-padding bg-[#F4F5F6] relative overflow-hidden">
            <div className="absolute inset-0 grid-bg" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-[#C39A2B]/5 via-[#E0C27A]/5 to-[#C39A2B]/3 rounded-full blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-heading mb-4">
                        What Our Clients{' '}
                        <span className="text-gradient">Say</span>
                    </h2>
                    <p className="text-xl text-paragraph max-w-3xl mx-auto">
                        Don&apos;t just take our word for it — hear from the businesses we&apos;ve helped grow.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id ?? index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
                            className="glass-card rounded-2xl p-8 flex flex-col"
                        >
                            <div className="w-10 h-10 bg-[#C39A2B]/10 rounded-xl flex items-center justify-center mb-6">
                                <Quote className="text-[#C39A2B]" size={20} />
                            </div>

                            <p className="text-paragraph italic leading-relaxed flex-1 mb-6">
                                &ldquo;{testimonial.content}&rdquo;
                            </p>

                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
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
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/testimonials"
                        className="inline-flex items-center gap-2 text-[#C39A2B] hover:text-[#A9791B] font-semibold transition-colors"
                    >
                        View All Testimonials
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default TestimonialSection
