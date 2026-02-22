import type { Metadata } from 'next'
import Link from 'next/link'
import { Factory, Target, Globe, FileText, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react'
import ServiceHeroImage from '@/components/ServiceHeroImage'

export const metadata: Metadata = {
    title: 'B2B Industrial & Manufacturing Marketing Agency | Deeplink Creators',
    description: 'Enterprise-grade demand generation for B2B manufacturers and industrial companies. We build pipeline systems that deliver qualified RFQs, not vanity metrics.',
    openGraph: {
        title: 'B2B Industrial & Manufacturing Marketing Agency | Deeplink Creators',
        description: 'Enterprise-grade demand generation for B2B manufacturers and industrial companies. We build pipeline systems that deliver qualified RFQs, not vanity metrics.',
        url: 'https://deeplinkcreators.com/services/b2b-industrial-marketing/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/b2b-industrial-marketing/',
    },
}

const processSteps = [
    {
        step: '01',
        title: 'Pipeline Intelligence Audit',
        description: 'We analyze your current sales pipeline — lead sources, conversion rates, deal cycle length, and revenue per channel. Every strategy is reverse-engineered from your revenue target.',
        icon: <Target size={24} />,
    },
    {
        step: '02',
        title: 'Digital Infrastructure Build',
        description: 'Technical SEO for industrial queries, Google Ads for active procurement searches, LinkedIn campaigns for decision-maker targeting, and conversion-optimized capability pages.',
        icon: <Globe size={24} />,
    },
    {
        step: '03',
        title: 'Content Authority Engine',
        description: 'Technical blogs, capability case studies, and industry whitepapers that position your brand as the manufacturing authority. Every piece is designed to generate qualified inbound inquiries.',
        icon: <FileText size={24} />,
    },
    {
        step: '04',
        title: 'Pipeline Acceleration',
        description: 'Account-based marketing, retargeting sequences, and automated nurturing that accelerate prospects from awareness to RFQ. We compress your 6-month sales cycle into weeks.',
        icon: <TrendingUp size={24} />,
    },
]

const deliverables = [
    { title: 'Industrial SEO', description: 'Technical search optimization for manufacturing, industrial, and B2B procurement queries — ranking for the exact terms your buyers use to find suppliers.' },
    { title: 'LinkedIn ABM Campaigns', description: 'Account-based advertising targeting specific companies, job titles, and industries — reaching the decision-makers who sign purchase orders.' },
    { title: 'Google Ads for Manufacturing', description: 'Search campaigns targeting active procurement queries — "CNC machining services," "industrial packaging supplier," "OEM manufacturer India."' },
    { title: 'Technical Content Marketing', description: 'Capability-focused case studies, technical blogs, and industry whitepapers that build authority and generate inbound RFQs from qualified prospects.' },
    { title: 'Capability Landing Pages', description: 'Conversion-optimized pages for each manufacturing capability — with certifications, capacity data, and instant RFQ forms.' },
    { title: 'Pipeline Attribution Dashboard', description: 'Real-time dashboard showing cost-per-RFQ, cost-per-qualified-lead, pipeline value, and channel-wise ROI for every marketing rupee.' },
]

export default function B2BIndustrialMarketingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white dark:bg-[#0F1112] overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                            <Factory size={16} className="text-emerald-400" />
                            <span className="text-sm font-medium text-emerald-300">B2B Demand Generation Architecture</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-heading mb-6 leading-tight">
                            Your Sales Team Deserves{' '}
                            <span className="text-emerald-400">Qualified RFQs, Not Cold Leads.</span>
                        </h1>
                        <p className="text-lg text-paragraph mb-8 max-w-2xl mx-auto">
                            Industrial marketing isn&apos;t about social media followers. It&apos;s about engineering a predictable pipeline of qualified procurement inquiries from decision-makers who have budget approval and purchase timelines. That&apos;s what we build.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-base py-3.5 px-8"
                        >
                            Get Your Pipeline Audit
                            <ArrowRight size={20} />
                        </Link>
                        <ServiceHeroImage href="/services/b2b-industrial-marketing" />
                    </div>
                </div>
            </section>

            {/* Problem/Agitation Section */}
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-6">
                                Your B2B Marketing Is{' '}
                                <span className="text-red-400">Stuck in the 1990s</span>
                            </h2>
                            <p className="text-paragraph mb-6">
                                Greater Noida&apos;s manufacturing corridor has world-class production capabilities but stone-age marketing. Trade shows, cold calls, and broker relationships are expensive, unpredictable, and impossible to scale. Your competitors have already gone digital — and they&apos;re capturing your prospects.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Spending ₹10L+/year on trade shows that generate business cards, not purchase orders',
                                    'Sales team cold-calling from purchased databases with 2% connect rates',
                                    'No digital presence — prospects can\'t find you when they search for suppliers',
                                    'Zero content positioning — your competitors are publishing thought leadership while you\'re invisible',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="text-red-400 mt-1 shrink-0">{'\u2717'}</div>
                                        <span className="text-paragraph">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="glass-card p-8 rounded-2xl border border-emerald-500/20">
                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">The Deeplink Difference</h3>
                            <p className="text-paragraph mb-6">
                                We don&apos;t do &apos;B2B marketing.&apos; We engineer demand generation systems.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: 'Decision-Maker Targeting', desc: 'We reach procurement heads, CTOs, and operations managers — not interns browsing LinkedIn.' },
                                    { label: 'RFQ Attribution', desc: 'Every qualified inquiry tracked from first touchpoint to purchase order — complete pipeline visibility.' },
                                    { label: 'Industry-Specific Content', desc: 'Technical content, case studies, and capability presentations that position you as the category expert.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="bg-emerald-500/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-emerald-400" size={20} />
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
                            The Deeplink <span className="text-emerald-400">Pipeline Engine</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            A 4-phase system that turns marketing spend into predictable, qualified RFQ generation.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.step} className="glass-card rounded-2xl p-8 relative">
                                <div className="text-5xl font-extrabold text-emerald-500/10 absolute top-4 right-4">{step.step}</div>
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-400">
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
                            What You <span className="text-emerald-400">Actually Get</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="glass-card rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
                                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <Factory className="text-emerald-400" size={20} />
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
                        Stop Chasing Deals.{' '}
                        <span className="text-[#C39A2B]">Start Engineering Pipeline.</span>
                    </h2>
                    <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                        Book a free pipeline audit. We&apos;ll analyze your current B2B lead sources, map the digital demand for your capabilities, and show you the system that generates qualified RFQs on autopilot.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-base py-3.5 px-8 text-white"
                        >
                            Get Your Pipeline Audit
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
