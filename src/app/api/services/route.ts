import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
    try {
        const collection = await getCollection('services')
        const items = await collection.find({}).sort({ order: 1 }).toArray()
        const normalized = items.map((s) => ({
            ...s,
            id: s._id.toString(),
            _id: undefined,
        }))
        return NextResponse.json({ success: true, services: normalized })
    } catch (err: any) {
        console.error('API /api/services GET Error:', err)
        return NextResponse.json({ success: false, error: err.message, services: [] }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const collection = await getCollection('services')
        const result = await collection.insertOne({ ...body, createdAt: new Date() })
        return NextResponse.json({ success: true, id: result.insertedId.toString() })
    } catch (err: any) {
        console.error('API /api/services POST Error:', err)
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
        const collection = await getCollection('services')
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updatedAt: new Date() } })
        return NextResponse.json({ success: true, message: 'Service updated' })
    } catch (err: any) {
        console.error('API /api/services PUT Error:', err)
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
        const collection = await getCollection('services')
        await collection.deleteOne({ _id: new ObjectId(id) })
        return NextResponse.json({ success: true, message: 'Service deleted' })
    } catch (err: any) {
        console.error('API /api/services DELETE Error:', err)
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}
