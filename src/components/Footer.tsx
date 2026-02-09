'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram, Youtube, ArrowUp } from 'lucide-react'
import { getSiteSettings, getSocialLinks, SiteSettings, SocialLinks } from '@/lib/firestore'

const Footer = () => {
    const [contact, setContact] = useState<SiteSettings | null>(null)
    const [social, setSocial] = useState<SocialLinks | null>(null)

    useEffect(() => {
        getSiteSettings().then(setContact).catch(() => {})
        getSocialLinks().then(setSocial).catch(() => {})
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
    const displayCity = contact?.city || 'Greater Noida'
    const displayAddress = contact?.address
        ? `${contact.address}, ${contact.city || 'Greater Noida'}, ${contact.state || 'UP'} ${contact.pincode || ''}`
        : 'Greater Noida, Uttar Pradesh, India'

    return (
        <footer className="relative bg-dark-600 text-white overflow-hidden">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="absolute inset-0 grid-bg opacity-50" />

            <div className="relative">
                <div className="container-custom py-12 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                        <div className="md:col-span-5">
                            <div className="mb-5">
                                <span className="text-2xl font-extrabold font-heading bg-gradient-to-r from-primary-400 via-accent to-primary-400 bg-clip-text text-transparent">
                                    Deeplink Creators
                                </span>
                                <span className="block text-xs tracking-widest uppercase text-gold mt-1">
                                    A Unit of Mayalok Venture
                                </span>
                            </div>
                            <p className="text-paragraph leading-relaxed mb-6 max-w-md">
                                We combine Data Science with Human Psychology to build revenue machines for businesses.
                                No vanity metrics, only real results.
                            </p>
                            <div className="flex items-start gap-3">
                                <MapPin className="text-primary-400 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-semibold text-heading">
                                        <span className="text-primary-400">{displayCity}</span> Office
                                    </p>
                                    <p className="text-paragraph text-sm">{displayAddress}</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-heading mb-5 after:block after:w-8 after:h-0.5 after:bg-gold after:mt-2">
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { href: '/services/seo-greater-noida', label: 'SEO Services' },
                                    { href: '/services/performance-marketing', label: 'Performance Marketing' },
                                    { href: '/results', label: 'Blog & Results' },
                                    { href: '/about', label: 'About Us' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-paragraph hover:text-primary-400 hover:translate-x-1 transition-all duration-200 inline-block"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-heading mb-5 after:block after:w-8 after:h-0.5 after:bg-gold after:mt-2">
                                Get In Touch
                            </h3>
                            <div className="space-y-4">
                                {contact?.phone ? (
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="flex items-center gap-3 text-paragraph hover:text-heading transition-colors group"
                                    >
                                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] group-hover:border-primary-500/30 group-hover:bg-primary-500/10 transition-colors">
                                            <Phone size={16} />
                                        </span>
                                        {contact.phone}
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-3 text-paragraph">
                                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                                            <Phone size={16} />
                                        </span>
                                        Coming Soon
                                    </div>
                                )}
                                <a
                                    href={`mailto:${displayEmail}`}
                                    className="flex items-center gap-3 text-paragraph hover:text-heading transition-colors group"
                                >
                                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] group-hover:border-primary-500/30 group-hover:bg-primary-500/10 transition-colors">
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
                                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] text-paragraph hover:bg-primary-500/20 hover:border-primary-500/30 hover:text-primary-400 hover:scale-110 transition-all duration-200"
                                        >
                                            <s.icon size={18} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/[0.06]">
                    <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-paragraph/60">
                        <p>&copy; {new Date().getFullYear()} Deeplink Creators. A Unit of Mayalok Venture. All rights reserved.</p>
                        <p>
                            Serving{' '}
                            <span className="font-semibold text-primary-400">{displayCity}</span>{' '}
                            businesses
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-200"
            >
                <ArrowUp size={20} />
            </button>
        </footer>
    )
}

export default Footer
