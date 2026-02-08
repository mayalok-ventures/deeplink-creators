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

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Results', href: '/results' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ]

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5'
                    : 'bg-white/95 backdrop-blur-sm'
            }`}
        >
            <div className="h-[3px] bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500" />

            <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex flex-col">
                        <span className="text-2xl font-bold">
                            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                                Deeplink
                            </span>{' '}
                            <span className="text-gray-900">Creators</span>
                        </span>
                        <span className="text-xs text-gray-500 tracking-wide">
                            A Unit of Mayalok Venture
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}

                        <a
                            href="/contact"
                            className="btn-primary flex items-center gap-2"
                        >
                            <Phone size={18} />
                            <span className="relative flex items-center gap-2">
                                Get Your ROI Audit
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                </span>
                            </span>
                        </a>
                    </nav>

                    <button
                        className="md:hidden text-gray-700"
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
                            <div className="flex flex-col space-y-4 pt-4 pb-4 border-t mt-4">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="text-gray-700 hover:text-primary-600 font-medium py-2 block"
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
                                    <a
                                        href="/contact"
                                        className="btn-primary inline-flex items-center justify-center gap-2 mt-2"
                                    >
                                        <Phone size={18} />
                                        <span className="relative flex items-center gap-2">
                                            Get Your ROI Audit
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                            </span>
                                        </span>
                                    </a>
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
