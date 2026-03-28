import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, Target, Search, Users, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react'
import ServiceHeroImage from '@/components/ServiceHeroImage'

export const metadata: Metadata = {
    title: 'Higher Education & College Marketing Agency | Deeplink Creators',
    description: 'Admission pipeline architecture for colleges and universities. We build student acquisition systems that deliver qualified admission leads — not form-fills that never show up.',
    openGraph: {
        title: 'Higher Education & College Marketing Agency | Deeplink Creators',
        description: 'Admission pipeline architecture for colleges and universities. We build student acquisition systems that deliver qualified admission leads — not form-fills that never show up.',
        url: 'https://deeplinkcreators.com/services/education-marketing/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/education-marketing/',
    },
}

const processSteps = [
    {
        step: '01',
        title: 'Enrollment Funnel Audit',
        description: 'We analyze your current admission pipeline — source-wise lead quality, counselor conversion rates, and drop-off points. Every decision is data-backed.',
        icon: <Target size={24} />,
    },
    {
        step: '02',
        title: 'Demand Capture Deployment',
        description: 'SEO for program-specific searches, Google Ads for active seekers, Meta campaigns for awareness, and dedicated program landing pages with virtual campus tours.',
        icon: <Search size={24} />,
    },
    {
        step: '03',
        title: 'Lead Qualification Automation',
        description: 'Automated scoring and nurturing that separates serious applicants from information collectors. Your counseling team only speaks to students who are ready to enroll.',
        icon: <Users size={24} />,
    },
    {
        step: '04',
        title: 'Admission Funnel Optimization',
        description: 'Weekly analysis, creative testing, audience refinement, and counselor feedback loops. We optimize from impression to inquiry to confirmed admission.',
        icon: <TrendingUp size={24} />,
    },
]

const deliverables = [
    { title: 'Program-Specific Google Ads', description: 'Search campaigns targeting students actively looking for BTech, MBA, BBA, Law, and other programs — with dedicated landing pages for each.' },
    { title: 'Meta Lead Generation', description: 'Facebook and Instagram campaigns targeting students by age, location, education level, and interest — with instant lead forms and automated follow-up.' },
    { title: 'Education SEO', description: 'Long-term organic rankings for program-specific and college-comparison queries that generate free, high-intent student traffic every admission cycle.' },
    { title: 'Campus Landing Pages', description: 'Conversion-optimized program microsites with virtual tours, placement data, faculty profiles, and instant counselor callback widgets.' },
    { title: 'Student Nurturing Sequences', description: 'Email and WhatsApp drip campaigns that guide students from inquiry to campus visit to confirmed admission — no lead goes cold.' },
    { title: 'Enrollment Attribution Dashboard', description: 'Real-time dashboard showing cost-per-inquiry, cost-per-campus-visit, cost-per-admission, and program-wise ROI for every channel.' },
]

export default function EducationMarketingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                            <GraduationCap size={16} className="text-blue-400" />
                            <span className="text-sm font-medium text-blue-300">Admission Pipeline Architecture</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-heading mb-6 leading-tight">
                            Empty Seats Don&apos;t Generate Revenue.{' '}
                            <span className="text-blue-400">Full Classrooms Do.</span>
                        </h1>
                        <p className="text-lg text-paragraph mb-8 max-w-2xl mx-auto">
                            Your institution is spending lakhs on newspaper ads, education fairs, and generic Google campaigns. Meanwhile, 85% of students research colleges online before they ever visit campus. We capture that demand and convert it into confirmed admissions.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2 text-base py-3.5 px-8"
                        >
                            Get Your Admission Audit
                            <ArrowRight size={20} />
                        </Link>
                        <ServiceHeroImage href="/services/education-marketing" />
                    </div>
                </div>
            </section>

            {/* Problem/Agitation Section */}
            <section className="section-padding bg-[#FAFAF8]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-6">
                                Your Admission Funnel Is{' '}
                                <span className="text-red-400">Broken at Every Stage</span>
                            </h2>
                            <p className="text-paragraph mb-6">
                                Knowledge Park and Greater Noida institutions are drowning in low-quality leads — students who fill forms but never show up for counseling, let alone admission. The problem isn&apos;t lead volume. It&apos;s lead quality and conversion architecture.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Spending on education portals that send the same leads to 10 competing colleges',
                                    'Google Ads campaigns with no program-specific landing pages or tracking',
                                    'Zero visibility on which channel drives actual enrollment — not just inquiries',
                                    'Counseling team overwhelmed with unqualified leads while serious students slip away',
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
                                We don&apos;t do &apos;education marketing.&apos; We build admission machines.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: 'Intent-Based Student Targeting', desc: 'We capture students actively searching for specific programs — engineering, management, law — not random education browsers.' },
                                    { label: 'Enrollment Attribution', desc: 'Every lead tracked from first click to campus visit to confirmed admission — complete pipeline visibility.' },
                                    { label: 'Program-Specific Campaigns', desc: 'Dedicated campaigns for each program, intake, and scholarship — not one generic \'admissions open\' ad.' },
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
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            The Deeplink <span className="text-blue-400">Admission Engine</span>
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            A 4-phase system that turns marketing spend into confirmed admissions.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.step} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-8 relative">
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
            <section className="section-padding bg-[#FAFAF8]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-heading mb-4">
                            What You <span className="text-blue-400">Actually Get</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-6 hover:border-blue-500/30 transition-colors">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <GraduationCap className="text-blue-400" size={20} />
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
                        Stop Buying Leads.{' '}
                        <span className="text-[#C39A2B]">Start Building an Admission Machine.</span>
                    </h2>
                    <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                        Book a free enrollment audit. We&apos;ll analyze your current admission pipeline, identify where qualified students are dropping off, and show you the system that fills every seat.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-base py-3.5 px-8 text-white"
                        >
                            Get Your Admission Audit
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
