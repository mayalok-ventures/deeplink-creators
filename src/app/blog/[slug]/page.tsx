import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { getPublishedBlogSlugs, getBlogBySlugServer } from '@/lib/mongodb-server'
import BlogPostContent from './BlogPostContent'
import DynamicBlogFallback from '@/app/DynamicBlogFallback'

export async function generateStaticParams() {
    const slugs = await getPublishedBlogSlugs()
    if (slugs.length === 0) {
        return [{ slug: 'latest' }]
    }
    return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = await getBlogBySlugServer(slug)
    if (!post) return { title: 'Insights & Technical Briefings | Deeplink Creators' }

    const pageTitle = post.seoTitle || `${post.title} | Deeplink Creators`
    const pageDesc = post.seoDescription || post.excerpt || ''
    const pageUrl = `https://deeplinkcreators.com/blog/${slug}/`

    return {
        title: pageTitle,
        description: pageDesc,
        keywords: post.keywords || undefined,
        openGraph: {
            title: pageTitle,
            description: pageDesc,
            url: pageUrl,
            type: 'article',
            images: post.coverImage ? [post.coverImage] : ['/images/hero/hero-blog.webp'],
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDesc,
            images: post.coverImage ? [post.coverImage] : ['/images/hero/hero-blog.webp'],
        },
        alternates: {
            canonical: pageUrl,
        },
    }
}

