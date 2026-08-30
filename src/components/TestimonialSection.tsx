'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ArrowRight, CheckCircle2, Building, Award } from 'lucide-react'
import Link from 'next/link'
import { getTestimonials, TestimonialData } from '@/lib/db-client'

export default function TestimonialSection() {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTestimonials()
            .then((data) => {
                if (data && data.length > 0) {
                    setTestimonials(data)
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    if (loading && testimonials.length === 0) return null

    return (
        <section className="py-16 sm:py-24 md:py-28 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#181A16]/10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
                <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E2D7] border border-[#181A16]/10 text-[11px] font-mono font-bold tracking-widest uppercase text-[#181A16]">
                        <Award size={13} className="text-[#9B7545]" />
                        VERIFIED CLIENT ENDORSEMENTS
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#181A16] tracking-tight leading-tight">
                        Proven Results.{' '}
                        <span className="text-brass-gradient">
                            Documented Revenue.
                        </span>
                    </h2>

                    <p className="text-sm sm:text-base text-[#65675F] leading-relaxed">
                        Direct enterprise feedback from CTOs, Managing Directors, and Growth Leaders who deployed Sahyak CRM and our creator distribution systems.
                    </p>
                </div>

                <Link
                    href="/testimonials"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#181A16]/15 text-xs font-mono font-bold uppercase tracking-wider text-[#181A16] hover:bg-[#181A16] hover:text-white shadow-xs transition-all duration-300 self-start md:self-auto"
                >
                    <span>View All Reviews ({testimonials.length})</span>
                    <ArrowRight size={14} className="text-[#9B7545]" />
                </Link>
            </div>

            {/* Testimonials Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.slice(0, 3).map((item, index) => (
                    <motion.div
                        key={item.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 sm:p-8 rounded-2xl bg-white border border-[#181A16]/10 shadow-sm flex flex-col justify-between hover:border-[#9B7545]/40 hover:shadow-md transition-all duration-300 relative group"
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
        </section>
    )
}
