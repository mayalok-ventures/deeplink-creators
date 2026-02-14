import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Bot, Mail, Target, BarChart, GitBranch, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'AI-Driven Marketing Automation Services | Deeplink Creators',
    description: 'Eliminate manual tasks and scale your revenue. We build automated AI sales funnels and CRM workflows to capture and close leads 24/7.',
    openGraph: {
        title: 'AI-Driven Marketing Automation Services | Deeplink Creators',
        description: 'Eliminate manual tasks and scale your revenue. We build automated AI sales funnels and CRM workflows to capture and close leads 24/7.',
        url: 'https://deeplinkcreators.com/services/ai-marketing-automation',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/ai-marketing-automation',
    },
}

const processSteps = [
    {
        step: '01',
        title: 'Funnel & CRM Audit',
        description: 'We map every touchpoint from first click to closed deal. We find the exact stages where leads drop off and revenue leaks out.',
        icon: <Target size={24} />,
    },
    {
        step: '02',
        title: 'AI Workflow Design',
        description: 'We architect automated sequences\u2014email nurture, lead scoring, chatbot qualification, and CRM triggers\u2014that replace 80% of your manual follow-up.',
        icon: <Bot size={24} />,
    },
    {
        step: '03',
        title: 'Integration & Deployment',
        description: 'We connect your ad platforms, CRM, email, WhatsApp, and analytics into one unified system. No more data silos or missed leads.',
        icon: <GitBranch size={24} />,
    },
    {
        step: '04',
        title: 'Optimization & AI Training',
        description: 'The system learns from every interaction. We continuously refine scoring models, email copy, and trigger conditions based on real conversion data.',
        icon: <BarChart size={24} />,
    },
]

const deliverables = [
    { title: 'AI Lead Scoring System', description: 'Machine learning models that rank leads by purchase intent so your sales team only talks to buyers.' },
    { title: 'Automated Email Sequences', description: 'Behavior-triggered nurture campaigns that send the right message at the exact right moment.' },
    { title: 'Chatbot & WhatsApp Automation', description: 'AI-powered conversational bots that qualify leads, answer questions, and book meetings 24/7.' },
    { title: 'CRM Workflow Automation', description: 'HubSpot, Salesforce, or custom CRM pipelines with automated task creation, reminders, and deal progression.' },
    { title: 'Retargeting Pixel Architecture', description: 'Cross-platform pixel setup and audience segmentation for automated retargeting across Google and Meta.' },
    { title: 'Revenue Attribution Dashboard', description: 'End-to-end tracking from ad click to closed deal\u2014know exactly which automation generates the most revenue.' },
]

export default function AIMarketingAutomationPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-dark overflow-hidden">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                            <Bot size={16} className="text-emerald-400" />
                            <span className="text-sm font-medium text-emerald-300">AI-Powered Marketing Automation</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-heading mb-6 leading-tight">
                            Your Sales Team Sleeps.{' '}
                            <span className="text-emerald-400">Your AI Funnels Don&apos;t.</span>
                        </h1>
                        <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                            Every lead that goes unfollowed is revenue gifted to your competitor. We build AI-driven automation systems that capture, nurture, and close leads around the clock\u2014without adding headcount.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-8"
                        >
                            Claim Your Automation Audit
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
                                Manual Follow-Up Is{' '}
                                <span className="text-red-400">Killing Your Pipeline</span>
                            </h2>
                            <p className="text-paragraph mb-6">
                                Your team spends 60% of their time on repetitive tasks\u2014sending follow-up emails, qualifying leads, updating CRMs. Meanwhile, hot leads cool off because nobody called them back within 5 minutes.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Leads fill out your form and hear nothing for 48 hours',
                                    'Sales reps waste hours on prospects who were never going to buy',
                                    'No system to re-engage leads who went cold\u2014they\u2019re just gone',
                                    'Your CRM is a graveyard of unworked contacts with zero automation',
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
                                We don&apos;t just set up tools. We build intelligent systems that think, react, and close.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: 'Sub-60s Response Time', desc: 'AI responds to every new lead within 60 seconds, 24/7.' },
                                    { label: 'Predictive Lead Scoring', desc: 'ML models that identify high-intent buyers before your team even calls.' },
                                    { label: 'Full-Funnel Attribution', desc: 'Track every touchpoint from first click to signed contract.' },
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
            <section className="section-padding bg-dark-100">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            The Deeplink <span className="text-emerald-400">Automation Architecture</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            A 4-phase system that replaces manual busywork with intelligent, revenue-generating automation.
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
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            What You <span className="text-emerald-400">Actually Get</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="glass-card rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
                                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <Mail className="text-emerald-400" size={20} />
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
                        Stop Losing Leads to{' '}
                        <span className="text-accent">Slow Follow-Up.</span>
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Book a free automation audit. We&apos;ll map your current funnel, identify every leak, and show you the exact AI workflows that will close more deals without more people.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8 text-dark"
                        >
                            Claim Your Automation Audit
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
