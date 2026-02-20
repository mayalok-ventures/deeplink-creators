import type { Metadata } from 'next'
import Link from 'next/link'
import { Target, TrendingUp, DollarSign, BarChart, Megaphone, MousePointer, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'High-Ticket Lead Acquisition & Paid Ads | Deeplink Creators',
    description: 'ROI-focused Google Ads and Performance Marketing. We track every click, optimize landing pages, and eliminate wasted ad spend.',
    openGraph: {
        title: 'High-Ticket Lead Acquisition & Paid Ads | Deeplink Creators',
        description: 'ROI-focused Google Ads and Performance Marketing. We track every click, optimize landing pages, and eliminate wasted ad spend.',
        url: 'https://deeplinkcreators.com/services/performance-marketing/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/performance-marketing/',
    },
}

const processSteps = [
    {
        step: '01',
        title: 'Ad Account Forensics',
        description: 'We tear apart your existing ad accounts\u2014Google, Meta, LinkedIn\u2014to find every rupee wasted on wrong audiences, bad keywords, and unoptimized landing pages.',
        icon: <Target size={24} />,
    },
    {
        step: '02',
        title: 'Conversion Funnel Engineering',
        description: 'We build dedicated landing pages for every campaign with tracked forms, call tracking, and conversion pixels. Every click has a measurable destination.',
        icon: <MousePointer size={24} />,
    },
    {
        step: '03',
        title: 'Precision Audience Targeting',
        description: 'Custom audiences, lookalike modeling, and intent-based targeting. We show your ads to people who are actively searching for what you sell\u2014not random scrollers.',
        icon: <Megaphone size={24} />,
    },
    {
        step: '04',
        title: 'Daily Optimization & Scaling',
        description: 'Real-time bid adjustments, ad copy testing, negative keyword mining, and budget reallocation. We optimize daily, report weekly, and scale monthly.',
        icon: <TrendingUp size={24} />,
    },
]

const deliverables = [
    { title: 'Google Ads Management', description: 'Search, Display, Shopping, and YouTube campaigns managed with daily optimization and advanced bid strategies.' },
    { title: 'Meta Ads Management', description: 'Facebook and Instagram campaigns with custom audience targeting, creative testing, and conversion optimization.' },
    { title: 'Landing Page Design', description: 'Dedicated, high-converting landing pages for every campaign\u2014not generic website pages that dilute conversions.' },
    { title: 'Conversion Tracking Setup', description: 'Google Tag Manager, GA4 events, Meta Pixel, and offline conversion tracking for complete attribution.' },
    { title: 'Retargeting Campaigns', description: 'Multi-platform retargeting sequences that bring back visitors who didn\u2019t convert on the first visit.' },
    { title: 'Weekly Performance Reports', description: 'Transparent reporting with cost-per-lead, cost-per-acquisition, ROAS, and pipeline value\u2014not vanity impressions.' },
]

export default function PerformanceMarketingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white dark:bg-[#0F1112] overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
                            <DollarSign size={16} className="text-red-400" />
                            <span className="text-sm font-medium text-red-300">High-Ticket Lead Acquisition</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-heading mb-6 leading-tight">
                            Every Rupee Spent Must{' '}
                            <span className="text-red-400">Generate More Than a Rupee Back.</span>
                        </h1>
                        <p className="text-lg text-paragraph mb-8 max-w-2xl mx-auto">
                            Your Google Ads agency sends you reports full of impressions and clicks. We send you reports full of leads and revenue. If an ad doesn&apos;t generate positive ROI, we kill it.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-base py-3.5 px-8"
                        >
                            Get Your Free Ad Audit
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Problem/Agitation Section */}
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-6">
                                You&apos;re Burning Ad Budget on{' '}
                                <span className="text-red-400">Clicks That Never Convert</span>
                            </h2>
                            <p className="text-paragraph mb-6">
                                Most PPC agencies optimize for clicks and impressions because those numbers are easy to inflate. But clicks don&apos;t pay your bills\u2014customers do. And most agencies can&apos;t tell you which ad generated which customer.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Spending \u20B950K+/month on Google Ads with no idea which campaigns are profitable',
                                    'Landing pages that are just your homepage\u2014no dedicated conversion path',
                                    'Zero call tracking\u2014phone leads are completely invisible to your attribution',
                                    'Agency reports full of CTR and CPC but no cost-per-customer or ROAS',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="text-red-400 mt-1 shrink-0">{'\u2717'}</div>
                                        <span className="text-paragraph">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="glass-card p-8 rounded-2xl border border-red-500/20">
                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">The Deeplink Difference</h3>
                            <p className="text-paragraph mb-6">
                                We don&apos;t manage ads. We engineer profitable customer acquisition systems.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: 'Revenue-First Optimization', desc: 'We optimize for cost-per-customer and ROAS, not clicks.' },
                                    { label: 'Full-Funnel Tracking', desc: 'Every lead tracked from ad click to signed deal\u2014including phone calls.' },
                                    { label: 'Daily Optimization', desc: 'Real-time bid adjustments, not set-and-forget monthly management.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="bg-red-500/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-red-400" size={20} />
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
            <section className="section-padding bg-white dark:bg-[#0F1112]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            The Deeplink <span className="text-red-400">Performance Engine</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            A 4-phase system that turns ad spend into predictable, scalable customer acquisition.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.step} className="glass-card rounded-2xl p-8 relative">
                                <div className="text-5xl font-extrabold text-red-500/10 absolute top-4 right-4">{step.step}</div>
                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4 text-red-400">
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
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            What You <span className="text-red-400">Actually Get</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="glass-card rounded-xl p-6 hover:border-red-500/30 transition-colors">
                                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <BarChart className="text-red-400" size={20} />
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
                    <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-6">
                        Stop Paying for Clicks.{' '}
                        <span className="text-[#C39A2B]">Start Paying for Customers.</span>
                    </h2>
                    <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                        Book a free ad account audit. We&apos;ll show you exactly how much of your current budget is wasted and the system that turns every rupee into measurable revenue.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-base py-3.5 px-8 text-white"
                        >
                            Get Your Free Ad Audit
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
