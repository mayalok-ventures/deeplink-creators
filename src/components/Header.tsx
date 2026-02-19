'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const [servicesOpen, setServicesOpen] = useState(false)

    const serviceSubItems = [
        { label: 'Industrial SEO', href: '/services/industrial-seo' },
        { label: 'Performance Marketing', href: '/services/performance-marketing' },
        { label: 'Brand Psychology', href: '/services/brand-psychology' },
        { label: 'AI Marketing Automation', href: '/services/ai-marketing-automation' },
        { label: 'Social Commerce', href: '/services/social-commerce' },
        { label: 'Conversion Web Design', href: '/services/conversion-web-design' },
        { label: 'Custom SaaS Development', href: '/services/custom-saas-development' },
    ]

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Insights', href: '/results' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ]

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-dark/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/[0.05]'
                    : 'bg-dark/95 backdrop-blur-sm'
            }`}
        >
            <div className="h-[2px] bg-gradient-to-r from-primary-500 via-accent to-primary-500" />

            <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/images/logo.svg"
                            alt="Deeplink Creators Logo"
                            className="h-10 w-10"
                        />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold font-heading">
                                <span className="bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">
                                    Deeplink
                                </span>{' '}
                                <span className="text-heading">Creators</span>
                            </span>
                            <span className="text-xs text-gold tracking-wide">
                                A Unit of Mayalok Venture
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-paragraph hover:text-primary-400 font-medium transition-colors relative group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
                        </Link>

                        {/* Services Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <Link
                                href="/services"
                                className="text-paragraph hover:text-primary-400 font-medium transition-colors relative group flex items-center gap-1"
                            >
                                Services
                                <svg className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
                            </Link>

                            <AnimatePresence>
                                {servicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 w-64 bg-dark-200/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden z-50"
                                    >
                                        <div className="py-2">
                                            {serviceSubItems.map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    className="block px-5 py-2.5 text-sm text-paragraph hover:text-primary-400 hover:bg-white/[0.05] transition-colors"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                            <div className="border-t border-white/[0.06] mt-1 pt-1">
                                                <Link
                                                    href="/services"
                                                    className="block px-5 py-2.5 text-sm font-semibold text-primary-400 hover:bg-white/[0.05] transition-colors"
                                                >
                                                    View All Services →
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {[
                            { label: 'Insights', href: '/results' },
                            { label: 'About', href: '/about' },
                            { label: 'Contact', href: '/contact' },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-paragraph hover:text-primary-400 font-medium transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}

                        <Link
                            href="/contact"
                            className="btn-primary flex items-center gap-2"
                        >
                            <Phone size={18} />
                            <span className="relative flex items-center gap-2">
                                Get Your ROI Audit
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                                </span>
                            </span>
                        </Link>
                    </nav>

                    <button
                        className="md:hidden text-heading"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col space-y-4 pt-4 pb-4 border-t border-white/[0.08] mt-4">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0 }}
                                >
                                    <Link
                                        href="/"
                                        className="text-paragraph hover:text-primary-400 font-medium py-2 block"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                </motion.div>

                                {/* Mobile Services Accordion */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.05 }}
                                >
                                    <button
                                        onClick={() => setServicesOpen(!servicesOpen)}
                                        className="text-paragraph hover:text-primary-400 font-medium py-2 w-full text-left flex items-center justify-between"
                                    >
                                        Services
                                        <svg className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    <AnimatePresence>
                                        {servicesOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden pl-4 border-l border-white/[0.08]"
                                            >
                                                {serviceSubItems.map((sub) => (
                                                    <Link
                                                        key={sub.href}
                                                        href={sub.href}
                                                        className="block py-2 text-sm text-paragraph hover:text-primary-400 transition-colors"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                                <Link
                                                    href="/services"
                                                    className="block py-2 text-sm font-semibold text-primary-400"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    View All Services →
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {[
                                    { label: 'Insights', href: '/results' },
                                    { label: 'About', href: '/about' },
                                    { label: 'Contact', href: '/contact' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: (i + 2) * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="text-paragraph hover:text-primary-400 font-medium py-2 block"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: navItems.length * 0.05 }}
                                >
                                    <Link
                                        href="/contact"
                                        className="btn-primary inline-flex items-center justify-center gap-2 mt-2"
                                    >
                                        <Phone size={18} />
                                        <span className="relative flex items-center gap-2">
                                            Get Your ROI Audit
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                                            </span>
                                        </span>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}

export default Header
