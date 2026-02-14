import type { Metadata } from 'next'
import Link from 'next/link'
import { Code, Layers, Zap, Shield, Server, GitBranch, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Custom SaaS & Enterprise Software Engineering | Deeplink Creators',
    description: 'Scalable, high-performance web applications and SaaS products engineered for hyper-growth. Built on Next.js and Cloudflare.',
    openGraph: {
        title: 'Custom SaaS & Enterprise Software Engineering | Deeplink Creators',
        description: 'Scalable, high-performance web applications and SaaS products engineered for hyper-growth. Built on Next.js and Cloudflare.',
        url: 'https://deeplinkcreators.com/services/custom-saas-development',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/custom-saas-development',
    },
}

const processSteps = [
    {
        step: '01',
        title: 'Architecture Blueprint',
        description: 'We map your entire product logic, data models, and API contracts before a single line of code is written. No surprises in production.',
        icon: <GitBranch size={24} />,
    },
    {
        step: '02',
        title: 'Edge-First Engineering',
        description: 'Every module is built on Next.js App Router with Cloudflare Workers for sub-50ms global response times. Your SaaS loads faster than your competitors\u2019 landing pages.',
        icon: <Server size={24} />,
    },
    {
        step: '03',
        title: 'Security & Scale Hardening',
        description: 'Role-based access, row-level security, rate limiting, and auto-scaling infrastructure. Enterprise-grade from day one, not bolted on later.',
        icon: <Shield size={24} />,
    },
    {
        step: '04',
        title: 'Launch, Monitor & Iterate',
        description: 'CI/CD pipelines, real-time error tracking, and performance dashboards. We don\u2019t just ship\u2014we ensure it stays alive under real traffic.',
        icon: <Zap size={24} />,
    },
]

const deliverables = [
    { title: 'Custom SaaS Platform', description: 'Multi-tenant applications with subscription billing, user management, and analytics dashboards.' },
    { title: 'API & Microservices', description: 'RESTful and GraphQL APIs designed for third-party integrations and internal systems.' },
    { title: 'Admin Dashboards', description: 'Real-time data visualization panels with role-based access and export functionality.' },
    { title: 'Mobile-First PWAs', description: 'Progressive Web Apps that rival native mobile performance with offline support.' },
    { title: 'Database Architecture', description: 'PostgreSQL, Firebase, or Supabase\u2014optimized schemas with migration strategies.' },
    { title: 'DevOps & CI/CD', description: 'Automated testing, deployment pipelines, and infrastructure-as-code on Cloudflare or Vercel.' },
]

export default function CustomSaasDevelopmentPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-dark overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                            <Code size={16} className="text-blue-400" />
                            <span className="text-sm font-medium text-blue-300">Enterprise Software Engineering</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-heading mb-6 leading-tight">
                            We Don&apos;t Build Websites.{' '}
                            <span className="text-blue-400">We Engineer Revenue Infrastructure.</span>
                        </h1>
                        <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                            Your SaaS product shouldn&apos;t be a glorified WordPress site. We architect production-grade platforms on Next.js and Cloudflare that handle 100K+ concurrent users without breaking a sweat.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-8"
                        >
                            Claim Your Architecture Audit
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
                                Your &ldquo;Developer&rdquo; Is Costing You{' '}
                                <span className="text-red-400">More Than You Think</span>
                            </h2>
                            <p className="text-paragraph mb-6">
                                Freelancers and cheap dev shops deliver code that works in a demo and collapses under real users. You end up paying 3x to rebuild what should have been engineered correctly from the start.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Spaghetti codebases that no new developer can understand or maintain',
                                    'Zero test coverage\u2014every deploy is a coin flip between working and crashing',
                                    'No CI/CD pipeline\u2014manual deployments via FTP like it\u2019s 2009',
                                    'Server bills that skyrocket because nobody optimized the architecture',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="text-red-400 mt-1 shrink-0">\u2717</div>
                                        <span className="text-paragraph">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="glass-card p-8 rounded-2xl border border-blue-500/20">
                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">The Deeplink Standard</h3>
                            <p className="text-paragraph mb-6">
                                Every project ships with production-grade infrastructure, not a prototype dressed up as a product.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: 'TypeScript-First', desc: 'Zero runtime type errors. Period.' },
                                    { label: 'Edge-Deployed', desc: 'Sub-50ms TTFB globally via Cloudflare.' },
                                    { label: '100% Test Coverage', desc: 'Automated testing on every commit.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="bg-blue-500/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-blue-400" size={20} />
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
                            The Deeplink <span className="text-blue-400">Engineering Protocol</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            A battle-tested 4-phase process that eliminates scope creep, technical debt, and launch-day disasters.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.step} className="glass-card rounded-2xl p-8 relative">
                                <div className="text-5xl font-extrabold text-blue-500/10 absolute top-4 right-4">{step.step}</div>
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-400">
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
                            What You <span className="text-blue-400">Actually Get</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="glass-card rounded-xl p-6 hover:border-blue-500/30 transition-colors">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <Layers className="text-blue-400" size={20} />
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
                        Stop Paying for Code That{' '}
                        <span className="text-accent">Breaks Under Pressure.</span>
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Book a free architecture audit. We&apos;ll review your current stack, identify the bottlenecks, and show you the exact roadmap to a production-grade platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8 text-dark"
                        >
                            Claim Your Architecture Audit
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
