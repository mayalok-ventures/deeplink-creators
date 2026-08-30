import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const body = await req.json()
        const collection = await getCollection('leads')

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: 'Invalid lead ID' }, { status: 400 })
        }

        const updateDoc: Record<string, any> = { updatedAt: new Date() }
        if (body.status !== undefined) updateDoc.status = body.status
        if (body.notes !== undefined) updateDoc.notes = body.notes

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc })

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Lead updated' })
    } catch (err: any) {
        console.error('API /api/leads/[id] PUT Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to update lead' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const collection = await getCollection('leads')

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: 'Invalid lead ID' }, { status: 400 })
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) })

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Lead deleted' })
    } catch (err: any) {
        console.error('API /api/leads/[id] DELETE Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to delete lead' },
            { status: 500 }
        )
    }
}
