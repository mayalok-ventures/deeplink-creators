'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react'
import { getPublishedBlogs, BlogPost } from '@/lib/firestore'

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

export default function ResultsPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPublishedBlogs().then(data => {
            setBlogs(data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    return (
        <>
            <section className="relative pt-32 pb-20 bg-dark overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-heading mb-6">
                            <span className="text-primary-400">Insights & Results</span>
                        </h1>
                        <p className="text-xl text-paragraph mb-8">
                            Digital marketing insights, SEO tips, and actionable strategies for businesses in Greater Noida, Noida &amp; Delhi NCR.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="glass-card rounded-2xl p-12 text-center max-w-2xl mx-auto">
                            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="text-primary-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">
                                Blog Posts Coming Soon
                            </h3>
                            <p className="text-lg text-paragraph">
                                We are preparing insightful articles about SEO services, performance marketing, Google Ads tips, and digital marketing strategies for businesses in Greater Noida, Noida &amp; Delhi NCR. Check back soon.
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {blogs.map(blog => (
                                <motion.div key={blog.id} variants={cardVariants}>
                                    <Link href={`/blog/post/?slug=${blog.slug}`} className="group block glass-card-hover rounded-2xl overflow-hidden h-full">
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
                                                        <Calendar size={12} /> {formatDate(blog.publishedAt)}
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

            <section className="relative section-padding bg-dark-200 text-white">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6">
                        Ready to See <span className="text-accent">Results</span> for Your Business?
                    </h2>
                    <p className="text-xl text-paragraph mb-8 max-w-2xl mx-auto">
                        Whether you need SEO services in Greater Noida, PPC management, or a digital marketing strategy for your startup in Delhi NCR — book your FREE Revenue Growth Session today.
                    </p>
                    <a href="/contact" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8 text-dark">
                        Book Free Growth Session
                        <TrendingUp size={20} />
                    </a>
                </div>
            </section>
        </>
    )
}
