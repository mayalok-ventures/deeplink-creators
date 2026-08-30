'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, ArrowUp, ExternalLink } from 'lucide-react'
import { getSiteSettings, getSocialLinks, SiteSettings, SocialLinks } from '@/lib/db-client'

const Footer = () => {
    const [contact, setContact] = useState<SiteSettings | null>(null)
    const [social, setSocial] = useState<SocialLinks | null>(null)

    useEffect(() => {
        const load = () => {
            getSiteSettings().then(setContact).catch(() => {})
            getSocialLinks().then(setSocial).catch(() => {})
        }
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(load)
        } else {
            setTimeout(load, 200)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const displayEmail = contact?.email || 'kunal@deeplinkcreators.com'
    const displayAddress = contact?.address
        ? `${contact.address}, ${contact.city || 'Greater Noida'}, ${contact.state || 'Uttar Pradesh'} ${contact.pincode || '201310'}`
        : 'Alpha 1, Pari Chowk, Greater Noida, Uttar Pradesh 201310'

    return (
        <footer className="relative bg-[#181A16] text-[#F3F0E8] border-t border-[#181A16]/20 overflow-hidden font-sans">
            {/* Top Burnished Brass Rule */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#9B7545]/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-18">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Column 1: Brand & Holding (lg:col-span-4) */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 flex-shrink-0">
                                <Image
                                    src="/images/logo.svg"
                                    alt="Deeplink Creators Logo"
                                    fill
                                    sizes="40px"
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <span className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight block leading-tight">
                                    DEEPLINK <span className="text-[#9B7545]">CREATORS</span>
                                </span>
                                <a
                                    href="https://mayalokventures.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-[11px] font-mono tracking-widest uppercase text-[#D4B270] mt-0.5 hover:text-white transition-colors"
                                >
                                    Backed by Mayalok Venture ↗
                                </a>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-[#AAA99F] leading-relaxed max-w-sm">
                            An AI-first enterprise software holding and venture studio operating under Mayalok Venture. Based in Greater Noida and serving the Delhi NCR capital corridor.
                        </p>
                        <div className="space-y-2 pt-2 text-xs text-[#AAA99F]">
                            <div className="flex items-start gap-2.5">
                                <MapPin size={14} className="text-[#9B7545] flex-shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{displayAddress}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail size={14} className="text-[#9B7545] flex-shrink-0" />
                                <a href={`mailto:${displayEmail}`} className="hover:text-white transition-colors font-mono">
                                    {displayEmail}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Software & Offerings (lg:col-span-3) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4B270]">
                            SOFTWARE ARCHITECTURE
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li>
                                <a
                                    href="https://sahyak.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#F3F0E8] hover:text-[#D4B270] transition-colors inline-flex items-center gap-1.5 font-semibold group"
                                >
                                    <span>Sahyak CRM Platform</span>
                                    <ExternalLink size={12} className="text-[#9B7545] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/services/custom-saas-development/"
                                    className="text-[#AAA99F] hover:text-white transition-colors"
                                >
                                    Custom SaaS Engineering
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/ai-marketing-automation/"
                                    className="text-[#AAA99F] hover:text-white transition-colors"
                                >
                                    AI Marketing Automation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/industrial-seo/"
                                    className="text-[#AAA99F] hover:text-white transition-colors"
                                >
                                    Industrial &amp; Enterprise SEO
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/social-commerce/"
                                    className="text-[#AAA99F] hover:text-white transition-colors"
                                >
                                    Creator-Led Syndication
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/"
                                    className="text-[#D4B270] hover:underline font-mono text-[11px] block pt-1"
                                >
                                    View All 10 Pillars →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Regional Hubs & Case Studies (lg:col-span-3) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4B270]">
                            REGIONAL HUBS &amp; PROOF
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li>
                                <Link href="/testimonials/" className="text-[#AAA99F] hover:text-white transition-colors font-medium">
                                    Case Studies &amp; Endorsements
                                </Link>
                            </li>
                            <li>
                                <Link href="/locations/greater-noida/" className="text-[#AAA99F] hover:text-white transition-colors">
                                    Greater Noida Tech District
                                </Link>
                            </li>
                            <li>
                                <Link href="/locations/noida/" className="text-[#AAA99F] hover:text-white transition-colors">
                                    Noida Enterprise Corridor
                                </Link>
                            </li>
                            <li>
                                <Link href="/locations/delhi/" className="text-[#AAA99F] hover:text-white transition-colors">
                                    Delhi NCR Capital Hub
                                </Link>
                            </li>
                            <li>
                                <Link href="/locations/lucknow/" className="text-[#AAA99F] hover:text-white transition-colors">
                                    Lucknow Regional Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/about/" className="text-[#AAA99F] hover:text-white transition-colors">
                                    About Mayalok Holding
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Institutional & Governance (lg:col-span-2) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4B270]">
                            GOVERNANCE
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li>
                                <Link href="/blog/" className="text-[#AAA99F] hover:text-white transition-colors">
                                    Insights &amp; Briefings
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact/" className="text-[#AAA99F] hover:text-white transition-colors">
                                    Contact &amp; Briefings
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy/" className="text-[#AAA99F] hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms/" className="text-[#AAA99F] hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/disclaimer/" className="text-[#AAA99F] hover:text-white transition-colors">
                                    Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 bg-[#121310]">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#AAA99F]">
                    <p>
                        &copy; 2026 Mayalok Venture &amp; Deeplink Creators. All rights reserved.
                    </p>
                    <p className="text-[11px] font-mono text-[#D4B270]/80">
                        Institutional Software &amp; Creator Distribution.
                    </p>
                </div>
            </div>

            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-[#252720] border border-[#9B7545]/40 text-[#D4B270] hover:bg-[#9B7545] hover:text-white shadow-xl transition-all duration-200"
            >
                <ArrowUp size={18} />
            </button>
        </footer>
    )
}

export default Footer
