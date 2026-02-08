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
            <section className="pt-32 pb-20 bg-gradient-to-r from-primary-50 to-blue-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            SEO Services in <span className="text-primary-600">Greater Noida</span> That Actually Drive Customers
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
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
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Is Your Website <span className="text-red-600">Stuck on Google's 2nd Page</span> in Greater Noida Searches?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Most SEO agencies focus on increasing traffic. We focus on increasing <span className="font-semibold">relevant traffic that converts</span>.
                                What's the point of ranking for keywords if those visitors never buy?
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="text-red-500 mt-1">✗</div>
                                    <span className="text-gray-700">Ranking for keywords nobody in Greater Noida searches for</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="text-red-500 mt-1">✗</div>
                                    <span className="text-gray-700">Getting traffic but no phone calls or inquiries</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="text-red-500 mt-1">✗</div>
                                    <span className="text-gray-700">Paying monthly for reports full of useless metrics</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Neuro-SEO Difference</h3>
                            <p className="text-gray-600 mb-6">
                                We combine search intent analysis with conversion psychology to create pages that both rank AND convert.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <Target className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Intent-Based Keyword Research</h4>
                                        <p className="text-sm text-gray-600">We find what your actual customers search for</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <Users className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Localized Content Strategy</h4>
                                        <p className="text-sm text-gray-600">Content that speaks directly to Greater Noida audience</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <BarChart3 className="text-purple-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Conversion-Focused Optimization</h4>
                                        <p className="text-sm text-gray-600">Every page designed to generate leads</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Study */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Real Results for <span className="text-primary-600">Greater Noida Businesses</span>
                        </h2>
                        <p className="text-xl text-gray-600">See how we helped a local manufacturing company dominate their niche</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
                        <div className="p-8 md:p-12">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-semibold text-green-600">CASE STUDY</span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Industrial Equipment Manufacturer in Greater Noida
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Before Working With Us</div>
                                    <div className="text-2xl font-bold text-red-600">0 Leads/Month</div>
                                    <div className="text-sm text-gray-500">from Google</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">After 3 Months</div>
                                    <div className="text-2xl font-bold text-green-600">47 Leads/Month</div>
                                    <div className="text-sm text-gray-500">qualified inquiries</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Revenue Impact</div>
                                    <div className="text-2xl font-bold text-primary-600">₹82 Lakh</div>
                                    <div className="text-sm text-gray-500">in new business</div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-lg mb-2">The Challenge</h4>
                                <p className="text-gray-600">
                                    This manufacturing company was completely invisible online. When potential customers in Greater Noida
                                    searched for their specific industrial equipment, competitors showed up. They were losing business
                                    to companies 200km away because those companies ranked better locally.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-bold text-lg mb-2">Our Neuro-SEO Strategy</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                        <span className="text-gray-700">Identified 37 high-intent keywords specific to Greater Noida industrial buyers</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                        <span className="text-gray-700">Created location-specific pages targeting "industrial equipment Greater Noida" cluster</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                        <span className="text-gray-700">Built local citations and Google Business Profile optimization</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                        <span className="text-gray-700">Implemented conversion tracking to measure actual phone calls and form submissions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Dominate <span className="text-secondary-300">Google Searches</span> in Greater Noida?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Get your FREE SEO Audit and discover exactly what's holding your website back from generating leads.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2"
                        >
                            Get FREE SEO Audit
                            <Target size={20} />
                        </a>
                        <a
                            href="tel:+911234567890"
                            className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg border border-white/30 transition-colors"
                        >
                            Call for Consultation
                        </a>
                    </div>
                    <p className="text-sm text-white/70 mt-6">
                        Limited to 3 free audits per month for qualified Greater Noida businesses
                    </p>
                </div>
            </section>
        </>
    )
}