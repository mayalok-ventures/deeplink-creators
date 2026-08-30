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

export async function getPublishedBlogSlugs(): Promise<{ slug: string; updatedAt?: any }[]> {
    try {
        const collection = await getCollection('blogs')
        const blogs = await collection
            .find({ published: true }, { projection: { slug: 1, updatedAt: 1 } })
            .toArray()
        return blogs.map((doc) => ({
            slug: doc.slug,
            updatedAt: doc.updatedAt,
        }))
    } catch (err) {
        console.error('MongoDB Server: Failed to fetch blog slugs', err)
        return []
    }
}

export async function getBlogBySlugServer(slug: string): Promise<BlogPostData | null> {
    try {
        const collection = await getCollection('blogs')
        const doc = await collection.findOne({
            $or: [{ slug }, { shortId: slug }],
            published: true,
        })
        if (!doc) return null
        return {
            ...doc,
            id: doc._id.toString(),
            _id: undefined,
        } as unknown as BlogPostData
    } catch (err) {
        console.error('MongoDB Server: Failed to fetch blog by slug', err)
        return null
    }
}

export async function getSEOSettingsServer(): Promise<{ siteTitle: string; siteDescription: string } | null> {
    try {
        const collection = await getCollection('settings')
        const doc = await collection.findOne({ key: 'seo' })
        if (!doc || !doc.data) return null
        return {
            siteTitle: doc.data.siteTitle || '',
            siteDescription: doc.data.siteDescription || '',
        }
    } catch (err) {
        console.error('MongoDB Server: Failed to fetch SEO settings', err)
        return null
    }
}

export async function getAllPublishedBlogs(): Promise<BlogPostData[]> {
    try {
        const collection = await getCollection('blogs')
        const blogs = await collection
            .find({ published: true })
            .sort({ publishedAt: -1 })
            .toArray()
        return blogs.map((doc) => ({
            ...doc,
            id: doc._id.toString(),
            _id: undefined,
        })) as unknown as BlogPostData[]
    } catch (err) {
        console.error('MongoDB Server: Failed to fetch blogs', err)
        return []
    }
}
