import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, TrendingUp, Globe, Target, FileText, Link2, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Predictive SEO & Market Dominance | Deeplink Creators',
    description: 'Capture high-intent buyers with technical SEO architecture, AI-driven content clusters, and high-authority link building in Noida & Delhi.',
    openGraph: {
        title: 'Predictive SEO & Market Dominance | Deeplink Creators',
        description: 'Capture high-intent buyers with technical SEO architecture, AI-driven content clusters, and high-authority link building in Noida & Delhi.',
        url: 'https://deeplinkcreators.com/services/industrial-seo',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/industrial-seo',
    },
}

const processSteps = [
    {
        step: '01',
        title: 'Technical SEO Infrastructure',
        description: 'We audit and rebuild your site\u2019s technical foundation\u2014crawlability, indexation, Core Web Vitals, schema markup, and internal linking architecture.',
        icon: <Globe size={24} />,
    },
    {
        step: '02',
        title: 'AI-Driven Keyword Intelligence',
        description: 'We use predictive models to identify keywords your competitors will target next quarter\u2014and rank for them first. First-mover advantage, every time.',
        icon: <Search size={24} />,
    },
    {
        step: '03',
        title: 'Content Cluster Deployment',
        description: 'We build topical authority through interconnected pillar pages and cluster content. Google sees you as THE expert in your industry, not just another website.',
        icon: <FileText size={24} />,
    },
    {
        step: '04',
        title: 'High-Authority Link Acquisition',
        description: 'Strategic link building from industry publications, news outlets, and high-DA domains. No PBNs, no spam\u2014just real editorial backlinks that Google rewards.',
        icon: <Link2 size={24} />,
    },
]

const deliverables = [
    { title: 'Technical SEO Audit', description: 'Comprehensive 100+ point audit covering crawlability, indexation, site speed, schema, and Core Web Vitals.' },
    { title: 'Predictive Keyword Strategy', description: 'AI-modeled keyword roadmap targeting high-intent, high-volume terms before your competitors discover them.' },
    { title: 'Content Cluster Architecture', description: 'Pillar page + supporting cluster content strategy with internal linking maps for maximum topical authority.' },
    { title: 'On-Page Optimization', description: 'Title tags, meta descriptions, header hierarchy, image alt text, and structured data for every target page.' },
    { title: 'Link Building Campaigns', description: 'Monthly high-authority backlink acquisition through digital PR, guest posts, and HARO outreach.' },
    { title: 'Monthly Performance Reports', description: 'Rankings, organic traffic, conversion rates, and revenue attribution\u2014tied to business outcomes, not vanity metrics.' },
]

export default function IndustrialSEOPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-dark overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
                            <Search size={16} className="text-amber-400" />
                            <span className="text-sm font-medium text-amber-300">Predictive SEO & Market Dominance</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-heading mb-6 leading-tight">
                            Rank for Keywords Your Competitors{' '}
                            <span className="text-amber-400">Haven&apos;t Even Found Yet.</span>
                        </h1>
                        <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                            Generic SEO agencies optimize for last year&apos;s keywords. We use predictive intelligence to capture high-intent search demand in Noida, Delhi, and nationwide\u2014before anyone else.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-8"
                        >
                            Claim Your SEO Strategy
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
                                Why Traditional SEO{' '}
                                <span className="text-red-400">Doesn&apos;t Work Anymore</span>
                            </h2>
                            <p className="text-paragraph mb-6">
                                Most SEO agencies in India follow a 2018 playbook: stuff keywords, build spammy backlinks, and pray for rankings. Google&apos;s algorithm has evolved 10x since then. Their tactics haven&apos;t.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Paying monthly retainers for &ldquo;SEO reports&rdquo; with zero ranking improvement',
                                    'Targeting broad, competitive keywords instead of high-intent buyer queries',
                                    'No content strategy\u2014random blog posts with no topical authority plan',
                                    'Backlinks from PBNs and directories that Google actively penalizes',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="text-red-400 mt-1 shrink-0">{'\u2717'}</div>
                                        <span className="text-paragraph" dangerouslySetInnerHTML={{ __html: item }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="glass-card p-8 rounded-2xl border border-amber-500/20">
                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">The Deeplink Difference</h3>
                            <p className="text-paragraph mb-6">
                                We don&apos;t do &ldquo;SEO services.&rdquo; We build organic search monopolies.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: 'Predictive Keyword Intelligence', desc: 'AI models that identify emerging search trends before your competitors.' },
                                    { label: 'Topical Authority Architecture', desc: 'Content cluster strategy that makes Google see you as THE industry expert.' },
                                    { label: 'Revenue-Tied Reporting', desc: 'We track organic traffic to actual revenue\u2014not just rankings and impressions.' },
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
            <section className="section-padding bg-dark-100">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            The Deeplink <span className="text-amber-400">SEO Dominance Protocol</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            A 4-phase system that builds compounding organic traffic and market authority.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.step} className="glass-card rounded-2xl p-8 relative">
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
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            What You <span className="text-amber-400">Actually Get</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="glass-card rounded-xl p-6 hover:border-amber-500/30 transition-colors">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <TrendingUp className="text-amber-400" size={20} />
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
                        Stop Renting Rankings.{' '}
                        <span className="text-accent">Start Owning Your Market.</span>
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Book a free SEO strategy session. We&apos;ll audit your current organic performance, reveal the keywords your competitors are winning, and show you the roadmap to dominate your industry in search.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8 text-dark"
                        >
                            Claim Your SEO Strategy
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
