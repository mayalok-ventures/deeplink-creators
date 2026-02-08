import type { Metadata } from 'next'
import { Target, Users, TrendingUp, Award, Globe, Shield } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Branding Services | Build Authority & Command Premium Prices | Deeplink Creators',
    description: 'Stop competing on price. Build a brand that customers choose without hesitation. Brand strategy, content authority, and visual identity for Greater Noida businesses.',
}

export default function BrandingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Branding That <span className="text-purple-600">Commands Premium Prices</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Stop competing on price. Build a brand that customers choose without hesitation and pay more for.
                        </p>
                        <a
                            href="/contact"
                            className="btn-secondary inline-flex items-center gap-2 text-lg"
                        >
                            Get Brand Audit
                            <Award size={20} />
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
                                Are You Stuck in the <span className="text-red-600">Commodity Trap</span>?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Most businesses in Greater Noida compete on price because they haven't built a distinctive brand.
                                When you're just another option, customers buy based on who's cheapest.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-500 mt-1">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Price-Based Competition</h4>
                                        <p className="text-gray-700">Constantly undercut by competitors with lower prices</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-500 mt-1">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">No Customer Loyalty</h4>
                                        <p className="text-gray-700">Customers leave for minor price differences</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-500 mt-1">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Low Profit Margins</h4>
                                        <p className="text-gray-700">Can't charge premium prices for your expertise</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-6">Our Brand Authority Approach</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Authority Positioning</h4>
                                        <p className="text-purple-100">
                                            We position you as the expert that customers trust automatically.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Storytelling & Narrative</h4>
                                        <p className="text-purple-100">
                                            We craft a compelling brand story that creates emotional connections.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Premium Perception</h4>
                                        <p className="text-purple-100">
                                            We build brands that can command 20-50% higher prices.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-white/10 rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">42%</div>
                                    <div className="text-purple-200">Average Price Premium for Our Branded Clients</div>
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
                            Our <span className="text-purple-600">Brand Authority</span> Framework
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A complete system to transform your business from a commodity to a category leader
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Brand Strategy & Positioning",
                                description: "Define your unique space in the market",
                                features: [
                                    "Competitive Analysis",
                                    "Unique Value Proposition",
                                    "Brand Positioning Statement",
                                    "Target Audience Profiling"
                                ],
                                icon: <Target size={24} />,
                                color: "from-purple-500 to-purple-600"
                            },
                            {
                                title: "Content Authority System",
                                description: "Become the go-to expert in your industry",
                                features: [
                                    "Thought Leadership Content",
                                    "Industry Research & Reports",
                                    "Expert Positioning",
                                    "Media Outreach Strategy"
                                ],
                                icon: <Award size={24} />,
                                color: "from-pink-500 to-pink-600"
                            },
                            {
                                title: "Visual Identity & Design",
                                description: "Professional design that communicates excellence",
                                features: [
                                    "Logo & Visual Identity",
                                    "Brand Guidelines",
                                    "Website Design",
                                    "Marketing Collateral"
                                ],
                                icon: <Globe size={24} />,
                                color: "from-indigo-500 to-indigo-600"
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
                                    className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700"
                                >
                                    Build Your Brand
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
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span className="font-medium">CASE STUDY</span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                                    Manufacturing Company Becomes Industry Authority
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <div className="text-sm text-purple-200 mb-1">Before Branding</div>
                                        <div className="text-2xl font-bold">Commodity Supplier</div>
                                        <div className="text-purple-200">Competing only on price</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-purple-200 mb-1">After 6 Months</div>
                                        <div className="text-2xl font-bold">Industry Authority</div>
                                        <div className="text-purple-200">Featured in trade publications</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-purple-200 mb-1">Price Premium</div>
                                        <div className="text-2xl font-bold">35% Higher</div>
                                        <div className="text-purple-200">Than competitors for same products</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-4">The Brand Transformation</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/20 p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span>Positioned as "Innovation Leaders" instead of "Equipment Suppliers"</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/20 p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span>Created industry research reports on manufacturing trends</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/20 p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span>CEO featured as expert speaker at industry conferences</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/20 p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span>Developed premium packaging and client experience</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Become the <span className="text-yellow-300">Authority</span> in Your Industry?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Get your FREE Brand Audit. We'll show you exactly how to escape the commodity trap and command premium prices.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-white text-purple-700 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 text-lg"
                        >
                            Get FREE Brand Audit
                            <Award size={20} />
                        </a>
                        <a
                            href="tel:+911234567890"
                            className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-lg border border-white/30 transition-colors"
                        >
                            Speak With Brand Strategist
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}