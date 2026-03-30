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

function estimateReadTime(excerpt: string): string {
    const wordsPerMinute = 200
    const words = excerpt ? excerpt.split(/\s+/).length * 5 : 0
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
    return `${minutes} min read`
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
            id: blog.slug,
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

    const allTags = Array.from(new Set(blogs.flatMap(b => b.tags).filter(Boolean)))

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-white overflow-hidden">
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <img src="/images/hero/hero-blog.webp" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white" />
                </div>

                {/* Decorative floating dots */}
                <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
                    <span className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-[#C39A2B]/30 animate-[float_6s_ease-in-out_infinite]" />
                    <span className="absolute top-32 right-[15%] w-1.5 h-1.5 rounded-full bg-[#C39A2B]/20 animate-[float_8s_ease-in-out_1s_infinite]" />
                    <span className="absolute top-16 left-[60%] w-1 h-1 rounded-full bg-[#C39A2B]/25 animate-[float_7s_ease-in-out_2s_infinite]" />
                    <span className="absolute bottom-24 left-[25%] w-2.5 h-2.5 rounded-full bg-[#C39A2B]/15 animate-[float_9s_ease-in-out_0.5s_infinite]" />
                    <span className="absolute bottom-16 right-[30%] w-1.5 h-1.5 rounded-full bg-[#C39A2B]/20 animate-[float_7s_ease-in-out_3s_infinite]" />
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-heading mb-4">
                            <span className="text-[#C39A2B]">Insights & Strategies</span>
                        </h1>

                        {/* Animated gold divider */}
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C39A2B]/60" />
                            <span className="w-2 h-2 rounded-full bg-[#C39A2B] animate-pulse" />
                            <span className="h-px w-24 bg-[#C39A2B]/40" />
                            <span className="w-2 h-2 rounded-full bg-[#C39A2B] animate-pulse" />
                            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C39A2B]/60" />
                        </div>

                        <p className="text-lg text-paragraph mb-8">
                            Digital marketing insights, SEO strategies, and actionable growth frameworks for businesses across India.
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section-padding bg-[#FAFAF8]">
                <div className="container-custom">
                    {blogs.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-12 text-center max-w-2xl mx-auto">
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
                        <BlogListClient initialBlogs={blogs} allTags={allTags} />
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="relative section-padding bg-[#0F1112] text-white">
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
