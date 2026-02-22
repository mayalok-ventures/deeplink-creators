import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { getAllPublishedBlogs } from '@/lib/firebase-server'
import BlogListClient from './BlogListClient'

function formatDate(timestamp: any): string {
    if (!timestamp) return ''
    if (timestamp.toDate) return timestamp.toDate().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    if (timestamp.seconds) return new Date(timestamp.seconds * 1000).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    return new Date(timestamp).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPage() {
    const allBlogs = await getAllPublishedBlogs()

    const blogs = allBlogs
        .sort((a, b) => {
            const aTime = a.publishedAt?.seconds ?? a.publishedAt?.toMillis?.() ?? 0
            const bTime = b.publishedAt?.seconds ?? b.publishedAt?.toMillis?.() ?? 0
            return bTime - aTime
        })
        .map(blog => ({
            slug: blog.slug,
            title: blog.title,
            excerpt: blog.excerpt,
            coverImage: blog.coverImage,
            author: blog.author,
            tags: blog.tags || [],
            publishedAt: formatDate(blog.publishedAt),
        }))

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-white dark:bg-[#0F1112] overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <img src="/images/hero/hero-blog.webp" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white dark:from-[#0F1112]/50 dark:via-[#0F1112]/80 dark:to-[#0F1112]" />
                </div>
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#C39A2B]/8 rounded-full blur-3xl"></div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-heading mb-6">
                            <span className="text-[#C39A2B]">Insights & Strategies</span>
                        </h1>
                        <p className="text-lg text-paragraph mb-8">
                            Digital marketing insights, SEO strategies, and actionable growth frameworks for businesses across India.
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    {blogs.length === 0 ? (
                        <div className="glass-card rounded-2xl p-12 text-center max-w-2xl mx-auto">
                            <div className="w-16 h-16 bg-[#C39A2B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="text-[#C39A2B]" size={32} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-heading mb-4">
                                Blog Posts Coming Soon
                            </h3>
                            <p className="text-lg text-paragraph">
                                We are preparing insightful articles about enterprise SEO, performance marketing, Google Ads strategies, and lead generation for businesses across India. Check back soon.
                            </p>
                        </div>
                    ) : (
                        <BlogListClient initialBlogs={blogs} />
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="relative section-padding bg-[#0F1112] text-white">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-6">
                        Ready to See <span className="text-[#C39A2B]">Growth</span> for Your Business?
                    </h2>
                    <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                        Whether you need enterprise SEO services, PPC management, or a digital marketing strategy for your business — book your FREE Revenue Growth Session today.
                    </p>
                    <Link href="/contact" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4 px-8 text-white">
                        Book Free Growth Session
                        <TrendingUp size={20} />
                    </Link>
                </div>
            </section>
        </>
    )
}
