import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPublishedBlogSlugs, getBlogBySlugServer } from '@/lib/firebase-server'
import BlogPostContent from './BlogPostContent'

export async function generateStaticParams() {
    const slugs = await getPublishedBlogSlugs()
    return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = await getBlogBySlugServer(slug)
    if (!post) return { title: 'Post Not Found' }

    const pageTitle = post.seoTitle || post.title
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
            images: post.coverImage ? [post.coverImage] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDesc,
            images: post.coverImage ? [post.coverImage] : undefined,
        },
        alternates: {
            canonical: pageUrl,
        },
    }
}

function formatDate(timestamp: any): string {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp)
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getBlogBySlugServer(slug)

    if (!post) {
        notFound()
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
        "image": post.coverImage || undefined,
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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            <section className="relative pt-32 pb-12 bg-white dark:bg-[#0F1112] overflow-hidden">
                <div className="absolute inset-0 grid-bg"></div>
                <div className="container-custom relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-paragraph hover:text-heading mb-8 transition-colors">
                        <ArrowLeft size={18} /> Back to Blog
                    </Link>

                    <div className="max-w-3xl">
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag: string) => (
                                    <span key={tag} className="text-xs bg-[#C39A2B]/10 text-[#C39A2B] px-3 py-1 rounded-full border border-[#C39A2B]/20">
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
                                {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                {formatDate(post.publishedAt)}
                            </span>
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
                            className="w-full rounded-2xl border border-[#4A4A4A]/10 dark:border-white/[0.08] object-cover max-h-[400px]"
                        />
                    </div>
                </div>
            )}

            <section className="section-padding bg-[#F4F5F6] dark:bg-[#131415]">
                <div className="container-custom">
                    <article
                        className="max-w-3xl blog-content"
                        dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
                    />

                    <BlogPostContent
                        shortId={post.shortId}
                        slug={slug}
                    />
                </div>
            </section>
        </>
    )
}
