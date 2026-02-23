'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
    question: string
    answer: string
}

interface FAQSectionProps {
    title?: string
    subtitle?: string
    faqs: FAQItem[]
}

export default function FAQSection({ title = 'Frequently Asked Questions', subtitle, faqs }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    useEffect(() => {
        const id = 'faq-schema-ld'
        const existing = document.getElementById(id)
        if (existing) existing.remove()

        const script = document.createElement('script')
        script.id = id
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer,
                },
            })),
        })
        document.head.appendChild(script)

        return () => {
            const el = document.getElementById(id)
            if (el) el.remove()
        }
    }, [faqs])

    return (
        <section className="section-padding bg-white dark:bg-[#0F1112] relative overflow-hidden">
            <div className="absolute inset-0 grid-bg" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C39A2B]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-lg text-paragraph max-w-3xl mx-auto">{subtitle}</p>
                    )}
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="glass-card rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                            >
                                <span className="font-semibold text-heading text-sm md:text-base pr-2">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    size={20}
                                    className={`text-[#C39A2B] flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                                            <div className="h-[1px] bg-[#4A4A4A]/10 dark:bg-white/[0.06] mb-4" />
                                            <p className="text-paragraph text-sm md:text-base leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
