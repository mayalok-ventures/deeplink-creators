import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, TrendingUp, ShoppingCart, Target, MessageCircle, BarChart, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Social Commerce & Audience Monetization | Deeplink Creators',
    description: 'Turn passive followers into high-paying customers. Data-backed social media funnels that engineer trust and drive measurable revenue.',
    openGraph: {
        title: 'Social Commerce & Audience Monetization | Deeplink Creators',
        description: 'Turn passive followers into high-paying customers. Data-backed social media funnels that engineer trust and drive measurable revenue.',
        url: 'https://deeplinkcreators.com/services/social-commerce/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/social-commerce/',
    },
}

const processSteps = [
    {
        step: '01',
        title: 'Audience Intelligence Mapping',
        description: 'We analyze your existing followers\u2019 psychographics, buying triggers, and content consumption patterns to build a monetization blueprint.',
        icon: <Users size={24} />,
    },
    {
        step: '02',
        title: 'Trust Funnel Architecture',
        description: 'We design a content-to-commerce pipeline: awareness \u2192 engagement \u2192 trust \u2192 transaction. Every post has a revenue purpose.',
        icon: <Target size={24} />,
    },
    {
        step: '03',
        title: 'Commerce Integration',
        description: 'Shoppable posts, DM automation, checkout flows, and retargeting pixels\u2014all connected so no lead slips through the cracks.',
        icon: <ShoppingCart size={24} />,
    },
    {
        step: '04',
        title: 'Revenue Attribution & Scaling',
        description: 'We track every rupee from social impression to closed sale, then double down on what works and kill what doesn\u2019t.',
        icon: <BarChart size={24} />,
    },
]

const deliverables = [
    { title: 'Social Media Audit', description: 'Deep analysis of your current profiles, content performance, audience demographics, and competitor positioning.' },
    { title: 'Content Calendar & Strategy', description: 'Data-driven posting schedule mapped to buying cycles, trending formats, and engagement algorithms.' },
    { title: 'Shoppable Content System', description: 'Instagram Shop, Facebook Commerce, and WhatsApp Business integrations with full checkout flows.' },
    { title: 'DM Automation Funnels', description: 'ManyChat/WhatsApp bot sequences that qualify leads, answer FAQs, and push to purchase\u201424/7.' },
    { title: 'Influencer & UGC Strategy', description: 'Micro-influencer partnerships and user-generated content campaigns that build social proof at scale.' },
    { title: 'Performance Dashboards', description: 'Real-time analytics tracking engagement-to-revenue metrics, not vanity likes and follower counts.' },
]

export default function SocialCommercePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-dark overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-1/3 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-pink-600/20 border border-pink-500/30 rounded-full px-4 py-2 mb-6">
                            <ShoppingCart size={16} className="text-pink-400" />
                            <span className="text-sm font-medium text-pink-300">Social Commerce & Monetization</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-heading mb-6 leading-tight">
                            Your Followers Are Watching.{' '}
                            <span className="text-pink-400">Make Them Buy.</span>
                        </h1>
                        <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                            10K followers and zero revenue? That&apos;s not a social media strategy\u2014it&apos;s an expensive hobby. We build commerce-first social systems that turn engagement into wire transfers.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-8"
                        >
                            Audit Your Social Revenue
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Problem/Agitation Section */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-6">
                                Why Your Social Media{' '}
                                <span className="text-red-400">Isn&apos;t Making Money</span>
                            </h2>
                            <p className="text-paragraph mb-6">
                                Most agencies sell you &ldquo;engagement.&rdquo; Likes, comments, shares\u2014none of which pay your bills. They post pretty graphics with no commerce architecture behind them. You&apos;re funding a content factory with zero sales pipeline.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Posting daily but can\u2019t attribute a single sale to social media',
                                    'Paying an agency for \u201Ccreative content\u201D that gets likes but no leads',
                                    'No DM automation\u2014hot leads go cold while your team sleeps',
                                    'Zero integration between your social profiles and actual checkout/CRM',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="text-red-400 mt-1 shrink-0">{'\u2717'}</div>
                                        <span className="text-paragraph">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="glass-card p-8 rounded-2xl border border-pink-500/20">
                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">The Deeplink Difference</h3>
                            <p className="text-paragraph mb-6">
                                We don&apos;t measure success in likes. We measure it in revenue per follower.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: 'Commerce-First Content', desc: 'Every post engineered to move followers toward a transaction.' },
                                    { label: '24/7 Lead Capture', desc: 'Automated DM funnels that qualify and convert while you sleep.' },
                                    { label: 'Revenue Attribution', desc: 'Track every sale back to the exact post and platform.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="bg-pink-500/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-pink-400" size={20} />
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
            <section className="section-padding bg-dark-100">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            The Deeplink <span className="text-pink-400">Social Commerce Engine</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            A 4-phase system that transforms your social media from a cost center into a revenue channel.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.step} className="glass-card rounded-2xl p-8 relative">
                                <div className="text-5xl font-extrabold text-pink-500/10 absolute top-4 right-4">{step.step}</div>
                                <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4 text-pink-400">
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
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            What You <span className="text-pink-400">Actually Get</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="glass-card rounded-xl p-6 hover:border-pink-500/30 transition-colors">
                                <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <MessageCircle className="text-pink-400" size={20} />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-heading mb-2">{item.title}</h3>
                                <p className="text-paragraph text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative section-padding bg-dark-200 text-white">
                <div className="absolute inset-0 grid-bg" />
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6">
                        Stop Entertaining.{' '}
                        <span className="text-accent">Start Selling.</span>
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Book a free social revenue audit. We&apos;ll show you exactly how much money your current social media presence is leaving on the table\u2014and the system to capture it.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8 text-dark"
                        >
                            Audit Your Social Revenue
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
