'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
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
        { label: 'Offerings', href: '/services/' },
        { label: 'Sahyak CRM ↗', href: 'https://sahyak.com', isExternal: true },
        { label: 'Insights', href: '/blog/' },
        { label: 'About', href: '/about/' },
    ]

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#F3F0E8]/95 backdrop-blur-xl shadow-sm border-b border-[#181A16]/10'
                    : 'bg-[#F3F0E8]/85 backdrop-blur-md border-b border-[#181A16]/05'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
                <div className="flex justify-between items-center">
                    {/* Brand Logo & Mayalok Holding Tag */}
                    <div className="flex items-center gap-3.5">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                                <Image
                                    src="/images/logo.svg"
                                    alt="Deeplink Creators Logo"
                                    fill
                                    priority
                                    sizes="40px"
                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <span className="flex flex-col">
                                <span className="text-lg sm:text-xl font-bold font-heading text-[#181A16] tracking-tight leading-tight">
                                    Deeplink <span className="text-[#9B7545]">Creators</span>
                                </span>
                            </span>
                        </Link>
                        <a
                            href="https://mayalokventures.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-block text-[11px] font-mono font-medium tracking-wider uppercase text-[#65675F] hover:text-[#9B7545] transition-colors border-l border-[#181A16]/15 pl-3.5 ml-1"
                        >
                            Mayalok Venture ↗
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8 text-xs sm:text-sm font-heading font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className={`transition-colors py-1 relative ${
                                    item.isExternal
                                        ? 'text-[#9B7545] hover:text-[#181A16] flex items-center gap-1 font-semibold'
                                        : 'text-[#65675F] hover:text-[#181A16] underline-draw'
                                }`}
                            >
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Action Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            href="/contact/"
                            className="tactile-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#181A16] text-[#F3F0E8] font-heading font-semibold text-xs tracking-wider uppercase hover:bg-[#252720] active:scale-[0.98] transition-all min-h-[40px] shadow-sm"
                        >
                            <span>Schedule Briefing</span>
                            <ArrowRight size={14} className="text-[#D4B270]" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2.5 rounded-xl bg-white border border-[#181A16]/10 text-[#181A16] hover:text-[#9B7545] focus:outline-none transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="md:hidden border-t border-[#181A16]/10 bg-[#F3F0E8]/98 backdrop-blur-2xl px-5 py-6 space-y-4 shadow-xl"
                    >
                        <div className="flex flex-col space-y-3 font-heading">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                                        item.isExternal
                                            ? 'text-[#9B7545] bg-[#9B7545]/10 border border-[#9B7545]/20 flex items-center justify-between'
                                            : 'text-[#181A16] hover:text-[#9B7545] hover:bg-[#E6E2D7]/50'
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    {item.isExternal && <ExternalLink size={14} />}
                                </Link>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-[#181A16]/10 space-y-3">
                            <Link
                                href="/contact/"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#181A16] text-[#F3F0E8] font-heading font-bold text-sm tracking-wide shadow-md"
                            >
                                <span>Schedule Briefing</span>
                                <ArrowRight size={16} className="text-[#D4B270]" />
                            </Link>

                            <a
                                href="https://mayalokventures.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-center text-xs font-mono text-[#65675F] hover:text-[#9B7545] py-2"
                            >
                                Venture Vision: Mayalok Venture ↗
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header