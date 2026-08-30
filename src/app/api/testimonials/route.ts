import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
    try {
        const collection = await getCollection('testimonials')
        const items = await collection.find({}).sort({ order: 1 }).toArray()
        const normalized = items.map((t) => ({
            ...t,
            id: t._id.toString(),
            _id: undefined,
        }))
        return NextResponse.json({ success: true, testimonials: normalized })
    } catch (err: any) {
        console.error('API /api/testimonials GET Error:', err)
        return NextResponse.json({ success: false, error: err.message, testimonials: [] }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const collection = await getCollection('testimonials')
        const result = await collection.insertOne({ ...body, createdAt: new Date() })
        return NextResponse.json({ success: true, id: result.insertedId.toString() })
    } catch (err: any) {
        console.error('API /api/testimonials POST Error:', err)
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        const { id, ...data } = body
        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 })
        }
        const collection = await getCollection('testimonials')
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updatedAt: new Date() } })
        return NextResponse.json({ success: true, message: 'Testimonial updated' })
    } catch (err: any) {
        console.error('API /api/testimonials PUT Error:', err)
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 })
        }
        const collection = await getCollection('testimonials')
        await collection.deleteOne({ _id: new ObjectId(id) })
        return NextResponse.json({ success: true, message: 'Testimonial deleted' })
    } catch (err: any) {
        console.error('API /api/testimonials DELETE Error:', err)
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}
