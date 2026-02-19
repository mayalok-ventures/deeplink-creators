'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Search, X } from 'lucide-react'

interface BlogItem {
    slug: string
    title: string
    excerpt: string
    coverImage: string
    author: string
    tags: string[]
    publishedAt: string
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function BlogListClient({ blogs }: { blogs: BlogItem[] }) {
    const [searchQuery, setSearchQuery] = useState('')

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
            <div className="relative max-w-xl mx-auto">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph pointer-events-none" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search articles by title, tag, or author..."
                    className="w-full pl-12 pr-10 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-heading placeholder:text-paragraph/60 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
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

            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    {filteredBlogs.length === 0 && searchQuery ? (
                        <div className="glass-card rounded-2xl p-12 text-center max-w-2xl mx-auto">
                            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Search className="text-primary-400" size={32} />
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
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredBlogs.map(blog => (
                                <motion.div key={blog.slug} variants={cardVariants}>
                                    <Link href={`/blog/${blog.slug}`} className="group block glass-card-hover rounded-2xl overflow-hidden h-full">
                                        {blog.coverImage && (
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={blog.coverImage}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            {blog.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {blog.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-xs bg-primary-500/10 text-primary-400 px-2 py-0.5 rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <h2 className="text-lg font-bold font-heading text-heading mb-2 group-hover:text-primary-400 transition-colors">
                                                {blog.title}
                                            </h2>
                                            <p className="text-paragraph text-sm mb-4 line-clamp-3">
                                                {blog.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-paragraph">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1">
                                                        <User size={12} /> {blog.author}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={12} /> {blog.publishedAt}
                                                    </span>
                                                </div>
                                                <ArrowRight size={14} className="text-primary-400 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </>
    )
}
