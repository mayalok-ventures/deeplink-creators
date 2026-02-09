import type { Metadata } from 'next'
import { BarChart3, Target, Users } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Best SEO Services in Greater Noida & Noida | Local SEO Company | Deeplink Creators',
    description: 'Top SEO company in Greater Noida & Noida offering affordable SEO services, local SEO, Google My Business optimization, technical SEO audits, and website SEO services for businesses in Delhi NCR. Get your free SEO audit today.',
    keywords: ['SEO services in Greater Noida', 'SEO company in Greater Noida', 'local SEO services Greater Noida', 'SEO services in Noida', 'SEO company in Noida', 'affordable SEO services Noida', 'website SEO audit Greater Noida', 'Google My Business optimization Greater Noida', 'technical SEO services Noida', 'SEO consultant in Greater Noida', 'SEO expert in Delhi NCR', 'best SEO company Delhi NCR', 'small business SEO services Greater Noida', 'SEO for local businesses Noida'],
    openGraph: {
        title: 'Best SEO Services in Greater Noida & Noida | Deeplink Creators',
        description: 'Affordable SEO services, local SEO, Google My Business optimization, and technical SEO for businesses in Greater Noida, Noida & Delhi NCR.',
        url: 'https://deeplinkcreators.com/services/seo-greater-noida/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SEO Services Greater Noida & Noida | Deeplink Creators',
        description: 'Affordable SEO services, local SEO & technical SEO for Greater Noida & Delhi NCR.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/seo-greater-noida/',
    },
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
                            Tired of ranking on page 2? As the best SEO company in Greater Noida &amp; Noida, our Neuro-SEO methodology targets the exact keywords that <span className="font-semibold">your customers in Greater Noida, Noida, and Delhi NCR are searching for</span>.
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
                                Is Your Website <span className="text-red-400">Stuck on Google&apos;s 2nd Page</span> for Greater Noida &amp; Noida Searches?
                            </h2>
                            <p className="text-paragraph mb-6">
                                Most SEO companies in Noida focus on increasing traffic. As an affordable SEO service provider in Greater Noida, we focus on increasing <span className="font-semibold">relevant traffic that converts</span>.
                                What&apos;s the point of ranking for keywords if those visitors never buy?
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
                                        <p className="text-sm text-paragraph">Content that speaks directly to Greater Noida, Noida &amp; Delhi NCR audience</p>
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

            {/* CTA Section */}
            <section className="relative section-padding bg-dark-200 text-white">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6">
                        Ready to Dominate <span className="text-accent">Google Searches</span> in Greater Noida?
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Get your FREE website SEO audit and discover exactly what&apos;s holding your business in Greater Noida or Noida back from generating leads through Google.
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
                            href="/contact"
                            className="bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold py-3 px-6 rounded-lg border border-white/[0.1] transition-colors"
                        >
                            Schedule a Call
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
