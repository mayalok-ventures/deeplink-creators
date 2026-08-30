'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Search, X, Tag } from 'lucide-react'
import { getPublishedBlogs, BlogPost } from '@/lib/db-client'

export interface BlogItem {
    id: string
    slug: string
    title: string
    excerpt: string
    coverImage?: string
    author: string
    tags: string[]
    category?: string
    readTime?: string
    publishedAt: any
}

function formatDate(timestamp: any): string {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

function estimateReadTime(excerpt: string): string {
    const wordsPerMinute = 200
    const words = excerpt ? excerpt.split(/\s+/).length * 5 : 0
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
    return `${minutes} min read`
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
}

interface BlogListClientProps {
    initialBlogs: BlogItem[]
    allTags: string[]
}

export default function BlogListClient({ initialBlogs, allTags }: BlogListClientProps) {
    const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTag, setActiveTag] = useState<string>('All')

    useEffect(() => {
        getPublishedBlogs().then(data => {
            const fresh: BlogItem[] = data.map(blog => ({
                id: blog.id || blog.slug,
                slug: blog.slug,
                title: blog.title,
                excerpt: blog.excerpt,
                coverImage: blog.coverImage,
                author: blog.author,
                tags: blog.tags || [],
                category: (blog as any).category || '',
                readTime: (blog as any).readTime || estimateReadTime(blog.excerpt || ''),
                publishedAt: formatDate(blog.publishedAt),
            }))
            if (fresh.length > 0) setBlogs(fresh)
        }).catch(() => {})
    }, [])

    const tags = useMemo(() => {
        const dynamicTags = Array.from(new Set(blogs.flatMap(b => b.tags).filter(Boolean)))
        const merged = Array.from(new Set([...allTags, ...dynamicTags]))
        return merged.sort()
    }, [blogs, allTags])

    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesTag = activeTag === 'All' || blog.tags.some(t => t === activeTag)
            if (!searchQuery.trim()) return matchesTag
            const q = searchQuery.toLowerCase()
            const matchesSearch =
                blog.title.toLowerCase().includes(q) ||
                blog.excerpt.toLowerCase().includes(q) ||
                blog.author.toLowerCase().includes(q) ||
                blog.tags.some(tag => tag.toLowerCase().includes(q))
            return matchesTag && matchesSearch
        })
    }, [blogs, searchQuery, activeTag])

    return (
        <>
            {/* Tag Filter Pills */}
            {tags.length > 0 && (
                <div className="-mx-4 px-4 overflow-x-auto flex flex-wrap items-center justify-center gap-2 mb-8">
                    <button
                        onClick={() => setActiveTag('All')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                            activeTag === 'All'
                                ? 'bg-[#C39A2B] text-white border-[#C39A2B] shadow-md shadow-[#C39A2B]/20'
                                : 'bg-white text-paragraph border-[#E8E6E1] hover:border-[#C39A2B]/40 hover:text-[#C39A2B]'
                        }`}
                    >
                        All
                    </button>
                    {tags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(activeTag === tag ? 'All' : tag)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                                activeTag === tag
                                    ? 'bg-[#C39A2B] text-white border-[#C39A2B] shadow-md shadow-[#C39A2B]/20'
                                    : 'bg-white text-paragraph border-[#E8E6E1] hover:border-[#C39A2B]/40 hover:text-[#C39A2B]'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-12">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph pointer-events-none" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search articles by title, tag, or author..."
                    className="w-full pl-12 pr-10 py-3 rounded-xl bg-white border border-[#4A4A4A]/15 text-heading placeholder:text-paragraph/60 focus:outline-none focus:border-[#C39A2B]/50 focus:ring-1 focus:ring-[#C39A2B]/30 transition-all"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-paragraph hover:text-heading transition-colors"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Active filter indicator */}
            {(activeTag !== 'All' || searchQuery) && (
                <div className="flex items-center justify-center gap-2 mb-8 text-sm text-paragraph">
                    <span>
                        Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
                        {activeTag !== 'All' && <> in <strong className="text-[#C39A2B]">{activeTag}</strong></>}
                        {searchQuery && <> matching &ldquo;<strong className="text-heading">{searchQuery}</strong>&rdquo;</>}
                    </span>
                    <button
                        onClick={() => { setActiveTag('All'); setSearchQuery('') }}
                        className="ml-2 text-[#C39A2B] hover:underline font-medium"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {filteredBlogs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-12 text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-[#C39A2B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Search className="text-[#C39A2B]" size={32} />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-heading mb-4">
                        No Results Found
                    </h3>
                    <p className="text-lg text-paragraph mb-6">
                        No articles match your current filters. Try a different search term or category.
                    </p>
                    <button
                        onClick={() => { setActiveTag('All'); setSearchQuery('') }}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={`${activeTag}-${searchQuery}`}
                >
                    {filteredBlogs.map((blog, index) => {
                        const isFeatured = index === 0 && filteredBlogs.length > 2
                        return (
                            <motion.div
                                key={blog.id || blog.slug}
                                variants={cardVariants}
                                className={`group ${isFeatured ? 'md:col-span-2 md:row-span-1' : ''}`}
                            >
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    className={`
                                        flex flex-col h-full bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden
                                        shadow-sm hover:shadow-xl hover:shadow-black/[0.06] md:hover:-translate-y-1 md:hover:scale-[1.01]
                                        transition-all duration-500 ease-out
                                        ${isFeatured ? 'md:flex-row' : ''}
                                    `}
                                >
                                    {blog.coverImage && (
                                        <div className={`relative overflow-hidden bg-muted ${isFeatured ? 'md:w-1/2 h-64 md:h-auto' : 'h-52'}`}>
                                            <img
                                                src={blog.coverImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                            {/* Shimmer overlay on hover */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                                style={{
                                                    background: 'linear-gradient(105deg, transparent 40%, rgba(195,154,43,0.15) 45%, rgba(195,154,43,0.25) 50%, rgba(195,154,43,0.15) 55%, transparent 60%)',
                                                    backgroundSize: '300% 100%',
                                                    animation: 'shimmer 1.8s ease-in-out infinite',
                                                }}
                                            />

                                            {/* Reading time badge */}
                                            {blog.readTime && (
                                                <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {blog.readTime}
                                                </div>
                                            )}

                                            {blog.category && (
                                                <div className="absolute bottom-4 left-4">
                                                    <span className="px-3 py-1 bg-[#C39A2B] text-black text-xs font-bold rounded-full uppercase tracking-wider">
                                                        {blog.category}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className={`p-6 flex-1 flex flex-col ${isFeatured ? 'md:p-8 justify-center' : ''}`}>
                                        {/* Tags */}
                                        {blog.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {blog.tags.slice(0, 3).map(tag => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 bg-[#C39A2B]/8 text-[#C39A2B] text-[11px] font-semibold rounded-md uppercase tracking-wider"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 text-xs text-paragraph mb-3">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={13} className="text-[#C39A2B]" />
                                                {blog.publishedAt}
                                            </div>
                                        </div>

                                        <h3 className={`font-heading font-bold text-heading mb-3 group-hover:text-[#C39A2B] transition-colors duration-300 leading-tight ${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                                            {blog.title}
                                        </h3>

                                        <p className={`text-paragraph mb-6 flex-1 line-clamp-3 ${isFeatured ? 'text-base' : 'text-sm'}`}>
                                            {blog.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E8E6E1]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-[#C39A2B]/10 flex items-center justify-center">
                                                    <User size={14} className="text-[#C39A2B]" />
                                                </div>
                                                <span className="text-sm font-medium text-heading">
                                                    {blog.author}
                                                </span>
                                            </div>
                                            <span className="text-[#C39A2B] font-semibold flex items-center gap-1 group-hover:gap-2.5 transition-all duration-300 text-sm">
                                                Read More <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.div>
            )}
        </>
    )
}
