import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

function generateShortId(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let result = ''
    for (let i = 0; i < 7; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

export function createSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 80)
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const all = searchParams.get('all') === 'true'
        const collection = await getCollection('blogs')

        const query = all ? {} : { published: true }
        const blogs = await collection.find(query).sort({ publishedAt: -1, updatedAt: -1 }).toArray()

        // Normalize _id to string id
        const normalized = blogs.map((b) => ({
            ...b,
            id: b._id.toString(),
            _id: undefined,
        }))

        return NextResponse.json({ success: true, blogs: normalized })
    } catch (err: any) {
        console.error('API /api/blogs GET Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to fetch blogs', blogs: [] },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const collection = await getCollection('blogs')

        const now = new Date()
        const blogDoc = {
            title: body.title || '',
            slug: body.slug || createSlug(body.title || 'untitled'),
            shortId: body.shortId || generateShortId(),
            content: body.content || '',
            excerpt: body.excerpt || '',
            coverImage: body.coverImage || '',
            author: body.author || 'Deeplink Creators',
            category: body.category || 'Architecture',
            tags: Array.isArray(body.tags) ? body.tags : [],
            published: Boolean(body.published),
            publishedAt: body.published ? (body.publishedAt ? new Date(body.publishedAt) : now) : null,
            updatedAt: now,
            createdAt: now,
            seoTitle: body.seoTitle || body.title || '',
            seoDescription: body.seoDescription || body.excerpt || '',
            keywords: body.keywords || '',
        }

        const result = await collection.insertOne(blogDoc)

        return NextResponse.json({
            success: true,
            id: result.insertedId.toString(),
            blog: { ...blogDoc, id: result.insertedId.toString() },
        })
    } catch (err: any) {
        console.error('API /api/blogs POST Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to create blog' },
            { status: 500 }
        )
    }
}
