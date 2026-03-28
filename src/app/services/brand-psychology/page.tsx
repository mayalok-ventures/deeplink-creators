import type { Metadata } from 'next'
import Link from 'next/link'
import { Palette, Eye, Brain, Award, Layers, Fingerprint, ArrowRight, CheckCircle2 } from 'lucide-react'
import ServiceHeroImage from '@/components/ServiceHeroImage'

export const metadata: Metadata = {
    title: 'Brand Psychology & Corporate Identity Strategy | Deeplink Creators',
    description: 'Build a visual identity that commands premium pricing. Consumer psychology profiling, corporate branding, and visual architecture.',
    openGraph: {
        title: 'Brand Psychology & Corporate Identity Strategy | Deeplink Creators',
        description: 'Build a visual identity that commands premium pricing. Consumer psychology profiling, corporate branding, and visual architecture.',
        url: 'https://deeplinkcreators.com/services/brand-psychology/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/brand-psychology/',
    },
}

const processSteps = [
    {
        step: '01',
        title: 'Consumer Psychology Audit',
        description: 'We profile your ideal customer\u2019s cognitive biases, emotional triggers, and decision-making patterns. Your brand will speak directly to their subconscious buying logic.',
        icon: <Brain size={24} />,
    },
    {
        step: '02',
        title: 'Brand Archetype Engineering',
        description: 'We assign your brand a Jungian archetype\u2014Hero, Sage, Ruler, Creator\u2014then build every visual and verbal element around that identity framework.',
        icon: <Fingerprint size={24} />,
    },
    {
        step: '03',
        title: 'Visual Identity System',
        description: 'Logo, typography, color psychology, iconography, and layout grids\u2014all engineered to trigger trust, authority, and premium perception at first glance.',
        icon: <Palette size={24} />,
    },
    {
        step: '04',
        title: 'Brand Deployment & Guidelines',
        description: 'A comprehensive brand bible with usage rules, templates, and asset libraries so your identity stays consistent across every touchpoint, forever.',
        icon: <Layers size={24} />,
    },
]

const deliverables = [
    { title: 'Consumer Psychology Profile', description: 'Deep behavioral analysis of your target audience\u2019s decision triggers, trust signals, and objection patterns.' },
    { title: 'Brand Archetype Strategy', description: 'Your brand\u2019s personality framework, voice guidelines, and messaging pillars rooted in psychology research.' },
    { title: 'Visual Identity Suite', description: 'Logo system, color palette, typography selection, and iconography\u2014all backed by color psychology principles.' },
    { title: 'Brand Guidelines Document', description: '50+ page brand bible covering logo usage, spacing rules, tone of voice, and application examples.' },
    { title: 'Marketing Collateral Pack', description: 'Business cards, letterheads, presentation decks, social media templates, and email signatures.' },
    { title: 'Competitive Perception Audit', description: 'Visual and verbal positioning analysis against top 5 competitors to ensure differentiation.' },
]

export default function BrandPsychologyPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                            <Brain size={16} className="text-purple-400" />
                            <span className="text-sm font-medium text-purple-300">Brand Psychology & Identity</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-heading mb-6 leading-tight">
                            Brands That Win Don&apos;t Compete on Price.{' '}
                            <span className="text-purple-400">They Compete on Perception.</span>
                        </h1>
                        <p className="text-lg text-paragraph mb-8 max-w-2xl mx-auto">
                            A logo from Fiverr won&apos;t build a ₹100 Cr brand. We engineer visual identities rooted in consumer psychology\u2014so your brand commands premium pricing before a single word is spoken.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-base py-3.5 px-8"
                        >
                            Audit Your Brand
                            <ArrowRight size={20} />
                        </Link>
                        <ServiceHeroImage href="/services/brand-psychology" />
                    </div>
                </div>
            </section>

            {/* Problem/Agitation Section */}
            <section className="section-padding bg-[#FAFAF8]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-6">
                                Your Brand Looks Like{' '}
                                <span className="text-red-400">Everyone Else&apos;s</span>
                            </h2>
                            <p className="text-paragraph mb-6">
                                Generic logos. Stock photo aesthetics. A color palette picked because the founder &ldquo;liked blue.&rdquo; This is why customers treat you as a commodity and negotiate you down to your lowest price.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Your brand visuals were designed in Canva by an intern\u2014and it shows',
                                    'Customers can\u2019t tell you apart from 10 other companies in your space',
                                    'You constantly lose deals to competitors who \u201Clook\u201D more established',
                                    'No brand guidelines\u2014every marketing piece looks like it\u2019s from a different company',
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
                                We don&apos;t design brands. We engineer psychological positioning systems.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: 'Psychology-Backed Design', desc: 'Every color, font, and shape is chosen based on cognitive science.' },
                                    { label: 'Archetype Positioning', desc: 'Your brand personality is mapped to proven psychological frameworks.' },
                                    { label: 'Premium Perception', desc: 'Customers perceive you as 2\u20135x more valuable before seeing your pricing.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="bg-purple-500/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-purple-400" size={20} />
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
                            The Deeplink <span className="text-purple-400">Brand Psychology Framework</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            A 4-phase system that builds brands people trust on instinct\u2014not logic.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.step} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 relative">
                                <div className="text-5xl font-extrabold text-purple-500/10 absolute top-4 right-4">{step.step}</div>
                                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 text-purple-400">
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
                            What You <span className="text-purple-400">Actually Get</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-6 hover:border-purple-500/30 transition-colors">
                                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <Eye className="text-purple-400" size={20} />
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
                        Stop Looking Like a Startup.{' '}
                        <span className="text-[#C39A2B]">Start Looking Like the Market Leader.</span>
                    </h2>
                    <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                        Book a free brand audit. We&apos;ll analyze your current identity, benchmark it against your competitors, and show you the psychological gaps costing you premium clients.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-base py-3.5 px-8 text-white"
                        >
                            Audit Your Brand
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
