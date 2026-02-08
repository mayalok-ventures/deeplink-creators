import type { Metadata } from 'next'
import { CheckCircle, BarChart3, Target, Clock, Users, Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'SEO Services in Greater Noida | Neuro-SEO Methodology | Deeplink Creators',
    description: 'Get more customers from Google with our Neuro-SEO method. Serving Greater Noida businesses with conversion-focused SEO strategies.',
}

export default function SEOServicePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-dark overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-heading mb-6">
                            SEO Services in <span className="text-primary-400">Greater Noida</span> That Actually Drive Customers
                        </h1>
                        <p className="text-xl text-paragraph mb-8">
                            Tired of ranking on page 2? Our Neuro-SEO methodology targets the exact keywords that <span className="font-semibold">your customers in Greater Noida are searching for</span>.
                        </p>
                        <a
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-lg"
                        >
                            Get Your Free SEO Audit
                            <Target size={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-heading font-extrabold text-heading mb-6">
                                Is Your Website <span className="text-red-400">Stuck on Google's 2nd Page</span> in Greater Noida Searches?
                            </h2>
                            <p className="text-paragraph mb-6">
                                Most SEO agencies focus on increasing traffic. We focus on increasing <span className="font-semibold">relevant traffic that converts</span>.
                                What's the point of ranking for keywords if those visitors never buy?
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="text-red-400 mt-1">✗</div>
                                    <span className="text-paragraph">Ranking for keywords nobody in Greater Noida searches for</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="text-red-400 mt-1">✗</div>
                                    <span className="text-paragraph">Getting traffic but no phone calls or inquiries</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="text-red-400 mt-1">✗</div>
                                    <span className="text-paragraph">Paying monthly for reports full of useless metrics</span>
                                </li>
                            </ul>
                        </div>
                        <div className="glass-card p-8 rounded-2xl">
                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">Our Neuro-SEO Difference</h3>
                            <p className="text-paragraph mb-6">
                                We combine search intent analysis with conversion psychology to create pages that both rank AND convert.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-500/10 p-2 rounded-lg">
                                        <Target className="text-accent" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-heading">Intent-Based Keyword Research</h4>
                                        <p className="text-sm text-paragraph">We find what your actual customers search for</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-500/10 p-2 rounded-lg">
                                        <Users className="text-primary-400" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-heading">Localized Content Strategy</h4>
                                        <p className="text-sm text-paragraph">Content that speaks directly to Greater Noida audience</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-500/10 p-2 rounded-lg">
                                        <BarChart3 className="text-purple-400" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-heading">Conversion-Focused Optimization</h4>
                                        <p className="text-sm text-paragraph">Every page designed to generate leads</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Study */}
            <section className="section-padding bg-dark-100">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-extrabold text-heading mb-4">
                            Real Results for <span className="text-primary-400">Greater Noida Businesses</span>
                        </h2>
                        <p className="text-xl text-paragraph">See how we helped a local manufacturing company dominate their niche</p>
                    </div>

                    <div className="glass-card rounded-2xl overflow-hidden max-w-4xl mx-auto">
                        <div className="p-8 md:p-12">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-3 h-3 bg-accent rounded-full"></div>
                                <span className="text-sm font-semibold text-accent">CASE STUDY</span>
                            </div>

                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">
                                Industrial Equipment Manufacturer in Greater Noida
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white/[0.03] p-4 rounded-lg">
                                    <div className="text-sm text-paragraph mb-1">Before Working With Us</div>
                                    <div className="text-2xl font-bold text-red-400">0 Leads/Month</div>
                                    <div className="text-sm text-paragraph">from Google</div>
                                </div>
                                <div className="bg-white/[0.03] p-4 rounded-lg">
                                    <div className="text-sm text-paragraph mb-1">After 3 Months</div>
                                    <div className="text-2xl font-bold text-accent">47 Leads/Month</div>
                                    <div className="text-sm text-paragraph">qualified inquiries</div>
                                </div>
                                <div className="bg-white/[0.03] p-4 rounded-lg">
                                    <div className="text-sm text-paragraph mb-1">Revenue Impact</div>
                                    <div className="text-2xl font-bold text-primary-400">₹82 Lakh</div>
                                    <div className="text-sm text-paragraph">in new business</div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-heading font-bold text-lg text-heading mb-2">The Challenge</h4>
                                <p className="text-paragraph">
                                    This manufacturing company was completely invisible online. When potential customers in Greater Noida
                                    searched for their specific industrial equipment, competitors showed up. They were losing business
                                    to companies 200km away because those companies ranked better locally.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-heading font-bold text-lg text-heading mb-2">Our Neuro-SEO Strategy</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
                                        <span className="text-paragraph">Identified 37 high-intent keywords specific to Greater Noida industrial buyers</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
                                        <span className="text-paragraph">Created location-specific pages targeting "industrial equipment Greater Noida" cluster</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
                                        <span className="text-paragraph">Built local citations and Google Business Profile optimization</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
                                        <span className="text-paragraph">Implemented conversion tracking to measure actual phone calls and form submissions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative section-padding bg-dark-200 text-white">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6">
                        Ready to Dominate <span className="text-accent">Google Searches</span> in Greater Noida?
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Get your FREE SEO Audit and discover exactly what's holding your website back from generating leads.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-dark"
                        >
                            Get FREE SEO Audit
                            <Target size={20} />
                        </a>
                        <a
                            href="tel:+911234567890"
                            className="bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold py-3 px-6 rounded-lg border border-white/[0.1] transition-colors"
                        >
                            Call for Consultation
                        </a>
                    </div>
                    <p className="text-sm text-paragraph mt-6">
                        Limited to 3 free audits per month for qualified Greater Noida businesses
                    </p>
                </div>
            </section>
        </>
    )
}
