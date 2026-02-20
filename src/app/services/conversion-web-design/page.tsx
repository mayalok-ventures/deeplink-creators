import type { Metadata } from 'next'
import Link from 'next/link'
import { Layout, Gauge, MousePointer, Eye, Smartphone, Shield, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Conversion-First Web Design & UI/UX | Deeplink Creators',
    description: 'Stop losing visitors. We design high-converting, psychology-driven websites optimized for speed, trust, and massive lead generation.',
    openGraph: {
        title: 'Conversion-First Web Design & UI/UX | Deeplink Creators',
        description: 'Stop losing visitors. We design high-converting, psychology-driven websites optimized for speed, trust, and massive lead generation.',
        url: 'https://deeplinkcreators.com/services/conversion-web-design/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/conversion-web-design/',
    },
}

const processSteps = [
    {
        step: '01',
        title: 'Conversion Audit & User Research',
        description: 'We heatmap your current site, analyze user recordings, and identify the exact friction points where visitors abandon. No guesswork\u2014just data.',
        icon: <Eye size={24} />,
    },
    {
        step: '02',
        title: 'Wireframe & Persuasion Architecture',
        description: 'Every section is strategically ordered using psychological principles: social proof placement, CTA hierarchy, objection handling, and micro-commitment sequences.',
        icon: <Layout size={24} />,
    },
    {
        step: '03',
        title: 'High-Fidelity Design & Development',
        description: 'Pixel-perfect UI built on Next.js with sub-2s load times. Mobile-first responsive design that scores 95+ on Google PageSpeed Insights.',
        icon: <Smartphone size={24} />,
    },
    {
        step: '04',
        title: 'A/B Testing & Continuous Optimization',
        description: 'We don\u2019t launch and leave. We run A/B tests on headlines, CTAs, layouts, and forms to continuously increase your conversion rate month over month.',
        icon: <Gauge size={24} />,
    },
]

const deliverables = [
    { title: 'Conversion-Optimized Website', description: 'Full custom website built on Next.js with every page engineered to generate leads, not just look pretty.' },
    { title: 'Mobile-First Responsive Design', description: 'Pixel-perfect layouts across all devices\u2014phones, tablets, laptops\u2014because 70%+ of your traffic is mobile.' },
    { title: 'Speed Optimization', description: 'Sub-2 second load times with lazy loading, image optimization, and edge caching for 95+ PageSpeed scores.' },
    { title: 'Lead Capture System', description: 'Smart forms, exit-intent popups, chatbot integration, and CRM connectivity to capture every visitor.' },
    { title: 'SEO-Ready Architecture', description: 'Semantic HTML, structured data, optimized meta tags, and crawl-friendly URL architecture baked into every page.' },
    { title: 'Analytics & Heatmap Setup', description: 'Google Analytics 4, conversion tracking, heatmaps, and user recording tools installed and configured.' },
]

export default function ConversionWebDesignPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-cyan-600/20 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                            <Layout size={16} className="text-cyan-400" />
                            <span className="text-sm font-medium text-cyan-300">Conversion-First Web Design</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-heading mb-6 leading-tight">
                            Your Website Looks Great.{' '}
                            <span className="text-cyan-400">It Just Doesn&apos;t Convert.</span>
                        </h1>
                        <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                            A beautiful website with a 0.5% conversion rate is an expensive business card. We design websites that are engineered to turn visitors into leads, demos, and paying customers.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-8"
                        >
                            Claim Your Conversion Audit
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Problem/Agitation Section */}
            <section className="section-padding bg-[#F4F5F6]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-6">
                                Why &ldquo;Good Design&rdquo;{' '}
                                <span className="text-red-400">Isn&apos;t Good Enough</span>
                            </h2>
                            <p className="text-paragraph mb-6">
                                Most web designers optimize for aesthetics. They build portfolio pieces, not revenue machines. The result? A stunning website that visitors admire\u2014and then leave without taking any action.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Beautiful homepage, but no clear path from landing to lead capture',
                                    'Loads in 6+ seconds on mobile\u2014Google penalizes you and users bounce',
                                    'No A/B testing\u2014the design was picked because the designer liked it',
                                    'Contact form buried on page 5 with zero urgency or social proof',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="text-red-400 mt-1 shrink-0">{'\u2717'}</div>
                                        <span className="text-paragraph">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="glass-card p-8 rounded-2xl border border-cyan-500/20">
                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">The Deeplink Difference</h3>
                            <p className="text-paragraph mb-6">
                                Every pixel is placed based on user behavior data, not designer preference.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: 'Data-Driven Layout', desc: 'Heatmap and scroll-depth data dictate where CTAs and content go.' },
                                    { label: 'Sub-2s Load Times', desc: 'Edge-deployed Next.js with 95+ PageSpeed scores on mobile.' },
                                    { label: 'Psychology-Based CTAs', desc: 'Urgency, scarcity, and social proof placed at scientifically optimal positions.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="bg-cyan-500/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-cyan-400" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-heading">{item.label}</h4>
                                            <p className="text-sm text-paragraph">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            The Deeplink <span className="text-cyan-400">Conversion Design System</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            A 4-phase process that builds websites engineered to convert, not just impress.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.step} className="glass-card rounded-2xl p-8 relative">
                                <div className="text-5xl font-extrabold text-cyan-500/10 absolute top-4 right-4">{step.step}</div>
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 text-cyan-400">
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-heading font-bold text-heading mb-2">{step.title}</h3>
                                <p className="text-paragraph text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deliverables Grid */}
            <section className="section-padding bg-[#F4F5F6]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            What You <span className="text-cyan-400">Actually Get</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="glass-card rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
                                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <MousePointer className="text-cyan-400" size={20} />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-heading mb-2">{item.title}</h3>
                                <p className="text-paragraph text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative section-padding bg-[#0F1112] text-white">
                <div className="absolute inset-0 grid-bg" />
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6">
                        Your Website Should Be Your{' '}
                        <span className="text-[#C39A2B]">Best Salesperson.</span>
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Book a free conversion audit. We&apos;ll analyze your current website, show you the exact points where visitors drop off, and design a system that turns traffic into revenue.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8 text-white"
                        >
                            Claim Your Conversion Audit
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
