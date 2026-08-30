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

function createSlug(title: string): string {
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
        const slug = searchParams.get('slug')
        const id = searchParams.get('id')
        const collection = await getCollection('blogs')

        // Single blog fetch by slug, shortId, or id
        if (slug || id) {
            const queryTarget = slug || id || ''
            let query: any = { $or: [{ slug: queryTarget }, { shortId: queryTarget }] }
            if (ObjectId.isValid(queryTarget)) {
                query = { $or: [{ _id: new ObjectId(queryTarget) }, { slug: queryTarget }, { shortId: queryTarget }] }
            }

            const blog = await collection.findOne(query)
            if (!blog) {
                return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 })
            }

            const normalized = {
                ...blog,
                id: blog._id.toString(),
                _id: undefined,
            }
            return NextResponse.json({ success: true, blog: normalized })
        }

        // List blogs
        const query = all ? {} : { published: true }
        const blogs = await collection.find(query).sort({ publishedAt: -1, updatedAt: -1 }).toArray()

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

export async function PUT(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const slug = searchParams.get('slug')
        const id = searchParams.get('id')
        const body = await req.json()
        const target = id || slug || body.id || body.slug

        if (!target) {
            return NextResponse.json({ success: false, error: 'Missing blog ID or slug' }, { status: 400 })
        }

        const collection = await getCollection('blogs')
        let query: any = { $or: [{ slug: target }, { shortId: target }] }
        if (ObjectId.isValid(target)) {
            query = { $or: [{ _id: new ObjectId(target) }, { slug: target }, { shortId: target }] }
        }

        const now = new Date()
        const updateDoc: Record<string, any> = {
            ...body,
            updatedAt: now,
        }

        delete updateDoc.id
        delete updateDoc._id

        if (body.published && !body.publishedAt) {
            updateDoc.publishedAt = now
        }

        const result = await collection.updateOne(query, { $set: updateDoc })
        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Blog updated successfully' })
    } catch (err: any) {
        console.error('API /api/blogs PUT Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to update blog' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const slug = searchParams.get('slug')
        const id = searchParams.get('id')
        const target = id || slug

        if (!target) {
            return NextResponse.json({ success: false, error: 'Missing blog ID or slug' }, { status: 400 })
        }

        const collection = await getCollection('blogs')
        let query: any = { $or: [{ slug: target }, { shortId: target }] }
        if (ObjectId.isValid(target)) {
            query = { $or: [{ _id: new ObjectId(target) }, { slug: target }, { shortId: target }] }
        }

        const result = await collection.deleteOne(query)
        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Blog deleted successfully' })
    } catch (err: any) {
        console.error('API /api/blogs DELETE Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to delete blog' },
            { status: 500 }
        )
    }
}
