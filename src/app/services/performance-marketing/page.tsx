import type { Metadata } from 'next'
import { Target, TrendingUp, DollarSign, BarChart3, Zap, Shield } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Performance Marketing Services | ROI-Focused Ads | Deeplink Creators',
    description: 'Stop burning money on ads. We build paid advertising systems where every rupee generates positive ROI for Greater Noida businesses.',
}

export default function PerformanceMarketingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-dark overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-heading mb-6">
                            Performance Marketing That <span className="text-accent">Guarantees ROI</span>
                        </h1>
                        <p className="text-xl text-paragraph mb-8">
                            Stop burning money on ads. We build paid advertising systems where every rupee spent generates more than a rupee in return.
                        </p>
                        <a
                            href="/contact"
                            className="btn-secondary inline-flex items-center gap-2 text-lg text-dark"
                        >
                            Get FREE Ad Account Audit
                            <Target size={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-heading font-extrabold text-heading mb-6">
                                Are Your <span className="text-red-400">Facebook & Google Ads</span> Losing Money?
                            </h2>
                            <p className="text-paragraph mb-6">
                                Most businesses in Greater Noida are overspending on digital ads because they're targeting the wrong audience,
                                with the wrong message, at the wrong time. We fix all three.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-lg">
                                    <div className="text-red-400 mt-1">
                                        <DollarSign size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-heading mb-1">High Cost, Low Results</h4>
                                        <p className="text-paragraph">Paying for clicks that never convert into customers</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-lg">
                                    <div className="text-red-400 mt-1">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-heading mb-1">Wrong Audience Targeting</h4>
                                        <p className="text-paragraph">Showing ads to people who will never buy from you</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-lg">
                                    <div className="text-red-400 mt-1">
                                        <BarChart3 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-heading mb-1">No Clear ROI Tracking</h4>
                                        <p className="text-paragraph">Can't tell which ads are actually making money</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-2xl p-8 text-white border-accent/30">
                            <h3 className="text-2xl font-heading font-bold mb-6">Our Performance Marketing Difference</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/[0.05] p-3 rounded-lg">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">ROI-First Approach</h4>
                                        <p className="text-paragraph">
                                            We only run ads that generate positive ROI. No exceptions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/[0.05] p-3 rounded-lg">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Advanced Tracking</h4>
                                        <p className="text-paragraph">
                                            We track every rupee to sale, not just clicks or impressions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/[0.05] p-3 rounded-lg">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Continuous Optimization</h4>
                                        <p className="text-paragraph">
                                            Daily monitoring and weekly optimization of all campaigns.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-white/[0.05] rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-accent">5.7X</div>
                                    <div className="text-paragraph">Average ROI for Our Clients</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section-padding bg-dark-100">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-extrabold text-heading mb-4">
                            Our <span className="text-accent">Performance Marketing</span> Services
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
                            Complete advertising solutions for Greater Noida businesses
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Facebook & Instagram Ads",
                                description: "Target your ideal customers on social media with precision",
                                features: [
                                    "Audience Research & Profiling",
                                    "Creative Strategy & Design",
                                    "Conversion Tracking Setup",
                                    "Daily Performance Monitoring"
                                ],
                                icon: <Target size={24} />,
                                color: "from-blue-500 to-blue-600"
                            },
                            {
                                title: "Google Ads Management",
                                description: "Show up when potential customers are actively searching",
                                features: [
                                    "Keyword Research & Selection",
                                    "Ad Copy & Landing Page Optimization",
                                    "Competitor Analysis",
                                    "Bid Strategy Management"
                                ],
                                icon: <TrendingUp size={24} />,
                                color: "from-red-500 to-red-600"
                            },
                            {
                                title: "LinkedIn B2B Advertising",
                                description: "Reach decision-makers in specific companies and industries",
                                features: [
                                    "Company Targeting",
                                    "Job Title & Function Targeting",
                                    "Lead Generation Forms",
                                    "Account-Based Marketing"
                                ],
                                icon: <BarChart3 size={24} />,
                                color: "from-blue-400 to-blue-500"
                            }
                        ].map((service, index) => (
                            <div key={index} className="glass-card rounded-xl p-6">
                                <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-6`}>
                                    <div className="text-white">
                                        {service.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-heading font-bold text-heading mb-3">{service.title}</h3>
                                <p className="text-paragraph mb-6">{service.description}</p>

                                <ul className="space-y-2 mb-6">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                            <span className="text-paragraph text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-accent font-semibold hover:text-green-400"
                                >
                                    Get Started
                                    <TrendingUp size={16} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Study */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="glass-card rounded-2xl p-8 md:p-12 text-white border-accent/30">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/[0.05] backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                                    <span className="font-medium">CASE STUDY</span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                                    Real Estate Builder in Noida Extension
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <div className="text-sm text-paragraph mb-1">Before Working With Us</div>
                                        <div className="text-2xl font-bold">₹2L/month Ad Spend</div>
                                        <div className="text-paragraph">With No Measurable Sales</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-paragraph mb-1">After Optimization</div>
                                        <div className="text-2xl font-bold text-accent">₹2.3 Crore</div>
                                        <div className="text-paragraph">in Property Sales Generated</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-paragraph mb-1">ROI Achieved</div>
                                        <div className="text-2xl font-bold text-accent">5.7X</div>
                                        <div className="text-paragraph">Return on Ad Spend</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/[0.05] backdrop-blur-sm rounded-xl p-6">
                                <h4 className="font-heading font-bold text-lg mb-4">The Strategy That Worked</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/[0.1] p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                        </div>
                                        <span className="text-paragraph">Identified exact buyer personas for premium apartments</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/[0.1] p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                        </div>
                                        <span className="text-paragraph">Created property-specific landing pages with virtual tours</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/[0.1] p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                        </div>
                                        <span className="text-paragraph">Implemented retargeting for website visitors</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/[0.1] p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                        </div>
                                        <span className="text-paragraph">Tracked phone calls and form submissions to source</span>
                                    </li>
                                </ul>
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
                        Ready to Make Your Ads <span className="text-gold">Actually Profitable</span>?
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Get your FREE Ad Account Audit. We'll show you exactly where your money is being wasted and how to fix it.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg text-dark py-4 px-8"
                        >
                            Get FREE Ad Audit
                            <Target size={20} />
                        </a>
                        <a
                            href="tel:+911234567890"
                            className="bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold py-4 px-8 rounded-lg border border-white/[0.1] transition-colors"
                        >
                            Speak With Ads Specialist
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
