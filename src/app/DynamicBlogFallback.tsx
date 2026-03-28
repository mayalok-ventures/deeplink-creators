'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getBlogBySlug, type BlogPost } from '@/lib/firestore'
import BlogPostContent from './blog/[slug]/BlogPostContent'

function formatDate(timestamp: any): string {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

function renderContent(content: string): string {
    if (content.startsWith('<') || content.includes('</')) {
        return content
    }
    let html = content
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-heading mt-8 mb-3">$1</h3>')
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-heading mt-10 mb-4">$1</h2>')
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-heading mt-10 mb-4">$1</h1>')
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-heading font-semibold">$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#C39A2B] hover:text-[#A9791B] underline" target="_blank" rel="noopener">$1</a>')
    html = html.replace(/^- (.*$)/gm, '<li class="ml-4 list-disc text-paragraph">$1</li>')
    html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="space-y-2 my-4">$&</ul>')
    html = html.replace(/^(?!<[hulo])(.*\S.*)$/gm, '<p class="text-paragraph leading-relaxed mb-4">$1</p>')
    html = html.replace(/\n{2,}/g, '')
    return html
}

function NotFoundUI() {
    return (
        <section className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 text-center px-4">
                <h1 className="text-8xl md:text-9xl font-extrabold font-heading bg-gradient-to-r from-[#B87A14] to-[#E0C27A] bg-clip-text text-transparent mb-4">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-heading mb-4">
                    Page Not Found
                </h2>
                <p className="text-paragraph text-lg mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been removed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
                        Go Home
                    </Link>
                    <Link
                        href="/contact"
                        className="bg-[#F4F5F6] border border-[#4A4A4A]/15 text-heading font-semibold py-3 px-6 rounded-lg hover:bg-[#F4F5F6]/80 hover:border-[#C39A2B]/30 transition-all inline-flex items-center justify-center"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    )
}

function LoadingUI() {
    return (
        <section className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#C39A2B]/30 border-t-[#C39A2B] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-paragraph">Loading...</p>
            </div>
        </section>
    )
}

export default function DynamicBlogFallback() {
    const [blog, setBlog] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [isBlogRoute, setIsBlogRoute] = useState(false)
    const [slug, setSlug] = useState('')

    useEffect(() => {
        const path = window.location.pathname
        const match = path.match(/^\/blog\/([^/]+)\/?$/)
        if (!match) {
            setIsBlogRoute(false)
            setLoading(false)
            return
        }

        setIsBlogRoute(true)
        const blogSlug = match[1]
        setSlug(blogSlug)

        getBlogBySlug(blogSlug).then(post => {
            if (post && post.published) {
                setBlog(post)
                document.title = `${post.seoTitle || post.title} | Deeplink Creators`
            }
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    if (!isBlogRoute) return <NotFoundUI />
    if (loading) return <LoadingUI />
    if (!blog) return <NotFoundUI />

    return (
        <>
            <section className="relative pt-32 pb-12 bg-white overflow-hidden">
                <div className="container-custom relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-paragraph hover:text-heading mb-8 transition-colors">
                        <ArrowLeft size={18} /> Back to Blog
                    </Link>

                    <div className="max-w-3xl">
                        {blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {blog.tags.map((tag: string) => (
                                    <span key={tag} className="text-xs bg-[#C39A2B]/10 text-[#C39A2B] px-3 py-1 rounded-full border border-[#C39A2B]/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-heading mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-paragraph">
                            <span className="flex items-center gap-2">
                                {blog.author}
                            </span>
                            <span className="flex items-center gap-2">
                                {formatDate(blog.publishedAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {blog.coverImage && (
                <div className="container-custom relative z-10 -mt-2">
                    <div className="max-w-3xl">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full rounded-2xl border border-[#E8E6E1] object-cover max-h-[400px]"
                        />
                    </div>
                </div>
            )}

            <section className="section-padding bg-[#FAFAF8]">
                <div className="container-custom">
                    <article
                        className="max-w-3xl blog-content"
                        dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
                    />

                    <BlogPostContent
                        shortId={blog.shortId}
                        slug={slug}
                    />
                </div>
            </section>
        </>
    )
}
