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
            <section className="pt-32 pb-20 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Performance Marketing That <span className="text-green-600">Guarantees ROI</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Stop burning money on ads. We build paid advertising systems where every rupee spent generates more than a rupee in return.
                        </p>
                        <a
                            href="/contact"
                            className="btn-secondary inline-flex items-center gap-2 text-lg"
                        >
                            Get FREE Ad Account Audit
                            <Target size={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Are Your <span className="text-red-600">Facebook & Google Ads</span> Losing Money?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Most businesses in Greater Noida are overspending on digital ads because they're targeting the wrong audience,
                                with the wrong message, at the wrong time. We fix all three.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-500 mt-1">
                                        <DollarSign size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">High Cost, Low Results</h4>
                                        <p className="text-gray-700">Paying for clicks that never convert into customers</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-500 mt-1">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Wrong Audience Targeting</h4>
                                        <p className="text-gray-700">Showing ads to people who will never buy from you</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-500 mt-1">
                                        <BarChart3 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">No Clear ROI Tracking</h4>
                                        <p className="text-gray-700">Can't tell which ads are actually making money</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-6">Our Performance Marketing Difference</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">ROI-First Approach</h4>
                                        <p className="text-green-100">
                                            We only run ads that generate positive ROI. No exceptions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Advanced Tracking</h4>
                                        <p className="text-green-100">
                                            We track every rupee to sale, not just clicks or impressions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Continuous Optimization</h4>
                                        <p className="text-green-100">
                                            Daily monitoring and weekly optimization of all campaigns.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-white/10 rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">5.7X</div>
                                    <div className="text-green-200">Average ROI for Our Clients</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Our <span className="text-green-600">Performance Marketing</span> Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-6`}>
                                    <div className="text-white">
                                        {service.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>

                                <ul className="space-y-2 mb-6">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-gray-700 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
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
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span className="font-medium">CASE STUDY</span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                                    Real Estate Builder in Noida Extension
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <div className="text-sm text-green-200 mb-1">Before Working With Us</div>
                                        <div className="text-2xl font-bold">₹2L/month Ad Spend</div>
                                        <div className="text-green-200">With No Measurable Sales</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-green-200 mb-1">After Optimization</div>
                                        <div className="text-2xl font-bold">₹2.3 Crore</div>
                                        <div className="text-green-200">in Property Sales Generated</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-green-200 mb-1">ROI Achieved</div>
                                        <div className="text-2xl font-bold">5.7X</div>
                                        <div className="text-green-200">Return on Ad Spend</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-4">The Strategy That Worked</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/20 p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span>Identified exact buyer personas for premium apartments</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/20 p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span>Created property-specific landing pages with virtual tours</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/20 p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span>Implemented retargeting for website visitors</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/20 p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span>Tracked phone calls and form submissions to source</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Make Your Ads <span className="text-yellow-300">Actually Profitable</span>?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Get your FREE Ad Account Audit. We'll show you exactly where your money is being wasted and how to fix it.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-white text-green-700 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 text-lg"
                        >
                            Get FREE Ad Audit
                            <Target size={20} />
                        </a>
                        <a
                            href="tel:+911234567890"
                            className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-lg border border-white/30 transition-colors"
                        >
                            Speak With Ads Specialist
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}