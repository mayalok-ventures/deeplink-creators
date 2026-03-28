'use client'

import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ContactPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white text-heading overflow-hidden">
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <img src="/images/hero/hero-contact.webp" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white" />
                </div><div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#C39A2B]/10 border border-[#C39A2B]/20 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 bg-[#C39A2B] rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium">We Respond Within 24 Hours</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-heading font-extrabold mb-6 leading-tight">
                            Ready to <span className="text-[#C39A2B]">Scale Your Business</span>?
                        </h1>
                        <p className="text-lg text-paragraph">
                            Fill out the form to get your FREE ROI Audit. India&apos;s leading revenue-focused digital marketing agency — serving businesses across India with enterprise SEO, performance marketing, and lead generation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form + Contact Info */}
            <section className="section-padding bg-[#FAFAF8]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="lg:col-span-2"
                        >
                            <ContactForm />
                        </motion.div>

                        {/* Contact Info Sidebar */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.12 } },
                            }}
                            className="space-y-8"
                        >
                            {/* Why Work With Us */}
                            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-6">
                                <h3 className="text-xl font-heading font-bold text-heading mb-6">Why Work With Us?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-[#C39A2B]/10 p-2 rounded-lg">
                                            <div className="w-2 h-2 bg-[#C39A2B] rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-heading">ROI-First Approach</h4>
                                            <p className="text-sm text-paragraph">We only measure what impacts your revenue</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-[#C39A2B]/10 p-2 rounded-lg">
                                            <div className="w-2 h-2 bg-[#C39A2B] rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-heading">Pan-India Expertise</h4>
                                            <p className="text-sm text-paragraph">Enterprise SEO, performance marketing &amp; lead generation experts serving businesses across India</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-[#C39A2B]/10 p-2 rounded-lg">
                                            <div className="w-2 h-2 bg-[#C39A2B] rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-heading">Neuro-Marketing Experts</h4>
                                            <p className="text-sm text-paragraph">SEO, Google Ads &amp; Facebook Ads strategies backed by psychology</p>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Contact Details */}
                            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-6 border-[#C39A2B]/20">
                                <h3 className="text-xl font-heading font-bold text-heading mb-6">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#C39A2B]/10 p-2 rounded-lg">
                                            <Phone className="text-[#C39A2B]" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-heading">Call Us</p>
                                            <span className="text-[#C39A2B]">
                                                Contact Us
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#C39A2B]/10 p-2 rounded-lg">
                                            <Mail className="text-[#C39A2B]" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-heading">Email Us</p>
                                            <a
                                                href="mailto:growth@deeplinkcreators.com"
                                                className="text-[#C39A2B] hover:text-[#A9791B]"
                                            >
                                                growth@deeplinkcreators.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#C39A2B]/10 p-2 rounded-lg">
                                            <MapPin className="text-[#C39A2B]" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-heading">Visit Us</p>
                                            <p className="text-paragraph">
                                               <span className="font-semibold">India</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#C39A2B]/10 p-2 rounded-lg">
                                            <Clock className="text-[#C39A2B]" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-heading">Business Hours</p>
                                            <p className="text-paragraph">Mon - Fri: 9AM - 6PM</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* High-Ticket CTA */}
                            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-6">
                                <h3 className="text-xl font-heading font-bold mb-4">For High-Ticket Clients</h3>
                                <p className="text-paragraph mb-4">
                                    Businesses with ₹1L+ monthly budgets get:
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#C39A2B] rounded-full"></div>
                                        <span className="text-paragraph">Dedicated Account Manager</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#C39A2B] rounded-full"></div>
                                        <span className="text-paragraph">Weekly Strategy Calls</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#C39A2B] rounded-full"></div>
                                        <span className="text-paragraph">Priority Support</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#C39A2B] rounded-full"></div>
                                        <span className="text-paragraph">Custom Dashboard Access</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}
