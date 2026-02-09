'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'
import Link from 'next/link'

interface TocItem {
    id: string
    label: string
}

interface LegalPageLayoutProps {
    title: string
    lastUpdated: string
    tocItems: TocItem[]
    children: React.ReactNode
}

export default function LegalPageLayout({ title, lastUpdated, tocItems, children }: LegalPageLayoutProps) {
    const [activeSection, setActiveSection] = useState(tocItems[0]?.id || '')
    const [tocOpen, setTocOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting)
                if (visible.length > 0) {
                    setActiveSection(visible[0].target.id)
                }
            },
            { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
        )

        tocItems.forEach((item) => {
            const el = document.getElementById(item.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [tocItems])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setActiveSection(id)
            setTocOpen(false)
        }
    }

    return (
        <div className="bg-dark min-h-screen pt-8 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 border-b border-white/[0.08] pb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20">
                            <FileText className="text-primary-400" size={20} />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-heading">{title}</h1>
                        </div>
                    </div>
                    <p className="text-sm text-paragraph">
                        Last Updated: <span className="text-gold font-medium">{lastUpdated}</span>
                    </p>
                </div>

                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setTocOpen(!tocOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-dark-50 border border-white/[0.08] text-heading text-sm font-medium"
                    >
                        <span>Table of Contents</span>
                        {tocOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {tocOpen && (
                        <nav className="mt-2 rounded-lg bg-dark-50 border border-white/[0.08] p-4 space-y-1">
                            {tocItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                                        activeSection === item.id
                                            ? 'bg-primary-500/10 text-primary-400 font-medium'
                                            : 'text-paragraph hover:text-heading hover:bg-white/[0.03]'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>

                <div className="lg:flex lg:gap-10">
                    <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                        <nav className="sticky top-24 rounded-lg bg-dark-50 border border-white/[0.08] p-4 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
                            <p className="text-xs font-semibold uppercase tracking-wider text-paragraph/60 mb-3 px-3">
                                On This Page
                            </p>
                            {tocItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                                        activeSection === item.id
                                            ? 'bg-primary-500/10 text-primary-400 font-medium border-l-2 border-primary-400'
                                            : 'text-paragraph hover:text-heading hover:bg-white/[0.03]'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <div ref={contentRef} className="flex-1 min-w-0 max-w-4xl">
                        <div className="prose-legal space-y-10">
                            {children}
                        </div>

                        <div className="mt-16 pt-8 border-t border-white/[0.08]">
                            <div className="flex flex-wrap gap-4 text-sm text-paragraph">
                                <Link href="/terms" className="text-primary-400 hover:text-primary-300 transition-colors">
                                    Terms & Conditions
                                </Link>
                                <span className="text-white/20">|</span>
                                <Link href="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors">
                                    Privacy Policy
                                </Link>
                                <span className="text-white/20">|</span>
                                <Link href="/disclaimer" className="text-primary-400 hover:text-primary-300 transition-colors">
                                    Disclaimer
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
