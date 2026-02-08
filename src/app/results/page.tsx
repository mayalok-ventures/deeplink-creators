import type { Metadata } from 'next'
import CaseStudyCard from '@/components/CaseStudyCard'
import { TrendingUp, Target, Users, DollarSign, BarChart3, Clock, Smartphone, Globe } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Case Studies & Proven Results | Deeplink Creators',
    description: 'See real results for Greater Noida businesses. Manufacturing company achieved 300% growth in 3 months.',
}

export default function ResultsPage() {
    const caseStudies = [
        {
            title: "Industrial Equipment Manufacturer in Greater Noida",
            industry: "Manufacturing",
            challenge: "Completely invisible online. Losing business to competitors 200km away because they ranked better in local searches.",
            solution: "Implemented Neuro-SEO targeting 37 high-intent keywords specific to Greater Noida industrial buyers, built location-specific pages, and optimized Google Business Profile.",
            results: [
                { metric: "Monthly Leads", value: "0 → 47", icon: <Users size={20} /> },
                { metric: "Revenue Impact", value: "₹82 Lakh", icon: <DollarSign size={20} /> },
                { metric: "Growth", value: "300%", icon: <TrendingUp size={20} /> },
                { metric: "Time Frame", value: "3 Months", icon: <Clock size={20} /> }
            ],
            ctaText: "Get My SEO Audit",
            href: "/contact",
            featured: true
        },
        {
            title: "Real Estate Builder in Noida Extension",
            industry: "Real Estate",
            challenge: "Spending ₹2L/month on Facebook ads with no measurable sales. Getting clicks but no property visits.",
            solution: "Redesigned complete sales funnel, implemented retargeting strategy, created property-specific landing pages with virtual tours.",
            results: [
                { metric: "Cost Per Lead", value: "₹850 → ₹210", icon: <Target size={20} /> },
                { metric: "Property Visits", value: "3 → 42/month", icon: <Users size={20} /> },
                { metric: "Sales Generated", value: "₹2.3 Crore", icon: <DollarSign size={20} /> },
                { metric: "ROI", value: "5.7X", icon: <BarChart3 size={20} /> }
            ],
            ctaText: "Optimize My Ads",
            href: "/contact"
        },
        {
            title: "Educational Institute - MBA Coaching",
            industry: "Education",
            challenge: "Low website conversion rate (1.2%). Getting traffic but few admissions.",
            solution: "Complete funnel overhaul, A/B testing on landing pages, implemented chatbots for instant responses, created success stories content.",
            results: [
                { metric: "Conversion Rate", value: "1.2% → 8.7%", icon: <TrendingUp size={20} /> },
                { metric: "Admissions", value: "500+", icon: <Users size={20} /> },
                { metric: "Cost Per Admission", value: "₹4200 → ₹1800", icon: <Target size={20} /> },
                { metric: "Time Frame", value: "6 Months", icon: <Clock size={20} /> }
            ],
            ctaText: "Fix My Funnel",
            href: "/contact"
        },
        {
            title: "E-commerce Fashion Brand",
            industry: "E-commerce",
            challenge: "High cart abandonment rate (78%). Good traffic but low repeat customers.",
            solution: "Implemented cart abandonment flows, personalized email sequences, loyalty program, and mobile-first redesign.",
            results: [
                { metric: "Abandonment Rate", value: "78% → 32%", icon: <TrendingUp size={20} /> },
                { metric: "Average Order Value", value: "₹1,200 → ₹2,100", icon: <DollarSign size={20} /> },
                { metric: "Repeat Customers", value: "12% → 38%", icon: <Users size={20} /> },
                { metric: "ROI on Ad Spend", value: "7X", icon: <BarChart3 size={20} /> }
            ],
            ctaText: "Boost My Sales",
            href: "/contact"
        },
        {
            title: "Healthcare Clinic - Dental Practice",
            industry: "Healthcare",
            challenge: "New clinic with zero online presence. Needed to build authority quickly.",
            solution: "Local SEO strategy, Google My Business optimization, patient testimonials campaign, and service-specific content creation.",
            results: [
                { metric: "Monthly Appointments", value: "0 → 86", icon: <Users size={20} /> },
                { metric: "Phone Calls", value: "120+/month", icon: <Smartphone size={20} /> },
                { metric: "Google Reviews", value: "0 → 47", icon: <Globe size={20} /> },
                { metric: "Time Frame", value: "4 Months", icon: <Clock size={20} /> }
            ],
            ctaText: "Build My Authority",
            href: "/contact"
        },
        {
            title: "B2B Software Company",
            industry: "Technology",
            challenge: "Long sales cycle (6+ months). Difficulty generating qualified enterprise leads.",
            solution: "Account-based marketing strategy, LinkedIn targeting, whitepaper campaigns, and case study-driven content.",
            results: [
                { metric: "Sales Cycle", value: "6 → 3 months", icon: <Clock size={20} /> },
                { metric: "Enterprise Leads", value: "2 → 14/month", icon: <Target size={20} /> },
                { metric: "Deal Size", value: "₹8L → ₹15L", icon: <DollarSign size={20} /> },
                { metric: "ROI", value: "12X", icon: <BarChart3 size={20} /> }
            ],
            ctaText: "Get Enterprise Leads",
            href: "/contact"
        }
    ]

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-dark overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-heading mb-6">
                            <span className="text-primary-400">Proven Results</span> That Drive Business Growth
                        </h1>
                        <p className="text-xl text-paragraph mb-8">
                            We don't do "portfolio" work. We deliver measurable business outcomes. Here's what our Neuro-Marketing approach has achieved for Greater Noida businesses.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="text-2xl font-bold text-primary-400">
                                ₹15+ Crore
                            </div>
                            <div className="text-paragraph">|</div>
                            <div className="text-lg text-paragraph">
                                Revenue generated for clients in 2023
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            Real <span className="text-primary-400">Business Impact</span>, Not Vanity Metrics
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            Every number below represents real revenue, real growth, and real business transformation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {caseStudies.map((study, index) => (
                            <CaseStudyCard key={index} {...study} />
                        ))}
                    </div>

                    {/* Methodology Section */}
                    <div className="mt-16 bg-dark-100 rounded-2xl p-8 md:p-12">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl md:text-3xl font-heading font-bold text-heading mb-4">
                                Why Our Results Are <span className="text-primary-400">Different</span>
                            </h3>
                            <p className="text-xl text-paragraph max-w-3xl mx-auto">
                                Our Neuro-Marketing methodology focuses on what actually matters to your business
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-card p-6 rounded-xl">
                                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <Target className="text-primary-400" size={24} />
                                </div>
                                <h4 className="font-heading font-bold text-lg text-heading mb-3">Revenue-First Approach</h4>
                                <p className="text-paragraph">
                                    We only track metrics that directly impact your bottom line. No vanity metrics, only what drives profit.
                                </p>
                            </div>

                            <div className="glass-card p-6 rounded-xl">
                                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <TrendingUp className="text-accent" size={24} />
                                </div>
                                <h4 className="font-heading font-bold text-lg text-heading mb-3">Scalable Systems</h4>
                                <p className="text-paragraph">
                                    We build marketing machines that work 24/7, not one-off campaigns that stop when budgets do.
                                </p>
                            </div>

                            <div className="glass-card p-6 rounded-xl">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <BarChart3 className="text-purple-400" size={24} />
                                </div>
                                <h4 className="font-heading font-bold text-lg text-heading mb-3">Data-Driven Decisions</h4>
                                <p className="text-paragraph">
                                    Every decision is backed by data and psychology, not guesswork or industry "best practices".
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative section-padding bg-dark-200 text-white">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6">
                        Ready to See <span className="text-accent">Similar Results</span> for Your Business?
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Book your FREE Revenue Growth Session. We'll analyze your current marketing and show you exactly how to get more customers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8 text-dark"
                        >
                            Book Free Growth Session
                            <TrendingUp size={20} />
                        </a>
                        <a
                            href="tel:+911234567890"
                            className="bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold py-4 px-8 rounded-lg border border-white/[0.1] transition-colors"
                        >
                            Call Now: +91 123 456 7890
                        </a>
                    </div>
                    <p className="text-sm text-paragraph mt-6">
                        Limited to 2 free sessions per week for qualified businesses
                    </p>
                </div>
            </section>
        </>
    )
}
