'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Copy, Check, Share2 } from 'lucide-react'
import { getBlogBySlug, BlogPost } from '@/lib/firestore'

function formatDate(timestamp: any): string {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

function renderMarkdown(content: string): string {
    let html = content
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-heading mt-8 mb-3">$1</h3>')
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-heading mt-10 mb-4">$1</h2>')
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-heading mt-10 mb-4">$1</h1>')
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-heading font-semibold">$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-400 hover:text-primary-300 underline" target="_blank" rel="noopener">$1</a>')
    html = html.replace(/^- (.*$)/gm, '<li class="ml-4 list-disc text-paragraph">$1</li>')
    html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="space-y-2 my-4">$&</ul>')
    html = html.replace(/^(?!<[hulo])(.*\S.*)$/gm, '<p class="text-paragraph leading-relaxed mb-4">$1</p>')
    html = html.replace(/\n{2,}/g, '')
    return html
}

function BlogContent() {
    const searchParams = useSearchParams()
    const slug = searchParams.get('slug')
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!slug) { setNotFound(true); setLoading(false); return }
        getBlogBySlug(slug).then(data => {
            if (data && data.published) {
                setPost(data)
                document.title = `${data.seoTitle || data.title} | Deeplink Creators`
            } else {
                setNotFound(true)
            }
            setLoading(false)
        }).catch(() => { setNotFound(true); setLoading(false) })
    }, [slug])

    const shareUrl = `https://deeplinkcreators.com/blog/post/?slug=${slug}`

    const copyLink = (url: string) => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (notFound || !post) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-heading mb-4">Post Not Found</h1>
                    <p className="text-paragraph mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/results" className="btn-primary inline-flex items-center gap-2">
                        <ArrowLeft size={18} /> Back to Blog
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="relative pt-32 pb-12 bg-dark overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="container-custom relative z-10">
                    <Link href="/results" className="inline-flex items-center gap-2 text-paragraph hover:text-heading mb-8 transition-colors">
                        <ArrowLeft size={18} /> Back to Blog
                    </Link>

                    <div className="max-w-3xl">
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-primary-500/10 text-primary-400 px-3 py-1 rounded-full border border-primary-500/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-heading mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-paragraph">
                            <span className="flex items-center gap-2">
                                <User size={16} /> {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar size={16} /> {formatDate(post.publishedAt)}
                            </span>
                            <button onClick={() => copyLink(shareUrl)} className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
                                {copied ? <Check size={16} /> : <Share2 size={16} />}
                                {copied ? 'Copied!' : 'Share'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {post.coverImage && (
                <div className="container-custom relative z-10 -mt-2">
                    <div className="max-w-3xl">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full rounded-2xl border border-white/[0.08] object-cover max-h-[400px]"
                        />
                    </div>
                </div>
            )}

            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <article
                        className="max-w-3xl"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
                    />

                    <div className="max-w-3xl mt-12 pt-8 border-t border-white/[0.06]">
                        <div className="glass-card rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="font-bold text-heading mb-1">Share this post</p>
                                <p className="text-sm text-paragraph">deeplinkcreators.com/b/?id={post.shortId}</p>
                            </div>
                            <button
                                onClick={() => copyLink(`https://deeplinkcreators.com/b/?id=${post.shortId}`)}
                                className="btn-primary flex items-center gap-2 text-sm"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copied!' : 'Copy Short Link'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default function BlogPostPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <BlogContent />
        </Suspense>
    )
}
