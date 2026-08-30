import { getCollection } from './mongodb'

export interface BlogPostData {
    id?: string
    title: string
    slug: string
    shortId: string
    content: string
    excerpt: string
    coverImage: string
    author: string
    tags: string[]
    published: boolean
    publishedAt: any
    updatedAt: any
    seoTitle: string
    seoDescription: string
    keywords: string
}

const DEFAULT_SERVER_BLOGS: BlogPostData[] = [
    {
        id: 'seed-blog-1',
        title: 'Building Scalable Enterprise Architecture with Next.js & Distributed Systems',
        slug: 'building-scalable-enterprise-architecture-nextjs-mongodb',
        shortId: 'ent9012',
        content: '<p>Modern enterprise web systems demand rigorous architectural separation between presentation, state orchestration, and durable storage layers. When designing platforms for high-throughput institutional applications, every tier must be engineered for fault tolerance and zero-downtime scalability.</p><p>By combining Next.js 14 App Router with edge caching, resilient database abstraction layers, and proactive telemetry, organizations maintain sub-millisecond responsiveness even under extreme concurrent demand.</p>',
        excerpt: 'An architectural deep dive into designing institutional-grade software systems that scale effortlessly across distributed global infrastructure.',
        coverImage: '/images/hero-enterprise-architecture.jpg',
        author: 'Engineering Directorate',
        tags: ['Architecture', 'Next.js', 'MongoDB', 'Enterprise'],
        published: true,
        publishedAt: '2026-03-20T10:00:00Z',
        updatedAt: '2026-03-20T10:00:00Z',
        seoTitle: 'Building Scalable Enterprise Architecture | Deeplink Creators',
        seoDescription: 'Architectural analysis of enterprise web applications and distributed software engineering by Deeplink Creators.',
        keywords: 'Enterprise Architecture, Next.js 14, MongoDB, Distributed Systems, Software Holding',
    },
    {
        id: 'seed-blog-2',
        title: 'Sahyak CRM: Multi-Tenant Architectural Kernel for High-Velocity Teams',
        slug: 'sahyak-crm-multi-tenant-architecture-kernel',
        shortId: 'sah8832',
        content: '<p>Sahyak CRM represents a paradigm shift in relationship management for high-velocity enterprise operations. By combining automated pipeline choreography with instant telemetry, teams unlock unprecedented velocity.</p><p>Our proprietary CRM infrastructure centralizes multi-channel leads, eliminates data fragmentation, and provides executives with actionable conversion visibility.</p>',
        excerpt: 'How our proprietary CRM product solves fragmentation, lead leakage, and coordination overhead for modern teams.',
        coverImage: '/images/sahyak-crm-mockup.jpg',
        author: 'Product Directorate',
        tags: ['Sahyak CRM', 'SaaS', 'Product', 'Automation'],
        published: true,
        publishedAt: '2026-03-24T14:30:00Z',
        updatedAt: '2026-03-24T14:30:00Z',
        seoTitle: 'Sahyak CRM Architecture & Product Overview | Deeplink Creators',
        seoDescription: 'Comprehensive overview of Sahyak CRM proprietary multi-tenant software system built by Deeplink Creators.',
        keywords: 'Sahyak CRM, CRM Software, Multi-Tenant SaaS, Lead Management',
    },
]

export async function getPublishedBlogSlugs(): Promise<{ slug: string; updatedAt?: any }[]> {
    try {
        const collection = await getCollection('blogs')
        const blogs = await collection
            .find({ published: true }, { projection: { slug: 1, updatedAt: 1 } })
            .toArray()
        if (blogs.length > 0) {
            return blogs.map((doc) => ({
                slug: doc.slug,
                updatedAt: doc.updatedAt,
            }))
        }
    } catch (err) {
        console.error('MongoDB Server: Fallback to default blog slugs', err)
    }

    return DEFAULT_SERVER_BLOGS.map(b => ({ slug: b.slug, updatedAt: b.updatedAt }))
}

export async function getBlogBySlugServer(slug: string): Promise<BlogPostData | null> {
    try {
        const collection = await getCollection('blogs')
        const doc = await collection.findOne({
            $or: [{ slug }, { shortId: slug }],
            published: true,
        })
        if (doc) {
            return {
                ...doc,
                id: doc._id.toString(),
                _id: undefined,
            } as unknown as BlogPostData
        }
    } catch (err) {
        console.error('MongoDB Server: Fallback to default blog by slug', err)
    }

    const fallback = DEFAULT_SERVER_BLOGS.find(b => b.slug === slug || b.shortId === slug)
    return fallback || null
}

export async function getSEOSettingsServer(): Promise<{ siteTitle: string; siteDescription: string } | null> {
    try {
        const collection = await getCollection('settings')
        const doc = await collection.findOne({ key: 'seo' })
        if (doc && doc.data) {
            return {
                siteTitle: doc.data.siteTitle || 'Deeplink Creators | Enterprise Software Holding',
                siteDescription: doc.data.siteDescription || 'Proprietary software products and creator networks under Mayalok Venture.',
            }
        }
    } catch {
        // fallback
    }

    return {
        siteTitle: 'Deeplink Creators | Enterprise Software Holding & Creator Ecosystem',
        siteDescription: 'Deeplink Creators builds, operates, and scales proprietary software products and hyper-scaled creator networks under Mayalok Venture.',
    }
}
