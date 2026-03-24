'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Search, X } from 'lucide-react'
import { getPublishedBlogs } from '@/lib/firestore'
import ScrollReveal from '@/components/ScrollReveal'

export interface BlogItem {
    id: string
    slug: string
    title: string
    excerpt: string
    coverImage: string
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

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function BlogListClient({ initialBlogs }: { initialBlogs: BlogItem[] }) {
    const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs)
    const [searchQuery, setSearchQuery] = useState('')

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
                publishedAt: formatDate(blog.publishedAt),
            }))
            if (fresh.length > 0) setBlogs(fresh)
        }).catch(() => {})
    }, [])

    const filteredBlogs = blogs.filter(blog => {
        if (!searchQuery.trim()) return true
        const q = searchQuery.toLowerCase()
        return (
            blog.title.toLowerCase().includes(q) ||
            blog.excerpt.toLowerCase().includes(q) ||
            blog.author.toLowerCase().includes(q) ||
            blog.tags.some(tag => tag.toLowerCase().includes(q))
        )
    })

    return (
        <>
            <div className="relative max-w-xl mx-auto mb-12">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph pointer-events-none" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search articles by title, tag, or author..."
                    className="w-full pl-12 pr-10 py-3 rounded-xl bg-white dark:bg-[#1A1B1C] border border-[#4A4A4A]/15 dark:border-white/[0.08] text-heading dark:text-white placeholder:text-paragraph/60 dark:placeholder:text-white/40 focus:outline-none focus:border-[#C39A2B]/50 focus:ring-1 focus:ring-[#C39A2B]/30 transition-all"
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

            {filteredBlogs.length === 0 && searchQuery ? (
                <div className="glass-card rounded-2xl p-12 text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-[#C39A2B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Search className="text-[#C39A2B]" size={32} />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-heading mb-4">
                        No Results Found
                    </h3>
                    <p className="text-lg text-paragraph mb-6">
                        No articles match &ldquo;{searchQuery}&rdquo;. Try a different search term.
                    </p>
                    <button onClick={() => setSearchQuery('')} className="btn-primary inline-flex items-center gap-2">
                        Clear Search
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog, index) => (
                        <ScrollReveal
                            key={blog.id || blog.slug}
                            delay={Math.min(index % 3, 2) * 100}
                            direction="up"
                            className="group glass-card overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
                        >
                            <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full">
                                {blog.coverImage && (
                                    <div className="relative h-48 overflow-hidden bg-muted">
                                        <img
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        {blog.category && (
                                            <div className="absolute bottom-4 left-4">
                                                <span className="px-3 py-1 bg-[#C39A2B] text-black text-xs font-bold rounded-full uppercase tracking-wider">
                                                    {blog.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-sm text-paragraph mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-[#C39A2B]" />
                                            {blog.publishedAt}
                                        </div>
                                        {blog.readTime && (
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={14} className="text-[#C39A2B]" />
                                                {blog.readTime}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-heading font-bold text-heading mb-3 group-hover:text-[#C39A2B] transition-colors leading-tight">
                                        {blog.title}
                                    </h3>

                                    <p className="text-paragraph text-sm mb-6 flex-1 line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                                        <span className="text-sm font-medium text-heading">
                                            {blog.author}
                                        </span>
                                        <span className="text-[#C39A2B] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                                            Read More <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            )}
        </>
    )
}
