import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Target, Search, Users, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react'
import ServiceHeroImage from '@/components/ServiceHeroImage'

export const metadata: Metadata = {
    title: 'Real Estate Digital Marketing & Lead Generation | Deeplink Creators',
    description: 'Pipeline architecture for real estate developers and builders. We build lead generation systems that fill your inventory with qualified buyers — not tire-kickers.',
    openGraph: {
        title: 'Real Estate Digital Marketing & Lead Generation | Deeplink Creators',
        description: 'Pipeline architecture for real estate developers and builders. We build lead generation systems that fill your inventory with qualified buyers — not tire-kickers.',
        url: 'https://deeplinkcreators.com/services/real-estate-marketing/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/real-estate-marketing/',
    },
}

const processSteps = [
    {
        step: '01',
        title: 'Market Intelligence Audit',
        description: 'We analyze your micro-market — competitor positioning, buyer search behavior, price sensitivity, and channel performance. Every strategy is built on data, not assumptions.',
        icon: <Target size={24} />,
    },
    {
        step: '02',
        title: 'Demand Capture Architecture',
        description: 'SEO for high-intent property searches, Google Ads for active buyers, and Meta campaigns for passive demand generation. Each channel has dedicated landing pages with virtual tours and instant callback.',
        icon: <Search size={24} />,
    },
    {
        step: '03',
        title: 'Lead Qualification Engine',
        description: 'Not every form-fill is a buyer. We build automated qualification funnels that separate serious buyers from tire-kickers before they reach your sales team.',
        icon: <Users size={24} />,
    },
    {
        step: '04',
        title: 'Pipeline Optimization',
        description: 'Weekly performance analysis, creative refresh, audience expansion, and budget reallocation. We optimize the entire pipeline from impression to site visit to booking.',
        icon: <TrendingUp size={24} />,
    },
]

const deliverables = [
    { title: 'Google Ads for Real Estate', description: 'Search campaigns targeting project-specific, location-specific, and configuration-specific buyer queries with dedicated landing pages.' },
    { title: 'Meta Lead Generation', description: 'Facebook and Instagram campaigns with lead forms, virtual tour integration, and automated follow-up sequences for maximum conversion.' },
    { title: 'Real Estate SEO', description: 'Long-term organic visibility for your project and brand — ranking for buyer queries that generate free, high-intent traffic every month.' },
    { title: 'Landing Page Architecture', description: 'Conversion-optimized project microsites with virtual tours, price calculators, floor plan downloads, and instant callback widgets.' },
    { title: 'Lead Nurturing Automation', description: 'Email and WhatsApp drip sequences that keep leads warm from first inquiry to site visit booking — no lead falls through the cracks.' },
    { title: 'Revenue Attribution Dashboard', description: 'Real-time dashboard showing cost-per-lead, cost-per-site-visit, cost-per-booking, and channel-wise ROI for every rupee spent.' },
]

export default function RealEstateMarketingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
                            <Building2 size={16} className="text-amber-400" />
                            <span className="text-sm font-medium text-amber-300">Real Estate Revenue Architecture</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-heading mb-6 leading-tight">
                            Your Inventory Won&apos;t Sell Itself.{' '}
                            <span className="text-amber-400">We Build the Pipeline That Does.</span>
                        </h1>
                        <p className="text-lg text-paragraph mb-8 max-w-2xl mx-auto">
                            Most real estate agencies run generic Facebook ads and call it marketing. We engineer end-to-end buyer acquisition systems — from first search query to site visit booking — that predictably fill your inventory quarter after quarter.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-base py-3.5 px-8"
                        >
                            Get Your Pipeline Audit
                            <ArrowRight size={20} />
                        </Link>
                        <ServiceHeroImage href="/services/real-estate-marketing" />
                    </div>
                </div>
            </section>

            {/* Problem/Agitation Section */}
            <section className="section-padding bg-[#FAFAF8]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-6">
                                Your Broker Network Is{' '}
                                <span className="text-red-400">Leaking Revenue</span>
                            </h2>
                            <p className="text-paragraph mb-6">
                                Builders across Greater Noida are spending crores on hoardings, broker commissions, and random Facebook boosts. Meanwhile, 73% of property buyers start their search on Google — and your competitors are capturing that demand while you wait for walk-ins.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Spending ₹5L+/month on brokers who bring the same recycled leads',
                                    'Facebook ads targeting "interested in real estate" — the broadest, most useless audience',
                                    'No tracking on which channel generated which site visit or booking',
                                    'Landing pages that are just your project brochure in digital format',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="text-red-400 mt-1 shrink-0">{'\u2717'}</div>
                                        <span className="text-paragraph">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8">
                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">The Deeplink Difference</h3>
                            <p className="text-paragraph mb-6">
                                We don&apos;t do &ldquo;real estate marketing.&rdquo; We build inventory liquidation machines.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: 'Buyer Intent Targeting', desc: 'We capture buyers actively searching for properties in your micro-market — not random scrollers.' },
                                    { label: 'Site Visit Attribution', desc: 'Every lead tracked from ad click to site visit to booking — complete revenue attribution.' },
                                    { label: 'Inventory-Specific Campaigns', desc: 'Dedicated campaigns for each tower, configuration, and price bracket — not one generic ad for everything.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="bg-amber-500/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-amber-400" size={20} />
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
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            The Deeplink <span className="text-amber-400">Pipeline Engine</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            A 4-phase system that turns marketing spend into predictable inventory movement.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.step} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 relative">
                                <div className="text-5xl font-extrabold text-amber-500/10 absolute top-4 right-4">{step.step}</div>
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 text-amber-400">
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
            <section className="section-padding bg-[#FAFAF8]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            What You <span className="text-amber-400">Actually Get</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-6 hover:border-amber-500/30 transition-colors">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <Building2 className="text-amber-400" size={20} />
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
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-6">
                        Stop Waiting for Walk-Ins.{' '}
                        <span className="text-[#C39A2B]">Start Engineering Pipeline.</span>
                    </h2>
                    <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                        Book a free pipeline audit. We&apos;ll analyze your current lead sources, identify revenue leaks, and show you the system that turns your marketing budget into predictable inventory movement.
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