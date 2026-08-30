'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    Search,
    Clock,
    BookOpen,
    ArrowRight,
    Sparkles,
    Calendar,
    ChevronRight,
    Tag,
    X
} from 'lucide-react'

interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string
    category: string
    coverImage?: string
    readTime?: string
    publishedAt: any
    published: boolean
    tags?: string[]
}

export default function BlogPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTag, setActiveTag] = useState('All')

    // Fetch published blogs from MongoDB API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs', { cache: 'no-store' })
                if (res.ok) {
                    const data = await res.json()
                    setBlogs(data.blogs || [])
                }
            } catch (error) {
                console.error('Error fetching technical briefings:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [])

    // Extract dynamic tags
    const allTags = Array.from(
        new Set(
            blogs.flatMap((blog) =>
                blog.tags && blog.tags.length > 0 ? blog.tags : [blog.category || 'Briefings']
            )
        )
    ).filter(Boolean)

    // Filter by search query and tag
    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch =
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.category?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesTag =
            activeTag === 'All' ||
            blog.category === activeTag ||
            (blog.tags && blog.tags.includes(activeTag))

        return matchesSearch && matchesTag
    })

    return (
        <div className="bg-[#F3F0E8] text-[#181A16] min-h-screen selection:bg-[#9B7545]/20 selection:text-[#181A16] relative overflow-x-hidden font-sans">
            {/* Subtle Architectural Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#181A1608_1px,transparent_1px),linear-gradient(to_bottom,#181A1608_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════════
                SECTION 1 — EDITORIAL PUBLICATION HEADER
            ══════════════════════════════════════════════════════════════ */}
            <header className="relative pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
                <div className="max-w-3xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E2D7] border border-[#181A16]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9B7545] flex-shrink-0" />
                        <span className="marginal-label text-[#181A16] font-bold">
                            TECHNICAL BRIEFINGS &amp; DISPATCHES
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-[#181A16] leading-[1.14]">
                        Insights, Architecture &amp;{' '}
                        <span className="text-brass-gradient">
                            Market Mechanics.
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-[#65675F] leading-relaxed font-normal">
                        Technical briefs, operational analyses, and strategic frameworks on enterprise software holding, multi-tenant SaaS architecture, and creator-led distribution.
                    </p>
                </div>

                {/* Search & Tag Filter Bar */}
                <div className="mt-8 pt-6 border-t border-[#181A16]/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#65675F]"
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search technical briefings..."
                            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#181A16]/12 text-[#181A16] placeholder-[#65675F]/60 text-xs sm:text-sm focus:outline-none focus:border-[#9B7545] focus:ring-1 focus:ring-[#9B7545] transition-colors"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65675F] hover:text-[#181A16]"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Tag Filter Pills */}
                    {allTags.length > 0 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                            <button
                                onClick={() => setActiveTag('All')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                                    activeTag === 'All'
                                        ? 'bg-[#181A16] text-[#F3F0E8] font-bold shadow-sm'
                                        : 'bg-white text-[#65675F] border border-[#181A16]/10 hover:text-[#181A16] hover:bg-[#E6E2D7]'
                                }`}
                            >
                                All Topics ({blogs.length})
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                                        activeTag === tag
                                            ? 'bg-[#181A16] text-[#F3F0E8] font-bold shadow-sm'
                                            : 'bg-white text-[#65675F] border border-[#181A16]/10 hover:text-[#181A16] hover:bg-[#E6E2D7]'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </header>


            {/* ══════════════════════════════════════════════════════════════
                SECTION 2 — JOURNAL ARTICLES GRID (With Time Echo Hover)
            ══════════════════════════════════════════════════════════════ */}
            <main className="relative pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
                {loading ? (
                    /* Loading Skeleton */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="rounded-2xl border border-[#181A16]/10 bg-white p-5 animate-pulse shadow-sm">
                                <div className="h-44 bg-[#E6E2D7] rounded-xl mb-4" />
                                <div className="h-4 bg-[#E6E2D7] rounded w-1/3 mb-3" />
                                <div className="h-6 bg-[#E6E2D7] rounded w-4/5 mb-2" />
                                <div className="h-4 bg-[#E6E2D7] rounded w-full mb-4" />
                                <div className="h-4 bg-[#E6E2D7] rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    /* Editorial Empty State */
                    <div className="rounded-2xl sm:rounded-3xl border border-[#181A16]/10 bg-white p-8 sm:p-12 md:p-16 text-center max-w-2xl mx-auto shadow-sm">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E2D7] border border-[#181A16]/10 text-[#181A16] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase mb-4">
                            <BookOpen size={13} className="text-[#9B7545]" />
                            EDITORIAL DESK
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#181A16] tracking-tight mb-3">
                            Technical briefings are in production.
                        </h2>

                        <p className="text-sm sm:text-base text-[#65675F] leading-relaxed mb-8">
                            We are preparing practical perspectives on enterprise software, creator-powered distribution, and durable operating systems.
                        </p>

                        <Link
                            href="/contact"
                            className="tactile-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#181A16] text-[#F3F0E8] font-heading font-semibold text-xs sm:text-sm shadow-sm hover:bg-[#252720] transition-all min-h-[46px]"
                        >
                            <span>Schedule Enterprise Briefing</span>
                            <ArrowRight size={16} className="text-[#D4B270]" />
                        </Link>
                    </div>
                ) : (
                    /* Content-Rich Briefings Grid with Time Echo Interaction */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredBlogs.map((blog) => (
                            <article
                                key={blog.id}
                                className="rounded-2xl border border-[#181A16]/10 bg-white hover:border-[#9B7545]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-sm editorial-surface-lift"
                            >
                                <div>
                                    {/* Cover Image Frame with Time Echo Layering */}
                                    <div className="time-echo-container relative h-48 sm:h-52 w-full bg-[#E6E2D7] overflow-hidden">
                                        {/* Echo Layer 2 (Deep Trail) */}
                                        <div className="time-echo-layer-echo2">
                                            <Image
                                                src={blog.coverImage || '/images/hero/hero-blog.webp'}
                                                alt={blog.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover object-center"
                                            />
                                        </div>

                                        {/* Echo Layer 1 (Mid Trail) */}
                                        <div className="time-echo-layer-echo1">
                                            <Image
                                                src={blog.coverImage || '/images/hero/hero-blog.webp'}
                                                alt={blog.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover object-center"
                                            />
                                        </div>

                                        {/* Base Layer */}
                                        <div className="time-echo-layer-base relative h-full w-full">
                                            <Image
                                                src={blog.coverImage || '/images/hero/hero-blog.webp'}
                                                alt={blog.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover object-center"
                                            />
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#181A16]/50 via-transparent to-transparent opacity-80 z-[4]" />

                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3 z-[5]">
                                            <span className="text-[10px] font-mono font-bold tracking-widest text-[#F3F0E8] uppercase px-2.5 py-1 rounded bg-[#181A16]/85 backdrop-blur-md border border-white/10">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Body */}
                                    <div className="p-5 sm:p-6">
                                        {/* Meta Bar */}
                                        <div className="flex items-center gap-3 text-[11px] font-mono text-[#65675F] mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} className="text-[#9B7545]" />
                                                {blog.publishedAt
                                                    ? new Date(
                                                          blog.publishedAt?.toDate
                                                              ? blog.publishedAt.toDate()
                                                              : blog.publishedAt
                                                      ).toLocaleDateString('en-US', {
                                                          month: 'short',
                                                          day: 'numeric',
                                                          year: 'numeric',
                                                      })
                                                    : 'Recent'}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} className="text-[#9B7545]" />
                                                {blog.readTime || '5 min read'}
                                            </span>
                                        </div>

                                        {/* Title with Underline Draw */}
                                        <h2 className="text-lg sm:text-xl font-bold font-heading text-[#181A16] group-hover:text-[#9B7545] transition-colors leading-snug mb-2.5 line-clamp-2">
                                            <Link href={`/blog/${blog.slug}`} className="underline-draw">
                                                {blog.title}
                                            </Link>
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed line-clamp-3 mb-4">
                                            {blog.excerpt}
                                        </p>
                                    </div>
                                </div>

                                {/* Card Footer CTA */}
                                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-[#181A16]/08 flex items-center justify-between">
                                    <span className="text-[11px] font-mono text-[#65675F]">Technical Briefing</span>
                                    <Link
                                        href={`/blog/${blog.slug}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold font-heading text-[#9B7545] group-hover:text-[#181A16] transition-colors"
                                    >
                                        <span>Read Briefing</span>
                                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
