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
            <section className="relative pt-32 pb-20 bg-dark text-white overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>

                <motion.div
                    className="absolute top-1/3 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
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
                            <span className="text-sm font-medium">We Respond Within 24 Hours</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6 leading-tight">
                            Ready to <span className="text-accent">Scale Your Business</span>?
                        </h1>
                        <p className="text-xl text-paragraph">
                            Fill out the form to get your FREE ROI Audit. The best digital marketing agency in Greater Noida &amp; Noida — serving businesses across Delhi NCR with SEO, performance marketing, and branding.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form + Contact Info */}
            <section className="section-padding bg-dark-50">
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
                            <motion.div variants={fadeUp} className="glass-card rounded-xl p-6">
                                <h3 className="text-xl font-heading font-bold text-heading mb-6">Why Work With Us?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-green-500/10 p-2 rounded-lg">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-heading">ROI-First Approach</h4>
                                            <p className="text-sm text-paragraph">We only measure what impacts your revenue</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-blue-500/10 p-2 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-heading">Greater Noida Specialists</h4>
                                            <p className="text-sm text-paragraph">Local SEO &amp; digital marketing experts for Greater Noida, Noida &amp; Delhi NCR</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-purple-500/10 p-2 rounded-lg">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-heading">Neuro-Marketing Experts</h4>
                                            <p className="text-sm text-paragraph">SEO, Google Ads &amp; Facebook Ads strategies backed by psychology</p>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Contact Details */}
                            <motion.div variants={fadeUp} className="glass-card rounded-xl p-6 border-primary-500/20">
                                <h3 className="text-xl font-heading font-bold text-heading mb-6">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary-500/10 p-2 rounded-lg">
                                            <Phone className="text-primary-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-heading">Call Us</p>
                                            <span className="text-primary-400">
                                                Contact Us
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary-500/10 p-2 rounded-lg">
                                            <Mail className="text-primary-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-heading">Email Us</p>
                                            <a
                                                href="mailto:growth@deeplinkcreators.com"
                                                className="text-primary-400 hover:text-primary-300"
                                            >
                                                growth@deeplinkcreators.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary-500/10 p-2 rounded-lg">
                                            <MapPin className="text-primary-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-heading">Visit Us</p>
                                            <p className="text-paragraph">
                                                Sector Alpha 1<br />
                                                <span className="font-semibold">Greater Noida</span>, UP 201310
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary-500/10 p-2 rounded-lg">
                                            <Clock className="text-primary-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-heading">Business Hours</p>
                                            <p className="text-paragraph">Mon - Fri: 9AM - 6PM</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* High-Ticket CTA */}
                            <motion.div variants={fadeUp} className="glass-card text-white rounded-xl p-6">
                                <h3 className="text-xl font-heading font-bold mb-4">For High-Ticket Clients</h3>
                                <p className="text-paragraph mb-4">
                                    Businesses with ₹1L+ monthly budgets get:
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                        <span className="text-paragraph">Dedicated Account Manager</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                        <span className="text-paragraph">Weekly Strategy Calls</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                        <span className="text-paragraph">Priority Support</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
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