function formatDate(timestamp: any): string {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function estimateReadTime(text: string): string {
    const wordsPerMinute = 200
    const words = text ? text.split(/\s+/).length : 0
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
    return `${minutes} min read`
}

function renderContent(content: string): string {
    if (content.startsWith('<') || content.includes('</')) {
        return content
    }
    let html = content
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg sm:text-xl font-bold font-heading text-[#181A16] tracking-tight mt-8 mb-3">$1</h3>')
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl sm:text-2xl font-bold font-heading text-[#181A16] tracking-tight mt-10 mb-4">$1</h2>')
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl sm:text-3xl font-bold font-heading text-[#181A16] tracking-tight mt-12 mb-5">$1</h1>')
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#181A16] font-semibold">$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em class="text-[#9B7545]">$1</em>')
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#9B7545] hover:text-[#181A16] underline underline-offset-4 font-medium transition-colors" target="_blank" rel="noopener">$1</a>')
    html = html.replace(/^- (.*$)/gm, '<li class="ml-4 list-disc text-[#65675F] my-1">$1</li>')
    html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="space-y-1.5 my-5 pl-2">$&</ul>')
    html = html.replace(/^(?!<[hulo])(.*\S.*)$/gm, '<p class="text-[#181A16] text-base sm:text-lg leading-relaxed sm:leading-8 mb-5 font-normal">$1</p>')
    html = html.replace(/\n{2,}/g, '')

    // Auto-link key enterprise software & distribution terms (first occurrence only, case-insensitive)
    const keywordLinks: Array<{ pattern: RegExp; href: string; label: string }> = [
        { pattern: /\bB2B SaaS engineering\b/i, href: '/services/', label: 'B2B SaaS engineering' },
        { pattern: /\bSahyak CRM\b/i, href: '/services/#sahyak-crm', label: 'Sahyak CRM' },
        { pattern: /\bcreator-led distribution\b/i, href: '/services/', label: 'creator-led distribution' },
        { pattern: /\brevenue systems\b/i, href: '/services/', label: 'revenue systems' },
        { pattern: /\benterprise systems advisory\b/i, href: '/services/', label: 'enterprise systems advisory' },
        { pattern: /\bmulti-tenant architecture\b/i, href: '/services/', label: 'multi-tenant architecture' },
    ]
    for (const { pattern, href, label } of keywordLinks) {
        let linked = false
        html = html.replace(pattern, (match) => {
            if (linked) return match
            linked = true
            return `<a href="${href}" class="text-[#9B7545] hover:text-[#181A16] underline underline-offset-4 font-medium transition-colors" rel="noopener">${label}</a>`
        })
    }

    return html
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getBlogBySlugServer(slug)

    if (!post) {
        return <DynamicBlogFallback />
    }

    const pageUrl = `https://deeplinkcreators.com/blog/${slug}/`
    const publishedDate = post.publishedAt?.toDate
        ? post.publishedAt.toDate().toISOString()
        : post.publishedAt?.seconds
            ? new Date(post.publishedAt.seconds * 1000).toISOString()
            : new Date().toISOString()
    const modifiedDate = post.updatedAt?.toDate
        ? post.updatedAt.toDate().toISOString()
        : post.updatedAt?.seconds
            ? new Date(post.updatedAt.seconds * 1000).toISOString()
            : publishedDate

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.seoTitle || post.title,
        "description": post.seoDescription || post.excerpt,
        "image": post.coverImage || "https://deeplinkcreators.com/images/hero/hero-blog.webp",
        "author": {
            "@type": "Organization",
            "name": post.author || "Deeplink Creators",
            "url": "https://deeplinkcreators.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Deeplink Creators",
            "url": "https://deeplinkcreators.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://deeplinkcreators.com/images/logo.svg"
            }
        },
        "datePublished": publishedDate,
        "dateModified": modifiedDate,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
        },
        "keywords": post.keywords || post.tags?.join(', ') || ''
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://deeplinkcreators.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Insights & Briefings",
                "item": "https://deeplinkcreators.com/blog/"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": pageUrl
            }
        ]
    }

    const readTime = estimateReadTime(post.content || post.excerpt || '')

    return (
        <div className="bg-[#F3F0E8] text-[#181A16] min-h-screen selection:bg-[#9B7545]/20 selection:text-[#181A16] relative overflow-x-hidden font-sans">
            {/* Structured Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Subtle Architectural Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#181A1608_1px,transparent_1px),linear-gradient(to_bottom,#181A1608_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════════
                1. ARTICLE HERO & METADATA
            ══════════════════════════════════════════════════════════════ */}
            <header className="relative pt-12 sm:pt-16 md:pt-20 pb-8 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
                {/* Back to Briefings Navigation */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#65675F] hover:text-[#181A16] mb-6 sm:mb-8 transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Insights &amp; Briefings</span>
                </Link>

                {/* Category & Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {post.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="text-[11px] font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E6E2D7] text-[#181A16] border border-[#181A16]/10 shadow-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Article Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#181A16] tracking-tight leading-[1.15] mb-6">
                    {post.title}
                </h1>

                {/* Excerpt if present */}
                {post.excerpt && (
                    <p className="text-base sm:text-lg text-[#65675F] leading-relaxed mb-6 font-normal">
                        {post.excerpt}
                    </p>
                )}

                {/* Editorial Metadata Bar */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-4 border-y border-[#181A16]/10 text-xs sm:text-sm font-mono text-[#65675F]">
                    <div className="flex items-center gap-2">
                        <User size={14} className="text-[#9B7545]" />
                        <span>{post.author || 'Deeplink Creators Research'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#9B7545]" />
                        <time dateTime={publishedDate}>
                            {formatDate(post.publishedAt) || 'Published'}
                        </time>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#9B7545]" />
                        <span>{readTime}</span>
                    </div>

                    <div className="ml-auto hidden sm:flex items-center gap-1.5 text-[#9B7545] text-xs font-semibold">
                        <ShieldCheck size={13} />
                        <span>Institutional Briefing</span>
                    </div>
                </div>
            </header>

            {/* ══════════════════════════════════════════════════════════════
                2. FEATURED IMAGE (Responsive & Contained)
            ══════════════════════════════════════════════════════════════ */}
            <div className="px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10 mb-8 sm:mb-12">
                <div className="relative rounded-2xl border border-[#181A16]/10 overflow-hidden shadow-lg bg-[#E6E2D7] max-h-[440px]">
                    <img
                        src={post.coverImage || '/images/hero/hero-blog.webp'}
                        alt={post.title}
                        className="w-full h-full object-cover max-h-[440px]"
                    />
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                3. ARTICLE CONTENT (Light Editorial Surface & TipTap Styling)
            ══════════════════════════════════════════════════════════════ */}
            <main className="px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10 pb-16">
                <div className="rounded-2xl sm:rounded-3xl border border-[#181A16]/10 bg-white p-6 sm:p-10 md:p-14 shadow-sm">
                    <article className="prose max-w-none prose-headings:font-heading prose-headings:text-[#181A16] prose-p:text-[#181A16] prose-p:leading-relaxed prose-strong:text-[#181A16] prose-a:text-[#9B7545] hover:prose-a:text-[#181A16] prose-li:text-[#65675F]">
                        {post.content ? (
                            <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />
                        ) : null}
                    </article>
                    <BlogPostContent shortId={post.shortId || post.slug} slug={post.slug} />
                </div>
            </main>

            {/* ══════════════════════════════════════════════════════════════
                4. INSTITUTIONAL CALLOUT & NEXT STEPS
            ══════════════════════════════════════════════════════════════ */}
            <section className="px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10 pb-20 border-t border-[#181A16]/10 pt-12">
                <div className="rounded-2xl border border-[#181A16]/10 bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-1.5 max-w-lg">
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9B7545] uppercase font-bold">
                            <Sparkles size={13} />
                            <span>Software &amp; Distribution Architecture</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#181A16]">
                            Configure your enterprise operating systems.
                        </h3>
                        <p className="text-xs sm:text-sm text-[#65675F] leading-relaxed">
                            Discuss custom B2B SaaS engineering, 30-day Sahyak CRM deployment, or creator distribution networks.
                        </p>
                    </div>

                    <Link
                        href="/contact"
                        className="tactile-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#181A16] text-[#F3F0E8] font-heading font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:bg-[#252720] active:scale-[0.98] transition-all flex-shrink-0"
                    >
                        <span>Initiate Enterprise Briefing</span>
                        <ArrowRight size={15} className="text-[#D4B270]" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
