import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params
        const collection = await getCollection('blogs')

        // Search by slug, shortId, or ObjectId
        let query: any = { $or: [{ slug }, { shortId: slug }] }
        if (ObjectId.isValid(slug)) {
            query = { $or: [{ _id: new ObjectId(slug) }, { slug }, { shortId: slug }] }
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
    } catch (err: any) {
        console.error('API /api/blogs/[slug] GET Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to fetch blog' },
            { status: 500 }
        )
    }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params
        const body = await req.json()
        const collection = await getCollection('blogs')

        let query: any = { $or: [{ slug }, { shortId: slug }] }
        if (ObjectId.isValid(slug)) {
            query = { $or: [{ _id: new ObjectId(slug) }, { slug }, { shortId: slug }] }
        }

        const now = new Date()
        const updateDoc: Record<string, any> = {
            ...body,
            updatedAt: now,
        }

        // Clean up immutable or identifier fields from payload
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
        console.error('API /api/blogs/[slug] PUT Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to update blog' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params
        const collection = await getCollection('blogs')

        let query: any = { $or: [{ slug }, { shortId: slug }] }
        if (ObjectId.isValid(slug)) {
            query = { $or: [{ _id: new ObjectId(slug) }, { slug }, { shortId: slug }] }
        }

        const result = await collection.deleteOne(query)

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Blog deleted successfully' })
    } catch (err: any) {
        console.error('API /api/blogs/[slug] DELETE Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to delete blog' },
            { status: 500 }
        )
    }
}
