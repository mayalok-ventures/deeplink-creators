'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram, ArrowUp } from 'lucide-react'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative bg-gray-900 text-white overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" />

            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            <div className="relative">
                <div className="container-custom py-10">
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-gray-700/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold mb-1">
                                    Get Growth Tips Delivered Weekly
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    No spam. Only actionable marketing insights for your business.
                                </p>
                            </div>
                            <form
                                onSubmit={handleSubscribe}
                                className="flex w-full md:w-auto gap-3"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-gray-900/80 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                                >
                                    {subscribed ? 'Subscribed!' : 'Subscribe'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="container-custom pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                        <div className="md:col-span-5">
                            <div className="mb-5">
                                <span className="text-2xl font-extrabold bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 bg-clip-text text-transparent">
                                    Deeplink Creators
                                </span>
                                <span className="block text-xs tracking-widest uppercase text-gray-500 mt-1">
                                    A Unit of Mayalok Venture
                                </span>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                                We combine Data Science with Human Psychology to build revenue machines for businesses.
                                No vanity metrics, only real results.
                            </p>

                            <div className="flex items-start gap-3">
                                <MapPin className="text-primary-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-semibold">
                                        <span className="text-primary-400">Greater Noida</span> Office
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        Sector Alpha 1, Greater Noida,<br />
                                        Uttar Pradesh 201310
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5 after:block after:w-8 after:h-0.5 after:bg-primary-500 after:mt-2">
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { href: '/services/seo-greater-noida', label: 'SEO Services' },
                                    { href: '/services/performance-marketing', label: 'Performance Marketing' },
                                    { href: '/results', label: 'Case Studies' },
                                    { href: '/about', label: 'Our Neuro-Marketing Approach' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5 after:block after:w-8 after:h-0.5 after:bg-primary-500 after:mt-2">
                                Get In Touch
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href="tel:+911234567890"
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                                >
                                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 group-hover:bg-primary-500/20 transition-colors">
                                        <Phone size={16} />
                                    </span>
                                    +91 123 456 7890
                                </a>
                                <a
                                    href="mailto:growth@deeplinkcreators.com"
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                                >
                                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 group-hover:bg-primary-500/20 transition-colors">
                                        <Mail size={16} />
                                    </span>
                                    growth@deeplinkcreators.com
                                </a>
                            </div>

                            <div className="flex gap-3 mt-6">
                                {[
                                    { icon: Facebook, href: '#', label: 'Facebook' },
                                    { icon: Linkedin, href: '#', label: 'LinkedIn' },
                                    { icon: Instagram, href: '#', label: 'Instagram' },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 text-gray-400 hover:bg-primary-500 hover:text-white hover:scale-110 transition-all duration-200"
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800">
                    <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} Deeplink Creators. A Unit of Mayalok Venture. All rights reserved.</p>
                        <p>
                            Serving{' '}
                            <span className="font-semibold text-primary-400">Greater Noida</span>{' '}
                            businesses since 2023
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:scale-110 transition-all duration-200"
            >
                <ArrowUp size={20} />
            </button>
        </footer>
    )
}

export default Footer
