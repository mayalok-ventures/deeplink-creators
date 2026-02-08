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
            <section className="relative pt-32 pb-20 bg-dark overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-heading mb-6">
                            Branding That <span className="text-purple-400">Commands Premium Prices</span>
                        </h1>
                        <p className="text-xl text-paragraph mb-8">
                            Stop competing on price. Build a brand that customers choose without hesitation and pay more for.
                        </p>
                        <a
                            href="/contact"
                            className="btn-secondary inline-flex items-center gap-2 text-lg text-dark"
                        >
                            Get Brand Audit
                            <Award size={20} />
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
                                Are You Stuck in the <span className="text-red-400">Commodity Trap</span>?
                            </h2>
                            <p className="text-paragraph mb-6">
                                Most businesses in Greater Noida compete on price because they haven't built a distinctive brand.
                                When you're just another option, customers buy based on who's cheapest.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-lg">
                                    <div className="text-red-400 mt-1">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-heading mb-1">Price-Based Competition</h4>
                                        <p className="text-paragraph">Constantly undercut by competitors with lower prices</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-lg">
                                    <div className="text-red-400 mt-1">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-heading mb-1">No Customer Loyalty</h4>
                                        <p className="text-paragraph">Customers leave for minor price differences</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-lg">
                                    <div className="text-red-400 mt-1">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-heading mb-1">Low Profit Margins</h4>
                                        <p className="text-paragraph">Can't charge premium prices for your expertise</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-2xl p-8 text-white border-purple-500/30">
                            <h3 className="text-2xl font-heading font-bold mb-6">Our Brand Authority Approach</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/[0.05] p-3 rounded-lg">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Authority Positioning</h4>
                                        <p className="text-paragraph">
                                            We position you as the expert that customers trust automatically.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/[0.05] p-3 rounded-lg">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Storytelling & Narrative</h4>
                                        <p className="text-paragraph">
                                            We craft a compelling brand story that creates emotional connections.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/[0.05] p-3 rounded-lg">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Premium Perception</h4>
                                        <p className="text-paragraph">
                                            We build brands that can command 20-50% higher prices.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-white/[0.05] rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-400">42%</div>
                                    <div className="text-paragraph">Average Price Premium for Our Branded Clients</div>
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
                            Our <span className="text-purple-400">Brand Authority</span> Framework
                        </h2>
                        <p className="text-xl text-paragraph max-w-3xl mx-auto">
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
                                    className="inline-flex items-center gap-2 text-purple-400 font-semibold hover:text-purple-300"
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
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="glass-card rounded-2xl p-8 md:p-12 text-white border-purple-500/30">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/[0.05] backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span className="font-medium">CASE STUDY</span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                                    Manufacturing Company Becomes Industry Authority
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <div className="text-sm text-paragraph mb-1">Before Branding</div>
                                        <div className="text-2xl font-bold">Commodity Supplier</div>
                                        <div className="text-paragraph">Competing only on price</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-paragraph mb-1">After 6 Months</div>
                                        <div className="text-2xl font-bold text-purple-400">Industry Authority</div>
                                        <div className="text-paragraph">Featured in trade publications</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-paragraph mb-1">Price Premium</div>
                                        <div className="text-2xl font-bold text-purple-400">35% Higher</div>
                                        <div className="text-paragraph">Than competitors for same products</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/[0.05] backdrop-blur-sm rounded-xl p-6">
                                <h4 className="font-heading font-bold text-lg mb-4">The Brand Transformation</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/[0.1] p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        </div>
                                        <span className="text-paragraph">Positioned as "Innovation Leaders" instead of "Equipment Suppliers"</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/[0.1] p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        </div>
                                        <span className="text-paragraph">Created industry research reports on manufacturing trends</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/[0.1] p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        </div>
                                        <span className="text-paragraph">CEO featured as expert speaker at industry conferences</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white/[0.1] p-1 rounded-full mt-1">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        </div>
                                        <span className="text-paragraph">Developed premium packaging and client experience</span>
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
                        Ready to Become the <span className="text-gold">Authority</span> in Your Industry?
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Get your FREE Brand Audit. We'll show you exactly how to escape the commodity trap and command premium prices.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg text-dark py-4 px-8"
                        >
                            Get FREE Brand Audit
                            <Award size={20} />
                        </a>
                        <a
                            href="tel:+911234567890"
                            className="bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold py-4 px-8 rounded-lg border border-white/[0.1] transition-colors"
                        >
                            Speak With Brand Strategist
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
