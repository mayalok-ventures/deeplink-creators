import type { Metadata } from 'next'
import { TrendingUp, Target, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Results | Deeplink Creators',
    description: 'See how our Neuro-Marketing approach delivers measurable business outcomes for Greater Noida businesses.',
}

export default function ResultsPage() {
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
                            We don't do "portfolio" work. We deliver measurable business outcomes. Here's what our Neuro-Marketing approach achieves for Greater Noida businesses.
                        </p>
                    </div>
                </div>
            </section>

            {/* Case Studies Placeholder */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-4">
                            Real <span className="text-primary-400">Business Impact</span>, Not Vanity Metrics
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            Every number we share represents real revenue, real growth, and real business transformation.
                        </p>
                    </div>

                    <div className="glass-card rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <TrendingUp className="text-primary-400" size={32} />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-heading mb-4">
                            Case Studies Coming Soon
                        </h3>
                        <p className="text-lg text-paragraph max-w-2xl mx-auto">
                            We're currently compiling detailed case studies with verified results from our clients. Check back soon to see real business outcomes powered by our Neuro-Marketing approach.
                        </p>
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
                        Ready to See <span className="text-accent">Results</span> for Your Business?
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
                    </div>
                    <p className="text-sm text-paragraph mt-6">
                        Limited to 2 free sessions per week for qualified businesses
                    </p>
                </div>
            </section>
        </>
    )
}
