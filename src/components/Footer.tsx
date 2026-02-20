'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram, Youtube, ArrowUp } from 'lucide-react'
import { getSiteSettings, getSocialLinks, SiteSettings, SocialLinks } from '@/lib/firestore'
import Link from 'next/link'

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

    const socialIcons = [
        { icon: Facebook, href: social?.facebook, label: 'Facebook' },
        { icon: Instagram, href: social?.instagram, label: 'Instagram' },
        { icon: Linkedin, href: social?.linkedin, label: 'LinkedIn' },
        { icon: Youtube, href: social?.youtube, label: 'YouTube' },
    ].filter(s => s.href)

    const displayEmail = contact?.email || 'growth@deeplinkcreators.com'
    const displayCity = contact?.city || 'India'
    const displayAddress = contact?.address
        ? `${contact.address}, ${contact.city || 'India'}, ${contact.state || ''} ${contact.pincode || ''}`
        : 'India'

    return (
        <footer className="relative bg-[#0F1112] text-white overflow-hidden">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="absolute inset-0 grid-bg opacity-50" />

            <div className="relative">
                <div className="container-custom py-12 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                        <div className="md:col-span-5">
                            <div className="mb-5">
                                <span className="text-2xl font-extrabold font-heading bg-gradient-to-r from-[#B87A14] via-[#E0C27A] to-[#B87A14] bg-clip-text text-transparent">
                                    Deeplink Creators
                                </span>
                                <span className="block text-xs tracking-widest uppercase text-gold mt-1">
                                    A Unit of Mayalok Venture
                                </span>
                            </div>
                            <p className="text-white/60 leading-relaxed mb-6 max-w-md">
                                Best digital marketing company in India. We combine Data Science with Neuro-Marketing to deliver enterprise SEO services, performance marketing, lead generation, Google Ads management, and revenue-focused strategies for businesses across India.
                            </p>
                            <div className="flex items-start gap-3">
                                <MapPin className="text-[#C39A2B] flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-semibold text-white">
                                        <span className="text-[#C39A2B]">{displayCity}</span> Office
                                    </p>
                                    <p className="text-white/60 text-sm">{displayAddress}</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5 after:block after:w-8 after:h-0.5 after:bg-gold after:mt-2">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    { href: '/services/industrial-seo', label: 'Enterprise SEO Services India' },
                                    { href: '/services/performance-marketing', label: 'Performance Marketing & PPC' },
                                    { href: '/services/brand-psychology', label: 'Branding & Identity' },
                                    { href: '/services/ai-marketing-automation', label: 'AI Marketing Automation' },
                                    { href: '/services/social-commerce', label: 'Social Commerce' },
                                    { href: '/services/conversion-web-design', label: 'Conversion Web Design' },
                                    { href: '/services/custom-saas-development', label: 'Custom SaaS Development' },
                                    { href: '/blog', label: 'Blog & Insights' },
                                    { href: '/about', label: 'About Us' },
                                    { href: '/contact', label: 'Contact Us' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/60 hover:text-[#C39A2B] hover:translate-x-1 transition-all duration-200 inline-block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-2">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5 after:block after:w-8 after:h-0.5 after:bg-gold after:mt-2">
                                Locations
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    { href: '/locations/greater-noida', label: 'Greater Noida' },
                                    { href: '/locations/noida', label: 'Noida' },
                                    { href: '/locations/delhi', label: 'Delhi' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/60 hover:text-[#C39A2B] hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                                        >
                                            <MapPin size={12} className="text-[#C39A2B]/60" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-3">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5 after:block after:w-8 after:h-0.5 after:bg-gold after:mt-2">
                                Get In Touch
                            </h3>
                            <div className="space-y-4">
                                {contact?.phone ? (
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                                    >
                                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] group-hover:border-[#C39A2B]/30 group-hover:bg-[#C39A2B]/10 transition-colors">
                                            <Phone size={16} />
                                        </span>
                                        {contact.phone}
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-3 text-white/60">
                                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                                            <Phone size={16} />
                                        </span>
                                        Coming Soon
                                    </div>
                                )}
                                <a
                                    href={`mailto:${displayEmail}`}
                                    className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                                >
                                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] group-hover:border-[#C39A2B]/30 group-hover:bg-[#C39A2B]/10 transition-colors">
                                        <Mail size={16} />
                                    </span>
                                    {displayEmail}
                                </a>
                            </div>

                            {socialIcons.length > 0 && (
                                <div className="flex gap-3 mt-6">
                                    {socialIcons.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.label}
                                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white/60 hover:bg-[#C39A2B]/20 hover:border-[#C39A2B]/30 hover:text-[#C39A2B] hover:scale-110 transition-all duration-200"
                                        >
                                            <s.icon size={18} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/[0.1]">
                    <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
                        <p>&copy; {new Date().getFullYear()} Deeplink Creators. A Unit of Mayalok Venture. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <Link href="/terms" className="hover:text-[#C39A2B] transition-colors">Terms</Link>
                            <span className="text-white/20">|</span>
                            <Link href="/privacy" className="hover:text-[#C39A2B] transition-colors">Privacy</Link>
                            <span className="text-white/20">|</span>
                            <Link href="/disclaimer" className="hover:text-[#C39A2B] transition-colors">Disclaimer</Link>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-[#C39A2B] text-white shadow-lg hover:bg-[#A9791B] hover:scale-110 hover:shadow-[0_0_20px_rgba(195,154,43,0.4)] transition-all duration-200"
            >
                <ArrowUp size={20} />
            </button>
        </footer>
    )
}

export default Footer
